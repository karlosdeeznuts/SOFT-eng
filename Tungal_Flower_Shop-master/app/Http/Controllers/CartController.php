<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    // NEW: Function to handle the POS modal action
    public function addToCart(Request $request) {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'type_name' => 'required|string',
            'multiplier' => 'required|integer|min:1',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric' // Base price of the flower
        ]);

        $user = auth()->user();
        $product = Product::find($request->product_id);

        // Check if there is enough base stock (Quantity of bundles * Size of bundle)
        $piecesNeeded = $request->quantity * $request->multiplier;

        if ($product->stocks < $piecesNeeded) {
            return redirect()->back()->with('error', "Insufficient stock! Only {$product->stocks} base pieces available.");
        }

        // Subtotal = Base Price * Total Base Pieces
        $subtotal = $request->price * $piecesNeeded; 

        Cart::create([
            'user_id' => $user->id,
            'product_id' => $request->product_id,
            'type_name' => $request->type_name,
            'multiplier' => $request->multiplier,
            'quantity' => $request->quantity,
            'subtotal' => $subtotal
        ]);

        return redirect()->back()->with('success', 'Item successfully added to register.');
    }

    public function checkout(Request $request){
        $fields = $request->validate([
            'cart_id' => 'required|array',
            'total' => 'required|numeric', // This is the Grand Total
            'cash_received' => 'required|numeric',
            'discount_percentage' => 'nullable|numeric|min:0|max:100',
            'discount_amount' => 'nullable|numeric|min:0',
        ]);

        $user = auth()->user();

        if($fields['cash_received'] < $fields['total']){
            return redirect()->back()->with('error', "Insufficient cash received to complete transaction.");
        }

        // Create the master order
        $store_order = Order::create([
            'user_id' => $user->id,
            'quantity' => 0, // Will update via loop
            'total' => $fields['total'],
            'discount_percentage' => $fields['discount_percentage'] ?? null,
            'discount_amount' => $fields['discount_amount'] ?? 0,
            'cash_recieved' => $fields['cash_received'], // Preserved matching DB typo
            'change' => $fields['cash_received'] - $fields['total'],
        ]);
        
        $quantity = 0;

        foreach($fields['cart_id'] as $cart_id){
            $cart = Cart::where('id',$cart_id)->first();
            $quantity += $cart->quantity; // Count total bundles bought

            // Snapshot the exact type sold for the historical receipt
            OrderDetail::create([
                'order_id' => $store_order->id,
                'product_id' => $cart->product_id,
                'user_id' => $user->id,
                'type_name' => $cart->type_name,     
                'multiplier' => $cart->multiplier,   
                'quantity' => $cart->quantity,
                'total' => $cart->subtotal,
            ]);

            // Deduct from Main Inventory using strict base-piece math
            $product = Product::find($cart->product_id);
            $totalPiecesToDeduct = $cart->quantity * $cart->multiplier;

            $product->update([
                'stocks' => $product->stocks - $totalPiecesToDeduct,
            ]);
        }

        // Update total items bought on master order
        $updateOrder = Order::where('id',$store_order->id)->update([
            'quantity' => $quantity,
        ]);

        if($updateOrder){
            // Wipe the cart for the next customer
            Cart::where('user_id',$user->id)->delete();
            return redirect()->route('customer.invoice',['order_id' => $store_order->id]);
        }else{
            return redirect()->back()->with('error',"Failed to process the transaction.");
        }
    }

    public function cart(){
        $user = auth()->user(); 
        $carts = Cart::with(['user','product'])->where('user_id',$user->id)->latest()->paginate(5);
        $total = Cart::where('user_id', $user->id)->sum('subtotal');
        $products = Product::latest()->paginate(6);

        if($carts && $total >= 0){
            return inertia('Customer/Cart',[
                'carts' => $carts,
                'total' => $total,
                'products' => $products 
            ]);
        }
    }

    public function invoice($order_id){
        $order = Order::find($order_id);
        $orderDetails = OrderDetail::with(['product','user'])->where('order_id',$order_id)->get();

        return inertia('InvoiceReceipt',[
            'order' => $order,
            'orderDetails' => $orderDetails,
        ]);
    }

    public function downloadInvoice($order_id){
        $order = Order::find($order_id);
        $orderDetails = OrderDetail::with(['product','user'])->where('order_id',$order_id)->get();

        return inertia('Admin/InvoiceReceipt',[
            'order' => $order,
            'orderDetails' => $orderDetails,
        ]);
    }

    public function removeItem($cart_id){
        $user = auth()->user();
        $deleteItem = Cart::where('user_id',$user->id)->where('id',$cart_id)->delete();

        if($deleteItem){
            return redirect()->back()->with('success', 'Item voided from cart.');
        }else{
            return redirect()->back()->with('error','Failed to remove item.');
        }
    }
}
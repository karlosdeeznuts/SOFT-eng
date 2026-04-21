<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use Illuminate\Http\Request;
use Str;

class CartController extends Controller
{
    public function cart(){
        $user = auth()->user(); // Get the authenticated user
        
        $carts = Cart::with(['user','product'])
        ->where('user_id',$user->id)
        ->latest()
        ->paginate(5);

        $total = Cart::where('user_id', $user->id)
        ->sum('subtotal');
        
        // FIXED: Fetch the products so the Cart page can render them behind the dialog box!
        $products = Product::latest()->paginate(6);

        if($carts && $total >= 0){
            return inertia('Customer/Cart',[
                'carts' => $carts,
                'total' => $total,
                'products' => $products // Pass products to the frontend
            ]);
        }
    }
    
    public function checkout(Request $request){
        $fields = $request->validate([
            'cart_id' => 'required|array',
            'total' => 'required',
            'cash_received' => 'required',
        ]);

        $user = auth()->user();

        if($fields['cash_received'] < $fields['total']){
            return redirect()->route('customer.cart')
            ->with('error', "Insufficient payment. Please provide enough.");
        }else{
            $store_order = Order::create([
                'user_id' => $user->id,
                'quantity' => 0,
                'total' => $fields['total'],
                'cash_recieved' => $fields['cash_received'],
                'change' => $fields['cash_received'] - $fields['total'],
            ]);
            
            $quantity = 0;
            $subtotal = 0.00;

            foreach($fields['cart_id'] as $cart_id){
                $cart = Cart::where('id',$cart_id)->first();
                $quantity += $cart->quantity;
                $subtotal += $cart->subtotal;

                OrderDetail::create([
                    'order_id' => $store_order->id,
                    'product_id' => $cart->product_id,
                    'user_id' => $user->id,
                    'quantity' => $cart->quantity,
                    'total' => $cart->subtotal,
                ]);

                $fetchProduct = Cart::where('id',$cart_id)->first();
                $currentStock = Product::find($fetchProduct->product_id);
                $updateProduct = Product::where('id',$fetchProduct->product_id)->update([
                    'stocks' => $currentStock->stocks - $fetchProduct->quantity,
                ]);
            }

            $updateOrder = Order::where('id',$store_order->id)->update([
                'quantity' => $quantity,
            ]);

            if($updateOrder){
                Cart::where('user_id',$user->id)->delete();
                return redirect()->route('customer.invoice',['order_id' => $store_order->id]);
            }else{
                return redirect()->back()->with('error',"Failed to checkout your orders.");
            }
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
            return redirect()->back();
        }else{
            return redirect()->back()->with('error','This item failed to remove!');
        }
    }
}
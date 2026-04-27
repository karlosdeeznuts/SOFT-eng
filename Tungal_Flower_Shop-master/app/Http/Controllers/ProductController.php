<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function storeProduct(Request $request){
        $fields = $request->validate([
            'product_name' => 'required',
            'type' => 'required|string',
            'description' => 'required',
            'price' => 'required|integer',
            'image' => 'required|file|mimes:jpg,jpeg,png|max:5120'
        ]);

        if($request->hasFile('image')){
            $fields['image'] = Storage::disk('public')->put('products',$request->image);

            $product = Product::create([
                'product_name' => $fields['product_name'],
                'type' => $fields['type'],
                'description' => $fields['description'],
                'price' => (int) $fields['price'],
                'stocks' => 0, // STRICTLY ENFORCED DEFAULT 0
                'image' => $fields['image']
            ]);

            if($product){
                return redirect()->back()->with('success', 'Flower added successfully!');
            }else{
                return redirect()->back()->with('error','Failed to store the data.');
            }
        }
    }

    public function showInventoryProduct(){
        $products = Product::latest()->paginate(6);
        return inertia('Admin/Inventory',['products' => $products]);
    }

    public function displayProduct(){
        $products = Product::latest()->paginate(6);
        return inertia('Customer/Product',['products' => $products]);
    }

    public function viewProduct($product_id){
        $products = Product::find($product_id);
        return inertia('Admin/Inventory_Features/ViewProduct',
        ['products' => $products]);
    }

    public function updateProduct(Request $request){
        $fields = $request->validate([
            'id' => 'required|integer',
            'product_name' => 'required',
            'type' => 'required|string',
            'description' => 'required',
            'price' => 'required|integer',
            'image' => 'nullable|file|mimes:jpg,jpeg,png|max:5120'
        ]);

        $product = Product::find($request->id);

        if($product){
            $updateData = [
                'product_name' => $fields['product_name'],
                'type' => $fields['type'],
                'description' => $fields['description'],
                'price' => $fields['price'],
            ];

            // Only update the image if a brand new one was uploaded
            if($request->hasFile('image')){
                $updateData['image'] = \Illuminate\Support\Facades\Storage::disk('public')->put('products', $request->image);
            }

            $product->update($updateData);

            return redirect()->back()->with('success', $fields['product_name'] . ' updated successfully.');
        }else{
            return redirect()->back()->with('error','Updating flower information failed.');
        }
    }

    // --- NEW STOCK IN AND OUT LOGIC ---
    public function stockIn(Request $request){
        $request->validate(['id' => 'required|integer', 'quantity' => 'required|integer|min:1']);
        $product = Product::find($request->id);
        
        if($product){
            $product->increment('stocks', $request->quantity);
            return redirect()->back()->with('success', $request->quantity . ' stocks added to ' . $product->product_name);
        }
        return redirect()->back()->with('error', 'Flower not found.');
    }

    public function stockOut(Request $request){
        $request->validate(['id' => 'required|integer', 'quantity' => 'required|integer|min:1']);
        $product = Product::find($request->id);
        
        if($product){
            if($product->stocks >= $request->quantity){
                $product->decrement('stocks', $request->quantity);
                return redirect()->back()->with('success', $request->quantity . ' stocks removed from ' . $product->product_name);
            }
            return redirect()->back()->with('error', 'Not enough stock to remove!');
        }
        return redirect()->back()->with('error', 'Flower not found.');
    }

    public function showProduct($product_id){
        $product = Product::find($product_id);
        if($product){
            return inertia('Customer/Product_Features/ShowProduct',['product' => $product]);
        }
    }

    public function addToCart(Request $request){
        $fields = $request->validate([
            'product_id' => 'required|integer',
            'quantity' => 'required|integer',
        ]);

        $user = auth()->user();
        $product = Product::find($request->product_id);
        $existingProduct = Cart::where('product_id',$fields['product_id'])->where('user_id',$user->id)->first();

        if($existingProduct){
            $updateCart = Cart::where('id', $existingProduct->id)->update([
                'quantity' => $existingProduct->quantity + $fields['quantity'],
                'subtotal' => $existingProduct->subtotal + ($product->price * $fields['quantity']),
            ]);

            if($updateCart){
                return redirect()->back()->with('success',$product->product_name . ' added to cart successfully.');
            }else{
                return redirect()->back()->with('error',"Can't add to cart.");
            }
        }else{
            if($product){
                $addToCart = Cart::create([
                    'user_id' => $user->id,
                    'product_id' => $fields['product_id'],
                    'quantity' => $fields['quantity'],
                    'subtotal' => $product->price * $fields['quantity'],
                ]);

                if($addToCart){
                    return redirect()->back()->with('success',$product->product_name . ' added to cart successfully.');
                }else{
                    return redirect()->back()->with('error',"Can't add to cart.");
                }
            }
        }
    }
}
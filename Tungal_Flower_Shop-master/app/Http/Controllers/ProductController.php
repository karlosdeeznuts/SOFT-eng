<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function showInventoryProduct(){
        $products = Product::with('types')->latest()->paginate(6);
        return inertia('Admin/Inventory', ['products' => $products]);
    }

    public function displayProduct(){
        $products = Product::with('types')->latest()->paginate(8);
        return inertia('Customer/Product', ['products' => $products]);
    }

    public function showProduct($product_id){
        $product = Product::with('types')->find($product_id);
        return inertia('Customer/Product_Features/ShowProduct', ['product' => $product]);
    }

    public function storeProduct(Request $request){
        $fields = $request->validate([
            'product_name' => 'required',
            'description' => 'required',
            'price' => 'required|integer',
            'image' => 'nullable|file|mimes:jpg,jpeg,png|max:5120',
            'types' => 'nullable|array',
            'types.*.name' => 'required|string',
            'types.*.multiplier' => 'required|integer|min:1',
        ]);

        $imagePath = null;
        if($request->hasFile('image')){
            $imagePath = Storage::disk('public')->put('products', $request->image);
        }

        $product = Product::create([
            'product_name' => $fields['product_name'],
            'description' => $fields['description'],
            'price' => $fields['price'],
            'image' => $imagePath
        ]);

        if (!empty($fields['types'])) {
            foreach ($fields['types'] as $type) {
                $product->types()->create([
                    'name' => $type['name'],
                    'multiplier' => $type['multiplier']
                ]);
            }
        }

        return redirect()->back()->with('success', 'Flower added successfully to inventory.');
    }

    public function updateProduct(Request $request){
        $fields = $request->validate([
            'id' => 'required|integer',
            'product_name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'image' => 'nullable|file|mimes:jpg,jpeg,png|max:5120',
            'types' => 'nullable|array',
            'types.*.name' => 'required|string',
            'types.*.multiplier' => 'required|integer|min:1',
        ]);

        $product = Product::find($request->id);

        if($product){
            $updateData = [
                'product_name' => $fields['product_name'],
                'description' => $fields['description'],
                'price' => $fields['price'],
            ];

            if($request->hasFile('image')){
                $updateData['image'] = Storage::disk('public')->put('products', $request->image);
            }

            $product->update($updateData);

            $product->types()->delete();
            if (!empty($fields['types'])) {
                foreach ($fields['types'] as $type) {
                    $product->types()->create([
                        'name' => $type['name'],
                        'multiplier' => $type['multiplier']
                    ]);
                }
            }

            return redirect()->back()->with('success', $fields['product_name'] . ' updated successfully.');
        }else{
            return redirect()->back()->with('error','Updating flower information failed.');
        }
    }

    public function destroyProduct(Product $product){
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }
        $product->delete();
        return redirect()->back()->with('success', 'Product deleted successfully.');
    }

    public function stockIn(Request $request) {
        $request->validate([
            'id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);
        $product = Product::findOrFail($request->id);
        $product->stocks += $request->quantity;
        $product->save();
        return redirect()->back()->with('success', "Added {$request->quantity} stocks to {$product->product_name}.");
    }

    public function stockOut(Request $request) {
        $request->validate([
            'id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);
        $product = Product::findOrFail($request->id);
        if ($product->stocks < $request->quantity) {
            return redirect()->back()->with('error', "Not enough stock for {$product->product_name}.");
        }
        $product->stocks -= $request->quantity;
        $product->save();
        return redirect()->back()->with('success', "Removed {$request->quantity} stocks from {$product->product_name}.");
    }
}
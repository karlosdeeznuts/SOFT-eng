<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductBatch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{
    public function showInventoryProduct(){
        // FIXED: Eager load batches and the employee who made them
        $products = Product::with(['types', 'batches.employee'])->latest()->paginate(6);
        return inertia('Admin/Inventory', ['products' => $products]);
    }

    public function displayProduct(){
        // FIXED: Eager load batches for the customer/cashier side too
        $products = Product::with(['types', 'batches'])->latest()->paginate(8);
        return inertia('Customer/Product', ['products' => $products]);
    }

    public function showProduct($product_id){
        // FIXED: Eager load batches here too
        $product = Product::with(['types', 'batches'])->find($product_id);
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

            // STRUCTURAL FIX: Replaced destructive delete() with intelligent sync
            if (!empty($fields['types'])) {
                // Get the names of the types coming from the request
                $incomingTypeNames = collect($fields['types'])->pluck('name')->toArray();

                // 1. Delete types that are no longer present in the incoming request
                $product->types()->whereNotIn('name', $incomingTypeNames)->delete();

                // 2. Update existing types or create new ones
                foreach ($fields['types'] as $type) {
                    $product->types()->updateOrCreate(
                        ['name' => $type['name']], // Match by name to prevent duplicates
                        ['multiplier' => $type['multiplier']] // Update the multiplier if changed
                    );
                }
            } else {
                // If the user removed all types in the form, clear them safely
                $product->types()->delete();
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

    // ==========================================
    // NEW BATCH MANAGEMENT LOGIC
    // ==========================================

    public function storeBatch(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'expires_at' => 'nullable|date',
        ]);

        ProductBatch::create([
            'product_id' => $request->product_id,
            'quantity' => $request->quantity,
            'expires_at' => $request->expires_at,
            'employee_id' => Auth::id(), 
            'status' => 'active',
            'received_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Stock batch added successfully.');
    }

    public function destroyBatch($id)
    {
        $batch = ProductBatch::findOrFail($id);
        
        $batch->update([
            'status' => 'manually_removed'
        ]);

        return redirect()->back()->with('success', 'Batch manually stocked out.');
    }
}
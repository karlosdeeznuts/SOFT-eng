<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    // Updated to match your exact database columns
    protected $fillable = [
        'product_name',
        'description',
        'price',
        'stocks', 
        'image',
    ];

    /**
     * Get all types associated with this product.
     * (Retaining this based on your React payload)
     */
    public function types()
    {
        return $this->hasMany(ProductType::class); 
    }

    /**
     * Get all batches for this product.
     */
    public function batches()
    {
        return $this->hasMany(ProductBatch::class);
    }

    /**
     * Calculate the actual available stock from active batches.
     */
    public function calculateActiveStock()
    {
        return $this->batches()->where('status', 'active')->sum('quantity');
    }
}
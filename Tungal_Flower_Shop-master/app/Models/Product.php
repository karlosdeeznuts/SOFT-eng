<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type_id',
        'origin',
        'supplier',
        'unit_price',
        'markup_percentage',
        'selling_price',
        'size',
        'quantity', // We keep this as a cached total for now to not break the UI instantly
        'image',
    ];

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
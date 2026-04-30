<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductBatch extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'quantity',
        'received_at',
        'expires_at',
        'employee_id',
        'status',
    ];

    protected $casts = [
        'received_at' => 'datetime',
        'expires_at' => 'datetime',
    ];

    /**
     * Get the product associated with this batch.
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get the employee who stocked in this batch.
     */
    public function employee()
    {
        return $this->belongsTo(User::class, 'employee_id');
    }
}
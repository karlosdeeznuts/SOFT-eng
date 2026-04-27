<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_name',
        'type',
        'description',
        'price',
        'stocks',
        'image'
    ];

    // Automatically format the timestamps for the React frontend
    protected $casts = [
        'created_at' => 'datetime:M d, Y h:i A',
        'updated_at' => 'datetime:M d, Y h:i A',
    ];
}
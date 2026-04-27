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

    // Let Laravel send the raw global timestamp. React will format it locally.
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
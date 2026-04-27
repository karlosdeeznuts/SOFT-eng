<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'quantity',
        'total',
        'discount_percentage',
        'discount_amount',
        'cash_recieved',
        'change',
        'order_status',
        'delivery_proof',
    ];

    public function details() {
        return $this->hasMany(OrderDetail::class, 'order_id');
    }
}
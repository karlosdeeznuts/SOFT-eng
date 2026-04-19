<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderDetail;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function orders() {
        $user = auth()->user();
    
        // Eager load order details so each order includes its order_id from OrderDetail
        $orders = Order::with('details') // assumes you defined a 'details' relationship
            ->where('user_id', $user->id)
            ->latest()
            ->paginate(10);
    
        return inertia('Customer/Orders', [
            'orders' => $orders,
        ]);
    }

    // Add this inside OrderController
    public function deliveriesList() 
    {
        $orders = \App\Models\Order::latest()->get();
        
        return inertia('Employee/Deliveries', [
            'orders' => $orders
        ]);
    }
    
    public function showDeliveryForm($id) {
        // We removed the 'first()' hack. Now it searches for the exact order ID clicked.
        $order = \App\Models\Order::findOrFail($id); 

        return inertia('Customer/Order_Features/DeliveryProof', [
            'order' => $order
        ]);
    }

    // Loads the list of all orders
    public function deliveryDashboard() 
    {
        $orders = \App\Models\Order::latest()->get();
        return inertia('Delivery/Dashboard', ['orders' => $orders]);
    }

    // Loads the specific details for one order
    public function deliveryDetails($id)
    {
        $order = \App\Models\Order::findOrFail($id);
        return inertia('Delivery/Details', ['order' => $order]);
    }
    
}
<?php

namespace App\Http\Controllers;

use App\Models\ReturnRequest;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReturnController extends Controller
{
    // This catches the POST request from the Cashier's Orders.jsx
    public function store(Request $request)
    {
        $request->validate([
            'invoiceNum' => 'required|string',
            'reason' => 'required|string',
            'method' => 'required|string',
        ]);

        // 1. Strip the "#TUNGAL" prefix to get the raw Order ID
        $rawOrderId = preg_replace('/[^0-9]/', '', $request->invoiceNum);

        // 2. Security Check: Does this order actually exist?
        $orderExists = Order::find($rawOrderId);
        
        if (!$orderExists) {
            return redirect()->back()->with('error', 'Invalid Order ID.');
        }

        // 3. Security Check: Has this order already been requested for a return?
        $alreadyRequested = ReturnRequest::where('order_id', $rawOrderId)->exists();
        if ($alreadyRequested) {
            return redirect()->back()->with('error', 'A return request for this order is already being processed.');
        }

        // 4. Save the Request safely to the database
        ReturnRequest::create([
            'order_id' => $rawOrderId,
            'user_id' => Auth::id(), // Automatically logs which cashier did this
            'reason' => $request->reason,
            'refund_method' => $request->method,
            'status' => 'Under Inspection'
        ]);

        // Optional: Update the actual Order's status so the Cashier knows it's pending
        $orderExists->update(['order_status' => 'Refund Requested']);

        return redirect()->back()->with('success', 'Refund request confirmed and submitted successfully!');
    }
}
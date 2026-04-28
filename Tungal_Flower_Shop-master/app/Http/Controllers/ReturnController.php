<?php

namespace App\Http\Controllers;

use App\Models\ReturnRequest;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReturnController extends Controller
{
    // Fetches all returns for the Admin Returns Page
    public function index()
    {
        // Eager load order, order details, and products to flatten the data for the UI
        $returns = ReturnRequest::with(['order.details.product', 'cashier'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Admin/Returns', [
            'returns' => $returns
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'invoiceNum' => 'required|string',
            'reason' => 'required|string',
            'method' => 'required|string',
        ]);

        $rawOrderId = preg_replace('/[^0-9]/', '', $request->invoiceNum);
        $orderExists = Order::find($rawOrderId);
        
        if (!$orderExists) {
            return redirect()->back()->with('error', 'Invalid Order ID.');
        }

        $alreadyRequested = ReturnRequest::where('order_id', $rawOrderId)->exists();
        if ($alreadyRequested) {
            return redirect()->back()->with('error', 'A return request for this order is already being processed.');
        }

        ReturnRequest::create([
            'order_id' => $rawOrderId,
            'user_id' => Auth::id(),
            'reason' => $request->reason,
            'refund_method' => $request->method,
            'status' => 'Under Inspection'
        ]);

        $orderExists->update(['order_status' => 'Refund Requested']);

        return redirect()->back()->with('success', 'Refund request confirmed and submitted successfully!');
    }
}
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Payroll;
use App\Models\ReturnRequest;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class ApprovalController extends Controller
{
    /**
     * Display the Approvals Hub
     */
    public function index()
    {
        $pendingPayrolls = Payroll::with('employee')
            ->where('status', 'Pending')
            ->latest()
            ->get();

        $pendingReturns = ReturnRequest::with(['order.details.product', 'cashier'])
            ->where('status', 'Under Inspection')
            ->latest()
            ->get()
            ->map(function ($return) {
                // Safely calculate refund amount based on order total
                $return->refund_amount = $return->order ? $return->order->total : 0;
                
                // Accurately calculate total returned pieces using the multiplier
                $totalPieces = 0;
                if ($return->order && $return->order->details) {
                    foreach ($return->order->details as $detail) {
                        $totalPieces += ($detail->quantity * ($detail->multiplier ?? 1));
                    }
                }
                $return->total_quantity = $totalPieces;

                return $return;
            });

        return inertia('Admin/Approvals', [
            'pendingPayrolls' => $pendingPayrolls,
            'pendingReturns' => $pendingReturns
        ]);
    }

    /**
     * Handle Payroll Approvals & Rejections
     */
    public function handlePayroll(Request $request, $id, $action)
    {
        $payroll = Payroll::findOrFail($id);

        if ($action === 'approve') {
            $payroll->update(['status' => 'Approved']);
            return redirect()->back()->with('success', 'Payroll has been successfully approved.');
        } 
        
        if ($action === 'reject') {
            $payroll->update(['status' => 'Rejected']);
            return redirect()->back()->with('success', 'Payroll has been rejected.');
        }

        return redirect()->back()->with('error', 'Invalid action specified.');
    }

    /**
     * Handle Return/Refund Approvals & Rejections
     */
    public function handleReturn(Request $request, $id, $action)
    {
        $returnRequest = ReturnRequest::with('order.details')->findOrFail($id);

        if ($action === 'approve') {
            DB::beginTransaction();
            try {
                // 1. Update the return request status
                $returnRequest->update(['status' => 'Approved']);
                
                // 2. Update the original Order's specific 'order_status' column
                if ($returnRequest->order) {
                    $returnRequest->order->update(['order_status' => 'Refunded']);
                }
                
                // FIXED: REMOVED THE AUTO-RESTOCKING LOOP
                // We rely on the Admin to manually check the physical flowers and restock them manually if usable.

                DB::commit();
                
                // Added a specific success message to remind them
                return redirect()->back()->with('success', 'Return approved and order updated. Remember to manually adjust inventory stocks if the items are reusable.');
            } catch (\Exception $e) {
                DB::rollBack();
                return redirect()->back()->with('error', 'Failed to approve return: ' . $e->getMessage());
            }
        } 
        
        if ($action === 'reject') {
            DB::beginTransaction();
            try {
                // 1. Update the return request status
                $returnRequest->update(['status' => 'Rejected']);
                
                // 2. Revert the original Order 'order_status' back to Completed/Paid
                if ($returnRequest->order) {
                    $returnRequest->order->update(['order_status' => 'Completed']);
                }

                DB::commit();
                return redirect()->back()->with('success', 'Return request has been rejected and order status restored.');
            } catch (\Exception $e) {
                DB::rollBack();
                return redirect()->back()->with('error', 'Failed to reject return: ' . $e->getMessage());
            }
        }

        return redirect()->back()->with('error', 'Invalid action specified.');
    }
}
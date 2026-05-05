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

        // FIXED: Eager load 'cashier' to display who processed it
        $pendingReturns = ReturnRequest::with(['order.details.product', 'cashier'])
            ->where('status', 'Under Inspection')
            ->latest()
            ->get()
            ->map(function ($return) {
                // Safely calculate refund amount
                $return->refund_amount = $return->order ? $return->order->total : 0;
                
                // FIXED: Calculate total quantity of items returned from the order details
                $return->total_quantity = $return->order ? $return->order->details->sum('quantity') : 0;

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
        // Load the return request and the associated order details
        $returnRequest = ReturnRequest::with('order.details')->findOrFail($id);

        if ($action === 'approve') {
            DB::beginTransaction();
            try {
                // 1. Update the return request status
                $returnRequest->update(['status' => 'Approved']);
                
                // 2. Update the original Order status so the Sales/Order History reflects the change
                if ($returnRequest->order) {
                    $returnRequest->order->update(['status' => 'Refunded']);
                }
                
                // 3. Auto-Restock the inventory
                if ($returnRequest->order && $returnRequest->order->details) {
                    foreach ($returnRequest->order->details as $detail) {
                        $product = Product::find($detail->product_id);
                        if ($product) {
                            $product->stocks += $detail->quantity;
                            $product->save();
                        }
                    }
                }

                DB::commit();
                return redirect()->back()->with('success', 'Return approved, order updated, and inventory restocked.');
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
                
                // 2. Revert the original Order status back to Paid/Completed since the refund was denied
                if ($returnRequest->order) {
                    $returnRequest->order->update(['status' => 'Paid']);
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
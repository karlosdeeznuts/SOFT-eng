<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Order;
use App\Models\Product;
use App\Models\OrderDetail;
use App\Models\Attendance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function authentication(Request $request) 
    {
        $credentials = $request->validate([
            'username' => 'required',
            'password' => 'required|string',
        ]);

        if(Auth::attempt($credentials)){
            $request->session()->regenerate();

            $user = Auth::user(); 

            // Group the dashboard routes cleanly using arrays
            if(in_array($user->role, ['Admin', 'Manager', 'Owner'])){
                return redirect()->intended('/admin/dashboard');
            }elseif(in_array($user->role, ['Cashier', 'Employee'])){
                return redirect()->intended('/product');
            }elseif(strtolower($user->role) === 'delivery'){
                return redirect()->intended('/delivery/dashboard');
            }
            
            return redirect()->intended('/');
            
        }else{
            return redirect()->back()->with('error', 'Incorrect Username or Password!');
        }
    }

    public function dashboard(){
        // FIXED: Load all products with batches into memory to use the accessor math!
        $allProducts = Product::with('batches')->get();
        
        // 1. Top Metric Cards
        $total_flowers_in_store = $allProducts->sum('stocks');
        $recent_orders_count = Order::where('created_at', '>=', now()->subDays(30))->count();

        // 2. Sales Summary Chart (Top 7 for visual variety)
        $chartData = OrderDetail::with('product')
            ->selectRaw('product_id, SUM(quantity) as total_sales')
            ->groupBy('product_id')
            ->orderByDesc('total_sales')
            ->take(7)
            ->get();

        // 3. Bottom Cards: Top 3 and Least 3
        $topSellingProducts = OrderDetail::with('product')
            ->selectRaw('product_id, SUM(quantity) as total_sales')
            ->groupBy('product_id')
            ->orderByDesc('total_sales')
            ->take(3)
            ->get();

        $leastSellingProducts = OrderDetail::with('product')
            ->selectRaw('product_id, SUM(quantity) as total_sales')
            ->groupBy('product_id')
            ->orderBy('total_sales', 'asc') // Sort ascending for least sellers
            ->take(3)
            ->get();

        // 4. Stock Numbers Summary
        // FIXED: Filter the collection using the accessor, NOT the database query!
        $low_stock_count = $allProducts->where('stocks', '<=', 10)->count(); 
        $total_categories = Product::count(); 
        $recently_added = Product::where('created_at', '>=', now()->subDays(7))->count();
        
        // Using the newly created ReturnRequest model for the bridge we just built!
        $returned_flowers = \App\Models\ReturnRequest::count();

        return inertia('Admin/Dashboard',[
            'total_flowers_in_store' => $total_flowers_in_store,
            'recent_orders_count' => $recent_orders_count,
            'chartData' => $chartData,
            'topSellingProducts' => $topSellingProducts,
            'leastSellingProducts' => $leastSellingProducts,
            'low_stock_count' => $low_stock_count,
            'total_categories' => $total_categories,
            'recently_added' => $recently_added,
            'returned_flowers' => $returned_flowers,
        ]);
    }

    public function report(){
        // 1. CRITICAL STOCK ALERTS
        // FIXED: Load batches and filter in memory so the getStocksAttribute is used!
        $allProducts = Product::with('batches')->get();
        $lowStockProducts = $allProducts->where('stocks', '<=', 15)->sortBy('stocks')->values();

        $stockAlerts = $lowStockProducts->map(function($product) {
            $type = 'attention';
            $label = 'Attention !';

            // Map database stock levels to your exact UI categories
            if ($product->stocks == 0) {
                $type = 'out_of_stock';
                $label = 'Out of Stock';
            } elseif ($product->stocks <= 5) {
                $type = 'below_minimum';
                $label = 'Below Minimum';
            } elseif ($product->stocks <= 10) {
                $type = 'low_stock';
                $label = 'Low Stock';
            }

            return [
                'id' => $product->id,
                'type' => $type,
                'label' => $label,
                'product' => $product->product_name,
                'units' => $product->stocks,
                'date' => $product->updated_at->diffForHumans() . ' (' . $product->updated_at->format('M j, Y') . ')'
            ];
        });

        // 2. SALES & CUSTOMERS OVERVIEW
        $totalSales = Order::sum('total');
        $totalOrders = Order::count();
        $avgSales = $totalOrders > 0 ? $totalSales / $totalOrders : 0;

        // Calculate Trends (Last 30 Days vs Previous 30 Days)
        $current30Start = now()->subDays(30);
        $prev30Start = now()->subDays(60);

        // Sales Trend
        $currentSales = Order::where('created_at', '>=', $current30Start)->sum('total');
        $prevSales = Order::whereBetween('created_at', [$prev30Start, $current30Start])->sum('total');
        $salesTrend = $prevSales > 0 ? round((($currentSales - $prevSales) / $prevSales) * 100) : 0;

        // Orders Trend
        $currentOrdersCount = Order::where('created_at', '>=', $current30Start)->count();
        $prevOrdersCount = Order::whereBetween('created_at', [$prev30Start, $current30Start])->count();
        $ordersTrend = $prevOrdersCount > 0 ? round((($currentOrdersCount - $prevOrdersCount) / $prevOrdersCount) * 100) : 0;

        // Average Sales Trend
        $currentAvg = $currentOrdersCount > 0 ? $currentSales / $currentOrdersCount : 0;
        $prevAvg = $prevOrdersCount > 0 ? $prevSales / $prevOrdersCount : 0;
        $avgTrend = $prevAvg > 0 ? round((($currentAvg - $prevAvg) / $prevAvg) * 100) : 0;

        $salesOverview = [
            'totalSales' => number_format($totalSales, 0, '.', ' '),
            'salesTrend' => ($salesTrend >= 0 ? '+' : '') . $salesTrend . '% vs last 30 days',
            'totalOrders' => number_format($totalOrders, 0, '.', ' '),
            'ordersTrend' => ($ordersTrend >= 0 ? '+' : '') . $ordersTrend . '% vs last 30 days',
            'avgSales' => number_format($avgSales, 0, '.', ' '),
            'avgTrend' => ($avgTrend >= 0 ? '+' : '') . $avgTrend . '% vs last 30 days',
        ];

        return inertia('Admin/Report', [
            'stockAlerts' => $stockAlerts,
            'salesOverview' => $salesOverview
        ]);
    }
    
    public function storeEmployeeData(Request $request){
        $fields = $request->validate([
            'firstname' => 'required|max:50',
            'lastname' => 'required|max:50',
            'contact_number' => 'required|min:11|max:11|unique:users,contact_number',
            'role' => 'required',
            'username' => 'required|unique:users,username',
            'password' => 'required|string|min:8',
            'profile' => 'required|file|mimes:jpg,jpeg,png|max:5120'
        ]);

        $fields['password'] = Hash::make($fields['password']);

        if($request->hasFile('profile')){
            $fields['profile'] = Storage::disk('public')->put('profiles',$request->profile);
            $user = User::create($fields);

            if($user){
                return redirect()->back()->with('success', 'Employee added successfully!');
            }else{
                return redirect()->back()->with('error','Failed to store the data.');
            }
        }
    }

    public function displayEmployee(){
        $employees = User::whereIn('role', ['Manager', 'Cashier', 'Delivery', 'Employee'])->get();
        return inertia('Admin/Employee',['employees' => $employees]);
    }

    public function viewEmployeeProfile($user_id) {
        $employee_profile = User::with('attendances')->find($user_id);
        return inertia('Admin/Employee_Features/ViewProfile', [
            'user_info' => $employee_profile
        ]);
    }

    public function storeAttendance(Request $request) {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'date' => 'required|date',
            'status' => 'required|string',
            'clock_in' => 'nullable',
            'clock_out' => 'nullable',
        ]);

        Attendance::updateOrCreate(
            ['user_id' => $request->user_id, 'date' => $request->date],
            [
                'status' => $request->status,
                'clock_in' => $request->clock_in,
                'clock_out' => $request->clock_out
            ]
        );

        return redirect()->back()->with('success', "Attendance updated successfully.");
    }

    public function updateUserInfo(Request $request){
        $existingContacts = User::where('contact_number',$request->contact_number)->first();

        if($existingContacts && $existingContacts->id == $request->id){
            $field = $request->validate([
                'firstname' => 'required',
                'lastname' => 'required',
                'contact_number' => 'required|min:11|max:11',
                'username' => 'required',
            ]);
        }else{
            $field = $request->validate([
                'firstname' => 'required',
                'lastname' => 'required',
                'contact_number' => 'required|min:11|max:11|unique:users,contact_number',
                'username' => 'required',
            ]);
        }

        if($field){
            $data = User::where('id',$request->id)->update([
                'firstname' => $request->firstname,
                'lastname' => $request->lastname,
                'contact_number' => $request->contact_number,
                'username' => $request->username,
            ]);

            if($data){
                return redirect()->route('employee.viewProfile', ['user_id' => $request->id])
                ->with('success', $field['firstname'] . ' information updated successfully.');
            }else{
                return redirect()->back()->with('error','User info failed to update.');
            }
        }
    }

    public function updatePassword(Request $request){
        $fields = $request->validate([
            'new_password' => 'required|string|min:8',
            'confirm_password' => 'required|string|same:new_password',
        ]);

        $fields['new_password'] = Hash::make($fields['new_password']);
        $user = User::where('id',$request->id)->update(['password' =>  $fields['new_password']]);

        if($user){
            return redirect()->route('employee.viewProfile',['user_id' => $request->id])
            ->with('success','Password updated successfully.');
        }else{
            return redirect()->back()->with('error','Updating password failed.');
        }
    }

    public function adminProfile(){
        $user = auth()->user(); 
        if($user){
            return inertia('Admin/Profile',['admin' => $user]);
        }
    }

    public function updateAdminInfo(Request $request){
        $field = $request->validate([
            'firstname' => 'required',
            'lastname' => 'required',
            'contact_number' => 'required|min:11|max:11',
            'username' => 'required',
        ]);

        $data = User::where('id',$request->id)->update([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'contact_number' => $request->contact_number,
            'username' => $request->username,
        ]);

        if($data){
            return redirect()->route('admin.profile')
            ->with('success', 'Profile updated successfully.');
        }else{
            return redirect()->back()->with('error','Admin info failed to update.');
        }
    }

    public function updateAdminPassword(Request $request){
        $fields = $request->validate([
            'new_password' => 'required|string|min:8',
            'confirm_password' => 'required|string|same:new_password',
        ]);

        $user = User::where('id',$request->id)->update(['password' =>  Hash::make($fields['new_password'])]);

        if($user){
            return redirect()->route('admin.profile')
            ->with('success','Password updated successfully.');
        }else{
            return redirect()->back()->with('error','Updating password failed.');
        }
    }

    public function sales($order_id = null){
        $employees = User::whereIn('role', ['Manager', 'Cashier', 'Delivery', 'Employee'])->get();

        if($order_id == null){
            $order_id_list = OrderDetail::select('order_id')->distinct()->latest()->get();
            $orders = Order::latest()->paginate(12);

            return inertia('Admin/Sales',[
                'employees' => $employees,
                'order_id' => $order_id_list,
                'orders' => $orders,
                'currentSelected_ID' => 'All',
                'parent_order' => null
            ]);
        }else{
            $order_details = OrderDetail::with('product')->where('order_id',$order_id)->latest()->paginate(5);
            $parent_order = Order::find($order_id); 
            
            return inertia('Admin/Sales',[
                'employees' => $employees,
                'order_id' => null,
                'orders' => $order_details,
                'currentSelected_ID' => 'All',
                'parent_order' => $parent_order 
            ]);
        } 
    }

    public function selectedEmployee($user_id){
        $employees = User::whereIn('role', ['Manager', 'Cashier', 'Delivery', 'Employee'])->get();
        if($user_id != 'All'){
            $order_id_list = OrderDetail::select('order_id')->where('user_id',$user_id)->distinct()->latest()->get();
            $orders = Order::where('user_id',$user_id)->latest()->paginate(12);

            return inertia('Admin/Sales',[
                'employees' => $employees,
                'order_id' => $order_id_list,
                'orders' => $orders,
                'currentSelected_ID' => $user_id,
                'parent_order' => null
            ]);
        }else{
            $order_id_list = OrderDetail::select('order_id')->distinct()->latest()->get();
            $orders = Order::latest()->paginate(12);

            return inertia('Admin/Sales',[
                'employees' => $employees,
                'order_id' => $order_id_list,
                'orders' => $orders,
                'currentSelected_ID' => 'All',
                'parent_order' => null
            ]);
        }
    }

    public function searchedOrderID(Request $request){
        $rawId = $request->input('order_id');
        $cleanId = preg_replace('/\D+/', '', $rawId);
        
        $employees = User::whereIn('role', ['Manager', 'Cashier', 'Delivery', 'Employee'])->get();
        $orders = Order::where('id', $cleanId)->latest()->paginate(12);

        return inertia('Admin/Sales',[
            'employees' => $employees,
            'order_id' => [],
            'orders' => $orders,
            'currentSelected_ID' => 'All',
            'parent_order' => null
        ]);
    }

    public function employeeLogout(Request $request){
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('customer.index');
    }

    public function customer_profile(){
        $user = Auth::user();
        return inertia('Customer/Profile', [
            'user_info' => $user
        ]);
    }

    public function updateProfileInfo(Request $request){
        $user = Auth::user();
        $request->validate([
            'firstname' => 'required',
            'lastname' => 'required',
            'contact_number' => 'required|min:11|max:11',
            'username' => 'required',
        ]);

        $user->update([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'contact_number' => $request->contact_number,
            'username' => $request->username,
        ]);

        return redirect()->route('customer.profile')->with('success', 'Information updated successfully.');
    }

    public function updateProfilePassword(Request $request){
        $request->validate([
            'new_password' => 'required|string|min:8',
            'confirm_password' => 'required|string|same:new_password',
        ]);

        Auth::user()->update([
            'password' => Hash::make($request->new_password),
        ]);

        return redirect()->route('customer.profile')->with('success', 'Password updated successfully.');
    }
}
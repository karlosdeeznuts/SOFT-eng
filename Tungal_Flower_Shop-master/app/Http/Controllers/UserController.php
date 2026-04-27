<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Order;
use App\Models\Product;
use App\Models\OrderDetail;
use App\Models\Attendance; // NEW: Brought in the Attendance Model
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

            if($user->role === 'Admin' || $user->role === 'Owner'){
                return redirect()->intended('/admin/dashboard');
            }elseif($user->role === 'Manager' || $user->role === 'Cashier' || $user->role === 'Employee'){
                return redirect()->intended('/product');
            }elseif($user->role === 'Delivery'){
                return redirect()->intended('/delivery/dashboard');
            }
            
            return redirect()->intended('/');
            
        }else{
            return redirect()->back()->with('error', 'Incorrect Username or Password!');
        }
    }

    public function dashboard(){
        $sales_revenue = Order::sum('total');
        $product_sold = Order::sum('quantity');

        $topSellingProducts = OrderDetail::with('product')
        ->selectRaw('product_id, SUM(quantity) as total_sales')
        ->groupBy('product_id')
        ->orderByDesc('total_sales') 
        ->get();

        $inventoryLevels = Product::select('product_name', 'stocks')->get();

        return inertia('Admin/Dashboard',[
            'sales_revenue' => $sales_revenue,
            'product_sold' => $product_sold,
            'topSellingProducts' => $topSellingProducts,
            'inventoryLevels' => $inventoryLevels,
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
        $employees = User::whereIn('role', ['Manager', 'Cashier', 'Employee'])->get();
        return inertia('Admin/Employee',['employees' => $employees]);
    }

    public function viewEmployeeProfile($user_id) {
        // Sends the attendance history straight to the React frontend
        $employee_profile = User::with('attendances')->find($user_id);
        return inertia('Admin/Employee_Features/ViewProfile', [
            'user_info' => $employee_profile
        ]);
    }

    // THE NEW ATTENDANCE LOGIC
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
        $employees = User::whereIn('role', ['Manager', 'Cashier', 'Employee'])->get();

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
        $employees = User::whereIn('role', ['Manager', 'Cashier', 'Employee'])->get();
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
        
        $employees = User::whereIn('role', ['Manager', 'Cashier', 'Employee'])->get();
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
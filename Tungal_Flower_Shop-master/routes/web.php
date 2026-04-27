<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('Index');
})->name('index');

// LOGIN & AUTH ROUTES
Route::post('/login/process', [UserController::class, 'loginProcess'])->name('login.process');
Route::post('/logout', [UserController::class, 'logout'])->name('logout');

// ADMIN ROUTES
Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin/dashboard', [UserController::class, 'dashboard'])->name('admin.dashboard');
    
    // Inventory
    Route::get('/admin/inventory', [ProductController::class, 'showInventoryProduct'])->name('admin.inventory');
    Route::post('/admin/inventory/addProduct/store', [ProductController::class, 'storeProduct'])->name('inventory.storeProduct');
    Route::post('/admin/inventory/updateProduct', [ProductController::class, 'updateProduct'])->name('inventory.updateProduct');
    Route::delete('/admin/inventory/deleteProduct/{product}', [ProductController::class, 'destroyProduct'])->name('inventory.destroyProduct');
    Route::post('/admin/inventory/stockIn', [ProductController::class, 'stockIn'])->name('inventory.stockIn');
    Route::post('/admin/inventory/stockOut', [ProductController::class, 'stockOut'])->name('inventory.stockOut');
    
    // Employees
    Route::get('/admin/employee', [UserController::class, 'employee'])->name('admin.employee');
    Route::post('/admin/employee/addEmployee/store', [UserController::class, 'storeEmployee'])->name('employee.storeEmployee');
    Route::post('/admin/employee/updateEmployee', [UserController::class, 'updateEmployee'])->name('employee.updateEmployee');
    Route::delete('/admin/employee/deleteEmployee/{user}', [UserController::class, 'destroyEmployee'])->name('employee.destroyEmployee');
    
    // Admin Utility
    Route::get('/admin/sales', function () { return inertia('Admin/Sales'); })->name('admin.sales');
    Route::get('/admin/report', function () { return inertia('Admin/Report'); })->name('admin.report');
    Route::get('/admin/profile', [UserController::class, 'showAdminProfile'])->name('admin.profile');
    Route::post('/admin/profile/update', [UserController::class, 'updateAdminProfile'])->name('admin.updateProfile');
});

// CASHIER (EMPLOYEE) ROUTES - THE NEW POS
Route::middleware(['auth', 'employee'])->group(function () {
    Route::get('/product', [ProductController::class, 'displayProduct'])->name('customer.product');
    
    // Cart & POS Actions
    Route::get('/cart', [CartController::class, 'cart'])->name('customer.cart'); // Kept as backup/legacy
    Route::post('/cart/add', [CartController::class, 'addToCart'])->name('cart.add'); // THE NEW ADD ACTION
    Route::post('/cart/checkout', [CartController::class, 'checkout'])->name('cart.checkout');
    Route::delete('/cart/remove/{cart_id}', [CartController::class, 'removeItem'])->name('cart.remove');
    
    // Orders & Invoices
    Route::get('/orders', [OrderController::class, 'orders'])->name('customer.orders');
    Route::get('/invoice/{order_id}', [CartController::class, 'invoice'])->name('customer.invoice');
    Route::get('/download-invoice/{order_id}', [CartController::class, 'downloadInvoice'])->name('admin.downloadInvoice');
    
    // Cashier Profile
    Route::get('/profile', [UserController::class, 'showCustomerProfile'])->name('customer.profile');
    Route::post('/profile/update', [UserController::class, 'updateCustomerProfile'])->name('customer.updateProfile');
});

// DELIVERY ROUTES
Route::middleware(['auth', 'delivery'])->group(function () {
    Route::get('/delivery/dashboard', [OrderController::class, 'deliveryDashboard'])->name('delivery.dashboard');
    Route::get('/delivery/details/{id}', [OrderController::class, 'deliveryDetails'])->name('delivery.details');
    Route::get('/delivery/confirm/{id}', [OrderController::class, 'showDeliveryForm'])->name('delivery.confirm');
    Route::post('/delivery/confirm/{id}', [OrderController::class, 'storeDeliveryProof'])->name('delivery.storeProof');
});
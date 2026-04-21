import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import CustomerLayout from '../../Layout/CustomerLayout';

function BackIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function Cart({ cart_items, total_price }) {

  // Handlers to trigger your existing Controller routes
  const handleUpdateQuantity = (cartId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) return; // Prevent 0 quantity
    router.post(route('customer.updateCartQuantity'), { cart_id: cartId, quantity: newQuantity }, { preserveScroll: true });
  };

  const handleRemove = (cartId) => {
    router.post(route('customer.removeFromCart'), { cart_id: cartId }, { preserveScroll: true });
  };

  return (
    <div className="container-fluid py-5 px-4">
      <Head title="Sales Order" />

      {/* Header */}
      <div className="d-flex align-items-center gap-3 mb-5 mt-3">
        <Link 
            href={route('customer.product')} 
            className="btn btn-light shadow-sm d-flex align-items-center justify-content-center"
            style={{ width: '56px', height: '56px', borderRadius: '10px', border: '1px solid #dee2e6' }}
        >
          <BackIcon />
        </Link>
        <h1 className="fw-bold m-0" style={{ color: '#1E1E1E', fontSize: '2.5rem' }}>Sales Order</h1>
      </div>

      <div className="row g-4">
        {/* Left Side: Item List */}
        <div className="col-12 col-xl-8">
          <div className="card border-0 shadow-sm" style={{ borderRadius: '15px' }}>
            <div className="card-header bg-white border-0 pt-4 pb-0 px-4">
              <h5 className="fw-bold" style={{ color: '#7978E9' }}>Order Details</h5>
            </div>
            <div className="card-body p-4">
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead className="text-muted" style={{ fontSize: '0.85rem', textTransform: 'uppercase' }}>
                    <tr>
                      <th scope="col" className="border-0 pb-3">Product</th>
                      <th scope="col" className="border-0 pb-3">Price</th>
                      <th scope="col" className="border-0 pb-3 text-center">Quantity</th>
                      <th scope="col" className="border-0 pb-3 text-end">Total</th>
                      <th scope="col" className="border-0 pb-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart_items?.length > 0 ? (
                      cart_items.map((item) => (
                        <tr key={item.id} style={{ borderBottom: '1px solid #f8f9fa' }}>
                          <td className="py-3">
                            <div className="d-flex align-items-center gap-3">
                              <img 
                                src={`/storage/${item.product.image}`} 
                                alt={item.product.product_name} 
                                className="object-fit-cover rounded" 
                                style={{ width: '60px', height: '60px', border: '1px solid #dee2e6' }} 
                              />
                              <span className="fw-bold text-dark">{item.product.product_name}</span>
                            </div>
                          </td>
                          <td className="py-3 fw-semibold text-muted">₱{item.product.price}</td>
                          <td className="py-3">
                            <div className="d-flex align-items-center justify-content-center gap-2">
                              <button 
                                onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                                className="btn btn-sm btn-light border fw-bold" 
                                style={{ width: '30px', height: '30px', borderRadius: '8px' }}
                              >-</button>
                              <span className="fw-bold" style={{ width: '30px', textAlign: 'center' }}>{item.quantity}</span>
                              <button 
                                onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                                className="btn btn-sm btn-light border fw-bold" 
                                style={{ width: '30px', height: '30px', borderRadius: '8px' }}
                              >+</button>
                            </div>
                          </td>
                          <td className="py-3 text-end fw-bold" style={{ color: '#6C63FF' }}>₱{(item.product.price * item.quantity).toFixed(2)}</td>
                          <td className="py-3 text-end">
                            <button 
                                onClick={() => handleRemove(item.id)}
                                className="btn btn-sm text-danger"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-5 text-muted">Your cart is currently empty.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div className="col-12 col-xl-4">
          <div className="card border-0 shadow-sm" style={{ borderRadius: '15px', backgroundColor: '#F5F4FF' }}>
            <div className="card-body p-4 d-flex flex-column h-100">
              <h5 className="fw-bold mb-4" style={{ color: '#1E1E1E' }}>Order Summary</h5>
              
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted fw-semibold">Items ({cart_items?.length || 0})</span>
                <span className="fw-bold">₱{total_price ? parseFloat(total_price).toFixed(2) : '0.00'}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-4">
                <span className="text-muted fw-semibold">Tax (VAT Included)</span>
                <span className="fw-bold">₱0.00</span>
              </div>

              <hr style={{ borderColor: '#dee2e6' }} />

              <div className="d-flex justify-content-between align-items-center my-4">
                <span className="fw-bold fs-5" style={{ color: '#1E1E1E' }}>Total</span>
                <span className="fw-bold fs-3" style={{ color: '#7978E9' }}>₱{total_price ? parseFloat(total_price).toFixed(2) : '0.00'}</span>
              </div>

              {/* Action Button */}
              <Link 
                href={route('customer.checkout')} 
                className={`btn w-100 fw-bold text-white py-3 mt-auto ${!cart_items?.length ? 'disabled' : ''}`}
                style={{ backgroundColor: '#6C63FF', borderRadius: '10px', fontSize: '1.1rem' }}
              >
                Proceed to Payment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Cart.layout = page => <CustomerLayout children={page} />;
export default Cart;
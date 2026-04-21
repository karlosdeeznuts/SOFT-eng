import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import CustomerLayout from '../../Layout/CustomerLayout';
import ProductCard from '../../Components/ProductCard';

function CartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 18C15.89 18 15 18.89 15 20C15 20.5304 15.2107 21.0391 15.5858 21.4142C15.9609 21.7893 16.4696 22 17 22C17.5304 22 18.0391 21.7893 18.4142 21.4142C18.7893 21.0391 19 20.5304 19 20C19 19.4696 18.7893 18.9609 18.4142 18.5858C18.0391 18.2107 17.5304 18 17 18ZM1 2V4H3L6.6 11.59L5.24 14.04C5.09 14.32 5 14.65 5 15C5 15.5304 5.21071 16.0391 5.58579 16.4142C5.96086 16.7893 6.46957 17 7 17H19V15H7.42C7.3537 15 7.29011 14.9737 7.24322 14.9268C7.19634 14.8799 7.17 14.8163 7.17 14.75C7.17 14.7 7.18 14.66 7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.58 17.3 11.97L20.88 5.5C20.95 5.34 21 5.17 21 5C21 4.73478 20.8946 4.48043 20.7071 4.29289C20.5196 4.10536 20.2652 4 20 4H5.21L4.27 2M7 18C5.89 18 5 18.89 5 20C5 20.5304 5.21071 21.0391 5.58579 21.4142C5.96086 21.7893 6.46957 22 7 22C7.53043 22 8.03914 21.7893 8.41421 21.4142C8.78929 21.0391 9 20.5304 9 20C9 19.4696 8.78929 18.9609 8.41421 18.5858C8.03914 18.2107 7.53043 18 7 18Z" fill="currentColor"/>
    </svg>
  );
}

function RefundIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.0049 7H2.00488V4C2.00488 3.73478 2.11024 3.48043 2.29778 3.29289C2.48531 3.10536 2.73967 3 3.00488 3H21.0049C21.2701 3 21.5245 3.10536 21.712 3.29289C21.8995 3.48043 22.0049 3.73478 22.0049 4V7ZM22.0049 9V20C22.0049 20.2652 21.8995 20.5196 21.712 20.7071C21.5245 20.8946 21.2701 21 21.0049 21H3.00488C2.73967 21 2.48531 20.8946 2.29778 20.7071C2.11024 20.5196 2.00488 20.2652 2.00488 20V9H22.0049ZM11.0049 14V11.5L6.50488 16H17.0049V14H11.0049Z" fill="currentColor"/>
    </svg>
  );
}

function Product({ products }) {
  // Refund Modal State
  const [refundStep, setRefundStep] = useState(0);
  const [refundData, setRefundData] = useState({ orderId: '', reason: '', method: '' });

  // Add-to-Cart Success Message State
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);

  // Sales Order (Add to Cart) Modal State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { data, setData, post, processing, reset } = useForm({
    product_id: '',
    quantity: 1,
    type: 'Standard'
  });

  const handleOpenBuyModal = (product) => {
    setSelectedProduct(product);
    setData({ product_id: product.id, quantity: 1, type: 'Standard' });
  };

  const handleCloseBuyModal = () => {
    setSelectedProduct(null);
    reset();
  };

  const submitAddToCart = (e) => {
    e.preventDefault();
    post(route('customer.addToCart'), {
      preserveScroll: true,
      // FIXED: On success, close modal, reset form, and show success banner on THIS page.
      onSuccess: () => {
        handleCloseBuyModal();
        setShowSuccessBanner(true);
        // Automatically hide the banner after 3 seconds
        setTimeout(() => setShowSuccessBanner(false), 3000);
      }
    });
  };

  const handleCloseRefund = () => {
    setRefundStep(0);
    setRefundData({ orderId: '', reason: '', method: '' });
  };

  return (
    <div className="container-fluid py-5 px-4 position-relative">
      <Head title="Products Dashboard" />

      {/* FIXED: Dynamic Success Banner */}
      {showSuccessBanner && (
        <div className="alert alert-success shadow-sm d-flex align-items-center mb-4" role="alert" style={{ backgroundColor: '#F5F4FF', border: '1px solid #dee2e6', borderRadius: '10px', color: '#1E1E1E' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#28a745" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="me-2"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span className="fw-bold">Item successfully added to cart!</span>
        </div>
      )}
      
      {/* Header Row */}
      <div className="d-flex justify-content-between align-items-center mb-5 mt-3">
        <h1 className="fw-bold m-0" style={{ color: '#1E1E1E', fontSize: '2.5rem' }}>Products</h1>
        
        <div className="d-flex gap-3">
          <button 
            onClick={() => setRefundStep(1)} 
            className="btn d-flex align-items-center gap-2 fw-bold text-white shadow-sm" 
            style={{ backgroundColor: '#7DA0FA', border: '1px solid black', borderRadius: '10px', height: '56px' }}
          >
            <RefundIcon /> Request Refund
          </button>
          
          <Link href={route('customer.cart')} className="btn d-flex align-items-center gap-2 fw-bold text-white shadow-sm" style={{ backgroundColor: '#6C63FF', border: '1px solid black', borderRadius: '10px', height: '56px' }}>
            <CartIcon /> Cart
          </Link>
        </div>
      </div>

      {/* Products Grid */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4">
        {products?.data?.length > 0 ? (
          products.data.map((product) => (
            <div className="col" key={product.id}>
              <ProductCard
                id={product.id}
                name={product.product_name}
                price={product.price}
                stock={product.stocks}
                image={product.image}
                onBuyClick={handleOpenBuyModal}
              />
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5 bg-white rounded shadow-sm">
            <p className="text-muted">No products available at the moment.</p>
          </div>
        )}
      </div>

      {/* =========================================
          MODAL: SALES ORDER (Add to Cart)
      ============================================= */}
      {selectedProduct && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '15px', overflow: 'hidden' }}>
              <div className="modal-header border-0 text-white" style={{ backgroundColor: '#7978E9' }}>
                <h5 className="modal-title fw-bold">Sales Order</h5>
                <button type="button" className="btn-close btn-close-white" onClick={handleCloseBuyModal}></button>
              </div>
              <div className="modal-body p-4">
                <form onSubmit={submitAddToCart}>
                  
                  {/* Flower Readonly */}
                  <div className="mb-3">
                    <label className="form-label fw-bold" style={{ color: '#1E1E1E' }}>Flower</label>
                    <input 
                      type="text" 
                      className="form-control bg-light" 
                      value={selectedProduct.name} 
                      disabled 
                    />
                  </div>

                  {/* Type Dropdown */}
                  <div className="mb-3">
                    <label className="form-label fw-bold" style={{ color: '#1E1E1E' }}>Type</label>
                    <select 
                      className="form-select bg-light" 
                      value={data.type}
                      onChange={e => setData('type', e.target.value)}
                    >
                      <option value="Standard">Standard</option>
                      <option value="Premium">Premium Bouquet</option>
                      <option value="Custom">Custom Arrangement</option>
                    </select>
                  </div>

                  {/* Quantity */}
                  <div className="mb-3">
                    <label className="form-label fw-bold" style={{ color: '#1E1E1E' }}>Quantity</label>
                    <div className="input-group">
                      <button 
                        type="button"
                        className="btn btn-outline-secondary fw-bold" 
                        onClick={() => setData('quantity', Math.max(1, data.quantity - 1))}
                      >-</button>
                      <input 
                        type="number" 
                        className="form-control text-center" 
                        value={data.quantity} 
                        readOnly 
                      />
                      <button 
                        type="button"
                        className="btn btn-outline-secondary fw-bold" 
                        onClick={() => setData('quantity', Math.min(selectedProduct.stock, data.quantity + 1))}
                      >+</button>
                    </div>
                  </div>

                  {/* Price Calculation */}
                  <div className="mb-4">
                    <label className="form-label fw-bold" style={{ color: '#1E1E1E' }}>Total Price</label>
                    <div className="fw-bold fs-4" style={{ color: '#6C63FF' }}>
                      ₱{(selectedProduct.price * data.quantity).toFixed(2)}
                    </div>
                  </div>

                  <div className="d-flex justify-content-end gap-2">
                    <button type="button" className="btn btn-light fw-bold" onClick={handleCloseBuyModal} style={{ borderRadius: '10px' }}>Cancel</button>
                    <button 
                      type="submit" 
                      className="btn fw-bold text-white px-4" 
                      style={{ backgroundColor: '#6C63FF', borderRadius: '10px' }} 
                      disabled={processing}
                    >
                      {processing ? 'Adding...' : 'Add to Cart'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: REQUEST REFUND (Hidden, but exists) */}
      {/* ... keeping the refund modal logic you already have ... */}
    </div>
  );
}

Product.layout = page => <CustomerLayout children={page} />;
export default Product;
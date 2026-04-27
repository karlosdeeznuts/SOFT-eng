import React, { useState, useEffect } from 'react';
import CustomerLayout from '../../Layout/CustomerLayout';
import { Head, router, usePage, Link } from '@inertiajs/react';
import { Toaster, toast } from 'sonner';

export default function Cart({ carts, total }) {
    const { flash } = usePage().props;

    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [discountPercentage, setDiscountPercentage] = useState('');
    const [cashReceived, setCashReceived] = useState('');

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const discountAmount = discountPercentage ? (total * (Number(discountPercentage) / 100)) : 0;
    const grandTotal = total - discountAmount;
    const change = cashReceived ? (Number(cashReceived) - grandTotal) : 0;

    const handleCheckout = (e) => {
        e.preventDefault();
        if (Number(cashReceived) < grandTotal) {
            toast.error("Cash received is less than Grand Total!");
            return;
        }
        router.post(route('customer.checkout'), {
            cart_id: carts.data.map(c => c.id),
            total: grandTotal,
            cash_received: cashReceived,
            discount_percentage: discountPercentage || null,
            discount_amount: discountAmount
        }, {
            preserveScroll: true,
            onSuccess: () => setIsPaymentModalOpen(false)
        });
    };

    const removeCartItem = (id) => {
        router.get(route('customer.removeItem', id), { preserveScroll: true });
    };

    return (
        <div style={{ backgroundColor: '#F4F5FA', minHeight: '100vh', paddingBottom: '40px' }}>
            <Head title="My Cart" />
            <Toaster position="top-center" richColors />

            <div className="container px-4 pt-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bolder m-0" style={{ color: '#1E1E1E' }}>Cart Overview</h2>
                    <Link href={route('customer.product')} className="btn btn-light fw-bold text-dark shadow-sm rounded-3">Back to Products</Link>
                </div>

                <div className="row g-4">
                    {/* CART ITEMS TABLE */}
                    <div className="col-lg-8">
                        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                            <div className="table-responsive">
                                <table className="table table-borderless align-middle mb-0">
                                    <thead style={{ backgroundColor: '#F8F9FA', borderBottom: '2px solid #EBEAEE' }}>
                                        <tr>
                                            <th className="py-3 px-4 text-muted fw-semibold" style={{ fontSize: '13px' }}>Product Details</th>
                                            <th className="py-3 px-4 text-muted fw-semibold" style={{ fontSize: '13px' }}>Type & Multiplier</th>
                                            <th className="py-3 px-4 text-muted fw-semibold" style={{ fontSize: '13px' }}>Qty</th>
                                            <th className="py-3 px-4 text-muted fw-semibold" style={{ fontSize: '13px' }}>Subtotal</th>
                                            <th className="py-3 px-4 text-muted fw-semibold text-center" style={{ fontSize: '13px' }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {carts.data && carts.data.length > 0 ? (
                                            carts.data.map(cart => (
                                                <tr key={cart.id} className="border-bottom">
                                                    <td className="py-3 px-4">
                                                        <div className="d-flex align-items-center gap-3">
                                                            <div className="rounded-3 overflow-hidden shadow-sm" style={{ width: '50px', height: '50px', backgroundColor: '#F4F5FA' }}>
                                                                <img src={cart.product?.image ? `/storage/${cart.product.image}` : '/assets/images/product.png'} className="w-100 h-100 object-fit-cover" alt="Product" />
                                                            </div>
                                                            <h6 className="fw-bold mb-0 text-dark">{cart.product?.product_name}</h6>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-4 text-muted fw-medium" style={{ fontSize: '14px' }}>
                                                        {cart.type_name} (x{cart.multiplier})
                                                    </td>
                                                    <td className="py-3 px-4 fw-bold text-dark">{cart.quantity}</td>
                                                    <td className="py-3 px-4 fw-bold text-dark">₱{cart.subtotal}</td>
                                                    <td className="py-3 px-4 text-center">
                                                        <button onClick={() => removeCartItem(cart.id)} className="btn btn-sm btn-light text-danger fw-bold rounded-3">Remove</button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr><td colSpan="5" className="text-center py-5 text-muted">Your cart is currently empty.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="d-flex justify-content-center mt-4">
                            {carts.links && carts.links.map((link, index) => (
                                <Link 
                                    key={index} 
                                    href={link.url} 
                                    className={`btn btn-sm mx-1 ${link.active ? 'btn-primary' : 'btn-light text-dark'}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    style={{ backgroundColor: link.active ? '#7859FF' : '#FFF', borderColor: link.active ? '#7859FF' : '#DEE2E6' }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* CHECKOUT SUMMARY */}
                    <div className="col-lg-4">
                        <div className="card border-0 shadow-sm rounded-4 p-4" style={{ backgroundColor: '#FFF' }}>
                            <h5 className="fw-bold mb-4" style={{ color: '#1E1E1E' }}>Order Summary</h5>
                            
                            <div className="mb-4">
                                <label className="form-label text-muted fw-bold mb-2" style={{ fontSize: '13px' }}>Apply Discount (%)</label>
                                <div className="input-group">
                                    <input 
                                        type="number" 
                                        className="form-control shadow-none" 
                                        placeholder="0" 
                                        min="0" max="100"
                                        value={discountPercentage} 
                                        onChange={(e) => setDiscountPercentage(e.target.value)} 
                                        disabled={carts.data.length === 0}
                                    />
                                    <span className="input-group-text bg-light text-muted fw-bold">%</span>
                                </div>
                            </div>

                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-muted fw-medium">Subtotal:</span>
                                <span className="fw-bold text-dark">₱{total.toFixed(2)}</span>
                            </div>
                            
                            {discountAmount > 0 && (
                                <div className="d-flex justify-content-between mb-2 text-danger">
                                    <span className="fw-medium">Discount (-{discountPercentage}%):</span>
                                    <span className="fw-bold">-₱{discountAmount.toFixed(2)}</span>
                                </div>
                            )}

                            <hr className="my-3" />

                            <div className="d-flex justify-content-between mb-4">
                                <span className="fw-bolder" style={{ fontSize: '18px', color: '#1E1E1E' }}>Grand Total:</span>
                                <span className="fw-bolder" style={{ fontSize: '22px', color: '#7859FF' }}>₱{grandTotal.toFixed(2)}</span>
                            </div>

                            <button 
                                onClick={() => setIsPaymentModalOpen(true)}
                                disabled={carts.data.length === 0} 
                                className="btn w-100 fw-bold text-white py-3 rounded-3 shadow-sm" 
                                style={{ backgroundColor: carts.data.length === 0 ? '#C5B5FF' : '#7859FF', fontSize: '16px' }}
                            >
                                Proceed to Payment
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* PAYMENT MODAL */}
            {isPaymentModalOpen && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(20, 20, 30, 0.7)', zIndex: 1050 }}>
                    <div className="card shadow-lg border-0 rounded-4" style={{ width: '100%', maxWidth: '400px', backgroundColor: '#FFF' }}>
                        <div className="card-header bg-white border-bottom-0 pt-4 pb-0 px-4 text-center">
                            <h4 className="fw-bolder m-0 text-dark">Confirm Payment</h4>
                        </div>
                        <div className="card-body px-4 py-4">
                            <form onSubmit={handleCheckout}>
                                <div className="text-center mb-4">
                                    <p className="text-muted mb-1" style={{ fontSize: '13px' }}>Amount Due</p>
                                    <h1 className="fw-bolder mb-0" style={{ color: '#7859FF', fontSize: '38px' }}>₱{grandTotal.toFixed(2)}</h1>
                                </div>
                                
                                <div className="mb-3">
                                    <label className="form-label text-muted fw-bold mb-1" style={{ fontSize: '12px' }}>Cash Received (₱)</label>
                                    <input 
                                        type="number" 
                                        className="form-control form-control-lg text-center shadow-none fw-bold" 
                                        style={{ borderRadius: '10px', fontSize: '20px' }} 
                                        min={grandTotal}
                                        value={cashReceived} 
                                        onChange={(e) => setCashReceived(e.target.value)} 
                                        required 
                                        autoFocus
                                    />
                                </div>

                                <div className="d-flex justify-content-between align-items-center mb-4 p-3 rounded-3" style={{ backgroundColor: change >= 0 ? '#F4FCF7' : '#FFF0F0' }}>
                                    <span className="fw-bold text-muted" style={{ fontSize: '14px' }}>Change:</span>
                                    <span className={`fw-bolder ${change >= 0 ? 'text-success' : 'text-danger'}`} style={{ fontSize: '20px' }}>
                                        ₱{change >= 0 ? change.toFixed(2) : '0.00'}
                                    </span>
                                </div>

                                <div className="d-flex gap-2">
                                    <button type="button" onClick={() => setIsPaymentModalOpen(false)} className="btn btn-light fw-bold text-muted w-50 py-2 rounded-3 shadow-sm">Cancel</button>
                                    <button type="submit" disabled={change < 0 || !cashReceived} className="btn fw-bold text-white w-50 py-2 rounded-3 shadow-sm" style={{ backgroundColor: '#0D6EFD' }}>Confirm Order</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

Cart.layout = page => <CustomerLayout children={page} />;
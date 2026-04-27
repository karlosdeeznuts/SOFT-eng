import React, { useState, useEffect } from 'react';
import CustomerLayout from '../../Layout/CustomerLayout';
import { Head, router, usePage, Link } from '@inertiajs/react';
import { Toaster, toast } from 'sonner';

export default function Product({ products, carts, cartTotal }) {
    const { flash } = usePage().props;

    // --- Add to Cart Modal States ---
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedFlower, setSelectedFlower] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [addQuantity, setAddQuantity] = useState(1);

    // --- Payment Modal States ---
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [discountPercentage, setDiscountPercentage] = useState('');
    const [cashReceived, setCashReceived] = useState('');

    // --- Toast Notifications ---
    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    // --- POS Real-Time Math ---
    const discountAmount = discountPercentage ? (cartTotal * (Number(discountPercentage) / 100)) : 0;
    const grandTotal = cartTotal - discountAmount;
    const change = cashReceived ? (Number(cashReceived) - grandTotal) : 0;

    // --- Action: Open Add to Cart ---
    const openAddModal = (flower) => {
        setSelectedFlower(flower);
        // Default to first custom type, or inject a base unit if none exist
        if (flower.types && flower.types.length > 0) {
            setSelectedType(flower.types[0]);
        } else {
            setSelectedType({ name: 'Base Unit', multiplier: 1 });
        }
        setAddQuantity(1);
        setIsAddModalOpen(true);
    };

    const handleAddToCart = (e) => {
        e.preventDefault();
        router.post(route('cart.add'), {
            product_id: selectedFlower.id,
            type_name: selectedType.name,
            multiplier: selectedType.multiplier,
            quantity: addQuantity,
            price: selectedFlower.price 
        }, {
            preserveScroll: true,
            onSuccess: () => setIsAddModalOpen(false)
        });
    };

    // --- Action: Complete Checkout ---
    const handleCheckout = (e) => {
        e.preventDefault();
        if (Number(cashReceived) < grandTotal) {
            toast.error("Cash received is less than Grand Total!");
            return;
        }
        router.post(route('cart.checkout'), {
            cart_id: carts.map(c => c.id),
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
        router.delete(route('cart.remove', id), { preserveScroll: true });
    };

    return (
        <div style={{ backgroundColor: '#F4F5FA', minHeight: '100vh', paddingBottom: '20px' }}>
            <Head title="Point of Sale" />
            <Toaster position="top-center" richColors />

            <div className="container-fluid px-4 pt-4">
                <div className="row g-4">
                    
                    {/* LEFT SIDE: FLOWER CATALOG (70%) */}
                    <div className="col-lg-8">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h3 className="fw-bolder m-0" style={{ color: '#1E1E1E' }}>Shop Products</h3>
                        </div>

                        <div className="row g-3">
                            {products.data && products.data.length > 0 ? (
                                products.data.map((flower) => (
                                    <div key={flower.id} className="col-md-4 col-sm-6">
                                        <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden" style={{ cursor: 'pointer', transition: 'transform 0.2s' }} onClick={() => openAddModal(flower)}>
                                            <div style={{ height: '180px', backgroundColor: '#EBEAEE' }}>
                                                <img src={flower.image ? `/storage/${flower.image}` : '/assets/images/product.png'} className="w-100 h-100 object-fit-cover" alt={flower.product_name} />
                                            </div>
                                            <div className="card-body d-flex flex-column justify-content-between p-3">
                                                <div>
                                                    <h6 className="fw-bold mb-1 text-dark text-truncate">{flower.product_name}</h6>
                                                    <p className="text-muted mb-2" style={{ fontSize: '12px' }}>
                                                        Base Stock: <span className={flower.stocks > 0 ? 'text-success fw-bold' : 'text-danger fw-bold'}>{flower.stocks}</span>
                                                    </p>
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center mt-2">
                                                    <span className="fw-bold text-dark" style={{ fontSize: '16px' }}>₱{flower.price}</span>
                                                    <button className="btn btn-sm text-white fw-bold rounded-3 px-3" style={{ backgroundColor: '#7859FF', fontSize: '12px' }}>Buy</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-12 text-center py-5 text-muted">No products available in inventory.</div>
                            )}
                        </div>

                        {/* Pagination */}
                        <div className="d-flex justify-content-center mt-4">
                            {products.links && products.links.map((link, index) => (
                                <Link 
                                    key={index} 
                                    href={link.url} 
                                    className={`btn btn-sm mx-1 ${link.active ? 'btn-primary' : 'btn-light text-dark'}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    style={{ 
                                        backgroundColor: link.active ? '#7859FF' : '#FFF', 
                                        borderColor: link.active ? '#7859FF' : '#DEE2E6' 
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* RIGHT SIDE: ACTIVE CART & REGISTER (30%) */}
                    <div className="col-lg-4">
                        <div className="card border-0 shadow-sm rounded-4 h-100 d-flex flex-column" style={{ backgroundColor: '#FFF', position: 'sticky', top: '20px', maxHeight: '90vh' }}>
                            
                            <div className="p-3 border-bottom d-flex align-items-center justify-content-between" style={{ backgroundColor: '#F8F9FA', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}>
                                <h5 className="fw-bold m-0" style={{ color: '#1E1E1E' }}>Active Order</h5>
                                <span className="badge rounded-pill" style={{ backgroundColor: '#7859FF', fontSize: '13px' }}>{carts.length} Items</span>
                            </div>

                            {/* Cart List */}
                            <div className="p-3 flex-grow-1 overflow-auto" style={{ backgroundColor: '#FCFCFC' }}>
                                {carts && carts.length > 0 ? (
                                    carts.map(cart => (
                                        <div key={cart.id} className="card border-0 shadow-sm mb-2 rounded-3 p-2">
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div>
                                                    <h6 className="fw-bold m-0 text-dark" style={{ fontSize: '14px' }}>{cart.product?.product_name || 'Item'}</h6>
                                                    <p className="text-muted m-0" style={{ fontSize: '12px' }}>
                                                        {cart.type_name} (x{cart.multiplier}) &times; Qty: <span className="fw-bold text-dark">{cart.quantity}</span>
                                                    </p>
                                                </div>
                                                <div className="text-end">
                                                    <span className="fw-bold d-block text-dark" style={{ fontSize: '14px' }}>₱{cart.subtotal}</span>
                                                    <button onClick={() => removeCartItem(cart.id)} className="btn btn-link text-danger p-0 mt-1 shadow-none" style={{ fontSize: '12px', textDecoration: 'none' }}>Remove</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-5 text-muted">
                                        <p style={{ fontSize: '14px' }}>Cart is currently empty.</p>
                                    </div>
                                )}
                            </div>

                            {/* Math & Checkout Section */}
                            <div className="p-4 border-top" style={{ backgroundColor: '#FFF', borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px' }}>
                                
                                <div className="mb-3">
                                    <label className="form-label text-muted fw-bold mb-1" style={{ fontSize: '12px' }}>Discount (%)</label>
                                    <div className="input-group input-group-sm">
                                        <input 
                                            type="number" 
                                            className="form-control shadow-none" 
                                            placeholder="0" 
                                            min="0" max="100"
                                            value={discountPercentage} 
                                            onChange={(e) => setDiscountPercentage(e.target.value)} 
                                            disabled={carts.length === 0}
                                        />
                                        <span className="input-group-text bg-light text-muted fw-bold">%</span>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between mb-1">
                                    <span className="text-muted" style={{ fontSize: '14px' }}>Subtotal:</span>
                                    <span className="fw-bold text-dark">₱{cartTotal.toFixed(2)}</span>
                                </div>
                                
                                {discountAmount > 0 && (
                                    <div className="d-flex justify-content-between mb-1 text-danger">
                                        <span style={{ fontSize: '14px' }}>Discount (-{discountPercentage}%):</span>
                                        <span className="fw-bold">-₱{discountAmount.toFixed(2)}</span>
                                    </div>
                                )}

                                <div className="d-flex justify-content-between mt-3 pt-3 border-top">
                                    <span className="fw-bolder" style={{ fontSize: '18px', color: '#1E1E1E' }}>Grand Total:</span>
                                    <span className="fw-bolder" style={{ fontSize: '22px', color: '#7859FF' }}>₱{grandTotal.toFixed(2)}</span>
                                </div>

                                <button 
                                    onClick={() => setIsPaymentModalOpen(true)}
                                    disabled={carts.length === 0} 
                                    className="btn w-100 fw-bold text-white mt-4 py-2 rounded-3 shadow-sm" 
                                    style={{ backgroundColor: carts.length === 0 ? '#C5B5FF' : '#7859FF', fontSize: '16px' }}
                                >
                                    Proceed to Payment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL 1: ADD TO CART */}
            {isAddModalOpen && selectedFlower && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(20, 20, 30, 0.6)', zIndex: 1050 }}>
                    <div className="card shadow-lg border-0 rounded-4" style={{ width: '100%', maxWidth: '450px', backgroundColor: '#FFF' }}>
                        <div className="card-header bg-white border-bottom-0 pt-4 pb-2 px-4 d-flex justify-content-between align-items-center">
                            <h5 className="fw-bold m-0 text-dark">{selectedFlower.product_name}</h5>
                            <button onClick={() => setIsAddModalOpen(false)} className="btn-close shadow-none"></button>
                        </div>
                        <div className="card-body px-4 pb-4">
                            <form onSubmit={handleAddToCart}>
                                <div className="mb-3">
                                    <label className="form-label text-muted fw-bold mb-1" style={{ fontSize: '12px' }}>Select Type (Quantifier)</label>
                                    <select 
                                        className="form-select shadow-none" 
                                        style={{ borderRadius: '8px' }}
                                        value={JSON.stringify(selectedType)} 
                                        onChange={(e) => setSelectedType(JSON.parse(e.target.value))}
                                    >
                                        {selectedFlower.types && selectedFlower.types.length > 0 ? (
                                            selectedFlower.types.map(t => (
                                                <option key={t.id} value={JSON.stringify(t)}>
                                                    {t.name} (Contains {t.multiplier} pcs)
                                                </option>
                                            ))
                                        ) : (
                                            <option value={JSON.stringify({ name: 'Base Unit', multiplier: 1 })}>
                                                Base Unit (Contains 1 pc)
                                            </option>
                                        )}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label text-muted fw-bold mb-1" style={{ fontSize: '12px' }}>Quantity (Bundles)</label>
                                    <input 
                                        type="number" 
                                        className="form-control shadow-none" 
                                        style={{ borderRadius: '8px' }} 
                                        min="1" 
                                        value={addQuantity} 
                                        onChange={(e) => setAddQuantity(e.target.value)} 
                                        required 
                                    />
                                    <small className="text-muted d-block mt-1" style={{ fontSize: '11px' }}>
                                        Total base pieces to deduct: <span className="fw-bold text-dark">{addQuantity * selectedType.multiplier}</span>
                                    </small>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-4 p-3 rounded-3" style={{ backgroundColor: '#F8F9FA' }}>
                                    <span className="fw-bold text-muted" style={{ fontSize: '14px' }}>Subtotal:</span>
                                    <span className="fw-bolder text-dark" style={{ fontSize: '18px' }}>₱{(selectedFlower.price * selectedType.multiplier * addQuantity).toFixed(2)}</span>
                                </div>
                                <button type="submit" className="btn w-100 fw-bold text-white py-2 rounded-3 shadow-sm" style={{ backgroundColor: '#28A745', fontSize: '15px' }}>Add to Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL 2: CHECKOUT & PAYMENT */}
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
                                    <button type="submit" disabled={change < 0 || !cashReceived} className="btn fw-bold text-white w-50 py-2 rounded-3 shadow-sm" style={{ backgroundColor: '#0D6EFD' }}>Confirm</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

Product.layout = page => <CustomerLayout children={page} />;
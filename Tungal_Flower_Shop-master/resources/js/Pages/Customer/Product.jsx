import React, { useState, useEffect } from 'react';
import CustomerLayout from '../../Layout/CustomerLayout';
import { Head, router, usePage, Link } from '@inertiajs/react';
import { Toaster, toast } from 'sonner';

export default function Product({ products }) {
    const { flash } = usePage().props;

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedFlower, setSelectedFlower] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [addQuantity, setAddQuantity] = useState(1);

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    const openAddModal = (flower) => {
        setSelectedFlower(flower);
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
        router.post(route('customer.addToCart'), {
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

    return (
        <div style={{ backgroundColor: '#F4F5FA', minHeight: '100vh', paddingBottom: '20px' }}>
            <Head title="Products" />
            <Toaster position="top-center" richColors />

            <div className="container-fluid px-4 pt-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="fw-bolder m-0" style={{ color: '#1E1E1E' }}>Shop Products</h3>
                </div>

                <div className="row g-4">
                    {products.data && products.data.length > 0 ? (
                        products.data.map((flower) => (
                            <div key={flower.id} className="col-lg-3 col-md-4 col-sm-6">
                                <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden" style={{ cursor: 'pointer', transition: 'transform 0.2s' }} onClick={() => openAddModal(flower)}>
                                    <div style={{ height: '220px', backgroundColor: '#EBEAEE' }}>
                                        <img src={flower.image ? `/storage/${flower.image}` : '/assets/images/product.png'} className="w-100 h-100 object-fit-cover" alt={flower.product_name} />
                                    </div>
                                    <div className="card-body d-flex flex-column justify-content-between p-3">
                                        <div>
                                            <h5 className="fw-bold mb-1 text-dark text-truncate">{flower.product_name}</h5>
                                            <p className="text-muted mb-2" style={{ fontSize: '13px' }}>
                                                Base Stock: <span className={flower.stocks > 0 ? 'text-success fw-bold' : 'text-danger fw-bold'}>{flower.stocks}</span>
                                            </p>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                            <span className="fw-bolder text-dark" style={{ fontSize: '18px' }}>₱{flower.price}</span>
                                            <button className="btn text-white fw-bold rounded-3 px-4 shadow-sm" style={{ backgroundColor: '#7859FF', fontSize: '14px' }}>Buy</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center py-5 text-muted">No products available.</div>
                    )}
                </div>

                <div className="d-flex justify-content-center mt-5">
                    {products.links && products.links.map((link, index) => (
                        <Link 
                            key={index} 
                            href={link.url} 
                            className={`btn btn-sm mx-1 ${link.active ? 'btn-primary' : 'btn-light text-dark'}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            style={{ backgroundColor: link.active ? '#7859FF' : '#FFF', borderColor: link.active ? '#7859FF' : '#DEE2E6', padding: '8px 12px' }}
                        />
                    ))}
                </div>
            </div>

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
                                <button type="submit" className="btn w-100 fw-bold text-white py-2 rounded-3 shadow-sm" style={{ backgroundColor: '#28A745', fontSize: '15px' }}>Add to Cart</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

Product.layout = page => <CustomerLayout children={page} />;
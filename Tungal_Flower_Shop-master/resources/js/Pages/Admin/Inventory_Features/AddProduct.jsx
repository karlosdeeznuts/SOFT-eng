import React, { useEffect, useState, useRef } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { Toaster, toast } from 'sonner';

const UploadIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6C757D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="17 8 12 3 7 8"></polyline>
        <line x1="12" y1="3" x2="12" y2="15"></line>
    </svg>
);

export default function AddProduct({ isOpen, onClose }) {
    const fileInputRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);

    // Wired up to match your existing Product DB, with placeholders for the new UI fields
    const { data, setData, post, processing, errors, reset } = useForm({
        product_image: '',
        product_name: '',
        type: 'Flower',          // Placeholder for future migration
        description: '',
        stocks: '',              // Maps to Quantity
        wholesale_price: '',     // Placeholder for future migration
        price: '',               // Maps to Retail Price in your current DB
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('product_image', file); 
        if (file) {
            setImagePreview(URL.createObjectURL(file)); 
        } else {
            setImagePreview(null); 
        }
    };

    function submit(e) {
        e.preventDefault();
        // Uses the existing route in your web.php
        post(route('inventory.storeProduct'), {
            onSuccess: () => {
                reset();
                setData('product_image', 'null');
                setImagePreview(null);
                onClose();
            }
        });
    }

    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    if (!isOpen) return null;

    return (
        <div 
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
            style={{ backgroundColor: 'rgba(20, 20, 30, 0.5)', zIndex: 1050, padding: '15px' }}
        >
            <Toaster position="top-right" expand={true} richColors />

            <div 
                className="card shadow-lg border-0" 
                style={{ 
                    borderRadius: '16px', 
                    width: '100%', 
                    maxWidth: '550px',
                    backgroundColor: '#FFF'
                }}
            >
                <div className="card-body px-4 py-4">
                    <form onSubmit={submit}>

                        {/* IMAGE SECTION */}
                        <div className="text-center mb-3">
                            <h6 className="fw-bold text-dark mb-2" style={{ fontSize: '14px' }}>Product Image</h6>
                            <div 
                                className="d-flex flex-column justify-content-center align-items-center mx-auto"
                                style={{ 
                                    border: '2px dashed #DADDE1',
                                    backgroundColor: '#F8F9FA',
                                    borderRadius: '10px',
                                    height: '90px',
                                    maxWidth: '300px',
                                    cursor: 'pointer'
                                }}
                                onClick={() => fileInputRef.current.click()}
                            >
                                {imagePreview ? (
                                    <img 
                                        src={imagePreview} 
                                        alt="Preview" 
                                        className="object-fit-cover rounded"
                                        style={{ height: '100%', width: '100%' }}
                                    />
                                ) : (
                                    <>
                                        <UploadIcon />
                                        <p className="text-muted mt-1 mb-0" style={{ fontSize: '12px' }}>Drag or Click to Upload</p>
                                    </>
                                )}
                            </div>
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                className="d-none" 
                                onChange={handleImageChange} 
                                accept="image/png, image/jpeg, image/jpg" 
                            />
                            {errors.product_image && <div className="text-danger mt-1" style={{ fontSize: '12px' }}>{errors.product_image}</div>}
                        </div>

                        {/* TITLE */}
                        <h4 className="fw-bold text-center mb-3">Add Product</h4>

                        {/* FORM - Tightly packed */}
                        <div className="row g-2">
                            <div className="col-12">
                                <label className="form-label text-muted mb-1" style={{ fontSize: '12px' }}>Product Name</label>
                                <input type="text" className={`form-control form-control-sm ${errors.product_name ? 'is-invalid' : ''}`} style={{ borderRadius: '8px' }} placeholder="e.g. Red Roses Bouquet" value={data.product_name} onChange={(e) => setData('product_name', e.target.value)} />
                                {errors.product_name && <div className="invalid-feedback">{errors.product_name}</div>}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label text-muted mb-1" style={{ fontSize: '12px' }}>Type</label>
                                <select className="form-select form-select-sm" style={{ borderRadius: '8px' }} value={data.type} onChange={(e) => setData('type', e.target.value)}>
                                    <option value="Flower">Flower</option>
                                    <option value="Bouquet">Bouquet</option>
                                    <option value="Vase">Vase</option>
                                    <option value="Add-on">Add-on</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label text-muted mb-1" style={{ fontSize: '12px' }}>Quantity (Stocks)</label>
                                <input type="number" className={`form-control form-control-sm ${errors.stocks ? 'is-invalid' : ''}`} style={{ borderRadius: '8px' }} placeholder="0" value={data.stocks} onChange={(e) => setData('stocks', e.target.value)} />
                                {errors.stocks && <div className="invalid-feedback">{errors.stocks}</div>}
                            </div>

                            <div className="col-12">
                                <label className="form-label text-muted mb-1" style={{ fontSize: '12px' }}>Description</label>
                                <textarea className={`form-control form-control-sm ${errors.description ? 'is-invalid' : ''}`} style={{ borderRadius: '8px', resize: 'none' }} rows="2" placeholder="Brief description..." value={data.description} onChange={(e) => setData('description', e.target.value)}></textarea>
                                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label text-muted mb-1" style={{ fontSize: '12px' }}>Wholesale Price (₱)</label>
                                <input type="number" className={`form-control form-control-sm ${errors.wholesale_price ? 'is-invalid' : ''}`} style={{ borderRadius: '8px' }} placeholder="0.00" value={data.wholesale_price} onChange={(e) => setData('wholesale_price', e.target.value)} />
                                {errors.wholesale_price && <div className="invalid-feedback">{errors.wholesale_price}</div>}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label text-muted mb-1" style={{ fontSize: '12px' }}>Retail Price (₱)</label>
                                <input type="number" className={`form-control form-control-sm ${errors.price ? 'is-invalid' : ''}`} style={{ borderRadius: '8px' }} placeholder="0.00" value={data.price} onChange={(e) => setData('price', e.target.value)} />
                                {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                            </div>
                        </div>

                        {/* BUTTONS */}
                        <div className="d-flex justify-content-center gap-3 mt-4">
                            <button type="button" onClick={onClose} className="btn btn-sm fw-bold text-white px-4" style={{ backgroundColor: '#DC3545', borderRadius: '8px', minWidth: '120px', padding: '8px' }}>
                                Cancel
                            </button>
                            <button type="submit" disabled={processing} className="btn btn-sm fw-bold text-white px-4" style={{ backgroundColor: '#0D6EFD', borderRadius: '8px', minWidth: '120px', padding: '8px' }}>
                                {processing ? 'Saving...' : 'Submit'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
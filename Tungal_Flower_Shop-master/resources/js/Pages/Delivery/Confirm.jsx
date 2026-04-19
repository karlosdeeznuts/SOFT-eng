import React from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import DeliveryLayout from '../../Layout/DeliveryLayout';

function Confirm({ order }) {
    const { data, setData, post, processing, errors } = useForm({
        proof_image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('delivery.confirm.store', order.id));
    };

    return (
        <div className="container py-5" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <Head title="Confirm Delivery" />
            
            <div className="card shadow-sm border-0">
                <div className="card-header bg-dark text-white text-center py-3 position-relative">
                    <Link href={route('delivery.details', order.id)} className="btn btn-sm btn-outline-light position-absolute" style={{ left: '15px', top: '15px' }}>Back</Link>
                    <h5 className="mb-0 mt-1">Delivery Proof</h5>
                    <small>Order #{order.id}</small>
                </div>
                
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="form-label fw-bold">Upload Photo of Delivery</label>
                            <input 
                                type="file" 
                                className="form-control form-control-lg bg-light" 
                                onChange={e => setData('proof_image', e.target.files[0])}
                                accept="image/*"
                                capture="environment" 
                            />
                            <div className="form-text mt-2">
                                Take a clear photo of the items at the delivery location.
                            </div>
                            {errors.proof_image && (
                                <div className="text-danger mt-2 fw-bold">{errors.proof_image}</div>
                            )}
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn-success w-100 py-3 fs-5 fw-bold shadow-sm" 
                            disabled={processing}
                        >
                            {processing ? 'Uploading...' : 'Confirm Delivery'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

// Forces the page to use the Delivery Sidebar instead of the Customer default
Confirm.layout = page => <DeliveryLayout children={page} />;
export default Confirm;
import React from 'react';
import { useForm, Head } from '@inertiajs/react';

export default function DeliveryProof({ order }) {
    const { data, setData, post, processing, errors } = useForm({
        proof_image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('orders.delivery_confirm.store', order.id));
    };

    return (
        <div className="container py-5" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <Head title="Confirm Delivery" />
            
            <div className="card shadow-sm border-0">
                <div className="card-header bg-dark text-white text-center py-3">
                    <h4 className="mb-0">Delivery Proof</h4>
                    <small>Order #{order.id}</small>
                </div>
                
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="form-label fw-bold">Upload Photo of Delivery</label>
                            <input 
                                type="file" 
                                className="form-control form-control-lg" 
                                onChange={e => setData('proof_image', e.target.files[0])}
                                accept="image/*"
                                capture="environment" 
                            />
                            <div className="form-text mt-2">
                                Take a clear photo of the items at the delivery location.
                            </div>
                            {errors.proof_image && (
                                <div className="text-danger mt-2">{errors.proof_image}</div>
                            )}
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn-success w-100 py-2 fs-5" 
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
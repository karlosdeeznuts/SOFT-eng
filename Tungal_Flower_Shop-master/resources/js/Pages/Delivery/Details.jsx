import React from 'react';
import { Head, Link } from '@inertiajs/react';
import DeliveryLayout from '../../Layout/DeliveryLayout';

function Details({ order }) {
    return (
        <div className="container py-4" style={{ maxWidth: '600px' }}>
            <Head title={`Order #${order.id} Details`} />
            
            <div className="card shadow-sm border-0">
                <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center py-3">
                    <h5 className="mb-0">Order #{order.id} Details</h5>
                    <Link href={route('delivery.dashboard')} className="btn btn-sm btn-outline-light">Back</Link>
                </div>
                
                <div className="card-body p-4">
                    <h5 className="border-bottom pb-2 text-success fw-bold">Customer Information</h5>
                    {/* Placeholder Data Because Backend is Missing */}
                    <p className="mb-1"><strong>Name:</strong> John Doe (Placeholder)</p>
                    <p className="mb-1"><strong>Phone:</strong> 0912 345 6789 (Placeholder)</p>
                    <p className="mb-3"><strong>Delivery Address:</strong> 123 Dummy Street, Placeholder City</p>
                    
                    <h5 className="border-bottom pb-2 mt-4 text-success fw-bold">Order Summary</h5>
                    <p className="mb-1"><strong>Total Price:</strong> ₱{order.total || '0.00'}</p>
                    <p className="mb-3 d-flex align-items-center">
                        <strong>Status:</strong>
                        <span className={`ms-2 badge ${
                            order.order_status === 'Delivered' ? 'bg-success' :
                            order.order_status === 'Received' ? 'bg-primary' :
                            'bg-warning text-dark'
                        }`}>
                            {order.order_status}
                        </span>
                    </p>

                    <div className="mt-4 pt-3 border-top">
                        {order.order_status === 'Delivered' ? (
                            <div className="alert alert-success text-center fw-bold">
                                This order has been delivered.
                            </div>
                        ) : (
                            <Link href={route('delivery.confirm.show', order.id)} className="btn btn-success w-100 py-3 fw-bold shadow-sm">
                                Proceed to Upload Proof
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Forces the page to use the Delivery Sidebar instead of the Customer default
Details.layout = page => <DeliveryLayout children={page} />;
export default Details;
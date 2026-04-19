import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Details({ order }) {
    return (
        <div className="container py-4" style={{ maxWidth: '600px' }}>
            <Head title={`Order #${order.id} Details`} />
            
            <div className="card shadow-sm">
                <div className="card-header bg-dark text-white">
                    <h4 className="mb-0">Order #{order.id} Details</h4>
                </div>
                <div className="card-body">
                    <h5 className="border-bottom pb-2">Customer Information</h5>
                    {/* Placeholder Data Because Backend is Missing */}
                    <p><strong>Name:</strong> John Doe (Placeholder)</p>
                    <p><strong>Phone:</strong> 0912 345 6789 (Placeholder)</p>
                    <p><strong>Delivery Address:</strong> 123 Dummy Street, Placeholder City</p>
                    
                    <h5 className="border-bottom pb-2 mt-4">Order Summary</h5>
                    <p><strong>Total Price:</strong> PHP {order.total || '0.00'}</p>
                    <p><strong>Status:</strong> {order.order_status}</p>

                    <div className="mt-4 pt-3 border-top">
                        {order.order_status === 'Delivered' ? (
                            <div className="alert alert-success text-center">This order has been delivered.</div>
                        ) : (
                            <Link href={route('delivery.confirm.show', order.id)} className="btn btn-success w-100 py-2">
                                Proceed to Upload Proof
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
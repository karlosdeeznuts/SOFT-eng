import React from 'react';
import { Head, Link } from '@inertiajs/react';
import DeliveryLayout from '../../Layout/DeliveryLayout';

function Dashboard({ orders }) {
    return (
        <div className="container py-4">
            <Head title="Delivery Dashboard" />
            <h2 className="mb-4">Delivery Tasks</h2>
            
            <div className="card shadow-sm border-0">
                <div className="card-body p-0">
                    <table className="table table-hover mb-0">
                        <thead className="table-dark">
                            <tr>
                                <th>Order ID</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id} className="align-middle">
                                    <td className="fw-bold">#{order.id}</td>
                                    <td>
                                        <span className={`badge ${
                                            order.order_status === 'Delivered' ? 'bg-success' :
                                            order.order_status === 'Received' ? 'bg-primary' :
                                            'bg-warning text-dark'
                                        }`}>
                                            {order.order_status}
                                        </span>
                                    </td>
                                    <td>
                                        <Link href={route('delivery.details', order.id)} className="btn btn-primary btn-sm">
                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

Dashboard.layout = page => <DeliveryLayout children={page} />
export default Dashboard;
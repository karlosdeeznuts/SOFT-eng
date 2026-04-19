import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ orders }) {
    return (
        <div className="container py-4">
            <Head title="Delivery Dashboard" />
            <h2>Delivery Tasks</h2>
            <table className="table mt-4">
                <thead className="table-dark">
                    <tr>
                        <th>Order ID</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>#{order.id}</td>
                            <td>{order.order_status}</td>
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
    );
}
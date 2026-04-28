import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '../../Layout/AdminLayout';

const RefreshIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10"></polyline>
        <polyline points="1 20 1 14 7 14"></polyline>
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
    </svg>
);

export default function Returns({ returns }) {
    const [searchQuery, setSearchQuery] = useState('');

    // Logic to flatten nested order details into individual rows for the Admin table
    const tableRows = [];
    returns.data.forEach((request) => {
        request.order.details.forEach((detail) => {
            tableRows.push({
                return_id: request.id,
                flower_id: detail.product_id,
                flower_name: detail.product.product_name,
                type: detail.product_type || 'N/A', // Adjust based on your product_types table if needed
                quantity: detail.quantity,
                reason: request.reason,
                status: request.status,
                invoice: `#TUNGAL${request.order_id}`
            });
        });
    });

    return (
        <div className="container-fluid py-4 px-4" style={{ minHeight: '100vh', backgroundColor: '#F5F5FB', fontFamily: "'Poppins', sans-serif" }}>
            <Head title="Returns Management" />

            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1 className="fw-bolder m-0" style={{ color: '#1E1E1E', fontSize: '32px', letterSpacing: '-0.5px' }}>Returns</h1>
                
                <div className="position-relative">
                    <input 
                        type="text" 
                        className="form-control shadow-none border-0 text-center fw-medium" 
                        placeholder="Search Returns"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ backgroundColor: '#EBE9F1', borderRadius: '50px', width: '300px', height: '42px', color: '#5A637A' }} 
                    />
                </div>
            </div>

            <div className="bg-white rounded-3 shadow-sm overflow-hidden">
                <div className="table-responsive">
                    <table className="table table-borderless align-middle mb-0 text-center">
                        <thead style={{ backgroundColor: '#E3E4ED', color: '#1E1E1E' }}>
                            <tr>
                                <th className="py-3 fw-bolder" style={{ fontSize: '14px' }}>Flower ID</th>
                                <th className="py-3 fw-bolder" style={{ fontSize: '14px' }}>Flower</th>
                                <th className="py-3 fw-bolder" style={{ fontSize: '14px' }}>Type</th>
                                <th className="py-3 fw-bolder" style={{ fontSize: '14px' }}>Quantity</th>
                                <th className="py-3 fw-bolder" style={{ fontSize: '14px' }}>Reason</th>
                                <th className="py-3 fw-bolder" style={{ fontSize: '14px' }}>Status</th>
                                <th className="py-3 fw-bolder" style={{ fontSize: '14px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableRows.length > 0 ? (
                                tableRows.map((row, index) => (
                                    <tr key={`${row.return_id}-${row.flower_id}`} style={{ borderBottom: index !== tableRows.length - 1 ? '1px solid #F0F0F5' : 'none' }}>
                                        <td className="py-3 fw-bold text-dark" style={{ fontSize: '14px' }}>{row.flower_id}</td>
                                        <td className="py-3 fw-bold text-dark" style={{ fontSize: '14px' }}>{row.flower_name}</td>
                                        <td className="py-3 text-dark" style={{ fontSize: '14px' }}>{row.type}</td>
                                        <td className="py-3 fw-bold text-dark" style={{ fontSize: '14px' }}>{row.quantity}</td>
                                        <td className="py-3 text-dark" style={{ fontSize: '14px' }}>{row.reason}</td>
                                        <td className="py-3">
                                            <span className={`badge px-3 py-2 rounded-pill ${row.status === 'Restocked' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'}`}>
                                                {row.status}
                                            </span>
                                        </td>
                                        <td className="py-3">
                                            <button className="btn btn-sm d-inline-flex align-items-center justify-content-center gap-2 fw-semibold shadow-sm text-white" style={{ backgroundColor: '#758AF8', borderRadius: '8px', padding: '6px 12px', fontSize: '13px', border: 'none' }}>
                                                <RefreshIcon /> Update
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center text-muted py-5">No active return requests.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Pagination UI goes here using returns.links */}
        </div>
    );
}

Returns.layout = page => <AdminLayout children={page} />;
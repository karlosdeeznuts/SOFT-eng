import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '../../Layout/AdminLayout';

// --- CUSTOM ICONS ---
const RefreshIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10"></polyline>
        <polyline points="1 20 1 14 7 14"></polyline>
        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
    </svg>
);

const ArrowLeft = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
);

const ArrowRight = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 19"></polyline>
    </svg>
);

export default function Returns() {
    const [searchQuery, setSearchQuery] = useState('');

    // Exact data mapped from the provided Returns design
    const returnsData = [
        { id: '01', flower: 'Roses', type: 'Red', quantity: '5', reason: 'Damage During Transport', status: 'Under Inspection' },
        { id: '02', flower: 'Sunflower', type: 'Dwarf', quantity: '4', reason: 'Wrong Type Delivered', status: 'Restocked' },
        { id: '03', flower: 'Roses', type: 'Pink', quantity: '2', reason: 'Damage During Transport', status: 'Under Inspection' },
        { id: '04', flower: 'Lily', type: 'Yellow', quantity: '5', reason: 'Wrong Type Delivered', status: 'Restocked' },
        { id: '05', flower: 'Tulip', type: 'Yellow', quantity: '3', reason: 'Wrong Type Delivered', status: 'Restocked' },
        { id: '06', flower: 'Tulip', type: 'Purple', quantity: '2', reason: 'Damage During Transport', status: 'Under Inspection' },
        { id: '07', flower: 'Roses', type: 'White', quantity: '6', reason: 'Damage During Transport', status: 'Under Inspection' },
        { id: '08', flower: 'Sunflower', type: 'Common', quantity: '7', reason: 'Wrong Flower Delivered', status: 'Restocked' },
        { id: '09', flower: 'Sunflower', type: 'Dwarf', quantity: '6', reason: 'Damage During Transport', status: 'Under Inspection' },
        { id: '10', flower: 'Roses', type: 'Red', quantity: '10', reason: 'Damage During Transport', status: 'Under Inspection' },
    ];

    return (
        // FIXED: Reduced main container padding to pull everything tighter
        <div className="container-fluid py-4 px-4" style={{ minHeight: '100vh', backgroundColor: '#F5F5FB', fontFamily: "'Poppins', sans-serif" }}>
            <Head title="Returns Management" />

            {/* HEADER SECTION */}
            <div className="d-flex justify-content-between align-items-center mb-3"> {/* FIXED: Reduced bottom margin */}
                <h1 className="fw-bolder m-0" style={{ color: '#1E1E1E', fontSize: '32px', letterSpacing: '-0.5px' }}>Returns</h1>
                
                {/* Search Bar only - Top Right */}
                <div className="position-relative">
                    <input 
                        type="text" 
                        className="form-control shadow-none border-0 text-center fw-medium" 
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ 
                            backgroundColor: '#EBE9F1', 
                            borderRadius: '50px', 
                            width: '300px', // FIXED: Slightly narrower to save horizontal space
                            height: '42px', // FIXED: Shorter to match tighter feel
                            color: '#5A637A'
                        }} 
                    />
                </div>
            </div>

            {/* TABLE SECTION */}
            <div className="bg-white rounded-3 shadow-sm overflow-hidden">
                <div className="table-responsive">
                    <table className="table table-borderless align-middle mb-0 text-center">
                        <thead style={{ backgroundColor: '#E3E4ED', color: '#1E1E1E' }}>
                            <tr>
                                {/* FIXED: Tighter table header padding (py-3 instead of py-4) */}
                                <th className="py-3 fw-bolder" style={{ fontSize: '14px', width: '10%' }}>Flower ID</th>
                                <th className="py-3 fw-bolder" style={{ fontSize: '14px', width: '15%' }}>Flower</th>
                                <th className="py-3 fw-bolder" style={{ fontSize: '14px', width: '15%' }}>Type</th>
                                <th className="py-3 fw-bolder" style={{ fontSize: '14px', width: '10%' }}>Quantity</th>
                                <th className="py-3 fw-bolder" style={{ fontSize: '14px', width: '25%' }}>Reason</th>
                                <th className="py-3 fw-bolder" style={{ fontSize: '14px', width: '15%' }}>Status</th>
                                <th className="py-3 fw-bolder" style={{ fontSize: '14px', width: '10%' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {returnsData.map((row, index) => (
                                <tr key={index} style={{ borderBottom: index !== returnsData.length - 1 ? '1px solid #F0F0F5' : 'none' }}>
                                    {/* FIXED: Tighter table row padding (py-3 instead of py-4) */}
                                    <td className="py-3 fw-bold text-dark" style={{ fontSize: '14px' }}>{row.id}</td>
                                    <td className="py-3 fw-bold text-dark" style={{ fontSize: '14px' }}>{row.flower}</td>
                                    <td className="py-3 text-dark" style={{ fontSize: '14px' }}>{row.type}</td>
                                    <td className="py-3 fw-bold text-dark" style={{ fontSize: '14px' }}>{row.quantity}</td>
                                    <td className="py-3 text-dark" style={{ fontSize: '14px' }}>{row.reason}</td>
                                    <td className="py-3 text-dark" style={{ fontSize: '14px' }}>{row.status}</td>
                                    <td className="py-3">
                                        <button 
                                            className="btn btn-sm d-inline-flex align-items-center justify-content-center gap-2 fw-semibold shadow-sm text-white" 
                                            style={{ 
                                                backgroundColor: '#758AF8',
                                                borderRadius: '8px',
                                                padding: '6px 12px', // FIXED: Slightly smaller button
                                                fontSize: '13px',
                                                border: 'none'
                                            }}
                                        >
                                            <RefreshIcon /> Update
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* PAGINATION SECTION */}
            <div className="d-flex justify-content-end align-items-center gap-3 mt-4">
                <span 
                    className="text-dark d-flex align-items-center gap-2 fw-bolder" 
                    style={{ fontSize: '14px', cursor: 'pointer', transition: 'opacity 0.2s' }}
                    onMouseOver={(e) => e.target.style.opacity = 0.7}
                    onMouseOut={(e) => e.target.style.opacity = 1}
                >
                    <ArrowLeft /> Previous
                </span>
                
                <div 
                    className="d-flex justify-content-center align-items-center fw-bolder text-white shadow-sm" 
                    style={{ 
                        width: '36px', // FIXED: Smaller pagination box
                        height: '36px', 
                        backgroundColor: '#758AF8',
                        borderRadius: '8px',
                        fontSize: '15px'
                    }}
                >
                    1
                </div>
                
                <span 
                    className="text-dark d-flex align-items-center gap-2 fw-bolder" 
                    style={{ fontSize: '14px', cursor: 'pointer', transition: 'opacity 0.2s' }}
                    onMouseOver={(e) => e.target.style.opacity = 0.7}
                    onMouseOut={(e) => e.target.style.opacity = 1}
                >
                    Next <ArrowRight />
                </span>
            </div>
            
        </div>
    );
}

Returns.layout = page => <AdminLayout children={page} />;
import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
// FIXED IMPORT PATH: Only two levels up
import AdminLayout from '../../Layout/AdminLayout';

// --- CUSTOM ICONS ---
const CreateIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4"></path>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
        <line x1="12" y1="15" x2="12" y2="21"></line>
        <line x1="9" y1="18" x2="15" y2="18"></line>
    </svg>
);

const ActionIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <path d="M12 18v-6"></path>
        <path d="M9 15h6"></path>
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

export default function Payroll() {
    // --- PLACEHOLDER DUMMY DATA ---
    const [searchQuery, setSearchQuery] = useState('');
    
    const dummyPayrolls = [
        { id: '01', employee_id: '03', method: 'Cash', status: 'Approved', date_received: '05-08-2025' },
        { id: '02', employee_id: '01', method: 'Bank', status: 'Pending for Approval', date_received: '-' },
    ];

    return (
        <div className="container-fluid py-5 px-5" style={{ minHeight: '100vh', backgroundColor: '#F5F5FB', fontFamily: "'Poppins', sans-serif" }}>
            <Head title="Payroll Management" />

            {/* HEADER SECTION */}
            <div className="d-flex justify-content-between align-items-center mb-5">
                <h1 className="fw-bolder m-0" style={{ color: '#1E1E1E', fontSize: '36px', letterSpacing: '-0.5px' }}>Pay</h1>
                
                <div className="d-flex align-items-center gap-3">
                    {/* Search Bar */}
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
                                width: '300px', 
                                height: '48px',
                                color: '#5A637A'
                            }} 
                        />
                    </div>

                    {/* Create Button */}
                    <button 
                        className="btn d-flex align-items-center justify-content-center gap-2 fw-semibold text-white shadow-sm border-0"
                        style={{ 
                            backgroundColor: '#758AF8', 
                            borderRadius: '50px', 
                            height: '48px', 
                            padding: '0 24px',
                            fontSize: '15px'
                        }}
                    >
                        <CreateIcon /> Create Payroll
                    </button>
                </div>
            </div>

            {/* TABLE SECTION */}
            <div className="bg-white rounded-3 shadow-sm overflow-hidden">
                <div className="table-responsive">
                    <table className="table table-borderless align-middle mb-0 text-center">
                        <thead style={{ backgroundColor: '#E3E4ED', color: '#1E1E1E' }}>
                            <tr>
                                <th className="py-4 fw-bold" style={{ fontSize: '15px', width: '15%' }}>Payroll ID</th>
                                <th className="py-4 fw-bold" style={{ fontSize: '15px', width: '15%' }}>Employee ID</th>
                                <th className="py-4 fw-bold" style={{ fontSize: '15px', width: '15%' }}>Salary Method</th>
                                <th className="py-4 fw-bold" style={{ fontSize: '15px', width: '25%' }}>Status</th>
                                <th className="py-4 fw-bold" style={{ fontSize: '15px', width: '15%' }}>Date Received</th>
                                <th className="py-4 fw-bold" style={{ fontSize: '15px', width: '15%' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dummyPayrolls.length > 0 ? (
                                dummyPayrolls.map((row, index) => (
                                    <tr key={index} style={{ borderBottom: index !== dummyPayrolls.length - 1 ? '1px solid #F0F0F5' : 'none' }}>
                                        <td className="py-4 fw-bolder text-dark" style={{ fontSize: '15px' }}>{row.id}</td>
                                        <td className="py-4 text-dark" style={{ fontSize: '15px' }}>{row.employee_id}</td>
                                        <td className="py-4 text-dark" style={{ fontSize: '15px' }}>{row.method}</td>
                                        <td className="py-4 text-dark" style={{ fontSize: '15px' }}>{row.status}</td>
                                        <td className="py-4 text-dark" style={{ fontSize: '15px' }}>{row.date_received}</td>
                                        <td className="py-4">
                                            <button 
                                                className="btn btn-sm d-inline-flex align-items-center justify-content-center gap-2 fw-semibold shadow-sm" 
                                                style={{ 
                                                    backgroundColor: '#EAA144', 
                                                    color: '#FFF', 
                                                    borderRadius: '8px',
                                                    padding: '8px 16px',
                                                    fontSize: '14px',
                                                    border: '1px solid #D98D32'
                                                }}
                                            >
                                                <ActionIcon /> Payroll
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-5 text-muted">No payroll records found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* PAGINATION SECTION */}
            <div className="d-flex justify-content-end align-items-center gap-3 mt-5">
                <span 
                    className="text-dark d-flex align-items-center gap-2 fw-bolder" 
                    style={{ fontSize: '15px', cursor: 'pointer', transition: 'opacity 0.2s' }}
                    onMouseOver={(e) => e.target.style.opacity = 0.7}
                    onMouseOut={(e) => e.target.style.opacity = 1}
                >
                    <ArrowLeft /> Previous
                </span>
                
                <div 
                    className="d-flex justify-content-center align-items-center fw-bolder text-white shadow-sm" 
                    style={{ 
                        width: '40px', 
                        height: '40px', 
                        backgroundColor: '#758AF8',
                        borderRadius: '10px',
                        fontSize: '16px'
                    }}
                >
                    1
                </div>
                
                <span 
                    className="text-dark d-flex align-items-center gap-2 fw-bolder" 
                    style={{ fontSize: '15px', cursor: 'pointer', transition: 'opacity 0.2s' }}
                    onMouseOver={(e) => e.target.style.opacity = 0.7}
                    onMouseOut={(e) => e.target.style.opacity = 1}
                >
                    Next <ArrowRight />
                </span>
            </div>
            
        </div>
    );
}

Payroll.layout = page => <AdminLayout children={page} />;
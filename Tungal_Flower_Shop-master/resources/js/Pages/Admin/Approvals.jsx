import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '../../Layout/AdminLayout';

// --- CUSTOM ICONS ---
const ReviewIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
);

const ApproveIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

const RejectIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const SearchIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6c757d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
);

// --- MODALS ---

const ReviewPayrollModal = ({ isOpen, onClose, record }) => {
    if (!isOpen || !record) return null;

    const handleDecision = (decision) => {
        // We will wire this up to the backend in the next step
        console.log(`Payroll ${record.id} marked as: ${decision}`);
        
        // Placeholder routing for when backend is ready
        /*
        router.put(route(`admin.approvals.payroll`, { id: record.id, action: decision }), {}, {
            preserveScroll: true,
            onSuccess: () => onClose()
        });
        */
        onClose();
    };

    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(20, 20, 30, 0.5)', zIndex: 1050 }}>
            <div className="card shadow-lg border-0 overflow-hidden" style={{ borderRadius: '24px', width: '100%', maxWidth: '500px', backgroundColor: '#FFF' }}>
                <div className="card-body p-5">
                    <h3 className="fw-bolder text-center mb-4" style={{ color: '#1E1E1E' }}>Review Payroll</h3>
                    
                    <div className="d-flex justify-content-between mb-3 border-bottom pb-3">
                        <span className="text-muted fw-medium">Employee</span>
                        <span className="fw-bold text-dark">{record.employee_name}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3 border-bottom pb-3">
                        <span className="text-muted fw-medium">Payroll Date</span>
                        <span className="fw-bold text-dark">{record.date}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3 border-bottom pb-3">
                        <span className="text-muted fw-medium">Method</span>
                        <span className="fw-bold text-dark">{record.method}</span>
                    </div>
                    
                    <div className="bg-light p-3 rounded-3 mb-4 mt-4">
                        <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted">Gross Pay</span>
                            <span className="fw-bold text-dark">₱ {record.gross_pay}</span>
                        </div>
                        <div className="d-flex justify-content-between mb-2 border-bottom pb-2">
                            <span className="text-muted">Total Deductions</span>
                            <span className="fw-bold text-danger">- ₱ {record.deductions}</span>
                        </div>
                        <div className="d-flex justify-content-between mt-2 align-items-center">
                            <span className="fw-bolder" style={{ fontSize: '18px', color: '#1E1E1E' }}>Net Pay</span>
                            <span className="fw-bolder text-success" style={{ fontSize: '20px' }}>₱ {record.net_pay}</span>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between gap-3 mt-5">
                        <button onClick={() => handleDecision('Rejected')} className="btn w-50 d-flex justify-content-center align-items-center gap-2 fw-bold text-white shadow-none" style={{ backgroundColor: '#DC3545', borderRadius: '12px', height: '48px' }}>
                            <RejectIcon /> Reject
                        </button>
                        <button onClick={() => handleDecision('Approved')} className="btn w-50 d-flex justify-content-center align-items-center gap-2 fw-bold text-white shadow-sm border-0" style={{ backgroundColor: '#7859FF', borderRadius: '12px', height: '48px' }}>
                            <ApproveIcon /> Approve
                        </button>
                    </div>
                    <div className="text-center mt-3">
                        <button onClick={onClose} className="btn btn-link text-muted text-decoration-none shadow-none p-0">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ReviewReturnModal = ({ isOpen, onClose, record }) => {
    if (!isOpen || !record) return null;

    const handleDecision = (decision) => {
        // We will wire this up to the backend in the next step
        console.log(`Return ${record.id} marked as: ${decision}`);
        
        // Placeholder routing for when backend is ready
        /*
        router.put(route(`admin.approvals.return`, { id: record.id, action: decision }), {}, {
            preserveScroll: true,
            onSuccess: () => onClose()
        });
        */
        onClose();
    };

    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(20, 20, 30, 0.5)', zIndex: 1050 }}>
            <div className="card shadow-lg border-0 overflow-hidden" style={{ borderRadius: '24px', width: '100%', maxWidth: '500px', backgroundColor: '#FFF' }}>
                <div className="card-body p-5">
                    <h3 className="fw-bolder text-center mb-4" style={{ color: '#1E1E1E' }}>Review Return</h3>
                    
                    <div className="d-flex justify-content-between mb-3 border-bottom pb-3">
                        <span className="text-muted fw-medium">Order ID</span>
                        <span className="fw-bold text-dark">#{record.order_id}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3 border-bottom pb-3">
                        <span className="text-muted fw-medium">Processed By</span>
                        <span className="fw-bold text-dark">{record.cashier_name}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3 border-bottom pb-3">
                        <span className="text-muted fw-medium">Returned Item</span>
                        <span className="fw-bold text-dark">{record.item_name} (x{record.quantity})</span>
                    </div>
                    
                    <div className="bg-light p-3 rounded-3 mb-4 mt-4">
                        <div className="mb-2">
                            <span className="text-muted d-block mb-1">Reason for Return</span>
                            <span className="fw-bold text-dark d-block p-2 border rounded bg-white">{record.reason}</span>
                        </div>
                        <div className="d-flex justify-content-between mt-3 align-items-center border-top pt-3">
                            <span className="fw-bolder" style={{ fontSize: '18px', color: '#1E1E1E' }}>Refund Amount</span>
                            <span className="fw-bolder text-danger" style={{ fontSize: '20px' }}>₱ {record.refund_amount}</span>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between gap-3 mt-5">
                        <button onClick={() => handleDecision('Rejected')} className="btn w-50 d-flex justify-content-center align-items-center gap-2 fw-bold text-white shadow-none" style={{ backgroundColor: '#DC3545', borderRadius: '12px', height: '48px' }}>
                            <RejectIcon /> Reject
                        </button>
                        <button onClick={() => handleDecision('Approved')} className="btn w-50 d-flex justify-content-center align-items-center gap-2 fw-bold text-white shadow-sm border-0" style={{ backgroundColor: '#198754', borderRadius: '12px', height: '48px' }}>
                            <ApproveIcon /> Approve
                        </button>
                    </div>
                    <div className="text-center mt-3">
                        <button onClick={onClose} className="btn btn-link text-muted text-decoration-none shadow-none p-0">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---
export default function Approvals({ pendingPayrolls: initialPayrolls, pendingReturns: initialReturns }) {
    const [activeTab, setActiveTab] = useState('payroll');
    const [searchQuery, setSearchQuery] = useState('');
    
    // Modal States
    const [isPayrollModalOpen, setIsPayrollModalOpen] = useState(false);
    const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);

    // Dummy Data (Acts as fallback until backend sends real props)
    const dummyPayrolls = [
        { id: 1, employee_name: '3 - Cashier Main', date: '2025-05-15', method: 'Cash', gross_pay: '5200.00', deductions: '1100.00', net_pay: '4100.00', status: 'Pending' },
        { id: 2, employee_name: '2 - Manager Main', date: '2025-05-15', method: 'Bank', gross_pay: '8000.00', deductions: '1500.00', net_pay: '6500.00', status: 'Pending' },
    ];

    const dummyReturns = [
        { id: 101, order_id: 'ORD-5092', cashier_name: 'Cashier Main', item_name: 'Red Roses Bouquet', quantity: 1, reason: 'Flowers were wilted upon delivery.', refund_amount: '1200.00', status: 'Pending' },
        { id: 102, order_id: 'ORD-5104', cashier_name: 'Admin Main', item_name: 'Tulip Single Stem', quantity: 3, reason: 'Customer changed mind immediately after purchase.', refund_amount: '450.00', status: 'Pending' },
    ];

    const payrolls = initialPayrolls || dummyPayrolls;
    const returns = initialReturns || dummyReturns;

    // Filter Logic
    const filteredPayrolls = payrolls.filter(p => 
        p.employee_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        String(p.id).includes(searchQuery)
    );

    const filteredReturns = returns.filter(r => 
        r.order_id.toLowerCase().includes(searchQuery.toLowerCase()) || 
        r.cashier_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openReview = (record, type) => {
        setSelectedRecord(record);
        if (type === 'payroll') setIsPayrollModalOpen(true);
        if (type === 'return') setIsReturnModalOpen(true);
    };

    return (
        <div className="container-fluid py-5 px-5" style={{ minHeight: '100vh', backgroundColor: '#F4F5FA', fontFamily: "'Poppins', sans-serif" }}>
            <Head title="Approvals Hub" />

            {/* Header & Search */}
            <div className="d-flex justify-content-between align-items-center mb-5">
                <h1 className="fw-bolder m-0" style={{ color: '#1E1E1E', fontSize: '36px', letterSpacing: '-0.5px' }}>Approvals</h1>
                
                <div className="d-flex align-items-center rounded-pill px-3 bg-white shadow-sm border border-light" style={{ width: '300px', height: '48px' }}>
                    <SearchIcon />
                    <input 
                        type="text" 
                        className="form-control shadow-none border-0 bg-transparent fw-medium" 
                        placeholder="Search records..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ color: '#5A637A', fontSize: '14px' }} 
                    />
                </div>
            </div>

            {/* Main Content Area */}
            <div className="card shadow-sm border-0 w-100" style={{ borderRadius: '16px', backgroundColor: '#FFF' }}>
                <div className="card-body p-0">
                    
                    {/* Tabs Navigation */}
                    <div className="d-flex gap-2 p-4 border-bottom">
                        <button 
                            onClick={() => setActiveTab('payroll')}
                            className="btn fw-semibold border-0 shadow-none px-4" 
                            style={{ 
                                backgroundColor: activeTab === 'payroll' ? '#7859FF' : '#EBEAEE', 
                                color: activeTab === 'payroll' ? 'white' : '#5A637A', 
                                borderRadius: '8px', fontSize: '14px', height: '42px'
                            }}
                        >
                            Payroll Queue
                            {payrolls.length > 0 && (
                                <span className={`badge ms-2 rounded-pill ${activeTab === 'payroll' ? 'bg-white text-primary' : 'bg-secondary text-white'}`}>
                                    {payrolls.length}
                                </span>
                            )}
                        </button>
                        <button 
                            onClick={() => setActiveTab('returns')}
                            className="btn fw-semibold border-0 shadow-none px-4" 
                            style={{ 
                                backgroundColor: activeTab === 'returns' ? '#7859FF' : '#EBEAEE', 
                                color: activeTab === 'returns' ? 'white' : '#5A637A', 
                                borderRadius: '8px', fontSize: '14px', height: '42px'
                            }}
                        >
                            Returns & Refunds
                            {returns.length > 0 && (
                                <span className={`badge ms-2 rounded-pill ${activeTab === 'returns' ? 'bg-white text-primary' : 'bg-secondary text-white'}`}>
                                    {returns.length}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Table View: PAYROLL */}
                    {activeTab === 'payroll' && (
                        <div className="table-responsive p-2">
                            <table className="table table-borderless align-middle mb-0 text-center">
                                <thead style={{ backgroundColor: '#EBEAEE', color: '#1E1E1E' }}>
                                    <tr>
                                        <th className="py-3 fw-bold" style={{ fontSize: '14px' }}>Payroll ID</th>
                                        <th className="py-3 fw-bold" style={{ fontSize: '14px' }}>Employee</th>
                                        <th className="py-3 fw-bold" style={{ fontSize: '14px' }}>Date</th>
                                        <th className="py-3 fw-bold" style={{ fontSize: '14px' }}>Net Pay</th>
                                        <th className="py-3 fw-bold" style={{ fontSize: '14px' }}>Status</th>
                                        <th className="py-3 fw-bold" style={{ fontSize: '14px' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPayrolls.length > 0 ? (
                                        filteredPayrolls.map((row, index) => (
                                            <tr key={index} className="border-bottom">
                                                <td className="py-4 fw-bolder text-dark" style={{ fontSize: '15px' }}>{row.id}</td>
                                                <td className="py-4 text-dark" style={{ fontSize: '15px' }}>{row.employee_name}</td>
                                                <td className="py-4 text-dark" style={{ fontSize: '15px' }}>{row.date}</td>
                                                <td className="py-4 fw-bold text-success" style={{ fontSize: '15px' }}>₱ {row.net_pay}</td>
                                                <td className="py-4">
                                                    <span className="badge bg-warning text-dark px-3 py-2 rounded-pill">Pending</span>
                                                </td>
                                                <td className="py-4">
                                                    <button 
                                                        onClick={() => openReview(row, 'payroll')}
                                                        className="btn btn-sm d-inline-flex align-items-center gap-2 fw-semibold text-white shadow-sm border-0 px-3" 
                                                        style={{ backgroundColor: '#7859FF', borderRadius: '8px', padding: '8px 16px' }}
                                                    >
                                                        <ReviewIcon /> Review
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="6" className="text-center py-5 text-muted">No pending payrolls.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Table View: RETURNS */}
                    {activeTab === 'returns' && (
                        <div className="table-responsive p-2">
                            <table className="table table-borderless align-middle mb-0 text-center">
                                <thead style={{ backgroundColor: '#EBEAEE', color: '#1E1E1E' }}>
                                    <tr>
                                        <th className="py-3 fw-bold" style={{ fontSize: '14px' }}>Req ID</th>
                                        <th className="py-3 fw-bold" style={{ fontSize: '14px' }}>Order ID</th>
                                        <th className="py-3 fw-bold" style={{ fontSize: '14px' }}>Cashier</th>
                                        <th className="py-3 fw-bold" style={{ fontSize: '14px' }}>Refund Amount</th>
                                        <th className="py-3 fw-bold" style={{ fontSize: '14px' }}>Status</th>
                                        <th className="py-3 fw-bold" style={{ fontSize: '14px' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredReturns.length > 0 ? (
                                        filteredReturns.map((row, index) => (
                                            <tr key={index} className="border-bottom">
                                                <td className="py-4 fw-bolder text-dark" style={{ fontSize: '15px' }}>{row.id}</td>
                                                <td className="py-4 text-dark" style={{ fontSize: '15px' }}>{row.order_id}</td>
                                                <td className="py-4 text-dark" style={{ fontSize: '15px' }}>{row.cashier_name}</td>
                                                <td className="py-4 fw-bold text-danger" style={{ fontSize: '15px' }}>₱ {row.refund_amount}</td>
                                                <td className="py-4">
                                                    <span className="badge bg-warning text-dark px-3 py-2 rounded-pill">Pending</span>
                                                </td>
                                                <td className="py-4">
                                                    <button 
                                                        onClick={() => openReview(row, 'return')}
                                                        className="btn btn-sm d-inline-flex align-items-center gap-2 fw-semibold text-white shadow-sm border-0 px-3" 
                                                        style={{ backgroundColor: '#7859FF', borderRadius: '8px', padding: '8px 16px' }}
                                                    >
                                                        <ReviewIcon /> Review
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="6" className="text-center py-5 text-muted">No pending returns.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                </div>
            </div>

            {/* Modals */}
            <ReviewPayrollModal 
                isOpen={isPayrollModalOpen} 
                onClose={() => setIsPayrollModalOpen(false)} 
                record={selectedRecord} 
            />
            <ReviewReturnModal 
                isOpen={isReturnModalOpen} 
                onClose={() => setIsReturnModalOpen(false)} 
                record={selectedRecord} 
            />
            
        </div>
    );
}

Approvals.layout = page => <AdminLayout children={page} />;
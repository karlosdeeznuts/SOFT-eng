import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
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

// --- THE DETAILED CREATE PAYROLL MODAL ---
const CreatePayrollModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const { data, setData, reset } = useForm({
        payroll_id: '02',
        employee_id: '02',
        payroll_date: '2025-04-28',
        salary_method: 'Cash',
        // Regular and Overtime Pay
        rate: '450',
        num_days: '5',
        regular_ot: '420',
        total_ot_pay: '1420',
        ecola: '500',
        allowance: '200',
        other_pay: '250',
        gross_pay: '5000',
        // Employee Contribution
        sss: '750',
        sss_loan: '1000',
        philhealth: '500',
        withholding_tax: '400',
        pagibig_fund: '200',
        pagibig_loan: '800',
        deduction: '3650',
        other_deduction: '150',
        total_deduction: '3800',
        net_pay: '1240'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Detailed Payroll Submitted:", data);
        onClose();
        reset();
    };

    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(20, 20, 30, 0.5)', zIndex: 1050 }}>
            <div className="card shadow-lg border-0 overflow-hidden" style={{ borderRadius: '24px', width: '100%', maxWidth: '850px', backgroundColor: '#FFF', maxHeight: '95vh', overflowY: 'auto' }}>
                <form onSubmit={handleSubmit} className="card-body p-4"> {/* FIXED: Removed extreme top/bottom padding */}
                    <h2 className="fw-bolder text-center mb-4" style={{ color: '#1E1E1E' }}>Create Payroll</h2>
                    
                    {/* Top Header Row */}
                    <div className="row g-3 mb-4">
                        <div className="col-md-6 d-flex align-items-center gap-3">
                            <span className="fw-medium text-dark" style={{ fontSize: '14px', minWidth: '90px' }}>Payroll ID</span>
                            <input type="text" className="form-control text-center shadow-none bg-light" value={data.payroll_id} readOnly style={{ borderRadius: '8px', border: '1px solid #DEE2E6', width: '80px' }} />
                        </div>
                        <div className="col-md-6 d-flex align-items-center gap-3">
                            <span className="fw-medium text-dark" style={{ fontSize: '14px', minWidth: '90px' }}>Employee ID</span>
                            <select className="form-select shadow-none flex-grow-1" value={data.employee_id} onChange={(e) => setData('employee_id', e.target.value)} style={{ borderRadius: '8px', border: '1px solid #DEE2E6' }}>
                                <option value="01">01 - Admin Main</option>
                                <option value="02">02 - Manager Main</option>
                                <option value="03">03 - Cashier Main</option>
                            </select>
                        </div>
                        <div className="col-md-6 d-flex align-items-center gap-3">
                            <span className="fw-medium text-dark" style={{ fontSize: '14px', minWidth: '90px' }}>Payroll Date</span>
                            <input type="date" className="form-control shadow-none flex-grow-1" value={data.payroll_date} onChange={(e) => setData('payroll_date', e.target.value)} style={{ borderRadius: '8px', border: '1px solid #DEE2E6' }} />
                        </div>
                        <div className="col-md-6 d-flex align-items-center gap-3">
                            <span className="fw-medium text-dark" style={{ fontSize: '14px', minWidth: '90px', whiteSpace: 'nowrap' }}>Salary Method</span>
                            <select className="form-select shadow-none flex-grow-1" value={data.salary_method} onChange={(e) => setData('salary_method', e.target.value)} style={{ borderRadius: '8px', border: '1px solid #DEE2E6' }}>
                                <option value="Cash">Cash</option>
                                <option value="Bank">Bank</option>
                            </select>
                        </div>
                    </div>

                    {/* Two Column Layout */}
                    <div className="row g-4 mb-2">
                        {/* Left Column: Regular and Overtime Pay */}
                        <div className="col-md-6">
                            <div className="text-center py-2 mb-3 rounded-top" style={{ backgroundColor: '#D8D8DF' }}>
                                <h6 className="fw-bold m-0 text-muted" style={{ color: '#5A637A' }}>Regular and Overtime Pay</h6>
                            </div>
                            
                            <div className="d-flex flex-column gap-2">
                                <div className="d-flex align-items-center">
                                    <span className="fw-medium text-dark" style={{ width: '100px', fontSize: '14px' }}>Rate</span>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderRadius: '8px 0 0 8px' }}>₱</span>
                                        <input type="number" className="form-control shadow-none border-start-0" value={data.rate} onChange={(e) => setData('rate', e.target.value)} style={{ borderRadius: '0 8px 8px 0' }} />
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <span className="fw-medium text-dark" style={{ width: '100px', fontSize: '14px' }}># of Days</span>
                                    <input type="number" className="form-control shadow-none" value={data.num_days} onChange={(e) => setData('num_days', e.target.value)} style={{ borderRadius: '8px' }} />
                                </div>
                                <div className="d-flex align-items-center">
                                    <span className="fw-medium text-dark" style={{ width: '100px', fontSize: '14px' }}>Regular OT</span>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderRadius: '8px 0 0 8px' }}>₱</span>
                                        <input type="number" className="form-control shadow-none border-start-0" value={data.regular_ot} onChange={(e) => setData('regular_ot', e.target.value)} style={{ borderRadius: '0 8px 8px 0' }} />
                                    </div>
                                </div>
                                <div className="d-flex align-items-center mt-1 mb-2">
                                    <span className="fw-bolder text-dark" style={{ width: '100px', fontSize: '14px' }}>Total OT<br/>Pay</span>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderRadius: '8px 0 0 8px' }}>₱</span>
                                        <input type="number" className="form-control shadow-none border-start-0 fw-bold" value={data.total_ot_pay} onChange={(e) => setData('total_ot_pay', e.target.value)} style={{ borderRadius: '0 8px 8px 0' }} />
                                    </div>
                                </div>
                                <hr className="my-1 border-light" />
                                <div className="d-flex align-items-center">
                                    <span className="fw-medium text-dark" style={{ width: '100px', fontSize: '14px' }}>ECOLA</span>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderRadius: '8px 0 0 8px' }}>₱</span>
                                        <input type="number" className="form-control shadow-none border-start-0" value={data.ecola} onChange={(e) => setData('ecola', e.target.value)} style={{ borderRadius: '0 8px 8px 0' }} />
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <span className="fw-medium text-dark" style={{ width: '100px', fontSize: '14px' }}>Allowance</span>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderRadius: '8px 0 0 8px' }}>₱</span>
                                        <input type="number" className="form-control shadow-none border-start-0" value={data.allowance} onChange={(e) => setData('allowance', e.target.value)} style={{ borderRadius: '0 8px 8px 0' }} />
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <span className="fw-medium text-dark" style={{ width: '100px', fontSize: '14px' }}>Other Pay</span>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderRadius: '8px 0 0 8px' }}>₱</span>
                                        <input type="number" className="form-control shadow-none border-start-0" value={data.other_pay} onChange={(e) => setData('other_pay', e.target.value)} style={{ borderRadius: '0 8px 8px 0' }} />
                                    </div>
                                </div>
                                <div className="d-flex align-items-center mt-2 mb-2">
                                    <span className="fw-bolder text-dark" style={{ width: '100px', fontSize: '14px' }}>Gross Pay</span>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderRadius: '8px 0 0 8px' }}>₱</span>
                                        <input type="number" className="form-control shadow-none border-start-0 fw-bold" value={data.gross_pay} onChange={(e) => setData('gross_pay', e.target.value)} style={{ borderRadius: '0 8px 8px 0' }} />
                                    </div>
                                </div>
                            </div>

                            {/* FIXED: Buttons are now perfectly tucked underneath the left column */}
                            <div className="d-flex justify-content-center gap-3 mt-4">
                                <button type="button" onClick={onClose} className="btn fw-bold text-white shadow-none" style={{ backgroundColor: '#D9534F', borderRadius: '8px', width: '120px', height: '42px' }}>Cancel</button>
                                <button type="submit" className="btn fw-bold text-white shadow-sm border-0" style={{ backgroundColor: '#758AF8', borderRadius: '8px', width: '120px', height: '42px' }}>Submit</button>
                            </div>
                        </div>

                        {/* Right Column: Employee Contribution */}
                        <div className="col-md-6 border-start border-2 ps-md-4"> {/* FIXED: Reduced extreme padding to give inputs more room */}
                            <div className="text-center py-2 mb-3 rounded-top" style={{ backgroundColor: '#D8D8DF' }}>
                                <h6 className="fw-bold m-0 text-muted" style={{ color: '#5A637A' }}>Employee Contribution</h6>
                            </div>
                            
                            <div className="d-flex flex-column gap-2">
                                <div className="d-flex align-items-center">
                                    <span className="fw-medium text-dark" style={{ width: '100px', fontSize: '14px' }}>SSS</span>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderRadius: '8px 0 0 8px' }}>₱</span>
                                        <input type="number" className="form-control shadow-none border-start-0" value={data.sss} onChange={(e) => setData('sss', e.target.value)} style={{ borderRadius: '0 8px 8px 0' }} />
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <span className="fw-medium text-dark" style={{ width: '100px', fontSize: '14px' }}>SSS Loan</span>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderRadius: '8px 0 0 8px' }}>₱</span>
                                        <input type="number" className="form-control shadow-none border-start-0" value={data.sss_loan} onChange={(e) => setData('sss_loan', e.target.value)} style={{ borderRadius: '0 8px 8px 0' }} />
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <span className="fw-medium text-dark" style={{ width: '100px', fontSize: '14px' }}>Phl-Health</span>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderRadius: '8px 0 0 8px' }}>₱</span>
                                        <input type="number" className="form-control shadow-none border-start-0" value={data.philhealth} onChange={(e) => setData('philhealth', e.target.value)} style={{ borderRadius: '0 8px 8px 0' }} />
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <span className="fw-medium text-dark" style={{ width: '100px', fontSize: '14px' }}>Withholding<br/>Tax</span>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderRadius: '8px 0 0 8px' }}>₱</span>
                                        <input type="number" className="form-control shadow-none border-start-0" value={data.withholding_tax} onChange={(e) => setData('withholding_tax', e.target.value)} style={{ borderRadius: '0 8px 8px 0' }} />
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <span className="fw-medium text-dark" style={{ width: '100px', fontSize: '14px' }}>Pagibig<br/>Fund</span>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderRadius: '8px 0 0 8px' }}>₱</span>
                                        <input type="number" className="form-control shadow-none border-start-0" value={data.pagibig_fund} onChange={(e) => setData('pagibig_fund', e.target.value)} style={{ borderRadius: '0 8px 8px 0' }} />
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <span className="fw-medium text-dark" style={{ width: '100px', fontSize: '14px' }}>Pagibig<br/>Loan</span>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderRadius: '8px 0 0 8px' }}>₱</span>
                                        <input type="number" className="form-control shadow-none border-start-0" value={data.pagibig_loan} onChange={(e) => setData('pagibig_loan', e.target.value)} style={{ borderRadius: '0 8px 8px 0' }} />
                                    </div>
                                </div>
                                <hr className="my-1 border-light" />
                                <div className="d-flex align-items-center">
                                    <span className="fw-medium text-dark" style={{ width: '100px', fontSize: '14px' }}>Deduction</span>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderRadius: '8px 0 0 8px' }}>₱</span>
                                        <input type="number" className="form-control shadow-none border-start-0" value={data.deduction} onChange={(e) => setData('deduction', e.target.value)} style={{ borderRadius: '0 8px 8px 0' }} />
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <span className="fw-medium text-dark" style={{ width: '100px', fontSize: '14px' }}>Other<br/>Deduction</span>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderRadius: '8px 0 0 8px' }}>₱</span>
                                        <input type="number" className="form-control shadow-none border-start-0" value={data.other_deduction} onChange={(e) => setData('other_deduction', e.target.value)} style={{ borderRadius: '0 8px 8px 0' }} />
                                    </div>
                                </div>
                                
                                {/* FIXED: Kept width exact to 100px so it perfectly aligns without overflowing */}
                                <div className="d-flex align-items-center mt-1 mb-3">
                                    <span className="fw-bolder text-dark" style={{ width: '100px', fontSize: '14px' }}>Total<br/>Deduction</span>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderRadius: '8px 0 0 8px' }}>₱</span>
                                        <input type="number" className="form-control shadow-none border-start-0 fw-bold" value={data.total_deduction} onChange={(e) => setData('total_deduction', e.target.value)} style={{ borderRadius: '0 8px 8px 0' }} />
                                    </div>
                                </div>
                                
                                {/* Net Pay Result */}
                                <div className="d-flex align-items-center pt-3 border-top border-2">
                                    <span className="fw-bolder text-dark" style={{ width: '100px', fontSize: '16px' }}>Net Pay</span>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderRadius: '8px 0 0 8px' }}>₱</span>
                                        <input type="number" className="form-control shadow-none border-start-0 fw-bolder text-dark" value={data.net_pay} readOnly style={{ borderRadius: '0 8px 8px 0', fontSize: '16px' }} />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- UPDATE MODAL (Yellow Button) ---
const UpdatePayrollModal = ({ isOpen, onClose, payrollRecord }) => {
    if (!isOpen || !payrollRecord) return null;

    const { data, setData } = useForm({
        employee_id: payrollRecord.employee_id,
        date: payrollRecord.date_received !== '-' ? '2025-05-08' : '',
        method: payrollRecord.method,
        status: payrollRecord.status
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Update Submitted:", data);
        onClose();
    };

    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(20, 20, 30, 0.5)', zIndex: 1050 }}>
            <div className="card shadow-lg border-0" style={{ borderRadius: '24px', width: '100%', maxWidth: '420px', backgroundColor: '#FFF' }}>
                <form onSubmit={handleSubmit} className="card-body p-4 p-md-5">
                    <h3 className="fw-bolder text-center mb-4" style={{ color: '#1E1E1E' }}>Payroll</h3>
                    
                    <div className="d-flex align-items-center justify-content-center gap-3 mb-4">
                        <span className="fw-medium text-dark" style={{ fontSize: '14px' }}>Payroll ID</span>
                        <input type="text" className="form-control text-center shadow-none bg-light" value={payrollRecord.id} readOnly style={{ width: '60px', borderRadius: '8px' }} />
                    </div>

                    <div className="row g-3 mb-4">
                        <div className="col-12 d-flex align-items-center gap-3">
                            <label className="mb-0 fw-medium text-dark flex-shrink-0" style={{ width: '120px', fontSize: '14px' }}>Employee ID</label>
                            <select className="form-select shadow-none flex-grow-1" value={data.employee_id} onChange={(e) => setData('employee_id', e.target.value)} style={{ borderRadius: '8px', backgroundColor: '#F8F9FA' }}>
                                <option value="01">01 - Admin Main</option>
                                <option value="02">02 - Manager Main</option>
                                <option value="03">03 - Cashier Main</option>
                            </select>
                        </div>

                        <div className="col-12 d-flex align-items-center gap-3">
                            <label className="mb-0 fw-medium text-dark flex-shrink-0" style={{ width: '120px', fontSize: '14px' }}>Date</label>
                            <input type="date" className="form-control shadow-none flex-grow-1" value={data.date} onChange={(e) => setData('date', e.target.value)} required style={{ borderRadius: '8px', backgroundColor: '#F8F9FA' }} />
                        </div>

                        <div className="col-12 d-flex align-items-center gap-3">
                            <label className="mb-0 fw-medium text-dark flex-shrink-0" style={{ width: '120px', fontSize: '14px' }}>Salary Method</label>
                            <select className="form-select shadow-none flex-grow-1" value={data.method} onChange={(e) => setData('method', e.target.value)} style={{ borderRadius: '8px', backgroundColor: '#F8F9FA' }}>
                                <option value="Cash">Cash</option>
                                <option value="Bank">Bank</option>
                                <option value="Cheque">Cheque</option>
                            </select>
                        </div>

                        <div className="col-12 d-flex align-items-center gap-3">
                            <label className="mb-0 fw-medium text-dark flex-shrink-0" style={{ width: '120px', fontSize: '14px' }}>Status</label>
                            <select className="form-select shadow-none flex-grow-1" value={data.status} onChange={(e) => setData('status', e.target.value)} style={{ borderRadius: '8px', backgroundColor: '#F8F9FA' }}>
                                <option value="Pending for Approval">Pending for Approval</option>
                                <option value="Approved">Approved</option>
                                <option value="Paid">Paid</option>
                            </select>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between gap-3 mt-4">
                        <button type="button" onClick={onClose} className="btn w-50 fw-bold text-white shadow-none" style={{ backgroundColor: '#DC3545', borderRadius: '8px', height: '45px' }}>Cancel</button>
                        <button type="submit" className="btn w-50 fw-bold text-white shadow-sm border-0" style={{ backgroundColor: '#EAA144', borderRadius: '8px', height: '45px' }}>Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default function Payroll() {
    const [searchQuery, setSearchQuery] = useState('');
    
    // Modal States
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedPayroll, setSelectedPayroll] = useState(null);
    
    const dummyPayrolls = [
        { id: '01', employee_id: '03', method: 'Cash', status: 'Approved', date_received: '05-08-2025' },
        { id: '02', employee_id: '01', method: 'Bank', status: 'Pending for Approval', date_received: '-' },
    ];

    const openUpdateModal = (payroll) => {
        setSelectedPayroll(payroll);
        setIsUpdateModalOpen(true);
    };

    return (
        <div className="container-fluid py-5 px-5" style={{ minHeight: '100vh', backgroundColor: '#F5F5FB', fontFamily: "'Poppins', sans-serif" }}>
            <Head title="Payroll Management" />

            <div className="d-flex justify-content-between align-items-center mb-5">
                <h1 className="fw-bolder m-0" style={{ color: '#1E1E1E', fontSize: '36px', letterSpacing: '-0.5px' }}>Pay</h1>
                
                <div className="d-flex align-items-center gap-3">
                    <div className="position-relative">
                        <input 
                            type="text" 
                            className="form-control shadow-none border-0 text-center fw-medium" 
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ backgroundColor: '#EBE9F1', borderRadius: '50px', width: '300px', height: '48px', color: '#5A637A' }} 
                        />
                    </div>

                    <button 
                        onClick={() => setIsCreateModalOpen(true)}
                        className="btn d-flex align-items-center justify-content-center gap-2 fw-semibold text-white shadow-sm border-0"
                        style={{ backgroundColor: '#758AF8', borderRadius: '50px', height: '48px', padding: '0 24px', fontSize: '15px' }}
                    >
                        <CreateIcon /> Create Payroll
                    </button>
                </div>
            </div>

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
                                                onClick={() => openUpdateModal(row)}
                                                className="btn btn-sm d-inline-flex align-items-center justify-content-center gap-2 fw-semibold shadow-sm" 
                                                style={{ backgroundColor: '#EAA144', color: '#FFF', borderRadius: '8px', padding: '8px 16px', fontSize: '14px', border: '1px solid #D98D32' }}
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

            <div className="d-flex justify-content-end align-items-center gap-3 mt-5">
                <span className="text-dark d-flex align-items-center gap-2 fw-bolder" style={{ fontSize: '15px', cursor: 'pointer' }}><ArrowLeft /> Previous</span>
                <div className="d-flex justify-content-center align-items-center fw-bolder text-white shadow-sm" style={{ width: '40px', height: '40px', backgroundColor: '#758AF8', borderRadius: '10px', fontSize: '16px' }}>1</div>
                <span className="text-dark d-flex align-items-center gap-2 fw-bolder" style={{ fontSize: '15px', cursor: 'pointer' }}>Next <ArrowRight /></span>
            </div>

            {/* MODAL MOUNTS */}
            <CreatePayrollModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
            <UpdatePayrollModal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} payrollRecord={selectedPayroll} />
            
        </div>
    );
}

Payroll.layout = page => <AdminLayout children={page} />;
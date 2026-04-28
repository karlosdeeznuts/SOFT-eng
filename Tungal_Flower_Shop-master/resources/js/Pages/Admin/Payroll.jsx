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

// --- EMPLOYEE DATALIST (Used for Editable Text + Dropdown) ---
const EmployeeDataList = () => (
    <datalist id="employeeOptions">
        <option value="01 - Admin Main" />
        <option value="02 - Manager Main" />
        <option value="03 - Cashier Main" />
    </datalist>
);

// --- CREATE MODAL (Blue Button) ---
const CreatePayrollModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const { data, setData, reset } = useForm({
        payroll_id: '03',
        employee_id: '',
        payroll_date: '',
        salary_method: 'Cash',
        rate: '', num_days: '', regular_ot: '', total_ot_pay: '', ecola: '', allowance: '', other_pay: '', gross_pay: '',
        sss: '', sss_loan: '', philhealth: '', withholding_tax: '', pagibig_fund: '', pagibig_loan: '', deduction: '', other_deduction: '', total_deduction: '', net_pay: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Create Payroll Submitted:", data);
        onClose();
        reset();
    };

    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(20, 20, 30, 0.5)', zIndex: 1050 }}>
            <EmployeeDataList />
            <div className="card shadow-lg border-0 overflow-hidden" style={{ borderRadius: '24px', width: '100%', maxWidth: '850px', backgroundColor: '#FFF', maxHeight: '95vh', overflowY: 'auto' }}>
                <form onSubmit={handleSubmit} className="card-body p-4">
                    <h2 className="fw-bolder text-center mb-4" style={{ color: '#1E1E1E' }}>Create Payroll</h2>
                    
                    <div className="row g-3 mb-4">
                        <div className="col-md-6 d-flex align-items-center gap-3">
                            <span className="fw-medium text-dark" style={{ fontSize: '14px', minWidth: '90px' }}>Payroll ID</span>
                            <input type="text" className="form-control text-center shadow-none bg-light" value={data.payroll_id} readOnly style={{ borderRadius: '8px', border: '1px solid #DEE2E6', width: '80px' }} />
                        </div>
                        <div className="col-md-6 d-flex align-items-center gap-3">
                            <span className="fw-medium text-dark" style={{ fontSize: '14px', minWidth: '90px' }}>Employee ID</span>
                            <input type="text" list="employeeOptions" className="form-control shadow-none flex-grow-1" placeholder="Type or select..." value={data.employee_id} onChange={(e) => setData('employee_id', e.target.value)} required style={{ borderRadius: '8px', border: '1px solid #DEE2E6' }} />
                        </div>
                        <div className="col-md-6 d-flex align-items-center gap-3">
                            <span className="fw-medium text-dark" style={{ fontSize: '14px', minWidth: '90px' }}>Payroll Date</span>
                            <input type="date" className="form-control shadow-none flex-grow-1" value={data.payroll_date} onChange={(e) => setData('payroll_date', e.target.value)} required style={{ borderRadius: '8px', border: '1px solid #DEE2E6' }} />
                        </div>
                        <div className="col-md-6 d-flex align-items-center gap-3">
                            <span className="fw-medium text-dark" style={{ fontSize: '14px', minWidth: '90px', whiteSpace: 'nowrap' }}>Salary Method</span>
                            <select className="form-select shadow-none flex-grow-1" value={data.salary_method} onChange={(e) => setData('salary_method', e.target.value)} style={{ borderRadius: '8px', border: '1px solid #DEE2E6' }}>
                                <option value="Cash">Cash</option>
                                <option value="Bank">Bank</option>
                            </select>
                        </div>
                    </div>

                    <div className="row g-4 mb-2">
                        {/* Left Column */}
                        <div className="col-md-6">
                            <div className="text-center py-2 mb-3 rounded-top" style={{ backgroundColor: '#D8D8DF' }}>
                                <h6 className="fw-bold m-0 text-muted" style={{ color: '#5A637A' }}>Regular and Overtime Pay</h6>
                            </div>
                            <div className="d-flex flex-column gap-2">
                                {/* Regular & OT Inputs */}
                                {['rate', 'num_days', 'regular_ot', 'total_ot_pay'].map((field) => (
                                    <div className="d-flex align-items-center" key={field}>
                                        <span className="fw-medium text-dark text-capitalize" style={{ width: '100px', fontSize: '14px' }}>{field.replace(/_/g, ' ')}</span>
                                        {field === 'num_days' ? (
                                            <input type="number" className="form-control shadow-none" value={data[field]} onChange={(e) => setData(field, e.target.value)} style={{ borderRadius: '8px' }} />
                                        ) : (
                                            <div className="input-group">
                                                <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderRadius: '8px 0 0 8px' }}>₱</span>
                                                <input type="number" className={`form-control shadow-none border-start-0 ${field === 'total_ot_pay' ? 'fw-bold' : ''}`} value={data[field]} onChange={(e) => setData(field, e.target.value)} style={{ borderRadius: '0 8px 8px 0' }} />
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <hr className="my-1 border-light" />
                                {/* Allowances Inputs */}
                                {['ecola', 'allowance', 'other_pay', 'gross_pay'].map((field) => (
                                    <div className="d-flex align-items-center" key={field}>
                                        <span className={`fw-medium text-dark text-capitalize ${field === 'gross_pay' ? 'fw-bolder' : ''}`} style={{ width: '100px', fontSize: '14px' }}>{field.replace(/_/g, ' ')}</span>
                                        <div className="input-group">
                                            <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderRadius: '8px 0 0 8px' }}>₱</span>
                                            <input type="number" className={`form-control shadow-none border-start-0 ${field === 'gross_pay' ? 'fw-bold' : ''}`} value={data[field]} onChange={(e) => setData(field, e.target.value)} style={{ borderRadius: '0 8px 8px 0' }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="d-flex justify-content-center gap-3 mt-4">
                                <button type="button" onClick={onClose} className="btn fw-bold text-white shadow-none" style={{ backgroundColor: '#D9534F', borderRadius: '8px', width: '120px', height: '42px' }}>Cancel</button>
                                <button type="submit" className="btn fw-bold text-white shadow-sm border-0" style={{ backgroundColor: '#758AF8', borderRadius: '8px', width: '120px', height: '42px' }}>Submit</button>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="col-md-6 border-start border-2 ps-md-4">
                            <div className="text-center py-2 mb-3 rounded-top" style={{ backgroundColor: '#D8D8DF' }}>
                                <h6 className="fw-bold m-0 text-muted" style={{ color: '#5A637A' }}>Employee Contribution</h6>
                            </div>
                            <div className="d-flex flex-column gap-2">
                                {['sss', 'sss_loan', 'philhealth', 'withholding_tax', 'pagibig_fund', 'pagibig_loan'].map((field) => (
                                    <div className="d-flex align-items-center" key={field}>
                                        <span className="fw-medium text-dark text-capitalize" style={{ width: '100px', fontSize: '14px' }}>{field.replace(/_/g, ' ')}</span>
                                        <div className="input-group">
                                            <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderRadius: '8px 0 0 8px' }}>₱</span>
                                            <input type="number" className="form-control shadow-none border-start-0" value={data[field]} onChange={(e) => setData(field, e.target.value)} style={{ borderRadius: '0 8px 8px 0' }} />
                                        </div>
                                    </div>
                                ))}
                                <hr className="my-1 border-light" />
                                {['deduction', 'other_deduction', 'total_deduction'].map((field) => (
                                    <div className="d-flex align-items-center" key={field}>
                                        <span className={`fw-medium text-dark text-capitalize ${field === 'total_deduction' ? 'fw-bolder' : ''}`} style={{ width: '100px', fontSize: '14px' }}>{field.replace(/_/g, ' ')}</span>
                                        <div className="input-group">
                                            <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderRadius: '8px 0 0 8px' }}>₱</span>
                                            <input type="number" className={`form-control shadow-none border-start-0 ${field === 'total_deduction' ? 'fw-bold' : ''}`} value={data[field]} onChange={(e) => setData(field, e.target.value)} style={{ borderRadius: '0 8px 8px 0' }} />
                                        </div>
                                    </div>
                                ))}
                                <div className="d-flex align-items-center pt-3 border-top border-2 mt-2">
                                    <span className="fw-bolder text-dark" style={{ width: '100px', fontSize: '16px' }}>Net Pay</span>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderRadius: '8px 0 0 8px' }}>₱</span>
                                        <input type="number" className="form-control shadow-none border-start-0 fw-bolder text-dark" value={data.net_pay} onChange={(e) => setData('net_pay', e.target.value)} style={{ borderRadius: '0 8px 8px 0', fontSize: '16px' }} />
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

// --- UPDATE MODAL (Yellow Button / Detailed Replica) ---
const UpdatePayrollModal = ({ isOpen, onClose, payrollRecord }) => {
    if (!isOpen || !payrollRecord) return null;

    const isApproved = payrollRecord.status === 'Approved';

    const { data, setData, reset } = useForm({
        payroll_id: payrollRecord.id,
        employee_id: payrollRecord.employee_id,
        payroll_date: payrollRecord.date_received !== '-' ? '2025-05-08' : '',
        salary_method: payrollRecord.method,
        // Status is removed from editable form data
        rate: payrollRecord.rate, num_days: payrollRecord.num_days, regular_ot: payrollRecord.regular_ot, total_ot_pay: payrollRecord.total_ot_pay,
        ecola: payrollRecord.ecola, allowance: payrollRecord.allowance, other_pay: payrollRecord.other_pay, gross_pay: payrollRecord.gross_pay,
        sss: payrollRecord.sss, sss_loan: payrollRecord.sss_loan, philhealth: payrollRecord.philhealth, withholding_tax: payrollRecord.withholding_tax, pagibig_fund: payrollRecord.pagibig_fund, pagibig_loan: payrollRecord.pagibig_loan,
        deduction: payrollRecord.deduction, other_deduction: payrollRecord.other_deduction, total_deduction: payrollRecord.total_deduction, net_pay: payrollRecord.net_pay
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Update Payroll Submitted:", data);
        onClose();
        reset();
    };

    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(20, 20, 30, 0.5)', zIndex: 1050 }}>
            <EmployeeDataList />
            <div className="card shadow-lg border-0 overflow-hidden" style={{ borderRadius: '24px', width: '100%', maxWidth: '850px', backgroundColor: '#FFF', maxHeight: '95vh', overflowY: 'auto' }}>
                <form onSubmit={handleSubmit} className="card-body p-4">
                    {/* FIXED: Displaying Status as a clean badge instead of a dropdown */}
                    <h2 className="fw-bolder text-center mb-4" style={{ color: '#1E1E1E' }}>
                        Payroll Information
                        <span className={`badge ms-3 align-middle ${isApproved ? 'bg-success' : 'bg-warning text-dark'}`} style={{ fontSize: '14px', verticalAlign: 'middle' }}>
                            {payrollRecord.status}
                        </span>
                    </h2>
                    
                    <div className="row g-3 mb-4">
                        <div className="col-md-4 d-flex align-items-center gap-3">
                            <span className="fw-medium text-dark" style={{ fontSize: '14px', minWidth: '90px' }}>Payroll ID</span>
                            <input type="text" className="form-control text-center shadow-none bg-light" value={data.payroll_id} readOnly style={{ borderRadius: '8px', border: '1px solid #DEE2E6', width: '80px' }} />
                        </div>
                        <div className="col-md-4 d-flex align-items-center gap-3">
                            <span className="fw-medium text-dark" style={{ fontSize: '14px', minWidth: '90px' }}>Employee ID</span>
                            <input type="text" list="employeeOptions" className={`form-control shadow-none flex-grow-1 ${isApproved ? 'bg-light' : ''}`} value={data.employee_id} onChange={(e) => setData('employee_id', e.target.value)} readOnly={isApproved} style={{ borderRadius: '8px', border: '1px solid #DEE2E6' }} />
                        </div>
                        <div className="col-md-4 d-flex align-items-center gap-3">
                            <span className="fw-medium text-dark" style={{ fontSize: '14px', minWidth: '90px' }}>Salary Method</span>
                            <select className={`form-select shadow-none flex-grow-1 ${isApproved ? 'bg-light' : ''}`} value={data.salary_method} onChange={(e) => setData('salary_method', e.target.value)} disabled={isApproved} style={{ borderRadius: '8px', border: '1px solid #DEE2E6' }}>
                                <option value="Cash">Cash</option>
                                <option value="Bank">Bank</option>
                            </select>
                        </div>
                    </div>

                    <div className="row g-4 mb-2">
                        {/* Left Column */}
                        <div className="col-md-6">
                            <div className="text-center py-2 mb-3 rounded-top" style={{ backgroundColor: '#D8D8DF' }}>
                                <h6 className="fw-bold m-0 text-muted" style={{ color: '#5A637A' }}>Regular and Overtime Pay</h6>
                            </div>
                            <div className="d-flex flex-column gap-2">
                                {['rate', 'num_days', 'regular_ot', 'total_ot_pay'].map((field) => (
                                    <div className="d-flex align-items-center" key={field}>
                                        <span className="fw-medium text-dark text-capitalize" style={{ width: '100px', fontSize: '14px' }}>{field.replace(/_/g, ' ')}</span>
                                        {field === 'num_days' ? (
                                            <input type="number" className={`form-control shadow-none ${isApproved ? 'bg-light' : ''}`} value={data[field]} onChange={(e) => setData(field, e.target.value)} readOnly={isApproved} style={{ borderRadius: '8px' }} />
                                        ) : (
                                            <div className="input-group">
                                                <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderRadius: '8px 0 0 8px' }}>₱</span>
                                                <input type="number" className={`form-control shadow-none border-start-0 ${field === 'total_ot_pay' ? 'fw-bold' : ''} ${isApproved ? 'bg-light' : ''}`} value={data[field]} onChange={(e) => setData(field, e.target.value)} readOnly={isApproved} style={{ borderRadius: '0 8px 8px 0' }} />
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <hr className="my-1 border-light" />
                                {['ecola', 'allowance', 'other_pay', 'gross_pay'].map((field) => (
                                    <div className="d-flex align-items-center" key={field}>
                                        <span className={`fw-medium text-dark text-capitalize ${field === 'gross_pay' ? 'fw-bolder' : ''}`} style={{ width: '100px', fontSize: '14px' }}>{field.replace(/_/g, ' ')}</span>
                                        <div className="input-group">
                                            <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderRadius: '8px 0 0 8px' }}>₱</span>
                                            <input type="number" className={`form-control shadow-none border-start-0 ${field === 'gross_pay' ? 'fw-bold' : ''} ${isApproved ? 'bg-light' : ''}`} value={data[field]} onChange={(e) => setData(field, e.target.value)} readOnly={isApproved} style={{ borderRadius: '0 8px 8px 0' }} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* FIXED: Submit Button disappears if already Approved. Cancel text becomes "Close". */}
                            <div className="d-flex justify-content-center gap-3 mt-4">
                                <button type="button" onClick={onClose} className="btn fw-bold text-white shadow-none" style={{ backgroundColor: '#D9534F', borderRadius: '8px', width: '120px', height: '42px' }}>
                                    {isApproved ? 'Close' : 'Cancel'}
                                </button>
                                {!isApproved && (
                                    <button type="submit" className="btn fw-bold text-white shadow-sm border-0" style={{ backgroundColor: '#EAA144', borderRadius: '8px', width: '120px', height: '42px' }}>Update</button>
                                )}
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="col-md-6 border-start border-2 ps-md-4">
                            <div className="text-center py-2 mb-3 rounded-top" style={{ backgroundColor: '#D8D8DF' }}>
                                <h6 className="fw-bold m-0 text-muted" style={{ color: '#5A637A' }}>Employee Contribution</h6>
                            </div>
                            <div className="d-flex flex-column gap-2">
                                {['sss', 'sss_loan', 'philhealth', 'withholding_tax', 'pagibig_fund', 'pagibig_loan'].map((field) => (
                                    <div className="d-flex align-items-center" key={field}>
                                        <span className="fw-medium text-dark text-capitalize" style={{ width: '100px', fontSize: '14px' }}>{field.replace(/_/g, ' ')}</span>
                                        <div className="input-group">
                                            <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderRadius: '8px 0 0 8px' }}>₱</span>
                                            <input type="number" className={`form-control shadow-none border-start-0 ${isApproved ? 'bg-light' : ''}`} value={data[field]} onChange={(e) => setData(field, e.target.value)} readOnly={isApproved} style={{ borderRadius: '0 8px 8px 0' }} />
                                        </div>
                                    </div>
                                ))}
                                <hr className="my-1 border-light" />
                                {['deduction', 'other_deduction', 'total_deduction'].map((field) => (
                                    <div className="d-flex align-items-center" key={field}>
                                        <span className={`fw-medium text-dark text-capitalize ${field === 'total_deduction' ? 'fw-bolder' : ''}`} style={{ width: '100px', fontSize: '14px' }}>{field.replace(/_/g, ' ')}</span>
                                        <div className="input-group">
                                            <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderRadius: '8px 0 0 8px' }}>₱</span>
                                            <input type="number" className={`form-control shadow-none border-start-0 ${field === 'total_deduction' ? 'fw-bold' : ''} ${isApproved ? 'bg-light' : ''}`} value={data[field]} onChange={(e) => setData(field, e.target.value)} readOnly={isApproved} style={{ borderRadius: '0 8px 8px 0' }} />
                                        </div>
                                    </div>
                                ))}
                                <div className="d-flex align-items-center pt-3 border-top border-2 mt-2">
                                    <span className="fw-bolder text-dark" style={{ width: '100px', fontSize: '16px' }}>Net Pay</span>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0 text-muted" style={{ borderRadius: '8px 0 0 8px' }}>₱</span>
                                        <input type="number" className={`form-control shadow-none border-start-0 fw-bolder text-dark ${isApproved ? 'bg-light' : ''}`} value={data.net_pay} onChange={(e) => setData('net_pay', e.target.value)} readOnly={isApproved} style={{ borderRadius: '0 8px 8px 0', fontSize: '16px' }} />
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

export default function Payroll() {
    const [searchQuery, setSearchQuery] = useState('');
    
    // Modal States
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedPayroll, setSelectedPayroll] = useState(null);
    
    // Detailed Dummy Data to accurately populate the Edit Modal
    const dummyPayrolls = [
        { 
            id: '01', employee_id: '03 - Cashier Main', method: 'Cash', status: 'Approved', date_received: '2025-05-08',
            rate: '450', num_days: '5', regular_ot: '420', total_ot_pay: '1420', ecola: '500', allowance: '200', other_pay: '250', gross_pay: '5000',
            sss: '750', sss_loan: '1000', philhealth: '500', withholding_tax: '400', pagibig_fund: '200', pagibig_loan: '800', deduction: '3650', other_deduction: '150', total_deduction: '3800', net_pay: '1240'
        },
        { 
            id: '02', employee_id: '01 - Admin Main', method: 'Bank', status: 'Pending for Approval', date_received: '2025-05-09',
            rate: '500', num_days: '10', regular_ot: '0', total_ot_pay: '0', ecola: '0', allowance: '1000', other_pay: '0', gross_pay: '6000',
            sss: '500', sss_loan: '0', philhealth: '300', withholding_tax: '100', pagibig_fund: '100', pagibig_loan: '0', deduction: '1000', other_deduction: '0', total_deduction: '1000', net_pay: '5000'
        },
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
                                <th className="py-4 fw-bold" style={{ fontSize: '15px', width: '20%' }}>Employee</th>
                                <th className="py-4 fw-bold" style={{ fontSize: '15px', width: '15%' }}>Salary Method</th>
                                <th className="py-4 fw-bold" style={{ fontSize: '15px', width: '20%' }}>Status</th>
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
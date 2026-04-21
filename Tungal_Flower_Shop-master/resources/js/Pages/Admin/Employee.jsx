import React, { useState } from 'react';
import AdminLayout from '../../Layout/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import profilePlaceholder from '../../../../public/assets/images/profile.png';

const PlusIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);

const UserIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

const ArrowLeft = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A0A0A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
);

const ArrowRight = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#A0A0A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
);

function Employee({ employees }) {
    const [searchQuery, setSearchQuery] = useState('');

    const employeeList = employees?.data ? employees.data : employees || [];

    const filteredEmployees = employeeList.filter((emp) => {
        const term = searchQuery.toLowerCase();
        const fullName = `${emp.firstname} ${emp.lastname}`.toLowerCase();
        return fullName.includes(term) || emp.role.toLowerCase().includes(term);
    });

    const displayedEmployees = filteredEmployees.slice(0, 4);

    return (
        <div className="container-fluid py-5 px-5" style={{ minHeight: '100vh', backgroundColor: '#F4F5FA', fontFamily: "'Poppins', sans-serif" }}>
            <Head title="Employee" />

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-5">
                <h2 className="fw-bolder m-0" style={{ color: '#1E1E1E', fontSize: '32px' }}>Employee</h2>

                <div className="d-flex gap-4 align-items-center">
                    <div className="d-flex justify-content-center align-items-center rounded-pill px-4" style={{ backgroundColor: '#EBEAEE', width: '300px', height: '45px' }}>
                        <input
                            type="text"
                            className="form-control border-0 bg-transparent shadow-none text-center"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ fontSize: '14px', color: '#6c757d' }}
                        />
                    </div>

                    <Link
                        href={route('employee.addEmployee')}
                        className="btn d-flex align-items-center gap-2 fw-semibold text-white px-4 rounded-4 shadow-sm border-0"
                        style={{ backgroundColor: '#758AF8', height: '45px', fontSize: '15px' }}
                    >
                        <UserIcon /> Add Employee
                    </Link>
                </div>
            </div>

            {/* 2x2 Grid */}
            <div className="row row-cols-1 row-cols-md-2 g-5 mb-5">
                {displayedEmployees.length > 0 ? (
                    displayedEmployees.map((employee, index) => (
                        <div className="col" key={employee.id}>
                            <div className="card shadow-sm border-0 h-100" style={{ borderRadius: '16px' }}>
                                <div className="card-body p-4 d-flex align-items-center gap-4">
                                    
                                    {/* Avatar Box */}
                                    <div 
                                        className="rounded-4 d-flex justify-content-center align-items-center overflow-hidden flex-shrink-0" 
                                        style={{ width: '120px', height: '120px', backgroundColor: '#7B9DFA' }}
                                    >
                                        <img
                                            src={employee.profile ? `/storage/${employee.profile}` : profilePlaceholder}
                                            alt="profile"
                                            className="object-fit-cover"
                                            style={{ width: '90%', height: '90%', borderRadius: '50%' }}
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="d-flex flex-column justify-content-center w-100">
                                        <h4 className="fw-bold mb-2" style={{ color: '#758AF8' }}>
                                            {employee.firstname} {employee.lastname}
                                        </h4>
                                        
                                        <div className="d-flex align-items-center gap-3 mb-2" style={{ fontSize: '16px' }}>
                                            <span className="fw-bold" style={{ color: '#5A637A' }}>
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            <span style={{ color: '#7E869E' }}>{employee.role}</span>
                                        </div>

                                        <div className="d-flex align-items-center gap-3 mb-3" style={{ fontSize: '14px' }}>
                                            <span className="fw-bold" style={{ color: '#7E869E' }}>Hired Date</span>
                                            <span style={{ color: '#7E869E' }}>
                                                {new Date(employee.created_at || '2025-05-05').toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" })}
                                            </span>
                                        </div>

                                        <Link
                                            href={route('employee.viewProfile', { user_id: employee.id })}
                                            className="d-flex align-items-center gap-2 fw-bold text-decoration-none"
                                            style={{ color: '#758AF8', fontSize: '15px' }}
                                        >
                                            <UserIcon /> View
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center py-5">
                        <p className="text-muted m-0">No employees found.</p>
                    </div>
                )}
            </div>

            {/* Bottom Right Pagination matching Mockup */}
            <div className="d-flex justify-content-end align-items-center gap-3 mt-5 pb-4">
                <a href="#" className="text-decoration-none d-flex align-items-center gap-2 text-dark fw-medium" style={{ fontSize: '14px' }}>
                    <ArrowLeft /> Previous
                </a>
                
                <div className="d-flex justify-content-center align-items-center rounded-2 fw-bold text-white" style={{ width: '32px', height: '32px', backgroundColor: '#758AF8' }}>
                    1
                </div>

                <a href="#" className="text-decoration-none d-flex align-items-center gap-2 text-dark fw-medium" style={{ fontSize: '14px' }}>
                    Next <ArrowRight />
                </a>
            </div>

        </div>
    );
}

Employee.layout = page => <AdminLayout children={page} />;
export default Employee;
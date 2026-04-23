import React, { useState, useEffect } from 'react';
import AdminLayout from '../../../Layout/AdminLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useRoute } from '../../../../../vendor/tightenco/ziggy';
import { Toaster, toast } from 'sonner';
import profilePlaceholder from '../../../../../public/assets/images/profile.png';

// Icons
const BackIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
);

const UserRemoveIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="8.5" cy="7" r="4"></circle>
        <line x1="18" y1="8" x2="23" y2="13"></line>
        <line x1="23" y1="8" x2="18" y2="13"></line>
    </svg>
);

const SaveIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
        <polyline points="17 21 17 13 7 13 7 21"></polyline>
        <polyline points="7 3 7 8 15 8"></polyline>
    </svg>
);

const ClockIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
);

const ArrowLeft = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
);

const ArrowRight = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 19"></polyline></svg>
);

// Attendance Modal Component
const AttendanceModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const [attendanceForm, setAttendanceForm] = useState({
        date: '2025-04-28',
        status: 'On-Time',
        clockIn: '07:11',
        clockOut: '18:30'
    });

    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(20, 20, 30, 0.5)', zIndex: 1050 }}>
            <div className="card shadow-lg border-0" style={{ borderRadius: '24px', width: '100%', maxWidth: '400px', backgroundColor: '#FFF' }}>
                <div className="card-body p-4 p-md-5">
                    <h3 className="fw-bolder text-center mb-4" style={{ color: '#1E1E1E' }}>Attendance</h3>
                    
                    <div className="d-flex align-items-center justify-content-center gap-3 mb-4">
                        <span className="fw-medium text-dark" style={{ fontSize: '14px' }}>Attendance ID</span>
                        <input type="text" className="form-control text-center shadow-none bg-light" value="01" readOnly style={{ width: '60px', borderRadius: '8px' }} />
                    </div>

                    <div className="row g-3 mb-4">
                        <div className="col-12 d-flex align-items-center gap-3">
                            <label className="mb-0 fw-medium text-dark" style={{ width: '80px', fontSize: '14px' }}>Date</label>
                            <input type="date" className="form-control shadow-none flex-grow-1" value={attendanceForm.date} onChange={(e) => setAttendanceForm({...attendanceForm, date: e.target.value})} style={{ borderRadius: '8px' }} />
                        </div>

                        <div className="col-12 d-flex align-items-center gap-3">
                            <label className="mb-0 fw-medium text-dark" style={{ width: '80px', fontSize: '14px' }}>Status</label>
                            <select className="form-select shadow-none flex-grow-1" value={attendanceForm.status} onChange={(e) => setAttendanceForm({...attendanceForm, status: e.target.value})} style={{ borderRadius: '8px' }}>
                                <option value="On-Time">On-Time</option>
                                <option value="Late">Late</option>
                                <option value="Overtime">Overtime</option>
                            </select>
                        </div>

                        <div className="col-12 d-flex align-items-center gap-3">
                            <label className="mb-0 fw-medium text-dark" style={{ width: '80px', fontSize: '14px' }}>Clock In</label>
                            <div className="d-flex flex-grow-1 gap-2">
                                <input type="time" className="form-control shadow-none" value={attendanceForm.clockIn} onChange={(e) => setAttendanceForm({...attendanceForm, clockIn: e.target.value})} style={{ borderRadius: '8px' }} />
                            </div>
                        </div>

                        <div className="col-12 d-flex align-items-center gap-3">
                            <label className="mb-0 fw-medium text-dark" style={{ width: '80px', fontSize: '14px' }}>Clock Out</label>
                            <div className="d-flex flex-grow-1 gap-2">
                                <input type="time" className="form-control shadow-none" value={attendanceForm.clockOut} onChange={(e) => setAttendanceForm({...attendanceForm, clockOut: e.target.value})} style={{ borderRadius: '8px' }} />
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between gap-3 mt-2">
                        <button onClick={onClose} className="btn w-50 fw-bold text-white shadow-none" style={{ backgroundColor: '#DC3545', borderRadius: '8px', height: '45px' }}>Cancel</button>
                        <button className="btn w-50 fw-bold text-white shadow-sm border-0" style={{ backgroundColor: '#758AF8', borderRadius: '8px', height: '45px' }}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Notice we are correctly destructing user_info here now!
export default function ViewProfile({ user_info }) {
    const route = useRoute();
    const targetData = user_info || {};
    const [activeTab, setActiveTab] = useState('details'); 
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Wired up Inertia form matching your UserController requirements
    const { data, setData, post, processing, errors } = useForm({
        id: targetData.id || '', // Include ID for the backend update query
        firstname: targetData.firstname || '',
        lastname: targetData.lastname || '',
        address: targetData.address || '', 
        contact_number: targetData.contact_number || '',
        username: targetData.username || '',
        role: targetData.role || 'Employee',
    });

    const { flash } = usePage().props;

    useEffect(() => {
        if (flash?.success) toast.success(flash.success);
        if (flash?.error) toast.error(flash.error);
    }, [flash]);

    // Submit handler matching your route
    const handleSaveProfile = (e) => {
        e.preventDefault();
        post(route('employee.updateUserInfo'));
    };

    // Mock Attendance Data 
    const attendanceData = [
        { id: '01', date: '05/08/2025', clockIn: '07:11 AM', clockOut: '06:30 PM', status: 'On-Time' },
        { id: '02', date: '05/09/2025', clockIn: '08:00 AM', clockOut: '07:22 PM', status: 'Late' },
        { id: '03', date: '05/13/2025', clockIn: '06:10 AM', clockOut: '05:10 PM', status: 'Overtime' },
    ];

    return (
        <div className="container-fluid py-5 px-5" style={{ minHeight: '100vh', backgroundColor: '#F4F5FA', fontFamily: "'Poppins', sans-serif" }}>
            <Head title="Employee Profile" />
            <Toaster position="top-right" expand={true} richColors />

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bolder m-0" style={{ color: '#1E1E1E', fontSize: '32px' }}>Employee</h2>
                <Link 
                    href={route('admin.employee')} 
                    className="btn d-flex align-items-center gap-2 fw-semibold text-white px-4 rounded-3 shadow-sm border-0"
                    style={{ backgroundColor: '#7859FF', height: '42px', fontSize: '14px' }}
                >
                    <BackIcon /> Back
                </Link>
            </div>

            {/* Main Card */}
            <div className="card shadow-sm border-0 w-100" style={{ borderRadius: '16px', backgroundColor: '#FFF' }}>
                <div className="card-body p-5">
                    
                    {/* Profile Header */}
                    <div className="d-flex align-items-center gap-4 mb-4">
                        <div className="rounded-3 d-flex justify-content-center align-items-center overflow-hidden flex-shrink-0" style={{ width: '110px', height: '110px', backgroundColor: '#7B9DFA' }}>
                            <img src={targetData.profile ? `/storage/${targetData.profile}` : profilePlaceholder} alt="Profile" className="object-fit-cover w-100 h-100" />
                        </div>
                        <div>
                            <h3 className="fw-bold mb-1 text-dark">{data.firstname} {data.lastname}</h3>
                            <div className="d-flex align-items-center gap-2" style={{ fontSize: '16px', color: '#7859FF' }}>
                                <span className="fw-bold">{String(targetData.id).padStart(2, '0')}</span>
                                <span>Employee | {data.role}</span>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="d-flex gap-2 mb-4">
                        <button 
                            onClick={() => setActiveTab('details')}
                            className="btn fw-semibold border-0 shadow-none px-4" 
                            style={{ 
                                backgroundColor: activeTab === 'details' ? '#4A47A3' : '#EBEAEE', 
                                color: activeTab === 'details' ? 'white' : '#5A637A', 
                                borderRadius: '8px', fontSize: '14px' 
                            }}
                        >
                            Details
                        </button>
                        <button 
                            onClick={() => setActiveTab('attendance')}
                            className="btn fw-semibold border-0 shadow-none px-4" 
                            style={{ 
                                backgroundColor: activeTab === 'attendance' ? '#4A47A3' : '#EBEAEE', 
                                color: activeTab === 'attendance' ? 'white' : '#5A637A', 
                                borderRadius: '8px', fontSize: '14px' 
                            }}
                        >
                            Attendance
                        </button>
                    </div>

                    {/* TAB CONTENT: DETAILS */}
                    {activeTab === 'details' && (
                        <form onSubmit={handleSaveProfile}>
                            <h4 className="fw-bold mb-4" style={{ color: '#1E1E1E' }}>Personal Details</h4>
                            <div className="d-flex flex-column gap-3" style={{ maxWidth: '800px' }}>
                                
                                <div className="d-flex align-items-center">
                                    <label className="fw-medium text-dark mb-0" style={{ width: '120px', fontSize: '14px' }}>First Name</label>
                                    <div className="flex-grow-1">
                                        <input 
                                            type="text" 
                                            className={`form-control shadow-none ${errors.firstname ? 'is-invalid' : ''}`} 
                                            value={data.firstname} 
                                            onChange={(e) => setData('firstname', e.target.value)}
                                            style={{ borderRadius: '8px', backgroundColor: '#F8F9FA' }} 
                                        />
                                        {errors.firstname && <div className="invalid-feedback">{errors.firstname}</div>}
                                    </div>
                                </div>

                                <div className="d-flex align-items-center">
                                    <label className="fw-medium text-dark mb-0" style={{ width: '120px', fontSize: '14px' }}>Last Name</label>
                                    <div className="flex-grow-1">
                                        <input 
                                            type="text" 
                                            className={`form-control shadow-none ${errors.lastname ? 'is-invalid' : ''}`} 
                                            value={data.lastname} 
                                            onChange={(e) => setData('lastname', e.target.value)}
                                            style={{ borderRadius: '8px', backgroundColor: '#F8F9FA' }} 
                                        />
                                        {errors.lastname && <div className="invalid-feedback">{errors.lastname}</div>}
                                    </div>
                                </div>

                                <div className="d-flex align-items-center">
                                    <label className="fw-medium text-dark mb-0" style={{ width: '120px', fontSize: '14px' }}>Address</label>
                                    <div className="flex-grow-1">
                                        <input 
                                            type="text" 
                                            className="form-control shadow-none" 
                                            value={data.address} 
                                            onChange={(e) => setData('address', e.target.value)}
                                            style={{ borderRadius: '8px', backgroundColor: '#F8F9FA' }} 
                                            placeholder="Enter address"
                                        />
                                    </div>
                                </div>

                                <div className="d-flex align-items-center">
                                    <label className="fw-medium text-dark mb-0" style={{ width: '120px', fontSize: '14px' }}>Contact #</label>
                                    <div className="flex-grow-1">
                                        <input 
                                            type="text" 
                                            className={`form-control shadow-none ${errors.contact_number ? 'is-invalid' : ''}`} 
                                            value={data.contact_number} 
                                            onChange={(e) => setData('contact_number', e.target.value)}
                                            style={{ borderRadius: '8px', backgroundColor: '#F8F9FA' }} 
                                        />
                                        {errors.contact_number && <div className="invalid-feedback">{errors.contact_number}</div>}
                                    </div>
                                </div>

                                <div className="d-flex align-items-center">
                                    <label className="fw-medium text-dark mb-0" style={{ width: '120px', fontSize: '14px' }}>UserName</label>
                                    <div className="flex-grow-1">
                                        <input 
                                            type="text" 
                                            className={`form-control shadow-none ${errors.username ? 'is-invalid' : ''}`} 
                                            value={data.username} 
                                            onChange={(e) => setData('username', e.target.value)}
                                            style={{ width: '200px', borderRadius: '8px', backgroundColor: '#F8F9FA' }} 
                                        />
                                        {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex justify-content-end gap-3 mt-4">
                                <button type="button" className="btn d-flex align-items-center gap-2 fw-bold text-white px-4 border-0 shadow-sm" style={{ backgroundColor: '#DC3545', borderRadius: '8px', height: '42px' }}>
                                    <UserRemoveIcon /> Fire
                                </button>
                                <button type="submit" disabled={processing} className="btn d-flex align-items-center gap-2 fw-bold text-white px-4 border-0 shadow-sm" style={{ backgroundColor: '#0D6EFD', borderRadius: '8px', height: '42px' }}>
                                    <SaveIcon /> {processing ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* TAB CONTENT: ATTENDANCE */}
                    {activeTab === 'attendance' && (
                        <div>
                            <h4 className="fw-bold mb-4" style={{ color: '#1E1E1E' }}>Attendance</h4>
                            
                            <div className="border rounded-4 overflow-hidden mb-4">
                                <table className="table table-borderless align-middle mb-0 text-center">
                                    <thead style={{ backgroundColor: '#EBEAEE', color: '#1E1E1E' }}>
                                        <tr>
                                            <th className="py-3" style={{ fontSize: '14px' }}>Attendance ID</th>
                                            <th className="py-3" style={{ fontSize: '14px' }}>Date</th>
                                            <th className="py-3" style={{ fontSize: '14px' }}>Clock In</th>
                                            <th className="py-3" style={{ fontSize: '14px' }}>Clock Out</th>
                                            <th className="py-3" style={{ fontSize: '14px' }}>Status</th>
                                            <th className="py-3" style={{ fontSize: '14px' }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {attendanceData.map((row, index) => (
                                            <tr key={index} className="border-bottom">
                                                <td className="fw-bold py-3">{row.id}</td>
                                                <td className="py-3 text-muted">{row.date}</td>
                                                <td className="py-3 text-muted">{row.clockIn}</td>
                                                <td className="py-3 text-muted">{row.clockOut}</td>
                                                <td className="py-3 text-dark">{row.status}</td>
                                                <td className="py-3">
                                                    <button onClick={() => setIsModalOpen(true)} className="btn btn-sm d-inline-flex align-items-center gap-2 fw-semibold text-white border-0 shadow-none px-3" style={{ backgroundColor: '#758AF8', borderRadius: '8px' }}>
                                                        <ClockIcon /> Edit
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                
                                <div className="d-flex justify-content-end align-items-center gap-3 py-3 pe-4" style={{ backgroundColor: '#EBEAEE' }}>
                                    <span className="text-muted d-flex align-items-center gap-1 fw-medium" style={{ fontSize: '14px' }}>
                                        <ArrowLeft /> Previous
                                    </span>
                                    <div className="d-flex justify-content-center align-items-center rounded-2 fw-bold text-white" style={{ width: '32px', height: '32px', backgroundColor: '#758AF8' }}>
                                        1
                                    </div>
                                    <span className="text-muted d-flex align-items-center gap-1 fw-medium" style={{ fontSize: '14px' }}>
                                        Next <ArrowRight />
                                    </span>
                                </div>
                            </div>

                            <button onClick={() => setIsModalOpen(true)} className="btn d-inline-flex align-items-center gap-2 fw-semibold text-white px-4 rounded-3 shadow-sm border-0" style={{ backgroundColor: '#7859FF', height: '42px', fontSize: '14px' }}>
                                <ClockIcon /> Add Attendance
                            </button>
                        </div>
                    )}

                </div>
            </div>

            <AttendanceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}

ViewProfile.layout = page => <AdminLayout children={page} />;
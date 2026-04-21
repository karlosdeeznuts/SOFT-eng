import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../Layout/AdminLayout';

const AlertCircleIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
);

const ReportIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
);

const TrendUpIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
        <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
);

const DownloadIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
);

const ClockIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
);

function Report({
    // placeholder here brodie
    stockAlerts = [
        { id: 1, type: 'below_minimum', label: 'Below Minimum', product: 'Red Roses', units: 50, date: '3 days ago (Feb 4, 2025)' },
        { id: 2, type: 'attention', label: 'Attention !', product: 'Yellow Daisy', units: 65, date: '4 days ago (Feb 3, 2025)' },
        { id: 3, type: 'low_stock', label: 'Low Stock', product: 'Red Tulips', units: 25, date: '5 days ago (Feb 2, 2025)' },
        { id: 4, type: 'out_of_stock', label: 'Out of Stock', product: 'Yellow Roses', units: 0, date: '6 days ago (Feb 1, 2025)' }
    ],
    salesOverview = {
        totalSales: '13 699 000',
        salesTrend: '5% vs last 30 days',
        totalOrders: '153',
        ordersTrend: '5% vs last 30 days',
        avgSales: '1978',
        avgTrend: '4% vs last 30 days'
    }
}) {

    // helper function for the severity
    const getAlertStyle = (type) => {
        switch(type) {
            case 'below_minimum':
                return { bg: '#FFFFFF', text: '#D84B51', mutedText: '#6c757d' };
            case 'attention':
                return { bg: '#D98014', text: '#FFFFFF', mutedText: '#FFFFFF' };
            case 'low_stock':
                return { bg: '#FFFFFF', text: '#D98014', mutedText: '#6c757d' };
            case 'out_of_stock':
                return { bg: '#B21F1F', text: '#FFFFFF', mutedText: '#FFFFFF' };
            default:
                return { bg: '#FFFFFF', text: '#1E1E1E', mutedText: '#6c757d' };
        }
    };

    return (
        <div className="container-fluid py-5 px-4 position-relative" style={{ minHeight: '100vh', backgroundColor: '#F5F4FF', fontFamily: "'Poppins', sans-serif" }}>
            <Head title="Reports" />

            {/* header Row */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="fw-bold m-0" style={{ color: '#1E1E1E', fontSize: '2.5rem' }}>Reports</h1>
                
                <Link href="#" className="btn d-flex align-items-center gap-2 fw-bold text-white shadow-sm px-4" style={{ backgroundColor: '#7978E9', borderRadius: '10px', height: '50px' }}>
                    <ReportIcon /> Inventory Report
                </Link>
            </div>

            {/* SECTION 1: Critical Stock Alerts */}
            <div className="card border-0 shadow-sm mb-5" style={{ borderRadius: '15px', backgroundColor: '#FCE8E8' }}>
                <div className="card-body p-4 p-lg-5">
                    
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="d-flex align-items-center gap-2" style={{ color: '#D84B51' }}>
                            <AlertCircleIcon />
                            <h4 className="fw-bold m-0">Critical Stock Alerts</h4>
                        </div>
                        <Link href="#" className="btn d-flex align-items-center gap-2 fw-bold text-white shadow-sm px-4" style={{ backgroundColor: '#D84B51', borderRadius: '10px', height: '45px' }}>
                            <ReportIcon /> Alert Report
                        </Link>
                    </div>

                    <div className="row g-4">
                        {stockAlerts.map((alert) => {
                            const style = getAlertStyle(alert.type);
                            return (
                                <div className="col-12 col-md-6 col-xl-3" key={alert.id}>
                                    <div className="card h-100 border-0 shadow-sm text-center" style={{ backgroundColor: style.bg, borderRadius: '12px' }}>
                                        <div className="card-body d-flex flex-column justify-content-center p-4">
                                            <p className="fw-semibold mb-2" style={{ color: style.text, fontSize: '0.9rem' }}>
                                                {alert.label} {alert.type === 'attention' && <AlertCircleIcon />}
                                            </p>
                                            <h3 className="fw-bold mb-3" style={{ color: style.text }}>{alert.product}</h3>
                                            <h5 className="fw-bold mb-4" style={{ color: style.text }}>
                                                {alert.units < 10 && alert.units > 0 ? `0${alert.units}` : alert.units === 0 ? '00' : alert.units} Units
                                            </h5>
                                            <div className="d-flex align-items-center justify-content-center gap-2 mt-auto" style={{ color: style.mutedText, fontSize: '0.8rem' }}>
                                                <ClockIcon />
                                                <span>{alert.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>

            {/* SECTION 2: Sales & Customers Overview */}
            <div className="card border-0 shadow-sm" style={{ borderRadius: '15px', backgroundColor: '#FFFFFF' }}>
                <div className="card-body p-4 p-lg-5">
                    
                    <h4 className="fw-bold mb-5" style={{ color: '#7DA0FA' }}>Sales & Customers Overview</h4>

                    <div className="row g-4 justify-content-center mb-5">
                        
                        {/* Total Sales */}
                        <div className="col-12 col-md-4">
                            <div className="card h-100 border-0 shadow-sm text-center" style={{ backgroundColor: '#1F2D5A', borderRadius: '12px' }}>
                                <div className="card-body p-4">
                                    <p className="text-white-50 fw-semibold mb-3">Total Sales</p>
                                    <h2 className="fw-bold text-white mb-4">₱ {salesOverview.totalSales}</h2>
                                    <div className="d-flex align-items-center justify-content-center gap-2 fw-semibold" style={{ color: '#00D2FF' }}>
                                        <TrendUpIcon />
                                        <span>{salesOverview.salesTrend}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* total orders */}
                        <div className="col-12 col-md-4">
                            <div className="card h-100 border-0 shadow-sm text-center" style={{ backgroundColor: '#1F2D5A', borderRadius: '12px' }}>
                                <div className="card-body p-4">
                                    <p className="text-white-50 fw-semibold mb-3">Total Orders</p>
                                    <h2 className="fw-bold text-white mb-4">{salesOverview.totalOrders}</h2>
                                    <div className="d-flex align-items-center justify-content-center gap-2 fw-semibold" style={{ color: '#00D2FF' }}>
                                        <TrendUpIcon />
                                        <span>{salesOverview.ordersTrend}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* averagesales */}
                        <div className="col-12 col-md-4">
                            <div className="card h-100 border-0 shadow-sm text-center" style={{ backgroundColor: '#1F2D5A', borderRadius: '12px' }}>
                                <div className="card-body p-4">
                                    <p className="text-white-50 fw-semibold mb-3">Average Sales</p>
                                    <h2 className="fw-bold text-white mb-4">{salesOverview.avgSales}</h2>
                                    <div className="d-flex align-items-center justify-content-center gap-2 fw-semibold" style={{ color: '#00D2FF' }}>
                                        <TrendUpIcon />
                                        <span>{salesOverview.avgTrend}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* ownload buttons */}
                    <div className="d-flex justify-content-center gap-4">
                        <Link href="#" className="btn d-flex flex-column align-items-center justify-content-center fw-bold shadow-sm" style={{ backgroundColor: '#9CB4FA', color: '#1E1E1E', borderRadius: '10px', width: '220px', height: '80px' }}>
                            <span>Download</span>
                            <span>Monthly Report</span>
                            <DownloadIcon />
                        </Link>
                        
                        <Link href="#" className="btn d-flex flex-column align-items-center justify-content-center fw-bold shadow-sm" style={{ backgroundColor: '#9CB4FA', color: '#1E1E1E', borderRadius: '10px', width: '220px', height: '80px' }}>
                            <span>Download</span>
                            <span>Weekly Report</span>
                            <DownloadIcon />
                        </Link>
                    </div>

                </div>
            </div>

        </div>
    );
}

Report.layout = page => <AdminLayout children={page} />;
export default Report;
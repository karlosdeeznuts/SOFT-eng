import React from 'react';
import AdminLayout from '../../Layout/AdminLayout';
import { BsCalendarDay, BsCalendarWeek, BsCalendarMonth, BsBagCheck, BsArrowReturnLeft, BsGraphUp, BsExclamationTriangle } from "react-icons/bs";

function Report({
    // Variables set up to accept Laravel Inertia props.
    // They are loaded with placeholder default values for the UI stage.
    dailyRevenue = "₱ 5,420",
    weeklyRevenue = "₱ 32,100",
    monthlyRevenue = "₱ 145,000",
    totalOrders = 412,
    completedDeliveries = 390,
    canceledOrders = 12,
    returnedItems = 10,
    topCategory = "Red Roses",
    leastCategory = "White Lilies"
}) {
    
    return (
        <div className="container-fluid p-0">
            <h2 className="fw-bold mb-4" style={{ color: '#1a1d2d' }}>Reports</h2>

            {/* Revenue Overview Row */}
            <div className="row g-4 mb-4">
                <div className="col-12 col-md-4">
                    <div className="card shadow-sm border-0 text-white h-100" style={{ backgroundColor: '#5873d1', borderRadius: '12px' }}>
                        <div className="card-body p-4 d-flex justify-content-between align-items-center">
                            <div>
                                <p className="mb-1" style={{ fontSize: '0.95rem' }}>Daily Revenue</p>
                                <h2 className="fw-bold mb-0">{dailyRevenue}</h2>
                            </div>
                            <BsCalendarDay style={{ fontSize: '2.5rem', opacity: '0.9' }} />
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="card shadow-sm border-0 text-white h-100" style={{ backgroundColor: '#8ea9f9', borderRadius: '12px' }}>
                        <div className="card-body p-4 d-flex justify-content-between align-items-center">
                            <div>
                                <p className="mb-1 text-dark" style={{ fontSize: '0.95rem' }}>Weekly Revenue</p>
                                <h2 className="fw-bold mb-0 text-dark">{weeklyRevenue}</h2>
                            </div>
                            <BsCalendarWeek className="text-dark" style={{ fontSize: '2.5rem', opacity: '0.9' }} />
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="card shadow-sm border-0 text-white h-100" style={{ backgroundColor: '#d0d4ef', borderRadius: '12px' }}>
                        <div className="card-body p-4 d-flex justify-content-between align-items-center">
                            <div>
                                <p className="mb-1 text-dark" style={{ fontSize: '0.95rem' }}>Monthly Revenue</p>
                                <h2 className="fw-bold mb-0 text-dark">{monthlyRevenue}</h2>
                            </div>
                            <BsCalendarMonth className="text-dark" style={{ fontSize: '2.5rem', opacity: '0.9' }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Orders & Fulfillment Row */}
            <div className="row g-4 mb-4">
                <div className="col-12 col-lg-6">
                    <div className="card shadow-sm border-0 h-100" style={{ borderRadius: '12px' }}>
                        <div className="card-body p-4">
                            <h5 className="fw-bold mb-4" style={{ color: '#6d78e3' }}>Order Fulfillment</h5>
                            
                            <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-3">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="p-2 rounded bg-light"><BsBagCheck className="text-success fs-5" /></div>
                                    <span className="text-secondary fw-semibold">Total Orders Processed</span>
                                </div>
                                <span className="fw-bold fs-5 text-dark">{totalOrders}</span>
                            </div>

                            <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-3">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="p-2 rounded bg-light"><BsGraphUp className="text-primary fs-5" /></div>
                                    <span className="text-secondary fw-semibold">Completed Deliveries</span>
                                </div>
                                <span className="fw-bold fs-5 text-dark">{completedDeliveries}</span>
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center gap-3">
                                    <div className="p-2 rounded bg-light"><BsExclamationTriangle className="text-warning fs-5" /></div>
                                    <span className="text-secondary fw-semibold">Canceled Orders</span>
                                </div>
                                <span className="fw-bold fs-5 text-dark">{canceledOrders}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Returns and Anomalies */}
                <div className="col-12 col-lg-6">
                    <div className="card shadow-sm border-0 h-100" style={{ borderRadius: '12px' }}>
                        <div className="card-body p-4">
                            <h5 className="fw-bold mb-4" style={{ color: '#de5b62' }}>Issues & Returns</h5>
                            
                            <div className="d-flex justify-content-between align-items-center mb-4 p-3 rounded" style={{ backgroundColor: '#fbd1d6' }}>
                                <div className="d-flex align-items-center gap-3">
                                    <BsArrowReturnLeft className="text-danger fs-4" />
                                    <span className="fw-bold text-dark">Returned/Damaged Items</span>
                                </div>
                                <span className="fw-bold fs-4 text-danger">{returnedItems}</span>
                            </div>

                            <div className="row g-3 text-center mt-2">
                                <div className="col-6">
                                    <div className="p-3 rounded border">
                                        <p className="text-muted mb-1 small fw-bold text-uppercase">Best Performer</p>
                                        <h6 className="fw-bold text-success mb-0">{topCategory}</h6>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="p-3 rounded border">
                                        <p className="text-muted mb-1 small fw-bold text-uppercase">Needs Attention</p>
                                        <h6 className="fw-bold text-danger mb-0">{leastCategory}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Report.layout = page => <AdminLayout children={page} />
export default Report;
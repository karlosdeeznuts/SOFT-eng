import React from 'react'
import { BsBoxSeam } from "react-icons/bs";
import { HiOutlinePencil } from "react-icons/hi2";
import { BsFileText } from "react-icons/bs";
import SalesChart from '../../Layout/SalesChart';
import AdminLayout from '../../Layout/AdminLayout'

function Dashboard({ topSellingProducts }) {
    
    return (
        <div className="container-fluid p-0">
            <h2 className="fw-bold mb-4" style={{ color: '#1a1d2d' }}>Dashboard</h2>

            {/* Top Metric Cards */}
            <div className="row g-4 mb-4">
                <div className="col-12 col-md-4">
                    <div className="card shadow-sm border-0 text-white h-100" style={{ backgroundColor: '#5873d1', borderRadius: '12px' }}>
                        <div className="card-body p-4 d-flex justify-content-between align-items-center">
                            <div>
                                <p className="mb-1" style={{ fontSize: '0.95rem' }}>Total Flowers in Store</p>
                                <h1 className="fw-bold mb-0 display-5">200</h1>
                            </div>
                            <BsBoxSeam style={{ fontSize: '2.5rem', opacity: '0.9' }} />
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="card shadow-sm border-0 text-white h-100" style={{ backgroundColor: '#707584', borderRadius: '12px' }}>
                        <div className="card-body p-4 d-flex justify-content-between align-items-center">
                            <div>
                                <p className="mb-1" style={{ fontSize: '0.95rem' }}>Total Flowers Orders</p>
                                <h1 className="fw-bold mb-0 display-5 d-inline-block me-2">52</h1>
                                <span style={{ fontSize: '0.8rem', opacity: '0.8' }}>(last 30 days)</span>
                            </div>
                            <HiOutlinePencil style={{ fontSize: '2rem', opacity: '0.9' }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Middle Row Charts & Stats */}
            <div className="row g-4 mb-4">
                <div className="col-12 col-lg-7">
                    <div className="card shadow-sm border-0 h-100" style={{ borderRadius: '12px' }}>
                        <div className="card-body p-4">
                            <h5 className="fw-bold" style={{ color: '#6d78e3' }}>Sales Summary <span className="text-muted fw-normal fs-6">(last 30 days)</span></h5>
                            <div className="mt-4" style={{ height: '250px' }}>
                                {/* Reusing your existing chart component here as a placeholder for the bar chart */}
                                <SalesChart topSellingProducts={topSellingProducts} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-5">
                    <div className="card shadow-sm border-0 h-100" style={{ borderRadius: '12px' }}>
                        <div className="card-body p-4">
                            <h5 className="fw-bold text-center mb-4" style={{ color: '#6d78e3' }}>Stock Numbers</h5>
                            
                            <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                                <span className="fw-bold" style={{ color: '#de5b62' }}>Low Stock Flower Categories</span>
                                <span className="fw-bold" style={{ color: '#de5b62' }}>12</span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                                <span className="text-secondary fw-semibold">Flower Categories</span>
                                <span className="fw-bold text-dark">15</span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                                <span className="text-secondary fw-semibold">Recently added amount</span>
                                <span className="fw-bold text-dark">13</span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mt-4">
                                <span className="fw-bold" style={{ color: '#db8435' }}>Returned/Damaged Flowers</span>
                                <span className="fw-bold" style={{ color: '#db8435' }}>13</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Row Best/Least Sellers */}
            <div className="row g-4">
                <div className="col-12 col-lg-6">
                    <div className="card shadow-sm border-0 h-100" style={{ borderRadius: '12px' }}>
                        <div className="card-body p-4 d-flex flex-column">
                            <h5 className="fw-bold mb-4" style={{ color: '#6d78e3' }}>Top Selling Flowers <span className="text-muted fw-normal fs-6">(last 30 days)</span></h5>
                            <div className="row flex-grow-1 text-center g-3">
                                <div className="col-4">
                                    <div className="p-3 rounded h-100 d-flex flex-column justify-content-center" style={{ backgroundColor: '#8ea9f9' }}>
                                        <p className="fw-bold text-dark mb-2">Red Roses</p>
                                        <h4 className="fw-bold text-dark mb-0">742</h4>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="p-3 rounded h-100 d-flex flex-column justify-content-center" style={{ backgroundColor: '#a1c1ff' }}>
                                        <p className="fw-bold text-dark mb-2">Purple Tulip</p>
                                        <h4 className="fw-bold text-dark mb-0">250</h4>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="p-3 rounded h-100 d-flex flex-column justify-content-center" style={{ backgroundColor: '#d0d4ef' }}>
                                        <p className="fw-bold text-dark mb-2">Sunflowers</p>
                                        <h4 className="fw-bold text-dark mb-0">43</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                <a href="#" className="text-decoration-none fw-bold" style={{ color: '#44519e' }}><BsFileText /> View Report</a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-12 col-lg-6">
                    <div className="card shadow-sm border-0 h-100" style={{ borderRadius: '12px' }}>
                        <div className="card-body p-4 d-flex flex-column">
                            <h5 className="fw-bold mb-4" style={{ color: '#de5b62' }}>Least Selling Flowers <span className="text-muted fw-normal fs-6">(last 30 days)</span></h5>
                            <div className="row flex-grow-1 text-center g-3">
                                <div className="col-4">
                                    <div className="p-3 rounded h-100 d-flex flex-column justify-content-center" style={{ backgroundColor: '#ef7d84' }}>
                                        <p className="fw-bold text-dark mb-2">Lily</p>
                                        <h4 className="fw-bold text-dark mb-0">14</h4>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="p-3 rounded h-100 d-flex flex-column justify-content-center" style={{ backgroundColor: '#f6a9ae' }}>
                                        <p className="fw-bold text-dark mb-2">Yellow Roses</p>
                                        <h4 className="fw-bold text-dark mb-0">15</h4>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="p-3 rounded h-100 d-flex flex-column justify-content-center" style={{ backgroundColor: '#fbd1d6' }}>
                                        <p className="fw-bold text-dark mb-2">Tulip</p>
                                        <h4 className="fw-bold text-dark mb-0">18</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                <a href="#" className="text-decoration-none fw-bold" style={{ color: '#de5b62' }}><BsFileText /> View Report</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Dashboard.layout = page => <AdminLayout children={page} />
export default Dashboard
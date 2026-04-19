import React from 'react'
import logo from '../../../public/assets/images/logo.png'
import profile from '../../../public/assets/images/profile.png'
import { Link, usePage } from '@inertiajs/react'
import { BsFillGridFill } from "react-icons/bs";
import { IoExit } from "react-icons/io5";
import { FaBars } from "react-icons/fa6";
import { useRoute } from '../../../vendor/tightenco/ziggy'

export default function DeliveryLayout({ children }) {
    const route = useRoute();
    const { auth } = usePage().props;

    return (
        <div className="d-flex vh-100 bg-light">
            <div className="bg-light shadow p-3 sidebar" style={{ width: '20%', height: '100vh', position: 'fixed' }}>
                <div className="d-flex align-items-center gap-2 mb-4">
                    <div className="text-center">
                        <img src={logo} alt="logo" className="object-fit-cover" style={{ width: '50px', height: '50px' }} />
                    </div>
                    <h5 className='text-success'>Tungal's <br />Flower Shop</h5>
                </div>

                <nav className="d-flex flex-column gap-1">
                    <Link
                        href={route('delivery.dashboard')}
                        className={`d-flex align-items-center gap-2 rounded p-2 sidebar-item active`}
                    >
                        <BsFillGridFill /> Dashboard
                    </Link>
                </nav>

                <div style={{ position: 'absolute', bottom: '30px', width: 'calc(100% - 32px)' }}>
                    <Link
                        href={route('customer.index')}
                        className={`d-flex align-items-center gap-2 rounded p-2 sidebar-item text-danger fw-bold`}
                    >
                        <IoExit /> Logout
                    </Link>
                </div>
            </div>

            <div className="bg-light content" style={{ marginLeft: '20%', width: '80%' }}>
                <nav className="d-flex justify-content-between align-items-center bg-dark text-light px-3 py-2 sticky-top">
                    <div className="d-flex align-items-center gap-3">
                        <button className="btn btn-light humburger-hidden"><FaBars /></button>
                        <img src={auth?.user?.profile ? `/storage/${auth.user.profile}` : profile} alt="profile" className="object-fit-cover rounded-circle border border-2 border-light shadow-lg" style={{ width: '45px', height: '45px' }} />
                        <h5 className="text-light m-0"><span className="text-warning">Driver:</span> {auth?.user ? `${auth.user.firstname} ${auth.user.lastname}` : 'Guest'}</h5>
                    </div>
                </nav>

                <section className="p-3">
                    {children}
                </section>
            </div>
        </div>
    )
}
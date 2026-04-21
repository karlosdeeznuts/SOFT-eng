import React from 'react';
import { Link, usePage } from '@inertiajs/react';

// Figma SVGs
function ShoppingBagIcon() { return (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 22C5.45 22 4.97933 21.8043 4.588 21.413C4.19667 21.0217 4.00067 20.5507 4 20V8C4 7.45 4.196 6.97933 4.588 6.588C4.98 6.19667 5.45067 6.00067 6 6H8C8 4.9 8.39167 3.95833 9.175 3.175C9.95833 2.39167 10.9 2 12 2C13.1 2 14.0417 2.39167 14.825 3.175C15.6083 3.95833 16 4.9 16 6H18C18.55 6 19.021 6.196 19.413 6.588C19.805 6.98 20.0007 7.45067 20 8V20C20 20.55 19.8043 21.021 19.413 21.413C19.0217 21.805 18.5507 22.0007 18 22H6ZM10 6H14C14 5.45 13.8043 4.97933 13.413 4.588C13.0217 4.19667 12.5507 4.00067 12 4C11.4493 3.99933 10.9787 4.19533 10.588 4.588C10.1973 4.98067 10.0013 5.45133 10 6ZM15 11C15.2833 11 15.521 10.904 15.713 10.712C15.905 10.52 16.0007 10.2827 16 10V8H14V10C14 10.2833 14.096 10.521 14.288 10.713C14.48 10.905 14.7173 11.0007 15 11ZM9 11C9.28333 11 9.521 10.904 9.713 10.712C9.905 10.52 10.0007 10.2827 10 10V8H8V10C8 10.2833 8.096 10.521 8.288 10.713C8.48 10.905 8.71733 11.0007 9 11Z" fill="currentColor"/></svg>); }
function WarehouseIcon() { return (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 19H6V11H18V19H20V8.35L12 5.15L4 8.35V19ZM2 21V7L12 3L22 7V21H16V13H8V21H2ZM9 21V19H11V21H9ZM11 18V16H13V18H11ZM13 21V19H15V21H13Z" fill="currentColor"/></svg>); }
function ReportIcon() { return (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M11.3445 2.3175H3.75V18.6825H17.25V8.046M11.3445 2.3175L17.25 8.046M11.3445 2.3175V8.046H17.25M6.75 21.75H20.25V11.25M6 11.25H15M6 7.5H9M6 15H15" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>); }
function OrdersIcon() { return (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 3.75H5.25V21.75H18.75V3.75H15M7.5 17.25H16.5M9 5.25H15L15.75 2.25H8.25L9 5.25ZM9 15L11.25 14.25L15.75 9.75L14.25 8.25L9.75 12.75L9 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>); }
function DeliveryIcon() { return (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 18H1V3H14V17M3 18C3 17.2044 3.31607 16.4413 3.87868 15.8787C4.44129 15.3161 5.20435 15 6 15C6.79565 15 7.55871 15.3161 8.12132 15.8787C8.68393 16.4413 9 17.2044 9 18M3 18C3 18.7956 3.31607 19.5587 3.87868 20.1213C4.44129 20.6839 5.20435 21 6 21C6.79565 21 7.55871 20.6839 8.12132 20.1213C8.68393 19.5587 9 18.7956 9 18M14 18H9M14 18C14 17.2044 14.3161 16.4413 14.8787 15.8787C15.4413 15.3161 16.2044 15 17 15C17.7956 15 18.5587 15.3161 19.1213 15.8787C19.6839 16.4413 20 17.2044 20 18M14 18C14 18.7956 14.3161 19.5587 14.8787 20.1213C15.4413 20.6839 16.2044 21 17 21C17.7956 21 18.5587 20.6839 19.1213 20.1213C19.6839 19.5587 20 18.7956 20 18M20 18H23V13L19 8H14" stroke="currentColor" strokeWidth="2"/></svg>); }
function CustomerIcon() { return (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM4 18V17.2C4 16.6333 4.146 16.1127 4.438 15.638C4.73 15.1633 5.11733 14.8007 5.6 14.55C6.63333 14.0333 7.68333 13.646 8.75 13.388C9.81667 13.13 10.9 13.0007 12 13C13.1 12.9993 14.1833 13.1287 15.25 13.388C16.3167 13.6473 17.3667 14.0347 18.4 14.55C18.8833 14.8 19.271 15.1627 19.563 15.638C19.855 16.1133 20.0007 16.634 20 17.2V18C20 18.55 19.8043 19.021 19.413 19.413C19.0217 19.805 18.5507 20.0007 18 20H6C5.45 20 4.97933 19.8043 4.588 19.413C4.19667 19.0217 4.00067 18.5507 4 18ZM6 18H18V17.2C18 17.0167 17.9543 16.85 17.863 16.7C17.7717 16.55 17.6507 16.4333 17.5 16.35C16.6 15.9 15.6917 15.5627 14.775 15.338C13.8583 15.1133 12.9333 15.0007 12 15C11.0667 14.9993 10.1417 15.112 9.225 15.338C8.30833 15.564 7.4 15.9013 6.5 16.35C6.35 16.4333 6.229 16.55 6.137 16.7C6.045 16.85 5.99933 17.0167 6 17.2V18ZM12 10C12.55 10 13.021 9.80433 13.413 9.413C13.805 9.02167 14.0007 8.55067 14 8C13.9993 7.44933 13.8037 6.97867 13.413 6.588C13.0223 6.19733 12.5513 6.00133 12 6C11.4487 5.99867 10.978 6.19467 10.588 6.588C10.198 6.98133 10.002 7.452 10 8C9.998 8.548 10.194 9.019 10.588 9.413C10.982 9.807 11.4527 10.0027 12 10Z" fill="currentColor"/></svg>); }
function LogoutIcon() { return (<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 18.25C11.8011 18.25 11.6103 18.329 11.4697 18.4697C11.329 18.6103 11.25 18.8011 11.25 19C11.25 19.1989 11.329 19.3897 11.4697 19.5303C11.6103 19.671 11.8011 19.75 12 19.75H18C18.4641 19.75 18.9092 19.5656 19.2374 19.2374C19.5656 18.9092 19.75 18.4641 19.75 18V6C19.75 5.53587 19.5656 5.09075 19.2374 4.76256C18.9092 4.43437 18.4641 4.25 18 4.25H12C11.8011 4.25 11.6103 4.32902 11.4697 4.46967C11.329 4.61032 11.25 4.80109 11.25 5C11.25 5.19891 11.329 5.38968 11.4697 5.53033C11.6103 5.67098 11.8011 5.75 12 5.75H18C18.0663 5.75 18.1299 5.77634 18.1768 5.82322C18.2237 5.87011 18.25 5.9337 18.25 6V18C18.25 18.0663 18.2237 18.1299 18.1768 18.1768C18.1299 18.2237 18.0663 18.25 18 18.25H12Z" fill="#F5F7FF"/><path fillRule="evenodd" clipRule="evenodd" d="M14.5029 14.365C15.1929 14.365 15.7529 13.805 15.7529 13.115V10.875C15.7529 10.185 15.1929 9.62498 14.5029 9.62498H9.8899L9.8699 9.40498L9.8159 8.84898C9.79681 8.65261 9.73064 8.46373 9.62301 8.29838C9.51538 8.13302 9.36946 7.99606 9.19763 7.8991C9.0258 7.80214 8.83312 7.74805 8.63593 7.74142C8.43874 7.73478 8.24286 7.77579 8.0649 7.86098C6.42969 8.64307 4.94977 9.71506 3.6969 11.025L3.5979 11.128C3.37433 11.3612 3.24951 11.6719 3.24951 11.995C3.24951 12.3181 3.37433 12.6287 3.5979 12.862L3.6979 12.965C4.95047 14.2748 6.43005 15.3468 8.0649 16.129C8.24286 16.2142 8.43874 16.2552 8.63593 16.2485C8.83312 16.2419 9.0258 16.1878 9.19763 16.0909C9.36946 15.9939 9.51538 15.8569 9.62301 15.6916C9.73064 15.5262 9.79681 15.3374 9.8159 15.141L9.8699 14.585L9.8899 14.365H14.5029ZM9.1949 12.865C9.00405 12.8651 8.82044 12.938 8.68147 13.0688C8.54249 13.1996 8.45861 13.3785 8.4469 13.569C8.42823 13.859 8.4049 14.1493 8.3769 14.44L8.3609 14.602C7.05583 13.9285 5.86846 13.0481 4.8449 11.995C5.86846 10.9418 7.05583 10.0614 8.3609 9.38798L8.3769 9.54998C8.4049 9.83998 8.42823 10.1303 8.4469 10.421C8.45861 10.6115 8.54249 10.7903 8.68147 10.9211C8.82044 11.0519 9.00405 11.1248 9.1949 11.125H14.2529V12.865H9.1949Z" fill="#F5F7FF"/></svg>); }

export default function CustomerLayout({ children }) {
  const { auth } = usePage().props;
  const currentRoute = route().current();

  // Helper to determine styling based on current active route
  const getNavLinkStyle = (routeName) => ({
    backgroundColor: currentRoute === routeName ? '#D2D1EA' : 'transparent',
    color: currentRoute === routeName ? '#6C7383' : '#F5F7FF',
    border: currentRoute === routeName ? '1px solid black' : '1px solid transparent'
  });

  return (
    <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#F5F4FF', fontFamily: "'Poppins', sans-serif" }}>
      
      {/* Sidebar */}
      <aside 
        className="d-flex flex-column flex-shrink-0 shadow-lg" 
        style={{ width: '250px', backgroundColor: '#7978E9', position: 'fixed', top: 0, bottom: 0, zIndex: 100 }}
      >
        <div className="px-3 pt-5 pb-0 text-center">
          <span className="fw-bold text-white" style={{ fontSize: '1rem', letterSpacing: '1px' }}>
            TUNGAL'S FLOWER SHOP
          </span>
        </div>

        <nav className="d-flex flex-column gap-3 px-3 mt-5">
          {/* Active Routes */}
          <Link 
            href={route('customer.product')}
            className="d-flex align-items-center gap-2 px-3 py-2 rounded text-decoration-none transition-all"
            style={getNavLinkStyle('customer.product')}
          >
            <ShoppingBagIcon />
            <span className="fw-semibold">Products</span>
          </Link>
          <Link 
            href={route('customer.orders')}
            className="d-flex align-items-center gap-2 px-3 py-2 rounded text-decoration-none transition-all"
            style={getNavLinkStyle('customer.orders')}
          >
            <OrdersIcon />
            <span className="fw-semibold">Orders</span>
          </Link>

          {/* Placeholders from Figma */}
          <Link href="#" className="d-flex align-items-center gap-2 px-3 py-2 rounded text-decoration-none transition-all" style={getNavLinkStyle('dummy.inventory')}>
            <WarehouseIcon /> <span className="fw-semibold">Inventory</span>
          </Link>
          <Link href="#" className="d-flex align-items-center gap-2 px-3 py-2 rounded text-decoration-none transition-all" style={getNavLinkStyle('dummy.report')}>
            <ReportIcon /> <span className="fw-semibold">Report</span>
          </Link>
          <Link href="#" className="d-flex align-items-center gap-2 px-3 py-2 rounded text-decoration-none transition-all" style={getNavLinkStyle('dummy.delivery')}>
            <DeliveryIcon /> <span className="fw-semibold">Delivery</span>
          </Link>
          <Link href="#" className="d-flex align-items-center gap-2 px-3 py-2 rounded text-decoration-none transition-all" style={getNavLinkStyle('dummy.customer')}>
            <CustomerIcon /> <span className="fw-semibold">Customer</span>
          </Link>
        </nav>

        {/* Clickable Profile Routing to customer.profile */}
        <Link 
            href={route('customer.profile')} 
            className="mt-auto mb-4 d-flex flex-column align-items-center text-decoration-none"
        >
          <img
            src={auth?.user?.profile ? `/storage/${auth.user.profile}` : '/assets/images/profile.png'}
            alt="User avatar"
            className="rounded-circle object-fit-cover mb-2"
            style={{ width: '122px', height: '122px', border: '3px solid white', transition: 'opacity 0.2s' }}
            onMouseOver={(e) => e.target.style.opacity = '0.8'}
            onMouseOut={(e) => e.target.style.opacity = '1'}
          />
          <span className="fw-bold text-white text-center">
            {auth?.user ? `${auth.user.firstname} ${auth.user.lastname}` : 'Cashier'}
          </span>
        </Link>

        {/* Logout */}
        <div className="d-flex justify-content-center mb-4">
          <Link 
            href={route('employee.logout')} 
            method="post" 
            as="button" 
            className="btn d-flex align-items-center justify-content-center gap-2 fw-bold text-white"
            style={{ width: '140px', backgroundColor: '#D84B51', border: '1px solid black', borderRadius: '10px' }}
          >
            <LogoutIcon /> Log Out
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow-1" style={{ marginLeft: '250px' }}>
        {children}
      </main>
    </div>
  );
}
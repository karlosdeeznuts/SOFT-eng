import React, { useState, useEffect } from 'react';
import AdminLayout from '../../Layout/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { toast } from 'sonner';
import AddProduct from './Inventory_Features/AddProduct'; 
// UpdateProduct import is paused for now

const SearchIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6c757d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>);
const PlusIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>);
const ArrowLeft = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>);
const ArrowRight = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 19"></polyline></svg>);
const UpdateIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>);
const DeleteIcon = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>);
const CheckCircle = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="#7859FF" stroke="#7859FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" fill="none"></path><polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" fill="none"></polyline></svg>);

function Inventory({ products }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 5;

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedFlower, setSelectedFlower] = useState(null);

    const productList = products?.data ? products.data : products || [];

    const filteredProducts = productList.filter((prod) => {
        const term = searchQuery.toLowerCase();
        return (
            (prod.product_name && prod.product_name.toLowerCase().includes(term)) ||
            (prod.description && prod.description.toLowerCase().includes(term)) ||
            (prod.type && prod.type.toLowerCase().includes(term))
        );
    });

    useEffect(() => { setCurrentPage(1); }, [searchQuery]);

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const displayedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handleStockIn = () => {
        const qty = window.prompt(`How many stocks to ADD for ${selectedFlower.product_name}?`);
        if (qty) {
            const parsedQty = parseInt(qty);
            if (!isNaN(parsedQty) && parsedQty > 0) {
                router.post(route('inventory.stockIn'), { id: selectedFlower.id, quantity: parsedQty }, { preserveScroll: true });
            } else {
                toast.error("Please enter a valid number greater than 0.");
            }
        }
    };

    const handleStockOut = () => {
        const qty = window.prompt(`How many stocks to REMOVE from ${selectedFlower.product_name}?`);
        if (qty) {
            const parsedQty = parseInt(qty);
            if (!isNaN(parsedQty) && parsedQty > 0) {
                if(selectedFlower.stocks < parsedQty){
                    toast.error("You cannot remove more stock than what is available.");
                    return;
                }
                router.post(route('inventory.stockOut'), { id: selectedFlower.id, quantity: parsedQty }, { preserveScroll: true });
            } else {
                toast.error("Please enter a valid number greater than 0.");
            }
        }
    };

    return (
        <div className="container-fluid py-5 px-5" style={{ minHeight: '100vh', backgroundColor: '#F4F5FA', fontFamily: "'Poppins', sans-serif" }}>
            <Head title="Inventory" />

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bolder m-0" style={{ color: '#1E1E1E', fontSize: '32px' }}>Inventory</h2>

                <div className="d-flex gap-4 align-items-center">
                    <div className="d-flex justify-content-center align-items-center rounded-pill px-4" style={{ backgroundColor: '#EBEAEE', width: '320px', height: '48px' }}>
                        <SearchIcon />
                        <input
                            type="text"
                            className="form-control border-0 bg-transparent shadow-none ms-2"
                            placeholder="Search flower..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ fontSize: '14px', color: '#1E1E1E' }}
                        />
                    </div>
                    <button onClick={() => setIsAddModalOpen(true)} className="btn d-flex align-items-center gap-2 fw-semibold text-white px-4 rounded-4 shadow-sm border-0" style={{ backgroundColor: '#7859FF', height: '48px', fontSize: '15px' }}>
                        <PlusIcon /> Add Flower
                    </button>
                </div>
            </div>

            <div className="card shadow-sm border-0 w-100 overflow-hidden mb-4" style={{ borderRadius: '16px', backgroundColor: '#FFF' }}>
                <div className="table-responsive">
                    <table className="table table-borderless align-middle mb-0" style={{ minWidth: '1000px' }}>
                        <thead style={{ backgroundColor: '#F8F9FA', borderBottom: '2px solid #EBEAEE' }}>
                            <tr>
                                <th className="py-3 px-4 text-muted fw-semibold" style={{ fontSize: '13px', width: '10%' }}>ID</th>
                                <th className="py-3 px-4 text-muted fw-semibold" style={{ fontSize: '13px', width: '28%' }}>Flower Details</th>
                                <th className="py-3 px-4 text-muted fw-semibold" style={{ fontSize: '13px', width: '12%' }}>Type</th>
                                <th className="py-3 px-4 text-muted fw-semibold" style={{ fontSize: '13px', width: '10%' }}>Quantity</th>
                                <th className="py-3 px-4 text-muted fw-semibold" style={{ fontSize: '13px', width: '10%' }}>Price</th>
                                {/* NEW DATE COLUMN */}
                                <th className="py-3 px-4 text-muted fw-semibold" style={{ fontSize: '13px', width: '15%' }}>Last Updated</th>
                                <th className="py-3 px-4 text-muted fw-semibold text-center" style={{ fontSize: '13px', width: '15%' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedProducts.length > 0 ? (
                                displayedProducts.map((product) => {
                                    const isSelected = selectedFlower?.id === product.id;

                                    return (
                                        <tr 
                                            key={product.id} 
                                            onClick={() => setSelectedFlower(product)}
                                            style={{ 
                                                cursor: 'pointer',
                                                backgroundColor: isSelected ? '#F4F1FF' : 'transparent',
                                                transition: 'all 0.2s ease',
                                                boxShadow: isSelected ? 'inset 4px 0 0 0 #7859FF' : 'none' 
                                            }} 
                                            className="border-bottom position-relative"
                                        >
                                            <td className="py-3 px-4">
                                                <div className="d-flex align-items-center gap-2">
                                                    <div style={{ width: '18px' }}>
                                                        {isSelected ? <CheckCircle /> : null}
                                                    </div>
                                                    <span className="fw-bold" style={{ fontSize: '14px', color: isSelected ? '#7859FF' : '#1E1E1E' }}>
                                                        {String(product.id).padStart(2, '0')}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="rounded-3 overflow-hidden flex-shrink-0 shadow-sm" style={{ width: '48px', height: '48px', backgroundColor: '#F4F5FA', border: isSelected ? '2px solid #7859FF' : 'none' }}>
                                                        <img src={product.image ? `/storage/${product.image}` : '/assets/images/product.png'} alt={product.product_name} className="w-100 h-100 object-fit-cover" />
                                                    </div>
                                                    <div>
                                                        <h6 className="fw-bold mb-0 text-dark" style={{ fontSize: '14px' }}>{product.product_name}</h6>
                                                        <p className="text-muted mb-0 text-truncate" style={{ fontSize: '12px', maxWidth: '200px' }}>{product.description || 'No description provided'}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4 text-dark fw-medium" style={{ fontSize: '14px' }}>{product.type || '-'}</td>
                                            <td className="py-3 px-4">
                                                <span className="fw-bold" style={{ fontSize: '14px', color: product.stocks > 0 ? '#1E1E1E' : '#DC3545' }}>{product.stocks || 0}</span>
                                            </td>
                                            <td className="py-3 px-4 text-dark fw-bold" style={{ fontSize: '14px' }}>₱ {product.price}.00</td>
                                            
                                            {/* NEW RENDERED DATE */}
                                            <td className="py-3 px-4 text-muted fw-medium" style={{ fontSize: '13px' }}>
                                                {product.updated_at ? product.updated_at : 'Just Now'}
                                            </td>

                                            <td className="py-3 px-4">
                                                <div className="d-flex justify-content-center gap-2">
                                                    <button 
                                                        className="btn btn-sm d-inline-flex align-items-center gap-1 fw-semibold shadow-none border-0" 
                                                        onClick={(e) => { e.stopPropagation(); toast.info("Update logic is currently paused!"); }} 
                                                        style={{ backgroundColor: '#EBF0FF', color: '#7859FF', borderRadius: '6px', fontSize: '12px', padding: '6px 10px' }}
                                                    >
                                                        <UpdateIcon /> Update
                                                    </button>
                                                    <button className="btn btn-sm d-inline-flex align-items-center gap-1 fw-semibold shadow-none border-0" onClick={(e) => e.stopPropagation()} style={{ backgroundColor: '#FFEBEE', color: '#DC3545', borderRadius: '6px', fontSize: '12px', padding: '6px 10px' }}>
                                                        <DeleteIcon /> Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr><td colSpan="7" className="text-center py-5 text-muted">No flowers found in inventory.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {totalPages > 0 && (
                    <div className="d-flex justify-content-end align-items-center gap-3 py-3 pe-4 border-top" style={{ backgroundColor: '#F8F9FA' }}>
                        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="btn shadow-none p-0 m-0 d-flex align-items-center gap-1 fw-medium" style={{ fontSize: '14px', color: currentPage === 1 ? '#A0A0A0' : '#5A637A', background: 'none', border: 'none' }}>
                            <ArrowLeft /> Previous
                        </button>
                        <div className="d-flex gap-1">
                            {[...Array(totalPages)].map((_, i) => {
                                const pageNum = i + 1;
                                const isActive = pageNum === currentPage;
                                return (
                                    <button key={pageNum} onClick={() => setCurrentPage(pageNum)} className="btn d-flex justify-content-center align-items-center rounded-2 fw-bold border-0 shadow-none p-0" style={{ width: '28px', height: '28px', backgroundColor: isActive ? '#7859FF' : 'transparent', color: isActive ? 'white' : '#7E869E', fontSize: '13px' }}>
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>
                        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="btn shadow-none p-0 m-0 d-flex align-items-center gap-1 fw-medium" style={{ fontSize: '14px', color: currentPage === totalPages ? '#A0A0A0' : '#5A637A', background: 'none', border: 'none' }}>
                            Next <ArrowRight />
                        </button>
                    </div>
                )}
            </div>

            <div className="d-flex flex-column align-items-end gap-2 mt-3">
                <div className="d-flex gap-3">
                    <button 
                        onClick={handleStockIn}
                        disabled={!selectedFlower}
                        className="btn fw-bold text-white shadow-sm border-0 transition-all d-flex justify-content-center align-items-center" 
                        style={{ backgroundColor: selectedFlower ? '#28A745' : '#A5D8B3', cursor: selectedFlower ? 'pointer' : 'not-allowed', borderRadius: '8px', height: '44px', width: '150px', fontSize: '15px' }}
                    >
                        + Stock In
                    </button>
                    <button 
                        onClick={handleStockOut}
                        disabled={!selectedFlower}
                        className="btn fw-bold text-white shadow-sm border-0 transition-all d-flex justify-content-center align-items-center" 
                        style={{ backgroundColor: selectedFlower ? '#DC3545' : '#EAA9AF', cursor: selectedFlower ? 'pointer' : 'not-allowed', borderRadius: '8px', height: '44px', width: '150px', fontSize: '15px' }}
                    >
                        - Stock Out
                    </button>
                </div>
                {!selectedFlower ? (
                    <small className="text-danger fw-bold mt-1" style={{fontSize: '12px'}}>* Click a row to unlock stock buttons</small>
                ) : (
                    <small className="text-success fw-bold mt-1" style={{fontSize: '12px'}}>✓ Ready to update: {selectedFlower.product_name}</small>
                )}
            </div>

            <AddProduct isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
        </div>
    );
}

Inventory.layout = page => <AdminLayout children={page} />;
export default Inventory;
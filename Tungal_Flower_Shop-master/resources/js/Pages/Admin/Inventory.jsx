import React, { useState } from 'react';
import AdminLayout from '@/Layout/AdminLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Inventory({ auth, products }) {
    // Modal State
    const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Form for Adding a New Batch
    const { data, setData, post, processing, errors, reset } = useForm({
        product_id: '',
        quantity: '',
        expires_at: '',
    });

    // Form for Stocking Out a Batch Manually
    const { delete: destroy } = useForm();

    const openBatchModal = (product) => {
        setSelectedProduct(product);
        setData('product_id', product.id);
        setIsBatchModalOpen(true);
    };

    const closeBatchModal = () => {
        setIsBatchModalOpen(false);
        setSelectedProduct(null);
        reset();
    };

    const handleAddBatch = (e) => {
        e.preventDefault();
        // We will create this endpoint in the next step
        post(route('admin.batches.store'), {
            onSuccess: () => {
                reset('quantity', 'expires_at');
                // Optional: You could fetch the updated product data here 
                // if you want the modal to update instantly without a full page reload,
                // but Inertia usually handles this automatically if the controller redirects back.
            },
        });
    };

    const handleStockOutBatch = (batchId) => {
        if (confirm('Are you sure you want to manually stock out this batch? This will deduct the quantity from inventory.')) {
            // We will create this endpoint in the next step
            destroy(route('admin.batches.destroy', batchId), {
                preserveScroll: true,
            });
        }
    };

    // Calculate total active stock for display in the main table
    const calculateTotalActiveStock = (product) => {
        if (!product.batches) return 0;
        return product.batches
            .filter(batch => batch.status === 'active')
            .reduce((sum, batch) => sum + parseInt(batch.quantity), 0);
    };

    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Inventory Management</h2>}
        >
            <Head title="Inventory" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* Header Actions */}
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-medium text-gray-900">Current Inventory</h3>
                        <a 
                            href={route('admin.inventory.add')}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            + Add New Product
                        </a>
                    </div>

                    {/* Main Inventory Table */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Stock</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (Sell)</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {products.data.map((product) => {
                                        const activeStock = calculateTotalActiveStock(product);
                                        return (
                                            <tr key={product.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {product.image ? (
                                                        <img src={`/storage/${product.image}`} alt={product.name} className="h-10 w-10 object-cover rounded-md" />
                                                    ) : (
                                                        <div className="h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-xs">No Img</div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.type?.name || 'N/A'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                        activeStock > 10 ? 'bg-green-100 text-green-800' : 
                                                        activeStock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {activeStock}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₱{product.selling_price}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                    {/* New Batch Management Button */}
                                                    <button 
                                                        onClick={() => openBatchModal(product)}
                                                        className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-3 py-1 rounded-md"
                                                    >
                                                        Manage Batches
                                                    </button>
                                                    <a href={route('admin.inventory.update', product.id)} className="text-blue-600 hover:text-blue-900 bg-blue-50 px-3 py-1 rounded-md">Edit</a>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Batch Management Modal */}
            {isBatchModalOpen && selectedProduct && (
                <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        
                        {/* Background Overlay */}
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={closeBatchModal}></div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-title">
                                            Manage Stock Batches: <span className="text-indigo-600">{selectedProduct.name}</span>
                                        </h3>
                                        
                                        {/* Add New Batch Form */}
                                        <div className="bg-gray-50 p-4 rounded-md mb-6 border border-gray-200">
                                            <h4 className="text-sm font-semibold text-gray-700 mb-3">Add New Stock (Stock-In)</h4>
                                            <form onSubmit={handleAddBatch} className="flex gap-4 items-end">
                                                <div className="flex-1">
                                                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                                                    <input 
                                                        type="number" 
                                                        min="1"
                                                        value={data.quantity}
                                                        onChange={e => setData('quantity', e.target.value)}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        required
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <label className="block text-sm font-medium text-gray-700">Expiry Date (Auto Stock-Out)</label>
                                                    <input 
                                                        type="datetime-local" 
                                                        value={data.expires_at}
                                                        onChange={e => setData('expires_at', e.target.value)}
                                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <button 
                                                        type="submit" 
                                                        disabled={processing}
                                                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium h-[38px]"
                                                    >
                                                        {processing ? 'Adding...' : 'Stock In'}
                                                    </button>
                                                </div>
                                            </form>
                                            {errors.quantity && <span className="text-red-500 text-xs mt-1 block">{errors.quantity}</span>}
                                            {errors.expires_at && <span className="text-red-500 text-xs mt-1 block">{errors.expires_at}</span>}
                                        </div>

                                        {/* Batch History Table */}
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-700 mb-2">Batch History</h4>
                                            <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-md">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                    <thead className="bg-gray-100 sticky top-0">
                                                        <tr>
                                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Received</th>
                                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Expires At</th>
                                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Staff</th>
                                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                        {selectedProduct.batches && selectedProduct.batches.length > 0 ? (
                                                            selectedProduct.batches.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((batch) => (
                                                                <tr key={batch.id} className={batch.status !== 'active' ? 'bg-gray-50 opacity-75' : ''}>
                                                                    <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-900">
                                                                        {new Date(batch.received_at).toLocaleDateString()}
                                                                    </td>
                                                                    <td className="px-4 py-2 whitespace-nowrap text-xs font-medium">
                                                                        {batch.quantity}
                                                                    </td>
                                                                    <td className="px-4 py-2 whitespace-nowrap text-xs text-red-600">
                                                                        {batch.expires_at ? new Date(batch.expires_at).toLocaleDateString() : 'N/A'}
                                                                    </td>
                                                                    <td className="px-4 py-2 whitespace-nowrap text-xs text-gray-500">
                                                                        {batch.employee ? batch.employee.name : 'System'}
                                                                    </td>
                                                                    <td className="px-4 py-2 whitespace-nowrap text-xs">
                                                                        <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold ${
                                                                            batch.status === 'active' ? 'bg-green-100 text-green-800' : 
                                                                            batch.status === 'expired' ? 'bg-red-100 text-red-800' : 
                                                                            'bg-gray-200 text-gray-800'
                                                                        }`}>
                                                                            {batch.status}
                                                                        </span>
                                                                    </td>
                                                                    <td className="px-4 py-2 whitespace-nowrap text-xs">
                                                                        {batch.status === 'active' && (
                                                                            <button 
                                                                                onClick={() => handleStockOutBatch(batch.id)}
                                                                                className="text-red-600 hover:text-red-900 bg-red-50 px-2 py-1 rounded border border-red-200 transition-colors"
                                                                            >
                                                                                Stock Out
                                                                            </button>
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        ) : (
                                                            <tr>
                                                                <td colSpan="6" className="px-4 py-4 text-center text-sm text-gray-500">
                                                                    No batches found for this product.
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-200">
                                <button 
                                    type="button" 
                                    onClick={closeBatchModal}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </AdminLayout>
    );
}
import { X, Package, Plus, DollarSign, Hash, User, Calculator } from "lucide-react";

export default function AddStockModal({
    show,
    onClose,
    onSubmit,
    formData,
    setFormData,
    errors,
    products,
    suppliers
}) {
    if (!show) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Calculate total amount when quantity or price changes
        if (name === 'stockIn' || name === 'perStockInPrice') {
            const quantity = name === 'stockIn' ? value : formData.stockIn;
            const price = name === 'perStockInPrice' ? value : formData.perStockInPrice;

            if (quantity && price) {
                setFormData(prev => ({
                    ...prev,
                    stockInAmount: (parseInt(quantity) * parseFloat(price)).toFixed(2)
                }));
            }
        }
    };



    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in duration-200"></div>

            {/* Modal container */}
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-gray-100 overflow-hidden">

                    {/* Header with gradient */}
                    <div className="relative px-6 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                    <Package className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">Add Stock</h3>
                                    <p className="text-blue-100 text-sm">Record new stock inventory</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Form Body */}
                    <div className="px-6 py-6 space-y-6 max-h-96 overflow-y-auto">

                        {/* Product Selection */}
                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                <Package className="h-4 w-4 mr-2 text-blue-500" />
                                Product *
                            </label>
                            <div className="relative">
                                <select
                                    name="productId"
                                    value={formData.productId}
                                    onChange={handleChange}
                                    className={`w-full border-2 ${errors.productId
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                                        } rounded-xl px-4 py-3 transition-all duration-200 focus:ring-4 focus:ring-opacity-20 focus:outline-none bg-white appearance-none cursor-pointer`}
                                >
                                    <option value="">Select a product</option>
                                    {products.map(product => (
                                        <option key={product.id} value={product.id}>
                                            {product.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            {errors.productId && (
                                <p className="mt-2 text-sm text-red-600 flex items-center animate-in slide-in-from-left-1">
                                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                                    {errors.productId}
                                </p>
                            )}
                        </div>

                        {/* Supplier Selection */}
                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                <User className="h-4 w-4 mr-2 text-blue-500" />
                                Supplier *
                            </label>
                            <div className="relative">
                                <select
                                    name="supplierId"
                                    value={formData.supplierId}
                                    onChange={handleChange}
                                    className={`w-full border-2 ${errors.supplierId
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                                        } rounded-xl px-4 py-3 transition-all duration-200 focus:ring-4 focus:ring-opacity-20 focus:outline-none bg-white appearance-none cursor-pointer`}
                                >
                                    <option value="">Select a supplier</option>
                                    {suppliers.map(supplier => (
                                        <option key={supplier.id} value={supplier.id}>
                                            {supplier.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            {errors.supplierId && (
                                <p className="mt-2 text-sm text-red-600 flex items-center animate-in slide-in-from-left-1">
                                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                                    {errors.supplierId}
                                </p>
                            )}
                        </div>

                        {/* Stock Quantity */}
                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                <Hash className="h-4 w-4 mr-2 text-blue-500" />
                                Quantity *
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    name="stockIn"
                                    value={formData.stockIn}
                                    onChange={handleChange}
                                    min="1"
                                    className={`w-full border-2 ${errors.stockIn
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                                        } rounded-xl px-4 py-3 transition-all duration-200 focus:ring-4 focus:ring-opacity-20 focus:outline-none placeholder-gray-400`}
                                    placeholder="Enter quantity"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <div className={`w-2 h-2 rounded-full ${formData.stockIn ? 'bg-green-400' : 'bg-gray-300'} transition-colors duration-200`}></div>
                                </div>
                            </div>
                            {errors.stockIn && (
                                <p className="mt-2 text-sm text-red-600 flex items-center animate-in slide-in-from-left-1">
                                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                                    {errors.stockIn}
                                </p>
                            )}
                        </div>

                        {/* Price Per Unit */}
                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                <DollarSign className="h-4 w-4 mr-2 text-blue-500" />
                                Price Per Unit *
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    name="perStockInPrice"
                                    value={formData.perStockInPrice}
                                    onChange={handleChange}
                                    min="0.01"
                                    step="0.01"
                                    className={`w-full border-2 ${errors.perStockInPrice
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                                        } rounded-xl px-4 py-3 transition-all duration-200 focus:ring-4 focus:ring-opacity-20 focus:outline-none placeholder-gray-400`}
                                    placeholder="Enter price per unit"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <div className={`w-2 h-2 rounded-full ${formData.perStockInPrice ? 'bg-green-400' : 'bg-gray-300'} transition-colors duration-200`}></div>
                                </div>
                            </div>
                            {errors.perStockInPrice && (
                                <p className="mt-2 text-sm text-red-600 flex items-center animate-in slide-in-from-left-1">
                                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                                    {errors.perStockInPrice}
                                </p>
                            )}
                        </div>

                        {/* Total Amount (calculated) */}
                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                <Calculator className="h-4 w-4 mr-2 text-blue-500" />
                                Total Amount *
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="stockInAmount"
                                    value={formData.stockInAmount}
                                    readOnly
                                    className={`w-full border-2 ${errors.stockInAmount
                                        ? 'border-red-300 bg-red-50'
                                        : 'border-gray-200 bg-gray-50'
                                        } rounded-xl px-4 py-3 transition-all duration-200`}
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <DollarSign className="h-4 w-4 text-gray-400" />
                                </div>
                            </div>
                            {errors.stockInAmount && (
                                <p className="mt-2 text-sm text-red-600 flex items-center animate-in slide-in-from-left-1">
                                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                                    {errors.stockInAmount}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                        <button
                            onClick={onClose}
                            className="px-6 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:ring-opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onSubmit}
                            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-sm font-semibold text-white hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:ring-opacity-50 shadow-lg"
                        >
                            Add Stock
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
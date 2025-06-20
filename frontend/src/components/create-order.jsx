// import { X, User, MapPin, Phone, Package, Plus, Minus, Hash, DollarSign, Barcode, Database, ShoppingCart, Eye, Check, ChevronDown } from "lucide-react";
// import { useState, useEffect } from "react";

// // Stock Selection Modal Component
// function StockSelectionModal({
//     show,
//     onClose,
//     onConfirmSelection,
//     productStocks,
//     productName,
//     suppliers
// }) {
//     const [selectedStocks, setSelectedStocks] = useState([]);
//     const [quantities, setQuantities] = useState({});

//     const handleStockToggle = (stockId) => {
//         setSelectedStocks(prev =>
//             prev.includes(stockId)
//                 ? prev.filter(id => id !== stockId)
//                 : [...prev, stockId]
//         );
//     };

//     const handleQuantityChange = (stockId, value) => {
//         const numValue = Math.max(1, parseInt(value) || 1;
//         const stockItem = productStocks.find(s => s.id === stockId);
//         const clampedValue = Math.min(numValue, stockItem.stock);

//         setQuantities(prev => ({
//             ...prev,
//             [stockId]: clampedValue
//         }));
//     };

//     const calculateTotalSelected = () => {
//         return selectedStocks.reduce((total, stockId) => {
//             return total + (quantities[stockId] || 1);
//         }, 0);
//     };

//     const calculateTotalValue = () => {
//         return selectedStocks.reduce((total, stockId) => {
//             const stockItem = productStocks.find(s => s.id === stockId);
//             return total + ((quantities[stockId] || 1) * stockItem.price);
//         }, 0).toFixed(2);
//     };

//     const handleConfirm = () => {
//         const selectedItems = selectedStocks.map(stockId => {
//             const stockItem = productStocks.find(s => s.id === stockId);
//             return {
//                 ...stockItem,
//                 quantity: quantities[stockId] || 1
//             };
//         });
//         onConfirmSelection(selectedItems);
//     };

//     if (!show) return null;

//     return (
//         <>
//             <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60 animate-in fade-in duration-200"></div>
//             <div className="fixed inset-0 flex items-center justify-center z-70 p-4 animate-in fade-in zoom-in-95 duration-300">
//                 <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl border border-gray-100 overflow-hidden">

//                     {/* Stock Modal Header */}
//                     <div className="relative px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
//                         <div className="absolute inset-0 bg-black/10"></div>
//                         <div className="relative flex justify-between items-center">
//                             <div className="flex items-center space-x-3">
//                                 <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
//                                     <Database className="h-5 w-5" />
//                                 </div>
//                                 <div>
//                                     <h3 className="text-lg font-bold">Select Stock Batches</h3>
//                                     <p className="text-green-100 text-sm">Available stock for: {productName}</p>
//                                 </div>
//                             </div>
//                             <button
//                                 onClick={onClose}
//                                 className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
//                             >
//                                 <X className="h-5 w-5" />
//                             </button>
//                         </div>
//                     </div>

//                     {/* Stock List */}
//                     <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
//                         {productStocks.length === 0 ? (
//                             <div className="text-center py-8">
//                                 <Database className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//                                 <p className="text-gray-500">No stock available for this product</p>
//                             </div>
//                         ) : (
//                             <div className="space-y-3">
//                                 {productStocks.map((stock) => (
//                                     <div
//                                         key={stock.id}
//                                         className={`border rounded-xl p-4 transition-all duration-200 ${selectedStocks.includes(stock.id)
//                                             ? 'border-green-400 bg-green-50'
//                                             : 'border-gray-200 hover:border-green-300 hover:shadow-md'
//                                             }`}
//                                     >
//                                         <div className="flex items-start justify-between">
//                                             <div className="flex items-start space-x-4">
//                                                 <div className="mt-1">
//                                                     <input
//                                                         type="checkbox"
//                                                         checked={selectedStocks.includes(stock.id)}
//                                                         onChange={() => handleStockToggle(stock.id)}
//                                                         className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
//                                                     />
//                                                 </div>
//                                                 <div className="space-y-2">
//                                                     <div className="flex items-center space-x-2">
//                                                         <Barcode className="h-4 w-4 text-gray-400" />
//                                                         <span className="text-sm font-medium text-gray-700">
//                                                             Batch: {stock.batchCode}
//                                                         </span>
//                                                     </div>
//                                                     <div className="flex items-center space-x-4">
//                                                         <div className="flex items-center space-x-1">
//                                                             <Database className="h-4 w-4 text-blue-500" />
//                                                             <span className="text-sm text-gray-600">
//                                                                 Available: <span className="font-medium">{stock.stock} units</span>
//                                                             </span>
//                                                         </div>
//                                                         <div className="flex items-center space-x-1">
//                                                             <DollarSign className="h-4 w-4 text-green-500" />
//                                                             <span className="text-sm text-gray-600">
//                                                                 Price: <span className="font-medium">Rs. {stock.price}</span>
//                                                             </span>
//                                                         </div>
//                                                         <div className="flex items-center space-x-1">
//                                                             <User className="h-4 w-4 text-purple-500" />
//                                                             <span className="text-sm text-gray-600">
//                                                                 {suppliers.find(s => s.id === stock.supplierId)?.name || 'Unknown'}
//                                                             </span>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             {selectedStocks.includes(stock.id) && (
//                                                 <div className="flex items-center space-x-2">
//                                                     <input
//                                                         type="number"
//                                                         min="1"
//                                                         max={stock.stock}
//                                                         value={quantities[stock.id] || 1}
//                                                         onChange={(e) => handleQuantityChange(stock.id, e.target.value)}
//                                                         className="w-20 border border-gray-300 rounded px-2 py-1 text-sm text-center"
//                                                     />
//                                                     <span className="text-sm text-gray-500">units</span>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                     </div>

//                     {/* Selection Summary */}
//                     {selectedStocks.length > 0 && (
//                         <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
//                             <div className="flex justify-between items-center">
//                                 <div className="space-y-1">
//                                     <p className="text-sm font-medium text-gray-700">
//                                         Selected: {selectedStocks.length} batch(es)
//                                     </p>
//                                     <p className="text-sm text-gray-500">
//                                         Total quantity: {calculateTotalSelected()} units
//                                     </p>
//                                     <p className="text-sm text-gray-500">
//                                         Total value: Rs. {calculateTotalValue()}
//                                     </p>
//                                 </div>
//                                 <button
//                                     onClick={handleConfirm}
//                                     className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
//                                 >
//                                     Confirm Selection
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// }

// export default function AddOrderModal({
//     show,
//     onClose,
//     onSubmit,
//     formData,
//     setFormData,
//     errors,
//     products,
//     suppliers
// }) {
//     if (!show) return null;

//     // Sample stock data
//     const productStockData = [
//         { id: 1, productId: 1, supplierId: 1, price: 80.00, batchCode: "MILK-2023-06-01", stock: 50 },
//         { id: 2, productId: 1, supplierId: 1, price: 82.00, batchCode: "MILK-2023-06-15", stock: 100 },
//         { id: 3, productId: 2, supplierId: 2, price: 120.00, batchCode: "EGG-2023-06-10", stock: 80 },
//         { id: 4, productId: 3, supplierId: 3, price: 25.00, batchCode: "BREAD-2023-06-20", stock: 200 },
//         { id: 5, productId: 1, supplierId: 2, price: 85.00, batchCode: "MILK-2023-06-20", stock: 75 }
//     ];

//     // State for modals
//     const [showStockModal, setShowStockModal] = useState(false);
//     const [selectedProduct, setSelectedProduct] = useState(null);
//     const [isProductSelectOpen, setIsProductSelectOpen] = useState(false);

//     // Initialize formData with empty order array if not provided
//     const [localFormData, setLocalFormData] = useState({
//         name: '',
//         contactNumber: '',
//         address: '',
//         order: [],
//         ...formData
//     });

//     useEffect(() => {
//         setLocalFormData(prev => ({ ...prev, ...formData }));
//     }, [formData]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         const newFormData = {
//             ...localFormData,
//             [name]: value
//         };
//         setLocalFormData(newFormData);
//         setFormData(newFormData);
//     };

//     const handleProductSelect = (product) => {
//         setSelectedProduct(product);
//         setIsProductSelectOpen(false);
//         setShowStockModal(true);
//     };

//     const handleStockSelection = (selectedItems) => {
//         if (selectedItems.length === 0) return;

//         // Calculate totals
//         const totalQty = selectedItems.reduce((sum, item) => sum + item.quantity, 0);
//         const totalValue = selectedItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
//         const avgPrice = totalValue / totalQty;

//         // Create a single order item combining all selected batches
//         const newOrderItem = {
//             id: Date.now(),
//             productId: selectedProduct.id,
//             productName: selectedProduct.name,
//             orderQty: totalQty,
//             perOrderQty: avgPrice.toFixed(2),
//             supplierId: selectedItems[0].supplierId,
//             supplierName: suppliers.find(s => s.id === selectedItems[0].supplierId)?.name || '',
//             batchCodes: selectedItems.map(item => item.batchCode).join(', '),
//             selectedBatches: selectedItems,
//             status: true
//         };

//         const newOrder = [...localFormData.order, newOrderItem];
//         const newFormData = {
//             ...localFormData,
//             order: newOrder
//         };

//         setLocalFormData(newFormData);
//         setFormData(newFormData);
//         setShowStockModal(false);
//         setSelectedProduct(null);
//     };

//     const handleQuantityChange = (itemId, newQty) => {
//         const updatedOrder = localFormData.order.map(item => {
//             if (item.id === itemId) {
//                 const quantity = Math.min(parseInt(newQty) || 1);
//                 return {
//                     ...item,
//                     orderQty: quantity,
//                     selectedBatches: item.selectedBatches?.map(batch => ({
//                         ...batch,
//                         quantity: quantity
//                     }))
//                 };
//             }
//             return item;
//         });

//         const newFormData = {
//             ...localFormData,
//             order: updatedOrder
//         };

//         setLocalFormData(newFormData);
//         setFormData(newFormData);
//     };

//     const removeOrderItem = (itemId) => {
//         const updatedOrder = localFormData.order.filter(item => item.id !== itemId);
//         const newFormData = {
//             ...localFormData,
//             order: updatedOrder
//         };

//         setLocalFormData(newFormData);
//         setFormData(newFormData);
//     };

//     // Calculate totals
//     const calculateItemTotal = (qty, price) => {
//         return (parseInt(qty || 0) * parseFloat(price || 0)).toFixed(2);
//     };

//     const calculateOrderTotal = () => {
//         return localFormData.order.reduce((total, item) => {
//             return total + (parseInt(item.orderQty || 0) * parseFloat(item.perOrderQty || 0));
//         }, 0).toFixed(2);
//     };

//     return (
//         <>
//             <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in duration-200"></div>

//             <div className="fixed inset-0 flex items-center justify-center z-50 p-4 animate-in fade-in zoom-in-95 duration-300">
//                 <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl border border-gray-100 overflow-hidden">

//                     {/* Header */}
//                     <div className="relative px-6 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
//                         <div className="absolute inset-0 bg-black/10"></div>
//                         <div className="relative flex justify-between items-center">
//                             <div className="flex items-center space-x-3">
//                                 <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
//                                     <ShoppingCart className="h-5 w-5" />
//                                 </div>
//                                 <div>
//                                     <h3 className="text-xl font-bold">Create New Order</h3>
//                                     <p className="text-blue-100 text-sm">Add customer order details</p>
//                                 </div>
//                             </div>
//                             <button
//                                 onClick={onClose}
//                                 className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
//                             >
//                                 <X className="h-5 w-5" />
//                             </button>
//                         </div>
//                     </div>

//                     {/* Form Body */}
//                     <div className="px-6 py-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">

//                         {/* Customer Information */}
//                         <div className="bg-gray-50 rounded-xl p-6">
//                             <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 {/* Customer Name */}
//                                 <div className="group">
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
//                                         <User className="h-4 w-4 mr-2 text-blue-500" />
//                                         Customer Name *
//                                     </label>
//                                     <input
//                                         type="text"
//                                         name="name"
//                                         value={localFormData.name}
//                                         onChange={handleChange}
//                                         className={`w-full border-2 ${errors?.name
//                                             ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
//                                             : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
//                                             } rounded-xl px-4 py-3 transition-all duration-200 focus:ring-4 focus:ring-opacity-20 focus:outline-none placeholder-gray-400`}
//                                         placeholder="Enter customer name"
//                                     />
//                                     {errors?.name && (
//                                         <p className="mt-2 text-sm text-red-600 flex items-center animate-in slide-in-from-left-1">
//                                             <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
//                                             {errors.name}
//                                         </p>
//                                     )}
//                                 </div>

//                                 {/* Contact Number */}
//                                 <div className="group">
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
//                                         <Phone className="h-4 w-4 mr-2 text-green-500" />
//                                         Contact Number *
//                                     </label>
//                                     <input
//                                         type="tel"
//                                         name="contactNumber"
//                                         value={localFormData.contactNumber}
//                                         onChange={handleChange}
//                                         className={`w-full border-2 ${errors?.contactNumber
//                                             ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
//                                             : 'border-gray-200 focus:border-green-500 focus:ring-green-200'
//                                             } rounded-xl px-4 py-3 transition-all duration-200 focus:ring-4 focus:ring-opacity-20 focus:outline-none placeholder-gray-400`}
//                                         placeholder="Enter 10-digit number"
//                                     />
//                                     {errors?.contactNumber && (
//                                         <p className="mt-2 text-sm text-red-600 flex items-center animate-in slide-in-from-left-1">
//                                             <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
//                                             {errors.contactNumber}
//                                         </p>
//                                     )}
//                                 </div>

//                                 {/* Address */}
//                                 <div className="group md:col-span-2">
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
//                                         <MapPin className="h-4 w-4 mr-2 text-red-500" />
//                                         Delivery Address *
//                                     </label>
//                                     <textarea
//                                         name="address"
//                                         value={localFormData.address}
//                                         onChange={handleChange}
//                                         rows={3}
//                                         className={`w-full border-2 ${errors?.address
//                                             ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
//                                             : 'border-gray-200 focus:border-red-500 focus:ring-red-200'
//                                             } rounded-xl px-4 py-3 transition-all duration-200 focus:ring-4 focus:ring-opacity-20 focus:outline-none placeholder-gray-400 resize-none`}
//                                         placeholder="Enter full delivery address"
//                                     />
//                                     {errors?.address && (
//                                         <p className="mt-2 text-sm text-red-600 flex items-center animate-in slide-in-from-left-1">
//                                             <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
//                                             {errors.address}
//                                         </p>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Product Selection */}
//                         <div className="bg-white rounded-xl border border-gray-200 p-6">
//                             <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Products</h3>

//                             <div className="relative">
//                                 <button
//                                     type="button"
//                                     onClick={() => setIsProductSelectOpen(!isProductSelectOpen)}
//                                     className="w-full flex justify-between items-center px-4 py-3 border-2 border-gray-200 rounded-xl text-left focus:outline-none focus:ring-4 focus:ring-blue-200 focus:ring-opacity-20"
//                                 >
//                                     <span className="text-gray-500">
//                                         {selectedProduct ? selectedProduct.name : 'Select a product'}
//                                     </span>
//                                     <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isProductSelectOpen ? 'transform rotate-180' : ''}`} />
//                                 </button>

//                                 {isProductSelectOpen && (
//                                     <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
//                                         {products.map(product => {
//                                             const hasStock = productStockData.some(stock => stock.productId === product.id);
//                                             return (
//                                                 <div
//                                                     key={product.id}
//                                                     onClick={() => hasStock && handleProductSelect(product)}
//                                                     className={`px-4 py-3 cursor-pointer ${hasStock ? 'hover:bg-blue-50' : 'bg-gray-50 text-gray-400 cursor-not-allowed'}`}
//                                                 >
//                                                     <div className="flex justify-between items-center">
//                                                         <span>{product.name}</span>
//                                                         {!hasStock && (
//                                                             <span className="text-xs">(No stock available)</span>
//                                                         )}
//                                                     </div>
//                                                 </div>
//                                             );
//                                         })}
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         {/* Order Items Table */}
//                         <div className="bg-white rounded-xl border border-gray-200">
//                             <div className="px-6 py-4 border-b border-gray-200">
//                                 <h3 className="text-lg font-semibold text-gray-900 flex items-center">
//                                     <Package className="h-5 w-5 mr-2 text-purple-500" />
//                                     Order Items ({localFormData.order.length})
//                                 </h3>
//                             </div>

//                             {localFormData.order.length === 0 ? (
//                                 <div className="text-center py-12">
//                                     <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
//                                     <p className="text-gray-500 text-lg">No items added to the order</p>
//                                     <p className="text-gray-400 text-sm">Select products above to add them to your order</p>
//                                 </div>
//                             ) : (
//                                 <div className="overflow-x-auto">
//                                     <table className="w-full">
//                                         <thead className="bg-gray-50">
//                                             <tr>
//                                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
//                                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Batch Codes</th>
//                                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
//                                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
//                                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
//                                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
//                                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody className="bg-white divide-y divide-gray-200">
//                                             {localFormData.order.map((item) => (
//                                                 <tr key={item.id} className="hover:bg-gray-50">
//                                                     <td className="px-6 py-4 whitespace-nowrap">
//                                                         <div className="font-medium text-gray-900">{item.productName}</div>
//                                                     </td>
//                                                     <td className="px-6 py-4">
//                                                         <div className="flex flex-wrap gap-1">
//                                                             {(item.batchCodes || '').split(', ').filter(Boolean).map((code, idx) => (
//                                                                 <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
//                                                                     {code}
//                                                                 </span>
//                                                             ))}
//                                                         </div>
//                                                     </td>
//                                                     <td className="px-6 py-4 whitespace-nowrap">
//                                                         <input
//                                                             type="number"
//                                                             min="1"
//                                                             value={item.orderQty}
//                                                             onChange={(e) => handleQuantityChange(item.id, e.target.value)}
//                                                             className="w-20 border border-gray-300 rounded-lg px-2 py-1 text-center focus:border-blue-500 focus:ring-1 focus:ring-blue-200 focus:outline-none"
//                                                         />
//                                                     </td>
//                                                     <td className="px-6 py-4 whitespace-nowrap">
//                                                         <span className="text-sm text-gray-900">Rs. {item.perOrderQty}</span>
//                                                     </td>
//                                                     <td className="px-6 py-4 whitespace-nowrap">
//                                                         <span className="text-sm font-medium text-gray-900">
//                                                             Rs. {calculateItemTotal(item.orderQty, item.perOrderQty)}
//                                                         </span>
//                                                     </td>
//                                                     <td className="px-6 py-4 whitespace-nowrap">
//                                                         <span className="text-sm text-gray-600">{item.supplierName}</span>
//                                                     </td>
//                                                     <td className="px-6 py-4 whitespace-nowrap">
//                                                         <button
//                                                             onClick={() => removeOrderItem(item.id)}
//                                                             className="text-red-500 hover:text-red-700 transition-colors"
//                                                         >
//                                                             <X className="h-4 w-4" />
//                                                         </button>
//                                                     </td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             )}
//                         </div>

//                         {/* Order Summary */}
//                         {localFormData.order.length > 0 && (
//                             <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
//                                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
//                                 <div className="flex justify-end">
//                                     <div className="w-full md:w-1/3 space-y-3">
//                                         <div className="flex justify-between text-gray-700">
//                                             <span className="font-medium">Subtotal:</span>
//                                             <span>Rs. {calculateOrderTotal()}</span>
//                                         </div>
//                                         <div className="flex justify-between text-gray-700">
//                                             <span className="font-medium">Tax (13%):</span>
//                                             <span>Rs. {(calculateOrderTotal() * 0.13).toFixed(2)}</span>
//                                         </div>
//                                         <div className="flex justify-between border-t border-gray-300 pt-3">
//                                             <span className="font-bold text-lg text-gray-900">Total:</span>
//                                             <span className="font-bold text-lg text-gray-900">
//                                                 Rs. {(parseFloat(calculateOrderTotal()) * 1.13).toFixed(2)}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     {/* Footer */}
//                     <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
//                         <button
//                             type="button"
//                             onClick={onClose}
//                             className="px-6 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-200"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="button"
//                             onClick={() => onSubmit(localFormData)}
//                             disabled={localFormData.order.length === 0}
//                             className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-200 shadow-lg ${localFormData.order.length === 0
//                                 ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                                 : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105'
//                                 }`}
//                         >
//                             Create Order ({localFormData.order.length} items)
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Stock Selection Modal */}
//             <StockSelectionModal
//                 show={showStockModal}
//                 onClose={() => setShowStockModal(false)}
//                 onConfirmSelection={handleStockSelection}
//                 productStocks={selectedProduct ? productStockData.filter(stock => stock.productId === selectedProduct.id) : []}
//                 productName={selectedProduct?.name || ''}
//                 suppliers={suppliers}
//             />
//         </>
//     );
// }
import { Plus, Search, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";
// import AddOrderModal from "../components/create-order";

export default function Orders() {
    const [orders, setOrders] = useState([
        {
            id: 1,
            name: "Bibek Magar",
            address: "Kathmandu, Nepal",
            contactNumber: "9812345678",
            order: [
                {
                    id: 101,
                    productId: 501,
                    productName: "Wheat Flour",
                    imageUrl: "https://example.com/images/wheat_flour.jpg",
                    orderQty: 10,
                    perOrderQty: 45.50,
                    totalAmount: 455.00,
                    batchCode: "BATCH20250614A"
                },
                {
                    id: 102,
                    productId: 502,
                    productName: "Rice",
                    imageUrl: "https://example.com/images/rice.jpg",
                    orderQty: 5,
                    perOrderQty: 52.00,
                    totalAmount: 260.00,
                    batchCode: "BATCH20250614B"
                }
            ],
            totalAmount: 715.00,
            createdBy: "admin",
            createdAt: "2025-06-14T13:45:00"
        },
        {
            id: 2,
            name: "Sita Sharma",
            address: "Pokhara, Nepal",
            contactNumber: "9801122334",
            order: [
                {
                    id: 103,
                    productId: 503,
                    productName: "Sugar",
                    imageUrl: "https://example.com/images/sugar.jpg",
                    orderQty: 20,
                    perOrderQty: 65.00,
                    totalAmount: 1300.00,
                    batchCode: "BATCH20250614C"
                }
            ],
            totalAmount: 1300.00,
            createdBy: "manager",
            createdAt: "2025-06-14T14:30:00"
        }
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [isLoading, setIsLoading] = useState(false);
    const [totalItems, setTotalItems] = useState(orders.length);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const fetchProducts = () => {
        console.log("API call would happen with these parameters:", {
            searchTerm,
            page: currentPage,
            limit: itemsPerPage
        });
    };

    const handleOrderSelect = (order) => {
        setSelectedOrder(order);
    };

    const closeDetails = () => {
        setSelectedOrder(null);
    };

    const handleItemsPerPageChange = (e) => {
        const newItemsPerPage = parseInt(e.target.value);
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
        fetchProducts();
    };

    const [showAddOrderModal, setShowAddOrderModal] = useState(false);
    const [orderFormData, setOrderFormData] = useState({
        name: '',
        address: '',
        contactNumber: '',
        order: [{
            productId: '',
            orderQty: 1,
            perOrderQty: 0.01,
            supplierId: '',
            batchCode: '',
            status: true
        }]
    });
    const [orderErrors, setOrderErrors] = useState({});

    const handleOrderSubmit = () => {
        // Validate form here
        // Then submit data
        console.log("Order data:", orderFormData);
        // API call would go here
    };

    const suppliers = [
        { id: 1, name: "Fresh Dairy Ltd." },
        { id: 2, name: "Organic Farm Supplies" },
        { id: 3, name: "Mountain Harvest" },
        { id: 4, name: "Coastal Seafood Co." },
        { id: 5, name: "Golden Grains Inc." }
    ];

    const products = [
        { id: 1, name: "Fresh Milk" },
        { id: 2, name: "Organic Eggs" },
        { id: 3, name: "Himalayan Honey" },
        { id: 4, name: "Whole Wheat Bread" },
        { id: 5, name: "Organic Apples" },
        { id: 6, name: "Free Range Chicken" },
        { id: 7, name: "Atlantic Salmon" },
        { id: 8, name: "Brown Rice" }
    ];
    const productStockData = [
        { id: 1, productId: 1, supplierId: 1, price: 80.00, batchCode: "MILK-2023-06-01", stock: 50 },
        { id: 2, productId: 1, supplierId: 1, price: 82.00, batchCode: "MILK-2023-06-15", stock: 100 },
        { id: 3, productId: 2, supplierId: 2, price: 120.00, batchCode: "EGG-2023-06-10", stock: 80 },
        // ... more stock items
    ];


    return (
        <div className="py-6 px-4 sm:px-6 lg:px-8 h-full flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage and review all customer orders
                    </p>
                </div>
                <div className="mt-4 sm:mt-0">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                        onClick={() => setShowAddOrderModal(true)}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Create Order
                    </button>
                </div>
            </div>

            <AddOrderModal
                show={showAddOrderModal}
                onClose={() => setShowAddOrderModal(false)}
                onSubmit={handleOrderSubmit}
                formData={orderFormData}
                setFormData={setOrderFormData}
                errors={orderErrors}
                products={products}
                suppliers={suppliers}
            />

            <div className="flex flex-col lg:flex-row gap-6 h-full">
                {/* Orders Table */}
                <div className={`bg-white shadow rounded-lg ${selectedOrder ? 'lg:w-2/3' : 'w-full'} flex flex-col min-h-0`}>
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">All Orders</h2>
                            <div className="mt-3 sm:mt-0 flex flex-col sm:flex-row sm:items-center gap-4">
                                <div className="relative w-full sm:w-auto">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search orders..."
                                        className="pl-8 w-full sm:w-[300px] border border-gray-300 rounded-md px-3 py-2 text-sm"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <button
                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                                >
                                    <Search className="mr-2 h-4 w-4" />
                                    Search
                                </button>
                            </div>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                            {totalItems} total orders
                        </p>
                    </div>

                    <div className="px-6 py-4 flex-1 overflow-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50 sticky top-0">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {orders.map((order) => (
                                    <tr
                                        key={order.id}
                                        onClick={() => handleOrderSelect(order)}
                                        className={`cursor-pointer hover:bg-gray-100 ${selectedOrder?.id === order.id ? 'bg-gray-100' : ''}`}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">{order.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{order.address}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{order.contactNumber}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">Rs {order.totalAmount}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{order.createdBy}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{new Date(order.createdAt).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-6 py-4 border-t border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-700">
                                    Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} entries
                                </span>

                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-700">Items per page:</span>
                                    <select
                                        value={itemsPerPage}
                                        onChange={handleItemsPerPageChange}
                                        className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                                    >
                                        <option value="6">6</option>
                                        <option value="12">12</option>
                                        <option value="24">24</option>
                                        <option value="48">48</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1 || isLoading}
                                    className={`px-3 py-1 border rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </button>

                                <span className="text-sm text-gray-700">
                                    Page {currentPage} of {Math.ceil(totalItems / itemsPerPage) || 1}
                                </span>

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage * itemsPerPage >= totalItems || isLoading}
                                    className={`px-3 py-1 border rounded-md ${currentPage * itemsPerPage >= totalItems ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Details Panel */}
                {selectedOrder && (
                    <div className="bg-white shadow-lg rounded-lg lg:w-1/3 flex flex-col min-h-0 border border-gray-100">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center rounded-t-lg">
                            <h3 className="text-xl font-semibold text-gray-800">Order Details</h3>
                            <button
                                onClick={closeDetails}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="px-6 py-4 flex-1 overflow-auto space-y-6">
                            {/* Customer Information */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="text-sm font-semibold text-gray-600 mb-3">CUSTOMER INFORMATION</h4>
                                <div className="space-y-2">
                                    <div className="flex">
                                        <span className="text-gray-600 font-medium w-24">Name:</span>
                                        <span className="text-gray-800">{selectedOrder.name}</span>
                                    </div>
                                    <div className="flex">
                                        <span className="text-gray-600 font-medium w-24">Address:</span>
                                        <span className="text-gray-800">{selectedOrder.address}</span>
                                    </div>
                                    <div className="flex">
                                        <span className="text-gray-600 font-medium w-24">Contact:</span>
                                        <span className="text-gray-800">{selectedOrder.contactNumber}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Order Information */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="text-sm font-semibold text-gray-600 mb-3">ORDER INFORMATION</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 font-medium">Total Amount:</span>
                                        <span className="text-gray-800 font-semibold">Rs {selectedOrder.totalAmount}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 font-medium">Created By:</span>
                                        <span className="text-gray-800">{selectedOrder.createdBy}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 font-medium">Created At:</span>
                                        <span className="text-gray-800">{new Date(selectedOrder.createdAt).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Products */}
                            <div>
                                <h4 className="text-sm font-semibold text-gray-600 mb-3">PRODUCTS ({selectedOrder.order.length})</h4>
                                <div className="space-y-3">
                                    {selectedOrder.order.map(product => (
                                        <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-200 transition-colors">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-medium text-gray-900">{product.productName}</p>
                                                    <p className="text-xs text-gray-500 mt-1">Batch: {product.batchCode}</p>
                                                </div>
                                                <p className="text-blue-600 font-semibold">Rs {product.totalAmount}</p>
                                            </div>
                                            <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-600">
                                                <div>
                                                    <span className="font-medium">Qty:</span> {product.orderQty}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Unit Price:</span> Rs {product.perOrderQty}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
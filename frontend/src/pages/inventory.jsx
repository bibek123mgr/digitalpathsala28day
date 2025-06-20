import { Plus, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import AddStockModal from "../components/create-stock";
import { useDispatch, useSelector } from "react-redux";
import { getAllActiveSupplierForCombobox } from "../store/supplierSlice";
import { getAllActiveProductsForCombobox } from "../store/productSlice";
import { createStock, getAllStocks } from "../store/stockSlice";
import { toast } from "react-toastify";

export default function Inventory() {


    // State for API parameters
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [isLoading, setIsLoading] = useState(false);
    const [totalItems, setTotalItems] = useState(0); // Will be set from API response

    // Function to fetch suppliers from API
    const fetchSuppliers = () => {
        console.log("API call would happen with these parameters:", {
            searchTerm,
            page: currentPage,
            limit: itemsPerPage
        });
        // In a real implementation, this would be:
        // setIsLoading(true);
        // api.getSuppliers({ searchTerm, page: currentPage, limit: itemsPerPage })
        //   .then(response => {
        //     setSuppliers(response.data);
        //     setTotalItems(response.total);
        //   })
        //   .finally(() => setIsLoading(false));
    };

    // Handler for search button click
    const handleSearch = () => {
        setCurrentPage(1); // Reset to first page when searching
        fetchSuppliers();
    };

    // Handler for page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        fetchSuppliers();
    };

    // Handler for items per page change
    const handleItemsPerPageChange = (e) => {
        const newItemsPerPage = parseInt(e.target.value);
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // Reset to first page when changing items per page
        fetchSuppliers();
    };

    const [showAddStockModal, setShowAddStockModal] = useState(false);
    const [stockFormData, setStockFormData] = useState({
        stockIn: '',
        perStockInPrice: '',
        stockInAmount: '',
        productId: '',
        supplierId: ''
    });
    const [stockErrors, setStockErrors] = useState({});

    const dispatch = useDispatch();
    const fetchData = async () => {
        await dispatch(getAllActiveSupplierForCombobox());
        await dispatch(getAllActiveProductsForCombobox());
    };

    const fetchStockData = async () => {
        await dispatch(getAllStocks());
    };

    useEffect(() => {
        fetchData();
        fetchStockData();
    }, [dispatch])

    const { comboboxSuppliers: suppliers } = useSelector((store) => store.supplier)
    const { comboboxProducts: products } = useSelector((store) => store.product)
    const { stocks } = useSelector((store) => store.stock)

    const handleAddStockSubmit = async () => {
        // Validate form
        const newErrors = {};
        if (!stockFormData.stockIn) newErrors.stockIn = "Quantity is required";
        if (!stockFormData.perStockInPrice) newErrors.perStockInPrice = "Price per unit is required";
        if (!stockFormData.productId) newErrors.productId = "Product is required";
        if (!stockFormData.supplierId) newErrors.supplierId = "Supplier is required";

        setStockErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            // Submit the form
            console.log("Submitting stock data:", stockFormData);
            // API call would go here
            await dispatch(createStock(stockFormData))
            setShowAddStockModal(false);
        }
    };

    const { message, error } = useSelector((store) => store.stock)

    useEffect(() => {
        if (message) {
            toast.success(message);
        }
        if (error) {
            toast.error(error);
        }
        if (message || error) {
            setIsLoading(false);
        }
    }, [message, error]);


    return (
        <div className="py-6 px-4 sm:px-6 lg:px-8 h-full flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Stocks</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage stocks information and profiles
                    </p>
                </div>
                <div className="mt-4 sm:mt-0">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                        onClick={() => setShowAddStockModal(true)}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Stock
                    </button>
                </div>
            </div>

            <AddStockModal
                show={showAddStockModal}
                onClose={() => setShowAddStockModal(false)}
                onSubmit={handleAddStockSubmit}
                formData={stockFormData}
                setFormData={setStockFormData}
                errors={stockErrors}
                products={products}  // Your array of products
                suppliers={suppliers}  // Your array of suppliers
            />

            <div className="bg-white shadow rounded-lg flex-1 flex flex-col">
                <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">All Stocks</h2>
                        <div className="mt-3 sm:mt-0 flex flex-col sm:flex-row sm:items-center gap-4">
                            <div className="relative w-full sm:w-auto">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search stock..."
                                    className="pl-8 w-full sm:w-[300px] border border-gray-300 rounded-md px-3 py-2 text-sm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                />
                            </div>
                            <button
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                                onClick={handleSearch}
                            >
                                <Search className="mr-2 h-4 w-4" />
                                Search
                            </button>
                        </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                        {totalItems} total stocks
                    </p>
                </div>

                <div className="px-6 py-4 flex-1 overflow-hidden">
                    <div className="h-full overflow-auto">
                        {isLoading ? (
                            <div className="space-y-4">
                                {[...Array(5)].map((_, index) => (
                                    <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                                        <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
                                        <div className="flex-1 space-y-2">
                                            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                                            <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                                        </div>
                                        <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                ))}
                            </div>
                        ) : stocks.length === 0 ? (
                            <div className="h-full flex items-center justify-center">
                                <p className="text-gray-500">No Stock found</p>
                            </div>
                        ) : (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50 sticky top-0">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock In</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Per Stock Price</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {stocks.map((stock) => (
                                        <tr key={stock.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">{stock.productName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{stock.stock}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{stock.perStockPrice}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{stock.totalStockPrice}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{stock.supplier}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{stock.createdBy}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{stock.createdAt}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
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
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
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
        </div>
    );
}
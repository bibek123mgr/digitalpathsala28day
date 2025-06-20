import { Plus, Search, ChevronLeft, ChevronRight, History, Edit, Trash2, Image as ImageIcon, X } from "lucide-react";
import { useState, useEffect } from "react";
import CreateProductModal from "../components/create-product";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, getAllProducts } from "../store/productSlice";
import { toast } from "react-toastify";

export default function Products() {
    // Mock data with images
    // const [products, setProducts] = useState([
    //     {
    //         id: 1,
    //         name: "Fresh Milk",
    //         description: "Organic fresh milk from local farms",
    //         price: "Rs. 80",
    //         stock: 150,
    //         category: "Dairy",
    //         supplier: "Fresh Dairy Ltd.",
    //         createdBy: "Admin",
    //         createdAt: "2025-06-13",
    //         image: "https://images.unsplash.com/photo-1550583724-b2692b85b150",
    //         history: [
    //             { date: "2025-06-15", action: "Stock added", quantity: 50, by: "Manager" },
    //             { date: "2025-06-12", action: "Price updated", from: "Rs. 75", to: "Rs. 80", by: "Admin" },
    //             { date: "2025-06-10", action: "Stock added", quantity: 100, by: "Manager" }
    //         ]
    //     },
    //     {
    //         id: 2,
    //         name: "Organic Eggs",
    //         description: "Free-range organic eggs",
    //         price: "Rs. 120/dozen",
    //         stock: 80,
    //         category: "Poultry",
    //         supplier: "Organic Farm Supplies",
    //         createdBy: "Manager",
    //         createdAt: "2025-06-10",
    //         image: "https://images.unsplash.com/photo-1587486913049-53fc88980dfa",
    //         history: [
    //             { date: "2025-06-11", action: "Stock added", quantity: 30, by: "Staff" },
    //             { date: "2025-06-09", action: "New product added", by: "Manager" }
    //         ]
    //     },
    //     {
    //         id: 3,
    //         name: "Himalayan Honey",
    //         description: "Pure honey from Himalayan bees",
    //         price: "Rs. 500",
    //         stock: 45,
    //         category: "Natural Products",
    //         supplier: "Mountain Harvest",
    //         createdBy: "Admin",
    //         createdAt: "2025-06-08",
    //         image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924",
    //         history: [
    //             { date: "2025-06-07", action: "Price updated", from: "Rs. 450", to: "Rs. 500", by: "Admin" },
    //             { date: "2025-06-05", action: "Stock added", quantity: 45, by: "Manager" }
    //         ]
    //     },
    // ]);


    const dispatch = useDispatch();
    const { message, error, products } = useSelector((store) => store.product)

    console.log(products);



    // State for API parameters
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [isLoading, setIsLoading] = useState(false);
    const [totalItems, setTotalItems] = useState(products.length);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showDetails, setShowDetails] = useState(false);


    // Function to fetch products from API
    const fetchProducts = async () => {

        await dispatch(getAllProducts());

        console.log("API call would happen with these parameters:", {
            searchTerm,
            page: currentPage,
            limit: itemsPerPage
        });
    };

    // Handler for search button click
    const handleSearch = () => {
        setCurrentPage(1);
        fetchProducts();
    };

    // Handler for page change
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        fetchProducts();
    };

    // Handler for items per page change
    const handleItemsPerPageChange = (e) => {
        const newItemsPerPage = parseInt(e.target.value);
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
        fetchProducts();
    };

    // Handler for product selection
    const handleProductSelect = (product) => {
        setSelectedProduct(product);
        setShowDetails(true);
    };

    // Handler for delete product
    const handleDelete = (productId, e) => {
        e?.stopPropagation();
        console.log("Delete product with ID:", productId);
        // In real implementation: API call to delete
        // setProducts(products.filter(p => p.id !== productId));
        if (selectedProduct?.id === productId) {
            setSelectedProduct(products.length > 0 ? products[0] : null);
        }
    };

    // Handler for edit product
    const handleEdit = (productId, e) => {
        e?.stopPropagation();
        console.log("Edit product with ID:", productId);
        // In real implementation: Open edit modal/form
    };

    // Toggle details visibility on mobile
    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };


    const [showAddModal, setShowAddModal] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        imageFile: null,
        imagePreview: null
    });
    const [errors, setErrors] = useState({
        name: '',
        description: '',
        image: ''
    });

    const validateForm = () => {
        let valid = true;
        const newErrors = {
            name: '',
            description: '',
            image: ''
        };

        if (!formData.name.trim()) {
            newErrors.name = "Product name is required";
            valid = false;
        }
        if (!formData.description.trim()) {
            newErrors.description = "Product description person is required";
            valid = false;
        }
        if (!formData.imageFile) {
            newErrors.image = "Product image is required";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };
    const handleSubmit = async () => {
        if (validateForm()) {

            await dispatch(createProduct(formData))

            setFormData({
                name: '',
                description: '',
                imageFile: null,
                imagePreview: null
            });
            setShowAddModal(false);
        }
    };
    useEffect(() => {
        fetchProducts()
    }, [dispatch])


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
                    <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage products information and details
                    </p>
                </div>
                <div className="mt-4 sm:mt-0">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                        onClick={() => setShowAddModal(true)}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Create Product
                    </button>
                </div>
            </div>

            <CreateProductModal
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSubmit={handleSubmit}
                formData={formData}
                setFormData={setFormData}
                errors={errors}
            />

            <div className="flex-1 flex flex-col lg:flex-row gap-6 min-h-0">
                {/* Left side - Product Cards (Hidden on xs when details are shown) */}
                <div className={`bg-white shadow rounded-lg ${selectedProduct ? 'lg:w-2/3' : 'w-full'} flex flex-col min-h-0`}>
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">All Products</h2>
                            <div className="mt-3 sm:mt-0 flex flex-col sm:flex-row sm:items-center gap-4">
                                <div className="relative w-full sm:w-auto">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search Products..."
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
                            {totalItems} total products
                        </p>
                    </div>

                    <div className="px-6 py-4 flex-1 overflow-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50 sticky top-0">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Image</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created By</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((product) => (
                                    <tr
                                        key={product.id}
                                        onClick={() => handleProductSelect(product)}
                                        className={`cursor-pointer hover:bg-gray-50 ${selectedProduct?.id === product.id ? 'bg-blue-50' : ''}`}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{product.imageUrl}</td>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{product.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{product.description}</td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                                                {product.createdBy}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{product.createdAt}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
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
                                        <option value="10">10</option>
                                        <option value="10">20</option>
                                        <option value="30">30</option>
                                        <option value="40">40</option>
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

                {/* Right side - Product Details (Hidden on xs by default) */}
                {selectedProduct && (
                    <div className={`bg-white shadow-lg rounded-lg ${showDetails ? 'flex' : 'hidden'} xs:hidden lg:flex lg:w-1/3 flex-col min-h-0 border border-gray-200`}>
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-lg flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Product Details</h2>
                                <p className="text-sm text-gray-500">ID: #{selectedProduct.id}</p>
                            </div>
                            <button
                                onClick={toggleDetails}
                                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-auto">
                            {/* Product Image */}
                            <div className="w-full h-48 bg-gray-100 overflow-hidden">
                                {selectedProduct.image ? (
                                    <img
                                        src={selectedProduct.image}
                                        alt={selectedProduct.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <ImageIcon className="h-12 w-12" />
                                    </div>
                                )}
                            </div>

                            {/* Basic Info */}
                            <div className="px-6 py-4">
                                <h3 className="text-xl font-semibold text-gray-900">{selectedProduct.name}</h3>
                                <p className="text-gray-600 mt-1">{selectedProduct.description}</p>

                                {/* Simple Stock Display */}
                                <div className="mt-4">
                                    <p className="text-sm font-medium text-gray-500">Current Stock</p>
                                    <p className={`text-2xl font-bold ${selectedProduct.stock > 50 ? 'text-green-600' :
                                        selectedProduct.stock > 0 ? 'text-yellow-600' :
                                            'text-red-600'
                                        }`}>
                                        {selectedProduct.stock} units
                                    </p>
                                </div>
                            </div>

                            {/* Activity History */}
                            <div className="border-t border-gray-200 px-6 py-4">
                                <h3 className="font-medium text-gray-900 flex items-center gap-2">
                                    <History className="h-5 w-5 text-gray-400" />
                                    Recent Activity
                                </h3>

                                <div className="mt-3 space-y-3 max-h-60 overflow-y-auto">
                                    {selectedProduct.history.length === 0 ? (
                                        <p className="text-gray-500 text-sm py-2">No activity recorded</p>
                                    ) : (
                                        selectedProduct.history.map((item, index) => (
                                            <div key={index} className="text-sm">
                                                <div className="flex justify-between">
                                                    <p className="font-medium">{item.action}</p>
                                                    <p className="text-gray-500">{item.date}</p>
                                                </div>
                                                {item.quantity && (
                                                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                                                )}
                                                {item.from && item.to && (
                                                    <p className="text-gray-600">
                                                        Changed from {item.from} to {item.to}
                                                    </p>
                                                )}
                                                <p className="text-xs text-gray-400 mt-1">By {item.by}</p>
                                                {index < selectedProduct.history.length - 1 && (
                                                    <div className="border-t border-gray-100 my-2"></div>
                                                )}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                            <div className="flex gap-3">
                                <button
                                    onClick={(e) => handleEdit(selectedProduct.id, e)}
                                    className="flex-1 inline-flex justify-center items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
                                >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                </button>
                                <button
                                    onClick={(e) => handleDelete(selectedProduct.id, e)}
                                    className="flex-1 inline-flex justify-center items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium"
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
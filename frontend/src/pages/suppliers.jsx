import { Plus, Search, ChevronLeft, ChevronRight, X, User, Mail, Phone, MapPin, Package } from "lucide-react";
import { useEffect, useState } from "react";
import CreateSupplierModal from "../components/create-supplier";
import { useDispatch, useSelector } from "react-redux";
import { createSupplier, getAllSuppliers } from "../store/supplierSlice";
import { toast } from "react-toastify";

export default function Suppliers() {

    const [showAddModal, setShowAddModal] = useState(false);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: '',
        contactPerson: '',
        phone: '',
        email: '',
        address: '',
        category: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        contactPerson: '',
        phone: '',
        email: '',
        address: '',
        category: ''
    });

    const validateForm = () => {
        let valid = true;
        const newErrors = {
            name: '',
            contactPerson: '',
            phone: '',
            email: '',
            address: '',
            category: ''
        };

        if (!formData.name.trim()) {
            newErrors.name = "Supplier name is required";
            valid = false;
        }
        if (!formData.contactPerson.trim()) {
            newErrors.contactPerson = "Contact person is required";
            valid = false;
        }
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
            valid = false;
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
            valid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email";
            valid = false;
        }
        if (!formData.address.trim()) {
            newErrors.address = "Address is required";
            valid = false;
        }
        if (!formData.category.trim()) {
            newErrors.category = "Category is required";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };



    useEffect(() => {
        fetchData();
    }, [dispatch])

    const { message, error, suppliers } = useSelector((store) => store.supplier)

    const fetchData = async () => {
        await dispatch(getAllSuppliers());

    };


    const handleSubmit = async () => {
        if (validateForm()) {
            console.log(formData);
            await dispatch(createSupplier(formData))

            setFormData({
                name: '',
                contactPerson: '',
                phone: '',
                email: '',
                address: '',
                category: ''
            });
            setShowAddModal(false);
        }
    };

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

    // State for API parameters
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const [totalItems, setTotalItems] = useState(suppliers.length);
    const [selectedSupplier, setSelectedSupplier] = useState(null);

    const handleSupplierSelect = (supplier) => {
        setSelectedSupplier(supplier);
    };

    const closeDetails = () => {
        setSelectedSupplier(null);
    };

    // Calculate pagination values
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const handleItemsPerPageChange = (e) => {
        const newItemsPerPage = parseInt(e.target.value);
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
        fetchData();
    };

    return (
        <div className="py-6 px-4 sm:px-6 lg:px-8 h-full flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Suppliers</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage suppliers information and profiles
                    </p>
                </div>
                <div className="mt-4 sm:mt-0">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                        onClick={() => setShowAddModal(true)}

                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Create Supplier
                    </button>
                </div>
            </div>
            <CreateSupplierModal
                show={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSubmit={handleSubmit}
                formData={formData}
                setFormData={setFormData}
                errors={errors}
            />

            <div className="flex flex-col lg:flex-row gap-6 h-full">
                {/* Suppliers Table */}
                <div className={`bg-white shadow rounded-lg ${selectedSupplier ? 'lg:w-2/3' : 'w-full'} flex flex-col min-h-0`}>
                    <div className="px-6 py-4 border-b border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">All Suppliers</h2>
                            <div className="mt-3 sm:mt-0 flex flex-col sm:flex-row sm:items-center gap-4">
                                <div className="relative w-full sm:w-auto">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search suppliers..."
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
                            {totalItems} total suppliers
                        </p>
                    </div>

                    <div className="px-6 py-4 flex-1 overflow-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50 sticky top-0">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {suppliers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((supplier) => (
                                    <tr
                                        key={supplier.id}
                                        onClick={() => handleSupplierSelect(supplier)}
                                        className={`cursor-pointer hover:bg-gray-50 ${selectedSupplier?.id === supplier.id ? 'bg-blue-50' : ''}`}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{supplier.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{supplier.contactPerson}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{supplier.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                                                {supplier.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{supplier.createdAt}</td>
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

                {/* Supplier Details Panel */}
                {selectedSupplier && (
                    <div className="bg-white shadow rounded-lg lg:w-1/3 flex flex-col min-h-0">
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-900">Supplier Details</h3>
                            <button
                                onClick={closeDetails}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <div className="px-6 py-4 flex-1 overflow-auto space-y-6">
                            {/* Supplier Information */}
                            <div className="space-y-4">
                                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Supplier Information</h4>
                                <div className="space-y-3">
                                    <div className="flex items-start">
                                        <User className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{selectedSupplier.name}</p>
                                            <p className="text-xs text-gray-500">Company Name</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <User className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{selectedSupplier.contactPerson}</p>
                                            <p className="text-xs text-gray-500">Contact Person</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <Mail className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{selectedSupplier.email}</p>
                                            <p className="text-xs text-gray-500">Email</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <Phone className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{selectedSupplier.phone}</p>
                                            <p className="text-xs text-gray-500">Phone</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{selectedSupplier.address}</p>
                                            <p className="text-xs text-gray-500">Address</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Products */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Products ({selectedSupplier.products.length})</h4>
                                </div>
                                <div className="space-y-3">
                                    {selectedSupplier.products.map(product => (
                                        <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300">
                                            <div className="flex justify-between">
                                                <div className="flex items-start">
                                                    <Package className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{product.name}</p>
                                                        <p className="text-xs text-gray-500">{product.category}</p>
                                                    </div>
                                                </div>
                                                <p className="text-sm font-medium text-blue-600">Rs {product.price}</p>
                                            </div>
                                            <div className="mt-2 pt-2 border-t border-gray-100 grid grid-cols-2 gap-2 text-sm text-gray-500">
                                                <p>Stock: {product.stock}</p>
                                                <p>Last Delivery: {product.lastDelivery}</p>
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
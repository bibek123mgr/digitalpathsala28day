import { X, User, Mail, Phone, MapPin, Building2, Tag } from "lucide-react";

export default function CreateSupplierModal({ show, onClose, onSubmit, formData, setFormData, errors }) {
    if (!show) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <>
            {/* Enhanced backdrop with blur effect */}
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in duration-200"></div>

            {/* Modal container with enhanced animations */}
            <div className="fixed inset-0 flex items-center justify-center z-50 p-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-gray-100 overflow-hidden">

                    {/* Enhanced Header with gradient */}
                    <div className="relative px-6 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                    <Building2 className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">Add New Supplier</h3>
                                    <p className="text-blue-100 text-sm">Create a new supplier profile</p>
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

                    {/* Enhanced Form Body */}
                    <div className="px-6 py-6 space-y-6 max-h-96 overflow-y-auto">

                        {/* Supplier Name */}
                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                <User className="h-4 w-4 mr-2 text-blue-500" />
                                Supplier Name *
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full border-2 ${errors.name
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                                        } rounded-xl px-4 py-3 transition-all duration-200 focus:ring-4 focus:ring-opacity-20 focus:outline-none placeholder-gray-400`}
                                    placeholder="Enter supplier name"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <div className={`w-2 h-2 rounded-full ${formData.name ? 'bg-green-400' : 'bg-gray-300'} transition-colors duration-200`}></div>
                                </div>
                            </div>
                            {errors.name && (
                                <p className="mt-2 text-sm text-red-600 flex items-center animate-in slide-in-from-left-1">
                                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Contact Person */}
                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                <User className="h-4 w-4 mr-2 text-blue-500" />
                                Contact Person *
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="contactPerson"
                                    value={formData.contactPerson}
                                    onChange={handleChange}
                                    className={`w-full border-2 ${errors.contactPerson
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                                        } rounded-xl px-4 py-3 transition-all duration-200 focus:ring-4 focus:ring-opacity-20 focus:outline-none placeholder-gray-400`}
                                    placeholder="Contact person name"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <div className={`w-2 h-2 rounded-full ${formData.contactPerson ? 'bg-green-400' : 'bg-gray-300'} transition-colors duration-200`}></div>
                                </div>
                            </div>
                            {errors.contactPerson && (
                                <p className="mt-2 text-sm text-red-600 flex items-center animate-in slide-in-from-left-1">
                                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                                    {errors.contactPerson}
                                </p>
                            )}
                        </div>

                        {/* Email and Phone in a grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                    <Mail className="h-4 w-4 mr-2 text-blue-500" />
                                    Email *
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full border-2 ${errors.email
                                            ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                            : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                                            } rounded-xl px-4 py-3 transition-all duration-200 focus:ring-4 focus:ring-opacity-20 focus:outline-none placeholder-gray-400`}
                                        placeholder="email@domain.com"
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <div className={`w-2 h-2 rounded-full ${formData.email ? 'bg-green-400' : 'bg-gray-300'} transition-colors duration-200`}></div>
                                    </div>
                                </div>
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-600 flex items-center animate-in slide-in-from-left-1">
                                        <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                    <Phone className="h-4 w-4 mr-2 text-blue-500" />
                                    Phone *
                                </label>
                                <div className="relative">
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={`w-full border-2 ${errors.phone
                                            ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                            : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                                            } rounded-xl px-4 py-3 transition-all duration-200 focus:ring-4 focus:ring-opacity-20 focus:outline-none placeholder-gray-400`}
                                        placeholder="+1 (555) 000-0000"
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <div className={`w-2 h-2 rounded-full ${formData.phone ? 'bg-green-400' : 'bg-gray-300'} transition-colors duration-200`}></div>
                                    </div>
                                </div>
                                {errors.phone && (
                                    <p className="mt-2 text-sm text-red-600 flex items-center animate-in slide-in-from-left-1">
                                        <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                                        {errors.phone}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Address */}
                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                                Address *
                            </label>
                            <div className="relative">
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    rows="3"
                                    className={`w-full border-2 ${errors.address
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                                        } rounded-xl px-4 py-3 transition-all duration-200 focus:ring-4 focus:ring-opacity-20 focus:outline-none placeholder-gray-400 resize-none`}
                                    placeholder="Enter full address including city, state, and postal code"
                                />
                                <div className="absolute top-3 right-3 pointer-events-none">
                                    <div className={`w-2 h-2 rounded-full ${formData.address ? 'bg-green-400' : 'bg-gray-300'} transition-colors duration-200`}></div>
                                </div>
                            </div>
                            {errors.address && (
                                <p className="mt-2 text-sm text-red-600 flex items-center animate-in slide-in-from-left-1">
                                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                                    {errors.address}
                                </p>
                            )}
                        </div>

                        {/* Category */}
                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                <Tag className="h-4 w-4 mr-2 text-blue-500" />
                                Category *
                            </label>
                            <div className="relative">
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className={`w-full border-2 ${errors.category
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                                        } rounded-xl px-4 py-3 transition-all duration-200 focus:ring-4 focus:ring-opacity-20 focus:outline-none bg-white appearance-none cursor-pointer`}
                                >
                                    <option value="">Select a category</option>
                                    <option value="Dairy">Dairy</option>
                                    <option value="Vegetables">Vegetables</option>
                                    <option value="Fruits">Fruits</option>
                                    <option value="Meat">Meat</option>
                                    <option value="Beverages">Beverages</option>
                                    <option value="Other">Other</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            {errors.category && (
                                <p className="mt-2 text-sm text-red-600 flex items-center animate-in slide-in-from-left-1">
                                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                                    {errors.category}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Enhanced Footer */}
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
                            Create Supplier
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
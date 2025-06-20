import { X, User, Mail, Key, Shield, Check, X as XIcon } from "lucide-react";

export default function AddUserModal({ show, onClose, onSubmit, formData, setFormData, errors }) {
    if (!show) return null;

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
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
                                    <User className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">Add New User</h3>
                                    <p className="text-blue-100 text-sm">Create a new user account</p>
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
                    <div className="px-6 py-6 space-y-6 max-h-[70vh] overflow-y-auto">

                        {/* Username */}
                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                <User className="h-4 w-4 mr-2 text-blue-500" />
                                Username *
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="userName"
                                    value={formData.userName}
                                    onChange={handleChange}
                                    className={`w-full border-2 ${errors.userName
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                                        } rounded-xl px-4 py-3 transition-all duration-200 focus:ring-4 focus:ring-opacity-20 focus:outline-none placeholder-gray-400`}
                                    placeholder="Enter username"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <div className={`w-2 h-2 rounded-full ${formData.userName ? 'bg-green-400' : 'bg-gray-300'} transition-colors duration-200`}></div>
                                </div>
                            </div>
                            {errors.userName && (
                                <p className="mt-2 text-sm text-red-600 flex items-center animate-in slide-in-from-left-1">
                                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                                    {errors.userName}
                                </p>
                            )}
                        </div>

                        {/* Email */}
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

                        {/* Password */}
                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                <Key className="h-4 w-4 mr-2 text-blue-500" />
                                Password *
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full border-2 ${errors.password
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                                        } rounded-xl px-4 py-3 transition-all duration-200 focus:ring-4 focus:ring-opacity-20 focus:outline-none placeholder-gray-400`}
                                    placeholder="Enter password"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <div className={`w-2 h-2 rounded-full ${formData.password ? 'bg-green-400' : 'bg-gray-300'} transition-colors duration-200`}></div>
                                </div>
                            </div>
                            {errors.password && (
                                <p className="mt-2 text-sm text-red-600 flex items-center animate-in slide-in-from-left-1">
                                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Role */}
                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                <Shield className="h-4 w-4 mr-2 text-blue-500" />
                                Role *
                            </label>
                            <div className="relative">
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className={`w-full border-2 ${errors.role
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                                        } rounded-xl px-4 py-3 transition-all duration-200 focus:ring-4 focus:ring-opacity-20 focus:outline-none bg-white appearance-none cursor-pointer`}
                                >
                                    <option value="">Select a role</option>
                                    <option value="ROLE_ADMIN">Admin</option>
                                    <option value="ROLE_STAFF">Staff</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            {errors.role && (
                                <p className="mt-2 text-sm text-red-600 flex items-center animate-in slide-in-from-left-1">
                                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                                    {errors.role}
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
                            Create User
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
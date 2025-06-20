import { X, Package, FileImage, Type, AlignLeft } from "lucide-react";
import { useState } from "react";

export default function CreateProductModal({ show, onClose, onSubmit, formData, setFormData, errors }) {
    if (!show) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    imageFile: file,
                    imagePreview: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setFormData(prev => ({
            ...prev,
            imageFile: null,
            imagePreview: null
        }));
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
                                    <h3 className="text-xl font-bold">Add New Product</h3>
                                    <p className="text-blue-100 text-sm">Create a new product listing</p>
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

                        {/* Product Name */}
                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                <Type className="h-4 w-4 mr-2 text-blue-500" />
                                Product Name *
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
                                    placeholder="Enter product name"
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

                        {/* Product Description */}
                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                <AlignLeft className="h-4 w-4 mr-2 text-blue-500" />
                                Description *
                            </label>
                            <div className="relative">
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="3"
                                    className={`w-full border-2 ${errors.description
                                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                                        } rounded-xl px-4 py-3 transition-all duration-200 focus:ring-4 focus:ring-opacity-20 focus:outline-none placeholder-gray-400 resize-none`}
                                    placeholder="Enter product description"
                                />
                                <div className="absolute top-3 right-3 pointer-events-none">
                                    <div className={`w-2 h-2 rounded-full ${formData.description ? 'bg-green-400' : 'bg-gray-300'} transition-colors duration-200`}></div>
                                </div>
                            </div>
                            {errors.description && (
                                <p className="mt-2 text-sm text-red-600 flex items-center animate-in slide-in-from-left-1">
                                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        {/* Image Upload */}
                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                <FileImage className="h-4 w-4 mr-2 text-blue-500" />
                                Product Image *
                            </label>
                            <div className="relative">
                                {formData.imagePreview ? (
                                    <div className="relative">
                                        <img
                                            src={formData.imagePreview}
                                            alt="Preview"
                                            className="w-full h-48 object-cover rounded-xl border-2 border-gray-200"
                                        />
                                        <button
                                            onClick={removeImage}
                                            className="absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-white transition-colors duration-200"
                                        >
                                            <X className="h-4 w-4 text-gray-700" />
                                        </button>
                                    </div>
                                ) : (
                                    <label className="flex flex-col items-center justify-center w-full border-2 border-gray-200 border-dashed rounded-xl cursor-pointer hover:border-blue-500 transition-colors duration-200 h-32">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <FileImage className="w-8 h-8 mb-3 text-gray-400" />
                                            <p className="mb-2 text-sm text-gray-500">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                PNG, JPG (MAX. 5MB)
                                            </p>
                                        </div>
                                        <input
                                            type="file"
                                            name="image"
                                            onChange={handleImageChange}
                                            className="hidden"
                                            accept="image/*"
                                        />
                                    </label>
                                )}
                            </div>
                            {errors.image && (
                                <p className="mt-2 text-sm text-red-600 flex items-center animate-in slide-in-from-left-1">
                                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                                    {errors.image}
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
                            Create Product
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
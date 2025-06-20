import LoginForm from "../../components/auth/login-form";

export default function Login() {
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-white">
            {/* Left side - Branding and Info */}
            <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 md:p-12 lg:p-16 flex flex-col justify-center text-white">
                <div className="max-w-md mx-auto">
                    <div className="flex items-center mb-8">
                        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                                />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold">Invenza</h1>
                    </div>

                    <h2 className="text-3xl font-bold mb-4">Warehouse Management System</h2>
                    <p className="text-blue-100 mb-8">
                        Streamline your inventory management and optimize warehouse operations with our powerful platform.
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center mr-3">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span>Real-time inventory tracking</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center mr-3">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span>Automated reporting</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center mr-3">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span>Multi-location management</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side - Login Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 lg:p-16">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome back</h2>
                        <p className="text-gray-600">Sign in to access your dashboard</p>
                    </div>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}
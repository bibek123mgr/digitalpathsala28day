import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Loader, LogIn } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";

const loginSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email("Please enter a valid email"),
    password: z.string().min(1, { message: "Password is required" }).min(6, "Password must be at least 6 characters"),
});

export default function LoginForm() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });


    const dispatch = useDispatch();
    const { message, loading, error } = useSelector((store) => store.auth)

    const onSubmit = async (data) => {
        setIsLoading(true);
        await dispatch(login(data));
    };

    useEffect(() => {
        if (message) {
            toast.success(message);
            navigate('/dashboard');
        }
        if (error) {
            toast.error(error);
        }
        if (message || error) {
            setIsLoading(false);
        }
    }, [message, error, navigate]);
    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                </label>
                <input
                    type="email"
                    {...form.register("email")}
                    id="email"
                    placeholder="your.email@example.com"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${form.formState.errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                    disabled={isLoading}
                />
                {form.formState.errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                        {form.formState.errors.email.message}
                    </p>
                )}
            </div>

            <div>
                <div className="flex items-center justify-between mb-1">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>
                <input
                    type={showPassword ? "text" : "password"}
                    {...form.register("password")}
                    id="password"
                    placeholder="Enter your password"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${form.formState.errors.password ? "border-red-500" : "border-gray-300"
                        }`}
                    disabled={isLoading}
                />
                {form.formState.errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                        {form.formState.errors.password.message}
                    </p>
                )}
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Remember me
                    </label>
                </div>
                <div className="text-sm">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                        Forgot password?
                    </a>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ${isLoading ? "opacity-75 cursor-not-allowed" : ""
                        }`}
                >
                    {isLoading ? (
                        <>
                            <Loader className="animate-spin -ml-1 mr-2 h-4 w-4" />
                            Signing in...
                        </>
                    ) : (
                        <>
                            <LogIn className="-ml-1 mr-2 h-4 w-4" />
                            Sign in
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
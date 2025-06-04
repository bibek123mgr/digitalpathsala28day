import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Loader, Send } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required" }),
});

export default function LoginForm() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            toast.success("Login Successfully");
            navigate('/dashboard');
        } catch (error) {
            toast.error("Login failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-4">
            <h2 className="text-center text-lg font-bold bg-gradient-to-r from-blue-500 to-blue-500/80 bg-clip-text text-transparent mb-0.5">
                Invenza Login Panel
            </h2>

            <div className="flex items-center justify-center mb-2">
                <div className="h-[1px] w-6 bg-blue-500/10 rounded-full"></div>
                <div className="mx-1.5">
                    <div className="inline-block w-1 h-1 rounded-full bg-blue-500/30"></div>
                </div>
                <div className="h-[1px] w-6 bg-blue-500/10 rounded-full"></div>
            </div>

            <p className="mb-2 text-center text-[10px] text-gray-600 max-w-[220px] mx-auto">
                Manage your warehouse operations and reservations
            </p>


            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="relative">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                        Email Address
                    </label>
                    <input
                        type="email"
                        {...form.register("email")}
                        id="email"
                        placeholder="Email Address"
                        className="inputBox mt-1"
                        disabled={isLoading}
                    />
                    {form.formState.errors.email && (
                        <p className="text-xs text-red-500 mt-1">
                            {form.formState.errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password Field */}
                <div className="relative">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                        Password
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        {...form.register("password")}
                        id="password"
                        placeholder="Password"
                        className="inputBox mt-1"
                        disabled={isLoading}
                    />
                    {form.formState.errors.password && (
                        <p className="text-xs text-red-500 mt-1">
                            {form.formState.errors.password.message}
                        </p>
                    )}

                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-10 text-sm text-gray-500"
                        tabIndex={-1}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>


                <div className="relative">
                    <input
                        type="checkbox"
                        {...form.register("remember")}
                        id="remember"
                        disabled={isLoading}
                    />
                    <label htmlFor="password" className="inline ml-2 text-sm font-medium text-gray-600">
                        Remember Me
                    </label>

                    {form.formState.errors.remember && (
                        <p className="text-xs text-red-500 mt-1">
                            {form.formState.errors.remember.message}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <button type="submit" className="customBtn" disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <Loader className="mr-1.5 h-3 w-3 animate-spin" />
                            Login ...
                        </>
                    ) : (
                        <>
                            <Send className="mr-1.5 h-3 w-3" />
                            Login
                        </>
                    )}
                </button>
            </form>
            <div className="flex flex-col items-center justify-center mt-3 space-y-1.5">
                <div className="text-[8px] text-gray-400 tracking-wider">
                    <span className="text-blue-500">★</span> WAREHOUSE MANAGEMENT SYSTEM <span className="text-blue-500">★</span>
                </div>
            </div>
        </div>
    );
}

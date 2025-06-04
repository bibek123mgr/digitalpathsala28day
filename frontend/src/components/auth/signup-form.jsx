import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Loader, Send } from "lucide-react";
import { toast } from "react-toastify";

const signupSchema = z.object({
    name: z.string().min(5, { message: "Name is required" }),
    email: z.string().min(5, { message: "Email is required" }),
    role: z.string().min(4, { message: "Role is required" }),
    password: z.string().min(8, { message: "Password is required" }),
});

export default function SignUpForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            role: "",
            password: "",
        },
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        toast.success("User Created Successfully");
        setIsLoading(false);
    };

    return (
        <div className="w-full max-w-md mx-auto p-3 bg-white">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="relative">
                    <input
                        type="text"
                        {...form.register("name")}
                        id="name"
                        placeholder="Name"
                        className="inputBox"
                        disabled={isLoading}
                    />
                    {form.formState.errors.name && (
                        <p className="text-xs text-red-500 my-1">
                            {form.formState.errors.name.message}
                        </p>
                    )}
                </div>

                <div className="relative">
                    <input
                        type="email"
                        {...form.register("email")}
                        id="email"
                        placeholder="Email"
                        className="inputBox"
                        disabled={isLoading}
                    />
                    {form.formState.errors.email && (
                        <p className="text-xs text-red-500 my-1">
                            {form.formState.errors.email.message}
                        </p>
                    )}
                </div>

                <div className="relative">
                    <input
                        type="text"
                        {...form.register("role")}
                        id="role"
                        placeholder="Role"
                        className="inputBox"
                        disabled={isLoading}
                    />
                    {form.formState.errors.role && (
                        <p className="text-xs text-red-500 my-1">
                            {form.formState.errors.role.message}
                        </p>
                    )}
                </div>

                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        {...form.register("password")}
                        id="password"
                        placeholder="Password"
                        className="inputBox"
                        disabled={isLoading}
                    />
                    {form.formState.errors.password && (
                        <p className="text-xs text-red-500 my-1">
                            {form.formState.errors.password.message}
                        </p>
                    )}
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-2 text-sm text-gray-500"
                        tabIndex={-1}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>

                <button
                    type="submit"
                    className="customBtn"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader className="mr-1.5 h-3 w-3 animate-spin" />
                            Creating...
                        </>
                    ) : (
                        <>
                            <Send className="mr-1.5 h-3 w-3" />
                            Sign Up
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}

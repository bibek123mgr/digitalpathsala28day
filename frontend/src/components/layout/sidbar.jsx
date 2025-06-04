import {
    LayoutDashboardIcon,
    UsersIcon,
    TruckIcon,
    PackageIcon,
    BoxesIcon,
    SettingsIcon,
    LogOutIcon,
    FileTextIcon,
    ClipboardListIcon
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    const navItems = [
        { path: "/dashboard", name: "Dashboard", icon: <LayoutDashboardIcon className="h-5 w-5" /> },
        { path: "/users", name: "Users", icon: <UsersIcon className="h-5 w-5" /> },
        { path: "/suppliers", name: "Suppliers", icon: <TruckIcon className="h-5 w-5" /> },
        { path: "/products", name: "Products", icon: <PackageIcon className="h-5 w-5" /> },
        { path: "/inventory", name: "Inventory", icon: <BoxesIcon className="h-5 w-5" /> },
        { path: "/orders", name: "Orders", icon: <ClipboardListIcon className="h-5 w-5" /> },
        // { path: "/reports", name: "Reports", icon: <FileTextIcon className="h-5 w-5" /> },
        { path: "/settings", name: "Settings", icon: <SettingsIcon className="h-5 w-5" /> },
    ];

    const handleLogout = () => {
        // Add your logout logic here
        console.log("Logging out...");
        navigate("/login");
    };

    return (
        <aside className="hidden md:flex md:w-64 flex-col fixed inset-y-0 z-10 bg-white border-r border-slate-200">
            <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200">
                <div className="flex items-center">
                    <span className="text-lg font-semibold text-blue-600">
                        Warehouse Management
                    </span>
                </div>
            </div>

            <nav className="flex-1 overflow-y-auto py-4 px-3">
                <div className="space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${location.pathname === item.path
                                ? "bg-blue-50 text-blue-600"
                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            <span className="mr-3">{item.icon}</span>
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </div>
            </nav>

            <div className="p-4 border-t border-slate-200">
                <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
                >
                    <LogOutIcon className="h-5 w-5 mr-3" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}
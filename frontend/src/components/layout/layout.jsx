import { Outlet } from "react-router-dom";
import Sidebar from "./sidbar";

export default function Layout() {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-x-hidden overflow-y-auro bg-slate-100 md:ml-64 pt-15 md:pt-0">
                <Outlet />
            </main>

        </div>
    )
}
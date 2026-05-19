import React, { useEffect, useState } from "react";
import {
    Users,
    LogOut,
    ShieldCheck,
    Menu,
    X,
    PanelLeftClose,
    PanelLeftOpen,
} from "lucide-react";
import axios from "axios";
import {
    Link,
    Outlet,
    useLocation,
    useNavigate,
} from "react-router-dom";
import { useLogout } from "../api/hooks/useLogout";

export function DashboardLayout() {
    const location = useLocation();
    const navigate = useNavigate();

    const { logout, loading } = useLogout();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [desktopCollapsed, setDesktopCollapsed] = useState(false);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/login");
                    return;
                }

                await axios.get("http://localhost:8000/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } catch (error) {
                console.log(error);
                localStorage.removeItem("token");
                navigate("/login");
            }
        };

        verifyUser();
    }, [navigate]);

    useEffect(() => {
        setSidebarOpen(false);
    }, [location.pathname]);

    const menus = [
        {
            name: "Users",
            path: "/dashboard/users",
            icon: Users,
        },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Mobile backdrop */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed top-0 left-0 z-50 h-screen
                    ${desktopCollapsed ? "w-24" : "w-72"}
                    border-r border-slate-800 bg-slate-900
                    flex flex-col
                    transition-all duration-300 ease-in-out
                    shadow-2xl
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                `}
            >
                {/* Sidebar header */}
                <div className="border-b border-slate-800 px-4 py-4">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          

                            {!desktopCollapsed && (
                                <div className="min-w-0">
                                    <h2 className="truncate text-base font-bold text-white">
                                        Admin Panel
                                    </h2>
                                    <p className="truncate text-sm text-slate-400">
                                        User Management
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            {/* Desktop collapse */}
                            <button
                                onClick={() =>
                                    setDesktopCollapsed((prev) => !prev)
                                }
                                className="hidden lg:flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-slate-300 transition hover:bg-slate-700 hover:text-white"
                            >
                                {desktopCollapsed ? (
                                    <PanelLeftOpen className="h-5 w-5" />
                                ) : (
                                    <PanelLeftClose className="h-5 w-5" />
                                )}
                            </button>

                            {/* Mobile close */}
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="flex lg:hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-slate-300 transition hover:bg-slate-700 hover:text-white"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Menus */}
                <nav className="flex-1 space-y-2 p-4">
                    {menus.map((menu) => {
                        const Icon = menu.icon;
                        const active = location.pathname === menu.path;

                        return (
                            <Link
                                key={menu.path}
                                to={menu.path}
                                className={`
                                    group flex items-center
                                    ${desktopCollapsed ? "justify-center px-3" : "gap-3 px-4"}
                                    py-3 rounded-2xl text-sm font-medium
                                    transition-all duration-200
                                    ${
                                        active
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                            : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                    }
                                `}
                                title={desktopCollapsed ? menu.name : ""}
                            >
                                <div
                                    className={`
                                        flex h-10 w-10 shrink-0 items-center justify-center rounded-xl
                                        ${
                                            active
                                                ? "bg-white/15"
                                                : "bg-slate-800 group-hover:bg-slate-700"
                                        }
                                    `}
                                >
                                    <Icon className="h-5 w-5" />
                                </div>

                                {!desktopCollapsed && <span>{menu.name}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="border-t border-slate-800 p-4">
                    <button
                        onClick={logout}
                        disabled={loading}
                        className={`
                            w-full rounded-2xl border border-red-500/20
                            bg-red-500/10 px-4 py-3.5
                            text-sm font-semibold text-red-400
                            transition hover:bg-red-500 hover:text-white
                            ${desktopCollapsed ? "flex justify-center" : "flex items-center justify-center gap-2"}
                        `}
                        title={desktopCollapsed ? "Logout" : ""}
                    >
                        <LogOut className="h-5 w-5 shrink-0" />
                        {!desktopCollapsed && (
                            <span>{loading ? "Logging out..." : "Logout"}</span>
                        )}
                    </button>
                </div>
            </aside>

            {/* Main section */}
            <div
                className={`
                    min-h-screen transition-all duration-300 ease-in-out
                    ${desktopCollapsed ? "lg:ml-24" : "lg:ml-72"}
                `}
            >
                {/* Mobile topbar */}
                <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-800 bg-slate-950/95 px-4 py-4 backdrop-blur-md lg:hidden">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 text-slate-300 transition hover:bg-slate-800 hover:text-white"
                    >
                        <Menu className="h-5 w-5" />
                    </button>

                    <h1 className="text-lg font-semibold text-white">
                        Dashboard
                    </h1>

                    <div className="w-11" />
                </header>

                {/* Page content */}
                <main className="p-4 sm:p-6 lg:p-8">
                    <div className="w-full max-w-full">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
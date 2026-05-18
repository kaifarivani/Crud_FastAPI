import React, { useEffect } from "react";

import {
    Users,
    LogOut,
    ShieldCheck,
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

    const {
        logout,
        loading,
    } = useLogout();

    // VERIFY USER
    useEffect(() => {

        const verifyUser = async () => {

            try {

                const token =
                    localStorage.getItem("token");

                // No token
                if (!token) {

                    navigate("/login");

                    return;
                }

                // VERIFY FROM BACKEND
                await axios.get(
                    "http://localhost:8000/me",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

            } catch (error) {

                console.log(error);

                // REMOVE TOKEN
                localStorage.removeItem("token");

                // REDIRECT LOGIN
                navigate("/login");
            }
        };

        verifyUser();

    }, []);

    const menus = [
        {
            name: " Users",
            path: "/dashboard/users",
            icon: Users,
        },
    ];

    return (

        <div
            className="
                min-h-screen
                bg-gradient-to-br
                from-slate-950
                via-blue-950
                to-slate-900
                flex
                overflow-hidden
                relative
            "
        >

            {/* SIDEBAR */}
            <aside
                className="
                    hidden lg:flex
                    relative z-20
                    w-72
                    bg-white/10
                    backdrop-blur-2xl
                    border-r border-white/10
                    flex-col
                "
            >

                {/* LOGO */}
                <div
                    className="
                        px-8 py-8
                        border-b border-white/10
                    "
                >

                    <div className="flex items-center gap-4">

                        <div
                            className="
                                w-14 h-14
                                rounded-2xl
                                bg-blue-600/20
                                flex items-center justify-center
                            "
                        >

                            <ShieldCheck className="text-blue-400 w-7 h-7" />

                        </div>

                        <div>

                            <h6 className="text-md font-black text-white">
                                Admin Panel
                            </h6>

                            <p className="text-sm text-slate-400">
                                User Management
                            </p>

                        </div>

                    </div>

                </div>

                {/* MENUS */}
                <div
                    className="
                        flex-1
                        px-5 py-8
                        space-y-3
                    "
                >

                    {menus.map((menu) => {

                        const Icon = menu.icon;

                        const active =
                            location.pathname === menu.path;

                        return (

                            <Link
                                key={menu.path}
                                to={menu.path}
                                className={`
                                    group
                                    flex items-center gap-4
                                    rounded-2xl
                                    px-5 py-4
                                    text-sm font-semibold
                                    transition-all duration-300

                                    ${
                                        active
                                            ? `
                                                bg-blue-600
                                                text-white
                                                shadow-2xl
                                              `
                                            : `
                                                text-slate-300
                                                hover:bg-white/10
                                                hover:text-white
                                              `
                                    }
                                `}
                            >

                                <div
                                    className={`
                                        p-2
                                        rounded-xl

                                        ${
                                            active
                                                ? `bg-white/20`
                                                : `
                                                    bg-white/5
                                                    group-hover:bg-white/10
                                                  `
                                        }
                                    `}
                                >

                                    <Icon className="w-5 h-5" />

                                </div>

                                {menu.name}

                            </Link>

                        );
                    })}

                </div>

                {/* LOGOUT */}
                <div
                    className="
                        p-5
                        border-t border-white/10
                    "
                >

                    <button
                        onClick={logout}
                        disabled={loading}
                        className="
                            w-full
                            flex items-center justify-center gap-3
                            rounded-2xl
                            bg-red-500/20
                            px-5 py-4
                            text-red-300
                            font-semibold
                            border border-red-500/20
                            hover:bg-red-500
                            hover:text-white
                            transition-all duration-300
                        "
                    >

                        <LogOut className="w-5 h-5" />

                        {
                            loading
                                ? "Logging out..."
                                : "Logout"
                        }

                    </button>

                </div>

            </aside>

            {/* MAIN */}
            <div
                className="
                    relative z-10
                    flex-1
                    flex flex-col
                "
            >

                <main
                    className="
                        flex-1
                        p-4 sm:p-6 lg:p-8
                        overflow-y-auto
                    "
                >

                    <Outlet />

                </main>

            </div>

        </div>
    );
}
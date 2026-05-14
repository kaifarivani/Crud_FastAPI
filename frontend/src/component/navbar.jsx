import React from "react";

import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    // get token
    const token = localStorage.getItem("token");

    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user_id");

        navigate("/login");
    };

    return (

        <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">

            {/* Logo */}
            <div className="text-3xl font-bold text-blue-600">

                MyApp

            </div>

            {/* Menu */}
            <div className="flex items-center gap-6">

                {/* Public Routes */}
                {!token && (
                    <>
                        <Link
                            to="/"
                            className="text-gray-700 hover:text-blue-600 font-medium transition"
                        >
                            Home
                        </Link>

                        <Link
                            to="/signup"
                            className="text-gray-700 hover:text-blue-600 font-medium transition"
                        >
                            Signup
                        </Link>

                        <Link
                            to="/login"
                            className="text-gray-700 hover:text-blue-600 font-medium transition"
                        >
                            Login
                        </Link>
                    </>
                )}

                {/* Protected Routes */}
                {token && (
                    <>
                        <Link
                            to="/dashboard"
                            className="text-gray-700 hover:text-blue-600 font-medium transition"
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/users"
                            className="text-gray-700 hover:text-blue-600 font-medium transition"
                        >
                            Users
                        </Link>

                        <Link
                            to="/add-user"
                            className="text-gray-700 hover:text-blue-600 font-medium transition"
                        >
                            Add User
                        </Link>

                        <Link
                            to="/restore-user"
                            className="text-gray-700 hover:text-blue-600 font-medium transition"
                        >
                            Restore User
                        </Link>

                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition"
                        >
                            Logout
                        </button>
                    </>
                )}

            </div>
        </nav>
    );
}

export default Navbar;
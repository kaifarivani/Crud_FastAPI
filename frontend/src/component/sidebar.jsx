import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <aside className="w-64 min-h-screen bg-gray-900 text-white p-5">

            <h2 className="text-2xl font-bold mb-8">
                Menu
            </h2>

            <nav className="flex flex-col gap-4">

                <Link
                    to="/dashboard"
                    className="hover:bg-gray-700 p-3 rounded-lg transition"
                >
                    Dashboard
                </Link>

                <Link
                    to="/users"
                    className="hover:bg-gray-700 p-3 rounded-lg transition"
                >
                    Users
                </Link>

                <Link
                    to="/add-user"
                    className="hover:bg-gray-700 p-3 rounded-lg transition"
                >
                    Add User
                </Link>

                <Link
                    to="/profile"
                    className="hover:bg-gray-700 p-3 rounded-lg transition"
                >
                    Profile
                </Link>
            </nav>
        </aside>
    );
}

export default Sidebar;
import React from "react";

function Header() {
    return (
        <header className="bg-blue-600 text-white shadow-md">
            <div className="container mx-auto px-5 py-4 flex justify-between items-center">

                <h1 className="text-2xl font-bold">
                    My Dashboard
                </h1>

                <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
                    Logout
                </button>
            </div>
        </header>
    );
}

export default Header;
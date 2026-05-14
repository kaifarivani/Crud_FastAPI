import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Users, Lock } from "lucide-react";

function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center px-6 py-10 overflow-hidden relative">

            {/* Background Glow */}
            <div className="absolute top-[-120px] left-[-120px] w-80 h-80 bg-blue-500/20 blur-3xl rounded-full"></div>
            <div className="absolute bottom-[-120px] right-[-120px] w-96 h-96 bg-indigo-500/20 blur-3xl rounded-full"></div>

            {/* Main Card */}
            <div className="relative z-10 w-full max-w-5xl bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">

                <div className="grid grid-cols-1 lg:grid-cols-2">

                    {/* Left Section */}
                    <div className="p-10 md:p-14 flex flex-col justify-center">

                        <span className="inline-block bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium w-fit mb-6 border border-blue-400/20">
                            Secure Authentication Platform
                        </span>

                        <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">
                            User
                            <span className="block text-blue-400">
                                Management
                            </span>
                            System
                        </h1>

                        <p className="mt-6 text-lg text-gray-300 leading-relaxed">
                            A modern authentication system built with
                            React, Tailwind CSS, and FastAPI.
                            Manage users securely with a sleek dashboard experience.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-5 mt-10">

                            <Link
                                to="/signup"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:scale-105 transition-all duration-300 text-center"
                            >
                                Create Account
                            </Link>

                            <Link
                                to="/login"
                                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:scale-105 transition-all duration-300 text-center"
                            >
                                Login
                            </Link>

                        </div>

                    </div>

                    {/* Right Section */}
                    <div className="bg-white/5 border-l border-white/10 p-10 md:p-14 flex flex-col justify-center">

                        <h2 className="text-3xl font-bold text-white mb-8">
                            Why Choose Us?
                        </h2>

                        <div className="space-y-6">

                            {/* Feature 1 */}
                            <div className="flex items-start gap-4 bg-white/5 p-5 rounded-2xl border border-white/10 hover:bg-white/10 transition duration-300">

                                <div className="bg-blue-500/20 p-3 rounded-xl">
                                    <ShieldCheck className="text-blue-400 w-7 h-7" />
                                </div>

                                <div>
                                    <h3 className="text-white font-semibold text-lg">
                                        Secure Authentication
                                    </h3>

                                    <p className="text-gray-400 mt-1 text-sm">
                                        JWT authentication with encrypted password protection.
                                    </p>
                                </div>

                            </div>

                            {/* Feature 2 */}
                            <div className="flex items-start gap-4 bg-white/5 p-5 rounded-2xl border border-white/10 hover:bg-white/10 transition duration-300">

                                <div className="bg-green-500/20 p-3 rounded-xl">
                                    <Users className="text-green-400 w-7 h-7" />
                                </div>

                                <div>
                                    <h3 className="text-white font-semibold text-lg">
                                        User Management
                                    </h3>

                                    <p className="text-gray-400 mt-1 text-sm">
                                        Easily manage users, profiles, and permissions.
                                    </p>
                                </div>

                            </div>

                            {/* Feature 3 */}
                            <div className="flex items-start gap-4 bg-white/5 p-5 rounded-2xl border border-white/10 hover:bg-white/10 transition duration-300">

                                <div className="bg-purple-500/20 p-3 rounded-xl">
                                    <Lock className="text-purple-400 w-7 h-7" />
                                </div>

                                <div>
                                    <h3 className="text-white font-semibold text-lg">
                                        Modern UI Experience
                                    </h3>

                                    <p className="text-gray-400 mt-1 text-sm">
                                        Responsive and professional design powered by Tailwind CSS.
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Footer */}
                <div className="border-t border-white/10 py-5 text-center text-gray-400 text-sm bg-black/10">
                    © 2026 User Management System • Built with React & FastAPI
                </div>

            </div>

        </div>
    );
}

export default Home;
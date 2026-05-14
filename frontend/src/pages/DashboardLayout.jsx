import Header from "../component/header";
import Sidebar from "../component/sidebar";

import { Outlet } from "react-router-dom";
import {
    Bell,
    Search,
    ChevronRight,
} from "lucide-react";

export function DashboardLayout() {

    return (

        <div className="min-h-screen bg-[#0f172a] flex overflow-hidden">

            {/* ================= SIDEBAR ================= */}
            <aside className="w-72 fixed top-0 left-0 h-screen bg-[#020617] border-r border-slate-800 shadow-2xl z-50">

                {/* Logo Area */}
                <div className="h-20 flex items-center px-8 border-b border-slate-800">

                    <div>

                        <h1 className="text-2xl font-black tracking-wide text-white">
                            Admin<span className="text-blue-500">Panel</span>
                        </h1>

                        <p className="text-xs text-slate-400 mt-1">
                            User Management System
                        </p>

                    </div>

                </div>

                {/* Sidebar Component */}
                <div className="h-[calc(100vh-80px)] overflow-y-auto px-4 py-6">

                    <Sidebar />

                </div>

            </aside>

            {/* ================= MAIN AREA ================= */}
            <div className="flex-1 ml-72 flex flex-col min-h-screen">

                {/* ================= TOP HEADER ================= */}
                <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-900/70 border-b border-slate-800">

                    <div className="h-20 px-8 flex items-center justify-between">

                        {/* Left Side */}
                        <div>

                            <h2 className="text-2xl font-bold text-white">
                                Dashboard
                            </h2>

                            <div className="flex items-center gap-2 mt-1 text-sm text-slate-400">

                                <span>Home</span>

                                <ChevronRight size={14} />

                                <span className="text-blue-400">
                                    Dashboard
                                </span>

                            </div>

                        </div>

                        {/* Right Side */}
                        <div className="flex items-center gap-5">

                            {/* Search Box */}
                            <div className="hidden md:flex items-center bg-slate-800 border border-slate-700 rounded-2xl px-4 h-12 w-80">

                                <Search
                                    size={18}
                                    className="text-slate-400"
                                />

                                <input
                                    type="text"
                                    placeholder="Search anything..."
                                    className="bg-transparent outline-none px-3 text-sm text-white w-full placeholder:text-slate-500"
                                />

                            </div>

                            {/* Notification */}
                            <button className="relative w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-slate-700 transition">

                                <Bell
                                    size={20}
                                    className="text-slate-300"
                                />

                                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full"></span>

                            </button>

                            {/* Profile */}
                            <div className="flex items-center gap-3 bg-slate-800 border border-slate-700 px-4 py-2 rounded-2xl">

                                <img
                                    src="https://i.pravatar.cc/100"
                                    alt="profile"
                                    className="w-11 h-11 rounded-xl object-cover"
                                />

                                <div className="hidden sm:block">

                                    <h4 className="text-sm font-semibold text-white">
                                        Admin User
                                    </h4>

                                    <p className="text-xs text-slate-400">
                                        Administrator
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </header>

                {/* ================= CONTENT ================= */}
                <main className="flex-1 p-8 overflow-y-auto">

                    {/* HERO SECTION */}
                    <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-10 shadow-2xl">

                        {/* Glow Effects */}
                        <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

                        <div className="absolute bottom-0 left-0 w-60 h-60 bg-cyan-400/10 rounded-full blur-3xl"></div>

                        {/* Content */}
                        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">

                            <div>

                                <span className="inline-block bg-white/20 text-blue-100 px-4 py-2 rounded-full text-sm font-medium border border-white/20 mb-5">
                                    Welcome Back 👋
                                </span>

                                <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">

                                    Modern Admin
                                    <span className="block mt-2 text-blue-100">
                                        Dashboard UI
                                    </span>

                                </h1>

                                <p className="mt-5 text-blue-100 text-lg max-w-2xl leading-relaxed">

                                    Manage users, monitor authentication,
                                    track system activity, and control your
                                    application with a premium dashboard experience.

                                </p>

                                {/* Buttons */}
                                <div className="flex flex-wrap gap-4 mt-8">

                                    <button className="bg-white text-slate-900 px-7 py-4 rounded-2xl font-semibold shadow-lg hover:scale-105 transition-all duration-300">
                                        Explore Dashboard
                                    </button>

                                    <button className="bg-white/10 border border-white/20 backdrop-blur-lg text-white px-7 py-4 rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300">
                                        View Analytics
                                    </button>

                                </div>

                            </div>

                            {/* Right Side Card */}
                            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 min-w-[320px] shadow-2xl">

                                <h3 className="text-white text-xl font-bold">
                                    System Status
                                </h3>

                                <div className="space-y-5 mt-6">

                                    <div className="flex items-center justify-between">

                                        <span className="text-blue-100">
                                            Active Users
                                        </span>

                                        <span className="text-white font-bold">
                                            1,240
                                        </span>

                                    </div>

                                    <div className="flex items-center justify-between">

                                        <span className="text-blue-100">
                                            Security
                                        </span>

                                        <span className="text-green-400 font-bold">
                                            Protected
                                        </span>

                                    </div>

                                    <div className="flex items-center justify-between">

                                        <span className="text-blue-100">
                                            Server Status
                                        </span>

                                        <span className="text-green-400 font-bold">
                                            Online
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* PAGE CONTENT */}
                    <div className="mt-8 bg-slate-900 border border-slate-800 rounded-[30px] p-6 shadow-2xl min-h-[600px]">

                        <Outlet />

                    </div>

                </main>

            </div>

        </div>

    );
}
import React from "react";
import { Link } from "react-router-dom";
import {
    ShieldCheck,
    Users,
    Lock,
    ArrowRight,
} from "lucide-react";

export function Home() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
            {/* Background accents */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.12),transparent_30%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(15,23,42,0.92),rgba(2,6,23,1))]" />
            </div>

            <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
                    {/* Left content */}
                    <section className="flex flex-col justify-center">
                        <span className="mb-5 inline-flex w-fit items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-xs font-medium tracking-wide text-blue-300 sm:text-sm">
                            Secure Authentication Platform
                        </span>

                        <h1 className="max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                            Modern user access
                            <span className="block text-blue-400">
                                and account control
                            </span>
                        </h1>

                        <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                            Manage authentication, users, and account security in one responsive system built for modern web applications with React, Tailwind CSS, and FastAPI.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link
                                to="/signup"
                                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:text-base"
                            >
                                Create Account
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>

                            <Link
                                to="/login"
                                className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900 px-6 py-3.5 text-sm font-semibold text-slate-200 transition hover:bg-slate-800 sm:text-base"
                            >
                                Login
                            </Link>
                        </div>

                        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                                <p className="text-2xl font-bold text-white">JWT</p>
                                <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                                    Secure token-based authentication
                                </p>
                            </div>

                            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                                <p className="text-2xl font-bold text-white">Role</p>
                                <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                                    Permission and access control
                                </p>
                            </div>

                            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                                <p className="text-2xl font-bold text-white">Fast</p>
                                <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                                    Responsive admin experience
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Right content */}
                    <section className="flex items-center">
                        <div className="w-full rounded-3xl border border-slate-800 bg-slate-900/90 p-5 shadow-2xl sm:p-6 lg:p-8">
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-bold text-white sm:text-2xl">
                                        Why choose this system
                                    </h2>
                                    <p className="mt-1 text-sm text-slate-400">
                                        Built for secure and scalable user management.
                                    </p>
                                </div>

                                <div className="hidden h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 sm:flex">
                                    <ShieldCheck className="h-6 w-6 text-blue-400" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-5">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10">
                                            <ShieldCheck className="h-5 w-5 text-blue-400" />
                                        </div>

                                        <div>
                                            <h3 className="text-base font-semibold text-white sm:text-lg">
                                                Secure authentication
                                            </h3>
                                            <p className="mt-1 text-sm leading-6 text-slate-400">
                                                Protect accounts with JWT-based login flows, encrypted passwords, and secure API access patterns.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-5">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                                            <Users className="h-5 w-5 text-emerald-400" />
                                        </div>

                                        <div>
                                            <h3 className="text-base font-semibold text-white sm:text-lg">
                                                Professional user management
                                            </h3>
                                            <p className="mt-1 text-sm leading-6 text-slate-400">
                                                Organize accounts, monitor user data, and manage dashboard actions with a clean responsive interface.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-5">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10">
                                            <Lock className="h-5 w-5 text-violet-400" />
                                        </div>

                                        <div>
                                            <h3 className="text-base font-semibold text-white sm:text-lg">
                                                Responsive modern UI
                                            </h3>
                                            <p className="mt-1 text-sm leading-6 text-slate-400">
                                                Deliver a polished experience across desktop, tablet, and mobile with structured layout and readable components.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 rounded-2xl border border-blue-500/10 bg-blue-500/5 p-4">
                                <p className="text-sm leading-6 text-slate-300">
                                    Designed for admin panels, authentication modules, and scalable account systems where clarity and control matter.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <footer className="relative z-10 border-t border-slate-800 bg-slate-950/90 px-4 py-4 text-center text-xs text-slate-500 sm:text-sm">
                © 2026 User Management System • Built with React & FastAPI
            </footer>
        </div>
    );
}
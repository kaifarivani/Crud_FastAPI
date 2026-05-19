import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Mail,
    Lock,
    ShieldCheck,
    ArrowRight,
    Eye,
    EyeOff,
} from "lucide-react";
import { useSignin } from "../api/hooks/useSignin";

export default function Signin() {
    const {
        data,
        loading,
        error,
        handleChange,
        handleSubmit,
    } = useSignin();

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center px-4 py-6">
            <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
                {/* Header */}
                <div className="border-b border-slate-800 px-6 pt-6 pb-5 text-center sm:px-8">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/20">
                        <ShieldCheck className="h-7 w-7 text-white" />
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-white">
                        Sign In
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                        Access your dashboard securely with your email and password.
                    </p>
                </div>

                {/* Form */}
                <div className="p-6 sm:p-8">
                    {error && (
                        <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email */}
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-slate-200"
                            >
                                Email Address
                            </label>

                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    autoComplete="email"
                                    required
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-slate-200"
                            >
                                Password
                            </label>

                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={data.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    required
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-11 pr-12 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-white"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Remember */}
                        <div className="flex items-center justify-between pt-1">
                            <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-blue-600 focus:ring-blue-500"
                                />
                                Remember me
                            </label>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`group flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition ${
                                loading
                                    ? "cursor-not-allowed bg-slate-700"
                                    : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        >
                            {loading ? (
                                "Signing In..."
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 border-t border-slate-800 pt-5 text-center">
                        <p className="text-sm text-slate-400">
                            Don’t have an account?{" "}
                            <Link
                                to="/signup"
                                className="font-semibold text-blue-400 transition hover:text-blue-300"
                            >
                                Create Account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
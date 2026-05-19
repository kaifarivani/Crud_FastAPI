import React from "react";

import {
    Mail,
    User,
    ArrowRight,
    ShieldCheck,
} from "lucide-react";

import { useUpdateUser } from "../api/hooks/useUpdateUser";

export default function UpdateUser() {

    const {
        data,
        loading,
        error,
        success,
        handleChange,
        handleSubmit,
    } = useUpdateUser();

    return (
        <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center px-4 py-6">

            {/* Card */}
            <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">

                {/* Header */}
                <div className="border-b border-slate-800 px-6 pt-6 pb-5 text-center sm:px-8">

                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/20">
                        <ShieldCheck className="h-7 w-7 text-white" />
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-white">
                        Update User
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                        Update and manage user information securely and professionally.
                    </p>

                </div>

                {/* Form */}
                <div className="p-6 sm:p-8">

                    {/* Success */}
                    {success && (
                        <div className="mb-4 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-300">
                            {success}
                        </div>
                    )}

                    {/* Error */}
                    {error && (
                        <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                            {error}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >

                        {/* Username */}
                        <div className="space-y-2">

                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-slate-200"
                            >
                                Username
                            </label>

                            <div className="relative">

                                <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                                <input
                                    id="username"
                                    type="text"
                                    name="username"
                                    value={data.username}
                                    onChange={handleChange}
                                    placeholder="Enter username"
                                    required
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                />

                            </div>

                        </div>

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
                                    placeholder="Enter email"
                                    required
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                                />

                            </div>

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
                                "Updating..."
                            ) : (
                                <>
                                    Update User

                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </>
                            )}

                        </button>

                    </form>

                    {/* Footer */}
                    <div className="mt-6 border-t border-slate-800 pt-5 text-center">

                        <p className="text-sm text-slate-400">
                            Securely manage and update user details anytime.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}
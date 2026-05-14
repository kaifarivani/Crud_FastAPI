import React from "react";
import { Link } from "react-router-dom";
import { useSignin } from "../api/hooks/useSignin";

export default function Signin() {
    const {
        data,
        loading,
        error,
        handleChange,
        handleSubmit,
    } = useSignin();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4 py-10">

            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">

                {/* Top Section */}
                <div className="bg-gradient-to-r from-blue-200 to-indigo-400 px-8 py-10 text-center">

                  

                    <h1 className="text-3xl font-bold text-white">
                        Welcome Back
                    </h1>

                    <p className="text-blue-100 mt-2 text-sm">
                        Sign in to continue to your dashboard
                    </p>
                </div>

                {/* Form Section */}
                <div className="p-8">

                    {/* Error Message */}
                    {error && (
                        <div className="mb-5 rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}<form
    onSubmit={handleSubmit}
    className="space-y-6"
>

    {/* Email Field */}
    <div className="space-y-2">

        <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700"
        >
            Email Address
        </label>

        <input
            id="email"
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Enter your email"
            autoComplete="email"
            required
            className="
                w-full rounded-2xl border border-gray-300
                bg-gray-50 px-4 py-3 text-sm text-gray-700
                outline-none transition-all duration-300
                focus:border-blue-500 focus:bg-white
                focus:ring-4 focus:ring-blue-100
            "
        />
    </div>

    {/* Password Field */}
    <div className="space-y-2">

        <div className="flex items-center justify-between">

            <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700"
            >
                Password
            </label>

            <button
                type="button"
                className="
                    text-sm font-medium text-blue-600
                    transition hover:text-blue-700 hover:underline
                "
            >
                Forgot Password?
            </button>

        </div>

        <input
            id="password"
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            className="
                w-full rounded-2xl border border-gray-300
                bg-gray-50 px-4 py-3 text-sm text-gray-700
                outline-none transition-all duration-300
                focus:border-blue-500 focus:bg-white
                focus:ring-4 focus:ring-blue-100
            "
        />
    </div>

    {/* Remember Me */}
    <div className="flex items-center justify-between">

        <label className="flex items-center gap-3 cursor-pointer">

            <input
                type="checkbox"
                className="
                    h-4 w-4 rounded border-gray-300
                    text-blue-600 focus:ring-blue-500
                "
            />

            <span className="text-sm text-gray-600">
                Remember me
            </span>

        </label>

    </div>

    {/* Submit Button */}
    <button
        type="submit"
        disabled={loading}
        className={`
            w-full rounded-2xl py-3.5
            text-sm font-semibold text-white
            shadow-lg transition-all duration-300
            
            ${
                loading
                    ? "cursor-not-allowed bg-gray-400"
                    : `
                        bg-gradient-to-r from-blue-600 to-indigo-600
                        hover:scale-[1.01]
                        hover:shadow-2xl
                    `
            }
        `}
    >
        {loading ? "Signing In..." : "Sign In"}
    </button>

</form>
                    {/* Footer */}
                    <p className="mt-8 text-center text-sm text-gray-500">

                        Don’t have an account?{" "}

                        <Link
                            to="/signup"
                            className="font-semibold text-blue-600 hover:text-blue-700"
                        >
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
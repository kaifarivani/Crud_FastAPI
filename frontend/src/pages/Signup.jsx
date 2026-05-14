import { Link } from "react-router-dom";
import { useState } from "react";
import { useSignup } from "../api/hooks/useSignup";

function Signup() {

    const {
        handleSubmit,
        handleChange,
        data,
        loading,
        error,
    } = useSignup();

    // Show / Hide Password States
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4 py-10">

            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">

                {/* Top Section */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-10 text-center">

                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <span className="text-3xl text-white font-bold">
                            👤
                        </span>
                    </div>

                    <h1 className="text-3xl font-bold text-white">
                        Create Account
                    </h1>

                    <p className="text-blue-100 mt-2 text-sm">
                        Signup to access your dashboard
                    </p>
                </div>

                {/* Form Section */}
                <div className="p-8">

                    {/* Error */}
                    {error && (
                        <div className="mb-5 rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Username */}
                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Username
                            </label>

                            <input
                                type="text"
                                name="username"
                                value={data.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-700 outline-none transition-all duration-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            />
                        </div>

                        {/* Email */}
                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-700 outline-none transition-all duration-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            />
                        </div>

                        {/* Password */}
                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </label>

                            <div className="relative">

                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={data.password}
                                    onChange={handleChange}
                                    placeholder="Create password"
                                    className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 pr-16 text-gray-700 outline-none transition-all duration-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-blue-600 hover:text-blue-700"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>

                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Confirm Password
                            </label>

                            <div className="relative">

                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={data.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm your password"
                                    className="w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 pr-16 text-gray-700 outline-none transition-all duration-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(!showConfirmPassword)
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-blue-600 hover:text-blue-700"
                                >
                                    {showConfirmPassword ? "Hide" : "Show"}
                                </button>

                            </div>
                        </div>

                        {/* Terms */}
                        <div className="flex items-start gap-3">

                            <input
                                type="checkbox"
                                className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />

                            <p className="text-sm text-gray-500 leading-relaxed">
                                I agree to the{" "}
                                <span className="text-blue-600 font-medium cursor-pointer hover:underline">
                                    Terms & Conditions
                                </span>{" "}
                                and{" "}
                                <span className="text-blue-600 font-medium cursor-pointer hover:underline">
                                    Privacy Policy
                                </span>
                            </p>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full rounded-2xl py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300
                    
                                ${
                                    loading
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.01] hover:shadow-xl"
                                }
                            `}
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="mt-8 text-center text-sm text-gray-500">

                        Already have an account?{" "}

                        <Link
                            to="/"
                            className="font-semibold text-blue-600 hover:text-blue-700"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
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

    // Password Toggle State
    const [showPassword, setShowPassword] =
        useState(false);

    return (

        <div className="
            min-h-screen w-full
            bg-gradient-to-br
            from-slate-950
            via-blue-950
            to-slate-900
            flex items-center justify-center
            px-4 py-8
            overflow-hidden
            relative
        ">

            {/* Background Glow */}
            <div className="
                absolute top-[-120px] left-[-120px]
                w-80 h-80
                bg-blue-500/20
                blur-3xl rounded-full
            "></div>

            <div className="
                absolute bottom-[-120px] right-[-120px]
                w-96 h-96
                bg-indigo-500/20
                blur-3xl rounded-full
            "></div>

            {/* Card */}
            <div className="
                relative z-10
                w-full max-w-md
                bg-white/10
                backdrop-blur-2xl
                border border-white/20
                rounded-3xl
                shadow-2xl
                overflow-hidden
            ">

                {/* Header */}
                <div className="
                    px-8 pt-10 pb-8
                    text-center
                    border-b border-white/10
                    bg-white/5
                ">

                    <div className="
                        mx-auto mb-6
                        flex items-center justify-center
                        w-20 h-20
                        rounded-3xl
                        bg-gradient-to-br
                        from-blue-500 to-indigo-600
                        shadow-xl
                    ">
                        <ShieldCheck className="w-10 h-10 text-white" />
                    </div>

                    <h1 className="
                        text-4xl
                        font-black
                        text-white
                        tracking-tight
                    ">
                        Welcome Back
                    </h1>

                    <p className="
                        mt-3
                        text-sm
                        text-gray-300
                        leading-relaxed
                    ">
                        Sign in to continue accessing your
                        secure dashboard and manage your account.
                    </p>

                </div>

                {/* Form */}
                <div className="p-8">

                    {/* Error */}
                    {error && (
                        <div className="
                            mb-6
                            rounded-2xl
                            border border-red-400/30
                            bg-red-500/10
                            px-4 py-3
                            text-sm
                            text-red-300
                            backdrop-blur-sm
                        ">
                            {error}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        {/* Email */}
                        <div className="space-y-2">

                            <label
                                htmlFor="email"
                                className="
                                    text-sm
                                    font-semibold
                                    text-gray-200
                                    block
                                "
                            >
                                Email Address
                            </label>

                            <div className="relative">

                                <Mail className="
                                    absolute left-4 top-1/2
                                    -translate-y-1/2
                                    w-5 h-5
                                    text-gray-400
                                " />

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
                                        w-full
                                        rounded-2xl
                                        border border-white/10
                                        bg-white/5
                                        py-3.5 pl-12 pr-4
                                        text-sm text-white
                                        placeholder:text-gray-400
                                        outline-none
                                        transition-all duration-300

                                        focus:border-blue-400
                                        focus:bg-white/10
                                        focus:ring-4
                                        focus:ring-blue-500/20
                                    "
                                />

                            </div>

                        </div>

                        {/* Password */}
                        <div className="space-y-2">

                            <label
                                htmlFor="password"
                                className="
                                    text-sm
                                    font-semibold
                                    text-gray-200
                                "
                            >
                                Password
                            </label>

                            <div className="relative">

                                <Lock className="
                                    absolute left-4 top-1/2
                                    -translate-y-1/2
                                    w-5 h-5
                                    text-gray-400
                                " />

                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    value={data.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    required
                                    className="
                                        w-full
                                        rounded-2xl
                                        border border-white/10
                                        bg-white/5
                                        py-3.5 pl-12 pr-14
                                        text-sm text-white
                                        placeholder:text-gray-400
                                        outline-none
                                        transition-all duration-300

                                        focus:border-blue-400
                                        focus:bg-white/10
                                        focus:ring-4
                                        focus:ring-blue-500/20
                                    "
                                />

                                {/* Eye Button */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    className="
                                        absolute
                                        right-4 top-1/2
                                        -translate-y-1/2
                                        text-gray-400
                                        hover:text-white
                                        transition
                                    "
                                >

                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}

                                </button>

                            </div>

                        </div>

                        {/* Remember */}
                        <div className="
                            flex items-center justify-between
                            gap-4
                        ">

                            <label className="
                                flex items-center gap-3
                                cursor-pointer
                            ">

                                <input
                                    type="checkbox"
                                    className="
                                        h-4 w-4
                                        rounded
                                        border-gray-300
                                        text-blue-600
                                        focus:ring-blue-500
                                    "
                                />

                                <span className="
                                    text-sm text-gray-300
                                ">
                                    Remember me
                                </span>

                            </label>

                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`
                                group
                                w-full
                                rounded-2xl
                                py-3.5 px-5

                                flex items-center justify-center gap-2

                                text-sm font-semibold
                                text-white

                                shadow-2xl
                                transition-all duration-300

                                ${
                                    loading
                                        ? `
                                            cursor-not-allowed
                                            bg-gray-500
                                          `
                                        : `
                                            bg-gradient-to-r
                                            from-blue-600
                                            to-indigo-600

                                            hover:scale-[1.02]
                                            hover:shadow-blue-500/30
                                          `
                                }
                            `}
                        >

                            {loading ? (
                                "Signing In..."
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="
                                        w-4 h-4
                                        transition-transform
                                        group-hover:translate-x-1
                                    " />
                                </>
                            )}

                        </button>

                    </form>

                    {/* Footer */}
                    <div className="
                        mt-8 pt-6
                        border-t border-white/10
                        text-center
                    ">

                        <p className="
                            text-sm text-gray-400
                        ">
                            Don’t have an account?{" "}

                            <Link
                                to="/signup"
                                className="
                                    font-semibold
                                    text-blue-400
                                    hover:text-blue-300
                                    transition
                                "
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
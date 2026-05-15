import React, { useState } from "react";

import {
    User,
    Mail,
    Lock,
    UserPlus,
    CheckCircle2,
    AlertCircle,
    ArrowRight,
    Eye,
    EyeOff,
} from "lucide-react";

import { useAddUser } from "../api/hooks/useAddUser";

export function AddUser() {

    const {
        data,
        loading,
        error,
        success,
        handleChange,
        handleSubmit,
    } = useAddUser();

    // Password Visibility States
    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (

        <div
            className="
                min-h-screen
                w-full

                bg-gradient-to-br
                from-slate-950
                via-blue-950
                to-slate-900

                flex items-center justify-center

                px-4 sm:px-6
                py-8

                relative
                overflow-hidden
            "
        >

            {/* Background Glow */}
            <div
                className="
                    absolute
                    top-[-120px]
                    left-[-120px]

                    w-72 h-72
                    sm:w-80 sm:h-80

                    bg-blue-500/20
                    blur-3xl
                    rounded-full
                "
            />

            <div
                className="
                    absolute
                    bottom-[-120px]
                    right-[-120px]

                    w-80 h-80
                    sm:w-96 sm:h-96

                    bg-indigo-500/20
                    blur-3xl
                    rounded-full
                "
            />

            {/* Main Card */}
            <div
                className="
                    relative z-10

                    w-full
                    max-w-lg

                    rounded-3xl

                    border border-white/20

                    bg-white/10
                    backdrop-blur-2xl

                    shadow-2xl

                    overflow-hidden
                "
            >

                {/* Header */}
                <div
                    className="
                        border-b border-white/10

                        bg-white/5

                        px-6 sm:px-8
                        pt-10 pb-8

                        text-center
                    "
                >

                    {/* Icon */}
                    <div
                        className="
                            mx-auto

                            flex items-center justify-center

                            w-20 h-20

                            rounded-3xl

                            bg-gradient-to-br
                            from-blue-500
                            to-indigo-600

                            shadow-2xl
                        "
                    >
                        <UserPlus className="w-10 h-10 text-white" />
                    </div>

                    <h1
                        className="
                            mt-6

                            text-3xl sm:text-4xl

                            font-black
                            tracking-tight

                            text-white
                        "
                    >
                        Add New User
                    </h1>

                    <p
                        className="
                            mt-3

                            text-sm sm:text-base

                            leading-relaxed
                            text-gray-300
                        "
                    >
                        Create and manage user accounts securely
                        with your authentication system.
                    </p>

                </div>

                {/* Form Section */}
                <div
                    className="
                        p-6 sm:p-8
                    "
                >

                    {/* Success Message */}
                    {success && (

                        <div
                            className="
                                mb-5

                                flex items-start gap-3

                                rounded-2xl

                                border border-green-400/20

                                bg-green-500/10

                                px-4 py-3

                                text-sm
                                text-green-300
                            "
                        >

                            <CheckCircle2
                                className="
                                    mt-0.5
                                    w-5 h-5
                                    shrink-0
                                "
                            />

                            <p>{success}</p>

                        </div>

                    )}

                    {/* Error Message */}
                    {error && (

                        <div
                            className="
                                mb-5

                                flex items-start gap-3

                                rounded-2xl

                                border border-red-400/20

                                bg-red-500/10

                                px-4 py-3

                                text-sm
                                text-red-300
                            "
                        >

                            <AlertCircle
                                className="
                                    mt-0.5
                                    w-5 h-5
                                    shrink-0
                                "
                            />

                            <p>{error}</p>

                        </div>

                    )}

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Username */}
                        <div className="space-y-2">

                            <label
                                className="
                                    text-sm
                                    font-semibold
                                    text-gray-200
                                    block
                                "
                            >
                                Username
                            </label>

                            <div className="relative">

                                <User
                                    className="
                                        absolute
                                        left-4 top-1/2
                                        -translate-y-1/2

                                        w-5 h-5
                                        text-gray-400
                                    "
                                />

                                <input
                                    type="text"
                                    name="username"
                                    value={data.username}
                                    onChange={handleChange}
                                    placeholder="Enter username"
                                    required
                                    className="
                                        w-full
                                        rounded-2xl
                                        border border-white/10
                                        bg-white/5
                                        py-3.5
                                        pl-12 pr-4
                                        text-sm
                                        text-white
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

                        {/* Email */}
                        <div className="space-y-2">

                            <label
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

                                <Mail
                                    className="
                                        absolute
                                        left-4 top-1/2
                                        -translate-y-1/2

                                        w-5 h-5
                                        text-gray-400
                                    "
                                />

                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    placeholder="Enter email address"
                                    required
                                    className="
                                        w-full
                                        rounded-2xl
                                        border border-white/10
                                        bg-white/5
                                        py-3.5
                                        pl-12 pr-4
                                        text-sm
                                        text-white
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
                                className="
                                    text-sm
                                    font-semibold
                                    text-gray-200
                                    block
                                "
                            >
                                Password
                            </label>

                            <div className="relative">

                                <Lock
                                    className="
                                        absolute
                                        left-4 top-1/2
                                        -translate-y-1/2
                                        w-5 h-5
                                        text-gray-400
                                    "
                                />

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    value={data.password}
                                    onChange={handleChange}
                                    placeholder="Enter password"
                                    required
                                    className="
                                        w-full
                                        rounded-2xl
                                        border border-white/10
                                        bg-white/5
                                        py-3.5
                                        pl-12 pr-12
                                        text-sm
                                        text-white
                                        placeholder:text-gray-400
                                        outline-none
                                        transition-all duration-300
                                        focus:border-blue-400
                                        focus:bg-white/10
                                        focus:ring-4
                                        focus:ring-blue-500/20
                                    "
                                />

                                {/* Toggle Password */}
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

                        {/* Confirm Password */}
                        <div className="space-y-2">

                            <label
                                className="
                                    text-sm
                                    font-semibold
                                    text-gray-200
                                    block
                                "
                            >
                                Confirm Password
                            </label>

                            <div className="relative">

                                <Lock
                                    className="
                                        absolute
                                        left-4 top-1/2
                                        -translate-y-1/2
                                        w-5 h-5
                                        text-gray-400
                                    "
                                />

                                <input
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="confirmPassword"
                                    value={data.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm password"
                                    required
                                    className="
                                        w-full
                                        rounded-2xl
                                        border border-white/10
                                        bg-white/5
                                        py-3.5
                                        pl-12 pr-12
                                        text-sm
                                        text-white
                                        placeholder:text-gray-400
                                        outline-none
                                        transition-all duration-300
                                        focus:border-blue-400
                                        focus:bg-white/10
                                        focus:ring-4
                                        focus:ring-blue-500/20
                                    "
                                />

                                {/* Toggle Confirm Password */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
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
                                    {showConfirmPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>

                            </div>

                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`
                                group
                                mt-2
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
                                "Creating User..."
                            ) : (
                                <>
                                    Add User

                                    <ArrowRight
                                        className="
                                            w-4 h-4
                                            transition-transform
                                            group-hover:translate-x-1
                                        "
                                            />
                                        
                                </>
                            )}

                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}
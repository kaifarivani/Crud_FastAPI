import { Link } from "react-router-dom";
import { useState } from "react";

import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ShieldCheck,
    ArrowRight,
    AlertCircle,
} from "lucide-react";

import { useSignup } from "../api/hooks/useSignup";

function Signup() {
    const { handleSubmit, handleChange, data, loading, error } = useSignup();

    // Password Visibility
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

                overflow-hidden
                relative
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
                    max-w-md

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
                    {/* Logo */}
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
                        <ShieldCheck className="w-10 h-10 text-white" />
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
                        Create Account
                    </h1>

                    <p
                        className="
                            mt-3

                            text-sm sm:text-base

                            leading-relaxed
                            text-gray-300
                        "
                    >
                        Create your account to access your secure dashboard and manage users
                        professionally.
                    </p>
                </div>

                {/* Form Section */}
                <div
                    className="
                        p-6 sm:p-8
                    "
                >
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
                    <form onSubmit={handleSubmit} className="space-y-5">
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
                                    placeholder="Enter your email"
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
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={data.password}
                                    onChange={handleChange}
                                    placeholder="Create password"
                                    required
                                    className="
                                        w-full

                                        rounded-2xl

                                        border border-white/10

                                        bg-white/5

                                        py-3.5
                                        pl-12 pr-14

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

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="
                                        absolute
                                        right-4 top-1/2
                                        -translate-y-1/2

                                        text-gray-400

                                        transition
                                        hover:text-white
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
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={data.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm your password"
                                    required
                                    className="
                                        w-full

                                        rounded-2xl

                                        border border-white/10

                                        bg-white/5

                                        py-3.5
                                        pl-12 pr-14

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

                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="
                                        absolute
                                        right-4 top-1/2
                                        -translate-y-1/2

                                        text-gray-400

                                        transition
                                        hover:text-white
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

                        {/* Terms */}
                        <label
                            className="
                                flex items-start gap-3

                                cursor-pointer
                            "
                        >
                            <input
                                type="checkbox"
                                required
                                className="
                                    mt-1

                                    h-4 w-4

                                    rounded

                                    border-gray-300

                                    text-blue-600

                                    focus:ring-blue-500
                                "
                            />

                            <p
                                className="
                                    text-sm
                                    leading-relaxed
                                    text-gray-400
                                "
                            >
                                I agree to the{" "}
                                <span
                                    className="
                                        font-medium
                                        text-blue-400

                                        hover:text-blue-300
                                        hover:underline
                                    "
                                >
                                    Terms & Conditions
                                </span>{" "}
                                and{" "}
                                <span
                                    className="
                                        font-medium
                                        text-blue-400

                                        hover:text-blue-300
                                        hover:underline
                                    "
                                >
                                    Privacy Policy
                                </span>
                            </p>
                        </label>

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

                                ${loading
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
                                "Creating Account..."
                            ) : (
                                <>
                                    Create Account
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

                    {/* Footer */}
                    <div
                        className="
                            mt-8
                            pt-6

                            border-t border-white/10

                            text-center
                        "
                    >
                        <p
                            className="
                                text-sm
                                text-gray-400
                            "
                        >
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="
                                    font-semibold

                                    text-blue-400

                                    transition

                                    hover:text-blue-300
                                "
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;

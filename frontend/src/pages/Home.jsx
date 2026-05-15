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

        <div
            className="
                min-h-screen
                w-full
                bg-gradient-to-br
                from-slate-950
                via-blue-950
                to-slate-900

                flex items-center justify-center

                px-4 sm:px-6 lg:px-8
                py-6 sm:py-10

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
                    w-72 h-72 sm:w-80 sm:h-80
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
                    w-80 h-80 sm:w-96 sm:h-96
                    bg-indigo-500/20
                    blur-3xl
                    rounded-full
                "
            />

            {/* Main Container */}
            <div
                className="
                    relative z-10

                    w-full
                    max-w-7xl

                    bg-white/10
                    backdrop-blur-2xl

                    border border-white/20

                    rounded-3xl
                    shadow-2xl

                    overflow-hidden
                "
            >

                {/* Content */}
                <div
                    className="
                        grid
                        grid-cols-1
                        lg:grid-cols-2
                    "
                >

                    {/* LEFT SIDE */}
                    <div
                        className="
                            p-6
                            sm:p-10
                            lg:p-14

                            flex flex-col justify-center
                        "
                    >

                        {/* Badge */}
                        <span
                            className="
                                inline-flex
                                items-center

                                w-fit

                                rounded-full
                                border border-blue-400/20

                                bg-blue-500/20

                                px-4 py-2

                                text-xs sm:text-sm
                                font-medium
                                text-blue-300

                                mb-6
                            "
                        >
                            Secure Authentication Platform
                        </span>

                        {/* Heading */}
                        <h1
                            className="
                                text-4xl
                                sm:text-5xl
                                lg:text-6xl

                                font-black
                                leading-tight

                                text-white
                            "
                        >
                            User

                            <span className="block text-blue-400">
                                Management
                            </span>

                            System
                        </h1>

                        {/* Description */}
                        <p
                            className="
                                mt-6

                                text-base
                                sm:text-lg

                                leading-relaxed
                                text-gray-300

                                max-w-xl
                            "
                        >
                            A modern authentication system built with
                            React, Tailwind CSS, and FastAPI.

                            Securely manage users with a professional,
                            scalable, and responsive dashboard experience.
                        </p>

                        {/* Buttons */}
                        <div
                            className="
                                mt-10

                                flex
                                flex-col
                                sm:flex-row

                                gap-4 sm:gap-5
                            "
                        >

                            {/* Signup */}
                            <Link
                                to="/signup"
                                className="
                                    group

                                    flex items-center justify-center gap-2

                                    rounded-2xl

                                    bg-blue-600
                                    px-7 py-4

                                    text-base sm:text-lg
                                    font-semibold
                                    text-white

                                    shadow-xl

                                    transition-all duration-300

                                    hover:scale-[1.02]
                                    hover:bg-blue-700
                                "
                            >
                                Create Account

                                <ArrowRight
                                    className="
                                        w-5 h-5
                                        transition-transform
                                        group-hover:translate-x-1
                                    "
                                />
                            </Link>

                            {/* Login */}
                            <Link
                                to="/login"
                                className="
                                    rounded-2xl

                                    border border-white/20

                                    bg-white/10
                                    px-7 py-4

                                    text-base sm:text-lg
                                    font-semibold
                                    text-white

                                    shadow-xl

                                    text-center

                                    transition-all duration-300

                                    hover:scale-[1.02]
                                    hover:bg-white/20
                                "
                            >
                                Login
                            </Link>

                        </div>

                    </div>

                    {/* RIGHT SIDE */}
                    <div
                        className="
                            bg-white/5

                            border-t
                            lg:border-t-0

                            lg:border-l

                            border-white/10

                            p-6
                            sm:p-10
                            lg:p-14

                            flex flex-col justify-center
                        "
                    >

                        <h2
                            className="
                                text-2xl
                                sm:text-3xl

                                font-bold
                                text-white

                                mb-8
                            "
                        >
                            Why Choose Us?
                        </h2>

                        {/* Features */}
                        <div className="space-y-5">

                            {/* Feature 1 */}
                            <div
                                className="
                                    flex items-start gap-4

                                    rounded-2xl

                                    border border-white/10
                                    bg-white/5

                                    p-5

                                    transition-all duration-300

                                    hover:bg-white/10
                                "
                            >

                                <div
                                    className="
                                        rounded-xl
                                        bg-blue-500/20
                                        p-3
                                    "
                                >
                                    <ShieldCheck
                                        className="
                                            w-6 h-6 sm:w-7 sm:h-7
                                            text-blue-400
                                        "
                                    />
                                </div>

                                <div>

                                    <h3
                                        className="
                                            text-base sm:text-lg
                                            font-semibold
                                            text-white
                                        "
                                    >
                                        Secure Authentication
                                    </h3>

                                    <p
                                        className="
                                            mt-1
                                            text-sm
                                            leading-relaxed
                                            text-gray-400
                                        "
                                    >
                                        JWT authentication with encrypted
                                        password protection and secure APIs.
                                    </p>

                                </div>

                            </div>

                            {/* Feature 2 */}
                            <div
                                className="
                                    flex items-start gap-4

                                    rounded-2xl

                                    border border-white/10
                                    bg-white/5

                                    p-5

                                    transition-all duration-300

                                    hover:bg-white/10
                                "
                            >

                                <div
                                    className="
                                        rounded-xl
                                        bg-green-500/20
                                        p-3
                                    "
                                >
                                    <Users
                                        className="
                                            w-6 h-6 sm:w-7 sm:h-7
                                            text-green-400
                                        "
                                    />
                                </div>

                                <div>

                                    <h3
                                        className="
                                            text-base sm:text-lg
                                            font-semibold
                                            text-white
                                        "
                                    >
                                        User Management
                                    </h3>

                                    <p
                                        className="
                                            mt-1
                                            text-sm
                                            leading-relaxed
                                            text-gray-400
                                        "
                                    >
                                        Easily manage user accounts,
                                        permissions, and profile settings.
                                    </p>

                                </div>

                            </div>

                            {/* Feature 3 */}
                            <div
                                className="
                                    flex items-start gap-4

                                    rounded-2xl

                                    border border-white/10
                                    bg-white/5

                                    p-5

                                    transition-all duration-300

                                    hover:bg-white/10
                                "
                            >

                                <div
                                    className="
                                        rounded-xl
                                        bg-purple-500/20
                                        p-3
                                    "
                                >
                                    <Lock
                                        className="
                                            w-6 h-6 sm:w-7 sm:h-7
                                            text-purple-400
                                        "
                                    />
                                </div>

                                <div>

                                    <h3
                                        className="
                                            text-base sm:text-lg
                                            font-semibold
                                            text-white
                                        "
                                    >
                                        Modern UI Experience
                                    </h3>

                                    <p
                                        className="
                                            mt-1
                                            text-sm
                                            leading-relaxed
                                            text-gray-400
                                        "
                                    >
                                        Fully responsive professional
                                        interface powered by Tailwind CSS.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Footer */}
                <div
                    className="
                        border-t border-white/10

                        bg-black/10

                        px-4 py-5

                        text-center

                        text-xs sm:text-sm
                        text-gray-400
                    "
                >
                    © 2026 User Management System •
                    Built with React & FastAPI
                </div>

            </div>

        </div>
    );
}
import React, { useEffect, useState } from "react";

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
    X,
} from "lucide-react";

import { useAddUser } from "../api/hooks/useAddUser";

export function AddUser({
    open,
    setOpen,
}) {

    const {
        data,
        loading,
        error,
        success,
        handleChange,
        handleSubmit,
    } = useAddUser();

    // PASSWORD VISIBILITY
    const [showPassword, setShowPassword] =
        useState(false);

    const [
        showConfirmPassword,
        setShowConfirmPassword,
    ] = useState(false);

    // DISABLE BODY SCROLL
    useEffect(() => {

        if (open) {

            document.body.style.overflow = "hidden";

        } else {

            document.body.style.overflow = "auto";
        }

        return () => {

            document.body.style.overflow = "auto";
        };

    }, [open]);

    // CLOSE MODAL
    if (!open) return null;

    return (

        <div
            className="
                fixed inset-0
                z-[999]

                bg-black/60
                backdrop-blur-md

                flex items-center justify-center

                p-4
            "
        >

            {/* BACKDROP */}
            <div
                className="absolute inset-0"
                onClick={() => setOpen(false)}
            />

            {/* MODAL */}
            <div
                className="
                    relative
                    z-10

                    w-full
                    max-w-3xl

                    rounded-[32px]

                    bg-white/10
                    backdrop-blur-2xl

                    border border-white/10

                    shadow-2xl

                    overflow-hidden

                    animate-in
                    fade-in
                    zoom-in
                    duration-300
                "
            >

                {/* TOP GLOW */}
                <div
                    className="
                        absolute
                        -top-24
                        -right-24

                        w-72 h-72

                        rounded-full

                        bg-blue-500/20

                        blur-3xl
                    "
                />

                {/* CLOSE BUTTON */}
                <button
                    onClick={() => setOpen(false)}
                    className="
                        absolute
                        top-5 right-5

                        z-50

                        w-11 h-11

                        rounded-2xl

                        bg-white/10

                        flex items-center justify-center

                        text-white

                        hover:bg-red-500

                        transition-all duration-300
                    "
                >

                    <X className="w-5 h-5" />

                </button>

                {/* HEADER */}
                <div
                    className="
                        relative

                        px-8 py-8

                        border-b border-white/10

                        bg-gradient-to-r
                        from-blue-600
                        via-indigo-600
                        to-violet-600

                        text-center
                    "
                >

                    {/* ICON */}
                    <div
                        className="
                            mx-auto

                            flex items-center justify-center

                            w-24 h-24

                            rounded-3xl

                            bg-white/20

                            backdrop-blur-md

                            border border-white/20
                        "
                    >

                        <UserPlus className="w-12 h-12 text-white" />

                    </div>

                    <h1
                        className="
                            mt-5

                            text-3xl
                            font-black

                            tracking-tight

                            text-white
                        "
                    >
                        Add New User
                    </h1>

                    <p
                        className="
                            mt-2

                            text-blue-100
                            text-sm
                        "
                    >
                        Create and manage users professionally
                    </p>

                </div>

                {/* BODY */}
                <div
                    className="
                        p-8

                        max-h-[85vh]

                        overflow-y-auto
                    "
                >

                    {/* SUCCESS */}
                    {success && (

                        <div
                            className="
                                mb-6

                                flex items-start gap-3

                                rounded-2xl

                                border border-green-500/20

                                bg-green-500/10

                                px-5 py-4

                                text-green-300
                            "
                        >

                            <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />

                            <p className="text-sm">
                                {success}
                            </p>

                        </div>
                    )}

                    {/* ERROR */}
                    {error && (

                        <div
                            className="
                                mb-6

                                flex items-start gap-3

                                rounded-2xl

                                border border-red-500/20

                                bg-red-500/10

                                px-5 py-4

                                text-red-300
                            "
                        >

                            <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />

                            <p className="text-sm">
                                {error}
                            </p>

                        </div>
                    )}

                    {/* FORM */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        {/* GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* USERNAME */}
                            <div>

                                <label className="text-sm font-semibold text-slate-300">
                                    Username
                                </label>

                                <div className="relative mt-2">

                                    <User
                                        className="
                                            absolute
                                            left-4 top-1/2
                                            -translate-y-1/2

                                            w-5 h-5
                                            text-slate-400
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

                                            py-4
                                            pl-12 pr-4

                                            text-white

                                            placeholder:text-slate-400

                                            outline-none

                                            transition-all duration-300

                                            focus:border-blue-500
                                            focus:ring-4
                                            focus:ring-blue-500/20
                                        "
                                    />

                                </div>

                            </div>

                            {/* EMAIL */}
                            <div>

                                <label className="text-sm font-semibold text-slate-300">
                                    Email Address
                                </label>

                                <div className="relative mt-2">

                                    <Mail
                                        className="
                                            absolute
                                            left-4 top-1/2
                                            -translate-y-1/2

                                            w-5 h-5
                                            text-slate-400
                                        "
                                    />

                                    <input
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={handleChange}
                                        placeholder="Enter email"
                                        required
                                        className="
                                            w-full

                                            rounded-2xl

                                            border border-white/10

                                            bg-white/5

                                            py-4
                                            pl-12 pr-4

                                            text-white

                                            placeholder:text-slate-400

                                            outline-none

                                            transition-all duration-300

                                            focus:border-blue-500
                                            focus:ring-4
                                            focus:ring-blue-500/20
                                        "
                                    />

                                </div>

                            </div>

                            {/* PASSWORD */}
                            <div>

                                <label className="text-sm font-semibold text-slate-300">
                                    Password
                                </label>

                                <div className="relative mt-2">

                                    <Lock
                                        className="
                                            absolute
                                            left-4 top-1/2
                                            -translate-y-1/2

                                            w-5 h-5
                                            text-slate-400
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

                                            py-4
                                            pl-12 pr-12

                                            text-white

                                            placeholder:text-slate-400

                                            outline-none

                                            transition-all duration-300

                                            focus:border-blue-500
                                            focus:ring-4
                                            focus:ring-blue-500/20
                                        "
                                    />

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

                                            text-slate-400

                                            hover:text-white

                                            transition
                                        "
                                    >

                                        {
                                            showPassword
                                                ? <EyeOff className="w-5 h-5" />
                                                : <Eye className="w-5 h-5" />
                                        }

                                    </button>

                                </div>

                            </div>

                            {/* CONFIRM PASSWORD */}
                            <div>

                                <label className="text-sm font-semibold text-slate-300">
                                    Confirm Password
                                </label>

                                <div className="relative mt-2">

                                    <Lock
                                        className="
                                            absolute
                                            left-4 top-1/2
                                            -translate-y-1/2

                                            w-5 h-5
                                            text-slate-400
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

                                            py-4
                                            pl-12 pr-12

                                            text-white

                                            placeholder:text-slate-400

                                            outline-none

                                            transition-all duration-300

                                            focus:border-blue-500
                                            focus:ring-4
                                            focus:ring-blue-500/20
                                        "
                                    />

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

                                            text-slate-400

                                            hover:text-white

                                            transition
                                        "
                                    >

                                        {
                                            showConfirmPassword
                                                ? <EyeOff className="w-5 h-5" />
                                                : <Eye className="w-5 h-5" />
                                        }

                                    </button>

                                </div>

                            </div>

                        </div>

                        {/* SUBMIT BUTTON */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                group

                                w-full

                                rounded-2xl

                                bg-gradient-to-r
                                from-blue-600
                                via-indigo-600
                                to-violet-600

                                py-4

                                flex items-center justify-center gap-2

                                text-white
                                font-semibold

                                shadow-xl

                                transition-all duration-300

                                hover:scale-[1.01]

                                disabled:opacity-70
                                disabled:cursor-not-allowed
                            "
                        >

                            {
                                loading
                                    ? "Creating User..."
                                    : (
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
                                    )
                            }

                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}


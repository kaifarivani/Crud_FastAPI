import React from "react";

import {
    RotateCcw,
    Hash,
    ArrowRight,
    ShieldCheck,
} from "lucide-react";

import { useUserRestore } from "../api/hooks/useRestoreUser";

function RestoreUser() {

    const {
        data,
        loading,
        error,
        success,
        handleChange,
        handleSubmit,
    } = useUserRestore();

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

                    {/* Logo */}
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
                        Restore User
                    </h1>

                    <p className="
                        mt-3
                        text-sm
                        text-gray-300
                        leading-relaxed
                    ">
                        Restore deleted users securely
                        using their user ID.
                    </p>

                </div>

                {/* Form */}
                <div className="p-8">

                    {/* Success */}
                    {success && (
                        <div className="
                            mb-6
                            rounded-2xl
                            border border-green-400/30
                            bg-green-500/10
                            px-4 py-3
                            text-sm
                            text-green-300
                            backdrop-blur-sm
                        ">
                            {success}
                        </div>
                    )}

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

                        {/* User ID */}
                        <div className="space-y-2">

                            <label
                                htmlFor="id"
                                className="
                                    text-sm
                                    font-semibold
                                    text-gray-200
                                    block
                                "
                            >
                                User ID
                            </label>

                            <div className="relative">

                                <Hash className="
                                    absolute left-4 top-1/2
                                    -translate-y-1/2
                                    w-5 h-5
                                    text-gray-400
                                " />

                                <input
                                    id="id"
                                    type="number"
                                    name="id"
                                    value={data.id}
                                    onChange={handleChange}
                                    placeholder="Enter User ID"
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
                                "Restoring..."
                            ) : (
                                <>
                                    Restore User

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

                        <div className="
                            flex items-center justify-center gap-2
                            text-sm text-gray-400
                        ">

                            <RotateCcw className="
                                w-4 h-4 text-blue-400
                            " />

                            Restore deleted accounts instantly

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default RestoreUser;
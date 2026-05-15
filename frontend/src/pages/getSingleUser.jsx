import React from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    Mail,
    User,
    Hash,
    Pencil,
    Trash2,
    ArrowLeft,
    ShieldCheck,
} from "lucide-react";

import { usegetSingleUser } from "../api/hooks/useGetSingleUser";

function GetSingleUser() {

    const { id } = useParams();

    const navigate = useNavigate();

    const {
        user,
        loading,
        deleteLoading,
        error,
        deleteUser,
    } = usegetSingleUser(id);

    const handleUpdate = () => {
        navigate(`/dashboard/update-user/${id}`);
    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) return;

        const response = await deleteUser();

        if (response.success) {

            alert(response.message);

            navigate("/users");

        } else {

            alert(response.message);
        }
    };

    /* Loading */
    if (loading) {

        return (
            <div className="
                min-h-screen
                flex items-center justify-center
                bg-gradient-to-br
                from-slate-950
                via-blue-950
                to-slate-900
            ">

                <div className="text-center">

                    <div className="
                        w-16 h-16
                        border-4 border-blue-500/30
                        border-t-blue-500
                        rounded-full
                        animate-spin
                        mx-auto
                    "></div>

                    <p className="
                        mt-5
                        text-xl
                        font-semibold
                        text-white
                    ">
                        Loading User...
                    </p>

                </div>

            </div>
        );
    }

    /* Error */
    if (error) {

        return (
            <div className="
                min-h-screen
                flex items-center justify-center
                bg-gradient-to-br
                from-slate-950
                via-red-950
                to-slate-900
                px-4
            ">

                <div className="
                    w-full max-w-md
                    rounded-3xl
                    bg-white/10
                    backdrop-blur-2xl
                    border border-white/10
                    p-8
                    text-center
                    shadow-2xl
                ">

                    <h1 className="
                        text-3xl
                        font-black
                        text-red-400
                    ">
                        Error
                    </h1>

                    <p className="
                        mt-4
                        text-gray-300
                    ">
                        {error}
                    </p>

                    <button
                        onClick={() => navigate("/users")}
                        className="
                            mt-6
                            px-6 py-3
                            rounded-2xl
                            bg-red-500
                            hover:bg-red-600
                            text-white
                            font-semibold
                            transition
                        "
                    >
                        Back
                    </button>

                </div>

            </div>
        );
    }

    /* No User */
    if (!user) {

        return (
            <div className="
                min-h-screen
                flex items-center justify-center
                bg-slate-950
            ">

                <h1 className="
                    text-3xl
                    font-bold
                    text-gray-400
                ">
                    User Not Found
                </h1>

            </div>
        );
    }

    return (

        <div className="
            min-h-screen
            bg-gradient-to-br
            from-slate-950
            via-blue-950
            to-slate-900
            flex items-center justify-center
            px-4 py-10
            relative overflow-hidden
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
                w-full max-w-xl
                bg-white/10
                backdrop-blur-2xl
                border border-white/10
                rounded-3xl
                shadow-2xl
                overflow-hidden
            ">

                {/* Top Header */}
                <div className="
                    relative
                    px-8 pt-10 pb-20
                    bg-gradient-to-r
                    from-blue-600/20
                    to-indigo-600/20
                    border-b border-white/10
                    text-center
                ">

                    {/* Back Button */}
                    <button
                        onClick={() => navigate("/users")}
                        className="
                            absolute left-6 top-6
                            w-10 h-10
                            rounded-xl
                            bg-white/10
                            hover:bg-white/20
                            flex items-center justify-center
                            transition
                        "
                    >
                        <ArrowLeft className="w-5 h-5 text-white" />
                    </button>

                    {/* Avatar */}
                    <div className="
                        mx-auto
                        flex items-center justify-center
                        w-28 h-28
                        rounded-full
                        bg-gradient-to-br
                        from-blue-500
                        to-indigo-600
                        shadow-2xl
                        border-4 border-white/20
                        text-white
                        text-5xl
                        font-black
                    ">
                        {user.username?.charAt(0).toUpperCase()}
                    </div>

                    <h1 className="
                        mt-6
                        text-4xl
                        font-black
                        text-white
                        tracking-tight
                    ">
                        {user.username}
                    </h1>

                    <p className="
                        mt-2
                        text-gray-300
                    ">
                        User Profile Details
                    </p>

                </div>

                {/* Body */}
                <div className="p-8">

                    {/* Info Cards */}
                    <div className="space-y-5">

                        {/* User ID */}
                        <div className="
                            flex items-center gap-4
                            rounded-2xl
                            bg-white/5
                            border border-white/10
                            p-5
                            hover:bg-white/10
                            transition
                        ">

                            <div className="
                                w-14 h-14
                                rounded-2xl
                                bg-blue-500/20
                                flex items-center justify-center
                            ">
                                <Hash className="
                                    w-6 h-6 text-blue-400
                                " />
                            </div>

                            <div>
                                <p className="
                                    text-sm
                                    text-gray-400
                                ">
                                    User ID
                                </p>

                                <h2 className="
                                    text-lg
                                    font-bold
                                    text-white
                                ">
                                    #{user.id}
                                </h2>
                            </div>

                        </div>

                        {/* Username */}
                        <div className="
                            flex items-center gap-4
                            rounded-2xl
                            bg-white/5
                            border border-white/10
                            p-5
                            hover:bg-white/10
                            transition
                        ">

                            <div className="
                                w-14 h-14
                                rounded-2xl
                                bg-indigo-500/20
                                flex items-center justify-center
                            ">
                                <User className="
                                    w-6 h-6 text-indigo-400
                                " />
                            </div>

                            <div>
                                <p className="
                                    text-sm
                                    text-gray-400
                                ">
                                    Username
                                </p>

                                <h2 className="
                                    text-lg
                                    font-bold
                                    text-white
                                ">
                                    {user.username}
                                </h2>
                            </div>

                        </div>

                        {/* Email */}
                        <div className="
                            flex items-center gap-4
                            rounded-2xl
                            bg-white/5
                            border border-white/10
                            p-5
                            hover:bg-white/10
                            transition
                        ">

                            <div className="
                                w-14 h-14
                                rounded-2xl
                                bg-cyan-500/20
                                flex items-center justify-center
                            ">
                                <Mail className="
                                    w-6 h-6 text-cyan-400
                                " />
                            </div>

                            <div className="overflow-hidden">
                                <p className="
                                    text-sm
                                    text-gray-400
                                ">
                                    Email Address
                                </p>

                                <h2 className="
                                    text-lg
                                    font-bold
                                    text-white
                                    break-all
                                ">
                                    {user.email}
                                </h2>
                            </div>

                        </div>

                    </div>

                    {/* Action Buttons */}
                    <div className="
                        mt-8
                        flex flex-col sm:flex-row gap-4
                    ">

                        {/* Update */}
                        <button
                            onClick={handleUpdate}
                            className="
                                flex-1
                                py-3.5 px-5
                                rounded-2xl

                                flex items-center justify-center gap-2

                                bg-gradient-to-r
                                from-blue-600
                                to-indigo-600

                                hover:scale-[1.02]
                                hover:shadow-blue-500/30

                                text-white
                                font-semibold

                                shadow-2xl
                                transition-all duration-300
                            "
                        >

                            <Pencil className="w-5 h-5" />

                            Update User

                        </button>

                        {/* Delete */}
                        <button
                            onClick={handleDelete}
                            disabled={deleteLoading}
                            className={`
                                flex-1
                                py-3.5 px-5
                                rounded-2xl

                                flex items-center justify-center gap-2

                                text-white
                                font-semibold

                                shadow-2xl
                                transition-all duration-300

                                ${
                                    deleteLoading
                                        ? `
                                            bg-gray-500
                                            cursor-not-allowed
                                          `
                                        : `
                                            bg-gradient-to-r
                                            from-red-500
                                            to-red-600

                                            hover:scale-[1.02]
                                            hover:shadow-red-500/30
                                          `
                                }
                            `}
                        >

                            <Trash2 className="w-5 h-5" />

                            {deleteLoading
                                ? "Deleting..."
                                : "Delete User"
                            }

                        </button>

                    </div>

                    {/* Footer */}
                    <div className="
                        mt-8 pt-6
                        border-t border-white/10
                        text-center
                    ">

                        <div className="
                            flex items-center justify-center gap-2
                            text-gray-400 text-sm
                        ">

                            <ShieldCheck className="
                                w-4 h-4 text-blue-400
                            " />

                            Secure user management dashboard

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default GetSingleUser;
// pages/GetTrashUser.jsx

import React, { useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useGetTrashUsers } from "../api/hooks/useGetTrashUser";

import {
    Eye,
    Pencil,
    Trash2,
    Search,
    Plus,
    Users,
    UserX ,
    UserCheck,
    RotateCcw,
} from "lucide-react";

export function GetTrashUser() {

    const navigate = useNavigate();
const {
    users = [],
    loading,
    error,
    emptyMessage,
    deleteUser,
    restoreUser,
} = useGetTrashUsers();

    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState("all");

    // FILTER USERS
    const filteredUsers = useMemo(() => {

        return users.filter((user) => {

            const matchesSearch =
                user.username
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||

                user.email
                    ?.toLowerCase()
                    .includes(search.toLowerCase());

            if (filter === "active") {
                return user.user_status === true && matchesSearch;
            }

            if (filter === "deleted") {
                return user.user_status === false && matchesSearch;
            }

            return matchesSearch;

        });

    }, [users, search, filter]);

    // LOADING
    if (loading) {

        return (

            <div className="flex items-center justify-center min-h-[70vh]">

                <div className="text-center">

                    <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

                    <h1 className="mt-5 text-xl font-bold text-blue-400">
                        Loading Users...
                    </h1>

                </div>

            </div>
        );
    }

    // ERROR
    if (error) {

        return (

            <div className="flex items-center justify-center min-h-[70vh]">

                <div className="bg-red-500/10 border border-red-500/20 px-8 py-6 rounded-3xl">

                    <h1 className="text-red-400 font-bold text-lg">
                        {error}
                    </h1>

                </div>

            </div>
        );
    }

    return (

        <div className="space-y-8">

            {/* HEADER */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

            <div className="bg-slate-900 p-6 rounded-2xl">

                <p className="mt-3 text-3xl text-white font-bold">
                    Users Management
                </p>

                <p className="mt-3 text-sm sm:text-base text-slate-300 font-medium tracking-wide">
                    Manage all users professionally and efficiently
                </p>

            </div>

                {/* ADD USER */}
                

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {/* TOTAL USERS */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-slate-300">
                                Total Users
                            </p>

                            <p className="mt-3 text-xl text-white font-bold">
                                {users.length}
                            </p>

                        </div>

                        <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center">

                            <Users className="text-blue-400" />

                        </div>

                    </div>

                </div>

                {/* TRASH USERS */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-slate-300">
                                Trash Users
                            </p>

                           <p className="mt-3 text-xl text-white font-bold">

                                {
                                    users.filter(
                                        (u) =>
                                            u.user_status === false ||
                                            u.user_status === "false" ||
                                            u.user_status === 0
                                    ).length
                                }

                            </p>

                        </div>

                        <div className="w-16 h-16 rounded-2xl bg-yellow-500/20 flex items-center justify-center">

                            <UserX className="text-yellow-400" />

                        </div>

                    </div>

                </div>

                {/* DELETED USERS */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-slate-300">
                                Deleted Users
                            </p>

                            <p className="mt-3 text-xl text-white font-bold">

                                {
                                    users.filter(
                                        (u) =>
                                            u.is_deleted === true ||
                                            u.is_deleted === "true" ||
                                            u.is_deleted === 1
                                    ).length
                                }

                            </p>

                        </div>

                        <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center">

                            <Trash2 className="text-red-400" />

                        </div>

                    </div>

                </div>

            </div>            {/* TABLE */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">

                {/* TOP BAR */}
                <div className="p-6 border-b border-white/10 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">

                    {/* SEARCH */}
                    <div className="relative w-full lg:max-w-md">

                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                        <input
                            type="text"
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            className="
                                w-full
                                bg-white/5
                                border border-white/10
                                rounded-2xl
                                py-3 pl-11 pr-4
                                text-white
                                placeholder:text-slate-400
                                outline-none
                                focus:ring-4
                                focus:ring-blue-500/20
                                focus:border-blue-400
                            "
                        />

                    </div>

                    {/* FILTER */}
                 
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto">

                    <table className="w-full min-w-[700px]">

                        <thead className="bg-white/5 border-b border-white/10">

                            <tr>

                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                                    User
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                                    Email
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">
                                    Actions
                                </th>

                            </tr>

                        </thead><tbody>

    {filteredUsers.length > 0 ? (

        filteredUsers.map((user) => (

            <tr
                key={user.id}
                className="border-b border-white/5 hover:bg-white/5 transition"
            >

                {/* USER */}
                <td className="px-6 py-5">

                    <div className="flex items-center gap-4">

                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold">

                            {
                                user.username
                                    ?.charAt(0)
                                    .toUpperCase()
                            }

                        </div>

                        <div>

                            <h3 className="font-semibold text-white">
                                {user.username}
                            </h3>

                            <p className="text-sm text-slate-400">
                                ID #{user.id}
                            </p>

                        </div>

                    </div>

                </td>

                {/* EMAIL */}
                <td className="px-6 py-5 text-slate-300">
                    {user.email}
                </td>

                {/* STATUS */}
                <td className="px-6 py-5">

                    <span
                        className={`
                            px-4 py-1.5
                            rounded-full
                            text-xs font-semibold
                            ${
                                user.user_status
                                    ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                    : "bg-red-500/10 text-red-400 border border-red-500/20"
                            }
                        `}
                    >

                        {
                            user.user_status
                                ? "Active"
                                : "Deleted"
                        }

                    </span>

                </td>

                {/* ACTIONS */}
                <td className="px-6 py-5">

                    <div className="flex items-center justify-center gap-3">

                        {/* RESTORE */}
                        <button
                            onClick={() =>
                                restoreUser(user.id)
                            }
                            className="w-10 h-10 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center hover:bg-green-500/20 transition"
                        >
                            <RotateCcw className="w-4 h-4" />
                        </button>

                        {/* HARD DELETE */}
                        <button
                            onClick={() =>
                                deleteUser(user.id)
                            }
                            className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center hover:bg-red-500/20 transition"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>

                    </div>

                </td>

            </tr>

        ))

    ) : (

        <tr>

            <td
                colSpan="4"
                className="text-center py-20"
            >

                <div className="flex flex-col items-center justify-center">

                    <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">

                        <Trash2 className="w-10 h-10 text-slate-500" />

                    </div>

                    <h2 className="text-3xl font-bold text-white">
                        {emptyMessage || "No Users Found"}
                    </h2>

                    <p className="mt-3 text-slate-400">
                        Deleted users will appear here
                    </p>

                </div>

            </td>

        </tr>

    )}

</tbody>  </table>

                </div>

            </div>

        </div>
    );
}
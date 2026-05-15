// pages/GetAllUser.jsx

import React, { useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useGetUsers } from "../api/hooks/usegetAllUser";

import {
    Eye,
    Pencil,
    Trash2,
    Search,
    Plus,
    Users,
    UserCheck,
    UserX,
} from "lucide-react";

export function GetAllUser() {

    const navigate = useNavigate();

    const {
        users = [],
        loading,
        error,
        deleteUser,
    } = useGetUsers();

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

    {/* Heading */}
<div className="bg-slate-900 p-6 rounded-2xl shadow-xl">

    <p className="text-3xl sm:text-4xl font-bold text-white">
        Users Management
    </p>

    <p className="mt-3 text-slate-300 text-sm sm:text-base tracking-wide">
        Manage all users professionally and efficiently
    </p>

</div>

    {/* Action Buttons */}
    <div className="flex flex-wrap gap-4">

        {/* ADD USER */}
        <button
            onClick={() => navigate("/dashboard/add-user")}
            className="
                flex items-center gap-2
                bg-gradient-to-r from-blue-500 to-indigo-700
                hover:from-blue-700 hover:to-indigo-800
                text-white
                px-6 py-3.5
                rounded-2xl
                font-semibold
                shadow-xl
                transition-all duration-300
                hover:scale-105
            "
        >
            <Plus className="w-5 h-5" />

            Add User
        </button>

        {/* TRASH USERS */}
        <button
            onClick={() => navigate("/dashboard/trash-users")}
            className="
                flex items-center gap-2
                bg-gradient-to-r from-rose-500 to-red-700
                hover:from-rose-700 hover:to-red-800
                text-white
                px-6 py-3.5
                rounded-2xl
                font-semibold
                shadow-xl
                transition-all duration-300
                hover:scale-105
            "
        >
            <Trash2 className="w-5 h-5" />

            Trash 
        </button>

    </div>

</div>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {/* TOTAL */}
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

                {/* ACTIVE */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-slate-300">
                                Active Users
                            </p>

                              <p className="mt-3 text-xl text-white font-bold">

                                {
                                    users.filter(
                                        (u) => u.user_status === true
                                    ).length
                                }

                            </p>

                        </div>

                        <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center">

                            <UserCheck className="text-green-400" />

                        </div>

                    </div>

                </div>

                {/* DELETED */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-slate-300">
                                Trash Users
                            </p>

                              <p className="mt-3 text-xl text-white font-bold">

                              
                                {
                                    users.filter(
                                        (u) => u.user_status === false
                                    ).length
                                }

                            </p>

                        </div>

                        <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center">

                            <UserX className="text-red-400" />

                        </div>

                    </div>

                </div>

            </div>

            {/* TABLE SECTION */}
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
                    <select
                        value={filter}
                        onChange={(e) =>
                            setFilter(e.target.value)
                        }
                        className="
                            bg-slate-900
                            border border-white/10
                            rounded-2xl
                            px-4 py-3
                            text-white
                            outline-none
                            focus:ring-4
                            focus:ring-blue-500/20
                        "
                    >

                        <option value="all">
                            All Users
                        </option>

                        <option value="active">
                            Active Users
                        </option>

                        <option value="deleted">
                            Deleted Users
                        </option>

                    </select>

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

                        </thead>

                        <tbody>

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
                                                        : "Deactive"
                                                }

                                            </span>

                                        </td>

                                        {/* ACTIONS */}
                                        <td className="px-6 py-5">

                                            <div className="flex items-center justify-center gap-3">

                                                <button
                                                    onClick={() =>
                                                        navigate(`/dashboard/detail-user/${user.id}`)
                                                    }
                                                    className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center hover:bg-indigo-500/20 transition"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        navigate(`/dashboard/update-user/${user.id}`)
                                                    }
                                                    className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center hover:bg-blue-500/20 transition"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>

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
                                        className="text-center py-16"
                                    >

                                        <h2 className="text-2xl font-bold text-white">
                                            No Users Found
                                        </h2>

                                        <p className="mt-2 text-slate-400">
                                            Try another search or filter
                                        </p>

                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

                {/* PAGINATION */}
                <div className="border-t border-white/10 px-6 py-5 flex items-center justify-between">

                    <p className="text-sm text-slate-400">
                        Showing {filteredUsers.length} users
                    </p>

                    <div className="flex items-center gap-3">

                        <button className="px-4 py-2.5 rounded-2xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition">
                            Previous
                        </button>

                        <div className="px-5 py-2.5 rounded-2xl bg-blue-600 text-white text-sm font-semibold">
                            1
                        </div>

                        <button className="px-4 py-2.5 rounded-2xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition">
                            Next
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}
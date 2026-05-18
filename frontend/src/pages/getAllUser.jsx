

import React, { useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";

import { useGetUsers } from "../api/hooks/usegetAllUser";

// MODAL
import { GetTrashUser } from "./getTrashUser";
import { GetSingleUser } from "./getSingleUser";

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

    // =========================
    // GET USERS
    // =========================
    const {
        users = [],
        loading,
        error,
        deleteUser,
    } = useGetUsers();

    // =========================
    // SEARCH STATE
    // =========================
    const [search, setSearch] = useState("");

    // =========================
    // FILTER STATE
    // =========================
    const [filter, setFilter] = useState("all");

    // =========================
    // TRASH MODAL
    // =========================
    const [openTrashModal, setOpenTrashModal] =
        useState(false);
    const [openViewModal, setOpenViewModal] =
    useState(false);

    const [selectedUser, setSelectedUser] =
        useState(null);

            const handleViewUser = (user) => {

            setSelectedUser(user);

            setOpenViewModal(true);
        };   
    // =========================
    // FILTER USERS
    // =========================
    const filteredUsers = useMemo(() => {

        return users.filter((user) => {

            const matchesSearch =

                user.username
                    ?.toLowerCase()
                    .includes(search.toLowerCase())

                ||

                user.email
                    ?.toLowerCase()
                    .includes(search.toLowerCase());

            // ACTIVE FILTER
            if (filter === "active") {

                return (
                    user.user_status === true &&
                    matchesSearch
                );
            }

            // DELETED FILTER
            if (filter === "deleted") {

                return (
                    user.user_status === false &&
                    matchesSearch
                );
            }

            return matchesSearch;

        });

    }, [users, search, filter]);

    // =========================
    // LOADING
    // =========================
    if (loading) {

        return (

            <div className="flex items-center justify-center min-h-screen">

                <div className="text-center">

                    <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

                    <h1 className="mt-5 text-xl font-bold text-blue-400">
                        Loading Users...
                    </h1>

                </div>

            </div>
        );
    }

    // =========================
    // ERROR
    // =========================
    if (error) {

        return (

            <div className="flex items-center justify-center min-h-screen">

                <div className="bg-red-500/10 border border-red-500/20 px-8 py-6 rounded-3xl">

                    <h1 className="text-red-400 font-bold text-lg">
                        {error}
                    </h1>

                </div>

            </div>
        );
    }
     <GetSingleUser
    open={openViewModal}
    setOpen={setOpenViewModal}
    user={selectedUser}
    deleteLoading={false}
    handleUpdate={() =>
        navigate(`/dashboard/detail-user/${selectedUser?.id}`)
    }
    handleDelete={() => {
        console.log("delete user");
    }}
    />
    return (

        <>
            {/* =========================
                TRASH MODAL
            ========================= */}
            <GetTrashUser
                open={openTrashModal}
                setOpen={setOpenTrashModal}
            />

            <div className="space-y-8">

                {/* HEADER */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                    {/* LEFT */}
                    <div className="p-6 rounded-3xl shadow-xl border border-white/10">

                        <p className="text-3xl sm:text-4xl font-bold text-white">
                            Users Management
                        </p>

                        <p className="mt-3 text-slate-400">
                            Manage all users professionally
                        </p>

                    </div>

                    {/* RIGHT */}
                    <div className="flex flex-wrap gap-4">

                        {/* ADD USER */}
                        <button
                            onClick={() =>
                                navigate("/dashboard/add-user")
                            }
                            className="
                                flex items-center gap-2

                                bg-gradient-to-r
                                from-blue-600
                                to-indigo-600

                                hover:from-blue-700
                                hover:to-indigo-700

                                px-6 py-3.5

                                rounded-2xl

                                text-white
                                font-semibold

                                shadow-xl

                                transition-all duration-300
                                hover:scale-105
                            "
                        >

                            <Plus className="w-5 h-5" />

                            Add User

                        </button>

                        {/* TRASH */}
                        <button
                            onClick={() =>
                                setOpenTrashModal(true)
                            }
                            className="
                                flex items-center gap-2

                                bg-gradient-to-r
                                from-red-500
                                to-rose-600

                                hover:from-red-600
                                hover:to-rose-700

                                px-6 py-3.5

                                rounded-2xl

                                text-white
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
                    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-slate-400">
                                    Total Users
                                </p>

                                <h2 className="mt-3 text-3xl font-bold text-white">
                                    {users.length}
                                </h2>

                            </div>

                            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center">

                                <Users className="text-blue-400 w-8 h-8" />

                            </div>

                        </div>

                    </div>

                    {/* ACTIVE */}
                    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-slate-400">
                                    Active Users
                                </p>

                                <h2 className="mt-3 text-3xl font-bold text-white">

                                    {
                                        users.filter(
                                            (u) =>
                                                u.user_status === true
                                        ).length
                                    }

                                </h2>

                            </div>

                            <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center">

                                <UserCheck className="text-green-400 w-8 h-8" />

                            </div>

                        </div>

                    </div>

                    {/* DELETED */}
                    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-slate-400">
                                    Deleted Users
                                </p>

                                <h2 className="mt-3 text-3xl font-bold text-white">

                                    {
                                        users.filter(
                                            (u) =>
                                                u.user_status === false
                                        ).length
                                    }

                                </h2>

                            </div>

                            <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center">

                                <UserX className="text-red-400 w-8 h-8" />

                            </div>

                        </div>

                    </div>

                </div>

                {/* TABLE CARD */}
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

                        <table className="w-full min-w-[800px]">

                            <thead className="bg-white/5 border-b border-white/10">

                                <tr>

                                    <th className="px-6 py-4 text-left text-slate-300">
                                        User
                                    </th>

                                    <th className="px-6 py-4 text-left text-slate-300">
                                        Email
                                    </th>

                                    <th className="px-6 py-4 text-left text-slate-300">
                                        Role
                                    </th>

                                    <th className="px-6 py-4 text-left text-slate-300">
                                        Status
                                    </th>

                                    <th className="px-6 py-4 text-center text-slate-300">
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

                                                        <h3 className="text-white font-semibold">
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

                                            {/* ROLE */}
                                            <td className="px-6 py-5 text-slate-300">
                                                {user.role}
                                            </td>

                                            {/* STATUS */}
                                            <td className="px-6 py-5">

                                                <span
                                                    className={`
                                                        px-4 py-1.5
                                                        rounded-full
                                                        text-xs
                                                        font-semibold

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

                                                    {/* VIEW */}
                                                    {/* <button
                                                        onClick={() =>
                                                            navigate(`/dashboard/detail-user/${user.id}`)
                                                        }
                                                        className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center hover:bg-indigo-500/20 transition"
                                                    >

                                                        <Eye className="w-4 h-4" />

                                                    </button> */}

                                                    <button
                                                        onClick={() =>
                                                            handleViewUser(user)
                                                        }
                                                        className="
                                                            w-10 h-10
                                                            rounded-xl

                                                            bg-indigo-500/10
                                                            text-indigo-400

                                                            flex items-center justify-center

                                                            hover:bg-indigo-500/20

                                                            transition
                                                        "
                                                    >

                                                        <Eye className="w-4 h-4" />

                                                    </button>

                                                    {/* EDIT */}
                                                    <button
                                                        onClick={() =>
                                                            navigate(`/dashboard/update-user/${user.id}`)
                                                        }
                                                        className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center hover:bg-blue-500/20 transition"
                                                    >

                                                        <Pencil className="w-4 h-4" />

                                                    </button>

                                                    {/* DELETE */}
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
                                            colSpan="5"
                                            className="text-center py-16"
                                        >

                                            <h2 className="text-2xl font-bold text-white">
                                                No Users Found
                                            </h2>

                                            <p className="mt-2 text-slate-400">
                                                Try another search
                                            </p>

                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                    {/* FOOTER */}
                    <div className="border-t border-white/10 px-6 py-5">

                        <p className="text-sm text-slate-400">
                            Showing {filteredUsers.length} users
                        </p>

                    </div>

                </div>

            </div>
        </>
    );
}
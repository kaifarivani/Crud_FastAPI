import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUsers } from "../api/hooks/usegetAllUser";

// MODALS
import { GetTrashUser } from "./getTrashUser";
import { GetSingleUser } from "./getSingleUser";
import { AddUser } from "./addUser";

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

    const [openTrashModal, setOpenTrashModal] = useState(false);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openViewModal, setOpenViewModal] = useState(false);

    const [selectedUser, setSelectedUser] = useState(null);

    const handleViewUser = (user) => {
        setSelectedUser(user);
        setOpenViewModal(true);
    };

    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const matchesSearch =
                user.username?.toLowerCase().includes(search.toLowerCase()) ||
                user.email?.toLowerCase().includes(search.toLowerCase());

            if (filter === "active") {
                return user.user_status === true && matchesSearch;
            }

            if (filter === "deleted") {
                return user.user_status === false && matchesSearch;
            }

            return matchesSearch;
        });
    }, [users, search, filter]);

    const totalUsers = users.length;
    const activeUsers = users.filter((u) => u.user_status === true).length;
    const deletedUsers = users.filter((u) => u.user_status === false).length;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-slate-600 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-sm font-medium text-slate-300">
                        Loading users...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
                <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-center">
                    <h1 className="text-base font-semibold text-red-400">
                        {error}
                    </h1>
                </div>
            </div>
        );
    }

    return (
        <>
            <AddUser
                open={openAddModal}
                setOpen={setOpenAddModal}
            />

            <GetTrashUser
                open={openTrashModal}
                setOpen={setOpenTrashModal}
            />

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

            <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-white">
                                User Management
                            </h1>
                            <p className="mt-1 text-sm text-slate-400">
                                Manage users, review status, and perform actions.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={() => setOpenAddModal(true)}
                                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                            >
                                <Plus className="h-4 w-4" />
                                Add User
                            </button>

                            <button
                                onClick={() => setOpenTrashModal(true)}
                                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
                            >
                                <Trash2 className="h-4 w-4 text-red-400" />
                                Trash
                            </button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-400">Total Users</p>
                                    <h2 className="mt-2 text-2xl font-bold text-white">
                                        {totalUsers}
                                    </h2>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                                    <Users className="h-6 w-6 text-blue-400" />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-400">Active Users</p>
                                    <h2 className="mt-2 text-2xl font-bold text-white">
                                        {activeUsers}
                                    </h2>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
                                    <UserCheck className="h-6 w-6 text-emerald-400" />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-400">Deleted Users</p>
                                    <h2 className="mt-2 text-2xl font-bold text-white">
                                        {deletedUsers}
                                    </h2>
                                </div>
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
                                    <UserX className="h-6 w-6 text-red-400" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div className="relative w-full lg:max-w-md">
                                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search by username or email..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500"
                                />
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setFilter("all")}
                                    className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                                        filter === "all"
                                            ? "bg-blue-600 text-white"
                                            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                    }`}
                                >
                                    All
                                </button>
                                <button
                                    onClick={() => setFilter("active")}
                                    className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                                        filter === "active"
                                            ? "bg-emerald-600 text-white"
                                            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                    }`}
                                >
                                    Active
                                </button>
                                <button
                                    onClick={() => setFilter("deleted")}
                                    className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                                        filter === "deleted"
                                            ? "bg-red-600 text-white"
                                            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                    }`}
                                >
                                    Deleted
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-sm">
                        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
                            <div>
                                <h3 className="text-lg font-semibold text-white">
                                    Users List
                                </h3>
                                <p className="mt-1 text-sm text-slate-400">
                                    Showing {filteredUsers.length} user(s)
                                </p>
                            </div>
                        </div>

                        {filteredUsers.length === 0 ? (
                            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                                <Users className="h-12 w-12 text-slate-600" />
                                <h4 className="mt-4 text-lg font-semibold text-white">
                                    No users found
                                </h4>
                                <p className="mt-2 text-sm text-slate-400">
                                    Try changing the search keyword or filter option.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm">
                                    <thead className="bg-slate-950/80">
                                        <tr className="border-b border-slate-800 text-left">
                                            <th className="px-5 py-3 font-semibold text-slate-300">
                                                Username
                                            </th>
                                            <th className="px-5 py-3 font-semibold text-slate-300">
                                                Email
                                            </th>
                                            <th className="px-5 py-3 font-semibold text-slate-300">
                                                Status
                                            </th>
                                            <th className="px-5 py-3 font-semibold text-slate-300">
                                                Role
                                            </th>
                                            <th className="px-5 py-3 font-semibold text-slate-300 text-right">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {filteredUsers.map((user) => (
                                            <tr
                                                key={user.id}
                                                className="border-b border-slate-800/80 transition hover:bg-slate-800/40"
                                            >
                                                <td className="px-5 py-4">
                                                    <div className="font-medium text-white">
                                                        {user.username || "N/A"}
                                                    </div>
                                                </td>

                                                <td className="px-5 py-4 text-slate-300">
                                                    {user.email || "N/A"}
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span
                                                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                                                            user.user_status
                                                                ? "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20"
                                                                : "bg-red-500/10 text-red-400 ring-1 ring-red-500/20"
                                                        }`}
                                                    >
                                                        {user.user_status ? "Active" : "Deleted"}
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4 text-slate-300">
                                                    {user.role || "User"}
                                                </td>

                                                <td className="px-5 py-4">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => handleViewUser(user)}
                                                            className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-200 transition hover:bg-slate-700"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                            
                                                        </button>

                                                        <button
                                                            onClick={() =>
                                                                navigate(`/dashboard/update-user/${user.id}`)
                                                            }
                                                            className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-200 transition hover:bg-slate-700"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                            
                                                        </button>

                                                        <button
                                                            onClick={() => deleteUser(user.id)}
                                                            className="inline-flex items-center gap-1 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-red-400 transition hover:bg-red-500/20"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                            
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
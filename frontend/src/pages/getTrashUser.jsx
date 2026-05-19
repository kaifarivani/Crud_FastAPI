import React, { useEffect, useMemo, useState } from "react";
import { useGetTrashUsers } from "../api/hooks/useGetTrashUser";
import {
    Search,
    Trash2,
    Users,
    RotateCcw,
    X,
    ShieldAlert,
    ArrowLeft,
} from "lucide-react";

export function GetTrashUser({ open, setOpen }) {
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

    const deletedUsers = useMemo(() => {
        return users.filter((user) => user.user_status === false);
    }, [users]);

    const filteredUsers = useMemo(() => {
        return deletedUsers.filter((user) => {
            const matchesSearch =
                user.username?.toLowerCase().includes(search.toLowerCase()) ||
                user.email?.toLowerCase().includes(search.toLowerCase());

            return matchesSearch;
        });
    }, [deletedUsers, search, filter]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 bg-slate-950 text-white">
            <div className="h-full w-full overflow-y-auto">
                <div className="min-h-screen p-4 sm:p-6 lg:p-8">
                    <div className="mx-auto max-w-7xl space-y-6">
                        {/* Header */}
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setOpen(false)}
                                        className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                        Back
                                    </button>
                                </div>

                                <h1 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                                    Trash Users
                                </h1>
                                <p className="mt-2 text-sm text-slate-400">
                                    Restore users or permanently remove them from the system.
                                </p>
                            </div>

                            <button
                                onClick={() => setOpen(false)}
                                className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-400 transition hover:bg-red-500/20"
                            >
                                <X className="h-4 w-4" />
                                Close
                            </button>
                        </div>

                        {/* Loading */}
                        {loading && (
                            <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-slate-800 bg-slate-900">
                                <div className="text-center">
                                    <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-red-500/20 border-t-red-500" />
                                    <p className="mt-4 text-sm font-medium text-slate-300">
                                        Loading trash users...
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Error */}
                        {error && (
                            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-center">
                                <ShieldAlert className="mx-auto h-12 w-12 text-red-400" />
                                <h2 className="mt-4 text-lg font-bold text-red-400">
                                    {error}
                                </h2>
                            </div>
                        )}

                        {/* Content */}
                        {!loading && !error && (
                            <>
                                {/* Stats */}
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-slate-400">
                                                    Trash Users
                                                </p>
                                                <h2 className="mt-2 text-2xl font-bold text-white">
                                                    {deletedUsers.length}
                                                </h2>
                                            </div>
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
                                                <Trash2 className="h-6 w-6 text-red-400" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-slate-400">
                                                    Search Results
                                                </p>
                                                <h2 className="mt-2 text-2xl font-bold text-white">
                                                    {filteredUsers.length}
                                                </h2>
                                            </div>
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                                                <Users className="h-6 w-6 text-blue-400" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-slate-400">
                                                    Permanent Delete
                                                </p>
                                                <h2 className="mt-2 text-2xl font-bold text-white">
                                                    {deletedUsers.length}
                                                </h2>
                                            </div>
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/10">
                                                <Trash2 className="h-6 w-6 text-rose-400" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Search + filter */}
                                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                        <div className="relative w-full lg:max-w-md">
                                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                            <input
                                                type="text"
                                                placeholder="Search trash users..."
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                                className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2.5 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-red-500"
                                            />
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            <button
                                                onClick={() => setFilter("all")}
                                                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                                            >
                                                All Trash
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Desktop Table */}
                                <div className="hidden overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 lg:block">
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
                                                    <th className="px-5 py-3 font-semibold text-slate-300 text-right">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {filteredUsers.length > 0 ? (
                                                    filteredUsers.map((user) => (
                                                        <tr
                                                            key={user.id}
                                                            className="border-b border-slate-800/80 transition hover:bg-slate-800/40"
                                                        >
                                                            <td className="px-5 py-4">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 font-semibold uppercase text-red-400">
                                                                        {user.username?.charAt(0) || "U"}
                                                                    </div>
                                                                    <div>
                                                                        <div className="font-medium text-white">
                                                                            {user.username || "N/A"}
                                                                        </div>
                                                                        <div className="text-xs text-slate-500">
                                                                            ID #{user.id}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td className="px-5 py-4 text-slate-300">
                                                                {user.email || "N/A"}
                                                            </td>

                                                            <td className="px-5 py-4">
                                                                <span className="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 bg-red-500/10 text-red-400 ring-red-500/20">
                                                                    Deleted
                                                                </span>
                                                            </td>

                                                            <td className="px-5 py-4">
                                                                <div className="flex items-center justify-end gap-2">
                                                                    <button
                                                                        onClick={() => restoreUser(user.id)}
                                                                        className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-2 text-emerald-400 transition hover:bg-emerald-500/20"
                                                                    >
                                                                        <RotateCcw className="h-4 w-4" />
                                                                        Restore
                                                                    </button>

                                                                    <button
                                                                        onClick={() => deleteUser(user.id)}
                                                                        className="inline-flex items-center gap-2 rounded-lg bg-red-500/10 px-3 py-2 text-red-400 transition hover:bg-red-500/20"
                                                                    >
                                                                        <Trash2 className="h-4 w-4" />
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={4} className="px-6 py-20 text-center">
                                                            <div className="flex flex-col items-center justify-center">
                                                                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-slate-800">
                                                                    <Trash2 className="h-9 w-9 text-slate-500" />
                                                                </div>
                                                                <h2 className="text-2xl font-bold text-white">
                                                                    {emptyMessage || "No Trash Users"}
                                                                </h2>
                                                                <p className="mt-2 text-slate-400">
                                                                    Deleted users will appear here.
                                                                </p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Mobile Cards */}
                                <div className="grid grid-cols-1 gap-4 lg:hidden">
                                    {filteredUsers.length > 0 ? (
                                        filteredUsers.map((user) => (
                                            <div
                                                key={user.id}
                                                className="rounded-2xl border border-slate-800 bg-slate-900 p-4"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 font-semibold uppercase text-red-400">
                                                        {user.username?.charAt(0) || "U"}
                                                    </div>

                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex flex-col gap-2">
                                                            <div>
                                                                <h3 className="truncate font-semibold text-white">
                                                                    {user.username || "N/A"}
                                                                </h3>
                                                                <p className="truncate text-sm text-slate-400">
                                                                    {user.email || "N/A"}
                                                                </p>
                                                                <p className="mt-1 text-xs text-slate-500">
                                                                    ID #{user.id}
                                                                </p>
                                                            </div>

                                                            <span className="inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-semibold ring-1 bg-red-500/10 text-red-400 ring-red-500/20">
                                                                Deleted
                                                            </span>

                                                            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                                                                <button
                                                                    onClick={() => restoreUser(user.id)}
                                                                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-400 transition hover:bg-emerald-500/20"
                                                                >
                                                                    <RotateCcw className="h-4 w-4" />
                                                                    Restore
                                                                </button>

                                                                <button
                                                                    onClick={() => deleteUser(user.id)}
                                                                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-500/10 px-4 py-2.5 text-sm text-red-400 transition hover:bg-red-500/20"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-12 text-center">
                                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-800">
                                                <Trash2 className="h-8 w-8 text-slate-500" />
                                            </div>
                                            <h3 className="mt-4 text-lg font-semibold text-white">
                                                {emptyMessage || "No Trash Users"}
                                            </h3>
                                            <p className="mt-2 text-sm text-slate-400">
                                                Deleted users will appear here.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
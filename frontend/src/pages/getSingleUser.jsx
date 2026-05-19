import React from "react";
import {
    Mail,
    User,
    Hash,
    Pencil,
    Trash2,
    X,
    ShieldCheck,
    BadgeCheck,
    ArrowLeft,
} from "lucide-react";

export function GetSingleUser({
    open,
    setOpen,
    user,
    handleUpdate,
    handleDelete,
    deleteLoading,
}) {
    if (!open || !user) return null;

    const details = [
        {
            label: "User ID",
            value: `#${user.id || "N/A"}`,
            icon: Hash,
            iconBg: "bg-blue-500/10",
            iconColor: "text-blue-400",
        },
        {
            label: "Username",
            value: user.username || "N/A",
            icon: User,
            iconBg: "bg-indigo-500/10",
            iconColor: "text-indigo-400",
        },
        {
            label: "Email Address",
            value: user.email || "N/A",
            icon: Mail,
            iconBg: "bg-cyan-500/10",
            iconColor: "text-cyan-400",
        },
        {
            label: "User Role",
            value: user.role || "User",
            icon: ShieldCheck,
            iconBg: "bg-violet-500/10",
            iconColor: "text-violet-400",
        },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-3 sm:p-4">
            <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
                {/* top actions */}
                <div className="absolute left-4 right-4 top-4 z-20 flex items-center justify-between">
                    <button
                        onClick={() => setOpen(false)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-800/90 text-slate-200 transition hover:bg-slate-700 hover:text-white"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>

                    <button
                        onClick={() => setOpen(false)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-800/90 text-slate-200 transition hover:bg-slate-700 hover:text-white"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* scrollable area */}
                <div className="max-h-[90vh] overflow-y-auto">
                    {/* profile header */}
                    <div className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/40 px-5 pb-6 pt-16 sm:px-8">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 text-3xl font-bold text-white shadow-lg shadow-blue-900/30">
                                    {user.username?.charAt(0)?.toUpperCase() || "U"}
                                </div>

                                <div className="min-w-0">
                                    <h2 className="truncate text-2xl font-bold text-white sm:text-3xl">
                                        {user.username || "Unknown User"}
                                    </h2>
                                    <p className="mt-1 break-all text-sm text-slate-400">
                                        {user.email || "No email available"}
                                    </p>

                                    <div
                                        className={`mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ${
                                            user.user_status
                                                ? "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20"
                                                : "bg-red-500/10 text-red-400 ring-red-500/20"
                                        }`}
                                    >
                                        <BadgeCheck className="h-4 w-4" />
                                        {user.user_status ? "Active User" : "Deleted User"}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 sm:w-auto">
                                <button
                                    onClick={handleUpdate}
                                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                                >
                                    <Pencil className="h-4 w-4" />
                                    Update
                                </button>

                                <button
                                    onClick={handleDelete}
                                    disabled={deleteLoading}
                                    className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                                        deleteLoading
                                            ? "cursor-not-allowed bg-slate-700 text-slate-400"
                                            : "bg-red-500/10 text-red-400 ring-1 ring-red-500/20 hover:bg-red-500 hover:text-white"
                                    }`}
                                >
                                    <Trash2 className="h-4 w-4" />
                                    {deleteLoading ? "Deleting..." : "Delete"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* content */}
                    <div className="p-5 sm:p-8">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-white">
                                User Information
                            </h3>
                            <p className="mt-1 text-sm text-slate-400">
                                Review the selected user's details and take action.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {details.map((item, index) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={index}
                                        className="rounded-2xl border border-slate-800 bg-slate-950 p-4 sm:p-5"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div
                                                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${item.iconBg}`}
                                            >
                                                <Icon className={`h-5 w-5 ${item.iconColor}`} />
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-sm text-slate-400">
                                                    {item.label}
                                                </p>
                                                <h4 className="mt-1 break-all text-base font-semibold text-white sm:text-lg">
                                                    {item.value}
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* footer note */}
                        <div className="mt-6 border-t border-slate-800 pt-5">
                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                <ShieldCheck className="h-4 w-4 text-blue-400" />
                                Secure user management panel
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
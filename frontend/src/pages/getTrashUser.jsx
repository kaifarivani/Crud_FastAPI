
import React, { useEffect, useMemo, useState } from "react";

import { useGetTrashUsers } from "../api/hooks/useGetTrashUser";

import {
    Search,
    Trash2,
    Users,
    UserX,
    RotateCcw,
    X,
    ShieldAlert,
} from "lucide-react";

export function GetTrashUser({
    open,
    setOpen,
}) {

    const {
        users = [],
        loading,
        error,
        emptyMessage,
        deleteUser,
        restoreUser,
    } = useGetTrashUsers();

    const [search, setSearch] = useState("");

    const [filter, setFilter] =
        useState("all");

    // =========================
    // DISABLE BODY SCROLL
    // =========================
    useEffect(() => {

        if (open) {
            document.body.style.overflow =
                "hidden";
        } else {
            document.body.style.overflow =
                "auto";
        }

        return () => {
            document.body.style.overflow =
                "auto";
        };

    }, [open]);

    // =========================
    // FILTER USERS
    // =========================
    const filteredUsers = useMemo(() => {

        return users.filter((user) => {

            const matchesSearch =

                user.username
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )

                ||

                user.email
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );

            if (filter === "active") {

                return (
                    user.user_status === true &&
                    matchesSearch
                );
            }

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
    // CLOSE MODAL
    // =========================
    if (!open) return null;

    return (

        <div
            className="
                fixed inset-0
                z-50

                bg-slate-900
                backdrop-blur-md

                flex items-center justify-center

                mx-10
            "
        >

            {/* BACKDROP */}
            <div
                className="absolute inset-0"
                onClick={() =>
                    setOpen(false)
                }
            />

            {/* MODAL */}
            <div
                className="
                    relative z-10

                    w-full
                    max-w-6xl

                    max-h-[95vh]

                    overflow-hidden

                    rounded-3xl

                    border border-white/10

                    bg-slate-900

                "
            >

                {/* HEADER */}
                <div
                    className="
                        flex items-center
                        justify-between

                        border-b border-white/10

                        px-10 py-5
                    "
                >

                    <div>

                        <p
                            className="
                                text-2xl
                                font-black
                                text-white
                            "
                        >
                            Trash Users
                        </p>

                        <p
                            className="
                                mt-1
                                text-sm
                                text-white
                            "
                        >
                            Restore or permanently
                            delete users
                        </p>

                    </div>

                    {/* CLOSE */}
                    <button
                        onClick={() =>
                            setOpen(false)
                        }
                        className="
                            w-11 h-11

                            rounded-2xl

                            bg-white/5

                            flex items-center
                            justify-center

                            text-white

                            hover:bg-red-500

                            transition-all
                        "
                    >

                        <X className="w-5 h-5" />

                    </button>

                </div>

                {/* BODY */}
                <div
                    className="
                        overflow-y-auto
                        max-h-[calc(95vh-90px)]

                        p-6
                        space-y-6
                    "
                >

                    {/* LOADING */}
                    {
                        loading && (

                            <div
                                className="
                                    flex items-center
                                    justify-center

                                    py-24
                                "
                            >

                                <div
                                    className="
                                        text-center
                                    "
                                >

                                    <div
                                        className="
                                            w-14 h-14

                                            border-4
                                            border-red-500/20
                                            border-t-red-500

                                            rounded-full
                                            animate-spin

                                            mx-auto
                                        "
                                    />

                                    <h2
                                        className="
                                            mt-5

                                            text-lg
                                            font-bold

                                            text-white
                                        "
                                    >
                                        Loading Trash
                                        Users...
                                    </h2>

                                </div>

                            </div>
                        )
                    }

                    {/* ERROR */}
                    {
                        error && (

                            <div
                                className="
                                    rounded-3xl

                                    border
                                    border-red-500/20

                                    bg-red-500/10

                                    p-8

                                    text-center
                                "
                            >

                                <ShieldAlert
                                    className="
                                        w-14 h-14
                                        text-red-400

                                        mx-auto
                                    "
                                />

                                <h2
                                    className="
                                        mt-4

                                        text-2xl
                                        font-black

                                        text-red-400
                                    "
                                >
                                    {error}
                                </h2>

                            </div>
                        )
                    }

                    {/* CONTENT */}
                    {
                        !loading && !error && (
                            <>
                                {/* STATS */}
                                <div
                                    className="
                                        grid
                                        grid-cols-1
                                        md:grid-cols-3
                                        gap-5
                                    "
                                >

                                    {/* TOTAL */}
                                    <div
                                        className="
                                            rounded-3xl

                                            border
                                            border-white/10

                                            bg-white/5

                                            p-6
                                        "
                                    >

                                        <div
                                            className="
                                                flex
                                                items-center
                                                justify-between
                                            "
                                        >

                                            <div>

                                                <p
                                                    className="
                                                        text-slate-400
                                                    "
                                                >
                                                    Total
                                                    Users
                                                </p>

                                                <h2
                                                    className="
                                                        mt-3

                                                        text-3xl
                                                        font-black

                                                        text-white
                                                    "
                                                >
                                                    {
                                                        users.length
                                                    }
                                                </h2>

                                            </div>

                                            <div
                                                className="
                                                    w-16 h-16

                                                    rounded-2xl

                                                    bg-blue-500/20

                                                    flex
                                                    items-center
                                                    justify-center
                                                "
                                            >

                                                <Users
                                                    className="
                                                        text-blue-400
                                                    "
                                                />

                                            </div>

                                        </div>

                                    </div>

                                    {/* TRASH */}
                                    <div
                                        className="
                                            rounded-3xl

                                            border
                                            border-white/10

                                            bg-white/5

                                            p-6
                                        "
                                    >

                                        <div
                                            className="
                                                flex
                                                items-center
                                                justify-between
                                            "
                                        >

                                            <div>

                                                <p
                                                    className="
                                                        text-slate-400
                                                    "
                                                >
                                                    Trash
                                                    Users
                                                </p>

                                                <h2
                                                    className="
                                                        mt-3

                                                        text-3xl
                                                        font-black

                                                        text-white
                                                    "
                                                >
                                                    {
                                                        users.filter(
                                                            (
                                                                u
                                                            ) =>
                                                                !u.user_status
                                                        )
                                                            .length
                                                    }
                                                </h2>

                                            </div>

                                            <div
                                                className="
                                                    w-16 h-16

                                                    rounded-2xl

                                                    bg-yellow-500/20

                                                    flex
                                                    items-center
                                                    justify-center
                                                "
                                            >

                                                <UserX
                                                    className="
                                                        text-yellow-400
                                                    "
                                                />

                                            </div>

                                        </div>

                                    </div>

                                    {/* DELETED */}
                                    <div
                                        className="
                                            rounded-3xl

                                            border
                                            border-white/10

                                            bg-white/5

                                            p-6
                                        "
                                    >

                                        <div
                                            className="
                                                flex
                                                items-center
                                                justify-between
                                            "
                                        >

                                            <div>

                                                <p
                                                    className="
                                                        text-slate-400
                                                    "
                                                >
                                                    Deleted
                                                    Users
                                                </p>

                                                <h2
                                                    className="
                                                        mt-3

                                                        text-3xl
                                                        font-black

                                                        text-white
                                                    "
                                                >
                                                    {
                                                        users.filter(
                                                            (
                                                                u
                                                            ) =>
                                                                u.is_deleted
                                                        )
                                                            .length
                                                    }
                                                </h2>

                                            </div>

                                            <div
                                                className="
                                                    w-16 h-16

                                                    rounded-2xl

                                                    bg-red-500/20

                                                    flex
                                                    items-center
                                                    justify-center
                                                "
                                            >

                                                <Trash2
                                                    className="
                                                        text-red-400
                                                    "
                                                />

                                            </div>

                                        </div>

                                    </div>

                                </div>

                                {/* SEARCH + FILTER */}
                                <div
                                    className="
                                        flex
                                        flex-col
                                        lg:flex-row

                                        gap-4
                                        lg:items-center
                                        lg:justify-between
                                    "
                                >

                                    {/* SEARCH */}
                                    <div
                                        className="
                                            relative

                                            w-full
                                            lg:max-w-md
                                        "
                                    >

                                        <Search
                                            className="
                                                absolute
                                                left-4
                                                top-1/2
                                                -translate-y-1/2

                                                w-4 h-4

                                                text-slate-400
                                            "
                                        />

                                        <input
                                            type="text"
                                            placeholder="Search users..."
                                            value={
                                                search
                                            }
                                            onChange={(
                                                e
                                            ) =>
                                                setSearch(
                                                    e
                                                        .target
                                                        .value
                                                )
                                            }
                                            className="
                                                w-full

                                                rounded-2xl

                                                border
                                                border-white/10

                                                bg-white/5

                                                py-3
                                                pl-11
                                                pr-4

                                                text-white

                                                outline-none

                                                focus:ring-4
                                                focus:ring-red-500/20
                                            "
                                        />

                                    </div>

                                    {/* FILTER */}
                                    <select
                                        value={filter}
                                        onChange={(
                                            e
                                        ) =>
                                            setFilter(
                                                e
                                                    .target
                                                    .value
                                            )
                                        }
                                        className="
                                            rounded-2xl

                                            border
                                            border-white/10

                                            bg-slate-900

                                            px-4 py-3

                                            text-white

                                            outline-none
                                        "
                                    >

                                        <option value="all">
                                            All
                                            Users
                                        </option>

                                        <option value="active">
                                            Active
                                        </option>

                                        <option value="deleted">
                                            Deleted
                                        </option>

                                    </select>

                                </div>

                                {/* TABLE */}
                                <div
                                    className="
                                        overflow-x-auto

                                        rounded-3xl

                                        border
                                        border-white/10
                                    "
                                >

                                    <table
                                        className="
                                            w-full
                                            min-w-[750px]
                                        "
                                    >

                                        <thead
                                            className="
                                                bg-white/5
                                            "
                                        >

                                            <tr>

                                                <th
                                                    className="
                                                        px-6 py-4

                                                        text-left

                                                        text-sm
                                                        font-semibold

                                                        text-slate-300
                                                    "
                                                >
                                                    User
                                                </th>

                                                <th
                                                    className="
                                                        px-6 py-4

                                                        text-left

                                                        text-sm
                                                        font-semibold

                                                        text-slate-300
                                                    "
                                                >
                                                    Email
                                                </th>

                                                <th
                                                    className="
                                                        px-6 py-4

                                                        text-left

                                                        text-sm
                                                        font-semibold

                                                        text-slate-300
                                                    "
                                                >
                                                    Status
                                                </th>

                                                <th
                                                    className="
                                                        px-6 py-4

                                                        text-center

                                                        text-sm
                                                        font-semibold

                                                        text-slate-300
                                                    "
                                                >
                                                    Actions
                                                </th>

                                            </tr>

                                        </thead>

                                        <tbody>

                                            {
                                                filteredUsers.length >
                                                    0 ? (

                                                    filteredUsers.map(
                                                        (
                                                            user
                                                        ) => (

                                                            <tr
                                                                key={
                                                                    user.id
                                                                }
                                                                className="
                                                                    border-b
                                                                    border-white/5

                                                                    hover:bg-white/5

                                                                    transition
                                                                "
                                                            >

                                                                {/* USER */}
                                                                <td
                                                                    className="
                                                                        px-6 py-5
                                                                    "
                                                                >

                                                                    <div
                                                                        className="
                                                                            flex
                                                                            items-center
                                                                            gap-4
                                                                        "
                                                                    >

                                                                        <div
                                                                            className="
                                                                                w-12 h-12

                                                                                rounded-2xl

                                                                                bg-gradient-to-r
                                                                                from-red-500
                                                                                to-rose-600

                                                                                flex
                                                                                items-center
                                                                                justify-center

                                                                                text-white
                                                                                font-bold
                                                                            "
                                                                        >

                                                                            {
                                                                                user.username
                                                                                    ?.charAt(
                                                                                        0
                                                                                    )
                                                                                    .toUpperCase()
                                                                            }

                                                                        </div>

                                                                        <div>

                                                                            <h3
                                                                                className="
                                                                                    text-white
                                                                                    font-semibold
                                                                                "
                                                                            >
                                                                                {
                                                                                    user.username
                                                                                }
                                                                            </h3>

                                                                            <p
                                                                                className="
                                                                                    text-sm
                                                                                    text-slate-400
                                                                                "
                                                                            >
                                                                                ID
                                                                                #
                                                                                {
                                                                                    user.id
                                                                                }
                                                                            </p>

                                                                        </div>

                                                                    </div>

                                                                </td>

                                                                {/* EMAIL */}
                                                                <td
                                                                    className="
                                                                        px-6 py-5

                                                                        text-slate-300
                                                                    "
                                                                >
                                                                    {
                                                                        user.email
                                                                    }
                                                                </td>

                                                                {/* STATUS */}
                                                                <td
                                                                    className="
                                                                        px-6 py-5
                                                                    "
                                                                >

                                                                    <span
                                                                        className="
                                                                            px-4 py-1.5

                                                                            rounded-full

                                                                            text-xs
                                                                            font-semibold

                                                                            border

                                                                            bg-red-500/10
                                                                            border-red-500/20
                                                                            text-red-400
                                                                        "
                                                                    >
                                                                        Deleted
                                                                    </span>

                                                                </td>

                                                                {/* ACTION */}
                                                                <td
                                                                    className="
                                                                        px-6 py-5
                                                                    "
                                                                >

                                                                    <div
                                                                        className="
                                                                            flex
                                                                            items-center
                                                                            justify-center
                                                                            gap-3
                                                                        "
                                                                    >

                                                                        {/* RESTORE */}
                                                                        <button
                                                                            onClick={() =>
                                                                                restoreUser(
                                                                                    user.id
                                                                                )
                                                                            }
                                                                            className="
                                                                                w-10 h-10

                                                                                rounded-xl

                                                                                bg-green-500/10

                                                                                text-green-400

                                                                                flex
                                                                                items-center
                                                                                justify-center

                                                                                hover:bg-green-500/20

                                                                                transition
                                                                            "
                                                                        >

                                                                            <RotateCcw
                                                                                className="
                                                                                    w-4 h-4
                                                                                "
                                                                            />

                                                                        </button>

                                                                        {/* DELETE */}
                                                                        <button
                                                                            onClick={() =>
                                                                                deleteUser(
                                                                                    user.id
                                                                                )
                                                                            }
                                                                            className="
                                                                                w-10 h-10

                                                                                rounded-xl

                                                                                bg-red-500/10

                                                                                text-red-400

                                                                                flex
                                                                                items-center
                                                                                justify-center

                                                                                hover:bg-red-500/20

                                                                                transition
                                                                            "
                                                                        >

                                                                            <Trash2
                                                                                className="
                                                                                    w-4 h-4
                                                                                "
                                                                            />

                                                                        </button>

                                                                    </div>

                                                                </td>

                                                            </tr>
                                                        )
                                                    )

                                                ) : (

                                                    <tr>

                                                        <td
                                                            colSpan="4"
                                                            className="
                                                                py-20

                                                                text-center
                                                            "
                                                        >

                                                            <div
                                                                className="
                                                                    flex
                                                                    flex-col
                                                                    items-center
                                                                    justify-center
                                                                "
                                                            >

                                                                <div
                                                                    className="
                                                                        w-24 h-24

                                                                        rounded-full

                                                                        bg-white/5

                                                                        flex
                                                                        items-center
                                                                        justify-center

                                                                        mb-6
                                                                    "
                                                                >

                                                                    <Trash2
                                                                        className="
                                                                            w-10 h-10
                                                                            text-slate-500
                                                                        "
                                                                    />

                                                                </div>

                                                                <h2
                                                                    className="
                                                                        text-3xl
                                                                        font-bold
                                                                        text-white
                                                                    "
                                                                >
                                                                    {
                                                                        emptyMessage ||
                                                                        "No Trash Users"
                                                                    }
                                                                </h2>

                                                                <p
                                                                    className="
                                                                        mt-3

                                                                        text-slate-400
                                                                    "
                                                                >
                                                                    Deleted
                                                                    users
                                                                    will
                                                                    appear
                                                                    here
                                                                </p>

                                                            </div>

                                                        </td>

                                                    </tr>
                                                )
                                            }

                                        </tbody>

                                    </table>

                                </div>

                            </>
                        )
                    }

                </div>

            </div>

        </div>
    );
}
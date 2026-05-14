import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetUsers } from "../api/hooks/usegetAllUser";

export function GetAllUser() {

    const navigate = useNavigate();

    const {
        users,
        loading,
        error,
        deleteUser,
    } = useGetUsers();

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) return;

        const response = await deleteUser(id);

        if (response.success) {

            alert(response.message);

        } else {

            alert(response.message);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <h1 className="text-3xl font-bold text-blue-600 animate-pulse">
                    Loading Users...
                </h1>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <h1 className="text-2xl text-red-500">
                    {error}
                </h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 p-8">

            {/* Header */}
            <div className="flex justify-between items-center mb-10">

                <h1 className="text-4xl font-bold text-gray-800">
                    All Users
                </h1>

                <button
                    onClick={() => navigate("/add-user")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl shadow-lg transition"
                >
                    Add User
                </button>
            </div>

            {/* Users Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {users.length > 0 ? (

                    users.map((user) => (

                        <div
                            key={user.id}
                            className="bg-white rounded-3xl shadow-xl p-6 hover:scale-105 transition duration-300"
                        >

                            {/* Avatar */}
                            <div className="flex justify-center">

                                <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold shadow-lg">
                                    {user.username?.charAt(0).toUpperCase()}
                                </div>
                            </div>

                            {/* User Info */}
                            <div className="text-center mt-5">

                                <h2 className="text-2xl font-bold text-gray-800">
                                    {user.username}
                                </h2>

                                <p className="text-gray-500 mt-2 break-all">
                                    {user.email}
                                </p>

                                <p className="text-gray-400 mt-1">
                                    User ID: #{user.id}
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 mt-6">

                                <button
                                    onClick={() =>
                                        navigate(`/user/${user.id}`)
                                    }
                                    className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-xl transition"
                                >
                                    View
                                </button>

                                <button
                                    onClick={() =>
                                        navigate(`/update-user/${user.id}`)
                                    }
                                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-xl transition"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() =>
                                        handleDelete(user.id)
                                    }
                                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition"
                                >
                                    Delete
                                </button>

                            </div>
                        </div>
                    ))

                ) : (

                    <div className="col-span-full text-center text-2xl text-gray-500">
                        No Users Found
                    </div>
                )}
            </div>
        </div>
    );
}


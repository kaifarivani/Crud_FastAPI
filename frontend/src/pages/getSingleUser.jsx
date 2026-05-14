

import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usegetSingleUser } from "../api/hooks/getSingleUser";

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
        navigate(`/update-user/${id}`);
    };

    const handleDelete = async () => {

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

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-indigo-100">
                <div className="text-2xl font-bold text-blue-600 animate-pulse">
                    Loading User...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-red-50 px-4">
                <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">
                        Error
                    </h1>

                    <p className="text-gray-700">
                        {error}
                    </p>

                    <button
                        onClick={() => navigate("/users")}
                        className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition"
                    >
                        Back
                    </button>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-100">
                <h1 className="text-3xl font-bold text-gray-500">
                    User Not Found
                </h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex justify-center items-center p-5">

            <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl w-full max-w-lg overflow-hidden">

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-32 relative">

                    <div className="absolute left-1/2 transform -translate-x-1/2 top-14">

                        <div className="w-28 h-28 rounded-full border-4 border-white bg-white shadow-xl flex items-center justify-center text-5xl font-bold text-blue-600">
                            {user.username?.charAt(0).toUpperCase()}
                        </div>

                    </div>
                </div>

                {/* Content */}
                <div className="pt-20 px-8 pb-8">

                    <div className="text-center">

                        <h1 className="text-3xl font-bold text-gray-800">
                            {user.username}
                        </h1>

                        <p className="text-gray-500 mt-2">
                            {user.email}
                        </p>

                    </div>

                    {/* User Info */}
                    <div className="mt-8 space-y-4">

                        <div className="bg-gray-100 hover:bg-gray-200 transition p-4 rounded-2xl">
                            <p className="text-sm text-gray-500">
                                User ID
                            </p>

                            <p className="text-lg font-semibold text-gray-800">
                                #{user.id}
                            </p>
                        </div>

                        <div className="bg-gray-100 hover:bg-gray-200 transition p-4 rounded-2xl">
                            <p className="text-sm text-gray-500">
                                Username
                            </p>

                            <p className="text-lg font-semibold text-gray-800">
                                {user.username}
                            </p>
                        </div>

                        <div className="bg-gray-100 hover:bg-gray-200 transition p-4 rounded-2xl">
                            <p className="text-sm text-gray-500">
                                Email Address
                            </p>

                            <p className="text-lg font-semibold text-gray-800 break-all">
                                {user.email}
                            </p>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 mt-8">

                        <button
                            onClick={handleUpdate}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-semibold transition duration-300 shadow-md hover:shadow-xl"
                        >
                            Update
                        </button>

                        <button
                            onClick={handleDelete}
                            disabled={deleteLoading}
                            className={`flex-1 py-3 rounded-2xl font-semibold transition duration-300 shadow-md hover:shadow-xl text-white
                                
                                ${deleteLoading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-red-500 hover:bg-red-600"
                                }
                            `}
                        >
                            {deleteLoading ? "Deleting..." : "Delete"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default GetSingleUser;
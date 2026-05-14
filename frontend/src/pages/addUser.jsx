// pages/AddUser.jsx

import { useAddUser } from "../api/hooks/useAddUser";

export function AddUser() {

    const {
        data,
        loading,
        error,
        success,
        handleChange,
        handleSubmit,
    } = useAddUser();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex justify-center items-center px-4 py-10">

            <div className="bg-white shadow-2xl rounded-3xl w-full max-w-md p-8">

                {/* Header */}
                <div className="text-center mb-8">

                    <div className="w-20 h-20 mx-auto rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                        +
                    </div>

                    <h1 className="text-3xl font-bold text-gray-800 mt-4">
                        Add New User
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Create a new account
                    </p>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl mb-5">
                        {success}
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-5">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {/* Username */}
                    <div>

                        <label className="block text-gray-700 font-medium mb-2">
                            Username
                        </label>

                        <input
                            type="text"
                            name="username"
                            value={data.username}
                            onChange={handleChange}
                            placeholder="Enter Username"
                            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    {/* Email */}
                    <div>

                        <label className="block text-gray-700 font-medium mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            placeholder="Enter Email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    {/* Password */}
                    <div>

                        <label className="block text-gray-700 font-medium mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            placeholder="Enter Password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>

                        <label className="block text-gray-700 font-medium mb-2">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            name="confirmPassword"
                            value={data.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm Password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-2xl text-white font-semibold shadow-lg transition duration-300
                            
                            ${loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 hover:shadow-xl"
                            }
                        `}
                    >
                        {loading ? "Creating User..." : "Add User"}
                    </button>

                </form>
            </div>
        </div>
    );
}


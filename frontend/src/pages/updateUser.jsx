import { useUpdateUser } from "../api/hooks/useUpdateUser";

function UpdateUser() {

    const {
        data,
        loading,
        error,
        success,
        handleChange,
        handleSubmit,
    } = useUpdateUser();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex justify-center items-center px-4 py-10">

            <div className="bg-white shadow-2xl rounded-3xl w-full max-w-md p-8">

                {/* Header */}
                <div className="text-center mb-8">

                    <div className="w-20 h-20 mx-auto rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                        ✏️
                    </div>

                    <h1 className="text-3xl font-bold text-gray-800 mt-4">
                        Update User
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Edit user information
                    </p>
                </div>

                {/* Success */}
                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl mb-5">
                        {success}
                    </div>
                )}

                {/* Error */}
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
                            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-2xl text-white font-semibold shadow-lg transition
                            
                            ${
                                loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                            }
                        `}
                    >
                        {loading ? "Updating..." : "Update User"}
                    </button>

                </form>
            </div>
        </div>
    );
}

export default UpdateUser;
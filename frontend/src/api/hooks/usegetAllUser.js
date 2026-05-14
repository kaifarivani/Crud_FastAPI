import { useEffect, useState, useCallback } from "react";
import { UserServices } from "../services/user_Services";

export const useGetUsers = () => {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const fetchAllUsers = useCallback(async () => {

        try {

            setLoading(true);

            setError("");

            const response = await UserServices.getUsers();

            setUsers(response.data || response);

        } catch (err) {

            console.log(err);

            setError(
                err?.response?.data?.detail ||
                err?.message ||
                "Failed to fetch users"
            );

        } finally {

            setLoading(false);
        }

    }, []);

    const deleteUser = async (id) => {

        try {

            await UserServices.deleteUser(id);

            setUsers((prev) =>
                prev.filter((user) => user.id !== id)
            );

            return {
                success: true,
                message: "User deleted successfully",
            };

        } catch (err) {

            console.log(err);

            return {
                success: false,
                message:
                    err?.response?.data?.detail ||
                    "Failed to delete user",
            };
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, [fetchAllUsers]);

    return {
        users,
        loading,
        error,
        fetchAllUsers,
        deleteUser,
    };
};
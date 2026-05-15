
import { useEffect, useState, useCallback } from "react";
import { UserServices } from "../services/user_Services";

export const usegetSingleUser = (id) => {
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const [deleteLoading, setDeleteLoading] = useState(false);

    const [error, setError] = useState("");

    const fetchSingleUser = useCallback(async () => {
        try {
            setLoading(true);

            setError("");

            const response = await UserServices.getSingleUser(id);

            setUser(response.data || response);

        } catch (err) {

            console.log(err);

            setError(
                err?.response?.data?.detail ||
                err?.message ||
                "Failed to fetch user"
            );

        } finally {

            setLoading(false);
        }
    }, [id]);

    const deleteUser = async () => {
        try {

            setDeleteLoading(true);

            await UserServices.softDeleteUser(id);

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

        } finally {

            setDeleteLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchSingleUser();
        }
    }, [id, fetchSingleUser]);

    return {
        user,
        loading,
        deleteLoading,
        error,
        fetchSingleUser,
        deleteUser,
    };
};
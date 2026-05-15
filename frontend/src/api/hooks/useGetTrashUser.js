import { useEffect, useState, useCallback } from "react";

import { UserServices } from "../services/user_Services";

import { useNavigate } from "react-router";

export const useGetTrashUsers = () => {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [emptyMessage, setEmptyMessage] = useState("");

    const navigate = useNavigate();

    // FETCH TRASH USERS
    const fetchAllUsers = useCallback(async () => {

        try {

            setLoading(true);

            setError("");

            const response =
                await UserServices.getTrashUser();

            const trashUsers =
                response?.data || response || [];

            // EMPTY STATE
            if (
                Array.isArray(trashUsers) &&
                trashUsers.length === 0
            ) {

                setEmptyMessage(
                    "Trash is empty"
                );

            } else {

                setEmptyMessage("");

            }

            setUsers(
                Array.isArray(trashUsers)
                    ? trashUsers
                    : []
            );

        } catch (err) {

            console.log(err);

            // NETWORK ERROR
            if (!err.response) {

                setError(
                    "Network error. Please check server connection."
                );

            } else {

                setError(
                    err?.response?.data?.detail ||
                    "Failed to fetch trash users"
                );

            }

            setUsers([]);

        } finally {

            setLoading(false);

        }

    }, []);

    // HARD DELETE USER
    const deleteUser = async (id) => {

        try {

            const user_id =
                localStorage.getItem("user_id");

            const isOwnAccount =
                String(user_id) === String(id);

            const confirmDelete = window.confirm(
                "Are you sure you want to permanently delete this user?"
            );

            if (!confirmDelete) {

                return {
                    success: false,
                    message: "Deletion cancelled",
                };

            }

            await UserServices.hardDeleteUser(id);

            setUsers((prev) =>
                prev.filter(
                    (user) => user.id !== id
                )
            );

            // UPDATE EMPTY MESSAGE
            if (users.length === 1) {

                setEmptyMessage(
                    "Trash is empty"
                );

            }

            // OWN ACCOUNT
            if (isOwnAccount) {

                localStorage.clear();

                navigate("/");

            }

            return {
                success: true,
                message:
                    "User permanently deleted successfully",
            };

        } catch (err) {

            console.log(err);

            return {
                success: false,
                message:
                    err?.response?.data?.detail ||
                    err?.message ||
                    "Failed to delete user",
            };

        }

    };

    // RESTORE USER
    const restoreUser = async (id) => {

        try {

            await UserServices.restoreUser(id);

            setUsers((prev) =>
                prev.filter(
                    (user) => user.id !== id
                )
            );

            // UPDATE EMPTY MESSAGE
            if (users.length === 1) {

                setEmptyMessage(
                    "Trash is empty"
                );

            }

            return {
                success: true,
                message:
                    "User restored successfully",
            };

        } catch (err) {

            console.log(err);

            if (
                err?.response?.status === 404
            ) {

                return {
                    success: false,
                    message:
                        "User does not exist in trash",
                };

            }

            if (!err.response) {

                return {
                    success: false,
                    message:
                        "Network error. Server not responding.",
                };

            }

            return {
                success: false,
                message:
                    err?.response?.data?.detail ||
                    "Failed to restore user",
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
        emptyMessage,
        fetchAllUsers,
        deleteUser,
        restoreUser,
    };
};
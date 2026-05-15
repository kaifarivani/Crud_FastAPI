import { useEffect, useState, useCallback } from "react";
import { UserServices } from "../services/user_Services";
import { useNavigate } from "react-router";

export const useGetUsers = () => {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);
    const navigate=useNavigate();
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

        const user_id = localStorage.getItem("user_id");

        console.log(user_id, id);
        
        // convert both to string
        const isOwnAccount = String(user_id) === String(id);

        if (isOwnAccount) {

            const confirmDelete = window.confirm(
                "Do you want to delete your account?"
            );

            if (!confirmDelete) {
                return {
                    success: false,
                    message: "Deletion cancelled",
                };
            }
        }

        const response = await UserServices.softDeleteUser(id);

        setUsers((prev) =>
            prev.filter((user) => user.id !== id)
        );

        // logout if own account deleted
        alert("YUO self deleted ")
        alert(isOwnAccount)
        if (isOwnAccount) {

            localStorage.clear();

            navigate("/");
        }

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
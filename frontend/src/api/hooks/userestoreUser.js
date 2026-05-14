import { useState } from "react";
import { UserServices } from "../services/user_Services";

export const useUserRestore = () => {

    const [data, setData] = useState({
        id: "",
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    const handleChange = (e) => {

        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            setError("");

            setSuccess("");

            const response = await UserServices.restoreUser(data.id);

            console.log(response);

            setSuccess("User Restored Successfully");

            return response;

        } catch (err) {

            console.log(err);

            setError(
                err?.response?.data?.detail ||
                "Failed to restore user"
            );

        } finally {

            setLoading(false);
        }
    };

    return {
        data,
        loading,
        error,
        success,
        handleChange,
        handleSubmit,
    };
};
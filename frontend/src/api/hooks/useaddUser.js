// hooks/useAddUser.js

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserServices } from "../services/user_Services";

export const useAddUser = () => {

    const navigate = useNavigate();

    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    const handleChange = (e) => {

        setError("");

        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {

        if (
            !data.username ||
            !data.email ||
            !data.password ||
            !data.confirmPassword
        ) {
            setError("All fields are required");
            return false;
        }

        if (data.password.length < 6) {
            setError("Password must be at least 6 characters");
            return false;
        }

        if (data.password !== data.confirmPassword) {
            setError("Passwords do not match");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        setSuccess("");

        if (!validateForm()) return;

        try {

            setLoading(true);

            const payload = {
                username: data.username,
                email: data.email,
                password: data.password,
                confirm_password:data.confirmPassword
            };

            const response = await UserServices.addUser(payload);

            if (response.status === 201 || response.status === 200) {

                setSuccess("User created successfully");

                setData({
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
                alert(" User Created Successfullyy ")


                setTimeout(() => {
                    navigate("/dashboard/users");
                }, 1000);
            }

        } catch (err) {

            console.log(err);

            setError(
                err?.response?.data?.detail ||
                err?.message ||
                "Failed to create user"
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
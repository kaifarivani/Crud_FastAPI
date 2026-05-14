import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthServices } from "../services/auth_Services";

export const useSignup = () => {

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
            setError(
                "Password must be at least 6 characters"
            );
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
                confirm_password: data.confirmPassword,
            };
            console.log()
            const response =
                await AuthServices.signupUser(payload);

            console.log(response);

            if (
                response.status === 200 ||
                response.status === 201
            ) {

                setSuccess(
                    "Account Created Successfully"
                );

                setData({
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });

                setTimeout(() => {
                    navigate("/dashboard");
                }, 1500);
            }

        } catch (err) {

            console.log(err);

            setError(
                err?.response?.data?.detail ||
                "Signup Failed"
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
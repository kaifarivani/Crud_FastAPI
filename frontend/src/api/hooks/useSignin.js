import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthServices } from "../services/auth_Services";

export const useSignin = () => {

    const navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");



    // Handle Input Change
    const handleChange = (e) => {

        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };



    // Handle Submit
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            setError("");

            const response =
                await AuthServices.signinUser(data);

            console.log(response);

            // Success Login
            if (
                response.status === 200 ||
                response.status === 201
            ) 
            // {

                // // Save Token
                // localStorage.setItem(
                //     "token",
                //     response.access_token
                // );

                // // Save User ID
                // localStorage.setItem(
                //     "user_id",
                //     response.id
                // );

                // alert("Login Successful");

                // // Redirect
                // navigate("/dashboard/users");
            // }
             // Save Token
                localStorage.setItem(
                    "token",
                    response.access_token
                );

                // Save User ID
                localStorage.setItem(
                    "user_id",
                    response.id
                );

                alert("Login Successful");
                localStorage.setItem(
                    "token",
                    response.access_token
                );

                // Redirect
                navigate("/dashboard/users");
        } catch (err) {

            console.log(err);

            setError(
                err?.response?.data?.detail ||
                "Invalid Credentials"
            );

        } finally {

            setLoading(false);
        }
    };



    return {
        data,
        loading,
        error,
        handleChange,
        handleSubmit,
    };
};
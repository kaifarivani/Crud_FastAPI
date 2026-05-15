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

            const response = await AuthServices.signinUser(data);

            console.log(response);

            // Correct Status Check
            if (
                response.status === 200 ||
                response.status === 201
            ) 
{
                console.log("Login Successful");

                // Save Token
                localStorage.setItem(
                    "token",
                    response.data.access_token
                );

                // Save User ID
                localStorage.setItem(
                    "user_id",
                    response.data.id || ""
                );

                console.log(
                    localStorage.getItem("user_id"),
                    localStorage.getItem("token")
                );

                alert("Login Successful");

                }
            
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
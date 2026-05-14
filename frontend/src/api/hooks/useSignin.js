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

    // const handleSubmit = async (e) => {

    //     e.preventDefault();

    //     try {

    //         setLoading(true);

    //         setError("");

    //         const response = await AuthServices.signinUser(data);

    //         console.log(response.status_code);

    //         // success check
    //         if (
    //             response.status_code === 200 ||
    //             response.status_code === 201
    //         ) {
    //             console.log("loginn")

    //             // save token
    //             localStorage.setItem(
    //                 "token",
    //                 response.data.access_token
    //             );

    //             // save user id
    //             localStorage.setItem(
    //                 "user_id",
    //                 response.data.user.id
    //             );

    //             alert("Login Successful");

    //             navigate("/dashboard");
    //         }
    //         alert("888")

    //     } catch (err) {

    //         console.log(err);

    //         setError(
    //             err?.response?.data?.detail ||
    //             "Invalid Credentials"
    //         );

    //     } finally {

    //         setLoading(false);
    //     }
    // };



    const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        setLoading(true);

        setError("");

        const response = await AuthServices.signinUser(data);

        console.log(response);

        // Success Check
        if (
            response.status === 200 ||
            response.status === 201
        ) {

            console.log("Login Successful");

            // Save Token
            localStorage.setItem(
                "token",
                response.data.access_token
            );

            // Save User ID (if exists)
            if (response.data.user) {

                localStorage.setItem(
                    "user_id",
                    response.data.user.id
                );
            }

            alert("Login Successful");

            // Redirect to Dashboard
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
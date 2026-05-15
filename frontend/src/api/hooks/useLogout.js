import { useNavigate } from "react-router-dom";

import { useState } from "react";

import { AuthServices } from "../services/auth_Services";

export const useLogout = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const logout = async () => {

        try {

            setLoading(true);

            const user_id =
                localStorage.getItem("user_id");

            const response =
                await AuthServices.logoutUser(user_id);

            if (
                response.status === 200 ||
                response.status === 201
            ) {

                localStorage.removeItem("token");

                localStorage.removeItem("user_id");

                alert("Logout Successfully");

                navigate("/login");

            }

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    return {
        logout,
        loading,
    };

};
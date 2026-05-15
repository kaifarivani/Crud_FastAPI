import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserServices } from "../services/user_Services";

export const useUpdateUser = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [data, setData] = useState({
        username: "",
        email: "",
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    // fetch existing user
    useEffect(() => {

        const fetchUser = async () => {

            try {

                setLoading(true);

                const response =
                    await UserServices.getSingleUser(id);

                const user = response.data || response;

                setData({
                    username: user.username || "",
                    email: user.email || "",
                });

            } catch (err) {

                console.log(err);

                setError("Failed to fetch user");

            } finally {

                setLoading(false);
            }
        };

        if (id) {
            fetchUser();
        }

    }, [id]);

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

            const response =
                await UserServices.updateUser(id, data);

            console.log(response);

            if (
                response.status === 200 ||
                response.status === 201
            ) {

                setSuccess(
                    "User Updated Successfully"
                );

                setTimeout(() => {
                    navigate("/dashboard/users");
                }, 1500);
            }

        } catch (err) {

            console.log(err);

            setError(
                err?.response?.data?.detail ||
                "Update Failed"
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
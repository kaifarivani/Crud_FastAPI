import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {

    const token = localStorage.getItem("token");

    const user_id = localStorage.getItem("user_id");

    // If already logged in
    if (token && user_id) {

        return <Navigate to="/dashboard/users" replace />;
    }

    return children;
};

export default PublicRoute;
import api from "../axios";

export const AuthServices = {

    // Signup
    signupUser: async (data) => {

        const response = await api.post(
            "/signup",
            data
        );

        return response.data;
    },

    // Signin
    signinUser: async (data) => {

        const response = await api.post(
            "/signin",
            data
        );

        return response.data;
    },

    // Logout
    logoutUser: async () => {

        const response = await api.post(
            "/logout"
        );

        return response.data;
    },
};
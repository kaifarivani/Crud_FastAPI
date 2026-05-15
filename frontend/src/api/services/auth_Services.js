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

logoutUser: async (id) => {

    const response = await api.delete(
        `/logout/${id}`
    );

    return response;
},
};
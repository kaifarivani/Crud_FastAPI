import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,

    headers: {
        "Content-Type": "application/json",
    },

    timeout: 10000,
});


// Request Interceptor
api.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem("token");

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);


// Response Interceptor
api.interceptors.response.use(

    (response) => {
        return response;
    },

    (error) => {

        // Unauthorized
        if (error.response?.status === 401) {

            localStorage.removeItem("token");

            window.location.href = "/";
        }

        // Server Error
        if (error.response?.status === 500) {

            console.error(
                "Internal Server Error"
            );
        }

        return Promise.reject(error);
    }
);

export default api;
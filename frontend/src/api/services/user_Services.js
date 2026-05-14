import api from "../axios";

export const UserServices = {

    // Add User
    addUser: async (data) => {

        const response = await api.post(
            "/add_user/",
            data
        );

        return response.data;
    },

    // Get All Users
    getUsers: async () => {

        const response = await api.get(
            "/users"
        );

        return response.data;
    },

    // Get Single User
    getSingleUser: async (id) => {

        const response = await api.get(
            `/user/${id}`
        );

        return response.data;
    },

    // Update User
    updateUser: async (id, data) => {

        const response = await api.put(
            `/update_user/${id}`,
            data
        );

        return response.data;
    },

    // Delete User
    deleteUser: async (id) => {

        const response = await api.delete(
            `/delete_user/${id}`
        );

        return response.data;
    },

    // Restore User
    restoreUser: async (id) => {

        const response = await api.patch(
            `/restore_user/${id}`
        );

        return response.data;
    },

};
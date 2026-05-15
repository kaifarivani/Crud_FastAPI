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
            `/get_single_user/${id}`
        );

        return response.data;
    },

    // Update User
    updateUser: async (id, data) => {

        const response = await api.patch(
            `/update_user/${id}`,
            data
        );

        return response.data;
    },

    // Delete User
    softDeleteUser: async (id) => {

        const response = await api.delete(
            `/soft_delete_user/${id}`
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
     
    // Trash Users ()
    getTrashUser: async () => {

        const response = await api.get(
            "/trash_user"
        );

        return response.data;
    },

    // Permanently Deleted User
    hardDeleteUser:async (id)=>{
        const response=await api.delete(
            `/hard_delete_user/${id}`
        );
        return response.data;
    }

};
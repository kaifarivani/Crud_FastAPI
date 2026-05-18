// import React from "react";

// import {
//     useNavigate,
//     useParams,
// } from "react-router-dom";

// import {
//     Mail,
//     User,
//     Hash,
//     Pencil,
//     Trash2,
//     ArrowLeft,
//     ShieldCheck,
//     BadgeCheck,
// } from "lucide-react";

// import { usegetSingleUser } from "../api/hooks/useGetSingleUser";

// function GetSingleUser() {

//     const { id } = useParams();

//     const navigate = useNavigate();

//     const {
//         user,
//         loading,
//         deleteLoading,
//         error,
//         deleteUser,
//     } = usegetSingleUser(id);

//     // UPDATE
//     const handleUpdate = () => {
//         navigate(`/dashboard/update-user/${id}`);
//     };

//     // DELETE
//     const handleDelete = async () => {

//         const confirmDelete = window.confirm(
//             "Are you sure you want to delete this user?"
//         );

//         if (!confirmDelete) return;

//         const response = await deleteUser();

//         if (response?.success) {

//             alert(response.message);

//             navigate("/dashboard/users");

//         } else {

//             alert(response?.message || "Delete failed");
//         }
//     };

//     // =========================
//     // LOADING
//     // =========================
//     if (loading) {

//         return (

//             <div className="
//                 min-h-screen
//                 flex items-center justify-center
//                 bg-gradient-to-br
//                 from-slate-950
//                 via-slate-900
//                 to-blue-950
//             ">

//                 <div className="text-center">

//                     <div className="
//                         w-16 h-16
//                         border-4
//                         border-blue-500/20
//                         border-t-blue-500
//                         rounded-full
//                         animate-spin
//                         mx-auto
//                     " />

//                     <h1 className="
//                         mt-5
//                         text-xl
//                         font-bold
//                         text-white
//                     ">
//                         Loading User...
//                     </h1>

//                 </div>

//             </div>
//         );
//     }

//     // =========================
//     // ERROR
//     // =========================
//     if (error) {

//         return (

//             <div className="
//                 min-h-screen
//                 flex items-center justify-center
//                 bg-slate-950
//                 px-4
//             ">

//                 <div className="
//                     w-full
//                     max-w-md
//                     rounded-3xl
//                     bg-red-500/10
//                     border border-red-500/20
//                     p-8
//                     text-center
//                 ">

//                     <h1 className="
//                         text-3xl
//                         font-black
//                         text-red-400
//                     ">
//                         Error
//                     </h1>

//                     <p className="
//                         mt-3
//                         text-slate-300
//                     ">
//                         {error}
//                     </p>

//                     <button
//                         onClick={() =>
//                             navigate("/dashboard/users")
//                         }
//                         className="
//                             mt-6
//                             px-6 py-3
//                             rounded-2xl
//                             bg-red-500
//                             hover:bg-red-600
//                             text-white
//                             font-semibold
//                             transition
//                         "
//                     >
//                         Back
//                     </button>

//                 </div>

//             </div>
//         );
//     }

//     // =========================
//     // NO USER
//     // =========================
//     if (!user) {

//         return (

//             <div className="
//                 min-h-screen
//                 flex items-center justify-center
//                 bg-slate-950
//             ">

//                 <h1 className="
//                     text-3xl
//                     font-bold
//                     text-slate-400
//                 ">
//                     User Not Found
//                 </h1>

//             </div>
//         );
//     }

//     return (

//         <div className="
//             min-h-screen
//             bg-gradient-to-br
//             from-slate-950
//             via-slate-900
//             to-blue-950
//             flex items-center justify-center
//             px-4 py-5
//             relative overflow-hidden
//         ">

//             {/* BACKGROUND GLOW */}
//             <div className="
//                 absolute
//                 top-[-120px]
//                 left-[-120px]
//                 w-80 h-80
//                 bg-blue-500/20
//                 rounded-full
//                 blur-3xl
//             " />

//             <div className="
//                 absolute
//                 bottom-[-120px]
//                 right-[-120px]
//                 w-96 h-96
//                 bg-indigo-500/20
//                 rounded-full
//                 blur-3xl
//             " />

//             {/* MAIN CARD */}
//             <div className="
//                 relative z-10
//                 w-full
//                 max-w-2xl
//                 rounded-3xl
//                 overflow-hidden
//                 border border-white/10
//                 bg-white/10
//                 backdrop-blur-2xl
//                 shadow-[0_20px_80px_rgba(0,0,0,0.45)]
//             ">

//                 {/* HEADER */}
//                 <div className="
//                     relative
//                     px-8
//                     pt-10
//                     pb-20
//                     border-b border-white/10
//                     bg-gradient-to-r
//                     from-blue-600/10
//                     to-indigo-600/10
//                     text-center
//                 ">

//                     {/* BACK BUTTON */}
//                     <button
//                         onClick={() =>
//                             navigate("/dashboard/users")
//                         }
//                         className="
//                             absolute
//                             left-6
//                             top-6

//                             w-11 h-11
//                             rounded-2xl

//                             bg-white/10
//                             hover:bg-white/20

//                             flex items-center justify-center

//                             transition-all duration-300
//                         "
//                     >

//                         <ArrowLeft className="
//                             w-5 h-5 text-white
//                         " />

//                     </button>

//                     {/* AVATAR */}
//                     <div className="
//                         mx-auto
//                         w-28 h-28
//                         rounded-full
//                         flex items-center justify-center
//                         bg-gradient-to-br
//                         from-blue-500
//                         to-indigo-600
//                         border-4 border-white/20
//                         shadow-2xl

//                         text-5xl
//                         font-black
//                         text-white
//                     ">

//                         {user.username?.charAt(0).toUpperCase()}

//                     </div>

//                     <h1 className="
//                         mt-6
//                         text-4xl
//                         font-black
//                         text-white
//                     ">
//                         {user.username}
//                     </h1>

//                     <div className="
//                         mt-3
//                         inline-flex
//                         items-center gap-2

//                         px-4 py-2
//                         rounded-full

//                         bg-green-500/10
//                         border border-green-500/20

//                         text-green-400
//                         text-sm
//                         font-semibold
//                     ">

//                         <BadgeCheck className="w-4 h-4" />

//                         Active User

//                     </div>

//                 </div>

//                 {/* BODY */}
//                 <div className="p-8 space-y-5">

//                     {/* USER ID */}
//                     <div className="
//                         flex items-center gap-4
//                         rounded-2xl
//                         border border-white/10
//                         bg-white/5
//                         p-5
//                         hover:bg-white/10
//                         transition-all
//                     ">

//                         <div className="
//                             w-14 h-14
//                             rounded-2xl
//                             bg-blue-500/20
//                             flex items-center justify-center
//                         ">

//                             <Hash className="
//                                 w-6 h-6 text-blue-400
//                             " />

//                         </div>

//                         <div>

//                             <p className="
//                                 text-sm text-slate-400
//                             ">
//                                 User ID
//                             </p>

//                             <h2 className="
//                                 text-lg
//                                 font-bold
//                                 text-white
//                             ">
//                                 #{user.id}
//                             </h2>

//                         </div>

//                     </div>

//                     {/* USERNAME */}
//                     <div className="
//                         flex items-center gap-4
//                         rounded-2xl
//                         border border-white/10
//                         bg-white/5
//                         p-5
//                         hover:bg-white/10
//                         transition-all
//                     ">

//                         <div className="
//                             w-14 h-14
//                             rounded-2xl
//                             bg-indigo-500/20
//                             flex items-center justify-center
//                         ">

//                             <User className="
//                                 w-6 h-6 text-indigo-400
//                             " />

//                         </div>

//                         <div>

//                             <p className="
//                                 text-sm text-slate-400
//                             ">
//                                 Username
//                             </p>

//                             <h2 className="
//                                 text-lg
//                                 font-bold
//                                 text-white
//                             ">
//                                 {user.username}
//                             </h2>

//                         </div>

//                     </div>

//                     {/* EMAIL */}
//                     <div className="
//                         flex items-center gap-4
//                         rounded-2xl
//                         border border-white/10
//                         bg-white/5
//                         p-5
//                         hover:bg-white/10
//                         transition-all
//                     ">

//                         <div className="
//                             w-14 h-14
//                             rounded-2xl
//                             bg-cyan-500/20
//                             flex items-center justify-center
//                         ">

//                             <Mail className="
//                                 w-6 h-6 text-cyan-400
//                             " />

//                         </div>

//                         <div className="overflow-hidden">

//                             <p className="
//                                 text-sm text-slate-400
//                             ">
//                                 Email Address
//                             </p>

//                             <h2 className="
//                                 text-lg
//                                 font-bold
//                                 text-white
//                                 break-all
//                             ">
//                                 {user.email}
//                             </h2>

//                         </div>

//                     </div>

//                     {/* ACTION BUTTONS */}
//                     <div className="
//                         pt-4
//                         flex flex-col sm:flex-row
//                         gap-4
//                     ">

//                         {/* UPDATE */}
//                         <button
//                             onClick={handleUpdate}
//                             className="
//                                 flex-1
//                                 py-4
//                                 rounded-2xl

//                                 flex items-center justify-center gap-2

//                                 bg-gradient-to-r
//                                 from-blue-600
//                                 to-indigo-600

//                                 text-white
//                                 font-semibold

//                                 hover:scale-[1.02]

//                                 transition-all duration-300
//                             "
//                         >

//                             <Pencil className="w-5 h-5" />

//                             Update User

//                         </button>

//                         {/* DELETE */}
//                         <button
//                             onClick={handleDelete}
//                             disabled={deleteLoading}
//                             className={`
//                                 flex-1
//                                 py-4
//                                 rounded-2xl

//                                 flex items-center justify-center gap-2

//                                 text-white
//                                 font-semibold

//                                 transition-all duration-300

//                                 ${
//                                     deleteLoading
//                                         ? `
//                                             bg-gray-600
//                                             cursor-not-allowed
//                                           `
//                                         : `
//                                             bg-gradient-to-r
//                                             from-red-500
//                                             to-red-700

//                                             hover:scale-[1.02]
//                                           `
//                                 }
//                             `}
//                         >

//                             <Trash2 className="w-5 h-5" />

//                             {
//                                 deleteLoading
//                                     ? "Deleting..."
//                                     : "Delete User"
//                             }

//                         </button>

//                     </div>

//                     {/* FOOTER */}
//                     <div className="
//                         pt-6
//                         border-t border-white/10
//                         text-center
//                     ">

//                         <div className="
//                             flex items-center justify-center gap-2
//                             text-sm text-slate-400
//                         ">

//                             <ShieldCheck className="
//                                 w-4 h-4 text-blue-400
//                             " />

//                             Secure User Management Dashboard

//                         </div>

//                     </div>

//                 </div>

//             </div>

//         </div>
//     );
// }

// export default GetSingleUser;


// pages/GetSingleUserModal.jsx

import React from "react";

import {
    Mail,
    User,
    Hash,
    Pencil,
    Trash2,
    X,
    ShieldCheck,
    BadgeCheck,
} from "lucide-react";

export function GetSingleUser({
    open,
    setOpen,
    user,
    handleUpdate,
    handleDelete,
    deleteLoading,
}) {

    if (!open || !user) return null;

    return (

        <div className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/70 backdrop-blur-sm
            p-4
        ">

            {/* MODAL */}
            <div className="
                relative
                w-full
                max-w-2xl
                rounded-3xl
                overflow-hidden

                border border-white/10

                bg-slate-900

                shadow-[0_20px_80px_rgba(0,0,0,0.5)]

                animate-in fade-in zoom-in-95
            ">

                {/* CLOSE BUTTON */}
                <button
                    onClick={() => setOpen(false)}
                    className="
                        absolute
                        top-5 right-5
                        z-20

                        w-11 h-11
                        rounded-2xl

                        bg-white/10
                        hover:bg-white/20

                        flex items-center justify-center

                        transition
                    "
                >

                    <X className="w-5 h-5 text-white" />

                </button>

                {/* HEADER */}
                <div className="
                    relative
                    px-8
                    pt-10
                    pb-16

                    border-b border-white/10

                    bg-gradient-to-r
                    from-blue-600/10
                    to-indigo-600/10

                    text-center
                ">

                    {/* AVATAR */}
                    <div className="
                        mx-auto
                        w-28 h-28
                        rounded-full

                        flex items-center justify-center

                        bg-gradient-to-br
                        from-blue-500
                        to-indigo-600

                        border-4 border-white/20

                        text-5xl
                        font-black
                        text-white
                    ">

                        {user.username?.charAt(0).toUpperCase()}

                    </div>

                    {/* NAME */}
                    <h1 className="
                        mt-6
                        text-4xl
                        font-black
                        text-white
                    ">
                        {user.username}
                    </h1>

                    {/* STATUS */}
                    <div className={`
                        mt-4
                        inline-flex
                        items-center gap-2

                        px-4 py-2
                        rounded-full

                        text-sm
                        font-semibold

                        ${
                            user.user_status
                                ? `
                                    bg-green-500/10
                                    border border-green-500/20
                                    text-green-400
                                  `
                                : `
                                    bg-red-500/10
                                    border border-red-500/20
                                    text-red-400
                                  `
                        }
                    `}>

                        <BadgeCheck className="w-4 h-4" />

                        {
                            user.user_status
                                ? "Active User"
                                : "Deleted User"
                        }

                    </div>

                </div>

                {/* BODY */}
                <div className="p-8 space-y-5">

                    {/* USER ID */}
                    <div className="
                        flex items-center gap-4

                        rounded-2xl

                        border border-white/10

                        bg-white/5

                        p-5
                    ">

                        <div className="
                            w-14 h-14
                            rounded-2xl

                            bg-blue-500/20

                            flex items-center justify-center
                        ">

                            <Hash className="
                                w-6 h-6 text-blue-400
                            " />

                        </div>

                        <div>

                            <p className="
                                text-sm text-slate-400
                            ">
                                User ID
                            </p>

                            <h2 className="
                                text-lg
                                font-bold
                                text-white
                            ">
                                #{user.id}
                            </h2>

                        </div>

                    </div>

                    {/* USERNAME */}
                    <div className="
                        flex items-center gap-4

                        rounded-2xl

                        border border-white/10

                        bg-white/5

                        p-5
                    ">

                        <div className="
                            w-14 h-14
                            rounded-2xl

                            bg-indigo-500/20

                            flex items-center justify-center
                        ">

                            <User className="
                                w-6 h-6 text-indigo-400
                            " />

                        </div>

                        <div>

                            <p className="
                                text-sm text-slate-400
                            ">
                                Username
                            </p>

                            <h2 className="
                                text-lg
                                font-bold
                                text-white
                            ">
                                {user.username}
                            </h2>

                        </div>

                    </div>

                    {/* EMAIL */}
                    <div className="
                        flex items-center gap-4

                        rounded-2xl

                        border border-white/10

                        bg-white/5

                        p-5
                    ">

                        <div className="
                            w-14 h-14
                            rounded-2xl

                            bg-cyan-500/20

                            flex items-center justify-center
                        ">

                            <Mail className="
                                w-6 h-6 text-cyan-400
                            " />

                        </div>

                        <div className="overflow-hidden">

                            <p className="
                                text-sm text-slate-400
                            ">
                                Email Address
                            </p>

                            <h2 className="
                                text-lg
                                font-bold
                                text-white
                                break-all
                            ">
                                {user.email}
                            </h2>

                        </div>

                    </div>

                    {/* ROLE */}
                    <div className="
                        flex items-center gap-4

                        rounded-2xl

                        border border-white/10

                        bg-white/5

                        p-5
                    ">

                        <div className="
                            w-14 h-14
                            rounded-2xl

                            bg-purple-500/20

                            flex items-center justify-center
                        ">

                            <ShieldCheck className="
                                w-6 h-6 text-purple-400
                            " />

                        </div>

                        <div>

                            <p className="
                                text-sm text-slate-400
                            ">
                                User Role
                            </p>

                            <h2 className="
                                text-lg
                                font-bold
                                text-white
                            ">
                                {user.role}
                            </h2>

                        </div>

                    </div>

                    {/* ACTIONS */}
                    <div className="
                        pt-4
                        flex flex-col sm:flex-row
                        gap-4
                    ">

                        {/* UPDATE */}
                        <button
                            onClick={handleUpdate}
                            className="
                                flex-1
                                py-4

                                rounded-2xl

                                flex items-center justify-center gap-2

                                bg-gradient-to-r
                                from-blue-600
                                to-indigo-600

                                text-white
                                font-semibold

                                hover:scale-[1.02]

                                transition-all duration-300
                            "
                        >

                            <Pencil className="w-5 h-5" />

                            Update User

                        </button>

                        {/* DELETE */}
                        <button
                            onClick={handleDelete}
                            disabled={deleteLoading}
                            className={`
                                flex-1
                                py-4

                                rounded-2xl

                                flex items-center justify-center gap-2

                                text-white
                                font-semibold

                                transition-all duration-300

                                ${
                                    deleteLoading
                                        ? `
                                            bg-gray-600
                                            cursor-not-allowed
                                          `
                                        : `
                                            bg-gradient-to-r
                                            from-red-500
                                            to-red-700

                                            hover:scale-[1.02]
                                          `
                                }
                            `}
                        >

                            <Trash2 className="w-5 h-5" />

                            {
                                deleteLoading
                                    ? "Deleting..."
                                    : "Delete User"
                            }

                        </button>

                    </div>

                    {/* FOOTER */}
                    <div className="
                        pt-6
                        border-t border-white/10
                        text-center
                    ">

                        <div className="
                            flex items-center justify-center gap-2
                            text-sm text-slate-400
                        ">

                            <ShieldCheck className="
                                w-4 h-4 text-blue-400
                            " />

                            Secure User Management Dashboard

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}
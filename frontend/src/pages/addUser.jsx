// import React, { useEffect, useState } from "react";

// import {
//     User,
//     Mail,
//     Lock,
//     UserPlus,
//     CheckCircle2,
//     AlertCircle,
//     ArrowRight,
//     Eye,
//     EyeOff,
//     X,
// } from "lucide-react";

// import { useAddUser } from "../api/hooks/useAddUser";

// export function AddUser({
//     open,
//     setOpen,
// }) {

//     const {
//         data,
//         loading,
//         error,
//         success,
//         handleChange,
//         handleSubmit,
//     } = useAddUser();

//     // PASSWORD VISIBILITY
//     const [showPassword, setShowPassword] =
//         useState(false);

//     const [
//         showConfirmPassword,
//         setShowConfirmPassword,
//     ] = useState(false);

//     // DISABLE BODY SCROLL
//     useEffect(() => {

//         if (open) {
//             document.body.style.overflow = "hidden";
//         } else {
//             document.body.style.overflow = "auto";
//         }

//         return () => {
//             document.body.style.overflow = "auto";
//         };

//     }, [open]);

//     // CLOSE MODAL
//     if (!open) return null;

//     return (

//         <div
//             className="
//                 fixed inset-0
//                 z-50

//                 bg-black/70
//                 backdrop-blur-sm

//                 flex items-center justify-center

//                 p-4
//             "
//         >

//             {/* BACKDROP CLOSE */}
//             <div
//                 className="absolute inset-0"
//                 onClick={() => setOpen(false)}
//             />

//             {/* MODAL */}
//             <div
//                 className="
//                     relative
//                     z-10

//                     w-full
//                     max-w-3xl

//                     rounded-3xl

//                     border border-white/10

//                     bg-slate-900

//                     shadow-2xl

//                     overflow-hidden
//                 "
//             >

//                 {/* CLOSE BUTTON */}
//                 <button
//                     onClick={() => setOpen(false)}
//                     className="
//                         absolute
//                         top-5 right-5

//                         w-10 h-10

//                         rounded-xl

//                         bg-white/10

//                         flex items-center justify-center

//                         text-white

//                         hover:bg-red-500

//                         transition-all duration-300
//                     "
//                 >

//                     <X className="w-5 h-5" />

//                 </button>

//                 {/* HEADER */}
//                 <div
//                     className="
//                         border-b border-white/10

//                         px-8 py-8

//                         text-center
//                     "
//                 >

//                     {/* ICON */}
//                     <div
//                         className="
//                             mx-auto

//                             flex items-center justify-center

//                             w-20 h-20

//                             rounded-3xl

//                             bg-gradient-to-r
//                             from-blue-600
//                             to-indigo-600
//                         "
//                     >

//                         <UserPlus className="w-10 h-10 text-white" />

//                     </div>

//                     <p
//                         className="
//                             mt-5

//                             text-xl
//                             font-black

//                             text-white
//                         "
//                     >
//                         Add New User
//                     </p>

//                     <p
//                         className="
//                             mt-3

//                             text-slate-400
//                         "
//                     >
//                         Create users professionally
//                     </p>

//                 </div>

//                 {/* FORM */}
//                 <div className="p-6">

//                     {/* SUCCESS */}
//                     {success && (

//                         <div
//                             className="
//                                 mb-5

//                                 flex items-start gap-3

//                                 rounded-2xl

//                                 border border-green-500/20

//                                 bg-green-500/10

//                                 px-4 py-3

//                                 text-green-300
//                             "
//                         >

//                             <CheckCircle2 className="w-5 h-5 mt-0.5" />

//                             <p>{success}</p>

//                         </div>
//                     )}

//                     {/* ERROR */}
//                     {error && (

//                         <div
//                             className="
//                                 mb-5

//                                 flex items-start gap-3

//                                 rounded-2xl

//                                 border border-red-500/20

//                                 bg-red-500/10

//                                 px-4 py-3

//                                 text-red-300
//                             "
//                         >

//                             <AlertCircle className="w-5 h-5 mt-0.5" />

//                             <p>{error}</p>

//                         </div>
//                     )}

//                     <form
//                         onSubmit={handleSubmit}
//                         className="space-y-6"
//                     >

//                         {/* GRID */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

//                             {/* USERNAME */}
//                             <div>

//                                 <label className="text-sm text-slate-300 font-medium">
//                                     Username
//                                 </label>

//                                 <div className="relative mt-2">

//                                     <User
//                                         className="
//                                             absolute
//                                             left-4 top-1/2
//                                             -translate-y-1/2

//                                             w-5 h-5
//                                             text-slate-400
//                                         "
//                                     />

//                                     <input
//                                         type="text"
//                                         name="username"
//                                         value={data.username}
//                                         onChange={handleChange}
//                                         placeholder="Enter username"
//                                         required
//                                         className="
//                                             w-full

//                                             rounded-2xl

//                                             border border-white/10

//                                             bg-white/5

//                                             py-4
//                                             pl-12 pr-4

//                                             text-white

//                                             outline-none

//                                             focus:border-blue-500
//                                             focus:ring-4
//                                             focus:ring-blue-500/20
//                                         "
//                                     />

//                                 </div>

//                             </div>

//                             {/* EMAIL */}
//                             <div>

//                                 <label className="text-sm text-slate-300 font-medium">
//                                     Email
//                                 </label>

//                                 <div className="relative mt-2">

//                                     <Mail
//                                         className="
//                                             absolute
//                                             left-4 top-1/2
//                                             -translate-y-1/2

//                                             w-5 h-5
//                                             text-slate-400
//                                         "
//                                     />

//                                     <input
//                                         type="email"
//                                         name="email"
//                                         value={data.email}
//                                         onChange={handleChange}
//                                         placeholder="Enter email"
//                                         required
//                                         className="
//                                             w-full

//                                             rounded-2xl

//                                             border border-white/10

//                                             bg-white/5

//                                             py-4
//                                             pl-12 pr-4

//                                             text-white

//                                             outline-none

//                                             focus:border-blue-500
//                                             focus:ring-4
//                                             focus:ring-blue-500/20
//                                         "
//                                     />

//                                 </div>

//                             </div>

//                             {/* PASSWORD */}
//                             <div>

//                                 <label className="text-sm text-slate-300 font-medium">
//                                     Password
//                                 </label>

//                                 <div className="relative mt-2">

//                                     <Lock
//                                         className="
//                                             absolute
//                                             left-4 top-1/2
//                                             -translate-y-1/2

//                                             w-5 h-5
//                                             text-slate-400
//                                         "
//                                     />

//                                     <input
//                                         type={
//                                             showPassword
//                                                 ? "text"
//                                                 : "password"
//                                         }
//                                         name="password"
//                                         value={data.password}
//                                         onChange={handleChange}
//                                         placeholder="Enter password"
//                                         required
//                                         className="
//                                             w-full

//                                             rounded-2xl

//                                             border border-white/10

//                                             bg-white/5

//                                             py-4
//                                             pl-12 pr-12

//                                             text-white

//                                             outline-none

//                                             focus:border-blue-500
//                                             focus:ring-4
//                                             focus:ring-blue-500/20
//                                         "
//                                     />

//                                     <button
//                                         type="button"
//                                         onClick={() =>
//                                             setShowPassword(
//                                                 !showPassword
//                                             )
//                                         }
//                                         className="
//                                             absolute
//                                             right-4 top-1/2
//                                             -translate-y-1/2

//                                             text-slate-400
//                                         "
//                                     >

//                                         {
//                                             showPassword
//                                                 ? <EyeOff />
//                                                 : <Eye />
//                                         }

//                                     </button>

//                                 </div>

//                             </div>

//                             {/* CONFIRM PASSWORD */}
//                             <div>

//                                 <label className="text-sm text-slate-300 font-medium">
//                                     Confirm Password
//                                 </label>

//                                 <div className="relative mt-2">

//                                     <Lock
//                                         className="
//                                             absolute
//                                             left-4 top-1/2
//                                             -translate-y-1/2

//                                             w-5 h-5
//                                             text-slate-400
//                                         "
//                                     />

//                                     <input
//                                         type={
//                                             showConfirmPassword
//                                                 ? "text"
//                                                 : "password"
//                                         }
//                                         name="confirmPassword"
//                                         value={data.confirmPassword}
//                                         onChange={handleChange}
//                                         placeholder="Confirm password"
//                                         required
//                                         className="
//                                             w-full

//                                             rounded-2xl

//                                             border border-white/10

//                                             bg-white/5

//                                             py-4
//                                             pl-12 pr-12

//                                             text-white

//                                             outline-none

//                                             focus:border-blue-500
//                                             focus:ring-4
//                                             focus:ring-blue-500/20
//                                         "
//                                     />

//                                     <button
//                                         type="button"
//                                         onClick={() =>
//                                             setShowConfirmPassword(
//                                                 !showConfirmPassword
//                                             )
//                                         }
//                                         className="
//                                             absolute
//                                             right-4 top-1/2
//                                             -translate-y-1/2

//                                             text-slate-400
//                                         "
//                                     >

//                                         {
//                                             showConfirmPassword
//                                                 ? <EyeOff />
//                                                 : <Eye />
//                                         }

//                                     </button>

//                                 </div>

//                             </div>

//                         </div>

//                         {/* BUTTON */}
//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className="
//                                 w-full

//                                 rounded-2xl

//                                 bg-gradient-to-r
//                                 from-blue-600
//                                 to-indigo-600

//                                 py-4

//                                 flex items-center justify-center gap-2

//                                 text-white
//                                 font-semibold

//                                 transition-all duration-300

//                                 hover:scale-[1.01]
//                             "
//                         >

//                             {
//                                 loading
//                                     ? "Creating User..."
//                                     : (
//                                         <>
//                                             Add User
//                                             <ArrowRight className="w-4 h-4" />
//                                         </>
//                                     )
//                             }

//                         </button>

//                     </form>

//                 </div>

//             </div>

//         </div>
//     );
// }


import React, { useEffect, useState } from "react";

import {
    User,
    Mail,
    Lock,
    UserPlus,
    CheckCircle2,
    AlertCircle,
    ArrowRight,
    Eye,
    EyeOff,
    X,
    ArrowLeft,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAddUser } from "../api/hooks/useAddUser";

export function AddUser({
    open,
    setOpen,
}) {

    const navigate = useNavigate();

    const {
        data,
        loading,
        error,
        success,
        handleChange,
        handleSubmit,
    } = useAddUser();

    // PASSWORD VISIBILITY
    const [showPassword, setShowPassword] =
        useState(false);

    const [
        showConfirmPassword,
        setShowConfirmPassword,
    ] = useState(false);

    // DISABLE BODY SCROLL
    useEffect(() => {

        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };

    }, [open]);

    // CLOSE MODAL
    if (!open) return null;

    return (

        <div
            className="
                fixed inset-0
                z-50

                bg-black/70
                backdrop-blur-md

                flex items-center justify-center

                p-4
            "
        >

            {/* BACKDROP */}
            <div
                className="absolute inset-0"
                onClick={() => setOpen(false)}
            />

            {/* MODAL */}
            <div
                className="
                    relative
                    z-10

                    w-full
                    max-w-2xl

                    rounded-[32px]

                    border border-white/10

                    bg-gradient-to-br
                    from-slate-900
                    via-slate-950
                    to-slate-900

                    shadow-[0_20px_80px_rgba(0,0,0,0.6)]

                    overflow-hidden
                "
            >

                {/* TOP GLOW */}
                <div
                    className="
                        absolute
                        top-[-100px]
                        right-[-100px]

                        w-72 h-72

                        bg-blue-500/20

                        blur-3xl

                        rounded-full
                    "
                />

                {/* CLOSE BUTTON */}
                <button
                    onClick={() => setOpen(false)}
                    className="
                        absolute
                        top-5 right-5

                        z-50

                        w-11 h-11

                        rounded-2xl

                        bg-white/10

                        flex items-center justify-center

                        text-white

                        hover:bg-red-500

                        transition-all duration-300
                    "
                >

                    <X className="w-5 h-5" />

                </button>

                {/* HEADER */}
                <div
                    className="
                        relative

                        border-b border-white/10

                        px-8 py-7

                        text-center
                    "
                >

                    {/* BACK BUTTON */}
                    <button
                        onClick={() => {
                            setOpen(false);
                            navigate("/dashboard/users");
                        }}
                        className="
                            absolute
                            left-6 top-6

                            flex items-center gap-2

                            px-4 py-2

                            rounded-2xl

                            bg-white/5

                            text-slate-300

                            hover:bg-white/10
                            hover:text-white

                            transition-all duration-300
                        "
                    >

                        <ArrowLeft className="w-4 h-4" />

                        Back

                    </button>

                    {/* ICON */}
                    <div
                        className="
                            mx-auto

                            flex items-center justify-center

                            w-20 h-20

                            rounded-3xl

                            bg-gradient-to-r
                            from-blue-600
                            via-indigo-600
                            to-violet-600

                            shadow-xl
                            shadow-blue-500/20
                        "
                    >

                        <UserPlus className="w-10 h-10 text-white" />

                    </div>

                    <h1
                        className="
                            mt-5

                            text-3xl
                            font-black

                            tracking-tight

                            text-white
                        "
                    >
                        Add New User
                    </h1>

                    <p
                        className="
                            mt-2

                            text-slate-400
                            text-sm
                        "
                    >
                        Create and manage users professionally
                    </p>

                </div>

                {/* FORM AREA */}
                <div className="relative p-8">

                    {/* SUCCESS */}
                    {success && (

                        <div
                            className="
                                mb-6

                                flex items-start gap-3

                                rounded-2xl

                                border border-green-500/20

                                bg-green-500/10

                                px-5 py-4

                                text-green-300
                            "
                        >

                            <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />

                            <p className="text-sm">
                                {success}
                            </p>

                        </div>
                    )}

                    {/* ERROR */}
                    {error && (

                        <div
                            className="
                                mb-6

                                flex items-start gap-3

                                rounded-2xl

                                border border-red-500/20

                                bg-red-500/10

                                px-5 py-4

                                text-red-300
                            "
                        >

                            <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />

                            <p className="text-sm">
                                {error}
                            </p>

                        </div>
                    )}

                    {/* FORM */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        {/* GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            {/* USERNAME */}
                            <div>

                                <label className="text-sm font-medium text-slate-300">
                                    Username
                                </label>

                                <div className="relative mt-2">

                                    <User
                                        className="
                                            absolute
                                            left-4 top-1/2
                                            -translate-y-1/2

                                            w-5 h-5
                                            text-slate-500
                                        "
                                    />

                                    <input
                                        type="text"
                                        name="username"
                                        value={data.username}
                                        onChange={handleChange}
                                        placeholder="Enter username"
                                        required
                                        className="
                                            w-full

                                            rounded-2xl

                                            border border-white/10

                                            bg-white/5

                                            py-4
                                            pl-12 pr-4

                                            text-white
                                            placeholder:text-slate-500

                                            outline-none

                                            transition-all duration-300

                                            focus:border-blue-500
                                            focus:bg-white/[0.07]
                                            focus:ring-4
                                            focus:ring-blue-500/20
                                        "
                                    />

                                </div>

                            </div>

                            {/* EMAIL */}
                            <div>

                                <label className="text-sm font-medium text-slate-300">
                                    Email Address
                                </label>

                                <div className="relative mt-2">

                                    <Mail
                                        className="
                                            absolute
                                            left-4 top-1/2
                                            -translate-y-1/2

                                            w-5 h-5
                                            text-slate-500
                                        "
                                    />

                                    <input
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={handleChange}
                                        placeholder="Enter email"
                                        required
                                        className="
                                            w-full

                                            rounded-2xl

                                            border border-white/10

                                            bg-white/5

                                            py-4
                                            pl-12 pr-4

                                            text-white
                                            placeholder:text-slate-500

                                            outline-none

                                            transition-all duration-300

                                            focus:border-blue-500
                                            focus:bg-white/[0.07]
                                            focus:ring-4
                                            focus:ring-blue-500/20
                                        "
                                    />

                                </div>

                            </div>

                            {/* PASSWORD */}
                            <div>

                                <label className="text-sm font-medium text-slate-300">
                                    Password
                                </label>

                                <div className="relative mt-2">

                                    <Lock
                                        className="
                                            absolute
                                            left-4 top-1/2
                                            -translate-y-1/2

                                            w-5 h-5
                                            text-slate-500
                                        "
                                    />

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="password"
                                        value={data.password}
                                        onChange={handleChange}
                                        placeholder="Enter password"
                                        required
                                        className="
                                            w-full

                                            rounded-2xl

                                            border border-white/10

                                            bg-white/5

                                            py-4
                                            pl-12 pr-12

                                            text-white
                                            placeholder:text-slate-500

                                            outline-none

                                            transition-all duration-300

                                            focus:border-blue-500
                                            focus:bg-white/[0.07]
                                            focus:ring-4
                                            focus:ring-blue-500/20
                                        "
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                        className="
                                            absolute
                                            right-4 top-1/2
                                            -translate-y-1/2

                                            text-slate-400

                                            hover:text-white

                                            transition
                                        "
                                    >

                                        {
                                            showPassword
                                                ? <EyeOff className="w-5 h-5" />
                                                : <Eye className="w-5 h-5" />
                                        }

                                    </button>

                                </div>

                            </div>

                            {/* CONFIRM PASSWORD */}
                            <div>

                                <label className="text-sm font-medium text-slate-300">
                                    Confirm Password
                                </label>

                                <div className="relative mt-2">

                                    <Lock
                                        className="
                                            absolute
                                            left-4 top-1/2
                                            -translate-y-1/2

                                            w-5 h-5
                                            text-slate-500
                                        "
                                    />

                                    <input
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="confirmPassword"
                                        value={data.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm password"
                                        required
                                        className="
                                            w-full

                                            rounded-2xl

                                            border border-white/10

                                            bg-white/5

                                            py-4
                                            pl-12 pr-12

                                            text-white
                                            placeholder:text-slate-500

                                            outline-none

                                            transition-all duration-300

                                            focus:border-blue-500
                                            focus:bg-white/[0.07]
                                            focus:ring-4
                                            focus:ring-blue-500/20
                                        "
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword
                                            )
                                        }
                                        className="
                                            absolute
                                            right-4 top-1/2
                                            -translate-y-1/2

                                            text-slate-400

                                            hover:text-white

                                            transition
                                        "
                                    >

                                        {
                                            showConfirmPassword
                                                ? <EyeOff className="w-5 h-5" />
                                                : <Eye className="w-5 h-5" />
                                        }

                                    </button>

                                </div>

                            </div>

                        </div>

                        {/* SUBMIT */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                group

                                w-full

                                rounded-2xl

                                bg-gradient-to-r
                                from-blue-600
                                via-indigo-600
                                to-violet-600

                                py-4

                                flex items-center justify-center gap-2

                                text-white
                                font-semibold

                                shadow-xl
                                shadow-blue-500/20

                                transition-all duration-300

                                hover:scale-[1.01]
                                hover:shadow-blue-500/30

                                disabled:opacity-70
                                disabled:cursor-not-allowed
                            "
                        >

                            {
                                loading
                                    ? "Creating User..."
                                    : (
                                        <>
                                            Add User

                                            <ArrowRight
                                                className="
                                                    w-4 h-4

                                                    transition-transform

                                                    group-hover:translate-x-1
                                                "
                                            />
                                        </>
                                    )
                            }

                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AddUser } from "./pages/AddUser";
// import { GetSingleUser } from "./pages/GetSingleUser";
import { GetAllUser } from "./pages/GetAllUser";
import { DashboardLayout } from "./pages/DashboardLayout";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Public Routes */}
                <Route
                    path="/"
                    element={<Signin />}
                />

                <Route
                    path="/signup"
                    element={<Signup />}
                />

                {/* Dashboard Routes */}
                <Route
                    path="/dashboard/users"
                    element={<DashboardLayout />}
                >

                    {/* Nested Routes */}
                    <Route
                        path="users"
                        element={<GetAllUser />}
                    />

                    <Route
                        path="add-user"
                        element={<AddUser />}
                    />
{/* 
                     <Route
                        path="user/:id"
                        element={<GetSingleUser />}
                    />  */}

                </Route>

            </Routes>

        </BrowserRouter>
    );
}

export default App;
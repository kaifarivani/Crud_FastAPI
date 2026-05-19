import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AddUser } from "./pages/AddUser";
import {GetSingleUser} from "./pages/getSingleUser";
import { GetAllUser } from "./pages/GetAllUser";
import { DashboardLayout } from "./pages/DashboardLayout";
import { Home } from "./pages/Home";
import UpdateUser from "./pages/updateUser";

import { ProtectedRoute } from "./routes/ProtectedRoues";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import PublicRoute from "./routes/PublicRoutes";
import RestoreUser from "./pages/RestoreUser";
import { GetTrashUser } from "./pages/getTrashUser";
import PageNotFound from "./pages/pageNotFound";

function App() {

    return (

        <BrowserRouter>

            <Routes>    

                <Route path="/*" element={<PageNotFound/>}/>

                {/* Public Routes */}

                <Route
                    path="/login"
                    element={<PublicRoute>
                            <Signin />
                            </PublicRoute>}
                />

                <Route
                    path="/signup"
                    element={<PublicRoute>
                            <Signup />
                            </PublicRoute>}
                />

                <Route
                    path="/"
                    element={<PublicRoute>
                            <Home />
                            </PublicRoute>}
                />

                {/* Protected Dashboard Routes */}

                <Route
                    element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }
                >

                    <Route
                        path="/dashboard/users"
                        element={<GetAllUser />}
                    />

                    <Route
                        path="/dashboard/add-user"
                        element={<AddUser />}
                    />

                    <Route
                        path="/dashboard/update-user/:id"
                        element={<UpdateUser />}
                    />

                    <Route
                        path="/dashboard/detail-user/:id"
                        element={<GetSingleUser />}
                    />

                    <Route
                        path="/dashboard/trash-users"
                        element={<GetTrashUser />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>
    );
}

export default App;
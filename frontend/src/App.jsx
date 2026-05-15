import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AddUser } from "./pages/AddUser";
import GetSingleUser from "./pages/getSingleUser";
import { GetAllUser } from "./pages/GetAllUser";
import { DashboardLayout } from "./pages/DashboardLayout";
import { Home } from "./pages/Home";
import UpdateUser from "./pages/updateUser";


import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import RestoreUser from "./pages/RestoreUser";
import { GetTrashUser } from "./pages/getTrashUser";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Public Routes */} 

                <Route
                    path="/login"
                    element={<Signin />}
                />

                <Route
                    path="/signup"
                    element={<Signup />}
                />
                  <Route
                    path="/"
                    element={<Home />}
                />

                {/* Dashboard Routes */}
                <Route element={<DashboardLayout />} >
              
                    {/* Nested Routes */}
                    <Route
                        path="/dashboard/users"
                        element={<GetAllUser />}
                    />

                    <Route
                        path="/dashboard/add-user"
                        element={<AddUser />}
                    />
                    <Route path="/dashboard/update-user/:id" 
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
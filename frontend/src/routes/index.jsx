import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import EmployeeDashboard from "../pages/EmployeeDashboard";

import AdminLayout from "../layouts/AdminLayout";

import AdminDashboard from "../pages/admin/AdminDashboard";
import Students from "../pages/admin/Students";
import Employees from "../pages/admin/Employees";
import Documents from "../pages/admin/Documents";
import Payments from "../pages/admin/Payments";
import Reports from "../pages/admin/Reports";
import Settings from "../pages/admin/Settings";

import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

export default function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/login" element={<Login />} />

                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <RoleRoute allowedRoles={["student"]}>
                                <Dashboard />
                            </RoleRoute>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/employee"
                    element={
                        <PrivateRoute>
                            <RoleRoute allowedRoles={["employee"]}>
                                <EmployeeDashboard />
                            </RoleRoute>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/admin"
                    element={
                        <PrivateRoute>
                            <RoleRoute allowedRoles={["admin"]}>
                                <AdminLayout />
                            </RoleRoute>
                        </PrivateRoute>
                    }
                >

                    <Route index element={<AdminDashboard />} />

                    <Route path="students" element={<Students />} />

                    <Route path="employees" element={<Employees />} />

                    <Route path="documents" element={<Documents />} />

                    <Route path="payments" element={<Payments />} />

                    <Route path="reports" element={<Reports />} />

                    <Route path="settings" element={<Settings />} />

                </Route>

            </Routes>

        </BrowserRouter>

    );

}
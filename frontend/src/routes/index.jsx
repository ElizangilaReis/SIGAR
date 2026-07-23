import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";

import Dashboard from "../pages/student/dashboard/Dashboard";
import MyRequests from "../pages/student/requests/MyRequests";
import MyPayments from "../pages/student/payments/MyPayments";
import RequestDocument from "../pages/student/documents/RequestDocument";
import Profile from "../pages/student/profile/Profile";
import StudentSettings from "../pages/student/settings/Settings";

import EmployeeDashboard from "../pages/employee/EmployeeDashboard";

import AdminLayout from "../layouts/AdminLayout";
import StudentLayout from "../layouts/StudentLayout";

import AdminDashboard from "../pages/admin/dashboard/AdminDashboard";
import Students from "../pages/admin/students/Students";
import Employees from "../pages/admin/employees/Employees";
import Documents from "../pages/admin/documents/Documents";
import Payments from "../pages/admin/payments/Payments";
import Reports from "../pages/admin/reports/Reports";
import Settings from "../pages/admin/settings/Settings";

import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

export default function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Login */}
                <Route path="/login" element={<Login />} />

                {/* ===========================
                   ÁREA DO ESTUDANTE
                ============================ */}

                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <RoleRoute allowedRoles={["student"]}>
                                <StudentLayout />
                            </RoleRoute>
                        </PrivateRoute>
                    }
                >

                    <Route index element={<Dashboard />} />

                    <Route
                        path="requests"
                        element={<MyRequests />}
                    />

                    <Route
                        path="payments"
                        element={<MyPayments />}
                    />

                    <Route
                        path="documents"
                        element={<RequestDocument />}
                    />

                    <Route
                        path="profile"
                        element={<Profile />}
                    />

                    <Route
                        path="settings"
                        element={<StudentSettings />}
                    />

                </Route>

                {/* ===========================
                   ÁREA DO FUNCIONÁRIO
                ============================ */}

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

                {/* ===========================
                   ÁREA DO ADMINISTRADOR
                ============================ */}

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

                    <Route
                        path="students"
                        element={<Students />}
                    />

                    <Route
                        path="employees"
                        element={<Employees />}
                    />

                    <Route
                        path="documents"
                        element={<Documents />}
                    />

                    <Route
                        path="payments"
                        element={<Payments />}
                    />

                    <Route
                        path="reports"
                        element={<Reports />}
                    />

                    <Route
                        path="settings"
                        element={<Settings />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>

    );

}
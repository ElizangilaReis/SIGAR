import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import AdminDashboard from "../pages/AdminDashboard";
import EmployeeDashboard from "../pages/EmployeeDashboard";

import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* STUDENT */}
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

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </RoleRoute>
            </PrivateRoute>
          }
        />

        {/* EMPLOYEE */}
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

      </Routes>
    </BrowserRouter>
  );
}
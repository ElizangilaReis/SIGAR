import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

// (cria depois esses dashboards)
import AdminDashboard from "../pages/AdminDashboard";
import ParceiroDashboard from "../pages/ParceiroDashboard";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* ESTUDANTE */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={["estudante"]}>
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

        {/* PARCEIRO */}
        <Route
          path="/parceiro"
          element={
            <PrivateRoute>
              <RoleRoute allowedRoles={["parceiro"]}>
                <ParceiroDashboard />
              </RoleRoute>
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
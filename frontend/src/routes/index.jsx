import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Página pública
import VerifyDocument from '../pages/public/VerifyDocument';
import Login from '../pages/Login';
import Home from '../pages/public/Home';

// Estudante
import Dashboard from '../pages/student/dashboard/Dashboard';
import MyRequests from '../pages/student/requests/MyRequests';
import MyPayments from '../pages/student/payments/MyPayments';
import RequestDocument from '../pages/student/documents/RequestDocument';
import Profile from '../pages/student/profile/Profile';
import StudentSettings from '../pages/student/settings/Settings';
import Notifications from '../pages/student/notifications/Notifications';
import MyDocuments from '../pages/student/my-documents/MyDocuments';

// Funcionário
import EmployeeLayout from '../layouts/EmployeeLayout';
import EmployeeDashboard from '../pages/employee/dashboard/EmployeeDashboard';
import EmployeeRequests from '../pages/employee/requests/Requests';
import EmployeePayments from '../pages/employee/payments/Payments';
import ReadyDocuments from '../pages/employee/documents/ReadyDocuments';
import EmployeeProfile from '../pages/employee/profile/Profile';
import EmployeeSettings from '../pages/employee/settings/Settings';
import EmployeeReports from '../pages/employee/reports/Reports';

// Admin
import AdminLayout from '../layouts/AdminLayout';
import StudentLayout from '../layouts/StudentLayout';
import AdminDashboard from '../pages/admin/dashboard/AdminDashboard';
import Students from '../pages/admin/students/Students';
import Employees from '../pages/admin/employees/Employees';
import Documents from '../pages/admin/documents/Documents';
import Payments from '../pages/admin/payments/Payments';
import Reports from '../pages/admin/reports/Reports';
import Settings from '../pages/admin/settings/Settings';

import PrivateRoute from './PrivateRoute';
import RoleRoute from './RoleRoute';

export default function AppRoutes() {
return ( <BrowserRouter> <Routes>
{/* Página pública de validação */}
          
    <Route path="/" element={<Home />} />

    <Route
        path="/verificar"
        element={<VerifyDocument />}
    />

    <Route
        path="/verificar/:codigo"
        element={<VerifyDocument />}
    />
            {/* Login */}
            <Route
                path="/login"
                element={<Login />}
            />

            {/* Área do estudante */}
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
                <Route
                    index
                    element={<Dashboard />}
                />

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

                <Route
                    path="notifications"
                    element={<Notifications />}
                />

                <Route
                    path="my-documents"
                    element={<MyDocuments />}
                />
            </Route>

            {/* Área do funcionário */}
            <Route
                path="/employee"
                element={
                    <PrivateRoute>
                        <RoleRoute allowedRoles={["employee"]}>
                            <EmployeeLayout />
                        </RoleRoute>
                    </PrivateRoute>
                }
            >
                <Route
                    index
                    element={<EmployeeDashboard />}
                />

                <Route
                    path="requests"
                    element={<EmployeeRequests />}
                />

                <Route
                    path="payments"
                    element={<EmployeePayments />}
                />

                <Route
                    path="documents"
                    element={<ReadyDocuments />}
                />

                <Route
                    path="reports"
                    element={<EmployeeReports />}
                />

                <Route
                    path="profile"
                    element={<EmployeeProfile />}
                />

                <Route
                    path="settings"
                    element={<EmployeeSettings />}
                />
            </Route>

            {/* Área do administrador */}
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
                <Route
                    index
                    element={<AdminDashboard />}
                />

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

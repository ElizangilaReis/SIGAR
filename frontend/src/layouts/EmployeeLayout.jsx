import { Outlet } from "react-router-dom";
import { useState } from "react";

import EmployeeHeader from "../components/employee/Header/EmployeeHeader";
import EmployeeSidebar from "../components/employee/Sidebar/EmployeeSidebar";

import "./EmployeeLayout.css";

export default function EmployeeLayout() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="layout">

            <EmployeeSidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="layout-main">

                <EmployeeHeader
                    onMenuClick={() => setSidebarOpen(true)}
                />

                <main className="layout-content">

                    <Outlet />

                </main>

            </div>

        </div>
    );
}
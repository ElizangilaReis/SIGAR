import { Outlet } from "react-router-dom";
import { useState } from "react";

import StudentHeader from "../components/student/Header/StudentHeader";
import StudentSidebar from "../components/student/Sidebar/StudentSidebar";

import "./StudentLayout.css";

export default function StudentLayout() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (

        <div className="layout">

            <StudentSidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="layout-main">

                <StudentHeader
                    onMenuClick={() => setSidebarOpen(true)}
                />

                <main className="layout-content">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}
import { Outlet } from "react-router-dom";

import StudentHeader from "../components/student/Header/StudentHeader";
import StudentSidebar from "../components/student/Sidebar/StudentSidebar";

import "./StudentLayout.css";

export default function StudentLayout() {

    return (

        <div className="layout">

            <StudentSidebar />

            <div className="layout-main">

                <StudentHeader />

                <main className="layout-content">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}
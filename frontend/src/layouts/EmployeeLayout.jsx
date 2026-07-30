import { Outlet } from "react-router-dom";

import EmployeeHeader from "../components/employee/Header/EmployeeHeader";
import EmployeeSidebar from "../components/employee/Sidebar/EmployeeSidebar";

import "./EmployeeLayout.css";

export default function EmployeeLayout() {

    return (

        <div className="layout">

            <EmployeeSidebar />

            <div className="layout-main">

                <EmployeeHeader />

                <main className="layout-content">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}
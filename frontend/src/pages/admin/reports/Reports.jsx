import { useEffect, useState } from "react";

import reportService from "../../../services/reportService";

import PageHeader from "../../../components/admin/PageHeader/PageHeader";
import Loading from "../../../components/common/Loading/Loading";

import DashboardCards from "./DashboardCards";
import DashboardCharts from "./DashboardCharts";

import StudentReport from "./StudentReport";
import EmployeeReport from "./EmployeeReport";
import DocumentRequestReport from "./DocumentRequestReport";
import PaymentReport from "./PaymentReport";

import "./Reports.css";

export default function Reports() {

    const [loading, setLoading] = useState(true);

    const [dashboard, setDashboard] = useState({});

    const [charts, setCharts] = useState({});

    const [activeTab, setActiveTab] = useState("students");

    useEffect(() => {

        loadDashboard();

    }, []);

    async function loadDashboard() {

        try {

            setLoading(true);

            const [

                dashboard,

                charts

            ] = await Promise.all([

                reportService.dashboard(),

                reportService.charts()

            ]);

            setDashboard(dashboard);

            setCharts(charts);

        } finally {

            setLoading(false);

        }

    }

    if (loading) {

        return <Loading />;

    }

    return (

        <>

            <PageHeader

                title="Relatórios"

                subtitle="Indicadores e relatórios do sistema."

            />

            <DashboardCards dashboard={dashboard} />

            <DashboardCharts charts={charts} />

            <div className="report-tabs">

                <button

                    className={activeTab === "students" ? "active" : ""}

                    onClick={() => setActiveTab("students")}

                >

                    Estudantes

                </button>

                <button

                    className={activeTab === "employees" ? "active" : ""}

                    onClick={() => setActiveTab("employees")}

                >

                    Funcionários

                </button>

                <button

                    className={activeTab === "requests" ? "active" : ""}

                    onClick={() => setActiveTab("requests")}

                >

                    Pedidos

                </button>

                <button

                    className={activeTab === "payments" ? "active" : ""}

                    onClick={() => setActiveTab("payments")}

                >

                    Pagamentos

                </button>

            </div>

            {

                activeTab === "students" &&

                <StudentReport />

            }

            {

                activeTab === "employees" &&

                <EmployeeReport />

            }

            {

                activeTab === "requests" &&

                <DocumentRequestReport />

            }

            {

                activeTab === "payments" &&

                <PaymentReport />

            }

        </>

    );

}
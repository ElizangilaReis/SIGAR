import { useEffect, useState } from "react";

import reportService from "../../../services/reportService";

import PageHeader from "../../../components/admin/PageHeader/PageHeader";
import Loading from "../../../components/common/Loading/Loading";

import DashboardCards from "./DashboardCards";
import DashboardCharts from "./DashboardCharts";
import ReportActions from "./ReportActions";

import StudentReport from "./StudentReport";
import EmployeeReport from "./EmployeeReport";
import DocumentRequestReport from "./DocumentRequestReport";
import PaymentReport from "./PaymentReport";

import "./Reports.css";

export default function Reports() {
    const [loading, setLoading] = useState(true);

    const [dashboard, setDashboard] = useState(null);

    const [charts, setCharts] = useState(null);

    const [activeTab, setActiveTab] = useState("students");

    useEffect(() => {
        loadDashboard();
    }, []);

    async function loadDashboard() {
        try {
            setLoading(true);

            const [
                dashboardData,
                chartsData
            ] = await Promise.all([
                reportService.dashboard(),
                reportService.charts()
            ]);

            setDashboard(dashboardData);
            setCharts(chartsData);

        } catch (error) {
            console.error(
                "Erro ao carregar relatórios:",
                error
            );

            setDashboard(null);
            setCharts(null);

        } finally {
            setLoading(false);
        }
    }

    function formatAmount(amount) {
        if (
            amount === null ||
            amount === undefined ||
            amount === ""
        ) {
            return "0 Kz";
        }

        const normalizedAmount =
            typeof amount === "string"
                ? amount.replace(",", ".").trim()
                : amount;

        const value = Number(normalizedAmount);

        if (!Number.isFinite(value)) {
            return "0 Kz";
        }

        return `${value.toLocaleString("pt-PT", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        })} Kz`;
    }

    function normalizeDashboard(data) {
        if (!data) {
            return data;
        }

        const normalized = {
            ...data
        };

        return normalized;
    }

    function normalizeCharts(data) {
        if (!data) {
            return data;
        }

        return data;
    }

    async function handleExport(exportFunction) {
        try {
            await exportFunction();
        } catch (error) {
            console.error(
                "Erro ao exportar relatório:",
                error
            );
        }
    }

    if (loading) {
        return <Loading />;
    }

    const normalizedDashboard =
        normalizeDashboard(dashboard);

    const normalizedCharts =
        normalizeCharts(charts);

    return (
        <>
            <PageHeader
                title="Relatórios"
                subtitle="Indicadores e relatórios do sistema."
            />

            {normalizedDashboard && (
                <DashboardCards
                    dashboard={normalizedDashboard}
                />
            )}

            {normalizedCharts && (
                <DashboardCharts
                    charts={normalizedCharts}
                />
            )}

            <ReportActions

                onExportStudentsPdf={() =>
                    handleExport(
                        reportService.exportStudentsPdf
                    )
                }

                onExportEmployeesPdf={() =>
                    handleExport(
                        reportService.exportEmployeesPdf
                    )
                }

                onExportRequestsPdf={() =>
                    handleExport(
                        reportService.exportRequestsPdf
                    )
                }

                onExportPaymentsPdf={() =>
                    handleExport(
                        reportService.exportPaymentsPdf
                    )
                }

                onExportStudentsExcel={() =>
                    handleExport(
                        reportService.exportStudentsExcel
                    )
                }

                onExportEmployeesExcel={() =>
                    handleExport(
                        reportService.exportEmployeesExcel
                    )
                }

                onExportRequestsExcel={() =>
                    handleExport(
                        reportService.exportRequestsExcel
                    )
                }

                onExportPaymentsExcel={() =>
                    handleExport(
                        reportService.exportPaymentsExcel
                    )
                }

            />

            <div className="report-tabs">

                <button
                    type="button"
                    className={
                        activeTab === "students"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        setActiveTab("students")
                    }
                >
                    Estudantes
                </button>

                <button
                    type="button"
                    className={
                        activeTab === "employees"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        setActiveTab("employees")
                    }
                >
                    Funcionários
                </button>

                <button
                    type="button"
                    className={
                        activeTab === "requests"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        setActiveTab("requests")
                    }
                >
                    Pedidos
                </button>

                <button
                    type="button"
                    className={
                        activeTab === "payments"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        setActiveTab("payments")
                    }
                >
                    Pagamentos
                </button>

            </div>

            {activeTab === "students" && (
                <StudentReport />
            )}

            {activeTab === "employees" && (
                <EmployeeReport />
            )}

            {activeTab === "requests" && (
                <DocumentRequestReport />
            )}

            {activeTab === "payments" && (
                <PaymentReport />
            )}
        </>
    );
}
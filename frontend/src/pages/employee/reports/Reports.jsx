import { useEffect, useState } from "react";

import employeeDashboardService from "../../../services/employeeDashboardService";
import employeeRequestService from "../../../services/employeeRequestService";
import reportService from "../../../services/reportService";

import Loading from "../../../components/common/Loading/Loading";
import StatCard from "../../../components/common/StatCard/StatCard";
import Table from "../../../components/common/Table/Table";
import Badge from "../../../components/common/Badge/Badge";
import Button from "../../../components/common/Button/Button";

import "./Reports.css";

export default function Reports() {
    const [loading, setLoading] = useState(true);

    const [dashboard, setDashboard] = useState({
        pending_requests: 0,
        processing_requests: 0,
        ready_documents: 0,
        delivered_documents: 0,
        pending_payments: 0,
        paid_payments: 0
    });

    const [requests, setRequests] = useState([]);

    useEffect(() => {
        loadReports();
    }, []);

    async function loadReports() {
        try {
            setLoading(true);

            const [dashboardData, requestData] =
                await Promise.all([
                    employeeDashboardService.getDashboard(),
                    employeeRequestService.getAll()
                ]);

            setDashboard({
                pending_requests:
                    dashboardData?.pending_requests ?? 0,

                processing_requests:
                    dashboardData?.processing_requests ?? 0,

                ready_documents:
                    dashboardData?.ready_documents ?? 0,

                delivered_documents:
                    dashboardData?.delivered_documents ?? 0,

                pending_payments:
                    dashboardData?.pending_payments ?? 0,

                paid_payments:
                    dashboardData?.paid_payments ?? 0
            });

            setRequests(
                Array.isArray(requestData)
                    ? requestData
                    : []
            );

        } catch (error) {
            console.error(
                "Erro ao carregar relatórios:",
                error
            );

            setRequests([]);

        } finally {
            setLoading(false);
        }
    }

    async function exportPdf() {
        try {
            await reportService.exportRequestsPdf();
        } catch (error) {
            console.error(
                "Erro ao exportar PDF:",
                error
            );

            alert(
                "Erro ao exportar o relatório em PDF."
            );
        }
    }

    async function exportExcel() {
        try {
            await reportService.exportRequestsExcel();
        } catch (error) {
            console.error(
                "Erro ao exportar Excel:",
                error
            );

            alert(
                "Erro ao exportar o relatório em Excel."
            );
        }
    }

    function formatDate(date) {
        if (!date) {
            return "-";
        }

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "-";
        }

        return parsedDate.toLocaleDateString("pt-PT");
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="employee-reports">

            <div className="dashboard-header reports-header">

                <div>
                    <h1>Relatórios</h1>

                    <p>
                        Resumo das actividades de atendimento académico.
                    </p>
                </div>

                <div className="reports-actions">

                    <Button
                        variant="secondary"
                        onClick={exportPdf}
                    >
                        Exportar PDF
                    </Button>

                    <Button
                        variant="primary"
                        onClick={exportExcel}
                    >
                        Exportar Excel
                    </Button>

                </div>

            </div>

            <div className="stats-grid">

                <StatCard
                    title="Pedidos Pendentes"
                    value={dashboard.pending_requests}
                />

                <StatCard
                    title="Em Processamento"
                    value={dashboard.processing_requests}
                />

                <StatCard
                    title="Documentos Prontos"
                    value={dashboard.ready_documents}
                />

                <StatCard
                    title="Entregues"
                    value={dashboard.delivered_documents}
                />

                <StatCard
                    title="Pagamentos Pendentes"
                    value={dashboard.pending_payments}
                />

                <StatCard
                    title="Pagamentos Confirmados"
                    value={dashboard.paid_payments}
                />

            </div>

            <div className="card reports-table-card">

                <div className="reports-table-header">

                    <div>
                        <h3>Últimos Pedidos</h3>

                        <p>
                            Pedidos recentes submetidos pelos estudantes.
                        </p>
                    </div>

                    <span className="reports-count">
                        {requests.length} pedidos
                    </span>

                </div>

                {requests.length > 0 ? (

                    <div className="reports-table-wrapper">

                        <Table
                            columns={[
                                "Referência",
                                "Estudante",
                                "Documento",
                                "Estado",
                                "Data"
                            ]}
                        >

                            {requests
                                .slice(0, 10)
                                .map(request => (

                                    <tr key={request.id}>

                                        <td>
                                            {request.reference || "-"}
                                        </td>

                                        <td>
                                            {request.student?.user?.name || "-"}
                                        </td>

                                        <td>
                                            {request.document_type?.name ||
                                                request.documentType?.name ||
                                                "-"}
                                        </td>

                                        <td>
                                            <Badge
                                                status={
                                                    request.status ||
                                                    "Pendente"
                                                }
                                            />
                                        </td>

                                        <td>
                                            {formatDate(
                                                request.requested_at ||
                                                request.created_at
                                            )}
                                        </td>

                                    </tr>

                                ))}

                        </Table>

                    </div>

                ) : (

                    <div className="reports-empty">
                        <p>
                            Nenhum pedido encontrado.
                        </p>
                    </div>

                )}

            </div>

        </div>
    );
}
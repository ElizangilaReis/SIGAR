import { useEffect, useState } from "react";

import reportService from "../../../services/reportService";

import Loading from "../../../components/common/Loading/Loading";
import StatCard from "../../../components/common/StatCard/StatCard";
import Table from "../../../components/common/Table/Table";
import Badge from "../../../components/common/Badge/Badge";
import Button from "../../../components/common/Button/Button";

export default function Reports() {

    const [loading, setLoading] = useState(true);

    const [dashboard, setDashboard] = useState(null);

    const [requests, setRequests] = useState([]);

    useEffect(() => {

        loadReports();

    }, []);

    async function loadReports() {

        try {

            setLoading(true);

            const dashboardData = await reportService.dashboard();

            const requestData = await reportService.documentRequests();

            setDashboard(dashboardData);

            setRequests(requestData);

        } finally {

            setLoading(false);

        }

    }

    function exportPdf() {

        reportService.exportRequestsPdf();

    }

    function exportExcel() {

        reportService.exportRequestsExcel();

    }

    if (loading) {

        return <Loading />;

    }

    return (

        <>

            <div className="dashboard-header">

                <div>

                    <h1>Relatórios</h1>

                    <p>Resumo das actividades de atendimento académico.</p>

                </div>

                <div style={{ display: "flex", gap: 12 }}>

                    <Button variant="secondary" onClick={exportPdf}>

                        Exportar PDF

                    </Button>

                    <Button variant="primary" onClick={exportExcel}>

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

            <div className="card" style={{ marginTop: 32 }}>

                <h3 style={{ marginBottom: 16 }}>Últimos Pedidos</h3>

                <Table

                    columns={[

                        "Referência",

                        "Estudante",

                        "Documento",

                        "Estado",

                        "Data"

                    ]}

                >

                    {requests.slice(0, 10).map(request => (

                        <tr key={request.id}>

                            <td>{request.reference}</td>

                            <td>{request.student?.user?.name}</td>

                            <td>{request.document_type?.name}</td>

                            <td>

                                <Badge status={request.status} />

                            </td>

                            <td>

                                {request.requested_at

                                    ? new Date(request.requested_at).toLocaleDateString("pt-PT")

                                    : "-"}

                            </td>

                        </tr>

                    ))}

                </Table>

            </div>

        </>

    );

}
import { useEffect, useState } from "react";

import employeeDashboardService from "../../../services/employeeDashboardService";

import Loading from "../../../components/common/Loading/Loading";
import StatCard from "../../../components/common/StatCard/StatCard";
import Table from "../../../components/common/Table/Table";
import Badge from "../../../components/common/Badge/Badge";

export default function EmployeeDashboard() {

    const [loading, setLoading] = useState(true);

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {

        loadDashboard();

    }, []);

    async function loadDashboard() {

        try {

            setLoading(true);

            const data = await employeeDashboardService.getDashboard();

            setDashboard(data);

        } finally {

            setLoading(false);

        }

    }

    if (loading) {

        return <Loading />;

    }

    return (

        <>

            <div className="dashboard-header">

                <h1>Painel do Funcionário</h1>

                <p>Resumo das actividades de atendimento académico.</p>

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

            <div style={{ marginTop: 40 }}>

                <h2 style={{ marginBottom: 16 }}>

                    Últimos Pedidos

                </h2>

                <Table

                    columns={[

                        "Referência",

                        "Estudante",

                        "Documento",

                        "Estado"

                    ]}

                >

                    {

                        dashboard.recent_requests.map(request => (

                            <tr key={request.id}>

                                <td>{request.reference}</td>

                                <td>{request.student?.user?.name}</td>

                                <td>{request.document_type?.name}</td>

                                <td>

                                    <Badge status={request.status} />

                                </td>

                            </tr>

                        ))

                    }

                </Table>

            </div>

            <div style={{ marginTop: 40 }}>

                <h2 style={{ marginBottom: 16 }}>

                    Últimos Pagamentos

                </h2>

                <Table

                    columns={[

                        "Referência",

                        "Estudante",

                        "Valor",

                        "Estado"

                    ]}

                >

                    {

                        dashboard.recent_payments.map(payment => (

                            <tr key={payment.id}>

                                <td>{payment.reference}</td>

                                <td>{payment.student?.user?.name}</td>

                                <td>

                                    {Number(payment.amount).toLocaleString("pt-PT")} Kz

                                </td>

                                <td>

                                    <Badge status={payment.status} />

                                </td>

                            </tr>

                        ))

                    }

                </Table>

            </div>

        </>

    );

}
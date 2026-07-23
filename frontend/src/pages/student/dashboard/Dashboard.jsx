import { useEffect, useState } from "react";

import studentDashboardService from "../../../services/studentDashboardService";

import Loading from "../../../components/common/Loading/Loading";
import StatCard from "../../../components/common/StatCard/StatCard";

import "./Dashboard.css";

export default function Dashboard() {

    const [loading, setLoading] = useState(true);

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {

        loadDashboard();

    }, []);

    async function loadDashboard() {

        try {

            setLoading(true);

            const data = await studentDashboardService.getDashboard();

            setDashboard(data);

        } finally {

            setLoading(false);

        }

    }

    if (loading) {

        return <Loading />;

    }

    return (

        <div className="student-dashboard">

            <div className="dashboard-header">

                <h1>Painel do Estudante</h1>

                <p>

                    Bem-vindo ao Sistema Integrado de Gestão Académica.

                </p>

            </div>

            <div className="dashboard-cards">

                <StatCard

                    title="Pedidos"

                    value={dashboard.cards.requests}

                    subtitle="Total"

                />

                <StatCard

                    title="Pendentes"

                    value={dashboard.cards.pending}

                    subtitle="Em processamento"

                />

                <StatCard

                    title="Concluídos"

                    value={dashboard.cards.completed}

                    subtitle="Entregues"

                />

                <StatCard

                    title="Pagamentos"

                    value={dashboard.cards.payments}

                    subtitle="Pendentes"

                />

            </div>

            <div className="dashboard-section">

                <h2>Últimos Pedidos</h2>

                <table className="dashboard-table">

                    <thead>

                        <tr>

                            <th>Referência</th>

                            <th>Documento</th>

                            <th>Estado</th>

                            <th>Data</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            dashboard.lastRequests.length > 0

                                ?

                                dashboard.lastRequests.map(request => (

                                    <tr key={request.id}>

                                        <td>{request.reference}</td>

                                        <td>{request.document_type?.name}</td>

                                        <td>{request.status}</td>

                                        <td>

                                            {

                                                new Date(

                                                    request.created_at

                                                ).toLocaleDateString("pt-PT")

                                            }

                                        </td>

                                    </tr>

                                ))

                                :

                                <tr>

                                    <td colSpan="4">

                                        Nenhum pedido encontrado.

                                    </td>

                                </tr>

                        }

                    </tbody>

                </table>

            </div>

            <div className="dashboard-section">

                <h2>Últimos Pagamentos</h2>

                <table className="dashboard-table">

                    <thead>

                        <tr>

                            <th>Referência</th>

                            <th>Valor</th>

                            <th>Estado</th>

                            <th>Data</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            dashboard.lastPayments.length > 0

                                ?

                                dashboard.lastPayments.map(payment => (

                                    <tr key={payment.id}>

                                        <td>{payment.reference}</td>

                                        <td>{payment.amount} Kz</td>

                                        <td>{payment.status}</td>

                                        <td>

                                            {

                                                new Date(

                                                    payment.created_at

                                                ).toLocaleDateString("pt-PT")

                                            }

                                        </td>

                                    </tr>

                                ))

                                :

                                <tr>

                                    <td colSpan="4">

                                        Nenhum pagamento encontrado.

                                    </td>

                                </tr>

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}
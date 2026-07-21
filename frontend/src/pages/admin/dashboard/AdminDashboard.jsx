import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import reportService from "../../../services/reportService";

import Loading from "../../../components/common/Loading/Loading";
import StatCard from "../../../components/common/StatCard/StatCard";

import "./AdminDashboard.css";

export default function AdminDashboard() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [dashboard, setDashboard] = useState({

        students: 0,

        employees: 0,

        document_requests: 0,

        payments: 0,

        pending_requests: 0,

        processing_requests: 0,

        delivered_requests: 0,

        total_revenue: 0,

        recent_activities: []

    });

    useEffect(() => {

        loadDashboard();

    }, []);

    async function loadDashboard() {

        try {

            setLoading(true);

            const data = await reportService.dashboard();

            setDashboard(data);

        } catch (error) {

            console.error(error);

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

                <h1>Dashboard Administrativo</h1>

                <p>

                    Bem-vindo ao Sistema Integrado de Gestão Académica e Requerimentos.

                </p>

            </div>

            <div className="dashboard-cards">

                <StatCard

                    title="Estudantes"

                    value={dashboard.students}

                    subtitle="Registados"

                />

                <StatCard

                    title="Funcionários"

                    value={dashboard.employees}

                    subtitle="Registados"

                />

                <StatCard

                    title="Pedidos"

                    value={dashboard.document_requests}

                    subtitle="Total"

                />

                <StatCard

                    title="Pagamentos"

                    value={dashboard.payments}

                    subtitle="Registados"

                />

            </div>

            <div className="dashboard-cards">

                <StatCard

                    title="Pendentes"

                    value={dashboard.pending_requests}

                    subtitle="Pedidos"

                />

                <StatCard

                    title="Em Processamento"

                    value={dashboard.processing_requests}

                    subtitle="Pedidos"

                />

                <StatCard

                    title="Entregues"

                    value={dashboard.delivered_requests}

                    subtitle="Pedidos"

                />

                <StatCard

                    title="Receita"

                    value={`${dashboard.total_revenue} Kz`}

                    subtitle="Pagamentos"

                />

            </div>

            <div className="dashboard-row">

                <div className="dashboard-panel">

                    <h3>Últimas Actividades</h3>

                    {

                        dashboard.recent_activities?.length > 0 ? (

                            <ul className="activity-list">

                                {

                                    dashboard.recent_activities.map(activity => (

                                        <li key={activity.id}>

                                            <strong>

                                                {activity.reference}

                                            </strong>

                                            <br />

                                            {activity.student}

                                            <br />

                                            <small>

                                                {activity.status}

                                            </small>

                                        </li>

                                    ))

                                }

                            </ul>

                        ) : (

                            <p>

                                Nenhuma actividade encontrada.

                            </p>

                        )

                    }

                </div>

                <div className="dashboard-panel">

                    <h3>Acesso Rápido</h3>

                    <button

                        onClick={() =>

                            navigate("/admin/students")

                        }

                    >

                        Estudantes

                    </button>

                    <button

                        onClick={() =>

                            navigate("/admin/employees")

                        }

                    >

                        Funcionários

                    </button>

                    <button

                        onClick={() =>

                            navigate("/admin/documents")

                        }

                    >

                        Documentos

                    </button>

                    <button

                        onClick={() =>

                            navigate("/admin/payments")

                        }

                    >

                        Pagamentos

                    </button>

                    <button

                        onClick={() =>

                            navigate("/admin/reports")

                        }

                    >

                        Relatórios

                    </button>

                </div>

            </div>

        </>

    );

}
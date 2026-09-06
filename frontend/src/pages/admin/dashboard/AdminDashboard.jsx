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
        completed_requests: 0,
        total_received: 0,
        total_pending: 0,
        recent_activities: []
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    async function loadDashboard() {

        try {

            setLoading(true);

            const data = await reportService.dashboard();

            setDashboard({
                students: data?.students ?? 0,
                employees: data?.employees ?? 0,
                document_requests: data?.document_requests ?? 0,
                payments: data?.payments ?? 0,
                pending_requests: data?.pending_requests ?? 0,
                processing_requests: data?.processing_requests ?? 0,
                completed_requests: data?.completed_requests ?? 0,
                total_received: data?.total_received ?? 0,
                total_pending: data?.total_pending ?? 0,
                recent_activities: Array.isArray(data?.recent_activities)
                    ? data.recent_activities
                    : []
            });

        } catch (error) {

            console.error(
                "Erro ao carregar dashboard:",
                error
            );

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

        const value =
            typeof amount === "string"
                ? Number(amount.replace(",", "."))
                : Number(amount);

        if (!Number.isFinite(value)) {
            return "0 Kz";
        }

        return `${value.toLocaleString("pt-PT", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        })} Kz`;
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <>

            <div className="dashboard-header">

                <h1>
                    Dashboard Administrativo
                </h1>

                <p>
                    Bem-vindo ao Sistema Integrado de Gestão Académica e Requerimentos.
                </p>

            </div>

            {/* =========================
                INDICADORES PRINCIPAIS
            ========================= */}

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

            {/* =========================
                ESTADO DOS PEDIDOS
            ========================= */}

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
                    value={dashboard.completed_requests}
                    subtitle="Pedidos"
                />

                <StatCard
                    title="Receita Recebida"
                    value={formatAmount(dashboard.total_received)}
                    subtitle="Pagamentos pagos"
                />

            </div>

            {/* =========================
                RECEITA
            ========================= */}

            <div className="dashboard-cards">

                <StatCard
                    title="Receita Pendente"
                    value={formatAmount(dashboard.total_pending)}
                    subtitle="Pagamentos pendentes"
                />

            </div>

            {/* =========================
                ACTIVIDADES / ACESSO
            ========================= */}

            <div className="dashboard-row">

                <div className="dashboard-panel">

                    <h3>
                        Últimas Actividades
                    </h3>

                    {dashboard.recent_activities.length > 0 ? (

                        <ul className="activity-list">

                            {dashboard.recent_activities.map(
                                (activity) => (

                                    <li key={activity.id}>

                                        <strong>
                                            {activity.reference || "-"}
                                        </strong>

                                        <br />

                                        {activity.student || "-"}

                                        <br />

                                        <small>
                                            {activity.status || "-"}
                                        </small>

                                    </li>

                                )
                            )}

                        </ul>

                    ) : (

                        <p>
                            Nenhuma actividade encontrada.
                        </p>

                    )}

                </div>

                <div className="dashboard-panel">

                    <h3>
                        Acesso Rápido
                    </h3>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/admin/students")
                        }
                    >
                        Estudantes
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/admin/employees")
                        }
                    >
                        Funcionários
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/admin/documents")
                        }
                    >
                        Documentos
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/admin/payments")
                        }
                    >
                        Pagamentos
                    </button>

                    <button
                        type="button"
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
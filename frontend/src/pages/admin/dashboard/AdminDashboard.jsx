import "./AdminDashboard.css";

import StatCard from "../../../components/common/StatCard/StatCard";

export default function AdminDashboard() {

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
                    value="0"
                    subtitle="Registados"
                />

                <StatCard
                    title="Funcionários"
                    value="0"
                    subtitle="Activos"
                />

                <StatCard
                    title="Documentos"
                    value="0"
                    subtitle="Emitidos"
                />

                <StatCard
                    title="Pagamentos"
                    value="0"
                    subtitle="Processados"
                />

            </div>

            <div className="dashboard-row">

                <div className="dashboard-panel">

                    <h3>Últimas Actividades</h3>

                    <p>Nenhuma actividade encontrada.</p>

                </div>

                <div className="dashboard-panel">

                    <h3>Acesso Rápido</h3>

                    <button>Novo Estudante</button>

                    <button>Novo Funcionário</button>

                    <button>Solicitações</button>

                    <button>Pagamentos</button>

                </div>

            </div>

        </>

    );

}
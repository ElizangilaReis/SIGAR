import { useEffect, useState } from "react";

import employeeDashboardService from "../../../services/employeeDashboardService";

import Loading from "../../../components/common/Loading/Loading";
import StatCard from "../../../components/common/StatCard/StatCard";
import Table from "../../../components/common/Table/Table";
import Badge from "../../../components/common/Badge/Badge";

import "./Dashboard.css";

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
    <div className="employee-dashboard">
      <div className="dashboard-header">
        <h1>Painel do Funcionário</h1>
        <p>Resumo das actividades de atendimento académico.</p>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Pedidos Pendentes"
          value={dashboard.pending_requests || 0}
          subtitle="Aguardam análise"
        />

        <StatCard
          title="Em Processamento"
          value={dashboard.processing_requests || 0}
          subtitle="Em atendimento"
        />

        <StatCard
          title="Documentos Prontos"
          value={dashboard.ready_documents || 0}
          subtitle="Disponíveis para entrega"
        />

        <StatCard
          title="Entregues"
          value={dashboard.delivered_documents || 0}
          subtitle="Concluídos"
        />

        <StatCard
          title="Pagamentos Pendentes"
          value={dashboard.pending_payments || 0}
          subtitle="Aguardam confirmação"
        />

        <StatCard
          title="Pagamentos Confirmados"
          value={dashboard.paid_payments || 0}
          subtitle="Recebidos"
        />
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-section">
          <h2>Últimos Pedidos</h2>

          <Table
            columns={[
              "Referência",
              "Estudante",
              "Documento",
              "Estado",
            ]}
          >
            {dashboard.recent_requests?.length > 0 ? (
              dashboard.recent_requests.map((request) => (
                <tr key={request.id}>
                  <td>{request.reference}</td>
                  <td>{request.student?.user?.name}</td>
                  <td>{request.document_type?.name}</td>
                  <td>
                    <Badge status={request.status} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Nenhum pedido encontrado.</td>
              </tr>
            )}
          </Table>
        </div>

        <div className="dashboard-section">
          <h2>Últimos Pagamentos</h2>

          <Table
            columns={[
              "Referência",
              "Estudante",
              "Valor",
              "Estado",
            ]}
          >
            {dashboard.recent_payments?.length > 0 ? (
              dashboard.recent_payments.map((payment) => (
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
            ) : (
              <tr>
                <td colSpan="4">Nenhum pagamento encontrado.</td>
              </tr>
            )}
          </Table>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>Resumo Operacional</h2>

        <div className="stats-grid">
          <StatCard
            title="Total de Pedidos"
            value={
              (dashboard.pending_requests || 0) +
              (dashboard.processing_requests || 0) +
              (dashboard.ready_documents || 0) +
              (dashboard.delivered_documents || 0)
            }
            subtitle="Registados"
          />

          <StatCard
            title="Pendências"
            value={
              (dashboard.pending_requests || 0) +
              (dashboard.processing_requests || 0)
            }
            subtitle="Em aberto"
          />

          <StatCard
            title="Concluídos"
            value={dashboard.delivered_documents || 0}
            subtitle="Entregues ao estudante"
          />
        </div>
      </div>
    </div>
  );
}
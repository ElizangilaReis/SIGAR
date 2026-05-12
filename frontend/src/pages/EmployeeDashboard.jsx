import { logout } from "../services/auth";

export default function EmployeeDashboard() {

  function handleLogout() {
    logout();
    window.location.href = "/login";
  }

  return (
    <div style={styles.page}>

      <div style={styles.header}>
        <h2>SIGAR — Funcionário</h2>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          Sair
        </button>
      </div>

      <div style={styles.container}>

        <h1>Painel do Funcionário</h1>

        <p>
          Bem-vindo ao módulo de atendimento académico do SIGAR.
        </p>

        <div style={styles.card}>
          <h3>Funcionalidades</h3>

          <ul>
            <li>Gestão de solicitações</li>
            <li>Validação de documentos</li>
            <li>Atualização de estados</li>
            <li>Atendimento académico</li>
            <li>Consulta de pagamentos</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",
    background: "#f4f6f9",
    fontFamily: "Arial"
  },

  header: {
    background: "#059669",
    color: "#fff",
    padding: "20px 40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  logoutBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer"
  },

  container: {
    padding: "40px"
  },

  card: {
    marginTop: "20px",
    padding: "25px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  }
};
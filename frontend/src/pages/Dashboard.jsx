import { logout } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    window.location.href = "/login";
  }

  return (
    <div style={styles.page}>

      <div style={styles.header}>
        <h2>SIGAR — Estudante</h2>

        <button style={styles.logoutBtn} onClick={handleLogout}>
          Sair
        </button>
      </div>

      <div style={styles.container}>

        <h1>Painel do Estudante</h1>

        <p>
          Bem-vindo ao SIGAR.
        </p>

        <div style={styles.card}>
          <h3>Serviços Disponíveis</h3>

          <ul>
            <li>Solicitação de documentos</li>
            <li>Consulta de pagamentos</li>
            <li>Estado de solicitações</li>
            <li>Histórico académico</li>
            <li>Perfil do estudante</li>
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
    background: "#2563eb",
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
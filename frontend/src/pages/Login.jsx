import { useState } from "react";
import { login, getRole } from "../services/auth";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);

      const role = getRole();

      // 🔥 Redirecionamento inteligente
      if (role === "admin") {
        window.location.href = "/admin";
      } else if (role === "parceiro") {
        window.location.href = "/parceiro";
      } else {
        window.location.href = "/dashboard";
      }

    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>SIGAR</h2>
        <p>
          PLATAFORMA WEB DE AUTO-ATENDIMENTO ACADÉMICO PARA SOLICITAÇÃO DE DOCUMENTOS E PAGAMENTOS DIGITAIS
        </p>

        <form onSubmit={handleSubmit}>
          <input 
            type="email"
            placeholder="Email institucional"
            onChange={e => setEmail(e.target.value)} 
            required
          />

          <input 
            type="password"
            placeholder="Senha"
            onChange={e => setPassword(e.target.value)} 
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
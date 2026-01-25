import { useState } from "react";
import { login } from "../services/auth";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(email, password);
      window.location.href = "/dashboard";
    } catch {
      alert("Credenciais inválidas");
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>SIGAR</h2>
        <p>PLATAFORMA WEB DE AUTO-ATENDIMENTO ACADÉMICO PARA SOLICITAÇÃO DE DOCUMENTOS E PAGAMENTOS DIGITAIS </p>

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

          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}

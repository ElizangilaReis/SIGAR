import { useState } from 'react';
import { Link } from 'react-router-dom';
import { login, getRole } from '../services/auth';
import './Login.css';

export default function Login() {
  const [loginValue, setLoginValue] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await login(loginValue, password);

      const role = getRole();

      if (role === 'admin') {
        window.location.href = '/admin';
      } else if (role === 'employee') {
        window.location.href = '/employee';
      } else {
        window.location.href = '/dashboard';
      }
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          'Credenciais inválidas.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-brand">
        <div className="brand-content">
          <h1>Bem-vindo ao SIGAR</h1>

          <p>
            Plataforma Web de Autoatendimento Académico para
            Solicitação de Documentos e Pagamentos Digitais.
          </p>

          <div className="brand-points">
            <div className="brand-point">
              <span></span>
              Solicitação eletrónica de documentos
            </div>

            <div className="brand-point">
              <span></span>
              Pagamentos digitais com referência Multicaixa
            </div>

            <div className="brand-point">
              <span></span>
              Validação eletrónica de documentos
            </div>
          </div>
        </div>
      </div>

      <div className="login-panel">
        <div className="login-card">
          <div className="login-header">
            <Link to="/" className="login-logo-link">
              <img src="/images/logo.png" alt="SIGAR" />
            </Link>

            <h2>Entrar</h2>

            <p>
              Aceda à sua conta para gerir solicitações,
              pagamentos e documentos académicos.
            </p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-field">
              <label>Número de estudante ou e-mail</label>

              <input
                type="text"
                placeholder="Introduza o número de estudante ou e-mail"
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                required
              />
            </div>

            <div className="login-field">
              <label>Senha ou número do BI</label>

              <input
                type="password"
                placeholder="Introduza a sua senha ou número do BI"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="login-submit"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>

            <div className="login-support">
              <span>Esqueceu as suas credenciais? </span>

              <a
                href="https://wa.me/244936420139"
                target="_blank"
                rel="noreferrer"
                className="support-inline-link"
              >
                Entrar em contacto com a administração
              </a>
            </div>
          </form>

          <div className="login-footer">
            © 2026 SIGAR
          </div>
        </div>
      </div>
    </div>
  );
}
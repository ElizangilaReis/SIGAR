import "./Header.css";
import { logout, getUser } from "../../../services/auth";

export default function Header() {
  const user = getUser();

  function handleLogout() {
    logout();
    window.location.href = "/login";
  }

  return (
    <header className="header">

      <div className="header-left">
        <h2>SIGAR</h2>
        <span>Painel Administrativo</span>
      </div>

      <div className="header-right">

        <div className="user-info">
          <span className="user-name">{user?.name}</span>
          <small className="user-role">Administrador</small>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Sair
        </button>

      </div>

    </header>
  );
}
import { FaBars } from "react-icons/fa";
import "./Header.css";
import { logout, getUser } from "../../../services/auth";

export default function Header({ setMenuOpen }) {
  const user = getUser();

  function handleLogout() {
    logout();
    window.location.href = "/login";
  }

  return (
    <header className="header">
      <div className="header-left">
        <button
          className="menu-button"
          onClick={() => setMenuOpen(true)}
        >
          <FaBars />
        </button>

        <div>
          <h2>SIGAR</h2>
          <span>Painel Administrativo</span>
        </div>
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
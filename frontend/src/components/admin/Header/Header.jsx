import { FaBars } from "react-icons/fa";
import "./Header.css";

import { logout, getUser } from "../../../services/auth";

export default function Header({ menuOpen, toggleMenu }) {
  const user = getUser();

  function handleLogout() {
    logout();
    window.location.href = "/login";
  }

  return (
    <header className="header">

      <div className="header-left">

        <button
          type="button"
          className="menu-button"
          onClick={toggleMenu}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
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
          <span className="user-name">
            {user?.name}
          </span>

          <small className="user-role">
            Administrador
          </small>
        </div>

        <button
          type="button"
          className="logout-btn"
          onClick={handleLogout}
        >
          Sair
        </button>

      </div>

    </header>
  );
}
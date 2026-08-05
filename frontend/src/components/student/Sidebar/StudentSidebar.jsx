import { NavLink } from "react-router-dom";
import { logout } from "../../../services/auth";

import "./StudentSidebar.css";

export default function StudentSidebar({ open, onClose }) {

    async function handleLogout() {

        await logout();

        window.location.href = "/login";

    }

    return (

        <>

            {open && (
                <div
                    className="sidebar-overlay"
                    onClick={onClose}
                />
            )}

            <aside className={`sidebar ${open ? "open" : ""}`}>

                <div>

                    <div className="sidebar-logo">

                        <h2>SIGAR</h2>

                    </div>

                    <nav>

                        <NavLink to="/dashboard" end onClick={onClose}>
                            Dashboard
                        </NavLink>

                        <NavLink to="/dashboard/notifications" onClick={onClose}>
                            Notificações
                        </NavLink>

                        <NavLink to="/dashboard/requests" onClick={onClose}>
                            Pedidos
                        </NavLink>

                        <NavLink to="/dashboard/documents" onClick={onClose}>
                            Documentos
                        </NavLink>

                        <NavLink to="/dashboard/my-documents" onClick={onClose}>
                            Meus Documentos
                        </NavLink>

                        <NavLink to="/dashboard/payments" onClick={onClose}>
                            Pagamentos
                        </NavLink>

                        <NavLink to="/dashboard/profile" onClick={onClose}>
                            Perfil
                        </NavLink>

                        <NavLink to="/dashboard/settings" onClick={onClose}>
                            Configurações
                        </NavLink>

                    </nav>

                </div>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Terminar Sessão
                </button>

            </aside>

        </>

    );

}
import { NavLink } from "react-router-dom";
import { logout } from "../../../services/auth";

import "./EmployeeSidebar.css";

export default function EmployeeSidebar({ open, onClose }) {

    async function handleLogout(){

        await logout();

        window.location.href="/login";

    }

    return(

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

                        <NavLink to="/employee" end onClick={onClose}>
                            Dashboard
                        </NavLink>

                        <NavLink to="/employee/requests" onClick={onClose}>
                            Pedidos
                        </NavLink>

                        <NavLink to="/employee/payments" onClick={onClose}>
                            Pagamentos
                        </NavLink>

                        <NavLink to="/employee/documents" onClick={onClose}>
                            Documentos Prontos
                        </NavLink>

                        <NavLink to="/employee/reports" onClick={onClose}>
                            Relatórios
                        </NavLink>

                        <NavLink to="/employee/profile" onClick={onClose}>
                            Perfil
                        </NavLink>

                        <NavLink to="/employee/settings" onClick={onClose}>
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
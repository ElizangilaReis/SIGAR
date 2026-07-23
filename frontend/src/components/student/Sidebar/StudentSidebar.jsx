import { NavLink } from "react-router-dom";

import { logout } from "../../../services/auth";

import "./StudentSidebar.css";

export default function StudentSidebar() {

    async function handleLogout(){

        await logout();

        window.location.href="/login";

    }

    return(

        <aside className="sidebar">

            <div>

                <div className="sidebar-logo">

                    <h2>SIGAR</h2>

                </div>

                <nav>

                    <NavLink to="/dashboard" end>

                        Dashboard

                    </NavLink>

                    <NavLink to="/dashboard/requests">

                        Pedidos

                    </NavLink>

                    <NavLink to="/dashboard/documents">

                        Documentos

                    </NavLink>

                    <NavLink to="/dashboard/payments">

                        Pagamentos

                    </NavLink>

                    <NavLink to="/dashboard/profile">

                        Perfil

                    </NavLink>

                    <NavLink to="/dashboard/settings">

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

    );

}
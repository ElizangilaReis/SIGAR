import { NavLink } from "react-router-dom";

import { logout } from "../../../services/auth";

import "./EmployeeSidebar.css";

export default function EmployeeSidebar() {

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

                    <NavLink to="/employee" end>

                        Dashboard

                    </NavLink>

                    <NavLink to="/employee/requests">

                        Pedidos

                    </NavLink>

                    <NavLink to="/employee/payments">

                        Pagamentos

                    </NavLink>

                    <NavLink to="/employee/documents">

                        Documentos Prontos

                    </NavLink>

                    <NavLink to="/employee/reports">

                        Relatórios

                    </NavLink>

                    <NavLink to="/employee/profile">

                        Perfil

                    </NavLink>

                    <NavLink to="/employee/settings">

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
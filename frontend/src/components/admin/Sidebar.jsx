import "./Sidebar.css";
import MenuItem from "./MenuItem";

import {
  FaHome,
  FaUserGraduate,
  FaUsers,
  FaFileAlt,
  FaMoneyBillWave,
  FaChartBar,
  FaCog,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <h2>SIGAR</h2>
        <span>Painel Administrativo</span>
      </div>

      <nav className="sidebar-menu">

        <MenuItem
          to="/admin"
          icon={<FaHome />}
        >
          Dashboard
        </MenuItem>

        <p className="sidebar-title">
          Gestão Académica
        </p>

        <MenuItem
          to="/admin/students"
          icon={<FaUserGraduate />}
        >
          Estudantes
        </MenuItem>

        <MenuItem
          to="/admin/employees"
          icon={<FaUsers />}
        >
          Funcionários
        </MenuItem>

        <p className="sidebar-title">
          Serviços
        </p>

        <MenuItem
          to="/admin/documents"
          icon={<FaFileAlt />}
        >
          Documentos
        </MenuItem>

        <MenuItem
          to="/admin/payments"
          icon={<FaMoneyBillWave />}
        >
          Pagamentos
        </MenuItem>

        <p className="sidebar-title">
          Sistema
        </p>

        <MenuItem
          to="/admin/reports"
          icon={<FaChartBar />}
        >
          Relatórios
        </MenuItem>

        <MenuItem
          to="/admin/settings"
          icon={<FaCog />}
        >
          Configurações
        </MenuItem>

      </nav>

    </aside>
  );
}
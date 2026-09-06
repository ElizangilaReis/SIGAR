import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/admin/Sidebar/Sidebar";
import Header from "../components/admin/Header/Header";

import "./AdminLayout.css";

export default function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <div className="admin-layout">

      <Sidebar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        closeMenu={closeMenu}
      />

      <div className="admin-main">

        <Header
          menuOpen={menuOpen}
          toggleMenu={toggleMenu}
        />

        <main className="admin-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}
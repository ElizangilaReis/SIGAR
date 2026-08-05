import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar/Sidebar";
import Header from "../components/admin/Header/Header";
import "./AdminLayout.css";

export default function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="admin-layout">
      <Sidebar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {menuOpen && (
        <div
          className="admin-overlay"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div className="admin-main">
        <Header setMenuOpen={setMenuOpen} />

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar/Sidebar";
import Header from "../components/admin/Header/Header";

export default function AdminLayout() {
  return (
    <div style={styles.container}>
      <Sidebar />

      <div style={styles.main}>
        <Header />

        <main style={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    background: "#f1f5f9",
  },

  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },

  content: {
    flex: 1,
    padding: "30px",
    overflowY: "auto",
  },
};
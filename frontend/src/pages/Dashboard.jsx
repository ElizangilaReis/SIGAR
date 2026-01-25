import api from "../services/api";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get("/user").then(res => setUser(res.data));
  }, []);

  return <h1>Bem-vinda, {user?.name}</h1>;
}

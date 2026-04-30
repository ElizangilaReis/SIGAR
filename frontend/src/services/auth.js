import api from "./api";

export async function login(email, password) {
  try {
    const response = await api.post("/login", { email, password });

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    return response.data.user;

  } catch (error) {
    throw error.response?.data?.message || "Erro ao fazer login";
  }
}

export async function logout() {
  try {
    await api.post("/logout");
  } catch (e) {
    // ignora erro (token pode já estar inválido)
  }

  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function isAuthenticated() {
  return !!localStorage.getItem("token");
}

// ROLE (ADICIONA AQUI)
export function getRole() {
  const user = getUser();
  return user?.role || null;
}

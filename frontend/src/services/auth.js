import api from "./api";

/**
 * Login
 * login = Email ou Número de Estudante
 * password = Palavra-passe ou BI
 */
export async function login(login, password) {

    try {

        const response = await api.post("/login", {

            login,

            password

        });

        localStorage.setItem(

            "token",

            response.data.token

        );

        localStorage.setItem(

            "user",

            JSON.stringify(response.data.user)

        );

        return response.data.user;

    } catch (error) {

        throw (

            error.response?.data?.message ||

            "Erro ao efectuar login."

        );

    }

}

/**
 * Logout
 */
export async function logout() {

    try {

        await api.post("/logout");

    } catch (e) {

        // ignora caso o token já tenha expirado

    }

    localStorage.removeItem("token");

    localStorage.removeItem("user");

}

/**
 * Utilizador autenticado
 */
export function getUser() {

    const user = localStorage.getItem("user");

    return user

        ? JSON.parse(user)

        : null;

}

/**
 * Está autenticado?
 */
export function isAuthenticated() {

    return !!localStorage.getItem("token");

}

/**
 * Papel do utilizador
 */
export function getRole() {

    const user = getUser();

    return user?.role || null;

}
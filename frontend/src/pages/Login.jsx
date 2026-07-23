import { useState } from "react";
import { login, getRole } from "../services/auth";
import "./Login.css";

export default function Login() {

    const [loginValue, setLoginValue] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {

        e.preventDefault();

        setLoading(true);

        try {

            await login(loginValue, password);

            const role = getRole();

            if (role === "admin") {

                window.location.href = "/admin";

            } else if (role === "employee") {

                window.location.href = "/employee";

            } else {

                window.location.href = "/dashboard";

            }

        } catch (error) {

            alert(

                error?.response?.data?.message ||

                "Credenciais inválidas."

            );

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="login-container">

            <div className="login-box">

                <h2>SIGAR</h2>

                <p>

                    PLATAFORMA WEB DE AUTO-ATENDIMENTO ACADÉMICO PARA
                    SOLICITAÇÃO DE DOCUMENTOS E PAGAMENTOS DIGITAIS

                </p>

                <form onSubmit={handleSubmit}>

                    <input

                        type="text"

                        placeholder="Email ou Número de Estudante"

                        value={loginValue}

                        onChange={(e) => setLoginValue(e.target.value)}

                        required

                    />

                    <input

                        type="password"

                        placeholder="Senha ou Nº do BI"

                        value={password}

                        onChange={(e) => setPassword(e.target.value)}

                        required

                    />

                    <button

                        type="submit"

                        disabled={loading}

                    >

                        {

                            loading

                                ? "Entrando..."

                                : "Entrar"

                        }

                    </button>

                </form>

            </div>

        </div>

    );

}
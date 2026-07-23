import { getUser } from "../../../services/auth";

import "./StudentHeader.css";

export default function StudentHeader() {

    const user = getUser();

    return (

        <header className="admin-header">

            <div>

                <h2>Painel do Estudante</h2>

                <p>

                    Bem-vindo,

                    <strong> {user?.name}</strong>

                </p>

            </div>

        </header>

    );

}
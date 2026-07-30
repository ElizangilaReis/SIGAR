import { getUser } from "../../../services/auth";

import "./EmployeeHeader.css";

export default function EmployeeHeader() {

    const user = getUser();

    return (

        <header className="admin-header">

            <div>

                <h2>Painel do Funcionário</h2>

                <p>

                    Bem-vindo,

                    <strong> {user?.name}</strong>

                </p>

            </div>

        </header>

    );

}
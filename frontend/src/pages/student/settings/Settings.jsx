import { useState } from "react";

import Button from "../../../components/common/Button/Button";

export default function Settings() {

    const [theme, setTheme] = useState(

        localStorage.getItem("theme") || "light"

    );

    function changeTheme(value) {

        setTheme(value);

        localStorage.setItem("theme", value);

        document.documentElement.setAttribute(
            "data-theme",
            value
        );

    }

    return (

        <>

            <div className="dashboard-header">

                <h1>

                    Configurações

                </h1>

                <p>

                    Personalize a sua experiência na plataforma.

                </p>

            </div>

            <div className="settings-container">

                <div className="settings-card">

                    <h3>

                        Aparência

                    </h3>

                    <p>

                        Escolha o tema da plataforma.

                    </p>

                    <div
                        style={{
                            display:"flex",
                            gap:"12px",
                            marginTop:"20px"
                        }}
                    >

                        <Button
                            onClick={()=>changeTheme("light")}
                        >

                            ☀ Claro

                        </Button>

                        <Button
                            onClick={()=>changeTheme("dark")}
                        >

                            🌙 Escuro

                        </Button>

                        <Button
                            onClick={()=>changeTheme("system")}
                        >

                            💻 Automático

                        </Button>

                    </div>

                </div>

                <div className="settings-card">

                    <h3>

                        Idioma

                    </h3>

                    <p>

                        Português (Angola)

                    </p>

                    <small>

                        Brevemente será possível alterar o idioma.

                    </small>

                </div>

                <div className="settings-card">

                    <h3>

                        Notificações

                    </h3>

                    <p>

                        Em breve poderá definir como deseja receber notificações da plataforma.

                    </p>

                </div>

            </div>

        </>

    );

}
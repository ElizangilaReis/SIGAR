import { useState } from "react";

import { logout } from "../../../services/auth";

import Button from "../../../components/common/Button/Button";
import Select from "../../../components/common/Select/Select";

export default function Settings() {

    const [language, setLanguage] = useState("pt-AO");

    const [dateFormat, setDateFormat] = useState("dd/mm/yyyy");

    const [theme, setTheme] = useState("light");

    async function handleLogout() {

        await logout();

        window.location.href = "/login";

    }

    function handleSave() {

        alert("Configurações guardadas com sucesso.");

    }

    return (

        <>

            <div className="dashboard-header">

                <h1>Configurações do Sistema</h1>

                <p>Defina as preferências de utilização da plataforma.</p>

            </div>

            <div className="card" style={{ padding: 24 }}>

                <h3>Preferências do Sistema</h3>

                <div className="form-grid" style={{ marginTop: 20 }}>

                    <Select

                        label="Idioma"

                        value={language}

                        onChange={e => setLanguage(e.target.value)}

                        options={[

                            { value: "pt-AO", label: "Português (Angola)" },

                            { value: "pt-PT", label: "Português (Portugal)" },

                            { value: "en", label: "English" }

                        ]}

                    />

                    <Select

                        label="Formato de Data"

                        value={dateFormat}

                        onChange={e => setDateFormat(e.target.value)}

                        options={[

                            { value: "dd/mm/yyyy", label: "DD/MM/AAAA" },

                            { value: "mm/dd/yyyy", label: "MM/DD/AAAA" },

                            { value: "yyyy-mm-dd", label: "AAAA-MM-DD" }

                        ]}

                    />

                    <Select

                        label="Tema"

                        value={theme}

                        onChange={e => setTheme(e.target.value)}

                        options={[

                            { value: "light", label: "Claro" },

                            { value: "dark", label: "Escuro" },

                            { value: "system", label: "Automático" }

                        ]}

                    />

                </div>

                <div style={{ marginTop: 24 }}>

                    <Button

                        variant="primary"

                        onClick={handleSave}

                    >

                        Guardar Configurações

                    </Button>

                </div>

            </div>

            <div className="card" style={{ padding: 24, marginTop: 24 }}>

                <h3>Sessão</h3>

                <p style={{ color: "#6b7280", marginTop: 8 }}>

                    Termine a sessão no dispositivo atual.

                </p>

                <div style={{ marginTop: 20 }}>

                    <Button

                        variant="danger"

                        onClick={handleLogout}

                    >

                        Terminar Sessão

                    </Button>

                </div>

            </div>

        </>

    );

}
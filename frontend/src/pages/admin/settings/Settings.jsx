import { useEffect, useRef, useState } from "react";

import PageHeader from "../../../components/admin/PageHeader/PageHeader";
import Input from "../../../components/common/Input/Input";
import Select from "../../../components/common/Select/Select";
import Button from "../../../components/common/Button/Button";
import Loading from "../../../components/common/Loading/Loading";

import settingsService from "../../../services/settingsService";

import "./Settings.css";

export default function Settings() {

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const fileInput = useRef(null);

    const [form, setForm] = useState({

        institution_name: "",

        email: "",

        phone: "",

        address: "",

        academic_year: "",

        language: "pt",

        timezone: "Africa/Luanda",

        currency: "AOA",

        maintenance: false,

        registration: true,

        notifications: true,

        logo: ""

    });

    useEffect(() => {

        loadSettings();

    }, []);

    async function loadSettings() {

        try {

            setLoading(true);

            const data = await settingsService.get();

            setForm(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    function handleChange(e) {

        const { name, value } = e.target;

        setForm(prev => ({

            ...prev,

            [name]:

                value === "true"

                    ? true

                    : value === "false"

                        ? false

                        : value

        }));

    }

    async function handleLogo(e) {

        const file = e.target.files[0];

        if (!file) return;

        try {

            await settingsService.uploadLogo(file);

            await loadSettings();

            alert("Logótipo actualizado com sucesso.");

        } catch (error) {

            console.error(error);

            alert("Erro ao actualizar o logótipo.");

        }

    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            setSaving(true);

            await settingsService.update(form);

            alert("Configurações guardadas com sucesso.");

        } catch (error) {

            console.error(error);

            alert("Erro ao guardar as configurações.");

        } finally {

            setSaving(false);

        }

    }

    if (loading) {

        return <Loading />;

    }

    return (

        <>

            <PageHeader

                title="Configurações"

                subtitle="Configuração geral do sistema."

            />

            <form

                className="settings-container"

                onSubmit={handleSubmit}

            >

                <div className="settings-card">

                    <h2>Instituição</h2>

                    <Input

                        label="Nome"

                        name="institution_name"

                        value={form.institution_name}

                        onChange={handleChange}

                    />

                    <Input

                        label="Email"

                        name="email"

                        value={form.email}

                        onChange={handleChange}

                    />

                    <Input

                        label="Telefone"

                        name="phone"

                        value={form.phone}

                        onChange={handleChange}

                    />

                    <Input

                        label="Endereço"

                        name="address"

                        value={form.address}

                        onChange={handleChange}

                    />

                </div>

                <div className="settings-card">

                    <h2>Sistema</h2>

                    <Input

                        label="Ano Académico"

                        name="academic_year"

                        value={form.academic_year}

                        onChange={handleChange}

                    />

                    <Select

                        label="Idioma"

                        name="language"

                        value={form.language}

                        onChange={handleChange}

                        options={[

                            {

                                value: "pt",

                                label: "Português"

                            },

                            {

                                value: "en",

                                label: "English"

                            }

                        ]}

                    />

                    <Select

                        label="Fuso Horário"

                        name="timezone"

                        value={form.timezone}

                        onChange={handleChange}

                        options={[

                            {

                                value: "Africa/Luanda",

                                label: "Africa/Luanda"

                            }

                        ]}

                    />

                    <Select

                        label="Moeda"

                        name="currency"

                        value={form.currency}

                        onChange={handleChange}

                        options={[

                            {

                                value: "AOA",

                                label: "Kwanza (AOA)"

                            }

                        ]}

                    />

                </div>

                <div className="settings-card">

                    <h2>Segurança</h2>

                    <Select

                        label="Modo Manutenção"

                        name="maintenance"

                        value={String(form.maintenance)}

                        onChange={handleChange}

                        options={[

                            {

                                value: "true",

                                label: "Sim"

                            },

                            {

                                value: "false",

                                label: "Não"

                            }

                        ]}

                    />

                    <Select

                        label="Permitir Registos"

                        name="registration"

                        value={String(form.registration)}

                        onChange={handleChange}

                        options={[

                            {

                                value: "true",

                                label: "Sim"

                            },

                            {

                                value: "false",

                                label: "Não"

                            }

                        ]}

                    />

                    <Select

                        label="Notificações"

                        name="notifications"

                        value={String(form.notifications)}

                        onChange={handleChange}

                        options={[

                            {

                                value: "true",

                                label: "Sim"

                            },

                            {

                                value: "false",

                                label: "Não"

                            }

                        ]}

                    />

                </div>

                <div className="settings-card">

                    <h2>Logótipo da Instituição</h2>

                    {

                        form.logo && (

                            <img

                                src={form.logo}

                                alt="Logo"

                                className="logo-preview"

                            />

                        )

                    }

                    <input

                        type="file"

                        hidden

                        ref={fileInput}

                        onChange={handleLogo}

                    />

                    <Button

                        type="button"

                        onClick={() => fileInput.current.click()}

                    >

                        Alterar Logótipo

                    </Button>

                </div>

                <div className="settings-card">

                    <h2>Backup da Base de Dados</h2>

                    <p>

                        Crie uma cópia de segurança da base de dados do sistema.

                    </p>

                    <Button

                        type="button"

                        onClick={() => settingsService.backup()}

                    >

                        Criar Backup

                    </Button>

                </div>

                <div className="settings-footer">

                    <Button

                        type="submit"

                    >

                        {

                            saving

                                ? "Guardar..."

                                : "Guardar Configurações"

                        }

                    </Button>

                </div>

            </form>

        </>

    );

}
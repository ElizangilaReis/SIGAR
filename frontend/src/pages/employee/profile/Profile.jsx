import { useEffect, useState } from "react";

import employeeService from "../../../services/employeeService";

import Loading from "../../../components/common/Loading/Loading";
import Input from "../../../components/common/Input/Input";
import Button from "../../../components/common/Button/Button";

export default function Profile() {

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({

        name: "",

        phone: "",

        email: "",

        bi: "",

        gender: "",

        birth_date: "",

        employee_number: "",

        department: "",

        position: ""

    });

    useEffect(() => {

        loadProfile();

    }, []);

    async function loadProfile() {

        try {

            setLoading(true);

            const data = await employeeService.myProfile();

            setForm({

                name: data.name || "",

                phone: data.phone || "",

                email: data.email || "",

                bi: data.bi || "",

                gender: data.gender || "",

                birth_date: data.birth_date || "",

                employee_number: data.employee?.employee_number || "",

                department: data.employee?.department?.name || "",

                position: data.employee?.position?.name || ""

            });

        } finally {

            setLoading(false);

        }

    }

    function handleChange(e) {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            setSaving(true);

            await employeeService.updateMyProfile({

                name: form.name,

                phone: form.phone

            });

            alert("Perfil actualizado com sucesso.");

        } catch {

            alert("Erro ao actualizar perfil.");

        } finally {

            setSaving(false);

        }

    }

    if (loading) {

        return <Loading />;

    }

    return (

        <>

            <div className="dashboard-header">

                <h1>Meu Perfil</h1>

                <p>Consulte as suas informações e actualize os dados permitidos.</p>

            </div>

            <div className="card" style={{ padding: 24 }}>

                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>

                    <div

                        style={{

                            width: 64,

                            height: 64,

                            borderRadius: "50%",

                            background: "#2563eb",

                            color: "#fff",

                            display: "flex",

                            alignItems: "center",

                            justifyContent: "center",

                            fontSize: 22,

                            fontWeight: 700

                        }}

                    >

                        {form.name?.charAt(0) || "F"}

                    </div>

                    <div>

                        <h2 style={{ margin: 0 }}>{form.name}</h2>

                        <p style={{ margin: "4px 0 0", color: "#6b7280" }}>

                            Funcionário • {form.department || "Secretaria Académica"}

                        </p>

                    </div>

                </div>

                <h3 style={{ marginBottom: 16 }}>Dados do Funcionário</h3>

                <div

                    style={{

                        display: "grid",

                        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",

                        gap: 20

                    }}

                >

                    <div>

                        <small style={{ color: "#6b7280" }}>Número do Funcionário</small>

                        <p style={{ margin: "6px 0 0", fontWeight: 600 }}>

                            {form.employee_number || "—"}

                        </p>

                    </div>

                    <div>

                        <small style={{ color: "#6b7280" }}>BI</small>

                        <p style={{ margin: "6px 0 0", fontWeight: 600 }}>

                            {form.bi || "—"}

                        </p>

                    </div>

                    <div>

                        <small style={{ color: "#6b7280" }}>Email</small>

                        <p style={{ margin: "6px 0 0", fontWeight: 600 }}>

                            {form.email || "—"}

                        </p>

                    </div>

                    <div>

                        <small style={{ color: "#6b7280" }}>Género</small>

                        <p style={{ margin: "6px 0 0", fontWeight: 600 }}>

                            {form.gender || "—"}

                        </p>

                    </div>

                    <div>

                        <small style={{ color: "#6b7280" }}>Data de Nascimento</small>

                        <p style={{ margin: "6px 0 0", fontWeight: 600 }}>

                            {form.birth_date || "—"}

                        </p>

                    </div>

                    <div>

                        <small style={{ color: "#6b7280" }}>Departamento</small>

                        <p style={{ margin: "6px 0 0", fontWeight: 600 }}>

                            {form.department || "—"}

                        </p>

                    </div>

                    <div>

                        <small style={{ color: "#6b7280" }}>Cargo</small>

                        <p style={{ margin: "6px 0 0", fontWeight: 600 }}>

                            {form.position || "—"}

                        </p>

                    </div>

                </div>

            </div>

            <div className="card" style={{ marginTop: 24, padding: 24 }}>

                <h3 style={{ marginBottom: 20 }}>Editar Informações</h3>

                <form onSubmit={handleSubmit}>

                    <div className="form-grid">

                        <Input

                            label="Nome Completo"

                            name="name"

                            value={form.name}

                            onChange={handleChange}

                        />

                        <Input

                            label="Telefone"

                            name="phone"

                            value={form.phone}

                            onChange={handleChange}

                        />

                    </div>

                    <div style={{ marginTop: 24 }}>

                        <Button

                            type="submit"

                            variant="primary"

                            disabled={saving}

                        >

                            {saving ? "A guardar..." : "Guardar Alterações"}

                        </Button>

                    </div>

                </form>

            </div>

        </>

    );

}
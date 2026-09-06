import { useEffect, useState } from "react";

import Modal from "../../../components/common/Modal/Modal";
import Input from "../../../components/common/Input/Input";
import Select from "../../../components/common/Select/Select";
import Button from "../../../components/common/Button/Button";

export default function StudentForm({

    open,
    onClose,
    onSubmit,
    student = null,
    loading = false,

    faculties = [],
    courses = []

}) {

    const [form, setForm] = useState({

        name: "",
        email: "",
        student_number: "",
        bi: "",
        phone: "",
        birth_date: "",
        gender: "",
        faculty: "",
        course_id: "",
        status: "Activo"

    });

    const [systemMessage, setSystemMessage] = useState("");

    useEffect(() => {

        if (student) {

            setForm({

                name: student.user?.name || "",

                email: student.user?.email || "",

                student_number: student.student_number || "",

                bi: student.user?.bi || "",

                phone: student.user?.phone || "",

                birth_date: student.user?.birth_date?.substring(0,10) || "",

                gender: student.user?.gender || "",

                faculty: student.course?.faculty?.id || "",

                course_id: student.course?.id || "",

                status: student.user?.status || "Activo"

            });

        } else {

            setForm({

                name: "",

                email: "",

                student_number: "",

                bi: "",

                phone: "",

                birth_date: "",

                gender: "",

                faculty: "",

                course_id: "",

                status: "Activo"

            });

        }

        setSystemMessage("");

    }, [student]);

    function handleChange(e) {

        const { name, value } = e.target;

        setSystemMessage("");

        setForm(prev => ({

            ...prev,

            [name]: value,

            ...(name === "faculty" ? { course_id: "" } : {})

        }));

    }

    async function handleSubmit(e) {

        e.preventDefault();

        setSystemMessage("");

        try {

            await onSubmit(form);

        } catch (error) {

            console.error(error);

            const errors = error.response?.data?.errors;

            if (errors) {

                const messages = Object.values(errors)
                    .flat()
                    .join(" ");

                setSystemMessage(messages);

            } else if (error.response?.data?.message) {

                setSystemMessage(error.response.data.message);

            } else {

                setSystemMessage(
                    "Não foi possível guardar o estudante."
                );

            }

        }

    }

    const filteredCourses = courses.filter(

        course =>
            Number(course.faculty_id) === Number(form.faculty)

    );

    console.log(form);

    return (

        <Modal

            open={open}

            onClose={onClose}

            title={student ? "Editar Estudante" : "Novo Estudante"}

            footer={

                <>

                    <Button
                        variant="secondary"
                        onClick={onClose}
                    >
                        Cancelar
                    </Button>

                    <Button
                        onClick={handleSubmit}
                    >
                        {

                            loading

                                ?

                                "Guardar..."

                                :

                                "Guardar"

                        }

                    </Button>

                </>

            }

        >

            {systemMessage && (

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "12px",
                        marginBottom: "18px",
                        padding: "12px 14px",
                        backgroundColor: "#fef2f2",
                        border: "1px solid #fecaca",
                        borderRadius: "8px",
                        color: "#991b1b",
                        fontSize: "14px",
                        lineHeight: "1.4"
                    }}
                >

                    <span>
                        {systemMessage}
                    </span>

                    <button
                        type="button"
                        onClick={() => setSystemMessage("")}
                        style={{
                            border: "none",
                            background: "transparent",
                            color: "#991b1b",
                            fontSize: "20px",
                            cursor: "pointer",
                            padding: "0 4px"
                        }}
                        aria-label="Fechar mensagem"
                    >
                        ×
                    </button>

                </div>

            )}

            <form>

                <Input
                    label="Nome"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <Input
                    label="Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <Input
                    label="BI"
                    name="bi"
                    value={form.bi}
                    onChange={handleChange}
                    required
                />

                <Input
                    label="Telefone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                />

                <Input
                    label="Data de nascimento"
                    type="date"
                    name="birth_date"
                    value={form.birth_date}
                    onChange={handleChange}
                />

                <Select

                    label="Sexo"

                    name="gender"

                    value={form.gender}

                    onChange={handleChange}

                    options={[

                        {
                            value: "Masculino",
                            label: "Masculino"
                        },

                        {
                            value: "Feminino",
                            label: "Feminino"
                        }

                    ]}

                />

                <Select
                    label="Faculdade"
                    name="faculty"
                    value={form.faculty}
                    onChange={handleChange}
                    options={faculties.map(faculty => ({
                        value: faculty.id,
                        label: faculty.name
                    }))}
                />

                <Select
                    label="Curso"

                    name="course_id"

                    value={form.course_id}

                    onChange={handleChange}

                    options={filteredCourses.map(course => ({
                        value: course.id,
                        label: course.name
                    }))}

                />

                <Select

                    label="Estado"

                    name="status"

                    value={form.status}

                    onChange={handleChange}

                    options={[

                        {
                            value: "Activo",
                            label: "Activo"
                        },

                        {
                            value: "Inactivo",
                            label: "Inactivo"
                        }

                    ]}

                />

            </form>

        </Modal>

    );

}
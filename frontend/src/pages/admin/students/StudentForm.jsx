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

    }, [student]);

    function handleChange(e){

        const { name, value } = e.target;

        setForm(prev => ({

            ...prev,

            [name]: value,

            ...(name === "faculty" ? { course_id: "" } : {})

        }));

    }

    function handleSubmit(e) {

        e.preventDefault();

        onSubmit(form);

    }

    const filteredCourses = courses.filter(

        course => Number(course.faculty_id) === Number(form.faculty)

    );
    console.log(form);

    return(

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

                        {value:"Masculino",label:"Masculino"},

                        {value:"Feminino",label:"Feminino"}

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

                        {value:"Activo",label:"Activo"},

                        {value:"Inactivo",label:"Inactivo"}

                    ]}

                />

            </form>

        </Modal>

    );

}
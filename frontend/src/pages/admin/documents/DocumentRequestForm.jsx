import { useEffect, useMemo, useState } from "react";

import Modal from "../../../components/common/Modal/Modal";
import Select from "../../../components/common/Select/Select";
import Button from "../../../components/common/Button/Button";
import TextArea from "../../../components/common/TextArea/TextArea";

import studentService from "../../../services/studentService";
import employeeService from "../../../services/employeeService";
import documentTypeService from "../../../services/documentTypeService";
import documentRequestService from "../../../services/documentRequestService";

export default function DocumentRequestForm({

    open,
    onClose,
    request = null,
    onSaved

}) {

    const [loading, setLoading] = useState(false);

    const [students, setStudents] = useState([]);

    const [employees, setEmployees] = useState([]);

    const [documentTypes, setDocumentTypes] = useState([]);

    const [form, setForm] = useState({

        student_id: "",

        document_type_id: "",

        employee_id: "",

        status: "Pendente",

        observations: ""

    });

    useEffect(() => {

        if (open) {

            loadData();

        }

    }, [open]);

    useEffect(() => {

        if (request) {

            setForm({

                student_id: request.student?.id || "",

                document_type_id: request.document_type?.id || "",

                employee_id: request.employee?.id || "",

                status: request.status || "Pendente",

                observations: request.observations || ""

            });

        } else {

            setForm({

                student_id: "",

                document_type_id: "",

                employee_id: "",

                status: "Pendente",

                observations: ""

            });

        }

    }, [request]);

    async function loadData() {

    try {

        const [

            students,

            employees,

            documentTypes

        ] = await Promise.all([

            studentService.getAll(),

            employeeService.getAll(),

            documentTypeService.getAll()

        ]);

        setStudents(students);

        setEmployees(employees);

        setDocumentTypes(documentTypes);

    } catch (error) {

        console.error(error);

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

            setLoading(true);

            if (request) {

                await documentRequestService.update(

                    request.id,

                    form

                );

            } else {

                await documentRequestService.create(form);

            }

            onSaved();

            onClose();

        } catch (error) {

            console.error(error.response?.data);

        } finally {

            setLoading(false);

        }

    }

    const studentOptions = useMemo(() => {

        return students.map(student => ({

            value: student.id,

            label: `${student.student_number} - ${student.user?.name}`

        }));

    }, [students]);

    const employeeOptions = useMemo(() => {

        return employees.map(employee => ({

            value: employee.id,

            label: `${employee.employee_number} - ${employee.user?.name}`

        }));

    }, [employees]);

    const documentTypeOptions = useMemo(() => {

        return documentTypes.map(document => ({

            value: document.id,

            label: `${document.name} (${document.price} Kz)`

        }));

    }, [documentTypes]);

    return (

        <Modal

            open={open}

            onClose={onClose}

            title={

                request

                    ? "Editar Pedido"

                    : "Novo Pedido"

            }

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

                                ? "Guardar..."

                                : "Guardar"

                        }

                    </Button>

                </>

            }

        >

            <form>

                <Select

                    label="Estudante"

                    name="student_id"

                    value={form.student_id}

                    onChange={handleChange}

                    options={studentOptions}

                    required

                />

                <Select

                    label="Tipo de Documento"

                    name="document_type_id"

                    value={form.document_type_id}

                    onChange={handleChange}

                    options={documentTypeOptions}

                    required

                />

                <Select

                    label="Funcionário Responsável"

                    name="employee_id"

                    value={form.employee_id}

                    onChange={handleChange}

                    options={employeeOptions}

                />

                <Select

                    label="Estado"

                    name="status"

                    value={form.status}

                    onChange={handleChange}

                    options={[

                        {

                            value: "Pendente",

                            label: "Pendente"

                        },

                        {

                            value: "Em Processamento",

                            label: "Em Processamento"

                        },

                        {

                            value: "Pronto",

                            label: "Pronto"

                        },

                        {

                            value: "Entregue",

                            label: "Entregue"

                        },

                        {

                            value: "Cancelado",

                            label: "Cancelado"

                        }

                    ]}

                    required

                />

                <TextArea

                    label="Observações"

                    name="observations"

                    value={form.observations}

                    onChange={handleChange}

                    rows={5}

                />

            </form>

        </Modal>

    );

}
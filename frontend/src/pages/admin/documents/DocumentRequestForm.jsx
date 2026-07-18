import { useEffect, useMemo, useState } from "react";

import Modal from "../../../components/common/Modal/Modal";
import Select from "../../../components/common/Select/Select";
import Button from "../../../components/common/Button/Button";
import TextArea from "../../../components/common/TextArea/TextArea";

import studentService from "../../../services/studentService";
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

    const [documentTypes, setDocumentTypes] = useState([]);

    const [form, setForm] = useState({

        student_id: "",

        document_type_id: "",

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

                observations: request.observations || ""

            });

        } else {

            setForm({

                student_id: "",

                document_type_id: "",

                observations: ""

            });

        }

    }, [request]);

    async function loadData() {

        try {

            const [

                studentsResponse,

                documentTypesResponse

            ] = await Promise.all([

                studentService.getAll(),

                documentTypeService.getAll()

            ]);

            setStudents(

                studentsResponse.data.data || []

            );

            setDocumentTypes(

                documentTypesResponse.data.data || []

            );

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

            console.error(error);

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
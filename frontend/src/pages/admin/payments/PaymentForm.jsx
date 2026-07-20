import { useEffect, useMemo, useState } from "react";

import Modal from "../../../components/common/Modal/Modal";
import Button from "../../../components/common/Button/Button";
import Select from "../../../components/common/Select/Select";

import studentService from "../../../services/studentService";
import documentRequestService from "../../../services/documentRequestService";
import paymentService from "../../../services/paymentService";

export default function PaymentForm({

    open,
    onClose,
    onSaved

}) {

    const [students, setStudents] = useState([]);

    const [requests, setRequests] = useState([]);

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({

        student_id: "",

        document_request_id: ""

    });

    useEffect(() => {

        if (open) {

            loadStudents();

        }

    }, [open]);

    async function loadStudents() {

        try {

            const students = await studentService.getAll();

            setStudents(students);

            setRequests([]);

            setForm({

                student_id: "",

                document_request_id: ""

            });

        } catch (error) {

            console.error(error);

        }

    }

    async function loadRequests(studentId) {

        if (!studentId) {

            setRequests([]);

            return;

        }

        try {

            const allRequests = await documentRequestService.getAll();

            const studentRequests = allRequests.filter(request =>

                Number(request.student?.id) === Number(studentId)

            );

            setRequests(studentRequests);

        } catch (error) {

            console.error(error);

            setRequests([]);

        }

    }

    function handleChange(e) {

        const { name, value } = e.target;

        if (name === "student_id") {

            setForm({

                student_id: value,

                document_request_id: ""

            });

            loadRequests(value);

            return;

        }

        setForm(prev => ({

            ...prev,

            [name]: value

        }));

    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            setLoading(true);

            await paymentService.create(form);

            onSaved();

            onClose();

        } catch (error) {

            console.error(error.response?.data || error);

        } finally {

            setLoading(false);

        }

    }

    const studentOptions = useMemo(() => {

        return students.map(student => ({

            value: String(student.id),

            label: `${student.student_number} - ${student.user?.name}`

        }));

    }, [students]);

    const requestOptions = useMemo(() => {

        return requests.map(request => ({

            value: String(request.id),

            label: `${request.reference} - ${request.document_type?.name}`

        }));

    }, [requests]);

    return (

        <Modal

            open={open}

            onClose={onClose}

            title="Novo Pagamento"

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

                    label="Pedido"

                    name="document_request_id"

                    value={form.document_request_id}

                    onChange={handleChange}

                    options={requestOptions}

                    disabled={!form.student_id}

                    required

                />

            </form>

        </Modal>

    );

}
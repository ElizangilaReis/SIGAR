import { useEffect, useMemo, useState } from "react";

import Modal from "../../../components/common/Modal/Modal";
import Input from "../../../components/common/Input/Input";
import Select from "../../../components/common/Select/Select";
import Button from "../../../components/common/Button/Button";

export default function EmployeeForm({

    open,
    onClose,
    onSubmit,
    employee = null,
    loading = false,
    departments = [],
    positions = []

}) {

    const [form, setForm] = useState({

        name: "",
        email: "",
        bi: "",
        phone: "",
        birth_date: "",
        gender: "",
        department_id: "",
        position_id: "",
        status: "Activo"

    });

    useEffect(() => {

        if (employee) {

            setForm({

                name: employee.user?.name || "",

                email: employee.user?.email || "",

                bi: employee.user?.bi || "",

                phone: employee.user?.phone || "",

                birth_date: employee.user?.birth_date?.substring(0, 10) || "",

                gender: employee.user?.gender || "",

                department_id: employee.department?.id?.toString() || "",

                position_id: employee.position?.id?.toString() || "",

                status: employee.user?.status || "Activo"

            });

        } else {

            setForm({

                name: "",
                email: "",
                bi: "",
                phone: "",
                birth_date: "",
                gender: "",
                department_id: "",
                position_id: "",
                status: "Activo"

            });

        }

    }, [employee, open]);

    function handleChange(e) {

        const { name, value } = e.target;

        if (name === "department_id") {

            setForm(prev => ({

                ...prev,

                department_id: value,

                position_id: ""

            }));

            return;

        }

        setForm(prev => ({

            ...prev,

            [name]: value

        }));

    }

    function handleSubmit(e) {

        e.preventDefault();

        onSubmit(form);

    }

    const departmentOptions = useMemo(() => {

        return departments

            .sort((a, b) => a.name.localeCompare(b.name))

            .map(department => ({

                value: department.id.toString(),

                label: department.name

            }));

    }, [departments]);

    const filteredPositions = useMemo(() => {

        if (!form.department_id) return [];

        return positions
            .filter(position => {

                const departmentId =
                    position.department?.id ??
                    position.department_id;

                return Number(departmentId) === Number(form.department_id);

            })
            .sort((a, b) => a.name.localeCompare(b.name));

    }, [positions, form.department_id]);

    const positionOptions = useMemo(() => {

        return filteredPositions.map(position => ({

            value: position.id.toString(),

            label: position.name

        }));

    }, [filteredPositions]);

    return (

        <Modal

            open={open}

            onClose={onClose}

            title={employee ? "Editar Funcionário" : "Novo Funcionário"}

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
                        {loading ? "Guardar..." : "Guardar"}
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
                    type="email"
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
                    label="Data de Nascimento"
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
                    required
                />

                <Select
                    label="Departamento"
                    name="department_id"
                    value={form.department_id}
                    onChange={handleChange}
                    options={departmentOptions}
                    required
                />

                <Select
                    label="Cargo"
                    name="position_id"
                    value={form.position_id}
                    onChange={handleChange}
                    options={positionOptions}
                    disabled={!form.department_id}
                    required
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
                    required
                />

            </form>

        </Modal>

    );

}
import { useEffect, useMemo, useState } from "react";

import employeeService from "../../../services/employeeService";
import departmentService from "../../../services/departmentService";
import positionService from "../../../services/positionService";

import PageHeader from "../../../components/admin/PageHeader/PageHeader";
import Table from "../../../components/common/Table/Table";
import Button from "../../../components/common/Button/Button";
import SearchBar from "../../../components/common/SearchBar/SearchBar";
import Pagination from "../../../components/common/Pagination/Pagination";
import Loading from "../../../components/common/Loading/Loading";
import ConfirmDialog from "../../../components/common/ConfirmDialog/ConfirmDialog";

import EmployeeForm from "./EmployeeForm";

export default function Employees() {

    const [employees, setEmployees] = useState([]);

    const [departments, setDepartments] = useState([]);

    const [positions, setPositions] = useState([]);

    const [loading, setLoading] = useState(false);

    const [openForm, setOpenForm] = useState(false);

    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);

    const [confirmOpen, setConfirmOpen] = useState(false);

    const [employeeSelected, setEmployeeSelected] = useState(null);

    const [employeeAction, setEmployeeAction] = useState("");

    const perPage = 10;


    useEffect(() => {

        loadData();

    }, []);


    async function loadData() {

        try {

            setLoading(true);

            const [

                employeesResponse,

                departmentsResponse,

                positionsResponse

            ] = await Promise.all([

                employeeService.getAll(),

                departmentService.getAll(),

                positionService.getAll()

            ]);


            setEmployees(

                employeesResponse.data?.data ??

                employeesResponse.data ??

                employeesResponse

            );


            setDepartments(

                departmentsResponse.data?.data ??

                departmentsResponse.data ??

                departmentsResponse

            );


            setPositions(

                positionsResponse.data?.data ??

                positionsResponse.data ??

                positionsResponse

            );


        } catch (error) {

            console.error(error);

            // Não usar alert aqui.

        } finally {

            setLoading(false);

        }

    }


    async function handleSave(data) {

    try {

        setLoading(true);

        if (selectedEmployee) {

            await employeeService.update(
                selectedEmployee.id,
                data
            );

        } else {

            await employeeService.create(data);

        }

        await loadData();

        setOpenForm(false);

        setSelectedEmployee(null);

    } catch (error) {

        console.error(error);

        throw error;

    } finally {

        setLoading(false);

    }

}


    async function handleStatus() {

        try {

            setLoading(true);

            await employeeService.changeStatus(

                employeeSelected.id,

                employeeAction === "activar"

                    ? "Activo"

                    : "Inactivo"

            );


            await loadData();

            setConfirmOpen(false);

            setEmployeeSelected(null);

            setEmployeeAction("");


        } catch (error) {

            console.error(error);

            // O ConfirmDialog continua a tratar a confirmação.
            // Não usar alert aqui.

        } finally {

            setLoading(false);

        }

    }


    const filteredEmployees = useMemo(() => {

        return employees.filter(employee =>

            employee.user?.name

                ?.toLowerCase()

                .includes(search.toLowerCase())

            ||

            employee.user?.email

                ?.toLowerCase()

                .includes(search.toLowerCase())

            ||

            employee.user?.bi

                ?.toLowerCase()

                .includes(search.toLowerCase())

            ||

            employee.position

                ?.toLowerCase()

                .includes(search.toLowerCase())

        );

    }, [employees, search]);


    const totalPages = Math.ceil(

        filteredEmployees.length / perPage

    );


    const paginatedEmployees = useMemo(() => {

        const start = (page - 1) * perPage;

        return filteredEmployees.slice(

            start,

            start + perPage

        );

    }, [

        filteredEmployees,

        page

    ]);


    return (

        <>

            <PageHeader

                title="Gestão de Funcionários"

                subtitle="Gerir funcionários registados."

                buttonText="Novo Funcionário"

                onButtonClick={() => {

                    setSelectedEmployee(null);

                    setOpenForm(true);

                }}

            />


            <SearchBar

                value={search}

                onChange={setSearch}

                placeholder="Pesquisar funcionário..."

            />


            {

                loading ? (

                    <Loading />

                ) : (

                    <Table

                        columns={[

                            "Nº",

                            "Nome",

                            "Email",

                            "Departamento",

                            "Cargo",

                            "Estado",

                            "Acções"

                        ]}

                    >

                        {

                            paginatedEmployees.length === 0 ? (

                                <tr>

                                    <td

                                        colSpan={7}

                                        style={{

                                            textAlign: "center",

                                            padding: "30px"

                                        }}

                                    >

                                        Nenhum funcionário encontrado.

                                    </td>

                                </tr>

                            ) : (

                                paginatedEmployees.map((employee) => (

                                    <tr key={employee.id}>

                                        <td>

                                            {employee.employee_number}

                                        </td>

                                        <td>

                                            {employee.user?.name}

                                        </td>

                                        <td>

                                            {employee.user?.email}

                                        </td>

                                        <td>

                                            {employee.department?.name}

                                        </td>

                                        <td>

                                            {employee.position?.name}

                                        </td>

                                        <td>

                                            {employee.user?.status}

                                        </td>

                                        <td>

                                            <div

                                                style={{

                                                    display: "flex",

                                                    gap: "8px"

                                                }}

                                            >

                                                <Button

                                                    variant="secondary"

                                                    onClick={() => {

                                                        setSelectedEmployee(employee);

                                                        setOpenForm(true);

                                                    }}

                                                >

                                                    Editar

                                                </Button>


                                                {

                                                    employee.user?.status === "Activo" ? (

                                                        <Button

                                                            variant="danger"

                                                            onClick={() => {

                                                                setEmployeeAction("desactivar");

                                                                setEmployeeSelected(employee);

                                                                setConfirmOpen(true);

                                                            }}

                                                        >

                                                            Desactivar

                                                        </Button>

                                                    ) : (

                                                        <Button

                                                            variant="success"

                                                            onClick={() => {

                                                                setEmployeeAction("activar");

                                                                setEmployeeSelected(employee);

                                                                setConfirmOpen(true);

                                                            }}

                                                        >

                                                            Activar

                                                        </Button>

                                                    )

                                                }

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            )

                        }

                    </Table>

                )

            }


            <Pagination

                currentPage={page}

                totalPages={totalPages}

                onPageChange={setPage}

            />


            <EmployeeForm

                open={openForm}

                onClose={() => {

                    setOpenForm(false);

                    setSelectedEmployee(null);

                }}

                onSubmit={handleSave}

                employee={selectedEmployee}

                loading={loading}

                departments={departments}

                positions={positions}

            />


            <ConfirmDialog

                open={confirmOpen}

                title={

                    employeeAction === "activar"

                        ? "Activar Funcionário"

                        : "Desactivar Funcionário"

                }

                message={

                    employeeAction === "activar"

                        ? "Tem a certeza que pretende activar este funcionário?"

                        : "Tem a certeza que pretende desactivar este funcionário?"

                }

                onConfirm={handleStatus}

                onCancel={() => {

                    setConfirmOpen(false);

                    setEmployeeSelected(null);

                    setEmployeeAction("");

                }}

            />

        </>

    );

}
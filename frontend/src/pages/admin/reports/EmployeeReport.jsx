import { useEffect, useMemo, useState } from "react";

import reportService from "../../../services/reportService";

import SearchBar from "../../../components/common/SearchBar/SearchBar";
import Pagination from "../../../components/common/Pagination/Pagination";
import Table from "../../../components/common/Table/Table";
import Loading from "../../../components/common/Loading/Loading";
import Button from "../../../components/common/Button/Button";

export default function EmployeeReport() {

    const [employees, setEmployees] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);

    const perPage = 10;

    useEffect(() => {

        loadEmployees();

    }, []);

    async function loadEmployees() {

        try {

            setLoading(true);

            const data = await reportService.employees();

            setEmployees(data);

        } finally {

            setLoading(false);

        }

    }

    const filtered = useMemo(() => {

        if (!search) return employees;

        const value = search.toLowerCase();

        return employees.filter(employee =>

            employee.user?.name?.toLowerCase().includes(value) ||

            employee.employee_number?.toLowerCase().includes(value) ||

            employee.department?.name?.toLowerCase().includes(value) ||

            employee.position?.name?.toLowerCase().includes(value)

        );

    }, [employees, search]);

    const paginated = useMemo(() => {

        const start = (page - 1) * perPage;

        return filtered.slice(start, start + perPage);

    }, [filtered, page]);

    if (loading) return <Loading />;

    return (

        <>

            <SearchBar

                value={search}

                onChange={setSearch}

                placeholder="Pesquisar funcionário..."

            />

            <div
                style={{
                    display: "flex",
                    gap: 10,
                    marginBottom: 20
                }}
            >

                <Button>

                    Exportar PDF

                </Button>

                <Button>

                    Exportar Excel

                </Button>

            </div>

            <Table

                columns={[

                    "Número",

                    "Nome",

                    "Departamento",

                    "Cargo",

                    "Estado"

                ]}

            >

                {

                    paginated.map(employee => (

                        <tr key={employee.id}>

                            <td>

                                {employee.employee_number}

                            </td>

                            <td>

                                {employee.user?.name}

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

                        </tr>

                    ))

                }

            </Table>

            <Pagination

                currentPage={page}

                totalPages={Math.ceil(filtered.length / perPage)}

                onPageChange={setPage}

            />

        </>

    );

}
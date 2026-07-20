import { useEffect, useMemo, useState } from "react";

import reportService from "../../../services/reportService";

import SearchBar from "../../../components/common/SearchBar/SearchBar";
import Pagination from "../../../components/common/Pagination/Pagination";
import Table from "../../../components/common/Table/Table";
import Loading from "../../../components/common/Loading/Loading";
import Button from "../../../components/common/Button/Button";

export default function StudentReport() {

    const [students, setStudents] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);

    const perPage = 10;

    useEffect(() => {

        loadStudents();

    }, []);

    async function loadStudents() {

        try {

            setLoading(true);

            const data = await reportService.students();

            setStudents(data);

        } finally {

            setLoading(false);

        }

    }

    const filtered = useMemo(() => {

        if (!search) return students;

        const value = search.toLowerCase();

        return students.filter(student =>

            student.user?.name?.toLowerCase().includes(value) ||

            student.student_number?.toLowerCase().includes(value) ||

            student.course?.name?.toLowerCase().includes(value)

        );

    }, [students, search]);

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

                placeholder="Pesquisar estudante..."

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

                    "Curso",

                    "Faculdade",

                    "Estado"

                ]}

            >

                {

                    paginated.map(student => (

                        <tr key={student.id}>

                            <td>

                                {student.student_number}

                            </td>

                            <td>

                                {student.user?.name}

                            </td>

                            <td>

                                {student.course?.name}

                            </td>

                            <td>

                                {student.course?.faculty?.name}

                            </td>

                            <td>

                                {student.user?.status}

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
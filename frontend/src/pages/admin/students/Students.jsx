import { useEffect, useMemo, useState } from "react";

import studentService from "../../../services/studentService";
import facultyService from "../../../services/facultyService";
import courseService from "../../../services/courseService";

import PageHeader from "../../../components/admin/PageHeader/PageHeader";
import Table from "../../../components/common/Table/Table";
import Button from "../../../components/common/Button/Button";
import SearchBar from "../../../components/common/SearchBar/SearchBar";
import Pagination from "../../../components/common/Pagination/Pagination";
import Loading from "../../../components/common/Loading/Loading";
import ConfirmDialog from "../../../components/common/ConfirmDialog/ConfirmDialog";

import StudentForm from "./StudentForm";

export default function Students() {

    const [students, setStudents] = useState([]);

    const [faculties, setFaculties] = useState([]);

    const [courses, setCourses] = useState([]);

    const [loading, setLoading] = useState(false);

    const [openForm, setOpenForm] = useState(false);

    const [selectedStudent, setSelectedStudent] = useState(null);

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);

    const [confirmOpen, setConfirmOpen] = useState(false);

    const [studentSelected, setStudentSelected] = useState(null);

    const [studentAction, setStudentAction] = useState("");

    const perPage = 10;

    useEffect(() => {

        loadData();

    }, []);

    async function loadData() {

        try {

            setLoading(true);

            const [

                studentsResponse,

                facultiesResponse,

                coursesResponse

            ] = await Promise.all([

                studentService.getAll(),

                facultyService.getAll(),

                courseService.getAll()

            ]);

            setStudents(studentsResponse.data ?? studentsResponse);

            setFaculties(facultiesResponse.data ?? facultiesResponse);

            setCourses(coursesResponse.data ?? coursesResponse);

        } catch (error) {

            console.error(error);

            alert("Erro ao carregar os dados.");

        } finally {

            setLoading(false);

        }

    }

    async function handleSave(data) {

        try {

            setLoading(true);

            if (selectedStudent) {

                await studentService.update(

                    selectedStudent.id,

                    data

                );

            } else {

                await studentService.create(data);

            }

            await loadData();

            setOpenForm(false);

            setSelectedStudent(null);

        } catch (error) {

    console.error(error.response.data);

    alert(JSON.stringify(error.response.data, null, 2));

} finally {

            setLoading(false);

        }

    }

    async function handleStatus() {

        try {

            setLoading(true);

            await studentService.changeStatus(

                studentSelected.id,

                studentAction === "activar"

                    ? "Activo"

                    : "Inactivo"

            );

            await loadData();

            setConfirmOpen(false);

            setStudentSelected(null);

            setStudentAction("");

        } catch (error) {

            console.error(error);

            alert("Erro ao actualizar o estado do estudante.");

        } finally {

            setLoading(false);

        }

    }

    const filteredStudents = useMemo(() => {

        return students.filter(student =>

            student.user?.name
                ?.toLowerCase()
                .includes(search.toLowerCase())

            ||

            student.student_number
                ?.toLowerCase()
                .includes(search.toLowerCase())

        );

    }, [students, search]);

    const totalPages = Math.ceil(

        filteredStudents.length / perPage

    );

    const paginatedStudents = useMemo(() => {

        const start = (page - 1) * perPage;

        return filteredStudents.slice(

            start,

            start + perPage

        );

    }, [

        filteredStudents,

        page

    ]);  
    return (

        <>

            <PageHeader

                title="Gestão de Estudantes"

                subtitle="Gerir estudantes registados."

                buttonText="Novo Estudante"

                onButtonClick={() => {

                    setSelectedStudent(null);

                    setOpenForm(true);

                }}

            />

            <SearchBar

                value={search}

                onChange={setSearch}

                placeholder="Pesquisar estudante..."

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

                            "Faculdade",

                            "Curso",

                            "Estado",

                            "Acções"

                        ]}

                    >

                        {

                            paginatedStudents.length === 0 ? (

                                <tr>

                                    <td

                                        colSpan={7}

                                        style={{

                                            textAlign: "center",

                                            padding: "30px"

                                        }}

                                    >

                                        Nenhum estudante encontrado.

                                    </td>

                                </tr>

                            ) : (

                                paginatedStudents.map((student) => (

                                    <tr key={student.id}>

                                        <td>

                                            {student.student_number}

                                        </td>

                                        <td>

                                            {student.user?.name}

                                        </td>

                                        <td>

                                            {student.user?.email}

                                        </td>

                                        <td>

                                            {

                                                student.course?.faculty?.abbreviation ||

                                                student.course?.faculty?.name

                                            }

                                        </td>

                                        <td>

                                            {student.course?.name}

                                        </td>

                                        <td>

                                            {student.user?.status}

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

                                                        setSelectedStudent(student);

                                                        setOpenForm(true);

                                                    }}

                                                >

                                                    Editar

                                                </Button>

                                                {
                                                  student.user?.status === "Activo" ? (

                                                      <Button
                                                          variant="danger"
                                                          onClick={() => {
                                                              setStudentAction("desactivar");
                                                              setStudentSelected(student);
                                                              setConfirmOpen(true);
                                                          }}
                                                      >
                                                          Desactivar
                                                      </Button>

                                                  ) : (

                                                      <Button
                                                          variant="success"
                                                          onClick={() => {
                                                              setStudentAction("activar");
                                                              setStudentSelected(student);
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

            <StudentForm

                open={openForm}

                student={selectedStudent}

                faculties={faculties}

                courses={courses}

                loading={loading}

                onClose={() => {

                    setOpenForm(false);

                    setSelectedStudent(null);

                }}

                onSubmit={handleSave}

            />

            <ConfirmDialog

                open={confirmOpen}

                title={

                    studentAction === "activar"

                        ? "Activar estudante"

                        : "Desactivar estudante"

                }

                message={

                    studentAction === "activar"

                        ? "Pretende realmente activar este estudante?"

                        : "Pretende realmente desactivar este estudante?"

                }

                onConfirm={handleStatus}

                onCancel={() => {

                    setConfirmOpen(false);

                    setStudentSelected(null);

                    setStudentAction("");

                }}

            />

        </>

    );

}
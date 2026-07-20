import { useEffect, useMemo, useState } from "react";

import reportService from "../../../services/reportService";

import SearchBar from "../../../components/common/SearchBar/SearchBar";
import Pagination from "../../../components/common/Pagination/Pagination";
import Table from "../../../components/common/Table/Table";
import Loading from "../../../components/common/Loading/Loading";
import Button from "../../../components/common/Button/Button";

export default function DocumentRequestReport() {

    const [requests, setRequests] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);

    const perPage = 10;

    useEffect(() => {

        loadRequests();

    }, []);

    async function loadRequests() {

        try {

            setLoading(true);

            const data = await reportService.documentRequests();

            setRequests(data);

        } finally {

            setLoading(false);

        }

    }

    const filtered = useMemo(() => {

        if (!search) return requests;

        const value = search.toLowerCase();

        return requests.filter(request =>

            request.reference?.toLowerCase().includes(value) ||

            request.student?.user?.name?.toLowerCase().includes(value) ||

            request.document_type?.name?.toLowerCase().includes(value) ||

            request.status?.toLowerCase().includes(value)

        );

    }, [requests, search]);

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

                placeholder="Pesquisar pedido..."

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

                    "Referência",

                    "Estudante",

                    "Documento",

                    "Estado",

                    "Data"

                ]}

            >

                {

                    paginated.map(request => (

                        <tr key={request.id}>

                            <td>

                                {request.reference}

                            </td>

                            <td>

                                {request.student?.user?.name}

                            </td>

                            <td>

                                {request.document_type?.name}

                            </td>

                            <td>

                                {request.status}

                            </td>

                            <td>

                                {

                                    request.requested_at

                                        ?

                                        new Date(

                                            request.requested_at

                                        ).toLocaleDateString("pt-PT")

                                        :

                                        "-"

                                }

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
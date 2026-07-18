import { useEffect, useMemo, useState } from "react";

import PageHeader from "../../../components/admin/PageHeader/PageHeader";
import SearchBar from "../../../components/common/SearchBar/SearchBar";
import Table from "../../../components/common/Table/Table";
import Pagination from "../../../components/common/Pagination/Pagination";
import Button from "../../../components/common/Button/Button";
import Loading from "../../../components/common/Loading/Loading";

import documentRequestService from "../../../services/documentRequestService";

import DocumentRequestForm from "./DocumentRequestForm";
import DocumentRequestDetails from "./DocumentRequestDetails";

export default function DocumentRequests() {

    const [requests, setRequests] = useState([]);

    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);

    const perPage = 10;

    const [openForm, setOpenForm] = useState(false);

    const [openDetails, setOpenDetails] = useState(false);

    const [selectedRequest, setSelectedRequest] = useState(null);

    useEffect(() => {

        loadRequests();

    }, []);

    async function loadRequests() {

        try {

            setLoading(true);

            const response = await documentRequestService.getAll();

            setRequests(response.data.data || []);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    const filteredRequests = useMemo(() => {

        if (!search) return requests;

        return requests.filter(request => {

            const value = search.toLowerCase();

            return (

                request.reference?.toLowerCase().includes(value) ||

                request.student?.name?.toLowerCase().includes(value) ||

                request.student?.student_number?.toLowerCase().includes(value) ||

                request.document_type?.name?.toLowerCase().includes(value) ||

                request.status?.toLowerCase().includes(value)

            );

        });

    }, [requests, search]);

    const totalPages = Math.ceil(filteredRequests.length / perPage);

    const paginatedRequests = useMemo(() => {

        const start = (page - 1) * perPage;

        return filteredRequests.slice(

            start,

            start + perPage

        );

    }, [

        filteredRequests,

        page

    ]);

    if (loading) {

        return <Loading />;

    }

    return (

        <>

            <PageHeader

                title="Pedidos de Documentos"

                subtitle="Gerir pedidos de documentos académicos."

                buttonText="Novo Pedido"

                onButtonClick={() => {

                    setSelectedRequest(null);

                    setOpenForm(true);

                }}

            />

            <SearchBar

                value={search}

                onChange={setSearch}

                placeholder="Pesquisar pedido..."

            />

            <Table

                columns={[

                    "Referência",

                    "Estudante",

                    "Documento",

                    "Estado",

                    "Data",

                    "Acções"

                ]}

                data={paginatedRequests}

                renderRow={(request) => (

                    <tr key={request.id}>

                        <td>{request.reference}</td>

                        <td>{request.student?.name}</td>

                        <td>{request.document_type?.name}</td>

                        <td>{request.status}</td>

                        <td>{request.requested_at}</td>

                        <td>

                            <Button

                                variant="secondary"

                                onClick={() => {

                                    setSelectedRequest(request);

                                    setOpenDetails(true);

                                }}

                            >

                                Ver

                            </Button>

                            <Button

                                onClick={() => {

                                    setSelectedRequest(request);

                                    setOpenForm(true);

                                }}

                            >

                                Editar

                            </Button>

                        </td>

                    </tr>

                )}

            />

            <Pagination

                currentPage={page}

                totalPages={totalPages}

                onPageChange={setPage}

            />

            <DocumentRequestForm

                open={openForm}

                onClose={() => {

                    setOpenForm(false);

                    setSelectedRequest(null);

                }}

                request={selectedRequest}

                onSaved={loadRequests}

            />

            <DocumentRequestDetails

                open={openDetails}

                onClose={() => {

                    setOpenDetails(false);

                    setSelectedRequest(null);

                }}

                request={selectedRequest}

            />

        </>

    );

}
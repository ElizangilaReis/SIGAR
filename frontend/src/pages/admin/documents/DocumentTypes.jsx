import { useEffect, useMemo, useState } from "react";

import documentTypeService from "../../../services/documentTypeService";

import PageHeader from "../../../components/admin/PageHeader/PageHeader";
import Table from "../../../components/common/Table/Table";
import Button from "../../../components/common/Button/Button";
import SearchBar from "../../../components/common/SearchBar/SearchBar";
import Pagination from "../../../components/common/Pagination/Pagination";
import Loading from "../../../components/common/Loading/Loading";
import ConfirmDialog from "../../../components/common/ConfirmDialog/ConfirmDialog";

import DocumentTypeForm from "./DocumentTypeForm";

export default function DocumentTypes() {

    const [documentTypes, setDocumentTypes] = useState([]);

    const [loading, setLoading] = useState(false);

    const [openForm, setOpenForm] = useState(false);

    const [selectedDocument, setSelectedDocument] = useState(null);

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);

    const [confirmOpen, setConfirmOpen] = useState(false);

    const [documentDelete, setDocumentDelete] = useState(null);

    const perPage = 10;

    useEffect(() => {

        loadData();

    }, []);

    async function loadData() {

        try {

            setLoading(true);

            const documentTypes = await documentTypeService.getAll();

            setDocumentTypes(documentTypes);

        } catch (error) {

            console.error(error.response?.data || error);

            alert("Erro ao carregar documentos.");

        } finally {

            setLoading(false);

        }

    }

    async function handleSave(data) {

        try {

            setLoading(true);

            if (selectedDocument) {

                await documentTypeService.update(

                    selectedDocument.id,

                    data

                );

            } else {

                await documentTypeService.create(data);

            }

            await loadData();

            setOpenForm(false);

            setSelectedDocument(null);

        } catch (error) {

            console.error(error.response?.data || error);

            alert("Erro ao guardar documento.");

        } finally {

            setLoading(false);

        }

    }

    async function handleChangeStatus(document, active) {

        if (!document) return;

        try {

            setLoading(true);

            await documentTypeService.changeStatus(

                document.id,

                active

            );

            await loadData();

            setConfirmOpen(false);

            setDocumentDelete(null);

        } catch (error) {

            console.error(error.response?.data || error);

            alert("Erro ao alterar estado.");

        } finally {

            setLoading(false);

        }

    }

    const filteredDocuments = useMemo(() => {

        return documentTypes.filter(document =>

            document.name?.toLowerCase().includes(search.toLowerCase())

            ||

            document.code?.toLowerCase().includes(search.toLowerCase())

        );

    }, [

        documentTypes,

        search

    ]);

    const totalPages = Math.ceil(

        filteredDocuments.length / perPage

    );

    const paginatedDocuments = useMemo(() => {

        const start = (page - 1) * perPage;

        return filteredDocuments.slice(

            start,

            start + perPage

        );

    }, [

        filteredDocuments,

        page

    ]);

    if (loading) {

        return <Loading />;

    }

    return (

        <>

            <PageHeader

                title="Tipos de Documentos"

                subtitle="Gerir documentos disponíveis."

                buttonText="Novo Documento"

                onButtonClick={() => {

                    setSelectedDocument(null);

                    setOpenForm(true);

                }}

            />

            <SearchBar

                value={search}

                onChange={setSearch}

                placeholder="Pesquisar documento..."

            />

            <Table

                columns={[

                    "Documento",

                    "Código",

                    "Preço",

                    "Dias",

                    "Estado",

                    "Acções"

                ]}

            >

                {

                    paginatedDocuments.map(document => (

                        <tr key={document.id}>

                            <td>{document.name}</td>

                            <td>{document.code}</td>

                            <td>{document.price} Kz</td>

                            <td>{document.processing_days}</td>

                            <td>

                                {

                                    document.active

                                        ? "Activo"

                                        : "Inactivo"

                                }

                            </td>

                            <td>

                                <Button

                                    variant="secondary"

                                    onClick={() => {

                                        setSelectedDocument(document);

                                        setOpenForm(true);

                                    }}

                                >

                                    Editar

                                </Button>

                                <Button

                                    variant={

                                        document.active

                                            ? "danger"

                                            : "success"

                                    }

                                    onClick={() => {

                                        if (document.active) {

                                            setDocumentDelete(document);

                                            setConfirmOpen(true);

                                        } else {

                                            handleChangeStatus(

                                                document,

                                                true

                                            );

                                        }

                                    }}

                                >

                                    {

                                        document.active

                                            ? "Desactivar"

                                            : "Activar"

                                    }

                                </Button>

                            </td>

                        </tr>

                    ))

                }

            </Table>

            <Pagination

                currentPage={page}

                totalPages={totalPages}

                onPageChange={setPage}

            />

            <DocumentTypeForm

                open={openForm}

                onClose={() => {

                    setOpenForm(false);

                    setSelectedDocument(null);

                }}

                onSubmit={handleSave}

                document={selectedDocument}

                loading={loading}

            />

            <ConfirmDialog

                open={confirmOpen}

                onClose={() => {

                    setConfirmOpen(false);

                    setDocumentDelete(null);

                }}

                onConfirm={() => {

                    if (documentDelete) {

                        handleChangeStatus(

                            documentDelete,

                            false

                        );

                    }

                }}

                title="Desactivar Documento"

                message="Tem a certeza que pretende desactivar este tipo de documento?"

            />

        </>

    );

}
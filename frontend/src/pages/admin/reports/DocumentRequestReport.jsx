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

    const [exporting, setExporting] = useState(false);

    const perPage = 10;

    useEffect(() => {
        loadRequests();
    }, []);

    async function loadRequests() {
        try {
            setLoading(true);

            const data = await reportService.documentRequests();

            setRequests(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (error) {
            console.error(
                "Erro ao carregar relatório de pedidos:",
                error
            );

            setRequests([]);

        } finally {
            setLoading(false);
        }
    }

    const filtered = useMemo(() => {
        if (!search.trim()) {
            return requests;
        }

        const value = search
            .toLowerCase()
            .trim();

        return requests.filter((request) => {
            const reference =
                request.reference?.toLowerCase() || "";

            const studentName =
                request.student?.user?.name?.toLowerCase() || "";

            const documentName =
                request.documentType?.name?.toLowerCase() ||
                request.document_type?.name?.toLowerCase() ||
                "";

            const status =
                request.status?.toLowerCase() || "";

            return (
                reference.includes(value) ||
                studentName.includes(value) ||
                documentName.includes(value) ||
                status.includes(value)
            );
        });

    }, [requests, search]);

    useEffect(() => {
        setPage(1);
    }, [search]);

    const totalPages =
        Math.max(
            1,
            Math.ceil(filtered.length / perPage)
        );

    const paginated = useMemo(() => {
        const start =
            (page - 1) * perPage;

        return filtered.slice(
            start,
            start + perPage
        );

    }, [filtered, page]);

    async function handleExportPdf() {
        try {
            setExporting(true);

            await reportService.exportRequestsPdf();

        } catch (error) {
            console.error(
                "Erro ao exportar pedidos em PDF:",
                error
            );

        } finally {
            setExporting(false);
        }
    }

    async function handleExportExcel() {
        try {
            setExporting(true);

            await reportService.exportRequestsExcel();

        } catch (error) {
            console.error(
                "Erro ao exportar pedidos em Excel:",
                error
            );

        } finally {
            setExporting(false);
        }
    }

    if (loading) {
        return <Loading />;
    }

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
                    marginBottom: 20,
                    flexWrap: "wrap"
                }}
            >
                <Button
                    variant="secondary"
                    onClick={handleExportPdf}
                    disabled={exporting}
                >
                    {exporting
                        ? "A exportar..."
                        : "Exportar PDF"}
                </Button>

                <Button
                    variant="secondary"
                    onClick={handleExportExcel}
                    disabled={exporting}
                >
                    {exporting
                        ? "A exportar..."
                        : "Exportar Excel"}
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
                {paginated.map((request) => (
                    <tr key={request.id}>
                        <td>
                            {request.reference || "-"}
                        </td>

                        <td>
                            {request.student?.user?.name || "-"}
                        </td>

                        <td>
                            {
                                request.documentType?.name ||
                                request.document_type?.name ||
                                "-"
                            }
                        </td>

                        <td>
                            {request.status || "-"}
                        </td>

                        <td>
                            {request.requested_at
                                ? new Date(
                                    request.requested_at
                                ).toLocaleDateString("pt-PT")
                                : "-"}
                        </td>
                    </tr>
                ))}
            </Table>

            {filtered.length === 0 && (
                <p
                    style={{
                        textAlign: "center",
                        marginTop: 20,
                        color: "#64748b"
                    }}
                >
                    Nenhum pedido encontrado.
                </p>
            )}

            {filtered.length > 0 && (
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                />
            )}
        </>
    );
}
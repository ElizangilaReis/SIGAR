import { useEffect, useMemo, useState } from "react";

import paymentService from "../../../services/paymentService";

import PageHeader from "../../../components/admin/PageHeader/PageHeader";
import SearchBar from "../../../components/common/SearchBar/SearchBar";
import Table from "../../../components/common/Table/Table";
import Pagination from "../../../components/common/Pagination/Pagination";
import Loading from "../../../components/common/Loading/Loading";
import Button from "../../../components/common/Button/Button";

import PaymentForm from "./PaymentForm";
import PaymentDetails from "./PaymentDetails";

export default function Payments() {
    const [payments, setPayments] = useState([]);

    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);

    const perPage = 10;

    const [openForm, setOpenForm] = useState(false);

    const [openDetails, setOpenDetails] = useState(false);

    const [selectedPayment, setSelectedPayment] = useState(null);

    useEffect(() => {
        loadPayments();
    }, []);

    async function loadPayments() {
        try {
            setLoading(true);

            const response = await paymentService.getAll();

            let data = [];

            if (Array.isArray(response)) {
                data = response;
            } else if (Array.isArray(response?.data)) {
                data = response.data;
            } else if (Array.isArray(response?.data?.data)) {
                data = response.data.data;
            }

            console.log("PAGAMENTOS RECEBIDOS:", data);

            setPayments(data);
        } catch (error) {
            console.error(
                "Erro ao carregar pagamentos:",
                error.response?.data || error
            );

            setPayments([]);
        } finally {
            setLoading(false);
        }
    }

    function formatAmount(amount) {
        if (
            amount === null ||
            amount === undefined ||
            amount === ""
        ) {
            return "-";
        }

        const normalizedAmount =
            typeof amount === "string"
                ? amount.replace(",", ".").trim()
                : amount;

        const value = Number(normalizedAmount);

        if (!Number.isFinite(value)) {
            return "-";
        }

        return `${value.toLocaleString("pt-PT", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        })} Kz`;
    }

    function formatDate(date) {
        if (!date) {
            return "-";
        }

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "-";
        }

        return parsedDate.toLocaleDateString("pt-PT");
    }

    const filteredPayments = useMemo(() => {
        if (!search.trim()) {
            return payments;
        }

        const value = search.toLowerCase().trim();

        return payments.filter((payment) => {
            return (
                payment.reference
                    ?.toLowerCase()
                    .includes(value) ||

                payment.student?.user?.name
                    ?.toLowerCase()
                    .includes(value) ||

                payment.status
                    ?.toLowerCase()
                    .includes(value)
            );
        });
    }, [payments, search]);

    const paginatedPayments = useMemo(() => {
        const start = (page - 1) * perPage;

        return filteredPayments.slice(
            start,
            start + perPage
        );
    }, [filteredPayments, page]);

    useEffect(() => {
        const totalPages = Math.ceil(
            filteredPayments.length / perPage
        );

        if (page > totalPages && totalPages > 0) {
            setPage(1);
        }

        if (totalPages === 0 && page !== 1) {
            setPage(1);
        }
    }, [filteredPayments, page]);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <PageHeader
                title="Pagamentos"
                subtitle="Gestão dos pagamentos."
                buttonText="Novo Pagamento"
                onButtonClick={() => {
                    setSelectedPayment(null);
                    setOpenForm(true);
                }}
            />

            <SearchBar
                value={search}
                onChange={(value) => {
                    setSearch(value);
                    setPage(1);
                }}
                placeholder="Pesquisar..."
            />

            <Table
                columns={[
                    "Referência",
                    "Estudante",
                    "Valor",
                    "Estado",
                    "Data",
                    "Acções"
                ]}
            >
                {paginatedPayments.length === 0 ? (
                    <tr>
                        <td
                            colSpan={6}
                            style={{
                                textAlign: "center",
                                padding: "30px"
                            }}
                        >
                            Nenhum pagamento encontrado.
                        </td>
                    </tr>
                ) : (
                    paginatedPayments.map((payment) => (
                        <tr key={payment.id}>
                            <td>
                                {payment.reference || "-"}
                            </td>

                            <td>
                                {payment.student?.user?.name || "-"}
                            </td>

                            <td>
                                {formatAmount(payment.amount)}
                            </td>

                            <td>
                                {payment.status || "-"}
                            </td>

                            <td>
                                {formatDate(
                                    payment.payment_date ||
                                    payment.created_at
                                )}
                            </td>

                            <td>
                                <Button
                                    variant="secondary"
                                    onClick={() => {
                                        setSelectedPayment(payment);
                                        setOpenDetails(true);
                                    }}
                                >
                                    Ver
                                </Button>
                            </td>
                        </tr>
                    ))
                )}
            </Table>

            <Pagination
                currentPage={page}
                totalPages={Math.ceil(
                    filteredPayments.length / perPage
                )}
                onPageChange={setPage}
            />

            <PaymentForm
                open={openForm}
                onClose={() => {
                    setOpenForm(false);
                }}
                onSaved={() => {
                    setOpenForm(false);
                    loadPayments();
                }}
            />

            <PaymentDetails
                open={openDetails}
                payment={selectedPayment}
                onClose={() => {
                    setOpenDetails(false);
                    setSelectedPayment(null);
                }}
            />
        </>
    );
}
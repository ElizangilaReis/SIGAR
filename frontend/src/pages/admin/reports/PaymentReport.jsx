import { useEffect, useMemo, useState } from "react";

import reportService from "../../../services/reportService";

import SearchBar from "../../../components/common/SearchBar/SearchBar";
import Pagination from "../../../components/common/Pagination/Pagination";
import Table from "../../../components/common/Table/Table";
import Loading from "../../../components/common/Loading/Loading";
import Button from "../../../components/common/Button/Button";

export default function PaymentReport() {

    const [payments, setPayments] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);

    const perPage = 10;

    useEffect(() => {

        loadPayments();

    }, []);

    async function loadPayments() {

        try {

            setLoading(true);

            const data = await reportService.payments();

            setPayments(data);

        } finally {

            setLoading(false);

        }

    }

    const filtered = useMemo(() => {

        if (!search) return payments;

        const value = search.toLowerCase();

        return payments.filter(payment =>

            payment.reference?.toLowerCase().includes(value) ||

            payment.student?.user?.name?.toLowerCase().includes(value) ||

            payment.document_request?.document_type?.name?.toLowerCase().includes(value) ||

            payment.status?.toLowerCase().includes(value)

        );

    }, [payments, search]);

    const paginated = useMemo(() => {

        const start = (page - 1) * perPage;

        return filtered.slice(start, start + perPage);

    }, [filtered, page]);

    const totalReceived = payments

        .filter(payment => payment.status === "Pago")

        .reduce((sum, payment) => sum + Number(payment.amount), 0);

    const totalPending = payments

        .filter(payment => payment.status === "Pendente")

        .reduce((sum, payment) => sum + Number(payment.amount), 0);

    const totalCancelled = payments

        .filter(payment => payment.status === "Cancelado")

        .reduce((sum, payment) => sum + Number(payment.amount), 0);

    if (loading) return <Loading />;

    return (

        <>

            <div

                className="report-cards"

                style={{ marginBottom: 25 }}

            >

                <div className="report-card success">

                    <span>Total Recebido</span>

                    <h2>

                        {totalReceived.toLocaleString()} Kz

                    </h2>

                </div>

                <div className="report-card warning">

                    <span>Total Pendente</span>

                    <h2>

                        {totalPending.toLocaleString()} Kz

                    </h2>

                </div>

                <div className="report-card">

                    <span>Total Cancelado</span>

                    <h2>

                        {totalCancelled.toLocaleString()} Kz

                    </h2>

                </div>

            </div>

            <SearchBar

                value={search}

                onChange={setSearch}

                placeholder="Pesquisar pagamento..."

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

                    "Valor",

                    "Estado",

                    "Data"

                ]}

            >

                {

                    paginated.map(payment => (

                        <tr key={payment.id}>

                            <td>

                                {payment.reference}

                            </td>

                            <td>

                                {payment.student?.user?.name}

                            </td>

                            <td>

                                {payment.document_request?.document_type?.name}

                            </td>

                            <td>

                                {payment.amount} Kz

                            </td>

                            <td>

                                {payment.status}

                            </td>

                            <td>

                                {

                                    payment.payment_date

                                        ?

                                        new Date(

                                            payment.payment_date

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
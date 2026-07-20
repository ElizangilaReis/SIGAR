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

          const payments = await paymentService.getAll();

          setPayments(payments);

      } catch (error) {

          console.error(error.response?.data || error);

          setPayments([]);

      } finally {

          setLoading(false);

      }

  }

    const filteredPayments = useMemo(() => {

        if (!search) return payments;

        const value = search.toLowerCase();

        return payments.filter(payment =>

            payment.reference?.toLowerCase().includes(value)

            ||

            payment.student?.user?.name?.toLowerCase().includes(value)

            ||

            payment.status?.toLowerCase().includes(value)

        );

    }, [payments, search]);

    const paginatedPayments = useMemo(() => {

        const start = (page - 1) * perPage;

        return filteredPayments.slice(start, start + perPage);

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

                onChange={setSearch}

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

                {

                    paginatedPayments.map(payment => (

                        <tr key={payment.id}>

                            <td>{payment.reference}</td>

                            <td>{payment.student?.user?.name}</td>

                            <td>{payment.amount} Kz</td>

                            <td>{payment.status}</td>

                            <td>

                                {

                                    payment.created_at

                                        ?

                                        new Date(payment.created_at)

                                            .toLocaleDateString("pt-PT")

                                        :

                                        "-"

                                }

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

                }

            </Table>

            <Pagination

                currentPage={page}

                totalPages={Math.ceil(filteredPayments.length / perPage)}

                onPageChange={setPage}

            />

            <PaymentForm

                open={openForm}

                onClose={() => setOpenForm(false)}

                onSaved={loadPayments}

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
import { useEffect, useState } from "react";

import paymentService from "../../../services/paymentService";

import Loading from "../../../components/common/Loading/Loading";
import SearchBar from "../../../components/common/SearchBar/SearchBar";
import Table from "../../../components/common/Table/Table";
import Badge from "../../../components/common/Badge/Badge";
import Button from "../../../components/common/Button/Button";

export default function Payments() {

    const [loading, setLoading] = useState(true);

    const [payments, setPayments] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadPayments();

    }, []);

    async function loadPayments() {

        try {

            setLoading(true);

            const data = await paymentService.employeePayments();

            setPayments(data);

        } finally {

            setLoading(false);

        }

    }

    async function confirmPayment(payment) {

        await paymentService.changeStatus(payment.id, "Pago");

        loadPayments();

    }

    if (loading) {

        return <Loading />;

    }

    const filtered = payments.filter(payment =>

        payment.reference.toLowerCase().includes(search.toLowerCase()) ||

        payment.student?.user?.name?.toLowerCase().includes(search.toLowerCase())

    );

    return (

        <>

            <div className="dashboard-header">

                <h1>Pagamentos</h1>

                <p>Confirmação de pagamentos dos estudantes.</p>

            </div>

            <SearchBar

                placeholder="Pesquisar pagamento..."

                value={search}

                onChange={e => setSearch(e.target.value)}

            />

            <Table

                columns={[

                    "Referência",

                    "Estudante",

                    "Valor",

                    "Estado",

                    "Ações"

                ]}

            >

                {filtered.map(payment => (

                    <tr key={payment.id}>

                        <td>{payment.reference}</td>

                        <td>{payment.student?.user?.name}</td>

                        <td>

                            {Number(payment.amount).toLocaleString("pt-PT")} Kz

                        </td>

                        <td>

                            <Badge status={payment.status} />

                        </td>

                        <td>

                            {payment.status === "Pendente" && (

                                <Button

                                    variant="success"

                                    onClick={() => confirmPayment(payment)}

                                >

                                    Confirmar
                                </Button>

                            )}

                        </td>

                    </tr>

                ))}

            </Table>

        </>

    );

}
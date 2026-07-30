import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import paymentService from "../../../services/paymentService";

import Loading from "../../../components/common/Loading/Loading";
import SearchBar from "../../../components/common/SearchBar/SearchBar";
import Table from "../../../components/common/Table/Table";
import Badge from "../../../components/common/Badge/Badge";

export default function MyPayments() {

    const location = useLocation();

    const newPayment = location.state;

    const [showNewPayment, setShowNewPayment] = useState(!!newPayment);

    const [loading, setLoading] = useState(true);

    const [payments, setPayments] = useState([]);

    const [search, setSearch] = useState("");

    const [selectedPayment, setSelectedPayment] = useState(null);

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {

        loadPayments();

    }, []);

    async function loadPayments() {

        try {

            setLoading(true);

            const data = await paymentService.myPayments();

            setPayments(data);

        } finally {

            setLoading(false);

        }

    }

    if (loading) {

        return <Loading />;

    }

    const filtered = payments.filter(payment =>

        payment.reference
            .toLowerCase()
            .includes(search.toLowerCase())

        ||

        payment.status
            .toLowerCase()
            .includes(search.toLowerCase())

    );

    return (

        <>

            <div className="dashboard-header">

                <h1>

                    Meus Pagamentos

                </h1>

                <p>

                    Consulte todos os pagamentos efectuados.

                </p>

            </div>

           {

                showNewPayment && newPayment &&

                    <div
                        style={{
                            background:"#ecfdf5",
                            border:"1px solid #22c55e",
                            borderRadius:"8px",
                            padding:"20px",
                            marginBottom:"20px",
                            position:"relative"
                        }}
                    >

                    <h3>

                        ✅ Pedido registado com sucesso

                    </h3>

                    <button
                        onClick={() => setShowNewPayment(false)}
                        style={{
                            position:"absolute",
                            right:"15px",
                            top:"15px",
                            border:"none",
                            background:"transparent",
                            cursor:"pointer",
                            fontSize:"18px",
                            fontWeight:"bold"
                        }}
                    >
                        ✕
                    </button>

                    <p>

                        Utilize a referência abaixo para efectuar o pagamento.

                    </p>

                    <hr />

                    <p>

                        <strong>Referência:</strong>{" "}

                        {newPayment.reference}

                    </p>

                    <p>

                        <strong>Valor:</strong>{" "}

                        {newPayment.amount} Kz

                    </p>

                    <p>

                        <strong>Método:</strong>{" "}

                        {newPayment.payment_method}

                    </p>

                    <p>

                        <strong>Validade:</strong>{" "}

                        {

                            newPayment.expiry_date

                                ?

                                new Date(
                                    newPayment.expiry_date
                                ).toLocaleDateString("pt-PT")

                                :

                                "-"

                        }

                    </p>

                    <button

                        onClick={() => {

                            navigator.clipboard.writeText(

                                newPayment.reference

                            );

                            alert("Referência copiada.");

                        }}

                    >

                        Copiar Referência

                    </button>

                </div>

            }

            <SearchBar

                placeholder="Pesquisar..."

                value={search}

                onChange={e => setSearch(e.target.value)}

            />

            <Table>

                <thead>

                    <tr>

                        <th>Referência</th>

                        <th>Valor</th>

                        <th>Estado</th>

                        <th>Data</th>

                        <th></th>

                    </tr>

                </thead>

                <tbody>

                    {

                        filtered.length > 0

                            ?

                            filtered.map(payment => (

                                <tr

                                    key={payment.id}

                                    style={{
                                        cursor: payment.status === "Pendente"
                                            ? "pointer"
                                            : "default"
                                    }}

                                    onClick={() => {

                                        if (payment.status === "Pendente") {

                                            setSelectedPayment(payment);

                                            setShowModal(true);

                                        }

                                    }}

                                >

                                    <td>

                                        {payment.reference}

                                    </td>

                                    <td>

                                        {payment.amount} Kz

                                    </td>

                                    <td>

                                        <Badge>

                                            {payment.status}

                                        </Badge>

                                    </td>

                                    <td>

                                        {

                                            payment.created_at

                                                ?

                                                new Date(
                                                    payment.created_at
                                                ).toLocaleDateString("pt-PT")

                                                :

                                                "-"

                                        }

                                    </td>

                                    <td>

                                        {

                                            payment.status === "Pago"

                                                &&

                                                <button>

                                                    Recibo

                                                </button>

                                        }

                                    </td>

                                </tr>

                            ))

                            :

                            <tr>

                                <td colSpan="5">

                                    Nenhum pagamento encontrado.

                                </td>

                            </tr>

                    }

                </tbody>

            </Table>

            {

                showModal && selectedPayment && (

                    <div className="modal-overlay">

                        <div className="modal">

                            <h2>

                                Dados para Pagamento

                            </h2>

                            <hr />

                            <p>

                                <strong>Referência:</strong>{" "}

                                {selectedPayment.reference}

                            </p>

                            <p>

                                <strong>Valor:</strong>{" "}

                                {selectedPayment.amount} Kz

                            </p>

                            <p>

                                <strong>Método:</strong>{" "}

                                {selectedPayment.payment_method}

                            </p>

                            <p>

                                <strong>Estado:</strong>{" "}

                                <Badge status={selectedPayment.status} />
                            </p>

                            <p>

                                <strong>Validade:</strong>{" "}

                                {

                                    selectedPayment.expiry_date

                                        ?

                                        new Date(
                                            selectedPayment.expiry_date
                                        ).toLocaleDateString("pt-PT")

                                        :

                                        "-"

                                }

                            </p>

                            <div
                                style={{
                                    display: "flex",
                                    gap: "10px",
                                    marginTop: "20px"
                                }}
                            >

                                <button

                                    onClick={() => {

                                        navigator.clipboard.writeText(

                                            selectedPayment.reference

                                        );

                                        alert("Referência copiada.");

                                    }}

                                >

                                    Copiar Referência

                                </button>

                                <button

                                    onClick={() => {

                                        setShowModal(false);

                                        setSelectedPayment(null);

                                    }}

                                >

                                    Fechar

                                </button>

                            </div>

                        </div>

                    </div>

                )

            }

        </>

    );

}
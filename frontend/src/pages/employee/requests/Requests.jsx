import { useEffect, useState } from "react";

import employeeRequestService from "../../../services/employeeRequestService";

import Loading from "../../../components/common/Loading/Loading";
import SearchBar from "../../../components/common/SearchBar/SearchBar";
import Table from "../../../components/common/Table/Table";
import Badge from "../../../components/common/Badge/Badge";
import Button from "../../../components/common/Button/Button";
import Modal from "../../../components/common/Modal/Modal";
import Select from "../../../components/common/Select/Select";
import TextArea from "../../../components/common/TextArea/TextArea";

export default function Requests() {

    const [loading, setLoading] = useState(true);

    const [requests, setRequests] = useState([]);

    const [search, setSearch] = useState("");

    const [selectedRequest, setSelectedRequest] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const [status, setStatus] = useState("Pendente");

    const [observations, setObservations] = useState("");

    useEffect(() => {

        loadRequests();

    }, []);

    async function loadRequests() {

        try {

            setLoading(true);

            const data = await employeeRequestService.getAll();

            setRequests(data);

        } finally {

            setLoading(false);

        }

    }

    function handleView(request) {

        setSelectedRequest(request);

        setStatus(request.status);

        setObservations(request.observations || "");

        setShowModal(true);

    }

    async function handleSave() {

        try {

            await employeeRequestService.update(

                selectedRequest.id,

                {

                    document_type_id: selectedRequest.document_type.id,

                    status,

                    observations

                }

            );

            setShowModal(false);

            loadRequests();

        } catch (error) {

            alert("Erro ao actualizar o pedido.");

        }

    }

    if (loading) {

        return <Loading />;

    }

    const filtered = requests.filter(request =>

        request.reference.toLowerCase().includes(search.toLowerCase()) ||

        request.student?.user?.name?.toLowerCase().includes(search.toLowerCase()) ||

        request.document_type?.name?.toLowerCase().includes(search.toLowerCase())

    );

    return (

        <>

            <div className="dashboard-header">

                <h1>Pedidos de Documentos</h1>

                <p>Consulte e processe os pedidos registados.</p>

            </div>

            <SearchBar

                placeholder="Pesquisar..."

                value={search}

                onChange={e => setSearch(e.target.value)}

            />

            <Table

                columns={[

                    "Referência",

                    "Estudante",

                    "Documento",

                    "Estado",

                    "Data",

                    "Ações"

                ]}

            >

                {

                    filtered.length > 0

                        ?

                        filtered.map(request => (

                            <tr key={request.id}>

                                <td>{request.reference}</td>

                                <td>{request.student?.user?.name}</td>

                                <td>{request.document_type?.name}</td>

                                <td>

                                    <Badge status={request.status} />

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

                                <td>

                                    <Button

                                        variant="primary"

                                        onClick={() => handleView(request)}

                                    >

                                        Processar

                                    </Button>

                                </td>

                            </tr>

                        ))

                        :

                        <tr>

                            <td colSpan="6">

                                Nenhum pedido encontrado.

                            </td>

                        </tr>

                }

            </Table>

            {

                showModal && selectedRequest && (

                    <Modal
                        open={showModal}
                        title="Processar Pedido"
                        onClose={() => setShowModal(false)}
                    >

                        <p>

                            <strong>Referência:</strong> {selectedRequest.reference}

                        </p>

                        <p>

                            <strong>Estudante:</strong> {selectedRequest.student?.user?.name}

                        </p>

                        <p>

                            <strong>Documento:</strong> {selectedRequest.document_type?.name}

                        </p>

                        <Select

                            label="Estado do Pedido"

                            value={status}

                            onChange={e => setStatus(e.target.value)}

                            options={[

                                { value: "Pendente", label: "Pendente" },

                                { value: "Em Processamento", label: "Em Processamento" },

                                { value: "Pronto", label: "Pronto" },

                                { value: "Entregue", label: "Entregue" },

                                { value: "Cancelado", label: "Cancelado" }

                            ]}

                        />

                        <TextArea

                            label="Observações"

                            value={observations}

                            onChange={e => setObservations(e.target.value)}

                            rows={4}

                        />

                        <div

                            style={{

                                display: "flex",

                                justifyContent: "flex-end",

                                gap: 12,

                                marginTop: 20

                            }}

                        >

                            <Button

                                variant="secondary"

                                onClick={() => setShowModal(false)}

                            >

                                Cancelar

                            </Button>

                            <Button

                                variant="primary"

                                onClick={handleSave}

                            >

                                Guardar Alterações

                            </Button>

                        </div>

                    </Modal>

                )

            }

        </>

    );

}
import { useEffect, useState } from "react";

import employeeRequestService from "../../../services/employeeRequestService";

import Loading from "../../../components/common/Loading/Loading";
import SearchBar from "../../../components/common/SearchBar/SearchBar";
import Table from "../../../components/common/Table/Table";
import Badge from "../../../components/common/Badge/Badge";
import Button from "../../../components/common/Button/Button";

export default function ReadyDocuments() {

    const [loading, setLoading] = useState(true);

    const [documents, setDocuments] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadDocuments();

    }, []);

    async function loadDocuments() {

        try {

            setLoading(true);

            const data = await employeeRequestService.getReadyDocuments();

            setDocuments(data);

        } finally {

            setLoading(false);

        }

    }

   async function handleDeliver(document) {

        try {

            await employeeRequestService.update(

                document.id,

                {

                    document_type_id: document.document_type.id,

                    status: "Entregue",

                    observations: document.observations || ""

                }

            );

            await loadDocuments();

        } catch (error) {

            console.error(error.response?.data);

            alert("Erro ao entregar documento.");

        }

    }

    if (loading) {

        return <Loading />;

    }

    const filtered = documents.filter(document =>

        document.reference.toLowerCase().includes(search.toLowerCase()) ||

        document.student?.user?.name?.toLowerCase().includes(search.toLowerCase()) ||

        document.document_type?.name?.toLowerCase().includes(search.toLowerCase())

    );

    return (

        <>

            <div className="dashboard-header">

                <h1>Documentos Prontos</h1>

                <p>Documentos disponíveis para entrega aos estudantes.</p>

            </div>

            <SearchBar

                placeholder="Pesquisar documento..."

                value={search}

                onChange={e => setSearch(e.target.value)}

            />

            <Table

                columns={[

                    "Referência",

                    "Estudante",

                    "Documento",

                    "Estado",

                    "Concluído em",

                    "Ações"

                ]}

            >

                {

                    filtered.length > 0

                        ?

                        filtered.map(document => (

                            <tr key={document.id}>

                                <td>{document.reference}</td>

                                <td>{document.student?.user?.name}</td>

                                <td>{document.document_type?.name}</td>

                                <td>

                                    <Badge status={document.status} />

                                </td>

                                <td>

                                    {

                                        document.completed_at

                                            ?

                                            new Date(

                                                document.completed_at

                                            ).toLocaleDateString("pt-PT")

                                            :

                                            "-"

                                    }

                                </td>

                                <td>

                                    <Button

                                        variant="success"

                                        onClick={() => handleDeliver(document)}

                                    >

                                        Entregar

                                    </Button>

                                </td>

                            </tr>

                        ))

                        :

                        <tr>

                            <td colSpan="6">

                                Nenhum documento pronto para entrega.

                            </td>

                        </tr>

                }

            </Table>

        </>

    );

}
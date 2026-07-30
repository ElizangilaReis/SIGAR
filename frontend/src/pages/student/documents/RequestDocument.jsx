import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import documentTypeService from "../../../services/documentTypeService";
import studentRequestService from "../../../services/studentRequestService";

import Loading from "../../../components/common/Loading/Loading";
import Select from "../../../components/common/Select/Select";
import TextArea from "../../../components/common/TextArea/TextArea";
import Button from "../../../components/common/Button/Button";

export default function RequestDocuments() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [documentTypes, setDocumentTypes] = useState([]);

    const [form, setForm] = useState({

        document_type_id: "",

        observations: ""

    });

    useEffect(() => {

        loadDocumentTypes();

    }, []);

    async function loadDocumentTypes() {

        try {

            setLoading(true);

            const data = await documentTypeService.getAll();

            setDocumentTypes(data);

        } finally {

            setLoading(false);

        }

    }

    function handleChange(e) {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            setSaving(true);

            const result = await studentRequestService.create(form);

            navigate(
                "/dashboard/payments",
                {
                    state: result.payment
                }
            );

        } catch (error) {

            alert(

                error.response?.data?.message ||

                "Erro ao efectuar o pedido."

            );

        } finally {

            setSaving(false);

        }

    }

    if (loading) {

        return <Loading />;

    }

    const selectedDocument = documentTypes.find(

        item => item.id == form.document_type_id

    );

    return (

        <>

            <div className="dashboard-header">

                <h1>

                    Novo Pedido

                </h1>

                <p>

                    Solicite um novo documento académico.

                </p>

            </div>

            <form
                className="settings-container"
                onSubmit={handleSubmit}
            >

                <div className="settings-card">

                    <Select

                        label="Tipo de Documento"

                        name="document_type_id"

                        value={form.document_type_id}

                        onChange={handleChange}

                        options={[

                            {

                                value: "",

                                label: "Seleccione..."

                            },

                            ...documentTypes.map(item => ({

                                value: item.id,

                                label: item.name

                            }))

                        ]}

                    />

                    {

                        selectedDocument &&

                        <>

                            <div
                                style={{
                                    marginTop: "20px"
                                }}
                            >

                                <p>

                                    <strong>Preço:</strong>{" "}

                                    {selectedDocument.price} Kz

                                </p>

                                <p>

                                    <strong>Prazo:</strong>{" "}

                                    {selectedDocument.processing_days} dias

                                </p>

                                {

                                    selectedDocument.description &&

                                    <p>

                                        <strong>Descrição:</strong>{" "}

                                        {selectedDocument.description}

                                    </p>

                                }

                            </div>

                        </>

                    }

                    <TextArea

                        label="Observações"

                        name="observations"

                        value={form.observations}

                        onChange={handleChange}

                        placeholder="Observações (opcional)"

                    />

                </div>

                <div className="settings-footer">

                    <Button

                        type="submit"

                        disabled={

                            saving ||

                            !form.document_type_id

                        }

                    >

                        {

                            saving

                                ?

                                "A processar..."

                                :

                                "Solicitar Documento"

                        }

                    </Button>

                </div>

            </form>

        </>

    );

}
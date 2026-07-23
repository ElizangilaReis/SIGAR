import { useEffect, useState } from "react";

import documentTypeService from "../../../services/documentTypeService";
import studentRequestService from "../../../services/studentRequestService";

import Loading from "../../../components/common/Loading/Loading";
import Button from "../../../components/common/Button/Button";
import Select from "../../../components/common/Select/Select";
import TextArea from "../../../components/common/TextArea/TextArea";

export default function RequestDocument(){

    const [loading,setLoading]=useState(true);

    const [saving,setSaving]=useState(false);

    const [types,setTypes]=useState([]);

    const [documentTypeId,setDocumentTypeId]=useState("");

    const [observations,setObservations]=useState("");

    useEffect(()=>{

        loadTypes();

    },[]);

    async function loadTypes(){

        try{

            setLoading(true);

            const data=await documentTypeService.active();

            setTypes(data);

        }finally{

            setLoading(false);

        }

    }

    const selectedDocument=types.find(

        item=>item.id==documentTypeId

    );

    async function handleSubmit(e){

        e.preventDefault();

        try{

            setSaving(true);

            await studentRequestService.create({

                document_type_id:documentTypeId,

                observations

            });

            alert("Pedido efectuado com sucesso.");

            setDocumentTypeId("");

            setObservations("");

        }catch(error){

            alert(

                error.response?.data?.message ||

                "Erro ao efectuar pedido."

            );

        }finally{

            setSaving(false);

        }

    }

    if(loading){

        return <Loading/>;

    }

    return(

        <div className="page">

            <div className="dashboard-header">

                <h1>

                    Solicitar Documento

                </h1>

                <p>

                    Escolha o documento pretendido.

                </p>

            </div>

            <form onSubmit={handleSubmit} className="card">

                <Select

                    label="Tipo de Documento"

                    value={documentTypeId}

                    onChange={e=>setDocumentTypeId(e.target.value)}

                >

                    <option value="">

                        Seleccione

                    </option>

                    {

                        types.map(type=>(

                            <option

                                key={type.id}

                                value={type.id}

                            >

                                {type.name}

                            </option>

                        ))

                    }

                </Select>

                {

                    selectedDocument && (

                        <div className="document-info">

                            <h3>

                                {selectedDocument.name}

                            </h3>

                            <p>

                                <strong>Preço:</strong>{" "}

                                {selectedDocument.price} Kz

                            </p>

                            <p>

                                <strong>Prazo:</strong>{" "}

                                {selectedDocument.delivery_days} dias úteis

                            </p>

                            <p>

                                {selectedDocument.description}

                            </p>

                        </div>

                    )

                }

                <TextArea

                    label="Observações"

                    value={observations}

                    onChange={e=>setObservations(e.target.value)}

                />

                <Button

                    type="submit"

                    disabled={saving || !documentTypeId}

                >

                    {

                        saving

                        ?

                        "A Processar..."

                        :

                        "Solicitar Documento"

                    }

                </Button>

            </form>

        </div>

    );

}
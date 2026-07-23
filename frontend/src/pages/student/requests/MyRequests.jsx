import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import studentRequestService from "../../../services/studentRequestService";

import Loading from "../../../components/common/Loading/Loading";
import SearchBar from "../../../components/common/SearchBar/SearchBar";
import Table from "../../../components/common/Table/Table";
import Badge from "../../../components/common/Badge/Badge";
import Button from "../../../components/common/Button/Button";

export default function MyRequests(){

    const navigate = useNavigate();

    const [loading,setLoading]=useState(true);

    const [requests,setRequests]=useState([]);

    const [search,setSearch]=useState("");

    useEffect(()=>{

        loadRequests();

    },[]);

    async function loadRequests(){

        try{

            setLoading(true);

            const data = await studentRequestService.getAll();

            setRequests(data);

        }finally{

            setLoading(false);

        }

    }

    if(loading){

        return <Loading/>;

    }

    const filtered = requests.filter(item =>

        item.reference.toLowerCase().includes(search.toLowerCase())

        ||

        item.document_type?.name
            .toLowerCase()
            .includes(search.toLowerCase())

    );

    return(

        <>

            <div
                className="dashboard-header"
                style={{
                    display:"flex",
                    justifyContent:"space-between",
                    alignItems:"center"
                }}
            >

                <div>

                    <h1>

                        Meus Pedidos

                    </h1>

                    <p>

                        Acompanhe todos os pedidos efectuados.

                    </p>

                </div>

                <Button
                    onClick={()=>
                        navigate("/dashboard/documents")
                    }
                >

                    + Novo Pedido

                </Button>

            </div>

            <SearchBar

                placeholder="Pesquisar..."

                value={search}

                onChange={e=>setSearch(e.target.value)}

            />

            <Table>

                <thead>

                    <tr>

                        <th>Referência</th>

                        <th>Documento</th>

                        <th>Estado</th>

                        <th>Data</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        filtered.length>0

                        ?

                        filtered.map(request=>(

                            <tr key={request.id}>

                                <td>{request.reference}</td>

                                <td>{request.document_type?.name}</td>

                                <td>

                                    <Badge>

                                        {request.status}

                                    </Badge>

                                </td>

                                <td>

                                    {

                                        new Date(
                                            request.created_at
                                        ).toLocaleDateString("pt-PT")

                                    }

                                </td>

                            </tr>

                        ))

                        :

                        <tr>

                            <td colSpan="4">

                                Nenhum pedido encontrado.

                            </td>

                        </tr>

                    }

                </tbody>

            </Table>

        </>

    );

}
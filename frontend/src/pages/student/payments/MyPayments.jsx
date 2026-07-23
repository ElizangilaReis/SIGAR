import { useEffect, useState } from "react";

import paymentService from "../../../services/paymentService";

import Loading from "../../../components/common/Loading/Loading";
import SearchBar from "../../../components/common/SearchBar/SearchBar";
import Table from "../../../components/common/Table/Table";
import Badge from "../../../components/common/Badge/Badge";

export default function MyPayments(){

    const [loading,setLoading]=useState(true);

    const [payments,setPayments]=useState([]);

    const [search,setSearch]=useState("");

    useEffect(()=>{

        loadPayments();

    },[]);

    async function loadPayments(){

        try{

            setLoading(true);

            const data=await paymentService.myPayments();

            setPayments(data);

        }finally{

            setLoading(false);

        }

    }

    if(loading){

        return <Loading/>;

    }

    const filtered=payments.filter(payment=>

        payment.reference
            .toLowerCase()
            .includes(search.toLowerCase())

        ||

        payment.status
            .toLowerCase()
            .includes(search.toLowerCase())

    );

    return(

        <>

            <div className="dashboard-header">

                <h1>

                    Meus Pagamentos

                </h1>

                <p>

                    Consulte todos os pagamentos efectuados.

                </p>

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

                        <th>Valor</th>

                        <th>Estado</th>

                        <th>Data</th>

                        <th></th>

                    </tr>

                </thead>

                <tbody>

                    {

                        filtered.length>0

                        ?

                        filtered.map(payment=>(

                            <tr key={payment.id}>

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

                                        payment.status==="Pago"

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

        </>

    );

}
import "./Badge.css";

export default function Badge({ status }) {

    const colors = {

        Pendente: "warning",

        "Em Processamento": "info",

        Pronto: "success",

        Entregue: "primary",

        Cancelado: "danger"

    };

    return (

        <span className={`badge ${colors[status] || "default"}`}>

            {status}

        </span>

    );

}
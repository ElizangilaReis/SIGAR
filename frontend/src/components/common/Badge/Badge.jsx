import "./Badge.css";

export default function Badge({ status, children }) {

    const value = status || children;

    const colors = {

        // Pedidos
        Pendente: "warning",
        "Em Processamento": "info",
        Pronto: "success",
        Entregue: "primary",
        Cancelado: "danger",

        // Pagamentos
        Pago: "success",
        Expirado: "secondary",

    };

    return (

        <span className={`badge ${colors[value] || "default"}`}>

            {value}

        </span>

    );

}
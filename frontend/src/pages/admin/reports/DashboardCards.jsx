import "./Reports.css";

export default function DashboardCards({ dashboard }) {

    function formatAmount(amount) {
        if (
            amount === null ||
            amount === undefined ||
            amount === ""
        ) {
            return "0 Kz";
        }

        const value = Number(
            typeof amount === "string"
                ? amount.replace(",", ".").trim()
                : amount
        );

        if (!Number.isFinite(value)) {
            return "0 Kz";
        }

        return `${value.toLocaleString("pt-PT", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        })} Kz`;
    }

    function formatNumber(value) {
        if (
            value === null ||
            value === undefined ||
            value === ""
        ) {
            return 0;
        }

        const number = Number(value);

        if (!Number.isFinite(number)) {
            return 0;
        }

        return number.toLocaleString("pt-PT");
    }

    return (
        <div className="report-cards">

            <div className="report-card">
                <span>Estudantes</span>

                <h2>
                    {formatNumber(dashboard?.students)}
                </h2>
            </div>

            <div className="report-card">
                <span>Funcionários</span>

                <h2>
                    {formatNumber(dashboard?.employees)}
                </h2>
            </div>

            <div className="report-card">
                <span>Pedidos</span>

                <h2>
                    {formatNumber(
                        dashboard?.document_requests
                    )}
                </h2>
            </div>

            <div className="report-card">
                <span>Pagamentos</span>

                <h2>
                    {formatNumber(dashboard?.payments)}
                </h2>
            </div>

            <div className="report-card success">
                <span>Total Recebido</span>

                <h2>
                    {formatAmount(
                        dashboard?.total_received
                    )}
                </h2>
            </div>

            <div className="report-card warning">
                <span>Total Pendente</span>

                <h2>
                    {formatAmount(
                        dashboard?.total_pending
                    )}
                </h2>
            </div>

        </div>
    );
}
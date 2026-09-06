import "./Reports.css";

export default function DashboardCharts({ charts }) {
    const payments = Array.isArray(charts?.payments)
        ? charts.payments
        : [];

    const requests = Array.isArray(charts?.requests)
        ? charts.requests
        : [];

    function getMaxValue(data) {
        if (!data.length) {
            return 1;
        }

        const values = data.map((item) => {
            const value = Number(item?.value);

            return Number.isFinite(value) ? value : 0;
        });

        const max = Math.max(...values);

        return max > 0 ? max : 1;
    }

    function formatValue(value) {
        const number = Number(value);

        if (!Number.isFinite(number)) {
            return 0;
        }

        return number;
    }

    function MonthlyChart({
        title,
        data,
        emptyMessage
    }) {
        const maxValue = getMaxValue(data);

        if (!data.length) {
            return (
                <div className="chart-box">
                    <h3>{title}</h3>

                    <div className="chart-empty">
                        {emptyMessage}
                    </div>
                </div>
            );
        }

        return (
            <div className="chart-box">

                <h3>{title}</h3>

                <div
                    className="monthly-chart"
                    aria-label={title}
                >

                    {data.map((item, index) => {

                        const value =
                            formatValue(item?.value);

                        const height =
                            value > 0
                                ? Math.max(
                                    (value / maxValue) * 100,
                                    8
                                )
                                : 2;

                        return (
                            <div
                                className="chart-column"
                                key={`${item?.name}-${index}`}
                            >

                                <div className="chart-value">
                                    {value}
                                </div>

                                <div className="chart-bar-area">

                                    <div
                                        className="chart-bar"
                                        style={{
                                            height: `${height}%`
                                        }}
                                        title={`${item?.name}: ${value}`}
                                    />

                                </div>

                                <span className="chart-label">
                                    {item?.name || "-"}
                                </span>

                            </div>
                        );
                    })}

                </div>

            </div>
        );
    }

    return (
        <div className="dashboard-charts">

            <MonthlyChart
                title="Pagamentos por Mês"
                data={payments}
                emptyMessage="Não existem dados de pagamentos."
            />

            <MonthlyChart
                title="Pedidos por Mês"
                data={requests}
                emptyMessage="Não existem dados de pedidos."
            />

        </div>
    );
}
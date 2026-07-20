import {

    ResponsiveContainer,

    BarChart,

    Bar,

    CartesianGrid,

    Tooltip,

    XAxis,

    YAxis

} from "recharts";

export default function DashboardCharts({

    charts

}) {

    return (

        <div className="charts-grid">

            <div className="chart-box">

                <h3>

                    Pagamentos por Mês

                </h3>

                <ResponsiveContainer

                    width="100%"

                    height={300}

                >

                    <BarChart

                        data={charts.payments_per_month || []}

                    >

                        <CartesianGrid />

                        <XAxis

                            dataKey="month"

                        />

                        <YAxis />

                        <Tooltip />

                        <Bar

                            dataKey="total"

                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

            <div className="chart-box">

                <h3>

                    Pedidos por Mês

                </h3>

                <ResponsiveContainer

                    width="100%"

                    height={300}

                >

                    <BarChart

                        data={charts.requests_per_month || []}

                    >

                        <CartesianGrid />

                        <XAxis

                            dataKey="month"

                        />

                        <YAxis />

                        <Tooltip />

                        <Bar

                            dataKey="total"

                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}
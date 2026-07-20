import "./Reports.css";

export default function DashboardCards({

    dashboard

}) {

    return (

        <div className="report-cards">

            <div className="report-card">

                <span>Estudantes</span>

                <h2>{dashboard.students}</h2>

            </div>

            <div className="report-card">

                <span>Funcionários</span>

                <h2>{dashboard.employees}</h2>

            </div>

            <div className="report-card">

                <span>Pedidos</span>

                <h2>{dashboard.document_requests}</h2>

            </div>

            <div className="report-card">

                <span>Pagamentos</span>

                <h2>{dashboard.payments}</h2>

            </div>

            <div className="report-card success">

                <span>Total Recebido</span>

                <h2>

                    {

                        Number(

                            dashboard.total_received

                        ).toLocaleString()

                    }

                    {" "}Kz

                </h2>

            </div>

            <div className="report-card warning">

                <span>Total Pendente</span>

                <h2>

                    {

                        Number(

                            dashboard.total_pending

                        ).toLocaleString()

                    }

                    {" "}Kz

                </h2>

            </div>

        </div>

    );

}
import Button from "../../../components/common/Button/Button";

export default function ReportActions({
    onExportStudentsPdf,
    onExportEmployeesPdf,
    onExportRequestsPdf,
    onExportPaymentsPdf,
    onExportStudentsExcel,
    onExportEmployeesExcel,
    onExportRequestsExcel,
    onExportPaymentsExcel
}) {
    return (
        <div className="report-actions">

            <Button
                variant="secondary"
                onClick={onExportStudentsPdf}
            >
                PDF Estudantes
            </Button>

            <Button
                variant="secondary"
                onClick={onExportEmployeesPdf}
            >
                PDF Funcionários
            </Button>

            <Button
                variant="secondary"
                onClick={onExportRequestsPdf}
            >
                PDF Pedidos
            </Button>

            <Button
                variant="secondary"
                onClick={onExportPaymentsPdf}
            >
                PDF Pagamentos
            </Button>

            <Button
                variant="secondary"
                onClick={onExportStudentsExcel}
            >
                Excel Estudantes
            </Button>

            <Button
                variant="secondary"
                onClick={onExportEmployeesExcel}
            >
                Excel Funcionários
            </Button>

            <Button
                variant="secondary"
                onClick={onExportRequestsExcel}
            >
                Excel Pedidos
            </Button>

            <Button
                variant="secondary"
                onClick={onExportPaymentsExcel}
            >
                Excel Pagamentos
            </Button>

        </div>
    );
}
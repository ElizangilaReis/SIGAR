import Button from "../../../components/common/Button/Button";

import reportService from "../../../services/reportService";

export default function ReportActions(){

return(

<div
style={{

display:"grid",

gridTemplateColumns:"repeat(4,1fr)",

gap:20,

marginTop:30

}}

>

<Button onClick={reportService.exportStudentsPdf}>

Estudantes PDF

</Button>

<Button onClick={reportService.exportStudentsExcel}>

Estudantes Excel

</Button>

<Button onClick={reportService.exportEmployeesPdf}>

Funcionários PDF

</Button>

<Button onClick={reportService.exportEmployeesExcel}>

Funcionários Excel

</Button>

<Button onClick={reportService.exportRequestsPdf}>

Pedidos PDF

</Button>

<Button onClick={reportService.exportRequestsExcel}>

Pedidos Excel

</Button>

<Button onClick={reportService.exportPaymentsPdf}>

Pagamentos PDF

</Button>

<Button onClick={reportService.exportPaymentsExcel}>

Pagamentos Excel

</Button>

</div>

);

}
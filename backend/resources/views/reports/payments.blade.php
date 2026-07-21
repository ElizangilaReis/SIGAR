<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<style>

body{

font-family:DejaVu Sans;

font-size:12px;

}

table{

width:100%;

border-collapse:collapse;

}

th,td{

border:1px solid #000;

padding:6px;

}

</style>

</head>

<body>

<h2>Relatório de Pagamentos</h2>

<table>

<thead>

<tr>

<th>Referência</th>

<th>Estudante</th>

<th>Valor</th>

<th>Estado</th>

</tr>

</thead>

<tbody>

@foreach($payments as $payment)

<tr>

<td>{{ $payment->reference }}</td>

<td>{{ $payment->student->user->name }}</td>

<td>{{ number_format($payment->amount,2,',','.') }}</td>

<td>{{ $payment->status }}</td>

</tr>

@endforeach

</tbody>

</table>

</body>

</html>
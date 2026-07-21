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

<h2>Relatório de Pedidos</h2>

<table>

<thead>

<tr>

<th>Referência</th>

<th>Estudante</th>

<th>Documento</th>

<th>Estado</th>

</tr>

</thead>

<tbody>

@foreach($requests as $request)

<tr>

<td>{{ $request->reference }}</td>

<td>{{ $request->student->user->name }}</td>

<td>{{ $request->documentType->name }}</td>

<td>{{ $request->status }}</td>

</tr>

@endforeach

</tbody>

</table>

</body>

</html>
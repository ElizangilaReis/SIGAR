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

<h2>Relatório de Funcionários</h2>

<table>

<thead>

<tr>

<th>Nº</th>

<th>Nome</th>

<th>Departamento</th>

<th>Cargo</th>

</tr>

</thead>

<tbody>

@foreach($employees as $employee)

<tr>

<td>{{ $employee->employee_number }}</td>

<td>{{ $employee->user->name }}</td>

<td>{{ $employee->department->name }}</td>

<td>{{ $employee->position->name }}</td>

</tr>

@endforeach

</tbody>

</table>

</body>

</html>
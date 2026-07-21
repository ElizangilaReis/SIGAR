<!DOCTYPE html>
<html>

<head>

    <meta charset="UTF-8">

    <style>

        body{

            font-family: DejaVu Sans;

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

        th{

            background:#efefef;

        }

    </style>

</head>

<body>

<h2>Relatório de Estudantes</h2>

<table>

<thead>

<tr>

<th>Nº</th>

<th>Nome</th>

<th>Email</th>

<th>Curso</th>

</tr>

</thead>

<tbody>

@foreach($students as $student)

<tr>

<td>{{ $student->student_number }}</td>

<td>{{ $student->user->name }}</td>

<td>{{ $student->user->email }}</td>

<td>{{ $student->course->name }}</td>

</tr>

@endforeach

</tbody>

</table>

</body>

</html>
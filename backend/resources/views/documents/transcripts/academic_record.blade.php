@extends('documents.layouts.official')

@section('title', 'Histórico Académico')

@section('content')

<p>
    A Secretaria Académica da <strong>Universidade Gregório Semedo</strong>
    certifica que o estudante
    <strong>{{ $studentName }}</strong>,
    inscrito sob o número
    <strong>{{ $studentNumber }}</strong>,
    frequentou o curso de
    <strong>{{ $course }}</strong>,
    tendo obtido as seguintes classificações:
</p>

<table class="table-data">

```
<thead>

    <tr>

        <th>Código</th>

        <th>Disciplina</th>

        <th>Semestre</th>

        <th>Créditos</th>

        <th>Classificação</th>

    </tr>

</thead>

<tbody>

    @php

        $totalCredits = 0;

    @endphp

    @foreach($disciplines as $discipline)

        @php

            $totalCredits += $discipline['credits'];

        @endphp

        <tr>

            <td>DISC</td>

            <td>{{ $discipline['name'] }}</td>

            <td>{{ $discipline['semester'] }}</td>

            <td style="text-align:center">
                {{ $discipline['credits'] }}
            </td>

            <td style="text-align:center">
                {{ $discipline['grade'] }}
            </td>

        </tr>

    @endforeach

</tbody>
```

</table>

<table
    style="width:100%; margin-top:25px; border-collapse:collapse;"
>

```
<tr>

    <td
        style="padding:8px; border:1px solid #000;"
    >

        <strong>Total de Créditos</strong>

    </td>

    <td
        style="padding:8px; border:1px solid #000; text-align:center;"
    >

       {{ $totalCredits ?? 0 }}

    </td>

</tr>

<tr>

    <td
        style="padding:8px; border:1px solid #000;"
    >

        <strong>Média Geral</strong>

    </td>

    <td
        style="padding:8px; border:1px solid #000; text-align:center;"
    >

        {{ number_format($average, 1) }}

    </td>

</tr>
```

</table>

<p style="margin-top:20px;">
    O presente Histórico Académico é emitido com base nos registos oficiais existentes
    nesta Universidade e destina-se aos fins que o interessado julgar convenientes.
</p>

@endsection


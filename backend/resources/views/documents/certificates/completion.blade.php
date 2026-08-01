@extends('documents.layouts.official')

@section('title', 'Certificado de Conclusão')

@section('content')

<p>
    Certifica-se que o estudante
    <strong>{{ $studentName }}</strong>,
    portador do Bilhete de Identidade n.º
    <strong>{{ $bi }}</strong>,
    concluiu com aproveitamento o curso de
    <strong>{{ $course }}</strong>,
    tendo cumprido integralmente todas as unidades curriculares e demais requisitos académicos
    previstos no plano curricular do referido curso.
</p>

<p>
    O estudante obteve a classificação final de
    <strong>{{ number_format($finalGrade,1) }}</strong> valores,
    tendo concluído o curso em
    <strong>{{ $completionDate }}</strong>.
</p>

<p>
    O presente certificado é emitido para os devidos efeitos legais,
    de acordo com os registos oficiais existentes na Universidade Gregório Semedo.
</p>

<table
    style="width:100%; margin-top:30px; border-collapse:collapse;"
>

```
<tr>

    <td
        style="padding:8px; border:1px solid #000;"
    >

        <strong>Número do Certificado</strong>

    </td>

    <td
        style="padding:8px; border:1px solid #000;"
    >

        {{ $diplomaNumber }}

    </td>

</tr>

<tr>

    <td
        style="padding:8px; border:1px solid #000;"
    >

        <strong>Livro de Registo</strong>

    </td>

    <td
        style="padding:8px; border:1px solid #000;"
    >

        {{ $registrationBook }}

    </td>

</tr>

<tr>

    <td
        style="padding:8px; border:1px solid #000;"
    >

        <strong>Folha</strong>

    </td>

    <td
        style="padding:8px; border:1px solid #000;"
    >

        {{ $registrationPage }}

    </td>

</tr>
```

</table>

@endsection


@extends('documents.layouts.official')

@section('title', 'Diploma')

@section('content')

<div style="text-align:center; margin:20px 0;">

```
<h2
    style="font-size:26px; letter-spacing:2px;"
>

    DIPLOMA

</h2>
```

</div>

<p
    style="text-align:center;"
>

```
A Universidade Gregório Semedo,
ao abrigo das competências conferidas pela legislação aplicável e pelos seus Estatutos,
```

</p>

<p
    style="text-align:center;"
>

```
confere o grau de
```

</p>

<h2
    style="text-align:center; font-size:24px;"
>

```
{{ strtoupper($degree) }}
```

</h2>

<p
    style="text-align:center;"
>

```
a
```

</p>

<h1
    style="text-align:center; font-size:30px; color:#1e3a8a;"
>

```
{{ strtoupper($studentName) }}
```

</h1>

<p
    style="text-align:center;"
>

```
portador do Bilhete de Identidade n.º
<strong>{{ $bi }}</strong>
```

</p>

<p
    style="text-align:center;"
>

```
por ter concluído com aproveitamento o curso de

<strong>{{ $course }}</strong>,

obtendo a classificação final de

<strong>{{ number_format($finalGrade,1) }}</strong> valores.
```

</p>

<div
    style="margin-top:40px;"
>

```
<table
    style="width:100%; border-collapse:collapse;"
>

    <tr>

        <td
            style="padding:8px; border:1px solid #000;"
        >

            <strong>Número do Diploma</strong>

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

</table>
```

</div>

<div
    style="text-align:center; margin-top:50px;"
>

```
<p>
    Luanda,
    {{ $completionDate }}
</p>
```

</div>

<div
    style="margin-top:70px;"
>

```
<table
    style="width:100%; text-align:center;"
>

    <tr>

        <td
            style="width:45%;"
        >

            <strong>O Reitor</strong><br><br><br>

            _______________________________<br>

            {{ $rector }}

        </td>

        <td></td>

        <td
            style="width:45%;"
        >

            <strong>A Secretária-Geral</strong><br><br><br>

            _______________________________<br>

            {{ $secretary }}

        </td>

    </tr>

</table>
```

</div>

@endsection

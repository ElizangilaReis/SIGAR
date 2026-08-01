<!DOCTYPE html>

<html lang="pt">
<head>
    <meta charset="UTF-8">
    <title>Documento Verificado</title>

```
<style>
    body{
        font-family:Arial,sans-serif;
        background:#f8fafc;
        margin:0;
        padding:40px;
    }

    .card{
        max-width:800px;
        margin:auto;
        background:white;
        border-radius:12px;
        padding:40px;
        box-shadow:0 10px 30px rgba(0,0,0,.08);
    }

    .success{
        color:#16a34a;
        font-size:32px;
        text-align:center;
    }

    h1{
        text-align:center;
        color:#1e3a8a;
    }

    table{
        width:100%;
        margin-top:30px;
        border-collapse:collapse;
    }

    td{
        padding:12px;
        border-bottom:1px solid #e5e7eb;
    }

    td:first-child{
        font-weight:bold;
        width:40%;
    }

    .footer{
        text-align:center;
        margin-top:30px;
        color:#6b7280;
        font-size:13px;
    }
</style>
```

</head>

<body>

<div class="card">

```
<div class="success">✓</div>

<h1>Documento Verificado</h1>

<p style="text-align:center;">
    Este documento foi emitido oficialmente pela
    <strong>Universidade Gregório Semedo</strong>.
</p>

<table>

    <tr>
        <td>Documento</td>
        <td>{{ $document->documentType->name }}</td>
    </tr>

    <tr>
        <td>Estudante</td>
        <td>{{ $document->student->user->name }}</td>
    </tr>

    <tr>
        <td>Referência</td>
        <td>{{ $document->reference }}</td>
    </tr>

    <tr>
        <td>Código de Verificação</td>
        <td>{{ $document->verification_code }}</td>
    </tr>

    <tr>
        <td>Data de Emissão</td>
        <td>{{ optional($document->issued_at)->format('d/m/Y') }}</td>
    </tr>

    <tr>
        <td>Estado</td>
        <td>{{ $document->status }}</td>
    </tr>

    <tr>
        <td>Hash SHA-256</td>
        <td style="font-size:11px;">
            {{ $document->document_hash }}
        </td>
    </tr>

</table>

<div
    style="text-align:center; margin-top:30px;"
>

    <a
        href="{{ asset('storage/' . $document->pdf_path) }}"
        target="_blank"
        style="
            background:#1e3a8a;
            color:white;
            padding:12px 24px;
            text-decoration:none;
            border-radius:8px;
            display:inline-block;
        "
    >
        Visualizar Documento Original
    </a>

</div>

<div class="footer">
    Sistema Integrado de Gestão Académica (SIGAR)<br>
    Universidade Gregório Semedo
</div>
```

</div>

</body>
</html>

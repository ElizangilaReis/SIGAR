<!DOCTYPE html>

<html lang="pt">

<head>
    <meta charset="UTF-8">
    <title>@yield('title')</title>

<style>
    @page {
        margin: 35px 40px;
    }

    body {
        font-family: "Times New Roman", serif;
        font-size: 13px;
        color: #000;
        line-height: 1.6;
        position: relative;
    }

    .watermark {
        position: fixed;
        top: 35%;
        left: 10%;
        width: 80%;
        text-align: center;
        opacity: 0.06;
        font-size: 90px;
        font-weight: bold;
        transform: rotate(-30deg);
        z-index: -2;
    }

    .digital-stamp {
        position: fixed;
        top: 42%;
        left: 12%;
        width: 76%;
        text-align: center;
        font-size: 44px;
        font-weight: bold;
        letter-spacing: 3px;
        color: rgba(220, 38, 38, 0.16);
        border: 4px solid rgba(220, 38, 38, 0.18);
        border-radius: 12px;
        padding: 18px 10px;
        transform: rotate(-25deg);
        z-index: -1;
        text-transform: uppercase;
    }

    .header {
        width: 100%;
        border-bottom: 2px solid #1e3a8a;
        padding-bottom: 10px;
        margin-bottom: 25px;
    }

    .header table {
        width: 100%;
    }

    .logo {
        width: 90px;
    }

    .institution {
        text-align: center;
    }

    .institution h1 {
        margin: 0;
        font-size: 20px;
        color: #1e3a8a;
        text-transform: uppercase;
    }

    .institution h2 {
        margin: 4px 0;
        font-size: 15px;
        font-weight: normal;
    }

    .institution p {
        margin: 2px 0;
        font-size: 11px;
    }

    .meta {
        margin-bottom: 20px;
        font-size: 12px;
    }

    .meta table {
        width: 100%;
    }

    .title {
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        text-transform: uppercase;
        margin: 25px 0;
        letter-spacing: 1px;
    }

    .content {
        text-align: justify;
        font-size: 13px;
        position: relative;
        z-index: 1;
    }

    .content p {
        margin-bottom: 14px;
    }

    .content strong {
        font-weight: bold;
    }

    .table-data {
        width: 100%;
        border-collapse: collapse;
        margin: 20px 0;
    }

    .table-data th,
    .table-data td {
        border: 1px solid #000;
        padding: 8px;
        font-size: 12px;
    }

    .table-data th {
        background: #f3f4f6;
        text-align: center;
    }

    .footer-info {
        margin-top: 30px;
        font-size: 12px;
    }

    .verification {
        width: 100%;
        margin-top: 25px;
    }

    .verification td {
        vertical-align: top;
    }

    .verification-code {
        font-size: 11px;
        border: 1px solid #000;
        padding: 10px;
        width: 220px;
    }

    .qr {
        text-align: right;
    }

    .qr img {
        width: 100px;
        height: 100px;
    }

    .signatures {
        width: 100%;
        margin-top: 60px;
    }

    .signature-box {
        width: 45%;
        text-align: center;
    }

    .signature-line {
        border-top: 1px solid #000;
        margin-top: 45px;
        padding-top: 6px;
        font-size: 12px;
    }

    .stamp {
        position: absolute;
        right: 70px;
        bottom: 140px;
        width: 120px;
        opacity: 0.22;
    }

    .digital-seal {
        margin-top: 20px;
        border: 1px solid #d1d5db;
        padding: 12px;
        background: #f9fafb;
        font-size: 11px;
    }

    .bottom {
        position: fixed;
        bottom: 15px;
        left: 40px;
        right: 40px;
        border-top: 1px solid #999;
        padding-top: 6px;
        text-align: center;
        font-size: 10px;
        color: #555;
    }
</style>

</head>

<body>

<div class="watermark">SIGAR</div>

@if(isset($verificationCode))
    <div class="digital-stamp">
        VALIDADO ONLINE
    </div>
@endif

<div class="header">
    <table>
        <tr>
            <td width="90">
                @if(file_exists(public_path('images/logo.png')))
                    <img src="{{ public_path('images/logo.png') }}" class="logo">
                @endif
            </td>

            <td class="institution">
                <h1>Universidade Gregório Semedo</h1>
                <h2>Secretaria Académica</h2>
                <p>Rua Principal, Luanda - Angola</p>
                <p>Tel.: +244 900 000 000 | secretaria@ugs.ao</p>
                <p>www.ugs.ao</p>
            </td>

            <td width="90"></td>
        </tr>
    </table>
</div>

<div class="meta">
    <table>
        <tr>
            <td>
                <strong>Referência:</strong>
                {{ $documentRequest->reference ?? ($payment->reference ?? '---') }}
            </td>

            <td style="text-align:right">
                <strong>Data:</strong>
                {{ isset($issuedAt) && $issuedAt ? $issuedAt->format('d/m/Y') : now()->format('d/m/Y') }}
            </td>
        </tr>
    </table>
</div>

<div class="title">
    @yield('title')
</div>

<div class="content">
    @yield('content')
</div>

<table class="verification">
    <tr>

        <td>

            <div class="verification-code">

                <strong>Código de Verificação</strong><br>

                {{ $verificationCode ?? 'N/D' }}<br><br>

                <span style="font-size:10px;">
                    Validação pública
                </span>

            </div>

        </td>

        <td class="qr">

            @if(isset($qrCode))
                <img
                    src="data:image/svg+xml;base64,{{ $qrCode }}"
                    alt="QR Code"
                >
            @endif

        </td>

    </tr>
</table>

<table class="signatures">
    <tr>

        <td class="signature-box">

            @if(file_exists(public_path('images/assinatura_secretario.png')))
                <img
                    src="{{ public_path('images/assinatura_secretario.png') }}"
                    style="height:55px;"
                >
            @endif

            <div class="signature-line">
                O Secretário Académico
            </div>

        </td>

        <td></td>

        <td class="signature-box">

            @if(file_exists(public_path('images/assinatura_director.png')))
                <img
                    src="{{ public_path('images/assinatura_director.png') }}"
                    style="height:55px;"
                >
            @endif

            <div class="signature-line">
                O Director Académico
            </div>

        </td>

    </tr>
</table>

@if(file_exists(public_path('images/carimbo.png')))
    <img
        src="{{ public_path('images/carimbo.png') }}"
        class="stamp"
    >
@endif

<div class="digital-seal">

    <strong>SELO DIGITAL SIGAR</strong><br>

    Documento emitido eletronicamente pela Universidade Gregório Semedo.<br>

    Código: {{ $verificationCode ?? 'N/D' }}<br>

    Emitido em:
    {{ isset($issuedAt) && $issuedAt ? $issuedAt->format('d/m/Y') : now()->format('d/m/Y') }}

</div>

<div class="bottom">
    Documento emitido eletronicamente pelo Sistema Integrado de Gestão Académica (SIGAR) |
    Universidade Gregório Semedo |
    Validação:
    {{ $verificationUrl ?? 'https://sigar.ao/verificar/' . ($verificationCode ?? '') }}
</div>


</body>

</html>

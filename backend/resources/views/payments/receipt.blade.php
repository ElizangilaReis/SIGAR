@extends('documents.layouts.official')

@section('title', 'Recibo oficial de pagamento')

@section('content')

<p class="intro">
    A Direcção Académica da Universidade Gregório Semedo certifica que o estudante abaixo
    identificado efectuou o pagamento referente ao pedido do documento académico solicitado,
    conforme os registos constantes no Sistema Integrado de Gestão Académica e Registos (SIGAR).
</p>

<div class="section-title">Dados do estudante</div>

<table class="table-data">
    <tr>
        <td width="35%"><strong>Nome completo</strong></td>
        <td>{{ $payment->student->user->name }}</td>
    </tr>

```
<tr>
    <td><strong>Número de estudante</strong></td>
    <td>{{ $payment->student->student_number }}</td>
</tr>

<tr>
    <td><strong>Bilhete de Identidade</strong></td>
    <td>{{ $payment->student->user->bi }}</td>
</tr>

<tr>
    <td><strong>Curso</strong></td>
    <td>{{ $payment->student->course->name }}</td>
</tr>

<tr>
    <td><strong>Faculdade</strong></td>
    <td>{{ $payment->student->course->faculty->name }}</td>
</tr>
```

</table>

<div class="section-title">Dados do pagamento</div>

<table class="table-data">
    <tr>
        <td width="35%"><strong>Documento solicitado</strong></td>
        <td>{{ $payment->documentRequest->documentType->name }}</td>
    </tr>

```
<tr>
    <td><strong>Referência do pagamento</strong></td>
    <td>{{ $payment->reference }}</td>
</tr>

<tr>
    <td><strong>Valor pago</strong></td>
    <td><strong>{{ number_format($payment->amount, 2, ',', '.') }} Kz</strong></td>
</tr>

<tr>
    <td><strong>Método de pagamento</strong></td>
    <td>{{ $payment->payment_method }}</td>
</tr>

<tr>
    <td><strong>Data do pagamento</strong></td>
    <td>{{ optional($payment->payment_date)->format('d/m/Y H:i') }}</td>
</tr>

<tr>
    <td><strong>Estado do pagamento</strong></td>
    <td><strong>{{ strtoupper($payment->status) }}</strong></td>
</tr>
```

</table>

<p class="intro">
    O presente recibo comprova que o pagamento acima identificado foi devidamente recebido,
    registado e processado pelo SIGAR, servindo como comprovativo oficial da liquidação do
    valor correspondente ao documento académico solicitado.
</p>

<div class="footer-info">
    <strong>Observação:</strong><br>
    Este recibo foi emitido eletronicamente pela Universidade Gregório Semedo e possui
    autenticidade garantida através do código de verificação e do QR Code constantes neste documento.
</div>

@endsection

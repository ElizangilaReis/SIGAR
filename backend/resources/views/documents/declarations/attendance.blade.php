@extends('documents.layouts.official')

@section('title', 'Declaração de Frequência')

@section('content')

<p>
    A Secretaria Académica da <strong>Universidade Gregório Semedo</strong>,
    usando das competências que lhe são conferidas pelos regulamentos académicos em vigor,
    declara, para os devidos efeitos, que o estudante
    <strong>{{ $documentRequest->student->user->name }}</strong>,
    portador do Bilhete de Identidade n.º
    <strong>{{ $documentRequest->student->user->bi }}</strong>,
    encontra-se a frequentar regularmente o curso de
    <strong>{{ $documentRequest->student->course->name ?? '________________________' }}</strong>,
    correspondente ao
    <strong>{{ $documentRequest->student->academic_year ?? '3.º Ano' }}</strong>,
    durante o ano académico de
    <strong>{{ date('Y') }}/{{ date('Y') + 1 }}</strong>.
</p>

<p>
    O referido estudante encontra-se inscrito sob o número
    <strong>{{ $documentRequest->student->student_number ?? '________________' }}</strong>,
    frequentando as actividades académicas e pedagógicas previstas para o período lectivo em curso,
    de acordo com os registos existentes nesta Universidade.
</p>

<p>
    A presente declaração é emitida a pedido do interessado e destina-se aos fins que julgar convenientes,
    produzindo os seus efeitos legais nos termos da legislação aplicável e dos regulamentos internos da
    Universidade Gregório Semedo.
</p>

<div class="footer-info">
    <p>
        Luanda, aos
        <strong>{{ $issuedAt->format('d') }}</strong>
        dias do mês de
        <strong>{{ $issuedAt->translatedFormat('F') }}</strong>
        de
        <strong>{{ $issuedAt->format('Y') }}</strong>.
    </p>

```
<p>
    A autenticidade deste documento pode ser confirmada através do código de verificação
    constante no presente documento ou mediante leitura do QR Code.
</p>
```

</div>

@endsection

@extends('documents.layouts.official')

@section('title', 'Carta de Recomendação')

@section('content')

<p>
    A Universidade Gregório Semedo recomenda o estudante
    <strong>{{ $documentRequest->student->user->name }}</strong>,
    reconhecendo o seu desempenho académico, dedicação,
    responsabilidade e conduta exemplar durante a sua permanência nesta instituição.
</p>

<p>
    Consideramos que o referido estudante possui competências técnicas e humanas
    que o qualificam para prosseguir estudos ou exercer actividades profissionais.
</p>

<p>
    Emitimos a presente carta de recomendação para os fins que o interessado julgar convenientes.
</p>

@endsection

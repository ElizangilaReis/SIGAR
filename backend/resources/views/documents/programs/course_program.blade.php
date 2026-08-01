@extends('documents.layouts.official')

@section('title', 'Programa das Disciplinas')

@section('content')

<p>
    A Secretaria Académica da Universidade Gregório Semedo certifica que
    o presente documento contém o programa oficial das disciplinas do curso de
    <strong>{{ $documentRequest->student->course->name ?? '________________' }}</strong>.
</p>

@foreach($programs ?? [] as $program)

<h3>{{ $program['discipline'] }}</h3>

<p>
    <strong>Carga Horária:</strong>
    {{ $program['hours'] }}
</p>

<p>
    <strong>Objectivos:</strong><br>
    {{ $program['objectives'] }}
</p>

<p>
    <strong>Conteúdo Programático:</strong><br>
    {{ $program['content'] }}
</p>

<hr>

@endforeach

@endsection

@extends('documents.layouts.official')

@section('title', 'Declaração de Equivalência')

@section('content')

<p>
    Declara-se que, após análise do processo académico do estudante
    <strong>{{ $documentRequest->student->user->name }}</strong>,
    foram consideradas equivalentes as disciplinas abaixo indicadas:
</p>

<table class="table-data">
    <thead>
        <tr>
            <th>Disciplina de Origem</th>
            <th>Disciplina Equivalente</th>
        </tr>
    </thead>
    <tbody>
        @foreach($equivalences ?? [] as $equivalence)
        <tr>
            <td>{{ $equivalence['origin'] }}</td>
            <td>{{ $equivalence['equivalent'] }}</td>
        </tr>
        @endforeach
    </tbody>
</table>

<p>
    A presente declaração é emitida conforme deliberação dos órgãos académicos competentes.
</p>

@endsection

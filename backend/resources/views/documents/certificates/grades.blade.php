@extends('documents.layouts.official')

@section('title', 'Certificado de Notas')

@section('content')

<p>
    Certifica-se que o estudante
    <strong>{{ $documentRequest->student->user->name }}</strong>,
    portador do Bilhete de Identidade n.º
    <strong>{{ $documentRequest->student->user->bi }}</strong>,
    obteve as classificações abaixo indicadas no curso de
    <strong>{{ $documentRequest->student->course->name ?? '________________' }}</strong>.
</p>

<table class="table-data">
    <thead>
        <tr>
            <th>Disciplina</th>
            <th>Classificação</th>
        </tr>
    </thead>
    <tbody>
        @foreach($grades as $grade)
        <tr>
            <td>{{ $grade['discipline'] }}</td>
            <td style="text-align:center">
                {{ $grade['value'] }}
            </td>
        </tr>
        @endforeach
    </tbody>
</table>

<p>
    <strong>Média:</strong>
    {{ $average ?? '__________' }}
</p>

@endsection

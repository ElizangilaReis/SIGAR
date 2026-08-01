@extends('documents.layouts.official')

@section('title', 'Comprovativo de Emissão da 2ª Via do Cartão')

@section('content')

<p>
    Certifica-se que foi autorizada a emissão da segunda via do Cartão de Estudante
    em nome de
    <strong>{{ $documentRequest->student->user->name }}</strong>,
    estudante do curso de
    <strong>{{ $documentRequest->student->course->name ?? '________________' }}</strong>.
</p>

<p>
    A presente autorização substitui temporariamente o cartão físico
    até à entrega da nova via.
</p>

@endsection

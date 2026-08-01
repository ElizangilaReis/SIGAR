<?php

namespace App\Services;

use App\Models\DocumentRequest;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class DocumentGeneratorService
{
    public function generate(DocumentRequest $documentRequest): string
    {
    $documentRequest->load([
    'student.user',
    'student.course.faculty',
    'student.grades',
    'documentType'
    ]);

    $verificationCode = strtoupper(Str::random(10));

    $verificationUrl = config('app.url') . '/verificar/' . $verificationCode;

    $data = app(DocumentDataService::class)
        ->getData($documentRequest);

    $template = $this->resolveTemplate(
        $documentRequest->documentType->code
    );

    $pdf = Pdf::loadView($template, array_merge($data, [
        'documentRequest' => $documentRequest,
        'verificationCode' => $verificationCode,
        'verificationUrl' => $verificationUrl,
        'title' => $documentRequest->documentType->name,
        'issuedAt' => now(),
    ]))->setPaper('a4');

    $path = 'documents/' . $documentRequest->reference . '.pdf';

    Storage::disk('public')->put($path, $pdf->output());

    DocumentRequest::where('id', $documentRequest->id)->update([
        'pdf_path' => $path,
        'verification_code' => $verificationCode,
        'document_hash' => hash('sha256', $pdf->output()),
        'issued_at' => now(),
    ]);

    return $path;

    }

    private function resolveTemplate(string $code): string
    {
        return match ($code) {

            'DEC_MAT' =>
                'documents.declarations.enrollment',

            'DEC_FREQ' =>
                'documents.declarations.attendance',

            'HIST' =>
                'documents.transcripts.academic_record',

            'CERT_NOTAS' =>
                'documents.certificates.grades',

            'PROG_DISC' =>
                'documents.programs.course_program',

            'CERT_CONC' =>
                'documents.certificates.completion',

            'DIPLOMA' =>
                'documents.certificates.diploma',

            'CARTAO2V' =>
                'documents.certificates.student_card_duplicate',

            'CARTA_REC' =>
                'documents.declarations.recommendation',

            'EQUIV' =>
                'documents.declarations.equivalence',

            default =>
                'documents.declarations.enrollment',
        };
    }
}

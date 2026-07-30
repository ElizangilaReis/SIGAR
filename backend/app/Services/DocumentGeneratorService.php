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
            'documentType'
        ]);

        $verificationCode = $documentRequest->verification_code
            ?: strtoupper(Str::random(12));

        $issuedAt = now();

        $pdf = Pdf::loadView('documents.declaration', [
            'documentRequest' => $documentRequest,
            'verificationCode' => $verificationCode,
            'issuedAt' => $issuedAt
        ]);

        $filename = $documentRequest->reference . '.pdf';
        $path = 'documents/' . $filename;

        Storage::disk('public')->put($path, $pdf->output());

        $documentRequest->update([
            'pdf_path' => $path,
            'verification_code' => $verificationCode,
            'issued_at' => $issuedAt
        ]);

        return $path;
    }
}
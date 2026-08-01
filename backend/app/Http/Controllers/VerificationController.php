<?php

namespace App\Http\Controllers;

use App\Models\DocumentRequest;
use Illuminate\Http\JsonResponse;

class VerificationController extends Controller
{
    public function verify(string $codigo): JsonResponse
    {
        $document = DocumentRequest::with([
            'student.user',
            'student.course.faculty',
            'documentType'
        ])
            ->where('verification_code', $codigo)
            ->first();

        if (!$document) {
            return response()->json([
                'success' => false,
                'valid' => false,
                'message' => 'Documento inválido ou inexistente.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'valid' => true,
            'data' => [
                'reference' => $document->reference,
                'verification_code' => $document->verification_code,
                'issued_at' => $document->issued_at,
                'document_type' => $document->documentType->name,
                'student_name' => $document->student->user->name,
                'student_number' => $document->student->student_number,
                'course' => $document->student->course?->name,
                'faculty' => $document->student->course?->faculty?->name,
                'status' => 'Autêntico'
            ]
        ]);
    }
}
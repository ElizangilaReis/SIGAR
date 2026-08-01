<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDocumentRequestRequest;
use App\Http\Requests\UpdateDocumentRequestRequest;
use App\Http\Resources\DocumentRequestResource;
use App\Models\DocumentRequest;
use App\Models\Employee;
use App\Models\Notification;
use App\Models\Payment;
use App\Models\Student;
use App\Services\DocumentGeneratorService;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Services\NotificationService;

class DocumentRequestController extends Controller
{
    public function index(): JsonResponse
    {
        $requests = DocumentRequest::with([
            'student.user',
            'documentType',
            'employee.user'
        ])->latest()->get();

        return response()->json([
            'success' => true,
            'data' => DocumentRequestResource::collection($requests)
        ]);
    }

    public function store(StoreDocumentRequestRequest $request): JsonResponse
    {
        try {
            $student = Student::where('user_id', $request->user()->id)->first();

            if (!$student) {
                return response()->json([
                    'success' => false,
                    'message' => 'Estudante não encontrado.'
                ], 404);
            }

            $last = DocumentRequest::latest()->first();
            $next = $last ? $last->id + 1 : 1;

            $reference = 'DOC'
                . Carbon::now()->format('Y')
                . str_pad($next, 6, '0', STR_PAD_LEFT);

            $documentRequest = DocumentRequest::create([
                'student_id'       => $student->id,
                'document_type_id' => $request->document_type_id,
                'reference'        => $reference,
                'status'           => 'Pendente',
                'observations'     => $request->observations,
                'requested_at'     => now()
            ]);

            $documentRequest->load('documentType');

            $payment = Payment::create([
                'student_id' => $student->id,
                'document_request_id' => $documentRequest->id,
                'amount' => $documentRequest->documentType->price,
                'payment_method' => 'Referência',
                'status' => 'Pendente',
                'expiry_date' => now()->addDays(3)
            ]);

            $documentRequest->load([
                'student.user',
                'documentType',
                'employee.user'
            ]);

            NotificationService::notifyEmployees(
                'Novo pedido de documento',
                'Foi registado um novo pedido de ' . $documentRequest->documentType->name . '.'
            );

            return response()->json([
                'success' => true,
                'message' => 'Pedido criado com sucesso.',
                'request' => new DocumentRequestResource($documentRequest),
                'payment' => [
                    'id' => $payment->id,
                    'reference' => $payment->reference,
                    'amount' => $payment->amount,
                    'status' => $payment->status,
                    'expiry_date' => $payment->expiry_date,
                ]
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao criar pedido.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show(DocumentRequest $documentRequest): JsonResponse
    {
        $documentRequest->load([
            'student.user',
            'documentType',
            'employee.user'
        ]);

        return response()->json([
            'success' => true,
            'data' => new DocumentRequestResource($documentRequest)
        ]);
    }

    public function update(
    UpdateDocumentRequestRequest $request,
    DocumentRequest $documentRequest
): JsonResponse
{
    try {

        $data = $request->validated();

        $employee = Employee::where(
            'user_id',
            $request->user()->id
        )->first();

        $updateData = [
            'document_type_id' => $data['document_type_id'],
            'status' => $data['status'],
            'observations' => $data['observations'] ?? null,
        ];

        if ($employee) {
            $updateData['employee_id'] = $employee->id;
        }

        // Datas automáticas
        switch ($data['status']) {

            case 'Pronto':

                if (!$documentRequest->completed_at) {
                    $updateData['completed_at'] = now();
                }

                break;

            case 'Entregue':

                if (!$documentRequest->delivered_at) {
                    $updateData['delivered_at'] = now();
                }

                break;
        }

        $documentRequest->update($updateData);
        $documentRequest->refresh();

        // Gerar ou regenerar PDF quando ficar Pronto
        if ($documentRequest->status === 'Pronto') {

            $generator = app(DocumentGeneratorService::class);

            // Remove PDF antigo se existir
            if ($documentRequest->pdf_path) {
                Storage::disk('public')->delete($documentRequest->pdf_path);
            }

            $generator->generate($documentRequest);

            $documentRequest->refresh();
        }

        // Notificação
        if ($documentRequest->student) {

            $title = match ($documentRequest->status) {

                'Pronto' => 'Documento Disponível',

                'Entregue' => 'Documento Entregue',

                default => 'Actualização do Pedido',

            };

            $message = match ($documentRequest->status) {

                'Pronto' =>
                    "O documento {$documentRequest->documentType->name} foi emitido e já está disponível em Meus Documentos.",

                'Entregue' =>
                    "O documento {$documentRequest->documentType->name} foi marcado como entregue.",

                default =>
                    "O seu pedido {$documentRequest->reference} foi actualizado para o estado: {$documentRequest->status}.",

            };

            Notification::create([
                'user_id' => $documentRequest->student->user_id,
                'title' => $title,
                'message' => $message,
                'read' => false,
            ]);
        }

        $documentRequest->load([
            'student.user',
            'documentType',
            'employee.user'
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Pedido actualizado com sucesso.',
            'data' => new DocumentRequestResource($documentRequest)
        ]);

    } catch (\Exception $e) {

        return response()->json([
            'success' => false,
            'message' => 'Erro ao actualizar pedido.',
            'error' => $e->getMessage()
        ], 500);

    }
}

    public function destroy(DocumentRequest $documentRequest): JsonResponse
    {
        try {
            if ($documentRequest->pdf_path) {
                Storage::disk('public')->delete($documentRequest->pdf_path);
            }

            $documentRequest->delete();

            return response()->json([
                'success' => true,
                'message' => 'Pedido removido com sucesso.'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erro ao remover pedido.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function myRequests(Request $request): JsonResponse
    {
        $student = Student::where(
            'user_id',
            $request->user()->id
        )->first();

        if (!$student) {
            return response()->json([
                'success' => false,
                'message' => 'Estudante não encontrado.'
            ], 404);
        }

        $requests = DocumentRequest::with([
            'documentType',
            'employee.user'
        ])
        ->where('student_id', $student->id)
        ->latest()
        ->get();

        return response()->json([
            'success' => true,
            'data' => $requests
        ]);
    }

    public function myDocuments(Request $request): JsonResponse
    {
        $student = Student::where(
            'user_id',
            $request->user()->id
        )->first();

        if (!$student) {
            return response()->json([
                'success' => false,
                'message' => 'Estudante não encontrado.'
            ], 404);
        }

        $documents = DocumentRequest::with('documentType')
            ->where('student_id', $student->id)
            ->whereIn('status', ['Pronto', 'Entregue'])
            ->latest()
            ->get()
            ->map(function ($document) {

                return [
                    'id' => $document->id,
                    'reference' => $document->reference,
                    'status' => $document->status,
                    'issued_at' => $document->issued_at,
                    'document_type' => [
                        'name' => $document->documentType->name
                    ],
                    'can_view' => !empty($document->pdf_path),
                ];

            });

        return response()->json([
            'success' => true,
            'data' => $documents
        ]);
    }

    public function viewDocument(
        Request $request,
        DocumentRequest $documentRequest
    ) {

        if (
            $documentRequest->student->user_id
            !== $request->user()->id
        ) {

            abort(403);

        }

        if (!$documentRequest->pdf_path) {

            abort(404);

        }

        return response()->file(
            storage_path(
                'app/public/' . $documentRequest->pdf_path
            )
        );

    }

   public function downloadDocument(Request $request, DocumentRequest $documentRequest)
    {
        if ($documentRequest->student->user_id !== $request->user()->id) {
            abort(403);
        }

        if (!$documentRequest->pdf_path) {
            return response()->json([
                'success' => false,
                'message' => 'Documento ainda não foi gerado.'
            ], 404);
        }

        $file = storage_path('app/public/' . $documentRequest->pdf_path);

        if (!file_exists($file)) {
            return response()->json([
                'success' => false,
                'message' => 'Ficheiro não encontrado.'
            ], 404);
        }

        return response()->download(
            $file,
            $documentRequest->reference . '.pdf',
            ['Content-Type' => 'application/pdf']
        );
    }

    public function employeeRequests(): JsonResponse
    {
        $requests = DocumentRequest::with([
            'student.user',
            'documentType',
            'employee.user'
        ])
        ->where('status', '!=', 'Entregue')
        ->latest()
        ->get();

        return response()->json([
            'success' => true,
            'data' => DocumentRequestResource::collection($requests)
        ]);
    }

    public function readyDocuments(): JsonResponse
    {
        $requests = DocumentRequest::with([
            'student.user',
            'documentType',
            'employee.user'
        ])
        ->where('status', 'Pronto')
        ->latest()
        ->get();

        return response()->json([
            'success' => true,
            'data' => DocumentRequestResource::collection($requests)
        ]);
    }

    public function regenerate(DocumentRequest $documentRequest): JsonResponse
    {
        if ($documentRequest->pdf_path) {
            Storage::disk('public')->delete($documentRequest->pdf_path);
        }

        app(DocumentGeneratorService::class)
            ->generate($documentRequest);

        $documentRequest->refresh();

        return response()->json([
            'success' => true,
            'message' => 'Documento regenerado com sucesso.',
            'data' => new DocumentRequestResource($documentRequest)
        ]);
    }
}
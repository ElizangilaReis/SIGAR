<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDocumentRequestRequest;
use App\Http\Requests\UpdateDocumentRequestRequest;
use App\Http\Resources\DocumentRequestResource;
use App\Models\DocumentRequest;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;

class DocumentRequestController extends Controller
{
    /**
     * Listar pedidos.
     */
    public function index(): JsonResponse
    {
        $requests = DocumentRequest::with([

            'student.user',
            'documentType',
            'employee.user'

        ])
        ->latest()
        ->get();

        return response()->json([

            'success' => true,

            'data' => DocumentRequestResource::collection($requests)

        ]);
    }

    /**
     * Criar pedido.
     */
    public function store(StoreDocumentRequestRequest $request): JsonResponse
    {
        try {

            $last = DocumentRequest::latest()->first();

            $next = $last ? $last->id + 1 : 1;

            $reference = 'DOC' .
                Carbon::now()->format('Y') .
                str_pad($next, 6, '0', STR_PAD_LEFT);

            $documentRequest = DocumentRequest::create([

                'student_id' => $request->student_id,

                'document_type_id' => $request->document_type_id,

                'reference' => $reference,

                'status' => 'Pendente',

                'observations' => $request->observations,

                'requested_at' => now()

            ]);

            $documentRequest->load([

                'student.user',
                'documentType',
                'employee.user'

            ]);

            return response()->json([

                'success' => true,

                'message' => 'Pedido criado com sucesso.',

                'data' => new DocumentRequestResource($documentRequest)

            ], 201);

        } catch (\Exception $e) {

            return response()->json([

                'success' => false,

                'message' => 'Erro ao criar pedido.',

                'error' => $e->getMessage()

            ], 500);

        }
    }

    /**
     * Visualizar pedido.
     */
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

    /**
     * Actualizar pedido.
     */
    public function update(
    UpdateDocumentRequestRequest $request,
    DocumentRequest $documentRequest
): JsonResponse
{
    try {

        $data = $request->validated();

        /*
        |--------------------------------------------------------------------------
        | Datas automáticas conforme o estado
        |--------------------------------------------------------------------------
        */

        if (
            $data['status'] === 'Pronto' &&
            !$documentRequest->completed_at
        ) {

            $data['completed_at'] = now();

        }

        if (
            $data['status'] === 'Entregue' &&
            !$documentRequest->delivered_at
        ) {

            $data['delivered_at'] = now();

        }

        /*
        |--------------------------------------------------------------------------
        | Actualizar pedido
        |--------------------------------------------------------------------------
        */

        $documentRequest->update([

            'student_id'       => $data['student_id'],

            'document_type_id' => $data['document_type_id'],

            'employee_id'      => $data['employee_id'] ?? null,

            'status'           => $data['status'],

            'observations'     => $data['observations'] ?? null,

            'completed_at'     => $data['completed_at'] ?? $documentRequest->completed_at,

            'delivered_at'     => $data['delivered_at'] ?? $documentRequest->delivered_at,

        ]);

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

    /**
     * Eliminar pedido.
     */
    public function destroy(DocumentRequest $documentRequest): JsonResponse
    {
        try {

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
}
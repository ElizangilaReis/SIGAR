<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDocumentRequestRequest;
use App\Http\Requests\UpdateDocumentRequestRequest;
use App\Http\Resources\DocumentRequestResource;
use App\Models\DocumentRequest;
use App\Models\Student;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DocumentRequestController extends Controller
{
    /**
     * Listar todos os pedidos (Admin/Funcionário)
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
     * Criar novo pedido (Estudante)
     */
    public function store(StoreDocumentRequestRequest $request): JsonResponse
    {
        try {

            $student = Student::where(
                'user_id',
                $request->user()->id
            )->first();

            if (!$student) {

                return response()->json([
                    'success' => false,
                    'message' => 'Estudante não encontrado.'
                ],404);

            }

            $last = DocumentRequest::latest()->first();

            $next = $last ? $last->id + 1 : 1;

            $reference =
                'DOC'
                . Carbon::now()->format('Y')
                . str_pad($next,6,'0',STR_PAD_LEFT);

            $documentRequest = DocumentRequest::create([

                'student_id'       => $student->id,

                'document_type_id' => $request->document_type_id,

                'reference'        => $reference,

                'status'           => 'Pendente',

                'observations'     => $request->observations,

                'requested_at'     => now()

            ]);

            $documentRequest->load([

                'student.user',

                'documentType',

                'employee.user'

            ]);

            return response()->json([

                'success'=>true,

                'message'=>'Pedido criado com sucesso.',

                'data'=>new DocumentRequestResource($documentRequest)

            ],201);

        } catch (\Exception $e) {

            return response()->json([

                'success'=>false,

                'message'=>'Erro ao criar pedido.',

                'error'=>$e->getMessage()

            ],500);

        }
    }

    /**
     * Visualizar pedido
     */
    public function show(DocumentRequest $documentRequest): JsonResponse
    {
        $documentRequest->load([

            'student.user',

            'documentType',

            'employee.user'

        ]);

        return response()->json([

            'success'=>true,

            'data'=>new DocumentRequestResource($documentRequest)

        ]);
    }

    /**
     * Actualizar pedido
     */
    public function update(
        UpdateDocumentRequestRequest $request,
        DocumentRequest $documentRequest
    ): JsonResponse
    {
        try {

            $data = $request->validated();

            if (
                isset($data['status']) &&
                $data['status'] === 'Pronto' &&
                !$documentRequest->completed_at
            ) {

                $data['completed_at'] = now();

            }

            if (
                isset($data['status']) &&
                $data['status'] === 'Entregue' &&
                !$documentRequest->delivered_at
            ) {

                $data['delivered_at'] = now();

            }

            $documentRequest->update([

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

                'success'=>true,

                'message'=>'Pedido actualizado com sucesso.',

                'data'=>new DocumentRequestResource($documentRequest)

            ]);

        } catch (\Exception $e) {

            return response()->json([

                'success'=>false,

                'message'=>'Erro ao actualizar pedido.',

                'error'=>$e->getMessage()

            ],500);

        }
    }

    /**
     * Eliminar pedido
     */
    public function destroy(DocumentRequest $documentRequest): JsonResponse
    {
        try {

            $documentRequest->delete();

            return response()->json([

                'success'=>true,

                'message'=>'Pedido removido com sucesso.'

            ]);

        } catch (\Exception $e) {

            return response()->json([

                'success'=>false,

                'message'=>'Erro ao remover pedido.',

                'error'=>$e->getMessage()

            ],500);

        }
    }

    /**
     * Pedidos do estudante autenticado
     */
    public function myRequests(Request $request)
    {
        $student = Student::where(
            'user_id',
            $request->user()->id
        )->first();

        if (!$student) {

            return response()->json([

                'success'=>false,

                'message'=>'Estudante não encontrado.'

            ],404);

        }

        $requests = DocumentRequest::with([

            'documentType'

        ])
        ->where(
            'student_id',
            $student->id
        )
        ->latest()
        ->get();

        return response()->json([

            'success'=>true,

            'data'=>$requests

        ]);
    }
}
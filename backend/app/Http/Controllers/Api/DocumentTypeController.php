<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDocumentTypeRequest;
use App\Http\Requests\UpdateDocumentTypeRequest;
use App\Http\Resources\DocumentTypeResource;
use App\Models\DocumentType;
use Illuminate\Http\JsonResponse;

class DocumentTypeController extends Controller
{
    /**
     * Listar tipos de documentos.
     */
    public function index(): JsonResponse
    {
        $documentTypes = DocumentType::orderBy('name')->get();

        return response()->json([

            'success' => true,

            'data' => DocumentTypeResource::collection($documentTypes)

        ]);
    }

    /**
     * Criar tipo de documento.
     */
    public function store(StoreDocumentTypeRequest $request): JsonResponse
    {
        try {

            $documentType = DocumentType::create(

                $request->validated()

            );

            return response()->json([

                'success' => true,

                'message' => 'Tipo de documento criado com sucesso.',

                'data' => new DocumentTypeResource($documentType)

            ], 201);

        } catch (\Exception $e) {

            return response()->json([

                'success' => false,

                'message' => 'Erro ao criar tipo de documento.',

                'error' => $e->getMessage()

            ], 500);

        }
    }

    /**
     * Visualizar um tipo de documento.
     */
    public function show(DocumentType $documentType): JsonResponse
    {
        return response()->json([

            'success' => true,

            'data' => new DocumentTypeResource($documentType)

        ]);
    }

    /**
     * Actualizar tipo de documento.
     */
    public function update(
        UpdateDocumentTypeRequest $request,
        DocumentType $documentType
    ): JsonResponse
    {
        try {

            $documentType->update(

                $request->validated()

            );

            return response()->json([

                'success' => true,

                'message' => 'Tipo de documento actualizado com sucesso.',

                'data' => new DocumentTypeResource($documentType)

            ]);

        } catch (\Exception $e) {

            return response()->json([

                'success' => false,

                'message' => 'Erro ao actualizar tipo de documento.',

                'error' => $e->getMessage()

            ], 500);

        }
    }

    /**
     * Activar / Desactivar.
     */
    public function destroy(DocumentType $documentType): JsonResponse
    {
        try {

            $documentType->update([

                'active' => !$documentType->active

            ]);

            return response()->json([

                'success' => true,

                'message' => 'Estado actualizado com sucesso.',

                'data' => new DocumentTypeResource($documentType)

            ]);

        } catch (\Exception $e) {

            return response()->json([

                'success' => false,

                'message' => 'Erro ao actualizar estado.',

                'error' => $e->getMessage()

            ], 500);

        }
    }
}
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePaymentRequest;
use App\Http\Requests\UpdatePaymentRequest;
use App\Http\Resources\PaymentResource;
use App\Models\Payment;
use App\Models\DocumentRequest;
use App\Models\Student;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    /**
     * Listar pagamentos.
     */
    public function index(): JsonResponse
    {
        $payments = Payment::with([

            'student.user',

            'documentRequest.documentType'

        ])->latest()->get();

        return response()->json([

            'success' => true,

            'data' => PaymentResource::collection($payments)

        ]);
    }

    /**
     * Criar pagamento.
     */
    public function store(StorePaymentRequest $request): JsonResponse
{
    try {

        $documentRequest = DocumentRequest::with('documentType')
            ->findOrFail($request->document_request_id);

        $payment = Payment::create([

            'student_id' => $request->student_id,

            'document_request_id' => $request->document_request_id,

            'amount' => $documentRequest->documentType->price,

            'payment_method' => 'Referência',

            'status' => 'Pendente',

            'expiry_date' => now()->addDays(3)

        ]);

        $payment->load([

            'student.user',

            'documentRequest.documentType'

        ]);

        return response()->json([

            'success' => true,

            'message' => 'Pagamento criado com sucesso.',

            'data' => new PaymentResource($payment)

        ], 201);

    } catch (\Exception $e) {

        return response()->json([

            'success' => false,

            'message' => 'Erro ao criar pagamento.',

            'error' => $e->getMessage()

        ], 500);

    }
}
    /**
     * Visualizar pagamento.
     */
    public function show(
        Payment $payment
    ): JsonResponse
    {
        $payment->load([

            'student.user',

            'documentRequest.documentType'

        ]);

        return response()->json([

            'success' => true,

            'data' => new PaymentResource($payment)

        ]);
    }

    /**
     * Actualizar pagamento.
     */
    public function update(
        UpdatePaymentRequest $request,
        Payment $payment
    ): JsonResponse
    {
        try {

            $payment->update(

                $request->validated()

            );

            /**
             * Se o pagamento for efectuado,
             * o pedido passa automaticamente
             * para Em Processamento.
             */
            if ($payment->status === "Pago") {

                $payment->documentRequest->update([

                    'status' => 'Em Processamento'

                ]);

            }

            $payment->load([

                'student.user',

                'documentRequest.documentType'

            ]);

            return response()->json([

                'success' => true,

                'message' => 'Pagamento actualizado com sucesso.',

                'data' => new PaymentResource($payment)

            ]);

        } catch (\Exception $e) {

            return response()->json([

                'success' => false,

                'message' => 'Erro ao actualizar pagamento.',

                'error' => $e->getMessage()

            ], 500);

        }
    }

    /**
     * Alterar estado do pagamento.
     */
    public function changeStatus(
        Request $request,
        Payment $payment
    ): JsonResponse
    {
        $request->validate([

            'status' => [

                'required',

                'in:Pendente,Pago,Expirado,Cancelado'

            ]

        ]);

        try {

            $payment->update([

                'status' => $request->status

            ]);

            if ($request->status === "Pago") {

                $payment->documentRequest->update([

                    'status' => 'Em Processamento'

                ]);

            }

            $payment->load([

                'student.user',

                'documentRequest.documentType'

            ]);

            return response()->json([

                'success' => true,

                'message' => 'Estado actualizado com sucesso.',

                'data' => new PaymentResource($payment)

            ]);

        } catch (\Exception $e) {

            return response()->json([

                'success' => false,

                'message' => 'Erro ao actualizar estado.',

                'error' => $e->getMessage()

            ], 500);

        }
    }

    /**
     * Remover pagamento.
     */
    public function destroy(
        Payment $payment
    ): JsonResponse
    {
        try {

            $payment->delete();

            return response()->json([

                'success' => true,

                'message' => 'Pagamento removido com sucesso.'

            ]);

        } catch (\Exception $e) {

            return response()->json([

                'success' => false,

                'message' => 'Erro ao remover pagamento.',

                'error' => $e->getMessage()

            ], 500);

        }
    }

    public function myPayments(Request $request)
{
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

    $payments = Payment::where(
        'student_id',
        $student->id
    )
    ->latest()
    ->get();

    return response()->json([

        'success'=>true,

        'data'=>$payments

    ]);

}
}
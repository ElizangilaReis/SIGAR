<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePaymentRequest;
use App\Http\Requests\UpdatePaymentRequest;
use App\Http\Resources\PaymentResource;
use App\Models\Payment;
use App\Models\DocumentRequest;
use App\Models\Notification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Services\NotificationService;
use App\Models\Student;
use Illuminate\Support\Facades\Log;

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
    public function show(Payment $payment): JsonResponse
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

            $payment->update($request->validated());

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
     * Estudante confirma que efectuou o pagamento.
     * Simulação da confirmação automática da EMIS.
     */
    public function confirmPayment(Request $request, Payment $payment)
    {
        try {
            $student = Student::where('user_id', $request->user()->id)->first();

            if (!$student || $payment->student_id !== $student->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Pagamento não encontrado.'
                ], 404);
            }

            if ($payment->status === 'Pago') {
                return response()->json([
                    'success' => true,
                    'message' => 'Pagamento já confirmado.'
                ]);
            }

            $payment->update([
                'status' => 'Pago',
                'payment_date' => now(),
            ]);

            if ($payment->documentRequest) {
                $payment->documentRequest->update([
                    'status' => 'Em Processamento',
                ]);
            }

            NotificationService::notifyEmployees(
                'Pagamento confirmado',
                'O pagamento da referência ' . $payment->reference . ' foi confirmado pelo estudante.'
            );

            return response()->json([
                'success' => true,
                'message' => 'Pagamento confirmado com sucesso.'
            ]);
        } catch (\Exception $e) {
            Log::error('Erro ao confirmar pagamento', [
                'payment_id' => $payment->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Erro interno ao confirmar pagamento.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remover pagamento.
     */
    public function destroy(Payment $payment): JsonResponse
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

    /**
     * Pagamentos do estudante autenticado.
     */
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
            ], 404);
        }

        $payments = Payment::with([
            'documentRequest.documentType'
        ])
            ->where('student_id', $student->id)
            ->latest()
            ->get();

        return response()->json([
            'success' => true,
            'data' => PaymentResource::collection($payments)
        ]);
    }

    /**
     * Histórico de pagamentos para funcionários.
     */
    public function employeePayments(): JsonResponse
    {
        $payments = Payment::with([
            'student.user',
            'documentRequest.documentType'
        ])
        ->latest()
        ->get();

        return response()->json([
            'success' => true,
            'data' => PaymentResource::collection($payments)
        ]);
    }

    public function downloadReceipt(
        Request $request,
        Payment $payment
        )
        {
        $student = Student::where(
        'user_id',
        $request->user()->id
        )->first();

        if (!$student || $payment->student_id !== $student->id) {
            return response()->json([
                'success' => false,
                'message' => 'Pagamento não encontrado.'
            ], 404);
        }

        if ($payment->status !== 'Pago') {
            return response()->json([
                'success' => false,
                'message' => 'O recibo só está disponível para pagamentos confirmados.'
            ], 400);
        }

        $payment->load([
            'student.user',
            'student.course.faculty',
            'documentRequest.documentType'
        ]);

        // Gerar o recibo se ainda não existir
        if (empty($payment->receipt_path)) {
            app(\App\Services\PaymentReceiptService::class)
                ->generate($payment);

            $payment->refresh();
        }

        if (empty($payment->receipt_path)) {
            return response()->json([
                'success' => false,
                'message' => 'Não foi possível gerar o recibo.'
            ], 500);
        }

        $file = storage_path(
            'app/public/' . $payment->receipt_path
        );

        if (!file_exists($file)) {
            return response()->json([
                'success' => false,
                'message' => 'Recibo não encontrado.'
            ], 404);
        }

        return response()->download(
            $file,
            'RECIBO_' . $payment->reference . '.pdf'
        );

    }

}

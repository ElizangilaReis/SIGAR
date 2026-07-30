<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DocumentRequest;
use App\Models\Payment;

class EmployeeDashboardController extends Controller
{
    public function index()
    {
        return response()->json([

            'success' => true,

            'data' => [

                'pending_requests' => DocumentRequest::where('status', 'Pendente')->count(),

                'processing_requests' => DocumentRequest::where('status', 'Em Processamento')->count(),

                'ready_documents' => DocumentRequest::where('status', 'Pronto')->count(),

                'delivered_documents' => DocumentRequest::where('status', 'Entregue')->count(),

                'pending_payments' => Payment::where('status', 'Pendente')->count(),

                'paid_payments' => Payment::where('status', 'Pago')->count(),

                'recent_requests' => DocumentRequest::with([

                    'student.user',

                    'documentType'

                ])
                ->latest()
                ->take(5)
                ->get(),

                'recent_payments' => Payment::with([

                    'student.user'

                ])
                ->latest()
                ->take(5)
                ->get()

            ]

        ]);
    }
}
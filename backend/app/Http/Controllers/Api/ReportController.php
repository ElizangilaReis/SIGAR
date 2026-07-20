<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\Employee;
use App\Models\DocumentRequest;
use App\Models\Payment;

class ReportController extends Controller
{
    /**
     * Dashboard
     */
    public function dashboard()
    {
        return response()->json([

            'success' => true,

            'data' => [

                'students' => Student::count(),

                'employees' => Employee::count(),

                'requests' => DocumentRequest::count(),

                'payments' => Payment::count(),

                'pending_requests' => DocumentRequest::where(
                    'status',
                    'Pendente'
                )->count(),

                'processing_requests' => DocumentRequest::where(
                    'status',
                    'Em Processamento'
                )->count(),

                'completed_requests' => DocumentRequest::where(
                    'status',
                    'Entregue'
                )->count(),

                'total_revenue' => Payment::where(
                    'status',
                    'Pago'
                )->sum('amount')

            ]

        ]);
    }

    /**
     * Dados para gráficos
     */
    public function charts()
    {
        return response()->json([

            'success' => true,

            'data' => [

                'requests' => [

                    [

                        'name' => 'Pendente',

                        'value' => DocumentRequest::where(
                            'status',
                            'Pendente'
                        )->count()

                    ],

                    [

                        'name' => 'Processamento',

                        'value' => DocumentRequest::where(
                            'status',
                            'Em Processamento'
                        )->count()

                    ],

                    [

                        'name' => 'Pronto',

                        'value' => DocumentRequest::where(
                            'status',
                            'Pronto'
                        )->count()

                    ],

                    [

                        'name' => 'Entregue',

                        'value' => DocumentRequest::where(
                            'status',
                            'Entregue'
                        )->count()

                    ],

                    [

                        'name' => 'Cancelado',

                        'value' => DocumentRequest::where(
                            'status',
                            'Cancelado'
                        )->count()

                    ]

                ],

                'payments' => [

                    [

                        'name' => 'Pago',

                        'value' => Payment::where(
                            'status',
                            'Pago'
                        )->count()

                    ],

                    [

                        'name' => 'Pendente',

                        'value' => Payment::where(
                            'status',
                            'Pendente'
                        )->count()

                    ],

                    [

                        'name' => 'Expirado',

                        'value' => Payment::where(
                            'status',
                            'Expirado'
                        )->count()

                    ],

                    [

                        'name' => 'Cancelado',

                        'value' => Payment::where(
                            'status',
                            'Cancelado'
                        )->count()

                    ]

                ]

            ]

        ]);
    }

    /**
     * Relatório de estudantes
     */
    public function students()
    {
        return response()->json([

            'success' => true,

            'data' => Student::with([

                'user',

                'course.faculty'

            ])->get()

        ]);
    }

    /**
     * Relatório de funcionários
     */
    public function employees()
    {
        return response()->json([

            'success' => true,

            'data' => Employee::with([

                'user',

                'department',

                'position'

            ])->get()

        ]);
    }

    /**
     * Relatório de pedidos
     */
    public function documentRequests()
    {
        return response()->json([

            'success' => true,

            'data' => DocumentRequest::with([

                'student.user',

                'documentType',

                'employee.user'

            ])->get()

        ]);
    }

    /**
     * Relatório de pagamentos
     */
    public function payments()
    {
        return response()->json([

            'success' => true,

            'data' => Payment::with([

                'student.user',

                'documentRequest.documentType'

            ])->get()

        ]);
    }
}
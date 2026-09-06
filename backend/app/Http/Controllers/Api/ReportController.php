<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\Employee;
use App\Models\DocumentRequest;
use App\Models\Payment;

use Barryvdh\DomPDF\Facade\Pdf;
use Maatwebsite\Excel\Facades\Excel;

use App\Exports\StudentsExport;
use App\Exports\EmployeesExport;
use App\Exports\DocumentRequestsExport;
use App\Exports\PaymentsExport;

class ReportController extends Controller
{
    /**
     * Dashboard
     */
    public function dashboard()
    {
        $totalReceived = Payment::where(
            'status',
            'Pago'
        )->sum('amount');

        $totalPending = Payment::where(
            'status',
            'Pendente'
        )->sum('amount');

        return response()->json([
            'success' => true,

            'data' => [
                'students' => Student::count(),

                'employees' => Employee::count(),

                'document_requests' => DocumentRequest::count(),

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

                'total_received' => $totalReceived,

                'total_pending' => $totalPending
            ]
        ]);
    }

    /**
     * Dados para gráficos
     */
    public function charts()
    {
        $months = [
            1 => 'Jan',
            2 => 'Fev',
            3 => 'Mar',
            4 => 'Abr',
            5 => 'Mai',
            6 => 'Jun',
            7 => 'Jul',
            8 => 'Ago',
            9 => 'Set',
            10 => 'Out',
            11 => 'Nov',
            12 => 'Dez'
        ];

        $year = now()->year;

        $requestsByMonth = [];

        $paymentsByMonth = [];

        foreach ($months as $monthNumber => $monthName) {

            $requestsByMonth[] = [
                'name' => $monthName,

                'value' => DocumentRequest::whereYear(
                    'created_at',
                    $year
                )
                ->whereMonth(
                    'created_at',
                    $monthNumber
                )
                ->count()
            ];

            $paymentsByMonth[] = [
                'name' => $monthName,

                'value' => Payment::whereYear(
                    'created_at',
                    $year
                )
                ->whereMonth(
                    'created_at',
                    $monthNumber
                )
                ->count()
            ];
        }

        return response()->json([
            'success' => true,

            'data' => [
                'requests' => $requestsByMonth,

                'payments' => $paymentsByMonth
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

    /**
     * Exportação PDF - Estudantes
     */
    public function studentsPdf()
    {
        $students = Student::with([
            'user',
            'course.faculty'
        ])->get();

        $pdf = Pdf::loadView(
            'reports.students',
            compact('students')
        );

        return $pdf->download(
            'relatorio_estudantes.pdf'
        );
    }

    /**
     * Exportação PDF - Funcionários
     */
    public function employeesPdf()
    {
        $employees = Employee::with([
            'user',
            'department',
            'position'
        ])->get();

        $pdf = Pdf::loadView(
            'reports.employees',
            compact('employees')
        );

        return $pdf->download(
            'relatorio_funcionarios.pdf'
        );
    }

    /**
     * Exportação PDF - Pedidos
     */
    public function documentRequestsPdf()
    {
        $requests = DocumentRequest::with([
            'student.user',
            'documentType',
            'employee.user'
        ])->get();

        $pdf = Pdf::loadView(
            'reports.document_requests',
            compact('requests')
        );

        return $pdf->download(
            'relatorio_pedidos.pdf'
        );
    }

    /**
     * Exportação PDF - Pagamentos
     */
    public function paymentsPdf()
    {
        $payments = Payment::with([
            'student.user',
            'documentRequest.documentType'
        ])->get();

        $pdf = Pdf::loadView(
            'reports.payments',
            compact('payments')
        );

        return $pdf->download(
            'relatorio_pagamentos.pdf'
        );
    }

    /**
     * Exportação Excel - Estudantes
     */
    public function studentsExcel()
    {
        return Excel::download(
            new StudentsExport,
            'estudantes.xlsx'
        );
    }

    /**
     * Exportação Excel - Funcionários
     */
    public function employeesExcel()
    {
        return Excel::download(
            new EmployeesExport,
            'funcionarios.xlsx'
        );
    }

    /**
     * Exportação Excel - Pedidos
     */
    public function documentRequestsExcel()
    {
        return Excel::download(
            new DocumentRequestsExport,
            'pedidos.xlsx'
        );
    }

    /**
     * Exportação Excel - Pagamentos
     */
    public function paymentsExcel()
    {
        return Excel::download(
            new PaymentsExport,
            'pagamentos.xlsx'
        );
    }
}

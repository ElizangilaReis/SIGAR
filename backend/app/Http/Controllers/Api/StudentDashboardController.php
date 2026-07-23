<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Student;
use App\Models\DocumentRequest;
use App\Models\Payment;

class StudentDashboardController extends Controller
{
    public function index(Request $request)
    {
        $student = Student::where(
            "user_id",
            $request->user()->id
        )->first();

        $requests = DocumentRequest::where(
            "student_id",
            $student->id
        );

        $payments = Payment::where(
            "student_id",
            $student->id
        );

        return response()->json([

            "success"=>true,

            "data"=>[

                "cards"=>[

                    "requests"=>$requests->count(),

                    "pending"=>$requests
                        ->clone()
                        ->where("status","Pendente")
                        ->count(),

                    "completed"=>$requests
                        ->clone()
                        ->where("status","Entregue")
                        ->count(),

                    "payments"=>$payments
                        ->clone()
                        ->where("status","Pendente")
                        ->count()

                ],

                "lastRequests"=>DocumentRequest::with(
                    "documentType"
                )
                ->where(
                    "student_id",
                    $student->id
                )
                ->latest()
                ->take(5)
                ->get(),

                "lastPayments"=>Payment::where(
                    "student_id",
                    $student->id
                )
                ->latest()
                ->take(5)
                ->get()

            ]

        ]);
    }
}
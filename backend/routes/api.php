<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\FacultyController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\Api\DocumentTypeController;
use App\Http\Controllers\Api\DocumentRequestController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\ReportController;


Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', fn(Request $r) => $r->user());
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::patch(
        '/students/{student}/status',
        [StudentController::class, 'changeStatus']
    );
    Route::apiResource('students', StudentController::class);
    Route::apiResource('faculties', FacultyController::class);
    Route::apiResource('courses', CourseController::class);
    Route::apiResource(
        'employees',
        EmployeeController::class
    );

    Route::patch(
        'employees/{employee}/status',
        [EmployeeController::class, 'changeStatus']
    );

    Route::apiResource(
        'departments',
        DepartmentController::class
    );

    Route::apiResource(
        'positions',
        PositionController::class
    );

    Route::apiResource(
        'document-types',
        DocumentTypeController::class
    ); 
    
    Route::patch(
        'document-types/{documentType}/status',
        [DocumentTypeController::class, 'changeStatus']
    );

    Route::apiResource(
        'document-requests',
        DocumentRequestController::class
    );

     Route::patch(
        'payments/{payment}/status',
        [PaymentController::class, 'changeStatus']
    );

    Route::apiResource(
        'payments',
        PaymentController::class
    );

    /*
    |--------------------------------------------------------------------------
    | Relatórios
    |--------------------------------------------------------------------------
    */

    Route::prefix('reports')->group(function () {

        Route::get('/dashboard', [ReportController::class, 'dashboard']);

        Route::get('/charts', [ReportController::class, 'charts']);

        Route::get('/students', [ReportController::class, 'students']);

        Route::get('/employees', [ReportController::class, 'employees']);

        Route::get('/document-requests', [ReportController::class, 'documentRequests']);

        Route::get('/payments', [ReportController::class, 'payments']);

        /*
        |--------------------------------------------------------------------------
        | Exportações PDF
        |--------------------------------------------------------------------------
        */

        Route::get('/students/pdf', [ReportController::class, 'studentsPdf']);

        Route::get('/employees/pdf', [ReportController::class, 'employeesPdf']);

        Route::get('/document-requests/pdf', [ReportController::class, 'documentRequestsPdf']);

        Route::get('/payments/pdf', [ReportController::class, 'paymentsPdf']);

        /*
        |--------------------------------------------------------------------------
        | Exportações Excel
        |--------------------------------------------------------------------------
        */

        Route::get('/students/excel', [ReportController::class, 'studentsExcel']);

        Route::get('/employees/excel', [ReportController::class, 'employeesExcel']);

        Route::get('/document-requests/excel', [ReportController::class, 'documentRequestsExcel']);

        Route::get('/payments/excel', [ReportController::class, 'paymentsExcel']);

    });
    
});

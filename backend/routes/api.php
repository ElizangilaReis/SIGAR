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
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\StudentDashboardController;
use App\Http\Controllers\Api\EmployeeDashboardController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\VerificationController;

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

    Route::post(
        '/admin/documents/{documentRequest}/regenerate',
        [DocumentRequestController::class, 'regenerate']
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

    Route::get(
        '/settings',
        [SettingController::class,'index']
    );

    Route::put(
        '/settings',
        [SettingController::class,'update']
    );

    Route::post(
        '/settings/logo',
        [SettingController::class,'uploadLogo']
    );

    Route::get(
        '/settings/backup',
        [SettingController::class,'backup']
    );

    Route::get('/verificar/{codigo}', [VerificationController::class, 'verify']);
        

    //Estudante
    Route::get(
        '/student/dashboard',
        [StudentDashboardController::class, 'index']
    );

    Route::get(
        '/student/requests',
        [DocumentRequestController::class,'myRequests']
    );

    Route::post(
        '/document-requests',
        [DocumentRequestController::class, 'store']
    );

    Route::get(
        '/student/payments',
        [PaymentController::class,'myPayments']
    );

    Route::get(
        '/student/document-types',
        [DocumentTypeController::class, 'active']
    );

    Route::get('/student/profile', [StudentController::class, 'myProfile']);

   // Rotas do estudante (mantidas)
    Route::get(
        '/student/notifications',
        [NotificationController::class, 'index']
    );

    Route::patch(
        '/student/notifications/{notification}/read',
        [NotificationController::class, 'markAsRead']
    );

    // Novas rotas reutilizáveis (student, employee e admin)
    Route::get(
        '/notifications',
        [NotificationController::class, 'index']
    );

    Route::get(
        '/notifications/unread-count',
        [NotificationController::class, 'unreadCount']
    );

    Route::patch(
        '/notifications/{notification}/read',
        [NotificationController::class, 'markAsRead']
    );

    Route::patch(
        '/notifications/read-all',
        [NotificationController::class, 'markAllAsRead']
    );

     Route::get(
        '/student/documents',
        [DocumentRequestController::class, 'myDocuments']
    );

    Route::get(
        '/student/documents/{documentRequest}/view',
        [DocumentRequestController::class, 'viewDocument']
    );

    Route::get(
        '/student/documents/{documentRequest}/download',
        [DocumentRequestController::class, 'downloadDocument']
    );

    Route::post(
        '/student/payments/{payment}/confirm',
        [PaymentController::class, 'confirmPayment']
    );

    Route::get(
        '/student/payments/{payment}/receipt',
        [PaymentController::class, 'downloadReceipt']
    );

    //======================================================================
    // Funcionário
    //======================================================================

    Route::prefix('employee')->group(function () {

        Route::get(
            '/dashboard',
            [EmployeeDashboardController::class,'index']
        );

        Route::get(
            '/profile',
            [EmployeeController::class,'myProfile']
        );

        // Pedidos
        Route::get(
            '/requests',
            [DocumentRequestController::class,'employeeRequests']
        );

        Route::get(
            '/requests/{documentRequest}',
            [DocumentRequestController::class,'show']
        );

        Route::put(
            '/requests/{documentRequest}',
            [DocumentRequestController::class,'update']
        );

        // Pagamentos
        Route::get(
            '/payments',
            [PaymentController::class,'employeePayments']
        );

        Route::get(
            '/documents/ready',
            [DocumentRequestController::class, 'readyDocuments']
        );

        Route::put(
            '/profile',
            [EmployeeController::class, 'updateMyProfile']
        );
    });
});

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

    Route::apiResource(
        'document-requests',
        DocumentRequestController::class
    );
});

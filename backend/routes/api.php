<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\FacultyController;
use App\Http\Controllers\CourseController;


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
});

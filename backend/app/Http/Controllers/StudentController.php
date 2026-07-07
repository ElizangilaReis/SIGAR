<?php

namespace App\Http\Controllers;

use App\Http\Requests\StudentRequest;
use App\Models\Student;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class StudentController extends Controller
{
    /**
     * Lista todos os estudantes.
     */
    public function index()
    {
        return Student::with('user')
            ->latest()
            ->get();
    }

    /**
     * Cadastrar estudante.
     */
    public function store(StudentRequest $request)
    {
        DB::beginTransaction();

        try {

            // Criar utilizador
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->bi),
                'role' => 'student',
            ]);

            // Criar estudante
            $student = Student::create([
                'user_id' => $user->id,
                'student_number' => $request->student_number,
                'bi' => $request->bi,
                'phone' => $request->phone,
                'birth_date' => $request->birth_date,
                'gender' => $request->gender,
                'faculty' => $request->faculty,
                'course' => $request->course,
                'status' => $request->status ?? 'Activo',
            ]);

            DB::commit();

            return response()->json([
                'message' => 'Estudante criado com sucesso.',
                'student' => $student->load('user'),
            ], 201);

        } catch (\Exception $e) {

            DB::rollBack();

            return response()->json([
                'message' => 'Erro ao cadastrar estudante.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
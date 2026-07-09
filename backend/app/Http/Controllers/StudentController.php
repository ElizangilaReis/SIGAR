<?php

namespace App\Http\Controllers;

use App\Http\Requests\StudentRequest;
use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Throwable;

class StudentController extends Controller
{
    /**
     * Listar estudantes.
     */
    public function index()
    {
        return response()->json([

            'success' => true,

            'data' => Student::with([
                'user:id,name,email,bi,phone,gender,status',
                'course:id,faculty_id,name',
                'course.faculty:id,name'
            ])
            ->latest()
            ->get()

        ]);
    }

    /**
     * Criar estudante.
     */
    public function store(StudentRequest $request)
    {
        try {

            DB::beginTransaction();

            // Criar utilizador
            $user = User::create([

                'name' => $request->name,

                'email' => $request->email,

                'password' => Hash::make($request->bi),

                'role' => 'student',

                'bi' => $request->bi,

                'phone' => $request->phone,

                'birth_date' => $request->birth_date,

                'gender' => $request->gender,

                'status' => $request->status ?? 'Activo',

            ]);

            // Criar estudante
            $student = Student::create([

                'user_id' => $user->id,

                'student_number' => $request->student_number,

                'course_id' => $request->course_id,

            ]);

            DB::commit();

            return response()->json([

                'success' => true,

                'message' => 'Estudante criado com sucesso.',

                'data' => $student->load([
                    'user',
                    'course.faculty'
                ])

            ], 201);

        } catch (Throwable $e) {

            DB::rollBack();

            return response()->json([

                'success' => false,

                'message' => 'Erro ao criar estudante.',

                'error' => $e->getMessage()

            ], 500);

        }
    }

    /**
     * Mostrar estudante.
     */
    public function show(Student $student)
    {
        return response()->json([

            'success' => true,

            'data' => $student->load([
                'user',
                'course.faculty'
            ])

        ]);
    }

    /**
     * Actualizar estudante.
     */
    public function update(StudentRequest $request, Student $student)
    {
        try {

            DB::beginTransaction();

            // Actualizar utilizador
            $student->user->update([

                'name' => $request->name,

                'email' => $request->email,

                'bi' => $request->bi,

                'phone' => $request->phone,

                'birth_date' => $request->birth_date,

                'gender' => $request->gender,

                'status' => $request->status,

            ]);

            // Actualizar estudante
            $student->update([

                'student_number' => $request->student_number,

                'course_id' => $request->course_id,

            ]);

            DB::commit();

            return response()->json([

                'success' => true,

                'message' => 'Estudante actualizado com sucesso.',

                'data' => $student->load([
                    'user',
                    'course.faculty'
                ])

            ]);

        } catch (Throwable $e) {

            DB::rollBack();

            return response()->json([

                'success' => false,

                'message' => 'Erro ao actualizar estudante.',

                'error' => $e->getMessage()

            ], 500);

        }
    }

    /**
     * Desactivar estudante.
     */
    public function destroy(Student $student)
    {
        try {

            DB::beginTransaction();

            // Apenas desactiva o utilizador
            $student->user->update([

                'status' => 'Inactivo'

            ]);

            DB::commit();

            return response()->json([

                'success' => true,

                'message' => 'Estudante desactivado com sucesso.'

            ]);

        } catch (Throwable $e) {

            DB::rollBack();

            return response()->json([

                'success' => false,

                'message' => 'Erro ao desactivar estudante.',

                'error' => $e->getMessage()

            ], 500);

        }
    }

   

    public function changeStatus(Request $request, Student $student)
    {
        $request->validate([
            'status' => 'required|in:Activo,Inactivo'
        ]);

        try {

            DB::beginTransaction();

            $student->user()->update([
                'status' => $request->status
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Estado do estudante actualizado com sucesso.'
            ]);

        } catch (Throwable $e) {

            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Erro ao actualizar o estado.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
<?php

namespace App\Http\Controllers;

use App\Http\Requests\CourseRequest;
use App\Models\Course;
use Illuminate\Support\Facades\DB;
use Throwable;

class CourseController extends Controller
{
    /**
     * Listar cursos.
     */
    public function index()
    {
        return response()->json([

            'success' => true,

            'data' => Course::with('faculty:id,name')
                ->where('active', true)
                ->orderBy('name')
                ->get()

        ]);
    }

    /**
     * Criar curso.
     */
    public function store(CourseRequest $request)
    {
        try {

            DB::beginTransaction();

            $course = Course::create($request->validated());

            DB::commit();

            return response()->json([

                'success' => true,

                'message' => 'Curso criado com sucesso.',

                'data' => $course->load('faculty')

            ], 201);

        } catch (Throwable $e) {

            DB::rollBack();

            return response()->json([

                'success' => false,

                'message' => 'Erro ao criar curso.',

                'error' => $e->getMessage()

            ], 500);

        }
    }

    /**
     * Mostrar curso.
     */
    public function show(Course $course)
    {
        return response()->json([

            'success' => true,

            'data' => $course->load('faculty')

        ]);
    }

    /**
     * Actualizar curso.
     */
    public function update(CourseRequest $request, Course $course)
    {
        try {

            DB::beginTransaction();

            $course->update($request->validated());

            DB::commit();

            return response()->json([

                'success' => true,

                'message' => 'Curso actualizado com sucesso.',

                'data' => $course->load('faculty')

            ]);

        } catch (Throwable $e) {

            DB::rollBack();

            return response()->json([

                'success' => false,

                'message' => 'Erro ao actualizar curso.',

                'error' => $e->getMessage()

            ], 500);

        }
    }

    /**
     * Desactivar curso.
     */
    public function destroy(Course $course)
    {
        try {

            DB::beginTransaction();

            $course->update([

                'active' => false

            ]);

            DB::commit();

            return response()->json([

                'success' => true,

                'message' => 'Curso desactivado com sucesso.'

            ]);

        } catch (Throwable $e) {

            DB::rollBack();

            return response()->json([

                'success' => false,

                'message' => 'Erro ao desactivar curso.',

                'error' => $e->getMessage()

            ], 500);

        }
    }
}

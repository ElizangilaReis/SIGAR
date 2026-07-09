<?php

namespace App\Http\Controllers;

use App\Http\Requests\FacultyRequest;
use App\Models\Faculty;
use Illuminate\Support\Facades\DB;
use Throwable;

class FacultyController extends Controller
{
    /**
     * Listar todas as faculdades
     */
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Faculty::orderBy('name')->get()
        ]);
    }

    /**
     * Criar uma nova faculdade
     */
    public function store(FacultyRequest $request)
    {
        try {

            DB::beginTransaction();

            $faculty = Faculty::create($request->validated());

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Faculdade criada com sucesso.',
                'data' => $faculty
            ], 201);

        } catch (Throwable $e) {

            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Erro ao criar a faculdade.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Mostrar uma faculdade
     */
    public function show(Faculty $faculty)
    {
        return response()->json([
            'success' => true,
            'data' => $faculty
        ]);
    }

    /**
     * Actualizar uma faculdade
     */
    public function update(FacultyRequest $request, Faculty $faculty)
    {
        try {

            DB::beginTransaction();

            $faculty->update($request->validated());

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Faculdade actualizada com sucesso.',
                'data' => $faculty
            ]);

        } catch (Throwable $e) {

            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Erro ao actualizar a faculdade.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Desactivar uma faculdade
     */
    public function destroy(Faculty $faculty)
    {
        try {

            DB::beginTransaction();

            $faculty->update([
                'active' => false
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Faculdade desactivada com sucesso.'
            ]);

        } catch (Throwable $e) {

            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Erro ao desactivar a faculdade.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
<?php

namespace App\Http\Controllers;

use Throwable;
use App\Models\Department;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\DepartmentRequest;
use App\Http\Resources\DepartmentResource;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $departments = Department::orderBy('name')->get();

        return response()->json([

            'success' => true,

            'data' => DepartmentResource::collection($departments)

        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DepartmentRequest $request)
    {
        try {

            DB::beginTransaction();

            $department = Department::create([

                'name' => $request->name,

                'code' => $request->code,

                'description' => $request->description,

                'active' => $request->active

            ]);

            DB::commit();

            return response()->json([

                'success' => true,

                'message' => 'Departamento criado com sucesso.',

                'data' => new DepartmentResource($department)

            ], 201);

        } catch (Throwable $e) {

            DB::rollBack();

            return response()->json([

                'success' => false,

                'message' => 'Erro ao criar departamento.',

                'error' => $e->getMessage()

            ], 500);

        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Department $department)
    {
        return response()->json([

            'success' => true,

            'data' => new DepartmentResource($department)

        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        DepartmentRequest $request,
        Department $department
    )
    {
        try {

            DB::beginTransaction();

            $department->update([

                'name' => $request->name,

                'code' => $request->code,

                'description' => $request->description,

                'active' => $request->active

            ]);

            DB::commit();

            return response()->json([

                'success' => true,

                'message' => 'Departamento actualizado com sucesso.',

                'data' => new DepartmentResource($department)

            ]);

        } catch (Throwable $e) {

            DB::rollBack();

            return response()->json([

                'success' => false,

                'message' => 'Erro ao actualizar departamento.',

                'error' => $e->getMessage()

            ], 500);

        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Department $department)
    {
        try {

            DB::beginTransaction();

            $department->update([

                'active' => false

            ]);

            DB::commit();

            return response()->json([

                'success' => true,

                'message' => 'Departamento desactivado com sucesso.'

            ]);

        } catch (Throwable $e) {

            DB::rollBack();

            return response()->json([

                'success' => false,

                'message' => 'Erro ao desactivar departamento.',

                'error' => $e->getMessage()

            ], 500);

        }
    }
}
<?php

namespace App\Http\Controllers;

use Throwable;
use App\Models\Position;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\PositionRequest;
use App\Http\Resources\PositionResource;

class PositionController extends Controller
{
    /**
     * Listar cargos.
     */
    public function index()
    {
        $positions = Position::with('department')
            ->orderBy('name')
            ->get();

        return response()->json([

            'success' => true,

            'data' => PositionResource::collection($positions)

        ]);
    }

    /**
     * Criar cargo.
     */
    public function store(PositionRequest $request)
    {
        try {

            DB::beginTransaction();

            $position = Position::create([

                'department_id' => $request->department_id,

                'name' => $request->name,

                'code' => $request->code,

                'description' => $request->description,

                'active' => $request->active ?? true

            ]);

            DB::commit();

            return response()->json([

                'success' => true,

                'message' => 'Cargo criado com sucesso.',

                'data' => new PositionResource(

                    $position->load('department')

                )

            ],201);

        } catch (Throwable $e) {

            DB::rollBack();

            return response()->json([

                'success'=>false,

                'message'=>'Erro ao criar cargo.',

                'error'=>$e->getMessage()

            ],500);

        }
    }

    /**
     * Mostrar cargo.
     */
    public function show(Position $position)
    {
        return response()->json([

            'success'=>true,

            'data'=>new PositionResource(

                $position->load('department')

            )

        ]);
    }

    /**
     * Actualizar cargo.
     */
    public function update(PositionRequest $request, Position $position)
    {
        try {

            DB::beginTransaction();

            $position->update([

                'department_id'=>$request->department_id,

                'name'=>$request->name,

                'code'=>$request->code,

                'description'=>$request->description,

                'active'=>$request->active

            ]);

            DB::commit();

            return response()->json([

                'success'=>true,

                'message'=>'Cargo actualizado com sucesso.',

                'data'=>new PositionResource(

                    $position->load('department')

                )

            ]);

        } catch (Throwable $e) {

            DB::rollBack();

            return response()->json([

                'success'=>false,

                'message'=>'Erro ao actualizar cargo.',

                'error'=>$e->getMessage()

            ],500);

        }
    }

    /**
     * Eliminar cargo.
     */
    public function destroy(Position $position)
    {
        try {

            DB::beginTransaction();

            $position->delete();

            DB::commit();

            return response()->json([

                'success'=>true,

                'message'=>'Cargo eliminado com sucesso.'

            ]);

        } catch (Throwable $e) {

            DB::rollBack();

            return response()->json([

                'success'=>false,

                'message'=>'Erro ao eliminar cargo.',

                'error'=>$e->getMessage()

            ],500);

        }
    }
}
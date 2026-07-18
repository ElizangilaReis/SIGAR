<?php

namespace App\Http\Controllers;

use Throwable;
use App\Models\User;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\EmployeeRequest;
use App\Http\Resources\EmployeeResource;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $employees = Employee::with(['user','department', 'position'])
            ->orderBy('id', 'desc')
            ->get();

        return response()->json([

            'success' => true,

            'data' => EmployeeResource::collection($employees)

        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EmployeeRequest $request)
    {
        try {

            DB::beginTransaction();

            // Criar utilizador
            $user = User::create([

                'name' => $request->name,

                'email' => $request->email,

                'password' => Hash::make($request->bi),

                'role' => 'employee',

                'bi' => $request->bi,

                'phone' => $request->phone,

                'birth_date' => $request->birth_date,

                'gender' => $request->gender,

                'status' => $request->status

            ]);

            // Gerar número automático do funcionário
            $lastEmployee = Employee::latest('id')->first();

            $nextNumber = $lastEmployee
                ? $lastEmployee->id + 1
                : 1;

            $employeeNumber = 'EMP'
                . date('Y')
                . str_pad($nextNumber, 5, '0', STR_PAD_LEFT);

            // Criar funcionário
            $employee = Employee::create([

                'user_id' => $user->id,

                'employee_number' => $employeeNumber,

                'department_id' => $request->department_id,

                'position_id' => $request->position_id

            ]);

            DB::commit();

            return response()->json([

                'success' => true,

                'message' => 'Funcionário criado com sucesso.',

                'data' => new EmployeeResource(

                    $employee->load([
                        'user',
                        'department',
                        'position'
                    ])

                )

            ], 201);

        } catch (Throwable $e) {

            DB::rollBack();

            return response()->json([

                'success' => false,

                'message' => 'Erro ao criar funcionário.',

                'error' => $e->getMessage()

            ], 500);

        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        return response()->json([

            'success' => true,

            'data' => new EmployeeResource(

                $employee->load(['user','department', 'position'])

            )

        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EmployeeRequest $request, Employee $employee)
    {
        try {

            DB::beginTransaction();

            $employee->user->update([

                'name' => $request->name,

                'email' => $request->email,

                'bi' => $request->bi,

                'phone' => $request->phone,

                'birth_date' => $request->birth_date,

                'gender' => $request->gender,

                'status' => $request->status,

            ]);

            $employee->update([

                'department_id'=>$request->department_id,

                'position_id'=>$request->position_id

            ]);

            DB::commit();

            return response()->json([

                'success' => true,

                'message' => 'Funcionário actualizado com sucesso.',

                'data' => new EmployeeResource(

                    $employee->fresh()->load('user')

                )

            ]);

        } catch (Throwable $e) {

            DB::rollBack();

            return response()->json([

                'success' => false,

                'message' => 'Erro ao actualizar funcionário.',

                'error' => $e->getMessage()

            ],500);

        }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        try {

            $employee->user->update([

                'status' => 'Inactivo'

            ]);

            return response()->json([

                'success' => true,

                'message' => 'Funcionário desactivado com sucesso.'

            ]);

        } catch (Throwable $e) {

            return response()->json([

                'success' => false,

                'message' => 'Erro ao desactivar funcionário.',

                'error' => $e->getMessage()

            ],500);

        }
    }

    public function changeStatus(Request $request, Employee $employee)
    {
        $request->validate([

            'status' => 'required|in:Activo,Inactivo'

        ]);

        $employee->user->update([

            'status' => $request->status

        ]);

        return response()->json([

            'success' => true,

            'message' => 'Estado actualizado com sucesso.',

            'data' => new EmployeeResource(

                $employee->fresh()->load('user')

            )

        ]);
    }
}

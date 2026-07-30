<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Employee;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /**
     * Login
     */
    public function login(Request $request)
    {
        $request->validate([

            'login' => 'required',

            'password' => 'required'

        ]);

        $login = $request->login;

        $password = $request->password;

        /*
        |--------------------------------------------------------------------------
        | LOGIN DO ESTUDANTE
        |--------------------------------------------------------------------------
        */

        $student = Student::with('user')
            ->where('student_number', $login)
            ->first();

        if ($student && $student->user) {

            if ($student->user->bi !== $password) {

                return response()->json([
                    'message' => 'Número de estudante ou BI inválido.'
                ], 401);

            }

            $user = $student->user;

            $token = $user
                ->createToken('api-token')
                ->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $token
            ]);

        }

        /*
        |--------------------------------------------------------------------------
        | LOGIN DO FUNCIONÁRIO
        |--------------------------------------------------------------------------
        */

        $employee = Employee::with('user')
            ->where('employee_number', $login)
            ->first();

        if ($employee && $employee->user) {

            if ($employee->user->bi !== $password) {

                return response()->json([
                    'message' => 'Número de funcionário ou BI inválido.'
                ], 401);

            }

            $user = $employee->user;

            $token = $user
                ->createToken('api-token')
                ->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $token
            ]);

        }

        /*
        |--------------------------------------------------------------------------
        | LOGIN DO ADMINISTRADOR
        |--------------------------------------------------------------------------
        */

        $admin = \App\Models\User::where('email', $login)
            ->where('role', 'admin')
            ->first();

        if (
            !$admin ||
            !\Illuminate\Support\Facades\Hash::check($password, $admin->password)
        ) {

            return response()->json([
                'message' => 'Credenciais inválidas.'
            ], 401);

        }

        $token = $admin
            ->createToken('api-token')
            ->plainTextToken;

        return response()->json([
            'user' => $admin,
            'token' => $token
        ]);
    }

    /**
     * Logout
     */
    public function logout(Request $request)
    {
        $request
            ->user()
            ->currentAccessToken()
            ->delete();

        return response()->json([
            'message' => 'Logout realizado com sucesso.'
        ]);
    }
}
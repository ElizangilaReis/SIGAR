<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

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
        | LOGIN DE FUNCIONÁRIO / ADMIN
        |--------------------------------------------------------------------------
        */

        if (!Auth::attempt([

            'email' => $login,

            'password' => $password

        ])) {

            return response()->json([

                'message' => 'Credenciais inválidas.'

            ], 401);

        }

        $user = Auth::user();

        $token = $user
            ->createToken('api-token')
            ->plainTextToken;

        return response()->json([

            'user' => $user,

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
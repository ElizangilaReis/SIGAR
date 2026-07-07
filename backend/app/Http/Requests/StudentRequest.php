<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StudentRequest extends FormRequest
{
    /**
     * Autoriza a requisição.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Regras de validação.
     */
    public function rules(): array
    {
        return [

            'name' => 'required|string|max:255',

            'email' => 'required|email|unique:users,email',

            'student_number' => 'required|string|max:30|unique:students,student_number',

            'bi' => 'required|string|max:20|unique:students,bi',

            'phone' => 'nullable|string|max:20',

            'birth_date' => 'nullable|date',

            'gender' => 'nullable|in:Masculino,Feminino',

            'faculty' => 'required|string|max:150',

            'course' => 'required|string|max:150',

            'status' => 'nullable|in:Activo,Inactivo',

        ];
    }

    /**
     * Mensagens personalizadas.
     */
    public function messages(): array
    {
        return [

            'name.required' => 'O nome é obrigatório.',

            'email.required' => 'O email é obrigatório.',

            'email.email' => 'O email informado é inválido.',

            'email.unique' => 'Já existe um utilizador com este email.',

            'student_number.required' => 'O número de estudante é obrigatório.',

            'student_number.unique' => 'Este número de estudante já existe.',

            'bi.required' => 'O número do BI é obrigatório.',

            'bi.unique' => 'Já existe um estudante com este BI.',

            'faculty.required' => 'A faculdade é obrigatória.',

            'course.required' => 'O curso é obrigatório.',

        ];
    }
}
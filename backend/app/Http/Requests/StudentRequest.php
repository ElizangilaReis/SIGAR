<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StudentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $student = $this->route('student');

        $userId = $student?->user_id;

        return [

            /*
            |--------------------------------------------------------------------------
            | Dados do Utilizador
            |--------------------------------------------------------------------------
            */

            'name' => 'required|string|max:255',

            'email' => 'required|email|unique:users,email,' . $userId,

            'bi' => 'required|string|max:20|unique:users,bi,' . $userId,

            'phone' => 'nullable|string|max:20',

            'birth_date' => 'nullable|date',

            'gender' => 'nullable|in:Masculino,Feminino',

            'status' => 'required|in:Activo,Inactivo',

            /*
            |--------------------------------------------------------------------------
            | Dados Académicos
            |--------------------------------------------------------------------------
            */

            'student_number' => 'required|string|max:30|unique:students,student_number,' . ($student?->id),

            'course_id' => 'required|exists:courses,id',

        ];
    }

    public function messages(): array
    {
        return [

            'name.required' => 'O nome é obrigatório.',

            'email.required' => 'O email é obrigatório.',

            'email.email' => 'O email é inválido.',

            'email.unique' => 'Já existe um utilizador com este email.',

            'bi.required' => 'O BI é obrigatório.',

            'bi.unique' => 'Já existe um utilizador com este BI.',

            'student_number.required' => 'O número de estudante é obrigatório.',

            'student_number.unique' => 'Já existe um estudante com este número.',

            'course_id.required' => 'O curso é obrigatório.',

            'course_id.exists' => 'O curso seleccionado é inválido.',

        ];
    }
}
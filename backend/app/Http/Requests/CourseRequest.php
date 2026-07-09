<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CourseRequest extends FormRequest
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
        $course = $this->route('course');

        return [

            'faculty_id' => 'required|exists:faculties,id',

            'name' => 'required|string|max:150',

            'code' => 'required|string|max:20|unique:courses,code,' . ($course?->id),

        ];
    }

    /**
     * Mensagens personalizadas.
     */
    public function messages(): array
    {
        return [

            'faculty_id.required' => 'A faculdade é obrigatória.',

            'faculty_id.exists' => 'A faculdade seleccionada é inválida.',

            'name.required' => 'O nome do curso é obrigatório.',

            'code.required' => 'O código do curso é obrigatório.',

            'code.unique' => 'Já existe um curso com este código.',

        ];
    }
}
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FacultyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $faculty = $this->route('faculty');

        return [

            'name' => 'required|string|max:150',

            'code' => 'required|string|max:20|unique:faculties,code,'.($faculty->id ?? 'NULL'),

            'abbreviation' => 'required|string|max:20|unique:faculties,abbreviation,'.($faculty->id ?? 'NULL'),

            'description' => 'nullable|string',

            'active' => 'nullable|boolean'

        ];
    }
}
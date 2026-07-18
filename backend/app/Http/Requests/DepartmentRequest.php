<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DepartmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        $department = $this->route('department');

        return [

            'name' => [
                'required',
                'string',
                'max:150'
            ],

            'code' => [
                'required',
                'string',
                'max:20',
                Rule::unique('departments', 'code')
                    ->ignore($department?->id)
            ],

            'description' => [
                'nullable',
                'string'
            ],

            'active' => [
                'required',
                'boolean'
            ],

        ];
    }
}
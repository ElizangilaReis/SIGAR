<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PositionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $position = $this->route('position');

        return [

            'department_id' => 'required|exists:departments,id',

            'name' => 'required|string|max:150|unique:positions,name,' . ($position->id ?? 'NULL'),

            'code' => 'nullable|string|max:20',

            'description' => 'nullable|string',

            'active' => 'nullable|boolean',

        ];
    }
}
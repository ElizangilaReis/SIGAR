<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateDocumentTypeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            'name' => 'required|string|max:255',

            'code' => [

                'required',

                'string',

                'max:50',

                Rule::unique('document_types', 'code')
                    ->ignore($this->route('document_type'))

            ],

            'price' => 'required|numeric|min:0',

            'processing_days' => 'required|integer|min:1',

            'description' => 'nullable|string',

            'active' => 'boolean',

        ];
    }
}
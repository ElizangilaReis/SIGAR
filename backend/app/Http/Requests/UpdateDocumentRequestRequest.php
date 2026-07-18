<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateDocumentRequestRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            'employee_id' => 'nullable|exists:employees,id',

            'status' => [

                'required',

                Rule::in([

                    'Pendente',

                    'Em Processamento',

                    'Pronto',

                    'Entregue',

                    'Cancelado'

                ])

            ],

            'observations' => 'nullable|string|max:1000',

        ];
    }
}
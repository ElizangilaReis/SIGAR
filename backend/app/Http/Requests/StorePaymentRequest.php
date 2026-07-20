<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePaymentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Validation rules.
     */
    public function rules(): array
    {
        return [

            'document_request_id' => [

                'required',

                'exists:document_requests,id'

            ],

            'student_id' => [

                'required',

                'exists:students,id'

            ]

        ];
    }
}
<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePaymentRequest extends FormRequest
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

            ],

            'amount' => [

                'required',

                'numeric',

                'min:0'

            ],

            'payment_method' => [

                'required',

                'in:Referência,Transferência,TPA,Multicaixa Express'

            ],

            'status' => [

                'required',

                'in:Pendente,Pago,Expirado,Cancelado'

            ],

            'transaction_id' => [

                'nullable',

                'string',

                'max:255'

            ],

            'payment_date' => [

                'nullable',

                'date'

            ],

            'expiry_date' => [

                'nullable',

                'date'

            ],

            'notes' => [

                'nullable',

                'string'

            ]

        ];
    }
}
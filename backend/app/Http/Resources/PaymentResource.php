<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [

            'id' => $this->id,

            'reference' => $this->reference,

            'amount' => $this->amount,

            'payment_method' => $this->payment_method,

            'status' => $this->status,

            'transaction_id' => $this->transaction_id,

            'payment_date' => $this->payment_date,

            'expiry_date' => $this->expiry_date,

            'notes' => $this->notes,

            'student' => $this->whenLoaded('student', function () {

                return [

                    'id' => $this->student->id,

                    'student_number' => $this->student->student_number,

                    'user' => [

                        'id' => $this->student->user->id,

                        'name' => $this->student->user->name,

                        'email' => $this->student->user->email,

                    ]

                ];

            }),

            'document_request' => new DocumentRequestResource(

                $this->whenLoaded('documentRequest')

            ),

            'created_at' => $this->created_at,

            'updated_at' => $this->updated_at

        ];
    }
}
<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DocumentRequestResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [

            'id' => $this->id,

            'reference' => $this->reference,

            'status' => $this->status,

            'observations' => $this->observations,

            'requested_at' => $this->requested_at,

            'completed_at' => $this->completed_at,

            'delivered_at' => $this->delivered_at,

            'student' => [

                'id' => $this->student?->id,

                'student_number' => $this->student?->student_number,

                'name' => $this->student?->user?->name,

            ],

            'document_type' => [

                'id' => $this->documentType?->id,

                'name' => $this->documentType?->name,

                'price' => $this->documentType?->price,

            ],

            'employee' => $this->employee ? [

                'id' => $this->employee->id,

                'name' => $this->employee->user?->name,

            ] : null,

        ];
    }
}
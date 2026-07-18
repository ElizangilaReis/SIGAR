<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [

            'id'=>$this->id,

            'employee_number'=>$this->employee_number,

            'department'=>

            [

                'id'=>$this->department->id,

                'name'=>$this->department->name

            ],

            'position'=>

            [

                'id'=>$this->position->id,

                'name'=>$this->position->name

            ],

            'user'=>$this->user

        ];
    }
}
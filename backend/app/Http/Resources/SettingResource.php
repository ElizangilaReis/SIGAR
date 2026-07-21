<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SettingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [

            'id'=>$this->id,

            'institution_name'=>$this->institution_name,

            'email'=>$this->email,

            'phone'=>$this->phone,

            'address'=>$this->address,

            'academic_year'=>$this->academic_year,

            'language'=>$this->language,

            'timezone'=>$this->timezone,

            'currency'=>$this->currency,

            'maintenance'=>$this->maintenance,

            'registration'=>$this->registration,

            'notifications'=>$this->notifications,

            'logo'=>$this->logo

        ];
    }
}
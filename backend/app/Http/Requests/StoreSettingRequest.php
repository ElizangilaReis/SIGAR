<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSettingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            'institution_name' => 'required|string|max:255',

            'email' => 'required|email',

            'phone' => 'nullable|string|max:50',

            'address' => 'nullable|string',

            'academic_year' => 'nullable|string|max:20',

            'language' => 'required|string|max:10',

            'timezone' => 'required|string|max:100',

            'currency' => 'required|string|max:10',

            'maintenance' => 'required|boolean',

            'registration' => 'required|boolean',

            'notifications' => 'required|boolean'

        ];
    }
}
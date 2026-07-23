<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDocumentRequestRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            'document_type_id' => 'required|exists:document_types,id',

            'observations' => 'nullable|string|max:1000',

        ];
    }
}
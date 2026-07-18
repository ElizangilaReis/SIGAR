<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EmployeeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $employee = $this->route('employee');

        return [

            'name' => [
                'required',
                'string',
                'max:150'
            ],

            'email' => [
                'required',
                'email',
                Rule::unique('users', 'email')
                    ->ignore($employee?->user_id)
            ],

            'bi' => [
                'required',
                'string',
                'max:20',
                Rule::unique('users', 'bi')
                    ->ignore($employee?->user_id)
            ],

            'phone' => [
                'nullable',
                'string',
                'max:20'
            ],

            'birth_date' => [
                'nullable',
                'date'
            ],

            'gender' => [
                'required',
                'string'
            ],

            'status' => [
                'required',
                'in:Activo,Inactivo'
            ],

            'employee_number' => 'nullable',

            'department_id'=>[
                'required',
                'exists:departments,id'
            ],

            'position_id' => [
                'required',
                'exists:positions,id'
            ],
        ];
    }
}
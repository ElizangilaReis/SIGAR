<?php

namespace App\Exports;

use App\Models\Employee;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;

class EmployeesExport implements FromCollection
{
    public function collection(): Collection
    {
        return Employee::with([
            'user',
            'department',
            'position'
        ])->get();
    }
}

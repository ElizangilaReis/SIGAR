<?php

namespace App\Exports;

use App\Models\DocumentRequest;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;

class DocumentRequestsExport implements FromCollection
{
    public function collection(): Collection
    {
        return DocumentRequest::with([
            'student.user',
            'documentType',
            'employee.user'
        ])->get();
    }
}

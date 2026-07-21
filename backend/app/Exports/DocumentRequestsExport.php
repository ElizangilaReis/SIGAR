<?php

namespace App\Exports;

use App\Models\DocumentRequest;
use Maatwebsite\Excel\Concerns\FromCollection;

class DocumentRequestsExport implements FromCollection
{
    public function collection()
    {
        return DocumentRequest::with([

            'student.user',

            'documentType',

            'employee.user'

        ])->get();
    }
}
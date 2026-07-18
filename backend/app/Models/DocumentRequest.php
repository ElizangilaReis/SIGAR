<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DocumentRequest extends Model
{
    protected $fillable = [

        'student_id',
        'document_type_id',
        'employee_id',
        'reference',
        'status',
        'observations',
        'requested_at',
        'completed_at',
        'delivered_at'

    ];

    protected $casts = [

        'requested_at' => 'datetime',

        'completed_at' => 'datetime',

        'delivered_at' => 'datetime',

    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function documentType()
    {
        return $this->belongsTo(DocumentType::class);
    }
}
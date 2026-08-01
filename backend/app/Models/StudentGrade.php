<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentGrade extends Model
{
    protected $fillable = [

        'student_id',
        'discipline',
        'code',
        'semester',
        'credits',
        'grade'

    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}

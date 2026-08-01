<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [

        'user_id',

        'student_number',

        'course_id',

    ];

    /**
     * Utilizador.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Curso.
     */
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function documentRequests()
    {
        return $this->hasMany(DocumentRequest::class);
    }

    /**
     * Pagamentos do estudante.
     */
    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function grades()
    {
        return $this->hasMany(StudentGrade::class);
    }
}
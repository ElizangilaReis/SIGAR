<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [

        'faculty_id',

        'name',

        'code',

        'description',

        'active'

    ];

    /**
     * Faculdade do curso
     */
    public function faculty()
    {
        return $this->belongsTo(Faculty::class);
    }

    /**
     * Estudantes do curso
     */
    public function students()
    {
        return $this->hasMany(Student::class);
    }
}
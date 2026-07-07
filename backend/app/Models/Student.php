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
        'bi',
        'phone',
        'birth_date',
        'gender',
        'faculty',
        'course',
        'status',
    ];

    protected $casts = [
        'birth_date' => 'date',
    ];

    /**
     * Utilizador associado ao estudante.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
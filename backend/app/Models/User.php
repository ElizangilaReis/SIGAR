<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

use App\Models\Student;
use App\Models\Employee;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [

        'name',

        'email',

        'password',

        'role',

        'bi',

        'phone',

        'birth_date',

        'gender',

        'status',

    ];

    protected $hidden = [

        'password',

        'remember_token',

    ];

    protected $casts = [

        'birth_date' => 'date',

        'email_verified_at' => 'datetime',

    ];

    /**
     * Dados do estudante.
     */
    public function student()
    {
        return $this->hasOne(Student::class);
    }

    /**
     * Dados do funcionário.
     */
    public function employee()
    {
       return $this->hasOne(Employee::class);
    }
}
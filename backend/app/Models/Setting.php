<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Setting extends Model
{
    use HasFactory;

    protected $fillable = [

        'institution_name',
        'email',
        'phone',
        'address',

        'academic_year',

        'language',
        'timezone',
        'currency',

        'maintenance',
        'registration',
        'notifications',

        'logo'

    ];

    protected $casts = [

        'maintenance' => 'boolean',
        'registration' => 'boolean',
        'notifications' => 'boolean'

    ];
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DocumentType extends Model
{
    protected $fillable = [

        'name',
        'code',
        'price',
        'processing_days',
        'description',
        'active'

    ];

    protected $casts = [

        'price' => 'decimal:2',
        'active' => 'boolean',

    ];

    public function requests()
    {
        return $this->hasMany(DocumentRequest::class);
    }
}
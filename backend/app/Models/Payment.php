<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [

        'reference',

        'document_request_id',

        'student_id',

        'amount',

        'payment_method',

        'status',

        'transaction_id',

        'payment_date',

        'expiry_date',

        'notes'

    ];

    protected $casts = [

        'payment_date' => 'datetime',

        'expiry_date' => 'datetime'

    ];

    /**
     * Pedido associado.
     */
    public function documentRequest()
    {
        return $this->belongsTo(DocumentRequest::class);
    }

    /**
     * Estudante.
     */
    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    /**
     * Gerar referência automaticamente.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($payment) {

            if (!$payment->reference) {

                do {

                    $reference = 'PG' .
                        now()->format('Y') .
                        str_pad(
                            random_int(1, 999999),
                            6,
                            '0',
                            STR_PAD_LEFT
                        );

                } while (

                    self::where('reference', $reference)->exists()

                );

                $payment->reference = $reference;

            }

        });
    }
}
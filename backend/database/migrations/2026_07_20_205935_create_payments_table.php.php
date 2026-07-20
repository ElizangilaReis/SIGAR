<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {

            $table->id();

            $table->string('reference')->unique();

            $table->foreignId('document_request_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->foreignId('student_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();

            $table->decimal('amount', 12, 2);

            $table->enum('payment_method', [

                'Referência',
                'Transferência',
                'TPA',
                'Multicaixa Express'

            ])->default('Referência');

            $table->enum('status', [

                'Pendente',
                'Pago',
                'Expirado',
                'Cancelado'

            ])->default('Pendente');

            $table->string('transaction_id')->nullable();

            $table->timestamp('payment_date')->nullable();

            $table->timestamp('expiry_date')->nullable();

            $table->text('notes')->nullable();

            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
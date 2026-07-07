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
        Schema::create('students', function (Blueprint $table) {

            $table->id();

            // Relação com users
            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();

            // Dados académicos
            $table->string('student_number')->unique();

            $table->string('bi', 20)->unique();

            $table->string('phone')->nullable();

            $table->date('birth_date')->nullable();

            $table->enum('gender', [
                'Masculino',
                'Feminino'
            ])->nullable();

            $table->string('faculty')->nullable();

            $table->string('course')->nullable();

            $table->enum('status', [
                'Activo',
                'Inactivo'
            ])->default('Activo');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};

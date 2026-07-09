<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {

            $table->string('bi', 20)
                  ->unique()
                  ->nullable()
                  ->after('role');

            $table->string('phone', 20)
                  ->nullable()
                  ->after('bi');

            $table->date('birth_date')
                  ->nullable()
                  ->after('phone');

            $table->enum('gender', [
                'Masculino',
                'Feminino'
            ])
            ->nullable()
            ->after('birth_date');

            $table->enum('status', [
                'Activo',
                'Inactivo'
            ])
            ->default('Activo')
            ->after('gender');

        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {

            $table->dropColumn([
                'bi',
                'phone',
                'birth_date',
                'gender',
                'status'
            ]);

        });
    }
};
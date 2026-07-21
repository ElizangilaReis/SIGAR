<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {

            $table->id();

            $table->string('institution_name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('address')->nullable();

            $table->string('academic_year')->nullable();

            $table->string('language')->default('pt');
            $table->string('timezone')->default('Africa/Luanda');
            $table->string('currency')->default('AOA');

            $table->boolean('maintenance')->default(false);
            $table->boolean('registration')->default(true);
            $table->boolean('notifications')->default(true);

            $table->string('logo')->nullable();

            $table->timestamps();

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
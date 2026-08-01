<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            $table->string('receipt_path')->nullable()->after('status');
            $table->string('verification_code')->nullable()->after('receipt_path');
            $table->string('receipt_hash', 64)->nullable()->after('verification_code');
        });
    }

    public function down(): void
    {
        Schema::table('payments', function (Blueprint $table) {
            $table->dropColumn([
                'receipt_path',
                'verification_code',
                'receipt_hash',
            ]);
        });
    }

};

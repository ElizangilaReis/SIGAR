<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('document_requests', function (Blueprint $table) {
            $table->string('pdf_path')->nullable()->after('observations');
            $table->string('verification_code', 20)->nullable()->after('pdf_path');
            $table->string('document_hash', 64)->nullable()->after('verification_code');
            $table->timestamp('issued_at')->nullable()->after('document_hash');
        });
    }

    public function down(): void
    {
        Schema::table('document_requests', function (Blueprint $table) {
            $table->dropColumn([
                'pdf_path',
                'verification_code',
                'document_hash',
                'issued_at',
            ]);
        });
    }
};

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
        Schema::create('perjalanan_dinas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('asal_kota_id')->constrained('kota');
            $table->foreignId('tujuan_kota_id')->constrained('kota');
            $table->date('tanggal_berangkat');
            $table->date('tanggal_kembali');
            $table->text('keterangan')->nullable();
            $table->enum('status', ['pending', 'approve', 'rejected'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('perjalanan_dinas');
    }
};

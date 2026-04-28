<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('returns', function (Blueprint $table) {
            $table->id();
            // The exact order being refunded
            $table->foreignId('order_id')->constrained('orders')->cascadeOnDelete();
            // The cashier who initiated the refund
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            
            $table->string('reason');
            $table->string('refund_method');
            $table->string('status')->default('Under Inspection');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('returns');
    }
};
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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('product_name');
            $table->string('type')->default('Flower'); // NEW
            $table->longText('description');
            $table->decimal('wholesale_price', 10, 2)->nullable(); // NEW
            $table->integer('price'); // Keeping this as your Retail Price
            $table->integer('stocks')->default(0); // NEW: Forces 0 initially
            $table->string('image');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
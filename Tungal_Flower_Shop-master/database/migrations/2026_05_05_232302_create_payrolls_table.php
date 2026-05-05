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
        Schema::create('payrolls', function (Blueprint $table) {
            $table->id(); 
            $table->foreignId('employee_id')->constrained('users')->onDelete('cascade');
            $table->date('payroll_date');
            $table->string('salary_method')->default('Cash');
            $table->decimal('rate', 10, 2)->default(0);
            $table->decimal('days_worked', 8, 2)->default(0);
            $table->decimal('regular_ot', 10, 2)->default(0);
            $table->decimal('total_ot_pay', 10, 2)->default(0);
            $table->decimal('ecola', 10, 2)->default(0);
            $table->decimal('allowance', 10, 2)->default(0);
            $table->decimal('other_pay', 10, 2)->default(0);
            $table->decimal('gross_pay', 10, 2)->default(0);
            
            // NEW: Crucial for the Owner's Approvals Page
            $table->string('status')->default('Pending'); 
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payrolls');
    }
};
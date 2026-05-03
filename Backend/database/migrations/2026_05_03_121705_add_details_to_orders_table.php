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
        Schema::table('orders', function (Blueprint $table) {
            $table->text('message')->nullable()->after('status');
            $table->integer('order_number')->nullable()->after('restaurant_id');
            $table->string('reference')->nullable()->after('order_number');
            $table->string('payment_method')->nullable()->after('phone');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['message', 'order_number', 'reference', 'payment_method']);
        });
    }
};

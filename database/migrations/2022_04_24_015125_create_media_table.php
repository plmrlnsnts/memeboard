<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->nullableMorphs('model');
            $table->string('url', 2048);
            $table->integer('width');
            $table->integer('height');
            $table->string('type');
            $table->string('poster', 2048)->nullable();
            $table->boolean('has_audio')->default(false);
            $table->boolean('duration')->default(0);
            $table->timestamps();
        });
    }
};

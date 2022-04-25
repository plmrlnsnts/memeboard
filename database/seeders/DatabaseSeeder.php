<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Symfony\Component\Process\Process;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->create(array_map('trim', [
            'name' => tap(Process::fromShellCommandline('git config user.name'))->run()->getOutput(),
            'email' => tap(Process::fromShellCommandline('git config user.email'))->run()->getOutput(),
        ]));

        Schema::disableForeignKeyConstraints();

        DB::unprepared(file_get_contents(database_path('seeder.sql')));

        Schema::enableForeignKeyConstraints();
    }
}

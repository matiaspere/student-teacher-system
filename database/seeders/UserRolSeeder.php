<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class UserRolSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::table('user_rols')->insert([
            'description' => 'Teacher',
        ]);
        DB::table('user_rols')->insert([
            'description' => 'Student',
        ]);
    }
}

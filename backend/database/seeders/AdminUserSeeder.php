<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(

            [
                'email' => 'elisa.trifanica@gmail.com'
            ],

            [
                'name' => 'Administradora do Sistema',

                'email' => 'elisa.trifanica@gmail.com',

                'password' => Hash::make('Admin2026!'),

                'role' => 'admin',

                'bi' => '007333811LA041',

                'phone' => '936420139',

                'birth_date' => '1997-10-28',

                'gender' => 'Feminino',

                'status' => 'Activo',
            ]

        );
    }
}
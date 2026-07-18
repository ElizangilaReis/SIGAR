<?php

namespace Database\Seeders;

use App\Models\Faculty;
use Illuminate\Database\Seeder;

class FacultySeeder extends Seeder
{
    public function run(): void
    {
        $faculties = [

            [
                'name' => 'Faculdade de Engenharia e Novas Tecnologias',
                'code' => 'FENT',
                'abbreviation' => 'FENT',
                'description' => 'Faculdade responsável pelos cursos de Engenharia.',
                'active' => true
            ],

        ];

        foreach ($faculties as $faculty) {

            Faculty::updateOrCreate(

                ['code' => $faculty['code']],

                $faculty

            );

        }
    }
}
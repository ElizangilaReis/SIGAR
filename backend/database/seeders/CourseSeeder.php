<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Faculty;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        $courses = [

            // Engenharia

            [
                'faculty' => 'FENT',
                'name' => 'Engenharia Informática',
                'code' => 'EI'
            ],

            [
                'faculty' => 'FENT',
                'name' => 'Informática de Gestão',
                'code' => 'IG'
            ],

        ];

        foreach ($courses as $course) {

            $faculty = Faculty::where(

                'code',

                $course['faculty']

            )->first();

            Course::updateOrCreate(

                [

                    'code' => $course['code']

                ],

                [

                    'faculty_id' => $faculty->id,

                    'name' => $course['name'],

                    'code' => $course['code'],

                    'description' => null,

                    'active' => true

                ]

            );

        }
    }
}
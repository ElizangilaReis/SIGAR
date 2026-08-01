<?php

namespace Database\Seeders;

use App\Models\Student;
use App\Models\StudentGrade;
use Illuminate\Database\Seeder;

class StudentGradeSeeder extends Seeder
{
    public function run(): void
    {
        $student = Student::first();

        if (!$student) {
            return;
        }

        $grades = [

            [
                'discipline' => 'Álgebra Linear',
                'code' => 'MAT101',
                'semester' => 1,
                'credits' => 6,
                'grade' => 17.0,
            ],

            [
                'discipline' => 'Análise Matemática I',
                'code' => 'MAT102',
                'semester' => 1,
                'credits' => 6,
                'grade' => 18.0,
            ],

            [
                'discipline' => 'Fundamentos de Electrónica',
                'code' => 'ELT101',
                'semester' => 1,
                'credits' => 5,
                'grade' => 14.0,
            ],

            [
                'discipline' => 'Programação I',
                'code' => 'INF101',
                'semester' => 1,
                'credits' => 6,
                'grade' => 16.0,
            ],

            [
                'discipline' => 'Arquitectura de Computadores',
                'code' => 'INF102',
                'semester' => 2,
                'credits' => 5,
                'grade' => 15.0,
            ],

            [
                'discipline' => 'Bases de Dados',
                'code' => 'INF201',
                'semester' => 2,
                'credits' => 6,
                'grade' => 18.0,
            ],

            [
                'discipline' => 'Programação II',
                'code' => 'INF202',
                'semester' => 2,
                'credits' => 6,
                'grade' => 17.0,
            ],

            [
                'discipline' => 'Redes de Computadores',
                'code' => 'INF203',
                'semester' => 2,
                'credits' => 5,
                'grade' => 16.0,
            ],

        ];

        foreach ($grades as $grade) {

            StudentGrade::updateOrCreate(

                [
                    'student_id' => $student->id,
                    'code' => $grade['code'],
                ],

                $grade

            );

        }
    }
}

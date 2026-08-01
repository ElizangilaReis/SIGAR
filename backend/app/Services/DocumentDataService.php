<?php

namespace App\Services;

use App\Models\DocumentRequest;
use App\Models\Student;

class DocumentDataService
{
    public function getData(DocumentRequest $documentRequest): array
    {
        $documentRequest->load([
            'student.user',
            'student.course',
            'documentType'
        ]);

        $student = $documentRequest->student;

        return [
            'studentName' => $student->user->name,
            'bi' => $student->user->bi,
            'studentNumber' => $student->student_number,
            'course' => $student->course?->name,
            'faculty' => $student->course?->faculty?->name,
            'academicYear' => $student->academic_year,

            'average' => $this->calculateAverage($student),
            'totalCredits' => $student->grades()->sum('credits'),

            'disciplines' => $this->getDisciplines($student),
            'grades' => $this->getGrades($student),
            'programs' => $this->getPrograms($student),
            'equivalences' => $this->getEquivalences($student),

            'finalGrade' => $this->calculateAverage($student),

            'diplomaNumber' => 'DIP/' . date('Y') . '/' . str_pad($student->id, 5, '0', STR_PAD_LEFT),
            'registrationBook' => 'Livro 12',
            'registrationPage' => 'Folha ' . str_pad($student->id, 3, '0', STR_PAD_LEFT),
            'degree' => 'Licenciado',
            'completionDate' => now()->format('d/m/Y'),
            'rector' => 'Prof. Doutor João Manuel',
            'secretary' => 'Dra. Ana Ferreira',
        ];
    }

    private function calculateAverage(Student $student): float
    {
    return round(
    $student->grades()->avg('grade') ?? 0,
    1
    );
    }

    private function getDisciplines(Student $student): array
    {
    return $student->grades
    ->sortBy([
    ['semester', 'asc'],
    ['discipline', 'asc']
    ])
    ->map(function ($grade) {

            return [

                'name' => $grade->discipline,

                'semester' => $grade->semester . 'º',

                'credits' => $grade->credits,

                'grade' => number_format(
                    $grade->grade,
                    1
                ),

            ];

        })
        ->values()
        ->toArray();

    }

   private function getGrades(Student $student): array
    {
    return $student->grades
    ->map(function ($grade) {
            return [

                'discipline' => $grade->discipline,

                'value' => number_format(
                    $grade->grade,
                    1
                ),

            ];

        })
        ->values()
        ->toArray();
    }


    private function getPrograms(Student $student): array
    {
        return [
            [
                'discipline' => 'Álgebra Linear',
                'hours' => '60 horas',
                'objectives' => 'Desenvolver competências em álgebra matricial e espaços vectoriais.',
                'content' => 'Matrizes, determinantes, sistemas lineares, espaços vectoriais e transformações lineares.',
            ],
        ];
    }

    private function getEquivalences(Student $student): array
    {
        return [
            [
                'origin' => 'Matemática I',
                'equivalent' => 'Análise Matemática I',
            ],
        ];
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([

            AdminUserSeeder::class,

            FacultySeeder::class,

            CourseSeeder::class,

            DepartmentSeeder::class,

            PositionSeeder::class,

            DocumentTypeSeeder::class,

            StudentGradeSeeder::class,

        ]);

    }
}
<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $departments = [

            [
                'name' => 'Secretaria Académica',
                'code' => 'SAC',
                'description' => 'Gestão e processamento das solicitações de documentos académicos.',
                'active' => true,
            ],

            [
                'name' => 'Departamento Financeiro',
                'code' => 'FIN',
                'description' => 'Gestão e acompanhamento dos pagamentos associados aos serviços académicos.',
                'active' => true,
            ],

        ];

        foreach ($departments as $department) {

            Department::updateOrCreate(
                ['code' => $department['code']],
                $department
            );

        }
    }
}

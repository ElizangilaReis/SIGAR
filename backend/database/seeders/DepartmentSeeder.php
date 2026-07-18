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
                'name' => 'Reitoria',
                'code' => 'REIT',
                'description' => 'Órgão máximo de gestão da instituição.',
                'active' => true,
            ],

            [
                'name' => 'Secretaria Académica',
                'code' => 'SAC',
                'description' => 'Gestão dos processos académicos dos estudantes.',
                'active' => true,
            ],

            [
                'name' => 'Recursos Humanos',
                'code' => 'RH',
                'description' => 'Gestão dos funcionários e colaboradores.',
                'active' => true,
            ],

            [
                'name' => 'Financeiro',
                'code' => 'FIN',
                'description' => 'Gestão financeira da instituição.',
                'active' => true,
            ],

            [
                'name' => 'Tecnologias de Informação',
                'code' => 'TI',
                'description' => 'Gestão da infraestrutura tecnológica.',
                'active' => true,
            ],

            [
                'name' => 'Biblioteca',
                'code' => 'BIB',
                'description' => 'Serviços de biblioteca e documentação.',
                'active' => true,
            ],

            [
                'name' => 'Assuntos Estudantis',
                'code' => 'AE',
                'description' => 'Acompanhamento e apoio aos estudantes.',
                'active' => true,
            ],

            [
                'name' => 'Património',
                'code' => 'PAT',
                'description' => 'Gestão do património institucional.',
                'active' => true,
            ],

            [
                'name' => 'Investigação Científica',
                'code' => 'IC',
                'description' => 'Coordenação das actividades de investigação.',
                'active' => true,
            ],

            [
                'name' => 'Administração',
                'code' => 'ADM',
                'description' => 'Serviços administrativos gerais.',
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
<?php

namespace Database\Seeders;

use App\Models\Position;
use Illuminate\Database\Seeder;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $positions = [

            // REITORIA
            [
                'department_id' => 1,
                'name' => 'Reitor',
                'code' => 'REITOR',
                'description' => 'Responsável máximo da instituição.',
                'active' => true
            ],
            [
                'department_id' => 1,
                'name' => 'Vice-Reitor',
                'code' => 'VREITOR',
                'description' => 'Vice-Reitor da instituição.',
                'active' => true
            ],
            [
                'department_id' => 1,
                'name' => 'Secretário da Reitoria',
                'code' => 'SREITOR',
                'description' => 'Secretário da Reitoria.',
                'active' => true
            ],

            // SECRETARIA ACADÉMICA
            [
                'department_id' => 2,
                'name' => 'Director da Secretaria Académica',
                'code' => 'DIR_SA',
                'description' => 'Director da Secretaria Académica.',
                'active' => true
            ],
            [
                'department_id' => 2,
                'name' => 'Secretário Académico',
                'code' => 'SEC_ACAD',
                'description' => 'Responsável pelos processos académicos.',
                'active' => true
            ],
            [
                'department_id' => 2,
                'name' => 'Técnico Académico',
                'code' => 'TEC_ACAD',
                'description' => 'Técnico da Secretaria Académica.',
                'active' => true
            ],

            // RECURSOS HUMANOS
            [
                'department_id' => 3,
                'name' => 'Director de Recursos Humanos',
                'code' => 'DIR_RH',
                'description' => 'Director do Departamento de RH.',
                'active' => true
            ],
            [
                'department_id' => 3,
                'name' => 'Técnico de Recursos Humanos',
                'code' => 'TEC_RH',
                'description' => 'Técnico de RH.',
                'active' => true
            ],
            [
                'department_id' => 3,
                'name' => 'Assistente de Recursos Humanos',
                'code' => 'ASS_RH',
                'description' => 'Assistente de RH.',
                'active' => true
            ],

            // FINANCEIRO
            [
                'department_id' => 4,
                'name' => 'Director Financeiro',
                'code' => 'DIR_FIN',
                'description' => 'Director Financeiro.',
                'active' => true
            ],
            [
                'department_id' => 4,
                'name' => 'Contabilista',
                'code' => 'CONT',
                'description' => 'Contabilista.',
                'active' => true
            ],
            [
                'department_id' => 4,
                'name' => 'Tesoureiro',
                'code' => 'TES',
                'description' => 'Responsável pela tesouraria.',
                'active' => true
            ],

            // TECNOLOGIAS DE INFORMAÇÃO
            [
                'department_id' => 5,
                'name' => 'Director de TI',
                'code' => 'DIR_TI',
                'description' => 'Director de Tecnologias de Informação.',
                'active' => true
            ],
            [
                'department_id' => 5,
                'name' => 'Administrador de Sistemas',
                'code' => 'ADMIN_SYS',
                'description' => 'Administrador de Sistemas.',
                'active' => true
            ],
            [
                'department_id' => 5,
                'name' => 'Programador',
                'code' => 'DEV',
                'description' => 'Programador.',
                'active' => true
            ],
            [
                'department_id' => 5,
                'name' => 'Técnico de Informática',
                'code' => 'TEC_TI',
                'description' => 'Técnico de Informática.',
                'active' => true
            ],

            // BIBLIOTECA
            [
                'department_id' => 6,
                'name' => 'Bibliotecário',
                'code' => 'BIBLIO',
                'description' => 'Responsável pela biblioteca.',
                'active' => true
            ],
            [
                'department_id' => 6,
                'name' => 'Assistente de Biblioteca',
                'code' => 'ASS_BIB',
                'description' => 'Assistente da Biblioteca.',
                'active' => true
            ],

            // ASSUNTOS ESTUDANTIS
            [
                'department_id' => 7,
                'name' => 'Director de Assuntos Estudantis',
                'code' => 'DIR_AE',
                'description' => 'Director de Assuntos Estudantis.',
                'active' => true
            ],
            [
                'department_id' => 7,
                'name' => 'Técnico de Assuntos Estudantis',
                'code' => 'TEC_AE',
                'description' => 'Técnico de Assuntos Estudantis.',
                'active' => true
            ],

            // PATRIMÓNIO
            [
                'department_id' => 8,
                'name' => 'Gestor de Património',
                'code' => 'GEST_PAT',
                'description' => 'Gestor do Património.',
                'active' => true
            ],
            [
                'department_id' => 8,
                'name' => 'Técnico de Património',
                'code' => 'TEC_PAT',
                'description' => 'Técnico de Património.',
                'active' => true
            ],

            // INVESTIGAÇÃO CIENTÍFICA
            [
                'department_id' => 9,
                'name' => 'Director de Investigação',
                'code' => 'DIR_INV',
                'description' => 'Director de Investigação.',
                'active' => true
            ],
            [
                'department_id' => 9,
                'name' => 'Investigador',
                'code' => 'INVEST',
                'description' => 'Investigador.',
                'active' => true
            ],

            // ADMINISTRAÇÃO
            [
                'department_id' => 10,
                'name' => 'Administrador',
                'code' => 'ADMIN',
                'description' => 'Administrador.',
                'active' => true
            ],
            [
                'department_id' => 10,
                'name' => 'Assistente Administrativo',
                'code' => 'ASS_ADMIN',
                'description' => 'Assistente Administrativo.',
                'active' => true
            ],

        ];

        foreach ($positions as $position) {

            Position::updateOrCreate(

                ['code' => $position['code']],

                $position

            );

        }
    }
}
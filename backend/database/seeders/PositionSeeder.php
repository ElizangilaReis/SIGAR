<?php

namespace Database\Seeders;

use App\Models\Department;
use App\Models\Position;
use Illuminate\Database\Seeder;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $secretariaAcademica = Department::where('code', 'SAC')->firstOrFail();
        $financeiro = Department::where('code', 'FIN')->firstOrFail();

        $positions = [

            // SECRETARIA ACADÉMICA
            [
                'department_id' => $secretariaAcademica->id,
                'name' => 'Director da Secretaria Académica',
                'code' => 'DIR_SAC',
                'description' => 'Responsável pela coordenação e supervisão dos processos de documentos académicos.',
                'active' => true,
            ],

            [
                'department_id' => $secretariaAcademica->id,
                'name' => 'Secretário Académico',
                'code' => 'SEC_ACAD',
                'description' => 'Responsável pelo atendimento e acompanhamento dos processos académicos.',
                'active' => true,
            ],

            [
                'department_id' => $secretariaAcademica->id,
                'name' => 'Técnico Académico',
                'code' => 'TEC_ACAD',
                'description' => 'Responsável pelo processamento e tratamento das solicitações de documentos académicos.',
                'active' => true,
            ],

            // DEPARTAMENTO FINANCEIRO
            [
                'department_id' => $financeiro->id,
                'name' => 'Director Financeiro',
                'code' => 'DIR_FIN',
                'description' => 'Responsável pela coordenação e supervisão dos processos financeiros.',
                'active' => true,
            ],

            [
                'department_id' => $financeiro->id,
                'name' => 'Tesoureiro',
                'code' => 'TES',
                'description' => 'Responsável pelo acompanhamento e controlo dos pagamentos.',
                'active' => true,
            ],

            [
                'department_id' => $financeiro->id,
                'name' => 'Técnico Financeiro',
                'code' => 'TEC_FIN',
                'description' => 'Responsável pelo registo, acompanhamento e validação dos pagamentos.',
                'active' => true,
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

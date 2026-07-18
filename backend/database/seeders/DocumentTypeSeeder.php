<?php

namespace Database\Seeders;

use App\Models\DocumentType;
use Illuminate\Database\Seeder;

class DocumentTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $documents = [

            [
                'name' => 'Declaração de Matrícula',
                'code' => 'DEC_MAT',
                'price' => 2500,
                'processing_days' => 2,
                'description' => 'Declaração que comprova a matrícula do estudante.',
                'active' => true,
            ],

            [
                'name' => 'Declaração de Frequência',
                'code' => 'DEC_FREQ',
                'price' => 2500,
                'processing_days' => 2,
                'description' => 'Declaração que comprova a frequência do estudante.',
                'active' => true,
            ],

            [
                'name' => 'Histórico Académico',
                'code' => 'HIST',
                'price' => 5000,
                'processing_days' => 5,
                'description' => 'Histórico completo das disciplinas e classificações.',
                'active' => true,
            ],

            [
                'name' => 'Certificado de Notas',
                'code' => 'CERT_NOTAS',
                'price' => 4000,
                'processing_days' => 4,
                'description' => 'Certificado oficial de notas.',
                'active' => true,
            ],

            [
                'name' => 'Programa das Disciplinas',
                'code' => 'PROG_DISC',
                'price' => 3500,
                'processing_days' => 4,
                'description' => 'Conteúdo programático das disciplinas.',
                'active' => true,
            ],

            [
                'name' => 'Certificado de Conclusão',
                'code' => 'CERT_CONC',
                'price' => 10000,
                'processing_days' => 7,
                'description' => 'Certificado de conclusão do curso.',
                'active' => true,
            ],

            [
                'name' => 'Diploma',
                'code' => 'DIPLOMA',
                'price' => 30000,
                'processing_days' => 30,
                'description' => 'Diploma oficial emitido pela instituição.',
                'active' => true,
            ],

            [
                'name' => '2ª Via do Cartão de Estudante',
                'code' => 'CARTAO2V',
                'price' => 5000,
                'processing_days' => 3,
                'description' => 'Emissão da segunda via do cartão.',
                'active' => true,
            ],

            [
                'name' => 'Carta de Recomendação',
                'code' => 'CARTA_REC',
                'price' => 5000,
                'processing_days' => 5,
                'description' => 'Carta de recomendação emitida pela instituição.',
                'active' => true,
            ],

            [
                'name' => 'Equivalência',
                'code' => 'EQUIV',
                'price' => 15000,
                'processing_days' => 10,
                'description' => 'Processo de equivalência de disciplinas.',
                'active' => true,
            ],

        ];

        foreach ($documents as $document) {

            DocumentType::updateOrCreate(

                ['code' => $document['code']],

                $document

            );

        }
    }
}
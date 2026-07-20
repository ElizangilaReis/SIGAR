<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Payment;
use App\Models\DocumentRequest;

class PaymentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $requests = DocumentRequest::all();

        foreach ($requests as $request) {

            Payment::create([

                'document_request_id' => $request->id,

                'student_id' => $request->student_id,

                'amount' => $request->documentType->price,

                'payment_method' => 'Referência',

                'status' => 'Pendente',

                'expiry_date' => now()->addDays(3)

            ]);

        }
    }
}
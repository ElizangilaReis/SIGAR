<?php

namespace App\Services;

use App\Models\Payment;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class PaymentReceiptService
{
    public function generate(Payment $payment): string
    {
        $payment->load([
            'student.user',
            'student.course.faculty',
            'documentRequest.documentType',
        ]);

        $verificationCode = strtoupper(Str::random(10));

        $verificationUrl = config('app.url') .
            '/verificar-recibo/' .
            $verificationCode;

        $qrCode = base64_encode(
            QrCode::format('svg')
                ->size(180)
                ->margin(1)
                ->generate($verificationUrl)
        );

        $pdf = Pdf::loadView('payments.receipt', [
            'payment' => $payment,
            'verificationCode' => $verificationCode,
            'verificationUrl' => $verificationUrl,
            'qrCode' => $qrCode,
        ])->setPaper('a4');

        $path = 'receipts/' . $payment->reference . '.pdf';

        Storage::disk('public')->put(
            $path,
            $pdf->output()
        );

        $payment->update([
            'receipt_path' => $path,
            'verification_code' => $verificationCode,
            'receipt_hash' => hash(
                'sha256',
                $pdf->output()
            ),
        ]);

        return $path;
    }
}

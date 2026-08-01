<?php

namespace App\Services;

use App\Models\Notification;
use App\Models\User;

class NotificationService
{
    public static function notifyUser(
        int $userId,
        string $title,
        string $message
    ): void {
        Notification::create([
            'user_id' => $userId,
            'title' => $title,
            'message' => $message,
            'read' => false,
        ]);
    }

    public static function notifyEmployees(
        string $title,
        string $message
    ): void {
        User::where('role', 'employee')
            ->get()
            ->each(function ($employee) use ($title, $message) {
                self::notifyUser(
                    $employee->id,
                    $title,
                    $message
                );
            });
    }

    public static function notifyAdmins(
        string $title,
        string $message
    ): void {
        User::where('role', 'admin')
            ->get()
            ->each(function ($admin) use ($title, $message) {
                self::notifyUser(
                    $admin->id,
                    $title,
                    $message
                );
            });
    }
}
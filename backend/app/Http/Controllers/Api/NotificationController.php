<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Notification;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        return response()->json([
            'success' => true,
            'data' => Notification::where('user_id', $request->user()->id)
                ->latest()
                ->get()
        ]);
    }

    public function markAsRead(Notification $notification)
    {
        $notification->update(['read' => true]);

        return response()->json(['success' => true]);
    }
}

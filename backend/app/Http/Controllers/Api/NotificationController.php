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
            'data' => Notification::where(
                'user_id',
                $request->user()->id
            )
                ->latest()
                ->get(),
        ]);
    }

    public function unreadCount(Request $request)
    {
        $count = Notification::where(
            'user_id',
            $request->user()->id
        )
            ->where('read', false)
            ->count();

        return response()->json([
            'success' => true,
            'data' => [
                'count' => $count,
            ],
        ]);
    }

    public function markAsRead(
        Request $request,
        Notification $notification
    ) {
        if (
            $notification->user_id !==
            $request->user()->id
        ) {
            abort(403);
        }

        $notification->update([
            'read' => true,
        ]);

        return response()->json([
            'success' => true,
        ]);
    }

    public function markAllAsRead(Request $request)
    {
        Notification::where(
            'user_id',
            $request->user()->id
        )
            ->where('read', false)
            ->update([
                'read' => true,
            ]);

        return response()->json([
            'success' => true,
        ]);
    }
}
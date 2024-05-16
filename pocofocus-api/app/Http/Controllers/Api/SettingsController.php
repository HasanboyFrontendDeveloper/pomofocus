<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Settings;
class SettingsController extends Controller
{

   public function show()
    {
        $user = auth()->user();
        $timerSettings = $user->timerSettings; // Assuming you have a one-to-one relationship between users and timer settings
        return response()->json($timerSettings);
    }


    public function update(Request $request)
    {
        $user = auth()->user();
        $timerSettings = $user->timerSettings;

        // Validate request data
        $validatedData = $request->validate([
            'pomodoro_duration' => 'required|integer|min:1',
            'short_break_duration' => 'required|integer|min:1',
            'long_break_duration' => 'required|integer|min:1',
            // Add validation rules for other settings
        ]);

        // Update timer settings
        $timerSettings->update($validatedData);

        return response()->json($timerSettings);
    }
}

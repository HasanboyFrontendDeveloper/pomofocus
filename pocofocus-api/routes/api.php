<?php

use App\Models\Settings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
         /*
Route::prefix('settings')->group(function (){
    Route::get('/', [SettingsController::class, 'index']);
    Route::post('/', [SettingsController::class, 'store']);
    Route::get('/{id}', [SettingsController::class, 'show']);
    Route::put('/{id}', [SettingsController::class, 'update']);
    Route::delete('/{id}', [SettingsController::class, 'destroy']);
});     */

    Route::get('/settings', 'SettingsController@show')->middleware('auth');
    Route::put('/settings', 'SettingsController@show')->middleware('auth');

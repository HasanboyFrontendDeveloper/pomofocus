<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Settings extends Model
{
    use HasFactory;
    protected $fillable = [
        'pomodoro_duration',
        'short_break_duration',
        'long_break_duration',
        // Add other fillable attributes
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

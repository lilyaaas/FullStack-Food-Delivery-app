<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Side extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'price' => 'float',
    ];
}

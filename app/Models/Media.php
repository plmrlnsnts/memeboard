<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    use HasFactory;

    public const ACCEPTED_MIMETYPES = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'video/mp4',
        'video/webm',
        'video/quicktime',
        'video/x-m4v',
    ];

    protected $casts = [
        'has_audio' => 'boolean',
    ];

    public function model()
    {
        return $this->morphTo();
    }
}

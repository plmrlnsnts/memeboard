<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $appends = [
        'profile_photo_url',
    ];

    public function getProfilePhotoUrlAttribute()
    {
        return sprintf(
            'https://source.boringavatars.com/beam/120/%s?colors=%s',
            urlencode($this->email),
            'FFAD08,EDD75A,73B06F,0C8F8F,405059'
        );
    }
}

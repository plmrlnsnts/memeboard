<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reply extends Model
{
    use HasFactory, HasVotes, HasMedia;

    public static function booted()
    {
        static::created(function (self $reply) {
            $reply->post->update(['replies_count' => $reply->post->replies()->count()]);
            $reply->parent?->update(['replies_count' => $reply->parent->replies()->count()]);
        });

        static::deleted(function (self $reply) {
            $reply->post->update(['replies_count' => $reply->post->replies()->count()]);
            $reply->parent?->update(['replies_count' => $reply->parent->replies()->count()]);
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    public function parent()
    {
        return $this->belongsTo(static::class);
    }

    public function replies()
    {
        return $this->hasMany(static::class, 'parent_id');
    }
}

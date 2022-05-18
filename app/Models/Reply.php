<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reply extends Model
{
    use HasFactory, HasVotes, HasMedia;

    public static function booted()
    {
        static::created(fn (Reply $reply) => $reply->post->update([
            'replies_count' => $reply->post->replies()->count(),
        ]));

        static::deleted(fn (Reply $reply) => $reply->post->update([
            'replies_count' => $reply->post->replies()->count(),
        ]));
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}

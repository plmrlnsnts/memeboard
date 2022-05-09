<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    use HasFactory;

    public function voteable()
    {
        return $this->morphTo();
    }

    public static function booted()
    {
        static::saved(fn (Vote $vote) => $vote->voteable->update([
            'upvotes_count' => $vote->voteable->votes()->where('score', 1)->count(),
            'downvotes_count' => $vote->voteable->votes()->where('score', -1)->count(),
        ]));

        static::deleted(fn (Vote $vote) => $vote->voteable->update([
            'upvotes_count' => $vote->voteable->votes()->where('score', 1)->count(),
            'downvotes_count' => $vote->voteable->votes()->where('score', -1)->count(),
        ]));
    }
}

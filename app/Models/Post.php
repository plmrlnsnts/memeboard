<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Vinkla\Hashids\Facades\Hashids;

class Post extends Model
{
    use HasFactory, HasMedia, HasVotes;

    public static function booted()
    {
        static::created(fn (Post $post) => (
            $post->update(['hashid' => Hashids::encode($post->id)])
        ));
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    public function votes()
    {
        return $this->morphMany(Vote::class, 'voteable');
    }

    public static function stream($perPage = 5)
    {
        return self::query()
            ->with(['category', 'media'])
            ->when(auth()->check(), fn ($q) => $q->with('personalVote'))
            ->latest('id')
            ->cursorPaginate($perPage);
    }

    public static function featured()
    {
        return self::query()
            ->with(['category', 'media'])
            ->whereIn('id', FeaturedPost::pluck('id'))
            ->get()
            ->shuffle();
    }
}

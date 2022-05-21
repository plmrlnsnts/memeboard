<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\CursorPaginator;
use Vinkla\Hashids\Facades\Hashids;

class Post extends Model
{
    use HasFactory, HasMedia, HasVotes;

    public static function booted()
    {
        static::created(fn (Post $post) => $post->update([
            'hashid' => Hashids::encode($post->id),
        ]));
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    public function replies()
    {
        return $this->hasMany(Reply::class);
    }

    public function resolveRouteBindingQuery($query, $value, $field = null)
    {
        return $query->where($field ?? $this->getRouteKeyName(), $value)
            ->when(auth()->check(), fn ($q) => $q->with('personalVote'))
            ->with('replies', fn ($q) => $q->with(['user', 'media', 'personalVote'])->latest('id'))
            ->with(['category', 'media']);
    }

    public static function stream($offset = null): CursorPaginator
    {
        return static::query()
            ->when(auth()->check(), fn ($q) => $q->with('personalVote'))
            ->when($offset, fn ($q) => $q->where('id', '<', $offset))
            ->with(['category', 'media'])
            ->latest('id')
            ->cursorPaginate(5);
    }

    public static function featured()
    {
        return static::query()
            ->with(['category', 'media'])
            ->whereIn('id', FeaturedPost::pluck('id'))
            ->get()
            ->shuffle()
            ->take(12);
    }
}

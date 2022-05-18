<?php

namespace App\Models;

trait HasVotes
{
    public function votes()
    {
        return $this->morphMany(Vote::class, 'voteable');
    }

    public function personalVote()
    {
        return $this->morphOne(Vote::class, 'voteable')->where('user_id', auth()->id());
    }

    public function vote($score, $user = null)
    {
        $user ??= auth()->user();

        $this->votes()->updateOrCreate(['user_id' => $user->id], compact('score'));
    }

    public function upvote($user = null)
    {
        $this->vote(1, $user);
    }

    public function downvote($user = null)
    {
        $this->vote(-1, $user);
    }

    public function unvote($user = null)
    {
        $user ??= auth()->user();

        $this->votes()->where('user_id', $user->id)->delete();
    }
}

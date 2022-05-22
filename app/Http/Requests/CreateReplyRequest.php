<?php

namespace App\Http\Requests;

use App\Models\Post;
use App\Models\Reply;
use Illuminate\Foundation\Http\FormRequest;

class CreateReplyRequest extends FormRequest
{
    public function rules()
    {
        return [
            'parent_id' => 'nullable|exists:replies,id',
            'body' => 'required|string|max:512',
        ];
    }

    public function save(Post $post): Reply
    {
        return $post->replies()->create([
            'user_id' => $this->user()->id,
            'parent_id' => $this->parent_id,
            'body' => $this->body,
        ]);
    }
}

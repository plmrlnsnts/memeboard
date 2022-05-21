<?php

namespace App\Http\Requests;

use App\Models\Post;
use App\Models\Reply;
use Illuminate\Foundation\Http\FormRequest;

class CreateCommentRequest extends FormRequest
{
    public function rules()
    {
        return [
            'body' => 'required|string|max:512',
        ];
    }

    public function save(Post $post): Reply
    {
        return $post->replies()->create([
            'user_id' => $this->user()->id,
            'body' => $this->body,
        ]);
    }
}

<?php

namespace App\Http\Requests;

use App\Models\Post;
use App\Models\Reply;
use App\Rules\AcceptedMimetypeRule;
use Illuminate\Foundation\Http\FormRequest;

class CreateCommentRequest extends FormRequest
{
    public function rules()
    {
        return [
            'body' => 'required|string|max:512',
            'media' => ['nullable', new AcceptedMimetypeRule],
        ];
    }

    public function save(Post $post): Reply
    {
        return tap($post->replies()->create([
            'user_id' => $this->user()->id,
            'body' => $this->body,
        ]), fn (Reply $reply) => $this->whenHas('media', fn () => (
            $reply->addMedia($this->file('media'))
        )));
    }
}

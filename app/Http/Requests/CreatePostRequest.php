<?php

namespace App\Http\Requests;

use App\Models\Post;
use App\Rules\AcceptedMimetypeRule;
use Illuminate\Foundation\Http\FormRequest;

class CreatePostRequest extends FormRequest
{
    public function rules()
    {
        return [
            'category_id' => 'required|exists:categories,id',
            'title' => 'required|string|max:256',
            'media' => ['required', new AcceptedMimetypeRule],
        ];
    }

    public function save(): Post
    {
        return tap(Post::create([
            'user_id' => $this->user()->id,
            'category_id' => $this->category_id,
            'title' => $this->title,
            'type' => str($this->file('media')->getMimeType())->is('image*') ? 'photo' : 'animated',
        ]))->addMedia($this->file('media'));
    }
}

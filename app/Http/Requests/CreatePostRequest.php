<?php

namespace App\Http\Requests;

use App\Models\Post;
use Illuminate\Foundation\Http\FormRequest;

class CreatePostRequest extends FormRequest
{
    public const ACCEPTED_MIMETYPES = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'video/mp4',
        'video/webm',
        'video/quicktime',
        'video/x-m4v',
    ];

    public function rules()
    {
        return [
            'category_id' => 'required|exists:categories,id',
            'title' => 'required|string|max:250',
            'media' => ['required', 'mimetypes:'.implode(',', static::ACCEPTED_MIMETYPES)],
        ];
    }

    public function save(): Post
    {
        return tap(Post::create([
            'category_id' => $this->category_id,
            'title' => $this->title,
            'type' => $this->type(),
        ]))->addMedia($this->file('media'));
    }

    protected function type()
    {
        return str($this->file('media')->getMimeType())->is('image*') ? 'photo' : 'animated';
    }
}

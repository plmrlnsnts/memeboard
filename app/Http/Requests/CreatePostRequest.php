<?php

namespace App\Http\Requests;

use App\Models\Media;
use App\Models\Post;
use Illuminate\Foundation\Http\FormRequest;

class CreatePostRequest extends FormRequest
{
    public function rules()
    {
        return [
            'category_id' => 'required|exists:categories,id',
            'title' => 'required|string|max:256',
            'media_ids' => 'required|array|min:1',
            'media_ids.*' => 'required|exists:media,id',
        ];
    }

    public function messages()
    {
        return [
            'media_ids.required' => 'An image or video is required.',
        ];
    }

    public function save(): Post
    {
        $media = Media::find($this->media_ids);

        return tap(Post::create([
            'user_id' => $this->user()->id,
            'category_id' => $this->category_id,
            'title' => $this->title,
            'type' => $media->contains(fn ($m) => $m->type === 'video') ? 'animated' : 'photo',
        ]), function (Post $post) use ($media) {
            $media->each->update([
                'model_id' => $post->id,
                'model_type' => get_class($post),
            ]);
        });
    }
}

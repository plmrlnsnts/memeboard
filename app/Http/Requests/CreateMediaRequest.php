<?php

namespace App\Http\Requests;

use App\Models\Media;
use Illuminate\Foundation\Http\FormRequest;

class CreateMediaRequest extends FormRequest
{
    public function rules()
    {
        return [
            'type' => 'required|in:image,video',
            'url' => 'required|url',
            'width' => 'required|integer',
            'height' => 'required|integer',
            'duration' => 'nullable|numeric',
            'has_audio' => 'required|boolean',
        ];
    }

    public function save(): Media
    {
        return Media::create($this->validated());
    }
}

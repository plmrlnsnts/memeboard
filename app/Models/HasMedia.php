<?php

namespace App\Models;

use CloudinaryLabs\CloudinaryLaravel\CloudinaryEngine;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\UploadedFile;

trait HasMedia
{
    public function media()
    {
        return $this->morphMany(Media::class, 'model');
    }

    public function addMedia(UploadedFile $file)
    {
        return str($file->getMimeType())->startsWith('image')
            ? $this->addImageMedia($file)
            : $this->addVideoMedia($file);
    }

    public function addImageMedia(UploadedFile $file)
    {
        $result = $this->uploadMedia($file);

        return $this->media()->create([
            'type' => 'image',
            'url' => $result->getSecurePath(),
            'width' => $result->getWidth(),
            'height' => $result->getHeight(),
        ]);
    }

    public function addVideoMedia(UploadedFile $file)
    {
        $result = $this->uploadMedia($file, [
            'resource_type' => 'video',
            'image_metadata' => true,
        ]);

        $this->media()->create([
            'type' => 'image',
            'url' => str($result->getSecurePath())->beforeLast('.')->append('.jpg'),
            'width' => $result->getWidth(),
            'height' => $result->getHeight(),
        ]);

        $this->media()->create([
            'type' => 'video',
            'url' => $result->getSecurePath(),
            'width' => $result->getWidth(),
            'height' => $result->getHeight(),
            'duration' => $result->getResponse()['duration'],
            'has_audio' => ! empty($result->getResponse()['audio']),
        ]);
    }

    protected function uploadMedia(UploadedFile $file, $options = []): CloudinaryEngine
    {
        return Cloudinary::upload($file->getRealPath(), $options);
    }
}

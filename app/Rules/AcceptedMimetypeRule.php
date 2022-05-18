<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Validation\Concerns\ValidatesAttributes;

class AcceptedMimetypeRule implements Rule
{
    use ValidatesAttributes;

    public const MIMETYPES = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'video/mp4',
        'video/webm',
        'video/quicktime',
        'video/x-m4v',
    ];

    public function passes($attribute, $value)
    {
        return $this->validateMimetypes($attribute, $value, static::MIMETYPES);
    }

    public function message()
    {
        return 'The chosen file is not valid.';
    }
}

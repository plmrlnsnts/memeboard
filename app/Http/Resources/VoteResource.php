<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class VoteResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'score' => $this->score,
        ];
    }
}

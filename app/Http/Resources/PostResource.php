<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'category_id' => $this->category_id,
            'type' => $this->type,
            'title' => $this->title,
            'upvotes_count' => $this->upvotes_count,
            'downvotes_count' => $this->downvotes_count,
            'comments_count' => $this->comments_count,
            'nsfw' => $this->nsfw,
            'created_at' => $this->created_at,
            'category' => new CategoryResource($this->whenLoaded('category')),
            'media' => MediaResource::collection($this->whenLoaded('media')),
            'personal_vote' => new VoteResource($this->whenLoaded('personalVote')),
            'links' => [
                'show' => route('posts.show', $this->hashid),
            ],
        ];
    }
}

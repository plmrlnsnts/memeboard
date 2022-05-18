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
            'replies_count' => $this->replies_count,
            'nsfw' => $this->nsfw,
            'created_at' => $this->created_at,
            'category' => new CategoryResource($this->whenLoaded('category')),
            'personal_vote' => new VoteResource($this->whenLoaded('personalVote')),
            'media' => MediaResource::collection($this->whenLoaded('media')),
            'replies' => ReplyResource::collection($this->whenLoaded('replies')),
            'links' => [
                'show' => route('posts.show', $this->hashid),
                'comment' => route('posts.comments.create', $this->hashid),
                'next' => route('api.posts.next', $this->id),
                'upvote' => route('api.posts.upvote', $this->id),
                'downvote' => route('api.posts.downvote', $this->id),
                'unvote' => route('api.posts.unvote', $this->id),
            ],
        ];
    }
}

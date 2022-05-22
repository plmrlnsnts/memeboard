<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReplyResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'post_id' => $this->post_id,
            'parent_id' => $this->parent_id,
            'body' => $this->body,
            'upvotes_count' => $this->upvotes_count,
            'downvotes_count' => $this->downvotes_count,
            'replies_count' => $this->replies_count,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'user' => new UserResource($this->whenLoaded('user')),
            'personal_vote' => new VoteResource($this->whenLoaded('personalVote')),
            'media' => MediaResource::collection($this->whenLoaded('media')),
            'links' => [
                'upvote' => route('api.replies.upvote', $this->id),
                'downvote' => route('api.replies.downvote', $this->id),
                'unvote' => route('api.replies.unvote', $this->id),
            ],
        ];
    }
}

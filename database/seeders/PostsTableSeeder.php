<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\FeaturedPost;
use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class PostsTableSeeder extends Seeder
{
    public function run()
    {
        collect(json_decode(file_get_contents(database_path('posts.json')), true))
            ->shuffle()
            ->map(fn ($input) => $this->createPost($input))
            ->shuffle()->take(40)
            ->each(fn ($post) => FeaturedPost::create(['post_id' => $post->id]));
    }

    protected function createPost($input)
    {
        $post = Post::create([
            'user_id' => User::factory()->create()->id,
            'category_id' => Category::firstOrCreate(
                ['name' => data_get($input, 'postSection.name')],
                ['thumbnail' => data_get($input, 'postSection.imageUrl')]
            )->id,
            'title' => $input['title'],
            'type' => strtolower($input['type']),
            'nsfw' => (bool) $input['nsfw'],
            'upvotes_count' => $input['upVoteCount'],
            'downvotes_count' => $input['downVoteCount'],
            'replies_count' => $input['commentsCount'],
            'created_at' => Carbon::parse($input['creationTs'])->toDateTimeString(),
            'updated_at' => Carbon::parse($input['creationTs'])->toDateTimeString(),
        ]);

        $post->tags()->attach(
            collect($input['tags'])
                ->map(fn ($tag) => Tag::firstOrCreate(['name' => $tag['key']]))
                ->pluck('id')
        );

        $post->media()->create([
            'type' => 'image',
            'width' => data_get($input, 'images.image460.width'),
            'height' => data_get($input, 'images.image460.height'),
            'url' => data_get($input, 'images.image460.url'),
        ]);

        if ($post->type === 'animated') {
            $post->media()->create([
                'type' => 'video',
                'width' => data_get($input, 'images.image460sv.width'),
                'height' => data_get($input, 'images.image460sv.height'),
                'url' => data_get($input, 'images.image460sv.url'),
                'has_audio' => data_get($input, 'images.image460sv.hasAudio'),
                'duration' => data_get($input, 'images.image460sv.duration'),
            ]);
        }

        return $post;
    }
}

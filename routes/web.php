<?php

use App\Http\Requests\CreateCommentRequest;
use App\Http\Requests\CreatePostRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\PostResource;
use App\Models\Category;
use App\Models\Post;
use App\Models\Reply;
use App\Rules\AcceptedMimetypeRule;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', fn () => inertia('welcome', [
    'categories' => CategoryResource::collection(Category::all()),
    'posts' => PostResource::collection(Post::stream()),
]))->name('home');

Route::get('/api/posts', fn () => (
    PostResource::collection(Post::stream())
))->name('api.posts');

Route::get('/api/posts/featured', fn () => (
    PostResource::collection(Post::featured())
))->name('api.posts.featured');

Route::get('/api/posts/{post}/next', fn (Post $post) => (
    PostResource::collection(Post::stream($post->id))
))->name('api.posts.next');

Route::post('/api/posts/{post}/upvote', fn (Post $post) => (
    tap(response()->noContent(), fn () => $post->upvote())
))
    ->middleware(['auth', 'verified'])
    ->name('api.posts.upvote');

Route::post('/api/posts/{post}/downvote', fn (Post $post) => (
    tap(response()->noContent(), fn () => $post->downvote())
))
    ->middleware(['auth', 'verified'])
    ->name('api.posts.downvote');

Route::delete('/api/posts/{post}/unvote', fn (Post $post) => (
    tap(response()->noContent(), fn () => $post->unvote())
))
    ->middleware(['auth', 'verified'])
    ->name('api.posts.unvote');

Route::post('/api/replies/{reply}/upvote', fn (Reply $reply) => (
    tap(response()->noContent(), fn () => $reply->upvote())
))
    ->middleware(['auth', 'verified'])
    ->name('api.replies.upvote');

Route::post('/api/replies/{reply}/downvote', fn (Reply $reply) => (
    tap(response()->noContent(), fn () => $reply->downvote())
))
    ->middleware(['auth', 'verified'])
    ->name('api.replies.downvote');

Route::delete('/api/replies/{reply}/unvote', fn (Reply $reply) => (
    tap(response()->noContent(), fn () => $reply->unvote())
))
    ->middleware(['auth', 'verified'])
    ->name('api.replies.unvote');

Route::get('/posts/new', fn () => inertia('posts/create', [
    'categories' => CategoryResource::collection(Category::all()),
    'accepted_media' => AcceptedMimetypeRule::MIMETYPES,
]))
    ->middleware(['auth', 'verified'])
    ->name('posts.create');

Route::post('/posts', fn (CreatePostRequest $request) => (
    tap(redirect('/'), fn () => $request->save()
)))->middleware(['auth', 'verified']);

Route::get('/posts/{post:hashid}', fn (Post $post) => inertia('posts/show', [
    'categories' => CategoryResource::collection(Category::all()),
    'next_posts' => PostResource::collection(Post::stream($post->id)),
    'post' => new PostResource($post),
]))->name('posts.show');

Route::post('/posts/{post:hashid}/comments', fn (Post $post, CreateCommentRequest $request) => (
    tap(back(), fn () => $request->save($post)
)))
    ->middleware(['auth', 'verified'])
    ->name('posts.comments.create');

require __DIR__.'/auth.php';

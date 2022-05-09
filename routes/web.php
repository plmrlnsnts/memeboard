<?php

use App\Http\Requests\CreatePostRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\PostResource;
use App\Models\Category;
use App\Models\Post;
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
    'featured_posts' => PostResource::collection(Post::featured()),
    'posts' => PostResource::collection(Post::stream()),
]))->name('home');

Route::get('/api/posts', fn () => (
    PostResource::collection(Post::stream())
))->name('api.posts');

Route::get('/posts/new', fn () => inertia('posts/create', [
    'categories' => CategoryResource::collection(Category::all()),
    'accepted_media' => CreatePostRequest::ACCEPTED_MIMETYPES,
]))
    ->middleware(['auth', 'verified'])
    ->name('posts.create');

Route::post('/posts', fn (CreatePostRequest $request) => (
    tap(redirect('/'), fn () => $request->save()
)))->middleware(['auth', 'verified']);

Route::get('/posts/{post:hashid}', fn (Post $post) => inertia('posts/show', [
    'categories' => CategoryResource::collection(Category::all()),
    'featured_posts' => PostResource::collection(Post::featured()),
    'post' => new PostResource($post->load(['category', 'media'])),
]))->name('posts.show');

Route::post('/api/posts/{post}/upvote', fn (Post $post) => (
    tap(response()->noContent(), $post->upvote())
))
    ->middleware(['auth', 'verified'])
    ->name('api.posts.upvote');

Route::post('/api/posts/{post}/downvote', fn (Post $post) => (
    tap(response()->noContent(), $post->downvote())
))
    ->middleware(['auth', 'verified'])
    ->name('api.posts.downvote');

Route::delete('/posts/{post}/unvote', fn (Post $post) => (
    tap(response()->noContent(), $post->unvote())
))
    ->middleware(['auth', 'verified'])
    ->name('api.posts.unvote');

require __DIR__.'/auth.php';

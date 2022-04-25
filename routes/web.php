<?php

use App\Models\Category;
use App\Models\Post;
use Carbon\Carbon;
use Illuminate\Foundation\Application;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
    'categories' => Category::all(),
    'posts' => Post::with(['category', 'media'])->cursorPaginate(5),
    'featured_posts' => json_decode(file_get_contents(resource_path('json/featured-posts.json'))),
]));

Route::get('/api/posts', fn () => Post::with(['category', 'media'])->cursorPaginate(5))
    ->name('posts.index');

Route::get('/dashboard', fn () => inertia('dashboard'))
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

require __DIR__.'/auth.php';

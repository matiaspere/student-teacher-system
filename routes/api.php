<?php

use App\Http\Controllers\HomeControler;
use App\Http\Controllers\EvaluationController;
use App\Http\Controllers\ListingController;
use App\Http\Controllers\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;

use App\Http\Controllers\RolesController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


// Autenticacion
Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('login', 'App\Http\Controllers\AuthController@login');
    Route::post('logout', 'App\Http\Controllers\AuthController@logout');
    Route::post('refresh', 'App\Http\Controllers\AuthController@refresh');
    Route::get('user', 'App\Http\Controllers\AuthController@user');
    Route::post('signup', 'App\Http\Controllers\AuthController@signup');
});

// Roles
Route::get('/roles', [RolesController::class, 'index']);

// Usuarios
Route::get('/users/{user_rols_id}/{paginate}', [UsersController::class, 'index']);
Route::get('/students', [UsersController::class, 'getStudents']);

// Listing
Route::get('/listing/{paginate}', [ListingController::class, 'index']);

// Home
Route::get('/home/{value}/{paginate}', [HomeControler::class, 'index']);
// Evaluations

Route::post('/evaluations', [EvaluationController::class, 'store']);
Route::get('/evaluations/{id}', [UsersController::class, 'getEvaluations']);


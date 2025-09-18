<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\KotaController;
use App\Http\Controllers\PerdinController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

Route::get('/', [AuthenticatedSessionController::class, 'create'])->name('login');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'admin'])->group(function (){
    Route::get('/users', [UserController::class, 'index'])->name('users');
    Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
    Route::post('/users/store', [UserController::class, 'store'])->name('users.store');
    Route::delete('/users/destroy/{user}', [UserController::class, 'destroy'])->name('users.destroy');
    Route::get('/users/edit/{user}', [UserController::class, 'edit'])->name('users.edit');
    Route::patch('/users/update/{user}', [UserController::class, 'update'])->name('users.update');
});

Route::middleware(['auth'])->group(function (){
    Route::get('/kotas', [KotaController::class, 'index'])->name('kotas');
    Route::get('/kotas/create', [KotaController::class, 'create'])->name('kotas.create');
    Route::post('/kotas/store', [KotaController::class, 'store'])->name('kotas.store');
    Route::get('/kotas/edit/{kota}', [KotaController::class, 'edit'])->name('kotas.edit');
    Route::delete('/kotas/destroy/{kota}', [KotaController::class, 'destroy'])->name('kotas.destroy');
    Route::patch('/kotas/update/{kota}', [KotaController::class, 'update'])->name('kotas.update');
});

Route::middleware(['auth'])->group(function (){
    Route::get('/perdins', [PerdinController::class, 'index'])->name('perdins');
    Route::get('/perdins/create', [PerdinController::class, 'create'])->name('perdins.create');
    Route::post('/perdins/store', [PerdinController::class, 'store'])->name('perdins.store');
    Route::get('/perdins/approval', [PerdinController::class, 'approval'])->name('perdins.approval');
    Route::get('/perdins/edit/{perdin}', [PerdinController::class, 'edit'])->name('perdins.edit');
    Route::patch('/perdins/update/{perdin}', [PerdinController::class, 'update'])->name('perdins.update');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

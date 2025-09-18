<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Perdin;
use App\Models\User;
use App\Models\Kota;


class PerdinController extends Controller
{
    public function index()
    {
        $current_user_id = auth()->id();

        $perdins = Perdin::with(['user', 'asalKota', 'tujuanKota'])
            ->where('user_id', $current_user_id) 
            ->paginate(10);

        $kotas = Kota::all();

        return Inertia::render('PerjalananDinas/Index', [
            'perdins' => $perdins,
            'kotas' => $kotas
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'asal_kota_id' => 'required|exists:kota,id|different:tujuan_kota_id',
            'tujuan_kota_id' => 'required|exists:kota,id',
            'tanggal_berangkat' => 'required|date',
            'tanggal_kembali' => 'required|date|after_or_equal:tanggal_berangkat',
            'keterangan' => 'required|string|max:255',
        ]);

        perdin::create($validatedData);

        return redirect()->route('perdins');
    }

    public function approval()
    {
        $perdins = Perdin::with(['user', 'asalKota', 'tujuanKota'])->paginate(10);
        

        $users = User::all();
        $kotas = Kota::all();

        return Inertia::render('PerjalananDinas/Approval', [
            'perdins' => $perdins,
            'users' => $users,
            'kotas' => $kotas
        ]);
    }

    public function update(Request $request, Perdin $perdin)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,approve,rejected',
        ]);

        $perdin->update($validated);

        return redirect()->route('perdins.approval');
    }
}

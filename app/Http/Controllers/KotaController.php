<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\kota;

class KotaController extends Controller
{
    public function index()
    {
        $kotas = Kota::paginate(10);

        return Inertia::render('Kota/Index', [
            'kotas' => $kotas
        ]);
    }

    public function create()
    {
        return Inertia::render('Kota/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_kota' => 'required|string|max:255',
            'provinsi' => 'required|string|max:255',
            'pulau' => 'required|string|max:255',
            'luar_negeri' => 'required|boolean',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);

        Kota::create($request->all());

        return redirect()->route('kotas');
    }

    public function edit(Kota $kota)
    {
        return Inertia::render('Kota/Edit', [
            'kota' => $kota
        ]);
    }

    public function update(Request $request, Kota $kota)
    {
        $validated = $request->validate([
            'nama_kota' => 'required|string|max:255',
            'provinsi' => 'required|string|max:255',
            'pulau' => 'required|string|max:255',
            'luar_negeri' => 'required|boolean',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);

        $kota->update([
            'nama_kota' => $validated['nama_kota'],
            'provinsi' => $validated['provinsi'],
            'pulau' => $validated['pulau'],
            'luar_negeri' => $validated['luar_negeri'],
            'latitude' => $validated['latitude'],
            'longitude' => $validated['longitude'],
        ]);

        return redirect()->route('kotas');
    }

    public function destroy(Kota $kota)
    {
        $kota->delete();

        return redirect()->route('kotas');
    }
}

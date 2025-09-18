<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class perdin extends Model
{
    protected $table = 'perjalanan_dinas';

    use HasFactory;

    protected $fillable = [
        'user_id',
        'asal_kota_id',
        'tujuan_kota_id',
        'tanggal_berangkat',
        'tanggal_kembali',
        'keterangan',
        'status',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    
    public function asalKota(): BelongsTo
    {
        return $this->belongsTo(Kota::class, 'asal_kota_id');
    }


    public function tujuanKota(): BelongsTo
    {
        return $this->belongsTo(Kota::class, 'tujuan_kota_id');
    }
}

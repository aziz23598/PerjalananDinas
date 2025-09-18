<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\kota;

class KotaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kotaData = [

            [
                'nama_kota' => 'Jakarta',
                'provinsi' => 'DKI Jakarta',
                'pulau' => 'Jawa',
                'luar_negeri' => false,
                'latitude' => -6.2088,
                'longitude' => 106.8456,
            ],
            [
                'nama_kota' => 'Surabaya',
                'provinsi' => 'Jawa Timur',
                'pulau' => 'Jawa',
                'luar_negeri' => false,
                'latitude' => -7.2575,
                'longitude' => 112.7521,
            ],
            [
                'nama_kota' => 'Bandung',
                'provinsi' => 'Jawa Barat',
                'pulau' => 'Jawa',
                'luar_negeri' => false,
                'latitude' => -6.9175,
                'longitude' => 107.6191,
            ],
            [
                'nama_kota' => 'Medan',
                'provinsi' => 'Sumatera Utara',
                'pulau' => 'Sumatera',
                'luar_negeri' => false,
                'latitude' => 3.5952,
                'longitude' => 98.6775,
            ],

            [
                'nama_kota' => 'Yogyakarta',
                'provinsi' => 'DI Yogyakarta',
                'pulau' => 'Jawa',
                'luar_negeri' => false,
                'latitude' => -7.7956,
                'longitude' => 110.3695,
            ],
            
            [
                'nama_kota' => 'Makassar',
                'provinsi' => 'Sulawesi Selatan',
                'pulau' => 'Sulawesi',
                'luar_negeri' => false,
                'latitude' => -5.1477,
                'longitude' => 119.4327,
            ],
            [
                'nama_kota' => 'Manado',
                'provinsi' => 'Sulawesi Utara',
                'pulau' => 'Sulawesi',
                'luar_negeri' => false,
                'latitude' => 1.4748,
                'longitude' => 124.8421,
            ],
            [
                'nama_kota' => 'Palu',
                'provinsi' => 'Sulawesi Tengah',
                'pulau' => 'Sulawesi',
                'luar_negeri' => false,
                'latitude' => -0.8906,
                'longitude' => 119.8707,
            ],

            [
                'nama_kota' => 'Pontianak',
                'provinsi' => 'Kalimantan Barat',
                'pulau' => 'Kalimantan',
                'luar_negeri' => false,
                'latitude' => -0.0249,
                'longitude' => 109.3400,
            ],
            [
                'nama_kota' => 'Samarinda',
                'provinsi' => 'Kalimantan Timur',
                'pulau' => 'Kalimantan',
                'luar_negeri' => false,
                'latitude' => -0.5074,
                'longitude' => 117.1438,
            ],
            [
                'nama_kota' => 'Banjarmasin',
                'provinsi' => 'Kalimantan Selatan',
                'pulau' => 'Kalimantan',
                'luar_negeri' => false,
                'latitude' => -3.3167,
                'longitude' => 114.5900,
            ],
            [
                'nama_kota' => 'Denpasar',
                'provinsi' => 'Bali',
                'pulau' => 'Bali',
                'luar_negeri' => false,
                'latitude' => -8.6705,
                'longitude' => 115.2126,
            ],
            [
                'nama_kota' => 'Jayapura',
                'provinsi' => 'Papua',
                'pulau' => 'Papua',
                'luar_negeri' => false,
                'latitude' => -2.5332,
                'longitude' => 140.8118,
            ],
            [
                'nama_kota' => 'Kuala Lumpur',
                'provinsi' => 'Wilayah Federal',
                'pulau' => 'Semenanjung Malaya',
                'luar_negeri' => true,
                'latitude' => 3.1390,
                'longitude' => 101.6869,
            ],
            [
                'nama_kota' => 'Singapura',
                'provinsi' => 'Singapura',
                'pulau' => 'Singapura',
                'luar_negeri' => true,
                'latitude' => 1.3521,
                'longitude' => 103.8198,
            ],
        ];

        kota::truncate();

        foreach ($kotaData as $data) {
            kota::create($data);
        }
    }
}

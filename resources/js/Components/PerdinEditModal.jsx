import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import Selectbox from '@/Components/Selectbox';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { router } from '@inertiajs/react';

// Fungsi untuk mengonversi derajat ke radian
function toRadians(deg) {
    return deg * (Math.PI / 180);
}

// Fungsi untuk menghitung jarak antara dua titik latitude dan longitude (dalam KM)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius bumi dalam kilometer
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance.toFixed(2);
}

export default function PerdinEditModal({ show = false, onClose, kotas = [], perdin = null }) {
    const { data, setData, patch, processing, errors, reset } = useForm({
        asal_kota_id: '',
        tujuan_kota_id: '',
        tanggal_berangkat: '',
        tanggal_kembali: '',
        keterangan: '',
        status: '',
    });

    const [lamaDinas, setLamaDinas] = useState(0);
    const [uangSakuPerHari, setUangSakuPerHari] = useState(0);
    const [uangSakuPerHariUSD, setUangSakuPerHariUSD] = useState(0); 
    const [jarakTempuh, setJarakTempuh] = useState(0);
    const [kategoriJarak, setKategoriJarak] = useState('');

    useEffect(() => {
        if (perdin) {
            setData({
                asal_kota_id: perdin.asal_kota_id,
                tujuan_kota_id: perdin.tujuan_kota_id,
                tanggal_berangkat: perdin.tanggal_berangkat,
                tanggal_kembali: perdin.tanggal_kembali,
                keterangan: perdin.keterangan,
                status: perdin.status,
            });

            const asalKota = kotas.find(k => k.id === perdin.asal_kota_id);
            const tujuanKota = kotas.find(k => k.id === perdin.tujuan_kota_id);

            let sakuRp = 0;
            let sakuUSD = 0; 
            let kategori = '';
            let jarak = null;

            if (tujuanKota && tujuanKota.luar_negeri == 1) {
                // Aturan untuk perjalanan dinas luar negeri
                const usdRate = 16446.7;
                sakuUSD = 50; 
                sakuRp = sakuUSD * usdRate;
                kategori = '(Luar Negeri)';
                jarak = null;
            } else if (asalKota && tujuanKota) {
                // Aturan untuk perjalanan dinas dalam negeri
                const calculatedDistance = calculateDistance(
                    asalKota.latitude,
                    asalKota.longitude,
                    tujuanKota.latitude,
                    tujuanKota.longitude
                );
                const distanceNumber = parseFloat(calculatedDistance);
                jarak = distanceNumber;

                if (distanceNumber > 60) {
                    sakuRp = 250000;
                    kategori = '(Jarak > 60km)';
                } else {
                    sakuRp = 200000;
                    kategori = '(Jarak <= 60km)';
                }
            }

            // Set state dengan nilai yang sudah dihitung
            setUangSakuPerHari(sakuRp);
            setUangSakuPerHariUSD(sakuUSD);
            setKategoriJarak(kategori);
            setJarakTempuh(jarak);

            // Hitung lama dinas
            if (perdin.tanggal_berangkat && perdin.tanggal_kembali) {
                const tanggalBerangkat = new Date(perdin.tanggal_berangkat);
                const tanggalKembali = new Date(perdin.tanggal_kembali);
                const selisihWaktu = tanggalKembali.getTime() - tanggalBerangkat.getTime();
                const selisihHari = Math.floor(selisihWaktu / (1000 * 60 * 60 * 24));
                setLamaDinas(selisihHari + 1);
            }
        }
    }, [perdin, kotas]);

    const totalUangPerdin = lamaDinas * uangSakuPerHari;
    const totalUangPerdinUSD = lamaDinas * uangSakuPerHariUSD; 

    const handleApprove = (e) => {
        e.preventDefault();
        router.patch(
            route('perdins.update', perdin.id),
            { status: 'approve' },
            {
                onSuccess: () => {
                    router.reload({ only: ['perdins'] });
                    onClose();
                },
            }
        );
    };

    const handleReject = (e) => {
        e.preventDefault();
        router.patch(
            route('perdins.update', perdin.id),
            { status: 'rejected' },
            {
                onSuccess: () => {
                    router.reload({ only: ['perdins'] });
                    onClose();
                },
            }
        );
    };

    useEffect(() => {
        if (!show) {
            reset();
        }
    }, [show, reset]);

    return (
        <Modal show={show} onClose={onClose}>
            {perdin ? (
                <form className="p-6">
                    <h2 className="text-lg font-medium text-white bg-gray-800 p-3 rounded-md">
                        Approval Perjalanan Dinas
                    </h2>

                    <div className="mt-4 flex gap-2">
                        <div className="w-1/2">
                            <InputLabel htmlFor="asal_kota_id" value="Kota Asal" />
                            <Selectbox
                                id="asal_kota_id"
                                options={[{ value: '', label: 'Pilih kota asal' }, ...kotas.map(kota => ({ value: kota.id, label: kota.nama_kota }))]}
                                currentValue={data.asal_kota_id}
                                disabled={true}
                            />
                        </div>
                        <div className="mb-2 text-2xl font-bold text-gray-700">
                            <br />
                            →
                        </div>
                        <div className="w-1/2">
                            <InputLabel htmlFor="tujuan_kota_id" value="Kota Tujuan" />
                            <Selectbox
                                id="tujuan_kota_id"
                                options={[{ value: '', label: 'Pilih kota tujuan' }, ...kotas.map(kota => ({ value: kota.id, label: kota.nama_kota }))]}
                                currentValue={data.tujuan_kota_id}
                                disabled={true}
                            />
                        </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                        <div className="w-1/2">
                            <InputLabel htmlFor="tanggal_berangkat" value="Tanggal Berangkat" />
                            <TextInput
                                id="tanggal_berangkat"
                                type="date"
                                value={data.tanggal_berangkat}
                                className="w-full"
                                disabled={true}
                            />
                        </div>
                        <div className="mb-2 text-2xl font-bold text-gray-700">
                            <br />
                            →
                        </div>
                        <div className="w-1/2">
                            <InputLabel htmlFor="tanggal_kembali" value="Tanggal Pulang" />
                            <TextInput
                                id="tanggal_kembali"
                                type="date"
                                value={data.tanggal_kembali}
                                className="w-full"
                                disabled={true}
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="keterangan" value="Keterangan" />
                        <textarea
                            id="keterangan"
                            value={data.keterangan}
                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full bg-gray-100"
                            disabled={true}
                        ></textarea>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <div className="text-gray-600 font-medium">Total Hari</div>
                            <div className="text-2xl font-bold text-blue-600">{lamaDinas} Hari</div>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <div className="text-gray-600 font-medium">Jarak Tempuh</div>
                            <div className="text-2xl font-bold text-blue-600">
                                {jarakTempuh === null ? 'N/A' : `${jarakTempuh} KM`}
                            </div>
                            <div className="mt-2 text-md text-gray-600 font-medium">
                                {kategoriJarak === '(Luar Negeri)' ? `USD ${uangSakuPerHariUSD} / Hari` : `Rp. ${uangSakuPerHari.toLocaleString('id-ID')} / Hari`}
                            </div>
                            <div className="text-sm text-gray-400">
                                {kategoriJarak}
                            </div>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <div className="text-gray-600 font-medium">Total Uang Perdin</div>
                            <div className="text-2xl font-bold text-blue-600">
                                {kategoriJarak === '(Luar Negeri)' ? `USD ${totalUangPerdinUSD}` : `Rp. ${totalUangPerdin.toLocaleString('id-ID')}`}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-center gap-2">
                        <PrimaryButton
                            type="button"
                            onClick={handleReject}
                            disabled={processing}
                            className="bg-red-500 hover:bg-red-600 focus:bg-red-600 active:bg-red-700"
                        >
                            Reject
                        </PrimaryButton>
                        <PrimaryButton
                            type="button"
                            onClick={handleApprove}
                            disabled={processing}
                            className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-700"
                        >
                            Approve
                        </PrimaryButton>
                    </div>
                </form>
            ) : (
                <div className="p-6 text-center text-gray-500">
                    Memuat data perjalanan dinas...
                </div>
            )}
        </Modal>
    );
}
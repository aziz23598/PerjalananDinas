import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import Selectbox from '@/Components/Selectbox';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import { useState, useEffect } from 'react';

export default function PerdinCreateModal({ show = false, onClose, kotas, submit, data, setData, processing, errors }) {
    if (!show) return null;

    const [lamaDinas, setLamaDinas] = useState(0);
    const [kotaError, setKotaError] = useState('');

    useEffect(() => {
        // Hitung Lama Dinas
        if (data.tanggal_berangkat && data.tanggal_kembali) {
            const tanggalBerangkat = new Date(data.tanggal_berangkat);
            const tanggalKembali = new Date(data.tanggal_kembali);

            // Hitung selisih waktu dalam milidetik
            const selisihWaktu = tanggalKembali.getTime() - tanggalBerangkat.getTime();

            // Konversi milidetik ke hari
            const selisihHari = Math.floor(selisihWaktu / (1000 * 60 * 60 * 24));

            // Tambahkan 1 hari agar tanggal berangkat dan pulang terhitung
            setLamaDinas(selisihHari + 1);
        } else {
            setLamaDinas(0);
        }

        // Validasi Kota
        if (data.asal_kota_id && data.tujuan_kota_id && data.asal_kota_id === data.tujuan_kota_id) {
            setKotaError('Kota asal dan kota tujuan tidak boleh sama.');
        } else {
            setKotaError('');
        }
    }, [data.tanggal_berangkat, data.tanggal_kembali, data.asal_kota_id, data.tujuan_kota_id]);

    const isFormValid = () => {
        return (
            // Cek jika lama dinas lebih dari 0 dan tidak ada error
            lamaDinas > 0 &&
            !kotaError &&
            data.asal_kota_id &&
            data.tujuan_kota_id &&
            data.tanggal_berangkat &&
            data.tanggal_kembali &&
            data.keterangan &&
            !errors.asal_kota_id &&
            !errors.tujuan_kota_id &&
            !errors.tanggal_berangkat &&
            !errors.tanggal_kembali &&
            !errors.keterangan
        );
    };
    return (
        <Modal show={show} onClose={onClose}>
            <form onSubmit={submit} className="p-6">
                <h2 className="text-lg font-medium text-white bg-gray-800 p-3 rounded-md">
                    Tambah Perdin
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    Isi detail perjalanan dinas.
                </p>

                {/* Input Kota Asal & Tujuan */}
                <div className="mt-4 flex  gap-2">
                    <div className="w-1/2">
                        <InputLabel htmlFor="asal_kota_id" value="Kota Asal" />
                        <Selectbox
                            id="asal_kota_id"
                            options={[
                                { value: '', label: 'Pilih kota asal' },
                                ...kotas.map(kota => ({ value: kota.id, label: kota.nama_kota }))
                            ]}
                            currentValue={data.asal_kota_id}
                            onChange={(e) => setData('asal_kota_id', e.target.value)}
                        />
                        <InputError message={errors.asal_kota_id} className="mt-2" />
                    </div>
                    <div className="mb-2 text-2xl font-bold  text-gray-700"> 
                        <br />
                        →
                    </div>
                    <div className="w-1/2">
                        <InputLabel htmlFor="tujuan_kota_id" value="Kota Tujuan" />
                        <Selectbox
                            id="tujuan_kota_id"
                            options={[
                                { value: '', label: 'Pilih kota tujuan' },
                                ...kotas.map(kota => ({ value: kota.id, label: kota.nama_kota }))
                            ]}
                            currentValue={data.tujuan_kota_id}
                            onChange={(e) => setData('tujuan_kota_id', e.target.value)}
                        />
                        <InputError message={errors.tujuan_kota_id} className="mt-2" />
                    </div>
                </div>

                {/* Input Tanggal */}
                <div className="mt-4 flex gap-2">
                    <div className="w-1/2">
                        <InputLabel htmlFor="tanggal_berangkat" value="Tanggal Berangkat" />
                        <TextInput
                            id="tanggal_berangkat"
                            type="date"
                            value={data.tanggal_berangkat}
                            onChange={(e) => setData('tanggal_berangkat', e.target.value)}
                            className="w-full" 
                        />
                        <InputError message={errors.tanggal_berangkat} className="mt-2" />
                    </div>
                    <div className="mb-2 text-2xl font-bold  text-gray-700"> 
                        <br />
                        →
                    </div>
                    <div className="w-1/2">
                        <InputLabel htmlFor="tanggal_kembali" value="Tanggal Pulang" />
                        <TextInput
                            id="tanggal_kembali"
                            type="date"
                            value={data.tanggal_kembali}
                            onChange={(e) => setData('tanggal_kembali', e.target.value)}
                            className="w-full" 
                        />
                        <InputError message={errors.tanggal_kembali} className="mt-2" />
                    </div>
                </div>

                
                {/* Keterangan */}
                <div className="mt-4">
                    <InputLabel htmlFor="keterangan" value="Keterangan" />
                    <textarea
                        id="keterangan"
                        value={data.keterangan}
                        onChange={(e) => setData('keterangan', e.target.value)}
                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm mt-1 block w-full"
                    ></textarea>
                    <InputError message={errors.keterangan} className="mt-2" />
                </div>

                {/* Tampilan Total Hari */}
                <div className="mt-6 p-4 rounded-lg bg-gray-100 text-center">
                    <div className="text-gray-600 font-medium">
                        Total Perjalanan Dinas
                    </div>
                    <div className="text-2xl font-bold text-blue-600">
                        {lamaDinas} Hari
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-4">
                    <button onClick={onClose} type="button" className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Kembali
                    </button>
                    <PrimaryButton disabled={processing || !isFormValid()}>
                        Tambah
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
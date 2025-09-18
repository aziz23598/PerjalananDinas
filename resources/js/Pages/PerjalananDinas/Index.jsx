import { useState } from 'react';
import Pagination from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import PerdinCreateModal from '@/Components/PerdinCreateModal';

export default function PerdinIndex({ auth, perdins, kotas }) {
    const [showModal, setShowModal] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        user_id: auth.user.id,
        asal_kota_id: '',
        tujuan_kota_id: '',
        tanggal_berangkat: '',
        tanggal_kembali: '',
        keterangan: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('perdins.store'), {
            onSuccess: () => {
                reset();
                setShowModal(false);
            },
        });
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const formattedPerdins = perdins.data.map(perdin => {
        const tanggalBerangkat = new Date(perdin.tanggal_berangkat);
        const tanggalKembali = new Date(perdin.tanggal_kembali);

        const selisihWaktu = tanggalKembali.getTime() - tanggalBerangkat.getTime();
        const selisihHari = Math.floor(selisihWaktu / (1000 * 60 * 60 * 24)) + 1;

        const tglOptions = { day: '2-digit', month: 'short' };
        const tglBerangkatFormatted = tanggalBerangkat.toLocaleDateString('id-ID', tglOptions);
        const finalTglKembali = `${tanggalKembali.toLocaleDateString('id-ID', tglOptions)}, ${tanggalKembali.getFullYear()}`;

        return {
            ...perdin,
            tanggal_formatted: `${tglBerangkatFormatted} - ${finalTglKembali} (${selisihHari} Hari)`,
        };
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Perjalanan Dinas
                </h2>
            }
        >
            <Head title="Perdins" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-end items-center mb-6">
                        <button
                            className="rounded-md border bg-blue-800 px-4 py-2 text-white transition duration-150 ease-in-out hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-blue-900"
                            onClick={openModal}
                        >
                            + Tambah Perdin
                        </button>
                    </div>
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b-2 bg-gray-200">
                                        <th className="px-6 py-3 text-center text-lg font medium text-black">No</th>
                                        <th className="px-6 py-3 text-center text-lg font medium text-black">Kota</th>
                                        <th className="px-6 py-3 text-center text-lg font medium text-black">Tanggal</th>
                                        <th className="px-6 py-3 text-center text-lg font medium text-black">Keterangan</th>
                                        <th className="px-6 py-3 text-center text-lg font medium text-black">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formattedPerdins.map((perdin, index) => (
                                        <tr key={perdin.id} className="border-b text-center">
                                            <td className="px-6 py-4 whitespace-nowrap">{(perdins.from ?? 0) + index}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{perdin.asal_kota.nama_kota} &rarr; {perdin.tujuan_kota.nama_kota}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{perdin.tanggal_formatted}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{perdin.keterangan}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div
                                                    className={`inline-block px-2 py-1 rounded-full font-semibold text-sm
                                                        ${perdin.status === 'approve' ? 'bg-blue-100 text-blue-600' : ''}
                                                        ${perdin.status === 'pending' ? 'bg-orange-100 text-orange-600' : ''}
                                                        ${perdin.status === 'rejected' ? 'bg-red-100 text-red-600' : ''}
                                                    `}
                                                >
                                                    {perdin.status.charAt(0).toUpperCase() + perdin.status.slice(1)}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination links={perdins.links} />
                        </div>
                    </div>
                </div>
            </div>
            {showModal && (
                <PerdinCreateModal
                    show={showModal}
                    onClose={closeModal}
                    kotas={kotas}
                    data={data}
                    setData={setData}
                    submit={submit}
                    processing={processing}
                    errors={errors}
                />
            )}
        </AuthenticatedLayout>
    );
}
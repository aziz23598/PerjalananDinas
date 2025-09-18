import { useState } from 'react';
import Pagination from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PerdinEditModal from '@/Components/PerdinEditModal';

export default function PerdinApproval({ auth, perdins, users, kotas }) {
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedPerdin, setSelectedPerdin] = useState(null);
    const [activeTab, setActiveTab] = useState('new');

    // Fungsi untuk membuka modal Edit
    const openEditModal = (perdin) => {
        setSelectedPerdin(perdin);
        setShowEditModal(true);
    };

    // Fungsi untuk menutup modal Edit dan mereset state
    const closeEditModal = () => {
        setShowEditModal(false);
        setSelectedPerdin(null);
    };

    // Filter data pengajuan berdasarkan status tab yang aktif
    const filteredPerdins = perdins.data.filter(perdin => {
        return activeTab === 'new' ? perdin.status === 'pending' : perdin.status !== 'pending';
    });

    // Hitung jumlah pengajuan yang pending
    const pendingCount = perdins.data.filter(perdin => perdin.status === 'pending').length;

    const formattedPerdins = filteredPerdins.map(perdin => {
        const tanggalBerangkat = new Date(perdin.tanggal_berangkat);
        const tanggalKembali = new Date(perdin.tanggal_kembali);

        const selisihWaktu = tanggalKembali.getTime() - tanggalBerangkat.getTime();
        const selisihHari = Math.floor(selisihWaktu / (1000 * 60 * 60 * 24)) + 1;

        const tglOptions = { day: '2-digit', month: 'short' };
        const tglBerangkatFormatted = tanggalBerangkat.toLocaleDateString('id-ID', tglOptions);

        const tglKembaliOptions = { day: '2-digit', month: 'short' };
        const tglKembaliFormatted = tanggalKembali.toLocaleDateString('id-ID', tglKembaliOptions);

        const tahun = tanggalKembali.getFullYear();
        const finalTglKembali = `${tglKembaliFormatted.replace(`, ${tahun}`, '')}, ${tahun}`;

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
                    Pengajuan Perdin
                </h2>
            }
        >
            <Head title="Pengajuan Perdin" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* TAB NAVIGATION */}
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex border-b border-gray-200">
                                    <button
                                        onClick={() => setActiveTab('new')}
                                        className={`
                                            px-4 py-2 text-lg font-medium transition-colors duration-200
                                            ${activeTab === 'new'
                                                ? 'text-blue-600 border-b-2 border-blue-600'
                                                : 'text-gray-500 hover:text-gray-700'
                                            }
                                        `}
                                    >
                                        Pengajuan Baru
                                        <span
                                            className={`
                                                ml-2 inline-flex items-center justify-center h-5 w-5 rounded-full text-xs font-semibold
                                                ${activeTab === 'new'
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-200 text-gray-700 group-hover:bg-gray-300'
                                                }
                                            `}
                                        >
                                            {pendingCount}
                                        </span>
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('history')}
                                        className={`
                                            px-4 py-2 text-lg font-medium transition-colors duration-200
                                            ${activeTab === 'history'
                                                ? 'text-blue-600 border-b-2 border-blue-600'
                                                : 'text-gray-500 hover:text-gray-700'
                                            }
                                        `}
                                    >
                                        History Pengajuan
                                    </button>
                                </div>
                            </div>

                            {/* TABLE CONTENT */}
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b-2 bg-gray-200">
                                        <th className="px-6 py-3 text-center text-lg font-medium text-black">No</th>
                                        <th className="px-6 py-3 text-center text-lg font-medium text-black">Nama</th>
                                        <th className="px-6 py-3 text-center text-lg font-medium text-black">Kota</th>
                                        <th className="px-6 py-3 text-center text-lg font-medium text-black">Tanggal</th>
                                        <th className="px-6 py-3 text-center text-lg font-medium text-black">Keterangan</th>
                                        <th className="px-6 py-3 text-center text-lg font-medium text-black">
                                            {activeTab === 'new' ? 'Aksi' : 'Status'}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formattedPerdins.map((perdin, index) => (
                                        <tr key={perdin.id} className="border-b text-center">
                                            <td className="px-6 py-4 whitespace-nowrap">{(perdins.from ?? 0) + index}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{perdin.user.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{perdin.asal_kota.nama_kota} &rarr; {perdin.tujuan_kota.nama_kota}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{perdin.tanggal_formatted}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{perdin.keterangan}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {activeTab === 'new' ? (
                                                    <button
                                                        className="inline-flex items-center rounded-lg border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900"
                                                        onClick={() => openEditModal(perdin)}
                                                    >
                                                        @
                                                    </button>
                                                ) : (
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
                                                        perdin.status === 'approve' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-red-100 text-red-800'
                                                        }`}>
                                                        {perdin.status.charAt(0).toUpperCase() + perdin.status.slice(1)}
                                                    </span>
                                                )}
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
            <PerdinEditModal
                show={showEditModal}
                onClose={closeEditModal}
                kotas={kotas}
                perdin={selectedPerdin}
            />
        </AuthenticatedLayout>
    );
}
import Pagination from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';

export default function Kotandex({ auth, kotas }) {
    const handleDelete = (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus kota ini?')) {
            router.delete(route('kotas.destroy', id));
        }
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Kota
                </h2>
            }
        >
            <Head title="Kotas" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-end items-center mb-6">
                        <Link
                            className="rounded-md border bg-blue-800 px-4 py-2  text-white transition duration-150 ease-in-out hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-blue-900"
                            href={route('kotas.create')}
                        >
                            + Tambah Kota
                        </Link>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="border-b-2 items-center justify-center">
                                        <th className="px-6 py-3 text-left text-lg font medium text-black">No</th>
                                        <th className="px-6 py-3 text-left text-lg font medium text-black">Nama Kota</th>
                                        <th className="px-6 py-3 text-left text-lg font medium text-black">Provinsi</th>
                                        <th className="px-6 py-3 text-left text-lg font medium text-black">Pulau</th>
                                        <th className="px-6 py-3 text-left text-lg font medium text-black">Luar Negeri</th>
                                        <th className="px-6 py-3 text-left text-lg font medium text-black">Latitude</th>
                                        <th className="px-6 py-3 text-left text-lg font medium text-black">Longitude</th>
                                        <th className="px-6 py-3 text-left text-lg font medium text-black">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {kotas.data.map((kota, index) => (
                                        <tr key={kota.id} className="border-b">
                                            <td className="px-6 py-4 whitespace-nowrap">{(kotas.from ?? 0) + index}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{kota.nama_kota}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{kota.provinsi}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{kota.pulau}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{kota.luar_negeri ? "Ya" : "Tidak"}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{kota.latitude}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{kota.longitude}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Link
                                                    className="inline-flex items-center justify-center rounded-full bg-transparent p-1 transition duration-150 ease-in-out text-yellow-600 hover:bg-yellow-100 focus:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-blue-200"
                                                    href={route('kotas.edit', kota.id)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.2-8.2zm0 0L19.5 7.125" />
                                                    </svg>
                                                </Link>

                                                <button
                                                    className="inline-flex items-center justify-center rounded-full bg-transparent p-1 ml-2 transition duration-150 ease-in-out text-red-600 hover:bg-red-100 focus:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-200"
                                                    onClick={() => handleDelete(kota.id)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.919a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.14-2.043-2.264a1.916 1.916 0 00-1.838 0 1.916 1.916 0 00-1.838 0c-1.133.124-2.043 1.084-2.043 2.264v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination links={kotas.links} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm } from '@inertiajs/react';
import Selectbox from '@/Components/Selectbox';


export default function kotaCreate({ auth }) {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            nama_kota: '',
            provinsi: '',
            pulau: '',
            luar_negeri: 0, 
            latitude: '', 
            longitude: '', 
        });

    const submit = (e) => {
        e.preventDefault();

        post(route('kotas.store'), {
            preserveScroll: true,
            onSuccess: () => {
                alert("Kota Created");
            },
            onError: (errors) => {
                console.log(errors);
            }
        });
    };
    return (
        <AuthenticatedLayout
            user={auth.users}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Kota
                </h2>
            }
        >
            <Head title="Kota" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <section className="max-w-xl">
                                <header>
                                    <h2 className="text-lg font-medium text-gray-900">
                                        Create
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-600">
                                        Create Kota.
                                    </p>
                                </header>

                                <form onSubmit={submit} className="mt-6 space-y-6">
                                    <div>
                                        <InputLabel htmlFor="nama_kota" value="Nama Kota" />

                                        <TextInput
                                            id="nama_kota"
                                            className="mt-1 block w-full"
                                            value={data.nama_kota}
                                            onChange={(e) => setData('nama_kota', e.target.value)}
                                            required
                                            isFocused
                                            autoComplete="nama_kota"
                                        />

                                        <InputError className="mt-2" message={errors.nama_kota} />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="provinsi" value="Provinsi" />

                                        <TextInput
                                            id="provinsi"
                                            className="mt-1 block w-full"
                                            value={data.provinsi}
                                            onChange={(e) => setData('provinsi', e.target.value)}
                                            required
                                            autoComplete="provinsi"
                                        />

                                        <InputError className="mt-2" message={errors.provinsi} />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="pulau" value="Pulau" />

                                        <TextInput
                                            id="pulau"
                                            className="mt-1 block w-full"
                                            value={data.pulau}
                                            onChange={(e) => setData('pulau', e.target.value)}
                                            required
                                            autoComplete="pulau"
                                        />

                                        <InputError className="mt-2" message={errors.pulau} />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="luar_negeri" value="Luar Negeri" />

                                        <Selectbox
                                            onChange={(e) => setData('luar_negeri', parseInt(e.target.value))}
                                            id="luar_negeri"
                                            currentValue={data.luar_negeri}
                                            options={[
                                                { value: '1', label: 'Ya' },
                                                { value: '0', label: 'Tidak' },
                                            ]}
                                        />

                                        <InputError className="mt-2" message={errors.luar_negeri} />
                                    </div>


                                    <div>
                                        <InputLabel htmlFor="latitude" value="Latitude" />

                                        <TextInput
                                            id="latitude"
                                            value={data.latitude}
                                            onChange={(e) => setData('latitude', e.target.value)}
                                            className="mt-1 block w-full"
                                            autoComplete="latitude"
                                        />

                                        <InputError message={errors.latitude} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel
                                            htmlFor="longitude"
                                            value="Longitude"
                                        />

                                        <TextInput
                                            id="longitude"
                                            value={data.longitude}
                                            onChange={(e) =>
                                                setData('longitude', e.target.value)
                                            }
                                            className="mt-1 block w-full"
                                            autoComplete="latitude"
                                        />

                                        <InputError
                                            message={errors.latitude}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <PrimaryButton disabled={processing}>Save</PrimaryButton>

                                        <Transition
                                            show={recentlySuccessful}
                                            enter="transition ease-in-out"
                                            enterFrom="opacity-0"
                                            leave="transition ease-in-out"
                                            leaveTo="opacity-0"
                                        >
                                            <p className="text-sm text-gray-600">
                                                Saved.
                                            </p>
                                        </Transition>
                                    </div>
                                </form>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
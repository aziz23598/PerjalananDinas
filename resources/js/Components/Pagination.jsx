import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    return (
        <div className="mt-8 flex space-x-2">
            {links.map((link, index) => (
                link.url ? (
                    <Link
                        key={index}
                        href={link.url}
                        className={
                            link.active
                                ? "px-4 py-2 bg-indigo-600 text-white rounded-md border border-indigo-600"
                                : "text-primary hover:bg-indigo-600 hover:text-white px-4 py-2 rounded-md border"
                        }
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ) : (
                    <span
                        key={index}
                        className="text-gray-400 px-4 py-2 rounded-md border"
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                )
            ))}
        </div>
    );
}
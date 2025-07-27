"use client";

import { useState, useEffect, FormEvent } from 'react';
import { SerializedCarouselImage } from '@/lib/models/Event';

const CarouselAdminPage = () => {
    const [images, setImages] = useState<SerializedCarouselImage[]>([]);
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const fetchImages = async () => {
        const res = await fetch('/api/admin/carousel');
        const data = await res.json();
        setImages(data);
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!file) {
            alert('Please select a file to upload.');
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/admin/carousel', {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                await fetchImages();
                setFile(null);
                // @ts-ignore
                e.target.reset();
            } else {
                const errorData = await res.json();
                alert(`Upload failed: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('An error occurred during upload.');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this image?')) {
            return;
        }

        try {
            const res = await fetch(`/api/admin/carousel/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                await fetchImages();
            } else {
                const errorData = await res.json();
                alert(`Deletion failed: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('An error occurred during deletion.');
        }
    };

    return (
        <div className="container mx-auto p-8 text-white">
            <h1 className="text-3xl font-bold mb-8">Manage Carousel Images</h1>

            <div className="glass-panel p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Upload New Image</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="mb-4 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                        accept="image/*"
                    />
                    <button
                        type="submit"
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                        disabled={uploading}
                    >
                        {uploading ? 'Uploading...' : 'Upload'}
                    </button>
                </form>
            </div>

            <div>
                <h2 className="text-2xl font-bold mb-4">Current Images</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {images.map((image) => (
                        <div key={image._id} className="glass-panel p-4 rounded-lg flex flex-col">
                            <img src={image.imageUrl} alt="Carousel Image" className="w-full h-40 object-cover rounded-md mb-4" />
                            <button
                                onClick={() => handleDelete(image._id)}
                                className="mt-auto bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CarouselAdminPage;
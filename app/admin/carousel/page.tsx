'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import toast from 'react-hot-toast';

interface CarouselImage {
  _id: string;
  imageUrl: string;
}

const CarouselAdminPage = () => {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // Fetch all carousel images from the database
  const fetchImages = async () => {
    try {
      const res = await fetch('/api/admin/carousel');
      if (res.ok) {
        const data = await res.json();
        setImages(data);
      } else {
        toast.error('Failed to fetch images.');
      }
    } catch (error) {
      toast.error('An error occurred while fetching images.');
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select a file to upload.');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'carousel'); // Specify the folder for organization

    const toastId = toast.loading('Uploading image to Cloudinary...');

    try {
      // Step 1: Upload the file to the central upload API
      const uploadRes = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadRes.ok) {
        const errorData = await uploadRes.json();
        throw new Error(errorData.details || 'Failed to upload to Cloudinary');
      }

      const { secureUrl } = await uploadRes.json();
      toast.success('Image uploaded! Now saving to database...', { id: toastId });

      // Step 2: Save the returned URL to the database
      const saveRes = await fetch('/api/admin/carousel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: secureUrl }),
      });

      if (!saveRes.ok) {
        const errorData = await saveRes.json();
        throw new Error(errorData.message || 'Failed to save image to database');
      }

      toast.success('Carousel image added successfully!', { id: toastId });
      await fetchImages(); // Refresh the list of images
      setFile(null);
      const form = e.target as HTMLFormElement;
      form.reset();

    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      toast.error(message, { id: toastId });
      console.error("Carousel upload process failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) {
      return;
    }

    const toastId = toast.loading('Deleting image...');

    try {
      const res = await fetch(`/api/admin/carousel?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Image deleted successfully', { id: toastId });
        fetchImages(); // Refresh the list
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || 'Failed to delete image.', { id: toastId });
      }
    } catch (error) {
      toast.error('An error occurred during deletion.', { id: toastId });
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Carousel Management</h1>

      <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-800 rounded-lg">
        <input type="file" onChange={handleFileChange} className="mb-2" accept="image/*" />
        <button type="submit" disabled={uploading} className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400">
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div key={image._id} className="relative group">
            <img src={image.imageUrl} alt="Carousel Image" className="w-full h-48 object-cover rounded" />
            <button
              onClick={() => handleDelete(image._id)}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselAdminPage;

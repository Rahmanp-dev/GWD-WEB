'use client';

import { useState, ChangeEvent } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { GlassFormWrapper } from '../GlassFormWrapper';

interface IProjectInput {
  title: string;
  client: string;
  service: string;
  budget: string;
  startDate: string;
  endDate: string;
  // 'media' is now just for form state, not direct submission
}

interface ProjectFormProps {
  onSuccess: () => void;
  onClose: () => void;
}

const ProjectForm = ({ onSuccess, onClose }: ProjectFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IProjectInput>();
  
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMediaFiles(Array.from(e.target.files));
    }
  };

  // Upload files to Cloudinary and get URLs
  const uploadMedia = async (): Promise<string[]> => {
    setIsUploading(true);
    const toastId = toast.loading(`Uploading ${mediaFiles.length} media file(s)...`);

    const uploadPromises = mediaFiles.map(async (file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'projects'); // Sub-folder for project media

      try {
        const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.details || `Failed to upload ${file.name}`);
        }
        const { secureUrl } = await res.json();
        return secureUrl;
      } catch (error) {
        console.error("File upload error:", error);
        toast.error(`Upload failed for ${file.name}`);
        return null; // Return null for failed uploads
      }
    });

    try {
      const urls = await Promise.all(uploadPromises);
      const successfulUrls = urls.filter((url): url is string => url !== null);
      
      if (successfulUrls.length < mediaFiles.length) {
        toast.error('Some files failed to upload.', { id: toastId });
      } else {
        toast.success('All media uploaded successfully!', { id: toastId });
      }
      
      return successfulUrls;
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit: SubmitHandler<IProjectInput> = async (data) => {
    let mediaUrls: string[] = [];
    if (mediaFiles.length > 0) {
      mediaUrls = await uploadMedia();
      if (mediaUrls.length === 0 && mediaFiles.length > 0) {
        toast.error("Media upload failed. Cannot create project.");
        return; // Stop if media upload fails
      }
    }

    const projectData = { ...data, mediaUrls };

    const promise = fetch('/api/admin/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData),
    });

    toast.promise(promise, {
      loading: 'Creating project...',
      success: 'Project created successfully!',
      error: 'Failed to create project.',
    });

    try {
      const response = await promise;
      if (response.ok) {
        reset();
        onSuccess();
      }
    } catch (e) {
      // Error is handled by the toast promise
      console.error("Project creation error:", e);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center" onClick={onClose}>
      <GlassFormWrapper>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white/10 dark:bg-black/30 p-8 rounded-2xl shadow-xl w-full max-w-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold mb-6 text-white">Add New Project</h2>
          
          {/* Form Fields - Example for Title */}
          <div className="mb-4">
            <label className="block text-gray-200">Title</label>
            <input
              {...register('title', { required: 'Title is required' })}
              className="w-full p-3 bg-white/5 dark:bg-white/10 border border-[rgba(0,0,0,0.15)] dark:border-white/20 rounded-lg text-white"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          {/* Media Input */}
          <div className="mb-4">
            <label className="block text-gray-200">Media</label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="w-full p-3 bg-white/5 dark:bg-white/10 border border-[rgba(0,0,0,0.15)] dark:border-white/20 rounded-lg text-white"
            />
          </div>

          {/* You would add other fields like client, service, budget, etc. here */}

          <div className="flex gap-4 mt-6 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-600 text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform"
              disabled={isSubmitting || isUploading}
            >
              {isUploading ? 'Uploading...' : (isSubmitting ? 'Saving...' : 'Save Project')}
            </button>
          </div>
        </form>
      </GlassFormWrapper>
    </div>
  );
};

export default ProjectForm;

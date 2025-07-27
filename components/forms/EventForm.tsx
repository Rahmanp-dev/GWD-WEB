"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SerializedEvent } from "@/lib/models/Event";

interface EventFormProps {
  event?: SerializedEvent;
  isNew?: boolean;
}

const EventForm = ({ event, isNew = false }: EventFormProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: event?.title || "",
    date: event ? event.date.split('T')[0] : "",
    location: event?.location || "",
    time: event?.time || "",
    description: event?.description || "",
    imageUrl: event?.imageUrl || "",
    googleFormUrl: event?.googleFormUrl || "",
    status: event?.status || "Upcoming",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const url = isNew ? "/api/admin/events" : `/api/admin/events/${event?._id}`;
    const method = isNew ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`Failed to ${isNew ? 'create' : 'update'} event`);
      }

      router.push("/admin/events");
      router.refresh(); // Refresh server components
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-8 rounded-lg">
      {error && <p className="text-red-500">{error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300">Title</label>
          <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm text-white p-2" />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-300">Date</label>
          <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm text-white p-2" />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-300">Location</label>
          <input type="text" name="location" id="location" value={formData.location} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm text-white p-2" />
        </div>
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-300">Time</label>
          <input type="text" name="time" id="time" value={formData.time} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm text-white p-2" />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-300">Image URL</label>
          <input type="text" name="imageUrl" id="imageUrl" value={formData.imageUrl} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm text-white p-2" />
        </div>
        <div>
          <label htmlFor="googleFormUrl" className="block text-sm font-medium text-gray-300">Google Form URL</label>
          <input type="text" name="googleFormUrl" id="googleFormUrl" value={formData.googleFormUrl} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm text-white p-2" />
        </div>
        {formData.imageUrl && (
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300">Image Preview</label>
            <img src={formData.imageUrl} alt="Event Preview" className="mt-2 rounded-lg max-h-48" />
          </div>
        )}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-300">Status</label>
          <select name="status" id="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm text-white p-2">
            <option>Upcoming</option>
            <option>Past</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
        <textarea name="description" id="description" value={formData.description} onChange={handleChange} required rows={4} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm text-white p-2"></textarea>
      </div>

      <div className="flex justify-end">
        <button type="submit" disabled={isSubmitting} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50">
          {isSubmitting ? 'Saving...' : (isNew ? 'Create Event' : 'Update Event')}
        </button>
      </div>
    </form>
  );
};

export default EventForm;
'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { GlassInput } from '../ui/GlassInput';
import { NeonButton } from '../ui/NeonButton';

interface ClientFormProps {
  serviceLabel: string;
}

export const ClientForm = ({ serviceLabel }: ClientFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: serviceLabel,
    details: '',
    budget: '',
  });

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isContinuous, setIsContinuous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContinuousChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsContinuous(e.target.checked);
    if (e.target.checked) {
      setEndDate(''); // Clear end date
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', company: '', service: serviceLabel, details: '', budget: '' });
    setStartDate('');
    setEndDate('');
    setIsContinuous(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!startDate) {
      toast.error('Please select a start date.');
      return;
    }
    if (!isContinuous && !endDate) {
      toast.error('Please select an end date or mark the project as continuous.');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      ...formData,
      timeline: {
        startDate,
        endDate: isContinuous ? 'Continuous' : endDate,
      },
      type: 'client',
    };

    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast.success('Inquiry submitted successfully!');
        resetForm();
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || 'Failed to submit inquiry.');
      }
    } catch (err) {
      toast.error('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name">Name</label>
          <GlassInput type="text" name="name" id="name" placeholder="Your Full Name" value={formData.name} onChange={handleChange} required className="mt-2" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <GlassInput type="email" name="email" id="email" placeholder="your.email@example.com" value={formData.email} onChange={handleChange} required className="mt-2" />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <GlassInput type="tel" name="phone" id="phone" placeholder="(555) 123-4567" value={formData.phone} onChange={handleChange} required className="mt-2" />
        </div>
        <div>
          <label htmlFor="company">Company</label>
          <GlassInput type="text" name="company" id="company" placeholder="Your Company, Inc." value={formData.company} onChange={handleChange} className="mt-2" />
        </div>
        <div>
          <label htmlFor="budget">Budget (INR)</label>
          <GlassInput type="number" name="budget" id="budget" placeholder="e.g., 400000" value={formData.budget} onChange={handleChange} required className="mt-2" />
        </div>
        <div>
          <label htmlFor="service">Service</label>
          <GlassInput type="text" name="service" id="service" value={serviceLabel} readOnly className="mt-2 cursor-not-allowed opacity-70" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="details">Project Details</label>
          <GlassInput as="textarea" name="details" id="details" placeholder="Tell us everything about your project..." value={formData.details} onChange={handleChange} required rows={5} className="mt-2" />
        </div>

        <div className="sm:col-span-2">
          <label className="block mb-2 font-semibold">Project Timeline</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center p-4 glass-panel -m-4 mt-2">
            <div>
              <label htmlFor="startDate" className="text-sm opacity-80 mb-1 block">Start Date</label>
              <GlassInput
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="mt-1"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div>
              <label htmlFor="endDate" className="text-sm opacity-80 mb-1 block">End Date</label>
              <GlassInput
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required={!isContinuous}
                disabled={isContinuous}
                className={`mt-1 w-full ${isContinuous ? 'opacity-50 cursor-not-allowed' : ''}`}
                min={startDate || new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              id="continuous"
              checked={isContinuous}
              onChange={handleContinuousChange}
              className="custom-checkbox"
            />
            <label htmlFor="continuous" className="ml-3 text-sm cursor-pointer">
              This is a continuous / ongoing project.
            </label>
          </div>
        </div>
      </div>
      <div className="pt-6 mt-6 flex justify-end border-t border-white/10">
        <NeonButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
        </NeonButton>
      </div>
    </form>
  );
};

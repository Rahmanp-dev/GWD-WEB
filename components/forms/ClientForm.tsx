'use client';

import { useState } from 'react';
import { DateRange } from 'react-date-range';
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
  const [dateRange, setDateRange] = useState<any[]>([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', company: '', service: serviceLabel, details: '', budget: '' });
    setDateRange([
      {
        startDate: new Date(),
        endDate: null,
        key: 'selection',
      },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const payload = {
      ...formData,
      service: serviceLabel,
      timeline: { startDate: dateRange[0].startDate, endDate: dateRange[0].endDate },
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
        toast.error(errorData.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      toast.error('An unexpected error occurred. Please check your connection and try again.');
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
          <label>Project Timeline</label>
          <div className="mt-2 glass-panel p-4">
            <DateRange
                editableDateInputs={true}
                onChange={item => setDateRange([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                minDate={new Date()}
                rangeColors={[ '#E53935' ]}
                className="w-full bg-transparent"
            />
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

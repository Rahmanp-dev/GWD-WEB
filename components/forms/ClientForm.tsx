"use client";

import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; 
import "react-date-range/dist/theme/default.css";
import { toast } from "react-hot-toast";
import "../ServiceFormStyles.css";

interface ClientFormProps {
  serviceLabel: string;
}

export const ClientForm = ({ serviceLabel }: ClientFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: serviceLabel,
    details: "",
    budget: "",
  });
  const [dateRange, setDateRange] = useState<any[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      service: serviceLabel,
      details: "",
      budget: "",
    });
    setDateRange([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const payload = {
      ...formData,
      service: serviceLabel,
      timeline: {
        startDate: dateRange[0].startDate,
        endDate: dateRange[0].endDate,
      },
      type: "client",
    };

    try {
        const res = await fetch("/api/requests", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          toast.success("Inquiry submitted!");
          resetForm();
        } else {
          const errorData = await res.json();
          toast.error(errorData.error || "Submission failed");
        }
    } catch(err) {
        toast.error("An unexpected error occurred.");
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="name" className="block text-sm font-semibold text-white mb-1">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 bg-white/10 dark:bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 shadow transition-all duration-200"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="email" className="block text-sm font-semibold text-white mb-1">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 bg-white/10 dark:bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 shadow transition-all duration-200"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="phone" className="block text-sm font-semibold text-white mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-3 bg-white/10 dark:bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 shadow transition-all duration-200"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="company" className="block text-sm font-semibold text-white mb-1">Company</label>
            <input
              type="text"
              name="company"
              id="company"
              placeholder="Company (Optional)"
              value={formData.company}
              onChange={handleChange}
              className="w-full p-3 bg-white/10 dark:bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 shadow transition-all duration-200"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="budget" className="block text-sm font-semibold text-white mb-1">Budget</label>
            <select
              name="budget"
              id="budget"
              value={formData.budget}
              onChange={handleChange}
              required
              className="w-full p-3 bg-white/10 dark:bg-black/30 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 shadow transition-all duration-200"
            >
              <option value="">Select Budget</option>
              <option value="<5k"> &lt; $5,000</option>
              <option value="5k-10k">$5,000 - $10,000</option>
              <option value="10k-25k">$10,000 - $25,000</option>
              <option value=">25k">$25,000+</option>
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="service" className="block text-sm font-semibold text-white mb-1">Service</label>
            <input
              type="text"
              name="service"
              id="service"
              value={serviceLabel}
              readOnly
              className="w-full p-3 bg-white/10 dark:bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 shadow transition-all duration-200 cursor-not-allowed"
            />
          </div>
        </div>
        <div>
          <label htmlFor="details" className="block text-sm font-semibold text-white mb-1">Project Details</label>
          <textarea
            name="details"
            id="details"
            placeholder="Project Details"
            value={formData.details}
            onChange={handleChange}
            required
            className="w-full p-3 bg-white/10 dark:bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 shadow transition-all duration-200"
            rows={4}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-white mb-1">Project Timeline</label>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 bg-white/10 dark:bg-white/10 p-2 md:p-4 rounded-lg border border-white/20 dark:border-white/20">
              <div className="flex-1 flex flex-col items-center">
                <span className="text-xs text-gray-300 mb-1">Start Date</span>
                <span className="font-semibold text-white bg-white/20 px-2 py-1 rounded shadow-sm">
                  {dateRange[0].startDate?.toLocaleDateString()}
                </span>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <span className="text-xs text-gray-300 mb-1">End Date</span>
                <span className="font-semibold text-white bg-white/20 px-2 py-1 rounded shadow-sm">
                  {dateRange[0].endDate?.toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="mt-2">
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDateRange([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                minDate={new Date()}
                rangeColors={["#E53935"]}
                className="w-full"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end mt-4">
          <button
            type="submit"
            className="group/btn relative block h-12 w-full rounded-md bg-gradient-to-br from-red-600 to-pink-600 font-bold text-white shadow-lg hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-red-500"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Inquiry"}
          </button>
        </div>
    </form>
  )
}
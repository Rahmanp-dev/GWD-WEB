"use client";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { toast } from "react-hot-toast";
import "./ServiceFormStyles.css";
import { GlassFormWrapper } from "./GlassFormWrapper";

interface RequestPayload {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  details: string;
  budget: string;
  timeline: { from?: Date; to?: Date };
}

const inputBase =
  "p-3 bg-white/5 dark:bg-white/10 border border-[rgba(0,0,0,0.15)] dark:border-white/20 rounded-lg text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500/70 shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] transition-all duration-200";

const ServiceForm = ({
  service,
  serviceLabel,
  isFreelancer: isFreelancerProp,
}: {
  service: string;
  serviceLabel: string;
  isFreelancer?: boolean;
}) => {
  const [formData, setFormData] = useState<RequestPayload>({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: service,
    details: "",
    budget: "",
    timeline: {},
  });
  const [dateRange, setDateRange] = useState<any[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shutter, setShutter] = useState(false);
  const domainOptions = [
    "Full Stack Web Development (MERN / Next.js)",
    "App Development (Flutter / React Native / Android / iOS)",
    "Website Deployment & Hosting (Netlify, Vercel, AWS, etc.)",
    "Game Development (Unity / Unreal Engine)",
    "3D Animation / 3D Modeling (Blender, Maya, Cinema 4D)",
    "Video Editing (Premiere Pro, Final Cut, After Effects)",
    "Graphic Design (Photoshop, Illustrator, Figma)",
    "Programming (Python, Java, C++, etc.)",
    "UI/UX Design",
    "Other:",
  ];
  const [freelancer, setFreelancer] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    experience: "",
    skills: [] as string[],
    resume: null as File | null,
    coverLetter: "",
    skillDescription: "",
    githubOrPortfolio: "",
    workSamples: "",
  });
  const fileInputRef = useRef(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const [isFreelancer, setIsFreelancer] = useState(isFreelancerProp ?? false);
  const isFreelancerControlled = typeof isFreelancerProp === 'boolean';

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFreelancerChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, files, type, checked } = e.target as HTMLInputElement;
    if (name === "resume") {
      if (files && files[0]) {
        setFreelancer((f) => ({ ...f, resume: files[0] }));
      }
    } else if (name === "skills") {
      if (type === "checkbox") {
        setFreelancer((f) =>
          checked
            ? { ...f, skills: [...(f.skills || []), value] }
            : { ...f, skills: (f.skills || []).filter((d) => d !== value) }
        );
      }
    } else {
      setFreelancer((f) => ({ ...f, [name]: value }));
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      service: service,
      details: "",
      budget: "",
      timeline: {},
    });
    setFreelancer({
      name: "",
      email: "",
      phone: "",
      city: "",
      experience: "",
      skills: [],
      resume: null,
      coverLetter: "",
      skillDescription: "",
      githubOrPortfolio: "",
      workSamples: "",
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
    if (isFreelancer) {
      const formDataObj = new FormData();
      Object.entries(freelancer).forEach(([key, value]) => {
        if (key === "skills") {
          if (Array.isArray(value) && value.length > 0) {
            formDataObj.append("skills", value.join(","));
          }
        } else if (key === "resume" && value) {
          formDataObj.append("resume", value as File);
        } else if (value !== null && value !== undefined && value !== "") {
          formDataObj.append(key, value as string);
        }
      });
      formDataObj.append("type", "freelancer");
      const res = await fetch("/api/requests", {
        method: "POST",
        body: formDataObj,
      });
      if (res.ok) {
        toast.success("Application submitted!");
        resetForm();
      } else {
        toast.error("Submission failed");
      }
    } else {
      // Client: JSON
      const payload = {
        ...formData,
        service: serviceLabel,
        timeline: {
          startDate: dateRange[0].startDate,
          endDate: dateRange[0].endDate,
        },
        type: "client",
      };
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast.success("Inquiry submitted!");
        resetForm();
      } else {
        toast.error("Submission failed");
      }
    }
    setIsSubmitting(false);
  };

  // Shutter animation logic
  const handleFreelancerToggle = () => {
    if (isFreelancerControlled) return;
    setShutter(true);
    setTimeout(() => {
      setIsFreelancer((v) => !v);
      setShutter(false);
    }, 400);
  };

  return (
    <section
      id="service-form"
      className="py-8 md:py-20 bg-transparent my-8 md:my-16 mx-2"
    >
      <div className="max-w-2xl md:max-w-4xl mx-auto px-2 md:px-8">
        <GlassFormWrapper>
          <h2 className="text-3xl font-extrabold text-white mb-2 text-center tracking-tight drop-shadow-lg">
          {isFreelancer ? (
            "Freelancer Onboarding"
          ) : (
            <>
                You chose <span className="text-red-400">{serviceLabel}</span> — tell us more about your project!
            </>
          )}
        </h2>
          <p className="mt-2 max-w-xl mx-auto text-base text-neutral-300 text-center mb-6">
            Please fill out the form below and our team will get back to you as soon as possible.
          </p>
        <div
          className={clsx(
            "relative transition-all duration-400",
            shutter && "overflow-hidden"
          )}
          style={{ minHeight: 480 }}
        >
          {!isFreelancer && !shutter && (
            <form
              onSubmit={handleSubmit}
                className="space-y-6"
            >
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <label htmlFor="name" className="block text-sm font-semibold text-white mb-1">Name</label>
              <input
                ref={firstInputRef}
                type="text"
                name="name"
                      id="name"
                placeholder="Your Name"
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
                  {!isFreelancerControlled && (
                    <label className="mb-2 flex items-center gap-2 text-xs md:text-sm font-medium text-white">
                  Want to work with GWD?
                  <input
                    type="checkbox"
                    checked={isFreelancer}
                    onChange={handleFreelancerToggle}
                    className="accent-red-500 w-5 h-5"
                  />
                </label>
                  )}
                <button
                  type="submit"
                    className="group/btn relative block h-12 w-full rounded-md bg-gradient-to-br from-red-600 to-pink-600 font-bold text-white shadow-lg hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-red-500"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                </button>
              </div>
            </form>
          )}
          {isFreelancer && !shutter && (
            <form
              onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bg-white/10 dark:bg-black/30 rounded-xl p-4 md:p-8 shadow-lg relative animate-fade-in-freelancer"
            >
              <div>
                  <label className="block font-semibold mb-2 text-black dark:text-white">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                    value={freelancer.name}
                  onChange={handleFreelancerChange}
                  required
                  className={inputBase}
                />
              </div>
              <div>
                  <label className="block font-semibold mb-2 text-black dark:text-white">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                    value={freelancer.email}
                  onChange={handleFreelancerChange}
                  required
                  className={inputBase}
                />
              </div>
              <div>
                  <label className="block font-semibold mb-2 text-black dark:text-white">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                    value={freelancer.phone}
                  onChange={handleFreelancerChange}
                  required
                  className={inputBase}
                />
              </div>
              <div>
                  <label className="block font-semibold mb-2 text-black dark:text-white">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                    value={freelancer.city}
                  onChange={handleFreelancerChange}
                  required
                  className={inputBase}
                />
              </div>
              <div className="md:col-span-2">
                  <label className="block font-semibold mb-2 text-black dark:text-white">
                  LinkedIn / Portfolio / Website{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  name="githubOrPortfolio"
                  placeholder="LinkedIn / Portfolio / Website"
                    value={freelancer.githubOrPortfolio}
                  onChange={handleFreelancerChange}
                  required
                  className={inputBase + " w-full"}
                />
              </div>
              <div className="md:col-span-2">
                  <label className="block font-semibold mb-2 text-black dark:text-white">
                  Which domain(s) are you skilled in?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {domainOptions.map((option) => (
                    <label
                      key={option}
                        className="flex items-center gap-2 text-sm font-medium text-black dark:text-white"
                    >
                      <input
                        type="checkbox"
                          name="skills"
                        value={option}
                          checked={freelancer.skills.includes(option)}
                        onChange={handleFreelancerChange}
                        className="accent-red-500 w-5 h-5"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                  <label className="block font-semibold mb-2 text-black dark:text-white">
                  How many years of experience do you have?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="experience"
                  placeholder="Years of Experience"
                    value={freelancer.experience}
                  onChange={handleFreelancerChange}
                  required
                  className={inputBase}
                />
              </div>
              <div className="md:col-span-2">
                  <label className="block font-semibold mb-2 text-black dark:text-white">
                  Briefly describe your skill set or the tools you use.{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="skillDescription"
                  value={freelancer.skillDescription}
                  onChange={handleFreelancerChange}
                  required
                  className={inputBase + " w-full"}
                  rows={3}
                />
              </div>
              <div className="md:col-span-2">
                  <label className="block font-semibold mb-2 text-black dark:text-white">
                  G-drive link of Your Work Samples (Screenshots or Videos){" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  name="workSamples"
                  placeholder="G-drive link of Your Work Samples (Screenshots or Videos)"
                    value={freelancer.workSamples}
                  onChange={handleFreelancerChange}
                  required
                  className={inputBase + " w-full"}
                />
              </div>
              <div className="md:col-span-2">
                  <label className="block font-semibold mb-2 text-black dark:text-white">
                  Upload CV / Resume (PDF){" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  name="resume"
                  accept="application/pdf"
                  ref={fileInputRef}
                  onChange={handleFreelancerChange}
                  required
                  className={inputBase + " w-full"}
                />
              </div>
              <div className="md:col-span-2">
                  <label className="block font-semibold mb-2 text-black dark:text-white">
                  Cover Letter <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="coverLetter"
                  placeholder="Cover Letter"
                    value={freelancer.coverLetter}
                  onChange={handleFreelancerChange}
                  required
                  className={inputBase + " w-full"}
                  rows={4}
                />
              </div>
              <div className="md:col-span-2 flex flex-col items-end mt-4">
                  {!isFreelancerControlled && (
                    <label className="mb-2 flex items-center gap-2 text-xs md:text-sm font-medium text-black dark:text-white">
                  Are you a freelancer?
                  <input
                    type="checkbox"
                    checked={isFreelancer}
                    onChange={handleFreelancerToggle}
                    className="accent-red-500 w-5 h-5"
                  />
                </label>
                  )}
                <button
                  type="submit"
                    className="mt-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform w-full md:w-auto text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-red-500/70"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          )}
          {shutter && (
            <div className="absolute inset-0 z-50 flex flex-col pointer-events-none">
                <div className="flex-1 bg-white/90 dark:bg-black/50 shutter-top transition-all duration-400" />
                <div className="flex-1 bg-white/90 dark:bg-black/50 shutter-bottom transition-all duration-400" />
            </div>
          )}
        </div>
        </GlassFormWrapper>
      </div>
    </section>
  );
};

export default ServiceForm;

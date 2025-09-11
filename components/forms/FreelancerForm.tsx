"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import "../ServiceFormStyles.css";

const inputBase =
  "w-full p-3 bg-white/10 dark:bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 shadow transition-all duration-200";

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

export const FreelancerForm = () => {
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFreelancerChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, files, type } = e.target as HTMLInputElement;
    if (name === "resume") {
      if (files && files[0]) {
        setFreelancer((f) => ({ ...f, resume: files[0] }));
      }
    } else if (name === "skills") {
        const { checked } = e.target as HTMLInputElement;
        setFreelancer((f) =>
            checked
            ? { ...f, skills: [...(f.skills || []), value] }
            : { ...f, skills: (f.skills || []).filter((d) => d !== value) }
        );
    } else {
      setFreelancer((f) => ({ ...f, [name]: value }));
    }
  };

  const resetForm = () => {
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
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

    try {
        const res = await fetch("/api/requests", {
          method: "POST",
          body: formDataObj,
        });

        if (res.ok) {
          toast.success("Application submitted!");
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
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bg-white/10 dark:bg-black/30 rounded-xl p-4 md:p-8 shadow-lg relative animate-fade-in-freelancer"
    >
        <div>
            <label className="block font-semibold mb-2 text-white">
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
            <label className="block font-semibold mb-2 text-white">
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
            <label className="block font-semibold mb-2 text-white">
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
            <label className="block font-semibold mb-2 text-white">
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
            <label className="block font-semibold mb-2 text-white">
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
            <label className="block font-semibold mb-2 text-white">
            Which domain(s) are you skilled in?{" "}
            <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {domainOptions.map((option) => (
                <label
                key={option}
                className="flex items-center gap-2 text-sm font-medium text-white"
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
            <label className="block font-semibold mb-2 text-white">
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
            <label className="block font-semibold mb-2 text-white">
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
            <label className="block font-semibold mb-2 text-white">
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
            <label className="block font-semibold mb-2 text-white">
            Upload CV / Resume (PDF){" "}
            <span className="text-red-500">*</span>
            </label>
            <input
            type="file"
            name="resume"
            accept="application/pdf"
            onChange={handleFreelancerChange}
            required
            className={inputBase + " w-full"}
            />
        </div>
        <div className="md:col-span-2">
            <label className="block font-semibold mb-2 text-white">
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
            <button
              type="submit"
              className="group/btn relative block h-12 w-full rounded-md bg-gradient-to-br from-red-600 to-pink-600 font-bold text-white shadow-lg hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-red-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
        </div>
    </form>
  )
}

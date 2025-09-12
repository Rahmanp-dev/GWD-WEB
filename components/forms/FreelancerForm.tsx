'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { GlassInput } from '../ui/GlassInput';
import { NeonButton } from '../ui/NeonButton';

const domainOptions = [
  'Full Stack Web Development (MERN / Next.js)',
  'App Development (Flutter / React Native / Android / iOS)',
  'Website Deployment & Hosting (Netlify, Vercel, AWS, etc.)',
  'Game Development (Unity / Unreal Engine)',
  '3D Animation / 3D Modeling (Blender, Maya, Cinema 4D)',
  'Video Editing (Premiere Pro, Final Cut, After Effects)',
  'Graphic Design (Photoshop, Illustrator, Figma)',
  'Programming (Python, Java, C++, etc.)',
  'UI/UX Design',
  'Other',
];

export const FreelancerForm = () => {
  const [freelancer, setFreelancer] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    experience: '',
    expectedSalary: '',
    skills: [] as string[],
    resume: null as File | null,
    coverLetter: '',
    skillDescription: '',
    githubOrPortfolio: '',
    workSamples: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFreelancerChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === 'file') {
      const { files } = e.target as HTMLInputElement;
      if (files && files[0]) setFreelancer(f => ({ ...f, resume: files[0] }));
    } else if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFreelancer(f => ({
        ...f,
        skills: checked
          ? [...(f.skills || []), value]
          : (f.skills || []).filter(d => d !== value),
      }));
    } else {
      setFreelancer(f => ({ ...f, [name]: value }));
    }
  };

  const resetForm = () => {
    setFreelancer({ name: '', email: '', phone: '', city: '', experience: '', expectedSalary: '', skills: [], resume: null, coverLetter: '', skillDescription: '', githubOrPortfolio: '', workSamples: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((freelancer.skills.length === 0)) {
      toast.error('Please select at least one skill.');
      return;
    }
    setIsSubmitting(true);
    const formDataObj = new FormData();
    Object.entries(freelancer).forEach(([key, value]) => {
      if (key === 'skills') {
        if (Array.isArray(value) && value.length > 0) formDataObj.append('skills', value.join(', '));
      } else if (key === 'resume' && value) {
        formDataObj.append('resume', value as File);
      } else if (value) {
        formDataObj.append(key, value as string);
      }
    });
    formDataObj.append('type', 'freelancer');

    try {
      const res = await fetch('/api/requests', { method: 'POST', body: formDataObj });
      if (res.ok) {
        toast.success('Application submitted successfully!');
        resetForm();
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || 'Failed to submit application.');
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
          <label htmlFor="name">Full Name <span className="text-red-500">*</span></label>
          <GlassInput type="text" name="name" id="name" placeholder="Your Full Name" value={freelancer.name} onChange={handleFreelancerChange} required className="mt-2" />
        </div>
        <div>
          <label htmlFor="email">Email Address <span className="text-red-500">*</span></label>
          <GlassInput type="email" name="email" id="email" placeholder="your.email@example.com" value={freelancer.email} onChange={handleFreelancerChange} required className="mt-2" />
        </div>
        <div>
          <label htmlFor="phone">Phone Number <span className="text-red-500">*</span></label>
          <GlassInput type="tel" name="phone" id="phone" placeholder="(555) 123-4567" value={freelancer.phone} onChange={handleFreelancerChange} required className="mt-2" />
        </div>
        <div>
          <label htmlFor="city">City <span className="text-red-500">*</span></label>
          <GlassInput type="text" name="city" id="city" placeholder="Your City" value={freelancer.city} onChange={handleFreelancerChange} required className="mt-2" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="githubOrPortfolio">LinkedIn / Portfolio / Website <span className="text-red-500">*</span></label>
          <GlassInput type="url" name="githubOrPortfolio" id="githubOrPortfolio" placeholder="https://..." value={freelancer.githubOrPortfolio} onChange={handleFreelancerChange} required className="mt-2" />
        </div>
        <div className="sm:col-span-2">
          <label>Domain(s) of Expertise <span className="text-red-500">*</span></label>
          <div className="mt-2 glass-panel p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {domainOptions.map(option => (
                <GlassInput 
                  key={option} 
                  type="checkbox" 
                  name="skills" 
                  label={option}
                  value={option} 
                  checked={freelancer.skills.includes(option)} 
                  onChange={handleFreelancerChange} 
                />
            ))}
          </div>
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="experience">Years of Experience <span className="text-red-500">*</span></label>
          <GlassInput type="number" name="experience" id="experience" placeholder="e.g., 5" value={freelancer.experience} onChange={handleFreelancerChange} required className="mt-2" />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="expectedSalary">Expected Salary (INR) <span className="text-red-500">*</span></label>
          <GlassInput type="number" name="expectedSalary" id="expectedSalary" placeholder="e.g., 800000" value={freelancer.expectedSalary} onChange={handleFreelancerChange} required className="mt-2" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="skillDescription">Skill Set Description <span className="text-red-500">*</span></label>
          <GlassInput as="textarea" name="skillDescription" id="skillDescription" value={freelancer.skillDescription} onChange={handleFreelancerChange} required rows={4} placeholder="e.g., Proficient in React, Node.js, and serverless architectures..." className="mt-2" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="workSamples">Work Samples Link (G-Drive, etc.) <span className="text-red-500">*</span></label>
          <GlassInput type="url" name="workSamples" id="workSamples" placeholder="https://..." value={freelancer.workSamples} onChange={handleFreelancerChange} required className="mt-2" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="resume">CV / Resume (PDF) <span className="text-red-500">*</span></label>
          <GlassInput type="file" name="resume" id="resume" accept=".pdf" onChange={handleFreelancerChange} required className="mt-2 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="coverLetter">Cover Letter <span className="text-red-500">*</span></label>
          <GlassInput as="textarea" name="coverLetter" id="coverLetter" placeholder="Briefly tell us why you're a great fit for our team..." value={freelancer.coverLetter} onChange={handleFreelancerChange} required rows={6} className="mt-2" />
        </div>
      </div>
      <div className="pt-6 mt-6 flex justify-end border-t border-white/10">
        <NeonButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </NeonButton>
      </div>
    </form>
  );
};

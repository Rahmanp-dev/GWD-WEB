'use client';

import { useState } from "react";
import ServiceForm from "@/components/ServiceForm";
import BackgroundParticles from "@/components/BackgroundParticles";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const DOMAINS = [
  { label: "Web Development", value: "Web Development" },
  { label: "Mobile/App Development", value: "Mobile/App Development" },
  { label: "3D Animation", value: "3D Animation" },
  { label: "Security", value: "Security" },
  { label: "Video Editing", value: "Video Editing" },
  { label: "Game Development", value: "Game Development" },
];

function ServicesPageInner() {
  const [selectedDomain, setSelectedDomain] = useState(DOMAINS[0].value);
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = searchParams?.get("type") === "freelancer" ? "freelancer" : "client";
  const [formType, setFormType] = useState<"client" | "freelancer">(initialType);

  // Update URL when toggling form type
  const handleFormTypeChange = (type: "client" | "freelancer") => {
    setFormType(type);
    const url = new URL(window.location.href);
    url.searchParams.set("type", type);
    window.history.replaceState({}, "", url.toString());
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center py-24 px-4 sm:px-6 lg:px-8">
      <BackgroundParticles />
      <main className="relative z-10 w-full max-w-4xl">
        <div className="w-full flex flex-col items-center gap-8">
          {/* Toggle/Segmented Control */}
          <div className="flex justify-center gap-2 mb-4 p-1 rounded-full glass-panel">
            <button
              className={`px-6 py-2 rounded-full font-semibold text-base md:text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 ${formType === "client" ? "bg-red-500 text-white shadow-lg" : "text-white/80 hover:bg-white/10"}`}
              onClick={() => handleFormTypeChange("client")}
              aria-pressed={formType === "client"}
              aria-label="Show client inquiry form"
            >
              I'm a Client
            </button>
            <button
              className={`px-6 py-2 rounded-full font-semibold text-base md:text-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 ${formType === "freelancer" ? "bg-red-500 text-white shadow-lg" : "text-white/80 hover:bg-white/10"}`}
              onClick={() => handleFormTypeChange("freelancer")}
              aria-pressed={formType === "freelancer"}
              aria-label="Show freelancer onboarding form"
            >
              I'm a Freelancer
            </button>
          </div>

          {/* Domain Selector (Client only) */}
          {formType === "client" && (
            <div className="glass-panel p-6 w-full">
              <h2 className="text-xl font-bold text-white mb-4 text-center tracking-wider">Select a Service</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {DOMAINS.map((domain) => (
                  <label key={domain.value} className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer border-2 transition-all duration-150 ${selectedDomain === domain.value ? 'bg-red-500/30 border-red-500 text-white' : 'bg-white/5 border-transparent text-white/80 hover:bg-white/10'}` }>
                    <input
                      type="radio"
                      name="domain"
                      value={domain.value}
                      checked={selectedDomain === domain.value}
                      onChange={() => setSelectedDomain(domain.value)}
                      className="hidden"
                    />
                    <span className="text-base font-medium">{domain.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Form */}
          <div className="w-full">
            <ServiceForm
              key={formType + (formType === 'client' ? selectedDomain : '')}
              serviceLabel={selectedDomain}
              isFreelancer={formType === "freelancer"}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-white">Loading...</div>}>
      <ServicesPageInner />
    </Suspense>
  );
}

"use client";

import { useState } from "react";
import ServiceForm from "@/components/ServiceForm";
import BackgroundParticles from "@/components/BackgroundParticles";
import { useRouter, useSearchParams } from "next/navigation";

const DOMAINS = [
  { label: "Web Development", value: "Web Development" },
  { label: "Mobile/App Development", value: "Mobile/App Development" },
  { label: "3D Animation", value: "3D Animation" },
  { label: "Security", value: "Security" },
  { label: "Video Editing", value: "Video Editing" },
  { label: "Game Development", value: "Game Development" },
];

export default function ServicesPage() {
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
    <div className="relative min-h-screen w-full flex flex-col items-center bg-black/40 overflow-x-hidden">
      <BackgroundParticles />
      <main className="relative z-10 w-full flex flex-col items-center justify-center py-8 px-2">
        <div className="w-full max-w-3xl flex flex-col gap-8 md:gap-12">
          {/* Toggle/Segmented Control */}
          <div className="flex justify-center gap-2 mb-4 md:mb-8">
            <button
              className={`px-6 py-2 rounded-l-full font-semibold text-base md:text-lg transition-all duration-200 focus:outline-none border border-white/20 ${formType === "client" ? "bg-white/20 text-red-500 border-red-400" : "bg-white/5 text-white/80 hover:bg-white/10"}`}
              onClick={() => handleFormTypeChange("client")}
              aria-pressed={formType === "client"}
              aria-label="Show client inquiry form"
            >
              I'm a Client
            </button>
            <button
              className={`px-6 py-2 rounded-r-full font-semibold text-base md:text-lg transition-all duration-200 focus:outline-none border border-white/20 ${formType === "freelancer" ? "bg-white/20 text-red-500 border-red-400" : "bg-white/5 text-white/80 hover:bg-white/10"}`}
              onClick={() => handleFormTypeChange("freelancer")}
              aria-pressed={formType === "freelancer"}
              aria-label="Show freelancer onboarding form"
            >
              I'm a Freelancer
            </button>
          </div>
          {/* Domain Selector (Client only) */}
          {formType === "client" && (
            <div className="glass-panel border border-white/15 bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-4 md:p-6 flex flex-col gap-2 w-full">
              <h2 className="text-lg font-bold text-white mb-2 tracking-wide uppercase text-center md:text-left">Select Domain</h2>
              <div className="flex flex-col gap-2">
                {DOMAINS.map((domain) => (
                  <label key={domain.value} className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer border transition-all duration-150 ${selectedDomain === domain.value ? 'bg-white/20 border-red-400 text-red-300' : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'}` }>
                    <input
                      type="radio"
                      name="domain"
                      value={domain.value}
                      checked={selectedDomain === domain.value}
                      onChange={() => setSelectedDomain(domain.value)}
                      className="accent-red-500 w-5 h-5"
                    />
                    <span className="text-base font-medium">{domain.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
          {/* Form */}
          <div className="glass-panel bg-white/10 dark:bg-white/5 border border-white/15 rounded-2xl p-4 md:p-8 shadow-none w-full">
            <ServiceForm
              key={formType + selectedDomain}
              service={selectedDomain}
              serviceLabel={selectedDomain}
              isFreelancer={formType === "freelancer"}
            />
          </div>
        </div>
      </main>
    </div>
  );
} 
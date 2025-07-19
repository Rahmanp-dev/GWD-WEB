"use client";

import HeroWheel from "@/components/HeroWheel";
import PartnersCarousel from "@/components/PartnersCarousel";
import PortfolioCarousel from "@/components/PortfolioCarousel";
import ServiceForm from "@/components/ServiceForm";
import { ExpertiseShowcase } from "@/components/ExpertiseShowcase";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

const services = [
  { key: "web", label: "Web Dev", icon: null },
  { key: "app", label: "App Dev", icon: null },
  { key: "dm", label: "Marketing", icon: null },
  { key: "3d", label: "3D & Motion", icon: null },
  { key: "video", label: "Video Edit", icon: null },
  { key: "ai", label: "AI Tools", icon: null },
  { key: "devops", label: "DevOps", icon: null },
  { key: "security", label: "Security", icon: null },
];

export default function HomeClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const service = searchParams?.get("service");
  const selectedService = services.find((s) => s.key === service);

  const handleServiceSelect = (serviceKey: string) => {
    router.push(`/?service=${serviceKey}`, { scroll: false });
    setTimeout(() => {
      const element = document.getElementById("service-form");
      element?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  return (
    <main>
      <HeroWheel onSelect={handleServiceSelect} />

      <div className="container mx-auto px-2 md:px-4">
        {service && selectedService && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ServiceForm
              service={service}
              serviceLabel={selectedService.label}
            />
          </motion.div>
        )}
      </div>

      <div className="container mx-auto px-2 md:px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Replace old Our Expertise section with new one */}
          <section id="our-expertise">
            <ExpertiseShowcase />
          </section>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-2 md:px-4">
          <PortfolioCarousel />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-2 md:px-4">
          <PartnersCarousel />
        </div>
      </motion.div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        ></motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        ></motion.div>
      </div>
    </main>
  );
}

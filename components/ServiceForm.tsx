'use client';

import { ClientForm } from "./forms/ClientForm";
import { FreelancerForm } from "./forms/FreelancerForm";

interface ServiceFormProps {
  serviceLabel: string;
  isFreelancer?: boolean;
}

const ServiceForm = ({ serviceLabel, isFreelancer }: ServiceFormProps) => {
  return (
    <section id="service-form" className="bg-transparent py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-6 sm:p-8 md:p-10 rounded-2xl border border-white/10 shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase shadow-lg">
              {isFreelancer ? (
                "Freelancer Onboarding"
              ) : (
                <>
                  You chose <span className="text-red-400">{serviceLabel}</span> — tell us more about your project!
                </>
              )}
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-neutral-300">
              {isFreelancer
                ? "Complete the form below to join our network of skilled freelancers."
                : "Please fill out the form below and our team will get back to you as soon as possible."}
            </p>
          </div>
          <div className="relative">
            {isFreelancer ? (
              <FreelancerForm />
            ) : (
              <ClientForm serviceLabel={serviceLabel} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceForm;

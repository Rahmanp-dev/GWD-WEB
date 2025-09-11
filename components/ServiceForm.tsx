"use client";

import { GlassFormWrapper } from "./GlassFormWrapper";
import { ClientForm } from "./forms/ClientForm";
import { FreelancerForm } from "./forms/FreelancerForm";

interface ServiceFormProps {
  serviceLabel: string;
  isFreelancer?: boolean;
}

const ServiceForm = ({ serviceLabel, isFreelancer }: ServiceFormProps) => {
  return (
    <section
      id="service-form"
      className="py-8 md:py-12 bg-transparent my-8 md:my-12 mx-2"
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
            {isFreelancer
              ? "Complete the form below to join our network of skilled freelancers."
              : "Please fill out the form below and our team will get back to you as soon as possible."}
          </p>
          <div className="relative">
            {isFreelancer ? (
              <FreelancerForm />
            ) : (
              <ClientForm serviceLabel={serviceLabel} />
            )}
          </div>
        </GlassFormWrapper>
      </div>
    </section>
  );
};

export default ServiceForm;

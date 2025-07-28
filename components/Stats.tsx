"use client";

import React from "react";
import Link from "next/link";
import CountUp from "./ui/CountUp";

const stats = [
  { value: 450, label: "Experts" },
  { value: 60, label: "Companies in Collaboration" },
  { value: 115, label: "Projects" },
];

export function Stats() {
  return (
    <section >
      <div className="max-w-screen-2xl mx-auto glass-panel p-8 md:p-12 rounded-2xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Built for Scale. Powered by Talent.
            </h2>
            <p className="text-gray-400 mt-6">
              We’re not just a marketplace—we’re an ecosystem of 450+ vetted experts, 60+ trusted enterprise partners, and 115+ successful projects delivered across industries.
Whether you're launching a product, scaling your business, or solving complex tech challenges — our platform connects you with the right talent at the right time.
            </p>
            <Link href="/services" className="inline-block mt-8 bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
              Let's start the Conversation!
            </Link>
          </div>
          <div className="flex flex-col md:flex-row justify-around items-center gap-8 md:gap-0">
            {stats.map((stat, index) => (
              <React.Fragment key={index}>
                <div className="text-center">
                  <div className="text-5xl md:text-6xl font-bold text-white">
                    <CountUp to={stat.value} duration={3} />+
                  </div>
                  <p className="text-gray-400 mt-2 text-sm md:text-base">{stat.label}</p>
                </div>
                {index < stats.length - 1 && (
                  <div className="h-24 w-px bg-gray-700 hidden md:block"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
"use client";

import Image from "next/image";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const partners = [
  { src: "/partners/logo1.jpg", alt: "Partner 1" },
  { src: "/partners/logo2.jpg", alt: "Partner 2" },
  { src: "/partners/logo3.jpg", alt: "Partner 3" },
  { src: "/partners/logo4.jpg", alt: "Partner 4" },
  { src: "/partners/logo5.jpg", alt: "Partner 5" },
  { src: "/partners/logo6.png", alt: "Partner 6" },
  { src: "/partners/logo7.PNG", alt: "Partner 7" },
  { src: "/partners/logo8.jpg", alt: "Partner 8" },
  { src: "/partners/logo9.jpg", alt: "Partner 9" },
  { src: "/partners/logo10.jpg", alt: "Partner 10" },
  { src: "/partners/logo11.png", alt: "Partner 11" },
];

const PartnersCarousel = () => {
  return (
    <section className="glass-panel py-20 bg-white/10 dark:bg-white/5 backdrop-blur-lg rounded-2xl border border-white/20 dark:border-white/20 shadow-2xl my-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-red-600 dark:text-red-400 mb-4">
          TRUSTED PARTNERS
        </h2>
        <p className="text-center text-gray-800 dark:text-gray-200 mb-12">
          Working with leading brands worldwide
        </p>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView={3}
          breakpoints={{
            480: { slidesPerView: 4, spaceBetween: 20 },
            768: { slidesPerView: 5, spaceBetween: 32 },
            1024: { slidesPerView: 6, spaceBetween: 50 },
          }}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          {partners.map((partner, index) => (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center"
            >
              <div className="relative h-12 w-24 md:h-20 md:w-40 md:grayscale md:opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 mx-2">
                <Image
                  src={partner.src}
                  alt={partner.alt}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PartnersCarousel;

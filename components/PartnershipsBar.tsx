import Image from "next/image";

const partners = [
  { name: "MasterGrade", logo: "/partners/logo1.jpg" },
  { name: "Al Ansari International", logo: "/partners/logo2.jpg" },
  { name: "MGBC", logo: "/partners/logo3.jpg" },
  { name: "Xentrox", logo: "/partners/logo4.jpg" },
  { name: "Noobz Media", logo: "/partners/logo5.jpg" },
  { name: "MGPL", logo: "/partners/logo6.png" },
];

const PartnershipsBar = () => {
  return (
    <section className="py-12 bg-white">
      <h3 className="text-center text-2xl font-semibold text-gray-500 mb-8">
        Trusted By
      </h3>
      <div className="relative overflow-hidden">
        <div className="flex animate-scroll">
          {[...partners, ...partners].map((partner, index) => (
            <div key={index} className="flex-shrink-0 mx-8 w-40 h-16 relative">
              <Image
                src={`https://via.placeholder.com/150x50.png?text=${partner.name}`}
                alt={partner.name}
                layout="fill"
                objectFit="contain"
                className="grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
          will-change: transform;
        }
      `}</style>
    </section>
  );
};

export default PartnershipsBar;

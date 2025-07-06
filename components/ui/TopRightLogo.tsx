"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const TopLeftLogo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
      className="fixed top-4 left-4 z-[100] group"
      title="GWD Global"
    >
      <Link href="/" passHref>
        <motion.div
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.95 }}
          className="p-1 md:p-3 glass-panel shadow-md"
        >
          <Image
            src="/logo.png"
            alt="GWD Global Logo"
            width={56}
            height={56}
            className="rounded-full w-10 h-10 md:w-14 md:h-14"
          />
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default TopLeftLogo;

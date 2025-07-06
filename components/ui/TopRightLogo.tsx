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
          className="p-3 glass-panel"
        >
          <Image
            src="/logo.png"
            alt="GWD Global Logo"
            width={60}
            height={60}
            className="rounded-full"
          />
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default TopLeftLogo;

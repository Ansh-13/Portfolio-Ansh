"use client";

import * as motion from "motion/react-client";

export default function Navbar() {
  return (
    <motion.div
      className="flex justify-center bg-white text-black rounded-2xl w-[80%] shadow-lg mt-4 mb-4 "
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.2,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.4,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <ul className="menu menu-horizontal px-1 text-2rem p-4 pb-2 pt-2">
          <motion.li whileHover={{ scale: 1.5 }}>
            <a>About me</a>
          </motion.li>
          <motion.li whileHover={{ scale: 1.5 }}>
            <a>Projects</a>
          </motion.li>
          <motion.li whileHover={{ scale: 1.5 }}>
            <a>Contact Me</a>
          </motion.li>
        </ul>
      </motion.div>
    </motion.div>
  );
}

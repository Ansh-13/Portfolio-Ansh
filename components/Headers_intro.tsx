"use client";
import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import Drag from "./follow_pointer";

export default function Intro() {
  const headingText = "Software Engineer";
  const description =
    "I'm a passionate software engineer who enjoys turning complex problems into clean, efficient, and user-friendly solutions. I love working with modern tech like React, Next.js, and ML tools to build scalable, performant applications.";

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-8 p-6 sm:p-8 bg-black text-white relative overflow-x-hidden text-center">
      <Drag />

      {/* Animated Image Border */}
      <motion.div
        initial={{
          backgroundImage:
            "linear-gradient(0deg, #ff0088, white 40%), url('/intro_pic.jpg')",
        }}
        animate={{
          backgroundImage:
            "linear-gradient(360deg, #ff0088, white 40%), url('/intro_pic.jpg')",
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="relative z-10 p-[2px] rounded-[20px]"
        style={{
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
        }}
      >
        <div
          className="rounded-[16px] w-32 h-32 sm:w-48 sm:h-48 bg-cover bg-center"
          style={{ backgroundImage: "url('/intro_pic.jpg')" }}
        />
      </motion.div>

      {/* Animated Heading */}
      <motion.h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold flex flex-wrap justify-center gap-1 z-10">
        {headingText.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
              color: "#ff0088",
              scale: 1.2,
              transition: { duration: 0.3 },
            }}
            transition={{ delay: index * 0.05 }}
            className="cursor-pointer"
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>

      {/* Animated Paragraph */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="max-w-md sm:max-w-xl md:max-w-3xl text-base sm:text-lg leading-relaxed px-2 sm:px-4 z-20 flex flex-wrap justify-center gap-2"
      >
        {description.split(" ").map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="inline-block cursor-pointer"
            whileHover={{
              color: "#ff0088",
              scale: 1.05,
              transition: { duration: 0.3 },
            }}
          >
            {word}{" "}
          </motion.span>
        ))}
      </motion.p>

      {/* Resume Button */}
      <motion.a
        download
        href="/Cv.pdf"
        initial={{
          backgroundImage:
            "linear-gradient(to right, transparent, transparent), linear-gradient(0deg, #ff0088, transparent 40%)",
        }}
        animate={{
          backgroundImage:
            "linear-gradient(to right, transparent, transparent), linear-gradient(360deg, #ff0088, transparent 40%)",
        }}
        transition={{
          type: "tween",
          ease: "linear",
          duration: 2,
          repeat: Infinity,
        }}
        className="w-36 h-10 sm:w-40 sm:h-10 rounded-[20px] border-2 border-transparent z-10 cursor-pointer flex justify-center items-center"
        style={{
          backgroundClip: "padding-box, border-box",
          backgroundOrigin: "padding-box, border-box",
        }}
      >
        Resume
      </motion.a>

      {/* Social Icons */}
      <div className="flex gap-6 mt-4 sm:mt-6 z-20">
        <motion.a
          href="https://github.com/"
          target="_blank"
          whileHover={{ scale: 1.2, color: "#ff0088" }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Github size={24} className="sm:size-7" />
        </motion.a>
        <motion.a
          href="https://linkedin.com/"
          target="_blank"
          whileHover={{ scale: 1.2, color: "#ff0088" }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Linkedin size={24} className="sm:size-7" />
        </motion.a>
      </div>
    </div>
  );
}

"use client";
import Intor from "@/components/Headers_intro";
import Skills from "@/components/skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { motion, useScroll, useTransform } from "framer-motion";
import { Circle } from "lucide-react";

export default function Home() {
  const { scrollYProgress } = useScroll();

  // Define animation ranges for 4 sections
  const sectionCount = 4;
  const sectionSize = 1 / sectionCount;
  const introRange = [0, sectionSize];
  const skillsRange = [sectionSize, 2 * sectionSize];
  const projectsRange = [2 * sectionSize, 3 * sectionSize];
  const contactRange = [3 * sectionSize, 1];

  // Intro section effects
  const introY = useTransform(
    scrollYProgress,
    [introRange[0], introRange[1], skillsRange[0]],
    ["0%", "-20%", "-100%"]
  );
  const introOpacity = useTransform(
    scrollYProgress,
    [introRange[0], introRange[1], skillsRange[0]],
    [1, 1, 0]
  );

  // Skills section effects
  const skillsY = useTransform(
    scrollYProgress,
    [introRange[1], skillsRange[0], skillsRange[1], projectsRange[0]],
    ["100%", "0%", "0%", "-100%"]
  );
  const skillsOpacity = useTransform(
    scrollYProgress,
    [introRange[1], skillsRange[0], skillsRange[1], projectsRange[0]],
    [0, 1, 1, 0]
  );

  // Projects section effects
  const projectsY = useTransform(
    scrollYProgress,
    [skillsRange[1], projectsRange[0], projectsRange[1], contactRange[0]],
    ["100%", "0%", "0%", "-100%"]
  );
  const projectsOpacity = useTransform(
    scrollYProgress,
    [skillsRange[1], projectsRange[0], projectsRange[1], contactRange[0]],
    [0, 1, 1, 0]
  );

  // Contact section effects
  const contactY = useTransform(
    scrollYProgress,
    [projectsRange[1], contactRange[0], contactRange[1]],
    ["100%", "0%", "-20%"]
  );
  const contactOpacity = useTransform(
    scrollYProgress,
    [projectsRange[1], contactRange[0], contactRange[1]],
    [0, 1, 1]
  );

  // Background effects
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    ["#000000", "#111111", "#222222", "#333333"]
  );

  return (
    <motion.main className="relative" style={{ backgroundColor: bgColor }}>
      <motion.div
        className="absolute z-10 text-pink-500 text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold m-4 sm:m-6 md:m-8 font-serif flex justify-center items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.2 }}
      >
        <div className="flex items-center gap-2">
          <Circle />
          <motion.span whileHover={{ textDecoration: "underline" }}>
            Circle
          </motion.span>
        </div>
      </motion.div>

      {/* Scrollable content container */}
      <div className="h-[400vh] relative">
        {/* Sticky viewport container */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Intro section */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              y: introY,
              opacity: introOpacity,
              zIndex: useTransform(scrollYProgress, (val) =>
                val < skillsRange[0] ? 40 : 10
              ),
            }}
          >
            <Intor />
          </motion.div>

          {/* Skills section */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              y: skillsY,
              opacity: skillsOpacity,
              zIndex: useTransform(scrollYProgress, (val) =>
                val >= skillsRange[0] && val < projectsRange[0] ? 40 : 30
              ),
            }}
          >
            <Skills />
          </motion.div>

          {/* Projects section */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              y: projectsY,
              opacity: projectsOpacity,
              zIndex: useTransform(scrollYProgress, (val) =>
                val >= projectsRange[0] && val < contactRange[0] ? 40 : 20
              ),
            }}
          >
            <Projects />
          </motion.div>

          {/* Contact section */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              y: contactY,
              opacity: contactOpacity,
              zIndex: useTransform(scrollYProgress, (val) =>
                val >= contactRange[0] ? 40 : 10
              ),
            }}
          >
            <Contact />
          </motion.div>
        </div>
      </div>

      {/* Scroll progress indicator (optional) */}
      <motion.div
        className="fixed bottom-4 left-4 h-1 bg-white rounded-full z-50"
        style={{
          width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
        }}
      />
    </motion.main>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { AnimatedDialog } from "./DialogBox";
import {
  Github,
  MoveLeft,
  MoveRight,
  Presentation,
  Target,
} from "lucide-react";
import CursorText from "./cursor_text";
import Drag from "./follow_pointer";

interface Project {
  name: string;
  description: string;
  githubLink: string;
  Technology?: string;
  Learning?: string;
  image_link?: string;
}

const projects: Project[] = [
  {
    name: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with React and Node.js",
    githubLink: "https://github.com/user/ecommerce-platform",
    Technology: "React, Node.js, MongoDB",
    Learning: "Full-stack development, REST APIs, Database management",
    image_link: "",
  },
  {
    name: "Task Management App",
    description: "A productivity app built with TypeScript and Firebase",
    githubLink: "https://github.com/user/task-manager",
    Technology: "React, Node.js, MongoDB",
    Learning: "Full-stack development, REST APIs, Database management",
  },
];

const items = [1, 2];
const colors = ["#0cdcf7", "#d375c6"];

export default function Projects() {
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const setSlide = (newDirection: 1 | -1) => {
    const nextItem =
      ((selectedItem - 1 + newDirection + items.length) % items.length) + 1;
    setSelectedItem(nextItem);
    setDirection(newDirection);
    setDialogOpen(false);
  };

  const color = colors[selectedItem - 1];
  const currentProject = projects[selectedItem - 1];
  const text = ["P", "r", "o", "j", "e", "c", "t", "s"];

  const handleTouchStart = () => {
    if (isMobile) {
      setIsHovered(true);
    }
  };

  const handleTouchEnd = () => {
    if (isMobile) {
      setIsHovered(false);
    }
  };

  return (
    <div className="h-screen w-full overflow-y-auto bg-black">
      <Drag /> {/* Scroll container */}
      <motion.div className="flex flex-col items-center justify-center min-h-screen w-full px-4 py-8 md:py-12">
        <motion.h1 className="mb-8 md:mb-12">
          <CursorText
            letters={text}
            className="text-3xl md:text-4xl font-bold"
          />
        </motion.h1>

        <div className="flex w-full max-w-6xl items-center justify-center gap-2 md:gap-4 relative">
          <motion.button
            initial={false}
            animate={{ backgroundColor: color }}
            aria-label="Previous"
            className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center z-10"
            onClick={() => setSlide(-1)}
            whileFocus={{ outline: `2px solid ${color}` }}
            whileTap={{ scale: 0.9 }}
          >
            <MoveLeft className="w-4 h-4 md:w-5 md:h-5" />
          </motion.button>

          <AnimatePresence custom={direction} initial={false} mode="popLayout">
            <motion.div
              key={selectedItem}
              custom={direction}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -50 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="relative w-full h-64 sm:h-80 lg:h-96 max-w-md md:max-w-lg lg:max-w-xl"
            >
              <motion.div
                className={`group relative h-full w-full rounded-lg ${
                  isHovered ? "hovered" : ""
                }`}
                onMouseEnter={() => !isMobile && setIsHovered(true)}
                onMouseLeave={() => !isMobile && setIsHovered(false)}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {/* Static solid border */}
                <span
                  className={`absolute inset-0 border-2 border-solid border-black rounded-lg transition-all duration-300 ${
                    isHovered ? "opacity-0" : "opacity-100"
                  }`}
                />

                {/* Dotted border (appears on hover) */}
                <span
                  className={`absolute inset-0 border-2 border-dashed border-white rounded-lg transition-all duration-300 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                />

                <div
                  className={`relative flex h-full w-full transform items-end border-2 border-transparent bg-white rounded-lg transition-transform ${
                    isHovered ? "-translate-x-2 -translate-y-2" : ""
                  }`}
                >
                  {/* Default content */}
                  <div
                    className={`p-4 sm:p-6 lg:p-8 rounded-lg transition-all duration-300 w-full ${
                      isHovered ? "opacity-0 absolute" : "opacity-100 relative"
                    }`}
                  >
                    <div className="relative aspect-video w-full overflow-hidden rounded-md mb-4">
                      <img
                        alt={currentProject.name}
                        src={currentProject.img_link}
                        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 ${
                          isHovered ? "scale-105" : "scale-100"
                        }`}
                        loading="lazy"
                      />
                    </div>
                    <h2
                      className={`mt-3 text-center text-lg font-bold text-black transition-all sm:mt-4 sm:text-xl md:text-2xl ${
                        isHovered ? "no-underline" : "underline"
                      }`}
                    >
                      {currentProject.name}
                    </h2>
                  </div>

                  {/* Hover content */}
                  <div
                    className={`absolute p-4 transition-opacity w-full h-full flex flex-col ${
                      isHovered ? "opacity-100 relative" : "opacity-0"
                    } sm:p-6 lg:p-8`}
                  >
                    <div className="flex-grow">
                      {currentProject.Technology && (
                        <div className="flex items-center mb-2 text-gray-700 dark:text-gray-400">
                          <Target className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                          <span className="text-sm md:text-base">
                            {currentProject.Technology}
                          </span>
                        </div>
                      )}
                      {currentProject.Learning && (
                        <div className="flex items-center mb-4 text-gray-700 dark:text-gray-400">
                          <Presentation className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                          <span className="text-sm md:text-base">
                            {currentProject.Learning}
                          </span>
                        </div>
                      )}
                      {isMobile && (
                        <a
                          href={currentProject.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:underline text-sm sm:text-base"
                        >
                          <Github className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                          View on GitHub
                        </a>
                      )}
                    </div>

                    {/* <AnimatedDialog
                      trigger={
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1 md:px-4 md:py-2 rounded-lg self-end"
                          style={{ backgroundColor: color }}
                        >
                          <span className="text-xs md:text-sm">
                            View Details
                          </span>
                        </motion.button>
                      }
                      open={dialogOpen}
                      onOpenChange={setDialogOpen}
                    >
                      <div className="p-4 md:p-6">
                        <h2 className="text-xl md:text-2xl font-bold">
                          {currentProject.name}
                        </h2>
                        <p className="mt-2 text-sm md:text-base">
                          {currentProject.description}
                        </p>
                        <a
                          href={currentProject.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center text-blue-500 hover:underline text-sm md:text-base"
                        >
                          <Github className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                          View on GitHub
                        </a>
                      </div>
                    </AnimatedDialog> */}
                    {!isMobile && (
                      <AnimatedDialog
                        trigger={
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-3 py-1 md:px-4 md:py-2 rounded-lg self-end text-white font-medium"
                            style={{ backgroundColor: color }}
                          >
                            <span className="text-xs md:text-sm">
                              View Details
                            </span>
                          </motion.button>
                        }
                        open={dialogOpen}
                        onOpenChange={setDialogOpen}
                      >
                        <div className="p-4 sm:p-6 max-w-[90vw] sm:max-w-md md:max-w-lg w-full">
                          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">
                            {currentProject.name}
                          </h2>
                          <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4">
                            {currentProject.description}
                          </p>
                          <a
                            href={currentProject.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 hover:underline text-sm sm:text-base"
                          >
                            <Github className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                            View on GitHub
                          </a>
                        </div>
                      </AnimatedDialog>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <motion.button
            initial={false}
            animate={{ backgroundColor: color }}
            aria-label="Next"
            className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center z-10"
            onClick={() => setSlide(1)}
            whileFocus={{ outline: `2px solid ${color}` }}
            whileTap={{ scale: 0.9 }}
          >
            <MoveRight className="w-4 h-4 md:w-5 md:h-5" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

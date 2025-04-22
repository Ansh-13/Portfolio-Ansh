"use client";

import {
  motion,
  useTime,
  useTransform,
  useScroll,
  useAnimationFrame,
  useMotionValue,
} from "motion/react";

import Image from "next/image";
import { useRef } from "react";

export default function Header() {
  const cardRef_right = useRef<HTMLDivElement | null>(null);
  const cardRef_left = useRef<HTMLDivElement | null>(null);

  const xLeft = useMotionValue(0.5);
  const yLeft = useMotionValue(0.5);
  const rotateXLeft = useTransform(yLeft, [0, 1], [15, -15]);
  const rotateYLeft = useTransform(xLeft, [0, 1], [-15, 15]);

  const xRight = useMotionValue(0.5);
  const yRight = useMotionValue(0.5);
  const rotateXRight = useTransform(yRight, [0, 1], [15, -15]);
  const rotateYRight = useTransform(xRight, [0, 1], [-15, 15]);

  const handleMouseMove_right = (e: any) => {
    if (!cardRef_right.current) return;
    const rect = cardRef_right.current.getBoundingClientRect();
    const posX = (e.clientX - rect.left) / rect.width;
    const posY = (e.clientY - rect.top) / rect.height;

    xRight.set(posX);
    yRight.set(posY);
  };

  const handleMouseMove = (e: any) => {
    if (!cardRef_left.current) return;
    const rect = cardRef_left.current.getBoundingClientRect();
    const posX = (e.clientX - rect.left) / rect.width;
    const posY = (e.clientY - rect.top) / rect.height;

    xLeft.set(posX);
    yLeft.set(posY);
  };

  const handleMouseLeave_right = () => {
    xRight.set(0.5);
    yRight.set(0.5);
  };

  const handleMouseLeave_left = () => {
    xLeft.set(0.5);
    yLeft.set(0.5);
  };

  const heading = [
    "👨‍💻",
    "S",
    "O",
    "F",
    "T",
    "W",
    "A",
    "R",
    "E",
    "_",
    "E",
    "N",
    "G",
    "I",
    "N",
    "E",
    "E",
    "R",
  ];

  const time = useTime();
  const rotate = useTransform(time, [0, 2000], [0, 1], {
    clamp: false,
  });

  const { scrollYProgress } = useScroll(); // Track scroll position
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      className="flex flex-col items-center w-full h-full bg-gradient-to-b from-[oklch(0.8_0.0495_332.05)] to-purple-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="flex w-full h-screen p-8 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Left Side - Text */}
        <motion.div
          className="flex-1 bg-white rounded-3xl shadow-xl flex items-center justify-center p-8 relative"
          ref={cardRef_left}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave_left}
          style={{
            rotateX: rotateXLeft,
            rotateY: rotateYLeft,
            transformStyle: "preserve-3d",
          }}
          // whileHover={{ scale: 1.02 }}
          animate={{ opacity: 1 }}
          // whileFocus={{ outline: "dashed #222" }}
        >
          <img
            src="/human1.png"
            alt="Example image"
            className="object-contain -top-5 -left-4 w-20 absolute"
          />
          <img
            /// <reference path="" />

            src="Standing.png"
            alt="Example image"
            className="bottom-0 left-0 w-20 absolute"
          />
          <motion.img
            src="Standing1.png"
            alt="Example image"
            className="bottom-0 left-20 w-25 absolute"
          />
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800  ">
            {heading.map((letter, index) => (
              <motion.span
                key={index}
                className="inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.25,
                  delay: index / 8,
                  // stagger the animation
                }}
                whileHover={{
                  scale: 2,
                  rotate: 10,
                  transition: { type: "spring", stiffness: 1000, damping: 5 },
                  cursor: "grabbing", //crosshair pointer
                }}
              >
                {letter === "_" ? "\u00A0" : letter}
              </motion.span>
            ))}
          </h1>
        </motion.div>

        {/* Right Side - Image */}
        <motion.div
          className="flex-1 bg-white  rounded-3xl  flex items-center justify-center p-8"
          //  whileHover={{ scale: 1.02 }}
          ref={cardRef_right}
          onMouseMove={handleMouseMove_right}
          onMouseLeave={handleMouseLeave_right}
          style={{
            rotateX: rotateXRight,
            rotateY: rotateYRight,
            transformStyle: "preserve-3d",
          }}
        >
          <Image
            src="/intro_pic.jpg"
            alt="Example image"
            width={500}
            height={500}
            className="object-contain rounded-2xl shadow-neutral-600 hover:shadow-2xl transition-shadow duration-300 ease-in-out"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

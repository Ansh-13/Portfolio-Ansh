"use client";

import {
  motion,
  useMotionValue,
  animate,
  useMotionTemplate,
} from "framer-motion";
import { useEffect } from "react";
import Drag from "./follow_pointer";
import ShowCase from "./skillls_showcase";
import CursorText from "./cursor_text";

const pathData =
  "M 239 17 C 142 17 48.5 103 48.5 213.5 C 48.5 324 126 408 244 408 C 362 408 412 319 412 213.5 C 412 108 334 68.5 244 68.5 C 154 68.5 102.68 135.079 99 213.5 C 95.32 291.921 157 350 231 345.5 C 305 341 357.5 290 357.5 219.5 C 357.5 149 314 121 244 121 C 174 121 151.5 167 151.5 213.5 C 151.5 260 176 286.5 224.5 286.5 C 273 286.5 296.5 253 296.5 218.5 C 296.5 184 270 177 244 177 C 218 177 197 198 197 218.5 C 197 239 206 250.5 225.5 250.5 C 245 250.5 253 242 253 218.5";

const transition_ = {
  duration: 6,
  repeat: Infinity,
  ease: "easeInOut",
  repeatType: "mirror" as const,
};

const box: React.CSSProperties = {
  width: 50,
  height: 50,
  borderRadius: 10,
  position: "absolute",
  backgroundColor: "#d375c6",
  zIndex: 30,
  offsetPath: `path("${pathData}")`,
  transform: "translate(-25px, -25px)",
};

const COLORS_TOP = ["#d375c6", "#DD335C", "#ff6ec7", "#f72585", "#ff758f"];

export default function Skills() {
  const letters = ["S", "K", "I", "L", "L", "S"];
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [color]);

  const backgroundImage = useMotionTemplate`radial-gradient(100% 100% at 50% 0%, black 70%, ${color})`;

  const initialOrder: [string, string][] = [
    ["#ff0088", "Python"],
    ["#dd00ee", "Javascript"],
    ["#9911ff", "Reactjs"],
    ["#0d63f8", "Nextjs"],
    ["#ff9683", "DBMS"],
    ["#f9598e", "OS"],
    ["#0d63f8", "ML"],
    ["#9911ff", "web sockets"],
    ["#0d63f8", "MongoDB"],
  ];

  return (
    <motion.div
      className="relative flex items-center justify-center w-full min-h-[100dvh] z-0 mb-4"
      style={{
        backgroundImage,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Drag />

      <motion.div
        style={box}
        initial={{ offsetDistance: "0%", opacity: 1 }}
        animate={{ offsetDistance: "100%", opacity: 0 }}
        transition={transition_}
      />

      {/* <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4 sm:px-6 md:px-12 lg:px-16 py-8 gap-2 sm:gap-8 md:gap-10 rounded-3xl backdrop-blur-sm"> */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4 py-8 rounded-3xl backdrop-blur-sm">
        <CursorText letters={letters} />
        <ShowCase initialOrder={initialOrder} />
      </div>
    </motion.div>
  );
}

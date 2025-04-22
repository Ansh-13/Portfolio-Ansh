import { animate } from "framer-motion";
import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function CursorText(props: any) {
  const letters = props.letters;

  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [visibleCount, setVisibleCount] = useState(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Animate letters one by one
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev < letters.length) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 500); // one letter every 500ms

    return () => clearInterval(interval);
  }, []);

  // Move cursor to last visible letter
  useEffect(() => {
    const el = letterRefs.current[visibleCount - 1];
    if (el) {
      const rect = el.getBoundingClientRect();
      const parentRect = el.parentElement!.getBoundingClientRect();
      const offsetX = rect.right - parentRect.left;
      const offsetY = rect.top - parentRect.top;

      animate(x, offsetX - 80, {
        type: "spring",
        stiffness: 300,
        damping: 25,
      });
      animate(y, offsetY, {
        type: "spring",
        stiffness: 300,
        damping: 25,
      });
    }
  }, [visibleCount, x, y]);
  return (
    <>
      <span className="text-6xl font-bold text-center z-10 text-white m-0">
        <div className="p-0 m-0 inline-flex items-center justify-center relative">
          {letters.map((letter: String, i: any) => (
            <motion.span
              key={i}
              ref={(el) => (letterRefs.current[i] = el)}
              initial={{ opacity: 0 }}
              animate={{ opacity: i < visibleCount ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="inline-block m-0"
            >
              {letter}
            </motion.span>
          ))}

          <motion.span
            className="absolute w-1 h-13 mt-1 bg-pink-600 font-sans"
            style={{ x, y }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 0.7,
              repeat: Infinity,
            }}
          />
        </div>
      </span>
    </>
  );
}

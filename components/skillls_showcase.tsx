"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  initialOrder: Array<[string, string]>;
}

export default function ShowCase(props: Props) {
  const [order, setOrder] = useState(props.initialOrder);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  function shuffle([...array]: Array<[string, string]>) {
    return array.sort(() => Math.random() - 0.5);
  }

  useEffect(() => {
    const timeout = setTimeout(() => setOrder(shuffle(order)), 2000);
    return () => clearTimeout(timeout);
  });

  return (
    <>
      {!isMobile ? (
        <motion.div
          className="w-full min-h-screen flex justify-center items-center px-4"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <ul className="relative flex flex-wrap justify-center items-center gap-2 w-full max-w-7xl">
            {order.map((backgroundColor: [string, string], i: number) => (
              <motion.div
                key={i}
                className="flex justify-center items-center rounded-2xl"
                style={{ backgroundColor: backgroundColor[0] }}
              >
                <motion.li
                  layout
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="rounded-[10px] flex justify-center items-center text-white font-sans text-lg"
                  style={{
                    width: backgroundColor[1].length * 50,
                    height:
                      backgroundColor[1].length * 40 > 200
                        ? 120
                        : backgroundColor[1].length * 40,
                    backgroundColor: backgroundColor[0],
                  }}
                >
                  {backgroundColor[1]}
                </motion.li>
              </motion.div>
            ))}
          </ul>
        </motion.div>
      ) : (
        <motion.div
          className="w-full min-h-screen flex flex-col items-center justify-center px-4 py-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <ul className="p-0 m-0 relative flex flex-wrap gap-4 justify-center items-center w-full max-w-6xl">
            {order.map((backgroundColor: [string, string], i: number) => (
              <motion.div
                key={i}
                className="flex justify-center items-center rounded-2xl"
                style={{ backgroundColor: backgroundColor[0] }}
              >
                <motion.li
                  layout
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="rounded-[10px] flex justify-center items-center text-white font-sans text-sm sm:text-base md:text-lg px-4 py-2"
                  style={{
                    backgroundColor: backgroundColor[0],
                    width: `clamp(100px, ${
                      backgroundColor[1].length * 12
                    }px, 200px)`,
                    height: `clamp(50px, ${
                      backgroundColor[1].length * 10
                    }px, 120px)`,
                  }}
                >
                  {backgroundColor[1]}
                </motion.li>
              </motion.div>
            ))}
          </ul>
        </motion.div>
      )}
    </>
  );
}

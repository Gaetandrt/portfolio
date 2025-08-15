"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="h-full flex items-center justify-start w-full"
    >
      <motion.div
        className="text-left ml-20"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="text-6xl font-bold text-white mb-2"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Hello, I&apos;m{" "}
          <motion.span
            className="text-gray-300"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Gaëtan
          </motion.span>
        </motion.h1>
        <motion.p
          className="text-xl text-gray-300 mb-8 w-3/4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          A passionate full-stack developer crafting elegant solutions to
          complex problems.
        </motion.p>
      </motion.div>
    </section>
  );
}

export default Hero;

"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <section
      ref={ref}
      id="about"
      className="h-full flex items-center justify-center w-full"
    >
      <motion.div
        className="max-w-4xl mx-auto px-8"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-gray-800"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          À propos de moi
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <motion.p
              className="text-lg text-gray-600 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Je suis un développeur web passionné avec une expertise en React,
              Next.js et les technologies modernes. J'aime créer des expériences
              utilisateur innovantes et performantes.
            </motion.p>
            <motion.p
              className="text-lg text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Mon approche combine créativité et technique pour donner vie à des
              projets uniques et impactants.
            </motion.p>
          </motion.div>
          <motion.div
            className="bg-gray-100 h-64 rounded-lg flex items-center justify-center"
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={
              isInView
                ? { opacity: 1, x: 0, scale: 1 }
                : { opacity: 0, x: 50, scale: 0.9 }
            }
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            <span className="text-gray-500">Photo de profil</span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default About;

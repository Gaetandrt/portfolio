"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const buttonVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.6,
      },
    },
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="h-full flex items-center justify-center w-full"
    >
      <motion.div
        className="max-w-4xl mx-auto px-8 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2
          className="text-4xl font-bold mb-12 text-gray-800"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Me Contacter
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Vous avez un projet en tête ? N'hésitez pas à me contacter !
        </motion.p>
        <motion.div
          className="flex justify-center space-x-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.a
            href="mailto:contact@example.com"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            variants={buttonVariants}
            whileHover={{
              scale: 1.05,
              y: -2,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
            data-highlight
          >
            Email
          </motion.a>
          <motion.a
            href="#"
            className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors"
            variants={buttonVariants}
            whileHover={{
              scale: 1.05,
              y: -2,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
            data-highlight
          >
            LinkedIn
          </motion.a>
          <motion.a
            href="#"
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            variants={buttonVariants}
            whileHover={{
              scale: 1.05,
              y: -2,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
            data-highlight
          >
            GitHub
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Contact;

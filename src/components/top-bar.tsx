"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface TopBarProps {
  scrollContainer?: React.RefObject<HTMLDivElement | null>;
  sections?: Array<{ className: string }>;
  onNavigate?: (sectionIndex: number) => void;
  isHidden?: boolean;
}

export default function TopBar({
  scrollContainer,
  sections = [],
  onNavigate,
  isHidden = false,
}: TopBarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const fallbackRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll({
    container: scrollContainer || fallbackRef,
  });

  const isCurrentSectionWhite =
    sections[currentSectionIndex]?.className?.includes("bg-white");

  const adaptiveBackgroundColors = isCurrentSectionWhite
    ? {
        initial: "rgba(255, 255, 255, 0)",
        scrolled: "rgba(0, 0, 0, 0.95)",
        border: "rgba(255, 255, 255, 0.2)",
      }
    : {
        initial: "rgba(0, 0, 0, 0)",
        scrolled: "rgba(255, 255, 255, 0.95)",
        border: "rgba(0, 0, 0, 0.1)",
      };

  const currentTextColor = isScrolled
    ? isCurrentSectionWhite
      ? "#ffffff"
      : "#1f2937"
    : isCurrentSectionWhite
    ? "#1f2937"
    : "#ffffff";

  const width = useTransform(scrollY, [0, 100], ["100%", "60%"]);
  const borderRadius = useTransform(scrollY, [0, 100], ["0px", "50px"]);

  const currentBackgroundColor = isScrolled
    ? adaptiveBackgroundColors.scrolled
    : adaptiveBackgroundColors.initial;
  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(20px)"]
  );
  const padding = useTransform(
    scrollY,
    [0, 100],
    ["1rem 2rem", "0.75rem 2rem"]
  );
  const marginTop = useTransform(scrollY, [0, 100], ["0px", "1rem"]);
  const boxShadow = useTransform(
    scrollY,
    [0, 100],
    ["0 0 0 rgba(0,0,0,0)", "0 8px 32px rgba(0,0,0,0.12)"]
  );

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);

      const container = scrollContainer?.current;
      if (container && sections.length > 0) {
        const viewportHeight = window.innerHeight;
        const sectionIndex = Math.floor(latest / viewportHeight);
        const clampedIndex = Math.max(
          0,
          Math.min(sectionIndex, sections.length - 1)
        );
        setCurrentSectionIndex(clampedIndex);
      }
    });
    return unsubscribe;
  }, [scrollY, scrollContainer, sections]);

  return (
    <motion.div
      className="fixed top-0 left-1/2 z-40"
      style={{
        width,
        marginTop,
        x: "-50%",
      }}
      initial={{ opacity: 0.8 }}
      animate={{
        opacity: isHidden ? 0 : 1,
        y: isHidden ? -20 : 0,
        pointerEvents: isHidden ? "none" : "auto",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.nav
        className="w-full border"
        style={{
          borderRadius,
          backdropFilter: backdropBlur,
          padding,
          boxShadow,
        }}
        animate={{
          backgroundColor: currentBackgroundColor,
          borderColor: adaptiveBackgroundColors.border,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="flex items-center justify-between">
          <motion.button
            onClick={() => onNavigate?.(0)}
            className="font-bold cursor-pointer"
            initial={{ opacity: 0, x: -20, fontSize: "1.125rem" }}
            animate={{
              opacity: 1,
              x: 0,
              fontSize: isScrolled ? "1.125rem" : "1.5rem",
              color: currentTextColor,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            data-highlight
          >
            Portfolio
          </motion.button>

          <motion.div
            className="flex items-center"
            style={{
              gap: isScrolled ? "1rem" : "2rem",
            }}
          >
            {[
              { label: "À propos", index: 1 },
              { label: "Projets", index: 2 },
              { label: "Contact", index: 3 },
            ].map((item, i) => (
              <motion.div
                key={item.index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <motion.button
                  onClick={() => onNavigate?.(item.index)}
                  className="transition-colors font-medium cursor-pointer relative group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ fontSize: "0.875rem" }}
                  animate={{
                    fontSize: isScrolled ? "0.875rem" : "1rem",
                    color: currentTextColor,
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  data-highlight
                >
                  {item.label}
                  <span
                    className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all group-hover:w-full"
                    style={{ backgroundColor: currentTextColor }}
                  />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.nav>
    </motion.div>
  );
}

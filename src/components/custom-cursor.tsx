"use client";

import { useMobile } from "@/hooks/use-mobile";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

export function LightCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isBackgroundElement, setIsBackgroundElement] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentBackground, setCurrentBackground] = useState("dark");
  const isMobile = useMobile();

  const getLightColor = () => {
    if (isBackgroundElement) {
      return currentBackground === "dark" ? "#ffffff" : "#000000";
    }
    return "#ffffff";
  };

  useEffect(() => {
    if (isMobile) return;

    const showTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const element = document.elementFromPoint(e.clientX, e.clientY);

      if (element) {
        const computedStyle = window.getComputedStyle(element);
        setIsPointer(computedStyle.cursor === "pointer");

        const isHighlightElement =
          element.hasAttribute("data-highlight") ||
          element.closest("[data-highlight]") !== null ||
          element.closest("button") !== null ||
          element.closest("a") !== null ||
          element.tagName === "BUTTON" ||
          element.tagName === "A" ||
          computedStyle.cursor === "pointer";

        const isBackgroundEl =
          element.hasAttribute("data-background-highlight") ||
          element.closest("[data-background-highlight]") !== null ||
          element.closest(".line-drawing") !== null ||
          element.closest(".background-pattern") !== null;

        setIsHovering(isHighlightElement);
        setIsBackgroundElement(isBackgroundEl);

        const sectionElement =
          element.closest('[class*="bg-"]') ||
          element.closest("section") ||
          document
            .elementFromPoint(e.clientX, e.clientY)
            ?.closest('div[class*="bg-"]') ||
          element;
        const sectionClasses = sectionElement?.className || "";
        const isWhiteBackground = sectionClasses.includes("bg-white");
        const isBlackBackground = sectionClasses.includes("bg-black");

        if (isWhiteBackground) {
          setCurrentBackground("light");
        } else if (isBlackBackground) {
          setCurrentBackground("dark");
        } else {
          const computedBg = window.getComputedStyle(
            sectionElement || document.body
          ).backgroundColor;
          if (computedBg.includes("255, 255, 255") || computedBg === "white") {
            setCurrentBackground("light");
          } else if (computedBg.includes("0, 0, 0") || computedBg === "black") {
            setCurrentBackground("dark");
          }
        }

        if (isBackgroundEl) {
          document.documentElement.style.setProperty(
            "--cursor-x",
            `${e.clientX}px`
          );
          document.documentElement.style.setProperty(
            "--cursor-y",
            `${e.clientY}px`
          );
          document.body.classList.add("background-illuminated");
        } else {
          document.body.classList.remove("background-illuminated");
        }
      } else {
        setIsPointer(false);
        setIsHovering(false);
        setIsBackgroundElement(false);
        document.body.classList.remove("background-illuminated");
      }
    };

    const handleMouseLeave = () => {
      cursorX.set(-100);
      cursorY.set(-100);
      document.body.classList.remove("background-illuminated");
    };

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(showTimeout);
      document.body.classList.remove("background-illuminated");
    };
  }, [cursorX, cursorY, isMobile]);

  if (isMobile) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-50 pointer-events-none mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            scale: isBackgroundElement
              ? 2
              : isPointer
              ? 1.5
              : isHovering
              ? 1.3
              : 1,
            opacity: isBackgroundElement
              ? 0.9
              : isPointer
              ? 0.7
              : isHovering
              ? 0.8
              : 1,
          }}
          transition={{ duration: 0.15 }}
        >
          <div className="h-3 w-3 rounded-full bg-white" />
        </motion.div>
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 z-45 pointer-events-none"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            scale: isBackgroundElement
              ? 4
              : isHovering
              ? 2.5
              : isPointer
              ? 1.5
              : 1,
            opacity: isBackgroundElement
              ? 0.8
              : isHovering
              ? 0.4
              : isPointer
              ? 0.2
              : 0.1,
          }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="h-12 w-12 rounded-full blur-lg"
            style={{ backgroundColor: getLightColor() }}
          />
        </motion.div>
      </motion.div>

      {isBackgroundElement && (
        <motion.div
          className="fixed top-0 left-0 z-44 pointer-events-none"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.6, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="relative flex items-center justify-center">
            <div
              className="h-32 w-32 rounded-full blur-2xl"
              style={{
                backgroundColor: getLightColor() + "4D",
              }}
            />
          </div>
        </motion.div>
      )}
    </>
  );
}

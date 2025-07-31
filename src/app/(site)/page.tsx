"use client";

import { LightCursor } from "@/components/custom-cursor";
import About from "@/components/sections/about";
import Contact from "@/components/sections/contact";
import Footer from "@/components/sections/footer";
import Hero from "@/components/sections/hero";
import Projects from "@/components/sections/projects";
import StackContainer from "@/components/stack-container";
import TopBar from "@/components/top-bar";
import { useRef } from "react";

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const navigateToSection = (sectionIndex: number) => {
    const container = scrollContainerRef.current;
    if (container) {
      const viewportHeight = window.innerHeight;
      const targetPosition = sectionIndex * viewportHeight;

      container.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  const sections = [
    {
      component: <Hero />,
      className: "bg-black",
    },
    {
      component: <About />,
      className: "bg-white",
    },
    {
      component: <Projects />,
      className: "bg-black",
    },
    {
      component: <Contact />,
      className: "bg-white",
    },
  ];

  return (
    <>
      <LightCursor />
      <div
        ref={scrollContainerRef}
        className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth"
        style={{ scrollBehavior: "smooth" }}
      >
        <TopBar
          scrollContainer={scrollContainerRef}
          sections={sections}
          onNavigate={navigateToSection}
        />
        {sections.map((section, index) => (
          <StackContainer
            key={index}
            index={index}
            totalItems={sections.length}
            className={section.className}
          >
            {section.component}
          </StackContainer>
        ))}
        <Footer />
      </div>
    </>
  );
}

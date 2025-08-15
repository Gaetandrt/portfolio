"use client";

import { Project, ProjectCard } from "@/components/project-card";
import { ProjectModal } from "@/components/project-modal";
import { projects } from "@/data/projects";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";

interface ProjectsProps {
  onModalStateChange?: (isOpen: boolean) => void;
}

function Projects({ onModalStateChange }: ProjectsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
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

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    onModalStateChange?.(true);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    onModalStateChange?.(false);
  };

  return (
    <section
      ref={ref}
      id="projects"
      className="h-full flex items-center justify-center w-full overflow-auto"
    >
      <motion.div
        className="max-w-6xl mx-auto px-8 py-8"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Mes Projets
        </motion.h2>
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              variants={itemVariants}
              onOpenModal={openProjectModal}
            />
          ))}
        </motion.div>
      </motion.div>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeProjectModal}
      />
    </section>
  );
}

export default Projects;

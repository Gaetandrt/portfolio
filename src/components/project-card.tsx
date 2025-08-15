"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, ExternalLink } from "lucide-react";
import { motion, Variants } from "motion/react";
import { useState } from "react";

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  category: string;
  year: string;
  client?: string;
  duration?: string;
  team?: string[];
  challenges: string[];
  solutions: string[];
  results: string[];
  images: {
    thumbnail: string;
    gallery: string[];
    hero: string;
  };
  links: {
    live?: string;
    github?: string;
    case_study?: string;
  };
  featured: boolean;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  variants: Variants;
  onOpenModal: (project: Project) => void;
}

export function ProjectCard({
  project,
  index,
  variants,
  onOpenModal,
}: ProjectCardProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.div
      variants={variants}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      data-highlight
      className="cursor-pointer"
      onClick={() => onOpenModal(project)}
    >
      <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg bg-white/20 border-white/30 backdrop-blur-xs pt-0">
        <div className="relative overflow-hidden aspect-video">
          <motion.div
            className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 transition-opacity z-10"
            animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
          >
            <div className="flex gap-4">
              <Button size="sm" variant="secondary" data-highlight>
                <ArrowRight className="mr-2 h-4 w-4" /> View Details
              </Button>
              {project.links.live && (
                <Button
                  size="sm"
                  variant="outline"
                  asChild
                  data-highlight
                  onClick={(e) => e.stopPropagation()}
                >
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                  </a>
                </Button>
              )}
            </div>
          </motion.div>
          <motion.img
            src={project.images.thumbnail}
            alt={project.title}
            className="object-cover w-full h-full"
            animate={{
              scale: hoveredIndex === index ? 1.05 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <CardHeader className="pb-4">
          <CardTitle className="text-white">{project.title}</CardTitle>
          <CardDescription className="text-white/70">
            {project.shortDescription}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-wrap gap-2 pt-0">
          {project.technologies.slice(0, 3).map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="bg-white/10 text-white border-white/20"
            >
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 3 && (
            <Badge
              variant="secondary"
              className="bg-white/10 text-white border-white/20"
            >
              +{project.technologies.length - 3} more
            </Badge>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}

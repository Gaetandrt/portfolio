"use client";

import type { Project } from "@/components/project-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  ExternalLink,
  Github,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + project.images.gallery.length) %
        project.images.gallery.length
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Enhanced backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content with enhanced contrast */}
          <motion.div
            className="relative w-full max-w-6xl max-h-[90vh] bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-200"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-white/95 backdrop-blur-sm hover:bg-white border border-gray-200 text-gray-900 hover:text-black shadow-lg"
              onClick={onClose}
              data-highlight
            >
              <X className="h-5 w-5" />
            </Button>

            <div className="overflow-y-auto max-h-[90vh]">
              {/* Hero Image with enhanced overlay */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <Image
                  src={project.images.hero || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">
                    {project.title}
                  </h1>
                  <p className="text-lg opacity-90 drop-shadow-md">
                    {project.category}
                  </p>
                </div>
              </div>

              <div className="p-6 md:p-8 bg-white">
                {/* Project Info with enhanced contrast */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="md:col-span-2">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">
                      Project Overview
                    </h2>
                    <p className="text-gray-700 leading-relaxed mb-6 font-medium">
                      {project.fullDescription}
                    </p>

                    {/* Technologies with enhanced styling */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3 text-gray-900">
                        Technologies Used
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="bg-gray-900 text-white border-gray-800 hover:bg-gray-800 font-medium px-3 py-1"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Project Details with enhanced contrast */}
                  <div className="space-y-4 bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-gray-900" />
                      <div>
                        <p className="font-semibold text-gray-900">Year</p>
                        <p className="text-sm text-gray-700 font-medium">
                          {project.year}
                        </p>
                      </div>
                    </div>

                    {project.duration && (
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-gray-900" />
                        <div>
                          <p className="font-semibold text-gray-900">
                            Duration
                          </p>
                          <p className="text-sm text-gray-700 font-medium">
                            {project.duration}
                          </p>
                        </div>
                      </div>
                    )}

                    {project.client && (
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-gray-900" />
                        <div>
                          <p className="font-semibold text-gray-900">Client</p>
                          <p className="text-sm text-gray-700 font-medium">
                            {project.client}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons with enhanced styling */}
                    <div className="space-y-2 pt-4">
                      {project.links.live && (
                        <Button
                          asChild
                          className="w-full bg-gray-900 hover:bg-black text-white font-medium"
                          data-highlight
                        >
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Live Project
                          </a>
                        </Button>
                      )}
                      {project.links.github && (
                        <Button
                          variant="outline"
                          asChild
                          className="w-full border-gray-300 text-gray-900 hover:bg-gray-100 font-medium"
                          data-highlight
                        >
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="mr-2 h-4 w-4" />
                            View Source Code
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Image Gallery with enhanced controls */}
                {project.images.gallery.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">
                      Project Gallery
                    </h3>
                    <div className="relative">
                      <div className="relative aspect-video overflow-hidden rounded-lg border border-gray-200">
                        <Image
                          src={
                            project.images.gallery[currentImageIndex] ||
                            "/placeholder.svg"
                          }
                          alt={`${project.title} screenshot ${
                            currentImageIndex + 1
                          }`}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {project.images.gallery.length > 1 && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm hover:bg-white border border-gray-200 text-gray-900"
                            onClick={prevImage}
                            data-highlight
                          >
                            <ChevronLeft className="h-5 w-5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm hover:bg-white border border-gray-200 text-gray-900"
                            onClick={nextImage}
                            data-highlight
                          >
                            <ChevronRight className="h-5 w-5" />
                          </Button>
                        </>
                      )}
                    </div>

                    {/* Thumbnail Navigation with enhanced styling */}
                    {project.images.gallery.length > 1 && (
                      <div className="flex gap-2 mt-4 overflow-x-auto">
                        {project.images.gallery.map((image, index) => (
                          <button
                            key={index}
                            className={`relative flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-all ${
                              index === currentImageIndex
                                ? "border-gray-900 shadow-lg"
                                : "border-gray-300 hover:border-gray-500"
                            }`}
                            onClick={() => setCurrentImageIndex(index)}
                            data-highlight
                          >
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={`Thumbnail ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Challenges & Solutions with enhanced contrast */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                    <h3 className="text-lg font-semibold mb-4 text-red-900">
                      Challenges
                    </h3>
                    <ul className="space-y-3">
                      {project.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-red-600 mt-2 flex-shrink-0" />
                          <span className="text-sm text-red-800 font-medium leading-relaxed">
                            {challenge}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                    <h3 className="text-lg font-semibold mb-4 text-green-900">
                      Solutions
                    </h3>
                    <ul className="space-y-3">
                      {project.solutions.map((solution, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                          <span className="text-sm text-green-800 font-medium leading-relaxed">
                            {solution}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Results with enhanced styling */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-900">
                    Results & Impact
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.results.map((result, index) => (
                      <div
                        key={index}
                        className="p-4 bg-blue-50 rounded-lg border border-blue-200"
                      >
                        <p className="text-sm text-blue-900 font-medium">
                          {result}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

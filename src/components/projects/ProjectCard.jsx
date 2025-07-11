import React, { useState } from "react";
import { useSelector } from "react-redux";
import { motion, useAnimation } from "framer-motion";

function ProjectCard({ project, index, isHovered, setHoveredProject }) {
  const { themeColors } = useSelector((state) => state.themeReducer);
  const controls = useAnimation();

  const isEven = index % 2 === 0;

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const handleHover = (index) => {
    setHoveredProject(index);
    controls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 0.5 },
    });
  };

  return (
    <motion.div
      className={`flex flex-col sm:flex-row gap-8 items-center relative`}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={itemVariants}
      onMouseEnter={() => handleHover(index)}
      onMouseLeave={() => setHoveredProject(null)}
    >
      {/* Horizontal timeline connector */}
      <div
        className={`h-0.5 hidden sm:block absolute top-1/2 ${
          isEven ? "left-1/2 right-1/4" : "left-1/4 right-1/2"
        }`}
        style={{ backgroundColor: themeColors.primaryColor }}
      ></div>

      {/* Timeline dot */}
      <motion.div
        className="w-4 h-4 rounded-full border-3 absolute left-1/2 -translate-x-1/2 z-10 hidden sm:flex items-center justify-center"
        style={{
          borderColor: project.projectColor,
          backgroundColor: themeColors.bg,
        }}
        animate={{
          scale: isHovered ? 1.3 : 1,
          boxShadow: isHovered ? `0 0 0 8px ${project.projectColor}30` : "none",
        }}
        transition={{ type: "spring", stiffness: 500 }}
      >
        {isHovered && (
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: project.projectColor }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          />
        )}
      </motion.div>

      {/* Project image */}
      <motion.a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex w-full relative justify-center ${
          !isEven ? "sm:order-2 sm:justify-end" : "sm:justify-start"
        }`}
        whileHover={{ scale: 1.02 }}
        animate={controls}
      >
        <div className="relative group max-w-[500px] w-full">
          <motion.img
            className="w-full rounded-lg shadow-xl border border-opacity-10"
            src={project.image}
            alt={project.title}
            loading="lazy"
            style={{
              borderColor: themeColors.border,
              transformOrigin: isEven ? "left center" : "right center",
            }}
            whileHover={{ scale: 1.03 }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              backgroundColor: `${project.projectColor}30`,
              // backdropFilter: "blur(2px)",
            }}
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <motion.span
              className="text-white bg-black bg-opacity-70 px-4 py-2 rounded-full text-sm flex items-center border border-white border-opacity-20"
              initial={{ y: 10 }}
              whileHover={{ y: 0 }}
              transition={{ delay: 0.1 }}
            >
              View Project
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.span>
          </motion.div>
        </div>
      </motion.a>

      {/* Project details */}
      <motion.div
        className={`w-full ${!isEven ? "sm:order-1" : ""}`}
        style={{ color: themeColors.text }}
        animate={{
          x: isHovered ? (isEven ? 10 : -10) : 0,
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.a href={project.link}>
          <motion.h3
            className="font-bold text-3xl md:text-4xl mb-1"
            style={{ color: project.projectColor }}
            animate={{
              textShadow: isHovered
                ? `0 0 8px ${project.projectColor}40`
                : "none",
            }}
          >
            {project.title}
          </motion.h3>
        </motion.a>

        <motion.span
          className="text-lg md:text-xl opacity-80"
          style={{ color: project.projectColor }}
        >
          {project.subtitle}
        </motion.span>
        <motion.p
          className="mt-3 text-base md:text-lg leading-relaxed"
          style={{ color: themeColors.text }}
          animate={{
            opacity: isHovered ? 1 : 0.9,
          }}
        >
          {project.description}
        </motion.p>

        <motion.ul
          className="flex flex-wrap gap-2 mt-4"
          animate={{
            transition: { staggerChildren: 0.05 },
          }}
        >
          {project.tags.map((tag, tagIndex) => (
            <motion.li
              key={tagIndex}
              className="border rounded-full px-3 py-1 text-xs md:text-sm"
              style={{
                borderColor: themeColors.border,
                color: themeColors.text,
                backgroundColor: `${themeColors.border}10`,
              }}
              whileHover={{
                backgroundColor: `${project.projectColor}20`,
                borderColor: project.projectColor,
                scale: 1.05,
              }}
            >
              #{tag}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.div>
  );
}

export default ProjectCard;

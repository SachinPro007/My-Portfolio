import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "../SectionHeader";
import faqs from '../../data/faqs.json'

// Utility function to highlight keywords
const highlightKeywords = (text, keywords, themeColors) => {
  const regex = new RegExp(`\\b(${keywords.join("|")})\\b`, "gi");
  return text.replace(regex, (match) => {
    return `<strong style="color: ${themeColors.primaryColor}; font-weight: 600;">${match}</strong>`;
  });
};

const FAQSection = () => {
  const { themeColors } = useSelector((state) => state.themeReducer);
  const sectionRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [open, setOpen] = useState(false);
  
  

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = sectionRef.current.getBoundingClientRect();     
      setCursor({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };
    const section = sectionRef.current;
    section?.addEventListener("mousemove", handleMouseMove);
    return () => section?.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative py-32 px-6 sm:px-10 overflow-hidden"
      style={{ backgroundColor: themeColors.bg }}
    >
      {/* Background Grid */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, ${themeColors.primaryColor}22 1px, transparent 1px),
                            linear-gradient(to bottom, ${themeColors.primaryColor}22 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Spotlight grid mask */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, ${themeColors.primaryColor} 1px, transparent 1px),
                            linear-gradient(to bottom, ${themeColors.primaryColor} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          maskImage: `radial-gradient(circle 200px at ${cursor.x}px ${cursor.y}px, white 0%, transparent 80%)`,
          WebkitMaskImage: `radial-gradient(circle 200px at ${cursor.x}px ${cursor.y}px, white 0%, transparent 80%)`,
          opacity: 0.6,
          transition: "mask-position 0.1s ease-out",
        }}
      />

      {/* Spotlight glow */}
      <motion.div
        className="absolute z-20 pointer-events-none blur-3xl rounded-full"
        style={{
          width: 350,
          height: 350,
          left: cursor.x - 175,
          top: cursor.y - 175,
          background: `radial-gradient(circle, ${themeColors.primaryColor}33 0%, transparent 70%)`,
        }}
        animate={{ left: cursor.x - 175, top: cursor.y - 175 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      />

      {/* Section Content */}
      <div className="relative z-30 max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <SectionHeader
            title={"Technical Insights"}
            subtitle={
              "Explore my technical skills, thought process, and how I build scalable, aesthetic, and performant systems."
            }
          />
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              themeColors={themeColors}
              index={index}
              open={open}
              setOpen={setOpen}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQItem = ({ faq, themeColors, index, open, setOpen }) => {
  const keywords = [
    "React",
    "TypeScript",
    "best practices",
    "Tailwind CSS",
    "JavaScript",
    "Material UI",
    "Redux Toolkit",
    "React Router",
    "Router",
    "Axios",
    "TanStack Query",
    "Figma",
    "Framer Motion",
    "Context API",
    "mobile-first",
    "responsive",
    "RESTful APIs",
    "Git",
    "GitHub",
    "trends",
    "tech blogs",
    "YouTube channels",
    "solid frontend logic",
    "clean UI",
    "frontend",
    "online courses",
    "practices",
    "backend",
    "fundamentals",
    "Data Structures",
    "Algorithms",
    "debugging",
    "content generation",
    "animations",
    "UI",
    "UX",
    "design",
    "full-featured eCommerce",
    "role-based dashboards",
    "Employee Task Management App",
    "workflow optimization—keeping my productivity sharp",
    "performance optimization techniques",
    "modern tools",
    "cleaner",
    "faster",
    "maintainable applications",
  ];

  return (
    <motion.div
      className="rounded-2xl border overflow-hidden"
      style={{
        borderColor: themeColors.border,
        backgroundColor: themeColors.cardBg,
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <button
        className="flex w-full justify-between items-center px-6 py-5 text-left group cursor-pointer"
        onClick={() => setOpen(open === index ? null : index)}
        style={{
          color: themeColors.text,
          backgroundColor: `${themeColors.primaryColor}08`,
        }}
      >
        <span className="text-lg font-semibold">{faq.question}</span>
        <motion.span
          animate={{ rotate: open === index ? 45 : 0 }}
          className="transition-transform duration-300"
        >
          <svg width="18" height="18" stroke="currentColor" fill="none" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence>
        {open === index && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="px-6 pb-5"
          >
            <p
              className="text-base opacity-90 leading-relaxed"
              style={{ color: themeColors.summeryText }}
              dangerouslySetInnerHTML={{
                __html: highlightKeywords(faq.answer, keywords, themeColors),
              }}
            ></p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FAQSection;

import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const SectionHeader = ({ title, subtitle, highlight, align = "center" }) => {
  const { themeColors } = useSelector((state) => state.themeReducer);

  const alignmentClasses = {
    center: "text-center mx-auto",
    left: "text-left mr-auto",
  };

  return (
    <motion.div
      className={`mb-16 ${alignmentClasses[align]} max-w-3xl`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <motion.h2
        className={`text-4xl md:text-5xl font-bold mb-4`}
        style={{ color: themeColors.text }}
        whileHover={{ scale: 1.02 }}
      >
        {title}{" "}
        {highlight && (
          <span
            className="inline-block font-bold"
            style={{
              backgroundImage: `linear-gradient(90deg, ${themeColors.primaryColor}, ${themeColors.secondary})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent", // fallback
            }}
          >
            {highlight}
          </span>
        )}
      </motion.h2>

      <motion.div
        className="w-24 h-1.5 rounded-full relative overflow-hidden mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, ${themeColors.primaryColor}, ${themeColors.secondary})`,
            boxShadow: `0 0 12px ${themeColors.primaryColor}80`,
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>

      {subtitle && (
        <motion.p
          className="text-lg mt-6"
          style={{ color: themeColors.summeryText }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeader;

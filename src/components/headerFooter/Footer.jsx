import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";
import SocialLinks from "../FooterSocials";

const Footer = () => {
  const { themeColors, theme } = useSelector((state) => state.themeReducer);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.3], [40, 0]);

  return (
    <motion.footer
      ref={containerRef}
      className="relative overflow-hidden"
      style={{
        backgroundColor: themeColors.bg,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: `1px solid ${themeColors.borderLight}`,
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 70% 30%, ${
            theme === "dark"
              ? "rgba(242, 140, 38, 0.03)"
              : "rgba(234, 88, 12, 0.03)"
          } 0%, transparent 70%)`,
        }}
      />

      <motion.div
        style={{ opacity, y }}
        className="max-w-7xl mx-auto px-6 md:px-12 py-16 lg:py-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <h2
                className="text-3xl font-light mb-2"
                style={{ color: themeColors.primaryColor }}
              >
                Sachin Sehrawat
              </h2>
              <p
                className="text-sm uppercase tracking-wider opacity-75"
                style={{ color: themeColors.summeryText }}
              >
                Frontend Developer • Scalable Solutions
              </p>
            </motion.div>

            <motion.p
              className="mt-6 text-sm leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.8 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true, margin: "-50px" }}
              style={{ color: themeColors.summeryText }}
            >
              I blend aesthetics with engineering to craft web interfaces that
              not only work — they wow.
            </motion.p>
          </div>

          {/* Social Section */}
          <div className="flex flex-col items-center lg:items-end">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true, margin: "-50px" }}
              className="flex flex-col items-center lg:items-end"
            >
              <p
                className="text-sm mb-6 text-center lg:text-right"
                style={{ color: themeColors.summeryText }}
              >
                Let’s stay connected — I post dev notes, design experiments, and
                bad jokes.
              </p>
              <div className="flex gap-4">
                <SocialLinks />
              </div>
            </motion.div>
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col items-center lg:items-end"
          >
            <p
              className="text-sm mb-6 text-center lg:text-right"
              style={{ color: themeColors.summeryText }}
            >
              Open to freelance, consulting, or just a tech chat over coffee.
            </p>
            <motion.a
              href="https://www.linkedin.com/in/sachinpro/"
              target="_blank"
              className="px-6 py-3 rounded-full text-sm font-medium relative overflow-hidden"
              style={{
                backgroundColor: themeColors.primaryColor,
                color: themeColors.cardBg,
              }}
              whileHover={{
                y: -2,
                boxShadow: `0 4px 20px -6px ${themeColors.primaryColor}`,
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Start a conversation →
              <span className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity"></span>
            </motion.a>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-50px" }}
          className="w-full h-px my-12 origin-left"
          style={{ backgroundColor: themeColors.borderLight }}
        />

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.7 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-xs tracking-wider"
            style={{ color: themeColors.summeryText }}
          >
            © {new Date().getFullYear()} <a href="https://www.linkedin.com/in/sachinpro/"><span style={{ color: themeColors.primaryColor }}>Sachin</span></a> · Coded with intent,
            designed with care.
          </motion.p>

          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Preferences"].map(
              (item, index) => (
                <motion.a
                  key={index}
                  href={`#`}
                  className="text-xs relative group"
                  initial={{ opacity: 0, y: 5 }}
                  whileInView={{ opacity: 0.7, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  style={{ color: themeColors.summeryText }}
                >
                  {item}
                  <span
                    className="absolute left-0 bottom-0 w-0 h-px group-hover:w-full transition-all duration-300"
                    style={{ backgroundColor: themeColors.primaryColor }}
                  />
                </motion.a>
              )
            )}
          </div>
        </div>
      </motion.div>

    </motion.footer>
  );
};

export default Footer;

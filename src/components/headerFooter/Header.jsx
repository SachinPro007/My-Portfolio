import React, { useState, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaArrowRight,
  FaSun,
  FaMoon,
  FaPalette,
} from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  setDarkTheme,
  setLightTheme,
  setCustomTheme,
} from "../../reducers/themeReducer";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showCustomThemeModal, setShowCustomThemeModal] = useState(false);
  const [customColors, setCustomColors] = useState({});

  

  const { themeColors, theme, darkTheme, lightTheme } = useSelector(
    (state) => state.themeReducer
  );
  const dispatch = useDispatch();
  

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "FAQs", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");

        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveLink(`#${id}`);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [mobileMenuOpen]);


  const handleApplyCustomTheme = () => {
    dispatch(
      setCustomTheme({
        ...themeColors, // Start with current theme as base
        ...customColors, // Override with custom colors
      })
    );
    setShowCustomThemeModal(false);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header
      className="fixed top-0 w-full z-50 backdrop-blur-lg border-b transition-colors duration-300"
      style={{
        backgroundColor: `${themeColors.bg}ef`,
        borderColor: `${themeColors.border}80`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#"
          aria-label="Homepage"
          onClick={closeMobileMenu}
          className="text-2xl sm:text-3xl font-bold hover:rotate-2 transition-transform duration-300"
          style={{ color: themeColors.text }}
        >
          <span style={{ color: themeColors.primaryColor }}>{"{ "}</span>
          Sachin
          <span style={{ color: themeColors.primaryColor }}>{" }"}</span>
        </a>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`relative group py-2 transition-colors duration-300 ${
                activeLink === link.href ? "font-semibold" : "font-medium"
              }`}
              style={{
                color:
                  activeLink === link.href
                    ? themeColors.primaryColor
                    : themeColors.text,
              }}
            >
              {link.name}
              <span
                className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
                  activeLink === link.href ? "w-full" : "w-0 group-hover:w-full"
                }`}
                style={{ backgroundColor: themeColors.primaryColor }}
              />
            </a>
          ))}
        </nav>
        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <a href="/Sachin_Doc.pdf" target="_blank" rel="noopener noreferrer">
            <button
              className="hidden md:flex items-center gap-2 px-6 py-2 rounded-full font-semibold text-white hover:shadow-lg transition-all duration-300 cursor-pointer"
              style={{
                background: `linear-gradient(135deg, ${themeColors.primaryColor}, ${themeColors.secondary})`,
              }}
            >
              Resume{" "}
              <FiDownload className="transition-transform hover:translate-y-0.5" />
            </button>
          </a>

          {/* Theme Selector */}
          <div className="relative">
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="p-2 rounded-full hover:bg-opacity-10 transition-colors duration-300 cursor-pointer"
              style={{
                color: themeColors.text,
                backgroundColor: `${themeColors.border}20`,
              }}
              aria-label="Theme selector"
            >
              {theme === "dark" ? <FaSun size={18} /> : theme === "custom" ? <FaPalette size={18} /> : <FaMoon size={18} />}
            </button>

            <AnimatePresence>
              {showThemeMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-40 rounded-md shadow-lg z-50"
                  style={{
                    backgroundColor: themeColors.cardBg,
                    border: `1px solid ${themeColors.border}`,
                  }}
                  onMouseLeave={() => setShowThemeMenu(false)}
                >
                  <div className="py-1">
                    <button
                      onClick={() => {
                        dispatch(setLightTheme());
                        setShowThemeMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-opacity-10 transition-colors"
                      style={{
                        color:
                          theme === "light"
                            ? themeColors.primaryColor
                            : themeColors.text,
                        backgroundColor:
                          theme === "light"
                            ? `${themeColors.primaryColor}20`
                            : "transparent",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <FaSun size={14} /> Light
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        dispatch(setDarkTheme());
                        setShowThemeMenu(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-opacity-10 transition-colors"
                      style={{
                        color:
                          theme === "dark"
                            ? themeColors.primaryColor
                            : themeColors.text,
                        backgroundColor:
                          theme === "dark"
                            ? `${themeColors.primaryColor}20`
                            : "transparent",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <FaMoon size={14} /> Dark
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setShowThemeMenu(false);
                        setShowCustomThemeModal(true);
                        setCustomColors({...themeColors})
                      }}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-opacity-10 transition-colors"
                      style={{
                        color:
                          theme === "custom"
                            ? themeColors.primaryColor
                            : themeColors.text,
                        backgroundColor:
                          theme === "custom"
                            ? `${themeColors.primaryColor}20`
                            : "transparent",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <FaPalette size={14} /> Custom
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full transition-colors duration-300 cursor-pointer"
            style={{
              color: themeColors.text,
              backgroundColor: mobileMenuOpen
                ? `${themeColors.primaryColor}20`
                : `${themeColors.border}20`,
              border: `1px solid ${
                mobileMenuOpen ? themeColors.primaryColor : themeColors.border
              }`,
            }}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden fixed inset-0 top-16 z-40 overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              style={{
                height: "calc(100vh - 4rem)",
                backgroundColor: themeColors.bg,
              }}
            >
              <div className="container mx-auto px-6 py-8">
                <div className="flex flex-col space-y-6">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className={`group flex justify-between items-center py-4 text-lg font-medium`}
                      style={{
                        color:
                          activeLink === link.href
                            ? themeColors.primaryColor
                            : themeColors.text,
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {link.name}
                      <FaArrowRight
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ color: themeColors.primaryColor }}
                      />
                    </motion.a>
                  ))}

                  <motion.a
                    href="/Sachin_Doc.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navLinks.length * 0.05 }}
                  >
                    <button
                      className="w-full py-4 rounded-xl font-semibold text-lg flex justify-center items-center gap-3 mt-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
                      style={{
                        background: `linear-gradient(135deg, ${themeColors.primaryColor}, ${themeColors.secondary})`,
                        color: "white",
                      }}
                    >
                      Resume <FiDownload />
                    </button>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Custom Theme */}
        <AnimatePresence>
          {showCustomThemeModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed  bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 top-0"
              onClick={() => setShowCustomThemeModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                style={{
                  backgroundColor: themeColors.cardBg,
                  border: `1px solid ${themeColors.border}`,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* popUp heading  */}
                <div className="flex justify-between items-center mb-6">
                  <h3
                    className="text-2xl font-semibold mb-2 inline-flex items-center gap-2 tracking-tight"
                    style={{ color: themeColors.primaryColor }}
                  >
                    🎨 Customize Theme
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      (via hex code or color picker)
                    </span>
                  </h3>

                  <button
                    onClick={() => setShowCustomThemeModal(false)}
                    className="p-1 rounded-full hover:bg-opacity-10 transition-colors"
                    style={{
                      color: themeColors.text,
                      backgroundColor: `${themeColors.border}20`,
                    }}
                    aria-label="Close theme customizer"
                  >
                    <FaTimes size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Core Colors Section */}
                  <div className="space-y-4">
                    <h4
                      className="font-semibold pb-2 border-b"
                      style={{
                        color: themeColors.text,
                        borderColor: themeColors.border,
                      }}
                    >
                      Core Colors
                    </h4>

                    <ColorInput
                      label="Primary Color"
                      value={customColors.primaryColor}
                      onChange={(val) =>
                        setCustomColors({ ...customColors, primaryColor: val })
                      }
                      themeColors={themeColors}
                    />

                    <ColorInput
                      label="Secondary Color"
                      value={customColors.secondary}
                      onChange={(val) =>
                        setCustomColors({ ...customColors, secondary: val })
                      }
                      themeColors={themeColors}
                    />

                    <ColorInput
                      label="Accent Color"
                      value={customColors.accent}
                      onChange={(val) =>
                        setCustomColors({ ...customColors, accent: val })
                      }
                      themeColors={themeColors}
                    />
                  </div>

                  {/* Backgrounds Section */}
                  <div className="space-y-4">
                    <h4
                      className="font-semibold pb-2 border-b"
                      style={{
                        color: themeColors.text,
                        borderColor: themeColors.border,
                      }}
                    >
                      Backgrounds
                    </h4>

                    <ColorInput
                      label="Page Background"
                      value={customColors.bg}
                      onChange={(val) =>
                        setCustomColors({ ...customColors, bg: val })
                      }
                      themeColors={themeColors}
                    />

                    <ColorInput
                      label="Card Background"
                      value={customColors.cardBg}
                      onChange={(val) =>
                        setCustomColors({ ...customColors, cardBg: val })
                      }
                      themeColors={themeColors}
                    />

                    <ColorInput
                      label="Secondary Card BG"
                      value={customColors.cardSecondary}
                      onChange={(val) =>
                        setCustomColors({ ...customColors, cardSecondary: val })
                      }
                      themeColors={themeColors}
                    />
                  </div>

                  {/* Text Colors Section */}
                  <div className="space-y-4">
                    <h4
                      className="font-semibold pb-2 border-b"
                      style={{
                        color: themeColors.text,
                        borderColor: themeColors.border,
                      }}
                    >
                      Text Colors
                    </h4>

                    <ColorInput
                      label="Primary Text"
                      value={customColors.text}
                      onChange={(val) =>
                        setCustomColors({ ...customColors, text: val })
                      }
                      themeColors={themeColors}
                    />

                    <ColorInput
                      label="Secondary Text"
                      value={customColors.summeryText}
                      onChange={(val) =>
                        setCustomColors({ ...customColors, summeryText: val })
                      }
                      themeColors={themeColors}
                    />

                    <ColorInput
                      label="Heading Text"
                      value={customColors.headingText}
                      onChange={(val) =>
                        setCustomColors({ ...customColors, headingText: val })
                      }
                      themeColors={themeColors}
                    />
                  </div>

                  {/* Borders & States Section */}
                  <div className="space-y-4">
                    <h4
                      className="font-semibold pb-2 border-b"
                      style={{
                        color: themeColors.text,
                        borderColor: themeColors.border,
                      }}
                    >
                      Borders & States
                    </h4>

                    <ColorInput
                      label="Border Color"
                      value={customColors.border}
                      onChange={(val) =>
                        setCustomColors({ ...customColors, border: val })
                      }
                      themeColors={themeColors}
                    />

                    <ColorInput
                      label="Hover State"
                      value={customColors.hover}
                      onChange={(val) =>
                        setCustomColors({ ...customColors, hover: val })
                      }
                      themeColors={themeColors}
                    />

                    <ColorInput
                      label="Active State"
                      value={customColors.active}
                      onChange={(val) =>
                        setCustomColors({ ...customColors, active: val })
                      }
                      themeColors={themeColors}
                    />
                  </div>
                </div>

                {/* Preview Section */}
                <div
                  className="mt-8 p-4 rounded-lg"
                  style={{
                    backgroundColor: customColors.cardBg,
                    border: `1px solid ${customColors.border}`,
                  }}
                >
                  <h4
                    className="font-semibold mb-3"
                    style={{ color: customColors.primaryColor }}
                  >
                    Theme Preview
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className="p-3 rounded"
                      style={{
                        backgroundColor: customColors.bg,
                        color: customColors.text,
                      }}
                    >
                      Page Background
                    </div>
                    <div
                      className="p-3 rounded"
                      style={{
                        backgroundColor: customColors.primaryColor,
                        color: "white",
                      }}
                    >
                      Primary Color
                    </div>
                    <div
                      className="p-3 rounded"
                      style={{
                        backgroundColor: customColors.cardBg,
                        color: customColors.text,
                        border: `1px solid ${customColors.border}`,
                      }}
                    >
                      Card Example
                    </div>
                    <div
                      className="p-3 rounded"
                      style={{
                        backgroundColor: customColors.hover,
                        color: "white",
                      }}
                    >
                      Hover State
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 mt-8">
                  <button
                    onClick={() => {
                      setShowCustomThemeModal(false);
                      setCustomColors(
                        theme === "dark" ? darkTheme : lightTheme
                      );
                    }}
                    className="px-4 py-2 rounded-lg font-medium"
                    style={{
                      backgroundColor: `${themeColors.border}20`,
                      color: themeColors.text,
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleApplyCustomTheme}
                    className="px-4 py-2 rounded-lg font-medium"
                    style={{
                      backgroundColor: themeColors.primaryColor,
                      color: "#fff",
                    }}
                  >
                    Apply Theme
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;

const ColorInput = ({ label, value, onChange, themeColors }) => (
  <div>
    <label className="block text-sm mb-1" style={{ color: themeColors.text }}>
      {label}
    </label>
    <div className="flex items-center gap-3">
      <div className="relative">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-10 rounded cursor-pointer"
          style={{ border: `1px solid ${themeColors.border}` }}
        />
        <div
          className="absolute inset-0 rounded pointer-events-none"
          style={{
            boxShadow: `0 0 0 2px ${themeColors.cardBg}, 0 0 0 3px ${themeColors.border}`,
          }}
        />
      </div>
      <div className="flex-1">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-1 text-sm rounded"
          style={{
            backgroundColor: themeColors.cardBg,
            color: themeColors.text,
            border: `1px solid ${themeColors.border}`,
          }}
        />
      </div>
    </div>
  </div>
);

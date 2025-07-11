import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaRedditAlien,
  FaFacebookMessenger,
  FaInstagram,
  FaSnapchatGhost,
  FaWhatsapp,
  FaTimes,
  FaUserFriends,
  FaUserPlus,
} from "react-icons/fa";

import { useSelector } from "react-redux";

const FloatSocialIcons = () => {
  const { themeColors } = useSelector((state) => state.themeReducer);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupSocial, setPopupSocial] = useState(null);

  const socialLinks = [
    {
      icon: FaTwitter,
      name: "Twitter",
      color: "#1DA1F2",
      url: "",
    },
    {
      icon: FaInstagram,
      name: "Instagram",
      color: "#E4405F",
      url: "",
    },
    {
      icon: FaGithub,
      name: "GitHub",
      color: "#181717",
      url: "https://github.com/SachinPro007",
    },
    {
      icon: FaLinkedin,
      name: "LinkedIn",
      color: "#0A66C2",
      url: "https://www.linkedin.com/in/sachinpro/",
    },
    {
      icon: FaWhatsapp,
      name: "WhatsApp",
      color: "#25D366",
      url: "https://wa.me/918307326657",
    },
  ];

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    setActiveTooltip(null);
  };

  const handleSocialClick = (social) => {
    if (social.url) {
      window.open(social.url, "_blank");
      setIsOpen(false);
    } else {
      setPopupSocial(social);
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupSocial(null);
  };

  useEffect(() => {
    if (isOpen || showPopup) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, showPopup]);

  const availableSocials = socialLinks.filter((social) => social.url);

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={toggleMenu}
          />
        )}
      </AnimatePresence>

      {/* Popup Modal */}
      <AnimatePresence>
        {showPopup && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-50"
              onClick={closePopup}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
            >
              <div
                className="relative max-w-md w-full rounded-xl p-6 shadow-2xl"
                style={{
                  backgroundColor: themeColors.cardBg,
                  border: `1px solid ${themeColors.border}`,
                }}
              >
                <button
                  onClick={closePopup}
                  className="absolute top-4 right-4 p-1 rounded-full"
                  style={{
                    color: themeColors.text,
                  }}
                >
                  <FaTimes size={20} />
                </button>

                <div className="text-center">
                  <div
                    className="mx-auto flex items-center justify-center w-16 h-16 rounded-full mb-4"
                    style={{ backgroundColor: popupSocial?.color }}
                  >
                    <popupSocial.icon size={28} className="text-white" />
                  </div>

                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: themeColors.primaryColor }}
                  >
                    Thank you for your interest!
                  </h3>

                  <p className="mb-4" style={{ color: themeColors.text }}>
                    I'm not active on {popupSocial?.name}, but you can connect
                    with me on:
                  </p>

                  <div className="flex flex-wrap justify-center gap-3 mt-5">
                    {availableSocials.map((social) => (
                      <motion.button
                        key={social.name}
                        className="w-12 h-12 rounded-full flex items-center justify-center shadow-md"
                        style={{
                          backgroundColor: social.color,
                          border: `2px solid ${themeColors.border}`,
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          window.open(social.url, "_blank");
                          closePopup();
                        }}
                        aria-label={social.name}
                      >
                        <social.icon size={20} className="text-white" />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Connect Buttons */}
      <div className="fixed bottom-7 right-6 z-50">
        {/* Social Icons */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-full right-0 mb-4 flex flex-col items-end space-y-2"
            >
              {socialLinks.map((social, index) => (
                <motion.div
                  key={social.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: index * 0.05,
                  }}
                  className="relative"
                  onMouseEnter={() => setActiveTooltip(social.name)}
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  <motion.button
                    className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg text-white"
                    style={{
                      backgroundColor: social.color,
                      border: `2px solid ${themeColors.border}`,
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSocialClick(social)}
                    aria-label={social.name}
                  >
                    <social.icon size={28} />
                  </motion.button>

                  {/* Tooltip */}
                  {activeTooltip === social.name && (
                    <motion.div
                      initial={{ opacity: 0, x: 5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 5 }}
                      className="absolute right-full top-1/2 transform -translate-y-1/2 mr-2 px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap"
                      style={{
                        backgroundColor: social.color,
                        color: social.name === "Snapchat" ? "#000" : "#fff",
                      }}
                    >
                      {social.name}
                      <div
                        className="absolute left-full top-1/2 w-2 h-2 transform -translate-y-1/2 rotate-45"
                        style={{ backgroundColor: social.color }}
                      />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Toggle Button */}
        <div className="relative z-50 group">
          {/* Chat Bubble Message Tooltip */}
          <AnimatePresence>
            {!isOpen && activeTooltip === "connect" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="absolute right-full top-1/2 transform -translate-y-1/2 mr-4 max-w-[180px]"
              >
                <div
                  className="relative px-4 py-2 rounded-2xl text-sm font-medium shadow-md"
                  style={{
                    backgroundColor: themeColors.cardBg,
                    color: themeColors.primaryColor,
                    border: `1px solid ${themeColors.borderLight}`,
                    boxShadow: `0 4px 12px ${themeColors.shadow}`,
                  }}
                >
                  Let's connect!
                  {/* Tail (speech bubble pointer) */}
                  <div
                    className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 rotate-45"
                    style={{
                      backgroundColor: themeColors.cardBg,
                      borderBottom: `1px solid ${themeColors.borderLight}`,
                      borderRight: `1px solid ${themeColors.borderLight}`,
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Toggle Button */}
          <motion.button
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl cursor-pointer"
            style={{
              backgroundColor: isOpen
                ? themeColors.cardSecondary
                : themeColors.primaryColor,
              color: themeColors.text,
              transition: "all 0.3s ease-in-out",
            }}
            onClick={toggleMenu}
            onMouseEnter={() => setActiveTooltip("connect")}
            onMouseLeave={() => setActiveTooltip(null)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isOpen ? "Close connect menu" : "Open connect menu"}
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? (
                <FaTimes size={22} />
              ) : (
                <FaUserPlus className="fill-white" size={22} />
              )}
            </motion.div>
          </motion.button>
        </div>
      </div>
    </>
  );
};

export default FloatSocialIcons;

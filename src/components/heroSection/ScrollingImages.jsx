import React, { memo, useState } from "react";
import { useSelector } from "react-redux";
import slide from "../../data/myInfo.json";
import useWindowSize from "../../hooks/useWindowSize";

function ScrollingImages() {
  const { themeColors, theme } = useSelector((state) => state.themeReducer);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const windowSize = useWindowSize();

  // Calculate responsive dimensions
  const getContainerSize = () => {
    if (!windowSize.width) return 300; // Default before hydration

    if (windowSize.width >= 1280) return 500; // xl screens
    if (windowSize.width >= 1024) return 450; // lg screens
    if (windowSize.width >= 768) return 400; // md screens
    if (windowSize.width >= 640) return 350; // sm screens
    return Math.min(300, windowSize.width - 40); // xs screens
  };

  const containerSize = getContainerSize();
  const center = containerSize / 2;
  const smallRadius = containerSize * 0.33;
  const largeRadius = containerSize * 0.5;
  const smallIconSize = containerSize * 0.08;
  const largeIconSize = containerSize * 0.14;

  const renderTechIcons = (sizeFilter, radius, duration, animationName) =>
    slide.techIcons
      .filter((icon) => icon.size === sizeFilter)
      .map((icon, idx) => {
        const isHovered = hoveredIcon === `${sizeFilter}-${idx}`;
        const iconSize = sizeFilter === "small" ? smallIconSize : largeIconSize;

        return (
          <div
            key={`${sizeFilter}-${idx}`}
            className="icon-wrapper"
            style={{
              position: "absolute",
              left: `calc(50% - ${iconSize / 2}px)`,
              top: `calc(50% - ${iconSize / 2}px)`,
              transform: `rotate(${icon.angle}deg) translateX(${radius}px) rotate(-${icon.angle}deg)`,
              animation: `${duration}s linear infinite ${animationName}`,
              "--current-angle": `${icon.angle}deg`,
              "--current-radius": `${radius}px`,
              cursor: "pointer",
            }}
            onMouseEnter={() => setHoveredIcon(`${sizeFilter}-${idx}`)}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <div style={{ width: `${iconSize}px`, position: "relative" }}>
              <img
                alt={icon.name}
                src={icon.src}
                style={{
                  width: "100%",
                  height: "100%",
                  transition: "transform 0.3s ease",
                }}
              />
              {isHovered && (
                <div
                  className="tech-tooltip"
                  style={{ backgroundColor: icon.tooltipColor }}
                >
                  {icon.name}
                  <div
                    className="tech-tooltip-arrow"
                    style={{ borderTopColor: icon.tooltipColor }}
                  />
                </div>
              )}
            </div>
          </div>
        );
      });

  return (
    <div className="scrolling-images-container">
      <div
        className="relative mx-auto"
        style={{
          width: `${containerSize}px`,
          height: `${containerSize}px`,
          minWidth: "280px",
          minHeight: "280px",
        }}
      >
        {/* Background circles */}
        <svg
          className="absolute top-0 left-0"
          width={containerSize}
          height={containerSize}
        >
          <circle
            cx={center}
            cy={center}
            r={smallRadius}
            stroke={`${themeColors.primaryColor}33`}
            strokeWidth="2"
            strokeDasharray="5 5"
            fill="none"
          />
          <circle
            cx={center}
            cy={center}
            r={largeRadius}
            stroke={`${themeColors.primaryColor}33`}
            strokeWidth="3"
            strokeDasharray="10 10"
            fill="none"
          />
        </svg>

        {/* Small icons layer */}
        <div className="absolute top-0 left-0 w-full h-full">
          {renderTechIcons("small", smallRadius, 6, "orbit-rotate")}
        </div>

        {/* Main profile image */}
        <div
          className="relative z-10 rounded-full overflow-hidden"
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            borderRadius: "50%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* my image Tooltip */}
          {isHovered && (
            <div
              className="absolute top-1/2 md:top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999] px-2 md:px-6 py-5 rounded-2xl transition-all duration-300"
              style={{
                background: `${themeColors.cardBg}CC`,
                color: themeColors.text,
                border: `1px solid ${themeColors.border}`,
                boxShadow: `0 12px 30px -8px rgba(0, 0, 0, ${
                  theme === "dark" ? "0.45" : "0.15"
                })`,
                maxWidth: "320px",
                minWidth: "200px",
                textAlign: "center",
                fontWeight: "500",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                transformOrigin: "center bottom",
              }}
            >
              {/* Tooltip Arrow */}
              <div
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4"
                style={{
                  background: `${themeColors.cardBg}CC`,
                  borderTop: `1px solid ${themeColors.border}`,
                  borderLeft: `1px solid ${themeColors.border}`,
                  transform: "rotate(45deg)",
                  boxShadow: `-3px -3px 10px rgba(0,0,0,0.05)`,
                }}
              ></div>

              {/* Tooltip Content */}
              <div className="flex flex-col items-center gap-2 ">
                <div
                  className="inline-flex items-center justify-center w-14 h-14 rounded-full text-2xl shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${themeColors.primaryColor}, ${themeColors.secondary})`,
                    color: theme === "dark" ? themeColors.text : "#fff",
                    boxShadow: `0 4px 8px rgba(${
                      theme === "dark" ? "0,0,0" : "242,140,38"
                    }, 0.3)`,
                  }}
                >
                  👋
                </div>
                <p
                  className="text-base leading-snug tracking-tight"
                  style={{ color: themeColors.text }}
                >
                  Hi, I'm{" "}
                  <span
                    className="font-bold"
                    style={{ color: themeColors.primaryColor }}
                  >
                    Sachin
                  </span>{" "}
                  — a Frontend Developer.
                </p>
                <p
                  className="text-sm text-muted leading-relaxed"
                  style={{ color: themeColors.summeryText }}
                >
                  Welcome to my portfolio. I’d love to hear your feedback and
                  ideas!
                </p>
              </div>
            </div>
          )}

          {/* image wraper */}
          <div className="w-full h-full relative">
            <img
              alt="Sachin - Frontend Developer"
              src={slide.image}
              className="absolute top-[58%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{
                height: `${containerSize * 1.1}px`,
                width: "auto",
                maxWidth: "none",
              }}
            />
          </div>
        </div>

        {/* Large icons layer */}
        <div
          className="absolute top-0 left-0 w-full h-full z-20"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {renderTechIcons("large", largeRadius, 12, "orbit-rotate")}
        </div>
      </div>
    </div>
  );
}

export default memo(ScrollingImages);

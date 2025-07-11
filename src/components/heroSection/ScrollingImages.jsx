import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import slide from "../../data/myInfo.json";

function ScrollingImages() {
  const { themeColors, theme } = useSelector((state) => state.themeReducer);
  const [isHovered, setIsHovered] = useState(false);

  // Manage hovered icon state to show tooltip
  const [hoveredIcon, setHoveredIcon] = useState(null);

  // icon scrolling animation
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes counter-rotate-6 {
          from { transform: rotate(var(--start-angle)) translateX(165px) rotate(calc(-1 * var(--start-angle))); }
          to { transform: rotate(calc(var(--start-angle) + 360deg)) translateX(165px) rotate(calc(-1 * (var(--start-angle) + 360deg))); }
        }
        @keyframes counter-rotate-12 {
          from { transform: rotate(var(--start-angle)) translateX(250px) rotate(calc(-1 * var(--start-angle))); }
          to { transform: rotate(calc(var(--start-angle) + 360deg)) translateX(250px) rotate(calc(-1 * (var(--start-angle) + 360deg))); }
        }
        .tooltip {
          position: absolute;
          bottom: 110%;
          left: 50%;
          transform: translateX(-50%);
          padding: 6px 12px;
          border-radius: 6px;
          color: white;
          font-size: 0.75rem;
          font-weight: 600;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          z-index: 50;
          user-select: none;
        }
        .tooltip.visible {
          opacity: 1;
        }
        .tooltip-arrow {
          position: absolute;
          top: 100%;
          left: 50%;
          margin-left: -6px;
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 6px solid;
        }
        .icon-wrapper:hover img {
          transform: scale(1.15);
          transition: transform 0.3s ease;
        }
      `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // Helper to render tech icons with tooltip support
  const renderTechIcons = (
    sizeFilter,
    radius,
    animationDuration,
    animationName
  ) =>
    slide.techIcons
      .filter((icon) => icon.size === sizeFilter)
      .map((icon, idx) => {
        const isHovered = hoveredIcon === `${sizeFilter}-${idx}`;
        return (
          <div
            key={`${sizeFilter}-${idx}`}
            className="icon-wrapper"
            style={{
              position: "absolute",
              left:
                sizeFilter === "small"
                  ? "calc(50% - 20px)"
                  : "calc(50% - 35px)",
              top:
                sizeFilter === "small"
                  ? "calc(50% - 20px)"
                  : "calc(50% - 35px)",
              transform: `rotate(${icon.angle}deg) translateX(${radius}px) rotate(-${icon.angle}deg)`,
              animation: `${animationDuration}s linear 0s infinite normal none running ${animationName}`,
              "--start-angle": `${icon.angle}deg`,
              cursor: "pointer",
            }}
            onMouseEnter={() => setHoveredIcon(`${sizeFilter}-${idx}`)}
            onMouseLeave={() => setHoveredIcon(null)}
          >
            <div
              style={{
                width: sizeFilter === "small" ? "40px" : "70px",
                position: "relative",
              }}
            >
              <img
                alt={icon.name}
                src={icon.src}
                style={{
                  width: sizeFilter === "small" ? "40px" : "70px",
                  height: sizeFilter === "small" ? "40px" : "70px",
                  transition: "transform 0.3s ease",
                  display: "block",
                }}
              />

              {/* Tooltip */}
              <div
                className={`tooltip${isHovered ? " visible" : ""}`}
                style={{
                  backgroundColor: icon.tooltipColor,
                  borderTopColor: icon.tooltipColor,
                }}
              >
                {icon.name}
                <div
                  className="tooltip-arrow"
                  style={{ borderTopColor: icon.tooltipColor }}
                />
              </div>
            </div>
          </div>
        );
      });

  return (
    <div className="w-full lg:w-1/2 h-full order-1 lg:order-2 flex flex-col items-center justify-center lg:justify-center py-8">
      <div
        className="relative mx-auto"
        style={{ width: "500px", height: "500px" }}
      >
        {/* circle svg */}

        <svg className="absolute top-0 left-0" width="500" height="500">
          <circle
            cx="250"
            cy="250"
            r="165"
            stroke={`${themeColors.primaryColor}33`}
            strokeWidth="2"
            strokeDasharray="5 5"
            fill="none"
          />
          <circle
            cx="250"
            cy="250"
            r="250"
            stroke={`${themeColors.primaryColor}33`}
            strokeWidth="3"
            strokeDasharray="10 10"
            fill="none"
          />
        </svg>

        {/* small icon layer */}
        <div
          className="absolute top-0 left-0 z-0"
          style={{ width: "500px", height: "500px" }}
        >
          {renderTechIcons("small", 165, 6, "counter-rotate-6")}
        </div>

        {/* main image my self */}
        <div
          className="relative z-10 "
          style={{
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            overflow: "hidden",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* my image Tooltip */}
          {isHovered && (
            <div
              className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999] px-6 py-5 rounded-2xl transition-all duration-300 animate-fadeInUp"
              style={{
                background: `${themeColors.cardBg}CC`,
                color: themeColors.text,
                border: `1px solid ${themeColors.border}`,
                boxShadow: `0 12px 30px -8px rgba(0, 0, 0, ${
                  theme === "dark" ? "0.45" : "0.15"
                })`,
                maxWidth: "320px",
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
              <div className="flex flex-col items-center gap-2">
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
                  — a Front-End Developer.
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

          {/* Image Wrapper */}
          <div className="w-full h-full relative z-50">
            <img
              alt="Sachin, Frontend Developer"
              className="absolute top-[58%] left-1/2 -translate-x-1/2 -translate-y-1/2"
              src={slide.image}
              style={{
                width: "auto",
                height: "547px",
              }}
            />
          </div>
        </div>

        {/* large Icon layer */}
        <div
          className="absolute top-0 left-0 z-20"
          style={{ width: "500px", height: "500px" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {renderTechIcons("large", 250, 12, "counter-rotate-12")}
        </div>
      </div>
    </div>
  );
}

export default memo(ScrollingImages);

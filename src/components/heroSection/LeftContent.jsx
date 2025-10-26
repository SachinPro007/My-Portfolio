import React, { memo } from "react";
import Typewriter from 'typewriter-effect'
import { useSelector } from "react-redux";
import slide from "../../data/myInfo.json";


function LeftContent() {
  const { themeColors } = useSelector((state) => state.themeReducer);

  return (
    <div className="w-full lg:w-1/2 mx-auto shrink-0 lg:mx-0 py-8 lg:py-12 order-2 lg:order-1 text-center lg:text-left">
      <div className="mt-0">
        <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-6 items-center lg:items-start">
          <span
            className="rounded-full px-3 py-1 text-sm/6 font-semibold"
            style={{
              backgroundColor: `${themeColors.primaryColor}1a`,
              border: `1px solid ${themeColors.primaryColor}33`,
              color: themeColors.primaryColor,
            }}
          >
            {slide.badge}
          </span>
        </div>
      </div>

      {/* heading  */}
      <div className="mt-6 sm:mt-4">
        <h1
          className="font-bold text-3xl md:text-5xl md:leading-tight max-w-3xl mx-auto"
          style={{ color: themeColors.text }}
        >
          Hey! I'm{" "}
          <span style={{ color: themeColors.primaryColor }}>Sachin</span>, a{" "}
          <span>
            <Typewriter
              options={{
                strings: ["Frontend", "MERN Stack"],
                autoStart: true,
                loop: true,
              }}
            />
          </span>Developer.
        </h1>
      </div>

      {/* subtitle */}
      <div className="mt-6 sm:mt-4 max-w-md mx-auto lg:mx-0">
        <p
          className="text-sm md:text-base max-w-2xl mt-8"
          style={{ color: themeColors.summeryText }}
        >
          {slide.subtitle}
        </p>
      </div>

      {/* buttons  */}
      <div className="mt-8 flex flex-wrap justify-center lg:justify-start sm:flex-row gap-4">
        <a href="/#projects">
          <button
            className="px-6 py-3 text-white font-medium rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl cursor-pointer"
            style={{
              background: `linear-gradient(to right, ${themeColors.primaryColor}, ${themeColors.secondary})`,
              boxShadow: `0 0 15px ${themeColors.primaryColor}4D`,
            }}
          >
            Check portfolio
          </button>
        </a>

        <a href="/#contact">
          <button
            className="px-6 py-3 font-medium rounded-lg transition-colors duration-300 ease-in-out hover:bg-[--primary] hover:text-white cursor-pointer"
            style={{
              border: `1px solid ${themeColors.primaryColor}`,
              color: themeColors.primaryColor,
              backgroundColor: `${themeColors.primaryColor}1a`,
              "--primary": themeColors.primaryColor, // CSS variable for hover bg
            }}
          >
            Contact Me
          </button>
        </a>
      </div>
    </div>
  );
}

export default memo(LeftContent);

import React from "react";
import { useSelector } from "react-redux";
import ScrollingImages from "./ScrollingImages";
import LeftContent from "./LeftContent";

const HeroSection = () => {
  const { themeColors } = useSelector((state) => state.themeReducer);

  return (
    <section className="relative overflow-hidden" id="home">
      <div className="relative w-full">
        <div className="w-full transition-opacity duration-500 pt-14 md:pt-16 opacity-100 z-10 pointer-events-auto">
          <div
            className="block relative isolate overflow-hidden h-full transition-all duration-300 shadow-2xl"
            style={{ backgroundColor: themeColors.bg }}
          >

            <div className="relative mx-auto max-w-7xl py-6 px-6 h-full flex flex-col lg:flex-row lg:items-center lg:px-8 lg:gap-8 container ">
              {/* Left Content section */}
              <LeftContent />

              {/* Right Image Scrolling Section */}
              <ScrollingImages />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

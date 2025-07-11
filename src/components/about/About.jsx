import React from "react";
import { useSelector } from "react-redux";
import SectionHeader from "../SectionHeader";
import EducationTimeLine from "./EducationTimeLine";
import RightSideContent from "./RightSideContent";

function AboutSection() {
  const { themeColors } = useSelector((state) => state.themeReducer);


  return (
    <section
      className="py-16 px-6 md:px-10 lg:px-16"
      style={{ backgroundColor: themeColors.bg }}
      id="about"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader title={"About My"} highlight={"Journey"} />

        <div className="flex flex-col lg:flex-row gap-14">
          {/* Education Timeline (Left Side - Unchanged) */}
          <EducationTimeLine />
          

          {/* Right Side - Redesigned Approach Section */}
          <RightSideContent />
        </div>
      </div>
    </section>
  );
}

export default AboutSection;

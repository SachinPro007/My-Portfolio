import React, { memo } from "react";
import { useSelector } from "react-redux";
import {education, experience} from '../../data/myInfo.json'
import EducationCard from "./EducationCard";

function EducationTimeLine() {
  const { themeColors } = useSelector((state) => state.themeReducer);


  return (
    <div className="lg:sticky top-24 h-fit lg:w-1/2"> 
      <h3
        className="text-3xl font-semibold mb-8 flex items-center"
        style={{ color: themeColors.primaryColor }}
      >
        <span
          className="w-6 h-6 rounded-full mr-3"
          style={{
            backgroundColor: `${themeColors.primaryColor}20`,
            border: `2px solid ${themeColors.primaryColor}`,
          }}          
        ></span>
        Work Experience
      </h3>

      <div className="space-y-10 relative pl-2">
        <div
          className="absolute left-5 top-0 bottom-0 w-1 rounded-full"
          style={{
            backgroundColor: themeColors.primaryColor,
          }}
        ></div>

        {experience.map((item, index) => (
          <EducationCard key={index} item={item}/>
        ))}
      </div>


      <h3
        className="text-3xl font-semibold mb-8 mt-4 flex items-center"
        style={{ color: themeColors.primaryColor }}
      >
        <span
          className="w-6 h-6 rounded-full mr-3"
          style={{
            backgroundColor: `${themeColors.primaryColor}20`,
            border: `2px solid ${themeColors.primaryColor}`,
          }}          
        ></span>
        Education Background
      </h3>

      <div className="space-y-10 relative pl-2">
        <div
          className="absolute left-5 top-0 bottom-0 w-1 rounded-full"
          style={{
            backgroundColor: themeColors.primaryColor,
          }}
        ></div>

        {education.map((item, index) => (
          <EducationCard key={index} item={item}/>
        ))}
      </div>
    </div>
  );
}

export default memo(EducationTimeLine);

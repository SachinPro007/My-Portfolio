import React, { memo } from "react";
import { useSelector } from "react-redux";

function RightSideContent() {
  const { themeColors } = useSelector((state) => state.themeReducer);

  const approachCards = [
    {
      icon: "🧠",
      title: "Analytical Problem Solving",
      description:
        "I enjoy breaking down complex problems into manageable solutions.",
    },
    {
      icon: "🔄",
      title: "Lifelong Learning",
      description:
        "Committed to staying updated with the latest web technologies.",
    },
  ];

  const Highlight = ({ children }) => (
    <span style={{ color: themeColors.primaryColor }}>{children}</span>
  );

  return (
    <div className="lg:w-1/2">
      <div className="sticky top-24">
        <div className="mb-10">
          {/* heading */}
          <h3
            className="text-3xl font-semibold mb-6"
            style={{ color: themeColors.primaryColor }}
          >
            My Development Philosophy
          </h3>

          {/* summary  */}
          <div
            className="p-6 rounded-xl"
            style={{
              backgroundColor: `${themeColors.primaryColor}08`,
              border: `1px solid ${themeColors.border}`,
            }}
          >
            <p
              className="text-lg leading-relaxed"
              style={{ color: themeColors.summeryText }}
            >
              I'm using modern technologies like <Highlight>Next.js</Highlight>, <Highlight>React</Highlight>,{" "}
              <Highlight>Redux</Highlight>, and{" "}
              <Highlight>TypeScript</Highlight> for fast, type-safe, and
              responsive interfaces.
              <br />
              <Highlight>Axios</Highlight> and{" "}
              <Highlight>TanStack Query</Highlight> for efficient data handling.
              <br />
              <Highlight>Tailwind CSS</Highlight>,{" "}
              <Highlight>Material UI</Highlight>, <Highlight>Figma</Highlight>,
              and <Highlight>Framer Motion</Highlight> for clean, animated,
              accessible UIs.
              <br />
              Solid <Highlight>JavaScript</Highlight>,{" "}
              <Highlight>HTML</Highlight>, and <Highlight>CSS</Highlight>{" "}
              foundation — plus integration of <Highlight>AI tools</Highlight>{" "}
              for modern workflows and innovation.
              <br />
              Skilled in <Highlight>Git</Highlight> version control and{" "}
              <Highlight>GitHub</Highlight> collaboration for team projects and
              open-source contributions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {approachCards.map((card, index) => (
            <div
              key={index}
              className="p-5 rounded-lg flex flex-col"
              style={{
                backgroundColor: themeColors.bg,
                border: `1px solid ${themeColors.border}`,
              }}
            >
              <div
                className="w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-2xl"
                style={{
                  backgroundColor: `${themeColors.primaryColor}15`,
                  color: themeColors.primaryColor,
                }}
              >
                {card.icon}
              </div>
              <h4
                className="text-lg font-semibold mb-2"
                style={{ color: themeColors.primaryColor }}
              >
                {card.title}
              </h4>
              <p className="text-sm" style={{ color: themeColors.summeryText }}>
                {card.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h4
            className="text-lg font-semibold mb-4"
            style={{ color: themeColors.primaryColor }}
          >
            Upcoming Learning Goals
          </h4>
          <div className="flex flex-wrap gap-2">
            {["Advance Frontend Tools"].map((item, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs font-medium rounded-full"
                style={{
                  backgroundColor: `${themeColors.primaryColor}15`,
                  color: themeColors.primaryColor,
                  border: `1px solid ${themeColors.primaryColor}30`,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(RightSideContent);

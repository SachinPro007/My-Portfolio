import React, { useEffect } from "react";
import {
  Header,
  HeroSection,
  AboutSection,
  SkillsSection,
  WorkSection,
  FAQSection,
  ContactSection,
  Footer,
  FloatSocialIcons,
} from "./components/index";

function App() {
  return (
    <>
      <Header />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <WorkSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <FloatSocialIcons />
    </>
  );
}

export default App;
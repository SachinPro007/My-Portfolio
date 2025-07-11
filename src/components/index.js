import { memo } from 'react';
import AboutSection from "./about/About";
import ContactSection from "./contact/Contact";
import FAQSection from "./faqs/FAQs";
import Footer from "./headerFooter/Footer";
import Header from "./headerFooter/Header";
import HeroSection from "./heroSection/HeroSection";
import WorkSection from "./projects/Projects";
import SkillsSection from "./skill/Skill";
import FloatSocialIcons from "./StickySocials";

// Memoize each component
const MemoizedHeader = memo(Header);
const MemoizedHeroSection = memo(HeroSection);
const MemoizedAboutSection = memo(AboutSection);
const MemoizedSkillsSection = memo(SkillsSection);
const MemoizedWorkSection = memo(WorkSection);
const MemoizedFAQSection = memo(FAQSection);
const MemoizedContactSection = memo(ContactSection);
const MemoizedFooter = memo(Footer);
const MemoizedFloatSocialIcons = memo(FloatSocialIcons);

export {
  MemoizedHeader as Header,
  MemoizedHeroSection as HeroSection,
  MemoizedAboutSection as AboutSection,
  MemoizedSkillsSection as SkillsSection,
  MemoizedWorkSection as WorkSection,
  MemoizedFAQSection as FAQSection,
  MemoizedContactSection as ContactSection,
  MemoizedFooter as Footer,
  MemoizedFloatSocialIcons as FloatSocialIcons
};
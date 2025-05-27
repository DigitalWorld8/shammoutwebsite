
import { useAppSelector } from "@/redux/useAppSelector";
import React from "react";
import { useNavigate } from "react-router-dom";

interface HeroContentProps {
  title: string;
  subtitle: string;
  buttonText: string;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  title,
  subtitle,
  buttonText,
}) => {
  const navigate = useNavigate()
  const buttonMinWidth = 200; // px
  const charWidth = 10; // approximate px width per character
  const buttonWidth = Math.max(buttonMinWidth, buttonText?.length * charWidth);
  const { pos, language } = useAppSelector(state => state.pages)
  const pathname = location.pathname; // e.g. "/sy/arabic/home"

  const urlSegments = pathname.split('/').filter(Boolean); // ["sy", "arabic", "home"]

  const languageUrl = urlSegments[1] || 'english'

  // Scroll page to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = document.querySelector("nav")?.offsetHeight || 0;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;

      window.scrollTo({
        top: elementPosition - navbarHeight - 20,
        behavior: "smooth",
      });
    }
  };
  const handleClickButton = () => {

    const actions: Record<string, () => void> = {
      'Contact Us': () => navigate(`/${pos}/${language}/contact`),
      'Explore more': () => navigate(`/${pos}/${language}/businesses`),
      'Read our Story': () => scrollToSection("history"),
    };

    const action = actions[buttonText];

    if (action) {
      action();
    } else {
      console.warn(`No action defined for button text: "${buttonText}"`);
    }
  };

  return (
    <div className="relative flex w-full md:w-[800px] max-w-full flex-col text-white mt-[259px] md:mt-[359px] px-4 md:px-0 z-10">
      <h1 className="text-xl md:text-2xl font-extrabold leading-tight md:leading-none tracking-[-0.72px] max-md:max-w-full">
        {title}
      </h1>
      <p className="text-sm md:text-[15px] font-semibold leading-[26px] tracking-[-0.45px] mt-3 md:mt-5 max-md:max-w-full">
        {subtitle}
      </p>
      <button
        className="bg-primary shadow-lg text-sm md:text-base font-bold text-center tracking-[0.16px] leading-[1.2] mt-[25px] px-6 md:px-[31px] py-3 md:py-2.5 rounded-xl hover:bg-secondary transition-colors"
        style={{ width: `${buttonWidth}px` }}
        onClick={handleClickButton}
      >
        {buttonText}
      </button>
    </div>
  );
};

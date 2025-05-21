
import React from "react";

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
  const buttonMinWidth = 200; // px
  const charWidth = 10; // approximate px width per character
  const buttonWidth = Math.max(buttonMinWidth, buttonText?.length * charWidth);
  return (
    <div className="relative flex w-full md:w-[800px] max-w-full flex-col text-white mt-[259px] md:mt-[359px] px-4 md:px-0 z-10">
      <h1 className="text-xl md:text-2xl font-extrabold leading-tight md:leading-none tracking-[-0.72px] max-md:max-w-full">
        {title}
      </h1>
      <p className="text-sm md:text-[15px] font-semibold leading-[26px] tracking-[-0.45px] mt-3 md:mt-5 max-md:max-w-full">
        {subtitle}
      </p>
      <button
        className="bg-[rgba(204,31,65,1)] shadow-lg text-sm md:text-base font-bold text-center tracking-[0.16px] leading-[1.2] mt-[25px] px-6 md:px-[31px] py-3 md:py-2.5 rounded-xl hover:bg-[rgba(184,28,59,1)] transition-colors"
        style={{ width: `${buttonWidth}px` }}
      >
        {buttonText}
      </button>
    </div>
  );
};

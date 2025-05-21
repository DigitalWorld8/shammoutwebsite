import { useIsMobile } from "@/hooks/use-mobile";
import React from "react";

interface HeroSectionProps {
  title: string;
  backgroundImage: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  backgroundImage,
  data, type
}) => {
  const isMobile = useIsMobile();

  return (
    <div  className="mt-[46px] max-md:mt-1 w-full max-w-[1199px] flex-col items-stretch max-md:max-w-full">
      <div className="relative flex flex-col min-h-[257px] w-full text-[32px] text-white font-extrabold tracking-[-0.96px] leading-[1.1] pt-[117px] pb-[93px] px-[70px] rounded-[20px] max-md:pt-[60px] max-md:pb-[60px] max-md:px-5 max-md:min-h-[200px] overflow-hidden">
        <img
          src={data[0].logo || backgroundImage}
          alt={data[0].title || title}
          className="absolute h-full w-full object-cover inset-0 rounded-[20px]"
          style={{
            objectPosition: isMobile ? 'center center' : 'center center',
            minHeight: isMobile ? '100%' : 'auto'
          }}
        />
        <div className="absolute inset-0 bg-black/30 rounded-[20px]"></div>
        <h1 className="relative z-10 max-md:text-[28px] max-md:leading-tight">
          {data[0].title || title}
        </h1>
      </div>
    </div>
  );
};

export default HeroSection;
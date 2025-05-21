import React, { useCallback } from "react";
import { SectionHeader } from "../ui/SectionHeader";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "../ui/carousel";
import { useTranslation } from "react-i18next";
import IndustryCard from "./IndustryCard";
import leftIcon from "../../icons/LeftIcon"
import LeftIcon from "@/icons/leftIcon";
import RightIcon from "@/icons/ReftIcon";
import useEmblaCarousel from "embla-carousel-react";
import Container from "../layout/Container";
import { useIsMobile } from "@/hooks/use-mobile";
import { industries } from "@/pages/our-businses/our-businses-data";
interface IndustryCardProps {
    logoSrc: string;
    imageSrc: string;
    title: string;
    tagline: string;
    description: string;
}



export const Industries: React.FC = ({ data, description, title ,type}) => {
    const isMobile = useIsMobile();
    const { i18n } = useTranslation();
    const lang = i18n.language;
  
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: true });
  
    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  

    return (
      <section
        id="businesses"
        className="flex w-full max-w-[1178px] flex-col mt-[83px] max-md:mt-10 max-md:max-w-full"
        // dir={lang === "ar" ? "ltr" : "ltr"}
      >
        <Container>
          <SectionHeader
            title={title || "Industries We Lead"}
            description={description || "With over seven decades of responsible business practices..."}
          />
  
          <div className="w-full max-md:mt-10" dir={lang === "ar" ? "ltr" : "ltr"}>
            <div className="flex justify-end mb-4 px-2">
              <button onClick={scrollPrev} className="p-2">
                <LeftIcon />
              </button>
              <button onClick={scrollNext} className="p-2">
                <RightIcon />
              </button>
            </div>
  
            <div className="embla overflow-hidden" ref={emblaRef}>
              <div className="embla__container flex -ml-4">
                {data?.map((industry, index) => {
                  return (
                    <div
                      key={index}
                      className={`embla__slide pl-4 min-w-0 ${isMobile ? "flex-[0_0_100%]" : "flex-[0_0_50%]"}`}
                    >
                      <IndustryCard
                        title={industry.title}
                        tagline={industry.tagline}
                        description={industry.description}
                        imageSrc={industry.imageSrc}
                        logoSrc={industry.logo}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>
    );
  };
  
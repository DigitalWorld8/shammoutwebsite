import React, { useEffect, useState } from "react";
import { SectionHeader } from "../ui/SectionHeader";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { MilestoneCard } from "./MilestoneCard";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/use-mobile";
import Container from "../layout/Container";
import { Button } from "../ui/button";

export const Milestones: React.FC = ({ data, description, title, type }) => {
  const isMobile = useIsMobile()
  const { i18n } = useTranslation()
  const lang = i18n.language

  const milestones = data
  // Inside your component:
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const autoplayDelay = 3000; // 3 seconds

  React.useEffect(() => {
    if (!api) return

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const [clickLocked, setClickLocked] = useState(false);

  const handleClick = (index: number) => {
    if (clickLocked) return; // ignore clicks while locked

    setClickLocked(true);
    setActiveIndex(index);
    setExpandedIndex(null); // reset while animating

    setTimeout(() => {
      setExpandedIndex(index); // after animation
      setClickLocked(false);   // unlock clicks after 1 second
    }, 300); // 1 second lock duration
  };

  const carouselDesktop = (
    <div className="w-full mt-[60px] max-md:mt-10 flex gap-2">
      {milestones.map((milestone, index) => (
        <div
          key={index}
          className={`
            transition-all duration-700 ease-in-out 
            cursor-pointer will-change-[flex-basis] h-[200px] min-h-[200px]
            ${index === activeIndex
              ? "flex-grow basis-2/3 transform scale-100"
              : "flex-grow-0 basis-[80px] opacity-80 hover:opacity-100"
            }
          `}
          onClick={() => handleClick(index)}
        >
          {index === expandedIndex ? (
            <MilestoneCard
              year={milestone.year}
              title={milestone.title}
              description={milestone.description}
            />
          ) : (
            <div className="
              h-full bg-white 
              shadow-[0px_10px_31px_rgba(215,228,249,0.25)] 
              border border-[rgba(17,17,17,0.1)] 
              rounded-[17px] p-4 
              flex items-center
              transition-all duration-500 ease-in-out
              hover:shadow-lg hover:border-[rgba(204,31,65,0.3)]
              hover:bg-[rgba(204,31,65,0.05)]
            ">
              <div className="
                transform -rotate-90 whitespace-nowrap 
                text-[rgba(204,31,65,1)] font-extrabold text-lg
                transition-all duration-300
              ">
                {milestone.year}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      const slideCount = milestones.length;
      const nextIndex = (current + 1) % slideCount;
      api.scrollTo(nextIndex);
    }, autoplayDelay);

    return () => clearInterval(interval);
  }, [api, current, milestones.length]);
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on('select', onSelect);
    onSelect(); // Set initial index

    return () => {
      api.off('select', onSelect);
    };
  }, [api]);



  return (
    <section id="history" className="flex w-full max-w-[1178px] flex-col mt-[126px] max-md:mt-10">
      <Container>
        <SectionHeader
          title={title || "A Legacy of Innovation: Our Milestones & Achievements"}
          description={description || "At Shammout Group, every milestone reflects a step forward in innovation, expansion, and industry leadership. From a small trading company to a multi-sector powerhouse, we have shaped industries and built a legacy that continues to grow."}
        />


        {!isMobile ?
          <div className="w-full">

            {carouselDesktop}
          </div> :




          <div className="w-full mt-[60px] max-md:mt-10" dir={lang === 'ar' ? 'ltr' : 'ltr'}>
            <Carousel
              setApi={setApi}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full relative"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {milestones.map((milestone, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/3">
                    <MilestoneCard {...milestone} />
                  </CarouselItem>
                ))}
              </CarouselContent>

              <div className="flex justify-center gap-2 mt-4">
                {milestones.map((_, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="icon"
      className={`w-3 h-3 rounded-full p-0 border transition-all duration-300 
        ${current === index 
          ? 'bg-[#cc1f41] border-[#cc1f41]' 
          : 'bg-transparent border-[#cc1f41] hover:bg-[#cc1f41]/30'}`}
                    onClick={() => api?.scrollTo(index)}
                  />
                ))}
              </div>
            </Carousel>
          </div>
        }
      </Container>
    </section>
  );
};


import React, { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { HeroSlider, SliderItem } from "./HeroSlider";
import { MainNavigation } from "../navigation/MainNavigation";
import { MobileBottomNav } from "../navigation/MobileBottomNav";
import { HeroContent } from "./HeroContent";
import hero1 from "../../../src/assets/images/hero1.png"
import hero2 from "../../../src/assets/images/hero2.png"
import hero3 from "../../../src/assets/images/hero3.png"
import ArrowControls from "./ArrowControls";
import Container from "../layout/Container";
export const Hero: React.FC = ({ data, type }) => {

  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageUrls = [hero1, hero2, hero3];
  const [sliderItems, setSliderItems] = useState<SliderItem[]>(
    data.map((item, index) => ({
      ...item,
      logo: imageUrls[index] || "",
    }))
  );


  useEffect(() => {
    try {
      const savedHeroContent = localStorage.getItem("shammout_cms_hero");
      if (savedHeroContent) {
        const parsed = JSON.parse(savedHeroContent);
        if (Array.isArray(parsed)) {
          setSliderItems(parsed);
        }
      }
    } catch (error) {
      console.error("Error loading hero content from localStorage:", error);
    }
  }, []);

  const handlePrevSlide = () => {
    const prevIndex = currentIndex === 0 ? sliderItems.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
  };

  const handleNextSlide = () => {
    const nextIndex = (currentIndex + 1) % sliderItems.length;
    setCurrentIndex(nextIndex);
  };

  return (
    <header className="max-w-[1199px]  px-4 flex w-full  flex-col items-stretch max-md:max-w-full">
      <MainNavigation isMobile={isMobile} />
      {isMobile && <MobileBottomNav />}




      <section id={type} className=" bg-[rgba(252,241,224,1)] overflow-hiddenrounded-[30px] max-md:max-w-full ">
        <div className="flex flex-col relative min-h-[623px] md:min-h-[723px] w-full px-4 md:px-[42px] py-11 max-md:max-w-full">
          <HeroSlider
            sliderItems={data}
            currentIndex={currentIndex}
            onSlideChange={setCurrentIndex}
          />
          <ArrowControls handlePrevSlide={handlePrevSlide} handleNextSlide={handleNextSlide} />
          {data?.[currentIndex] && (
            <HeroContent
              title={data[currentIndex].title}
              subtitle={data[currentIndex].description}
              buttonText={data[currentIndex].btnLabel}
            />
          )}


          {/* <HeroContent
            title={sliderItems[currentIndex]?.title}
            subtitle={sliderItems[currentIndex]?.description}
            buttonText={sliderItems[currentIndex]?.btnLabel}
          /> */}
        </div>
      </section>

    </header>
  );
};
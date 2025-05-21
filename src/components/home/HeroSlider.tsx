
import React, { useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface SliderItem {
  imgUrl: string;
  title: string;
  description: string;
  btnLabel: string;
}

interface HeroSliderProps {
  sliderItems: SliderItem[];
  currentIndex: number;
  onSlideChange: (index: number) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  sliderItems,
  currentIndex,
  onSlideChange
}) => {
  useEffect(() => {
    const interval = setInterval(() => {
      onSlideChange((currentIndex + 1) % sliderItems.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex, sliderItems.length, onSlideChange]);

  const goToPrevSlide = () => {
    const prevIndex = currentIndex === 0 ? sliderItems.length - 1 : currentIndex - 1;
    onSlideChange(prevIndex);
  };

  const goToNextSlide = () => {
    const nextIndex = (currentIndex + 1) % sliderItems.length;
    onSlideChange(nextIndex);
  };

  return (
    <div className="absolute h-full w-full inset-0 overflow-hidden">
      {sliderItems.map((item, index) => (
        <div
          key={index}
          className={`absolute h-full w-full transition-opacity duration-1000 ease 
            ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
        >
          <img
            src={item.logo}
            alt={item.title}
            className="h-full w-full object-cover  rounded-xl"
          />
        </div>
      ))}

      {/* Navigation Arrows */}
      {/* <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center px-4 md:px-8 transform -translate-y-1/2 z-10">
        <button 
          onClick={goToPrevSlide}
          className="bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
          aria-label="Previous slide"
        >
          <ArrowLeft size={24} />
        </button>
        <button 
          onClick={goToNextSlide}
          className="bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
          aria-label="Next slide"
        >
          <ArrowRight size={24} />
        </button>
      </div> */}

      {/* Dot Navigation */}
      {/* <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        {sliderItems.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex
                ? "bg-white"
                : "bg-white/50 hover:bg-white/75"
            }`}
            onClick={() => onSlideChange(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div> */}
    </div>
  );
};
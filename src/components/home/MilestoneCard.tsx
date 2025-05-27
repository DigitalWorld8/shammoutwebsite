import React from "react";

interface MilestoneCardProps {
  year: string;
  title: string;
  description: string;
}

export const MilestoneCard: React.FC<MilestoneCardProps> = ({
  year,
  title,
  description,
}) => {
  return (
    <div className="
      bg-white h-[200px] min-h-[200px]
      shadow-[0px_10px_31px_rgba(215,228,249,0.25)]
      border flex flex-col justify-center
      text-[22px] text-[rgba(30,57,94,1)]
      tracking-[-0.65px] leading-none 
      w-full p-8 rounded-[17px] 
      border-[rgba(17,17,17,0.1)] border-solid
      transition-all duration-700 ease-in-out
      hover:shadow-[0px_20px_40px_rgba(215,228,249,0.4)]
      overflow-hidden
    ">
      {/* Animate the inner content */}
      <div className="
        flex flex-col transition-all duration-700 ease-in-out
        transform-gpu
      ">
        <div className="text-primary font-extrabold break-words">
          {year || ''}
        </div>
        <div className="font-bold mt-[18px] break-words">
          {title || ''}
        </div>
        <div className="text-sm font-normal leading-loose tracking-[-0.43px] mt-[18px] break-words">
          {description || ''}
        </div>
      </div>
    </div>
  );
};


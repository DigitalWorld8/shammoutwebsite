import React from "react";

interface SectionHeaderProps {
  title: string;
  description?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-stretch gap-1">
        <div className="bg-primary flex w-[79px] shrink-0 h-[3px] rounded-[20px]" />
        <div className="bg-primary flex w-[22px] shrink-0 h-[3px] rounded-[20px]" />
      </div>
      <h2 className="text-[rgba(30,57,94,1)] text-[32px] font-extrabold leading-[1.1] tracking-[-0.96px] mt-[23px]">
        {title}
      </h2>
      {description && (
        <p className="text-[rgba(30,57,94,1)] text-base font-normal leading-7 tracking-[-0.48px] mt-4">
          {description}
        </p>
      )}
    </div>
  );
};

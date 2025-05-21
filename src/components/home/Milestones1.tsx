import React from "react";
import { SectionHeader } from "../ui/SectionHeader";
import { useTranslation } from 'react-i18next';

export const Milestones: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="flex w-full max-w-[1178px] flex-col mt-[126px] max-md:mt-10">
      <SectionHeader
        title={t('milestones.title')}
        description={t('milestones.description')}
      />

      <div className="w-full max-w-[1106px] mt-[60px] max-md:max-w-full max-md:mt-10">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-[33%] max-md:w-full max-md:ml-0">
            <div className="bg-white shadow-[0px_10px_31px_rgba(215,228,249,0.25)] border flex grow flex-col text-[22px] text-[rgba(30,57,94,1)] tracking-[-0.65px] leading-none w-full pl-[33px] pr-[72px] pt-[34px] pb-[129px] rounded-[17px] border-[rgba(17,17,17,0.1)] border-solid max-md:mt-[11px] max-md:pb-[100px] max-md:px-5">
              <div className="text-[rgba(204,31,65,1)] font-extrabold">
                1950
              </div>
              <div className="font-bold mt-[18px]">{t('milestones.established')}</div>
              <div className="text-sm font-normal leading-loose tracking-[-0.43px] mt-[18px]">
                {t('milestones.established_description')}
              </div>
            </div>
          </div>
          <div className="w-[33%] ml-5 max-md:w-full max-md:ml-0">
            <div className="bg-white shadow-[0px_10px_31px_rgba(215,228,249,0.25)] border flex grow flex-col text-[22px] text-[rgba(30,57,94,1)] tracking-[-0.65px] leading-none w-full pt-[34px] pb-[74px] px-[34px] rounded-[17px] border-[rgba(17,17,17,0.1)] border-solid max-md:mt-[11px] max-md:px-5">
              <div className="text-[rgba(204,31,65,1)] font-extrabold">
                1987
              </div>
              <div className="font-bold mt-[18px]">{t('milestones.new_stream_line')}</div>
              <div className="text-sm font-normal leading-[25px] tracking-[-0.43px] self-stretch mt-[27px]">
                {t('milestones.new_stream_line_description')}
              </div>
            </div>
          </div>
          <div className="w-[33%] ml-5 max-md:w-full max-md:ml-0">
            <div className="bg-white shadow-[0px_10px_31px_rgba(215,228,249,0.25)] border flex grow flex-col items-stretch text-[22px] text-[rgba(30,57,94,1)] tracking-[-0.65px] w-full pt-[34px] pb-[69px] px-[33px] rounded-[17px] border-[rgba(17,17,17,0.1)] border-solid max-md:mt-[11px] max-md:px-5">
              <div className="text-[rgba(204,31,65,1)] font-extrabold leading-none">
                2002
              </div>
              <div className="font-bold leading-8 mt-[18px] max-md:mr-2.5">
                {t('milestones.strengthening_industry')}
              </div>
              <div className="text-sm font-normal leading-[25px] tracking-[-0.43px] mt-[22px]">
                {t('milestones.strengthening_industry_description')}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-center flex gap-[11px] mt-[37px]">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/0088fdfbc5f845fe86a1c89db6aed806/bcca89a7fb4e08c7545aaaf2f0e5d545d079da0e?placeholderIfAbsent=true"
          alt="Previous"
          className="aspect-[2.18] object-contain w-6 shrink-0 cursor-pointer"
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/0088fdfbc5f845fe86a1c89db6aed806/4fbe62172eff568d2cec719a13daf0c2236308d0?placeholderIfAbsent=true"
          alt="Page 1"
          className="aspect-[1] object-contain w-[11px] shrink-0 cursor-pointer"
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/0088fdfbc5f845fe86a1c89db6aed806/4fbe62172eff568d2cec719a13daf0c2236308d0?placeholderIfAbsent=true"
          alt="Page 2"
          className="aspect-[1] object-contain w-[11px] shrink-0 cursor-pointer"
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/0088fdfbc5f845fe86a1c89db6aed806/4fbe62172eff568d2cec719a13daf0c2236308d0?placeholderIfAbsent=true"
          alt="Page 3"
          className="aspect-[1] object-contain w-[11px] shrink-0 cursor-pointer"
        />
      </div>
    </section>
  );
};

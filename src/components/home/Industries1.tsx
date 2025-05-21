import React from "react";
import { SectionHeader } from "../ui/SectionHeader";
import { useTranslation } from 'react-i18next';

export const Industries: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section
      id="businesses"
      className="flex w-full max-w-[1178px] flex-col mt-[94px] max-md:max-w-full max-md:mt-10"
    >
      <SectionHeader
        title={t('industries.title')}
        description={t('industries.description')}
      />

      <div className="w-full max-w-6xl mt-[83px] max-md:max-w-full max-md:mt-10">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-6/12 max-md:w-full max-md:ml-0">
            <div className="bg-[rgba(250,248,248,1)] grow w-full pb-10 rounded-[17px] max-md:max-w-full max-md:mt-5">
              <div className="flex flex-col relative min-h-[340px] w-full pb-[274px] px-20 rounded-[17px_17px_0px_0px] max-md:max-w-full max-md:pb-[100px] max-md:px-5">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/0088fdfbc5f845fe86a1c89db6aed806/5076f8284eec06ccae495e58d857449fd01affde?placeholderIfAbsent=true"
                  alt="Shammout Auto"
                  className="absolute h-full w-full object-cover inset-0 rounded-[17px_17px_0px_0px]"
                />
                <div className="relative bg-white mb-[-55px] w-[155px] max-w-full pt-5 pb-2.5 px-[9px] rounded-[0px_0px_6px_6px] max-md:mb-2.5">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/0088fdfbc5f845fe86a1c89db6aed806/46b87bab1512e714a458e1c45ef9244c6ee4005b?placeholderIfAbsent=true"
                    alt="Shammout Auto logo"
                    className="aspect-[3.8] object-contain w-full"
                  />
                </div>
              </div>
              <div className="flex flex-col items-stretch text-[rgba(30,57,94,1)] mt-[17px] px-9 max-md:max-w-full max-md:px-5">
                <h3 className="text-xl font-extrabold leading-loose tracking-[-0.6px]">
                  {t('industries.shammout_auto')}
                </h3>
                <p className="text-sm font-normal leading-[21px] tracking-[-0.42px] mt-[29px] max-md:max-w-full">
                  {t('industries.shammout_auto_description')}
                </p>
              </div>
            </div>
          </div>
          <div className="w-6/12 ml-5 max-md:w-full max-md:ml-0">
            <div className="bg-[rgba(250,248,248,1)] grow w-full pb-[61px] rounded-[17px] max-md:max-w-full max-md:mt-5">
              <div className="flex flex-col relative min-h-[340px] w-full pb-[274px] px-20 rounded-[17px_17px_0px_0px] max-md:max-w-full max-md:pb-[100px] max-md:px-5">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/0088fdfbc5f845fe86a1c89db6aed806/adcff58b4642b94b009e6a3b9e23fa47c2409f4c?placeholderIfAbsent=true"
                  alt="Damask Metals Co."
                  className="absolute h-full w-full object-cover inset-0 rounded-[17px_17px_0px_0px]"
                />
                <div className="relative bg-white flex mb-[-55px] w-[155px] max-w-full flex-col items-stretch justify-center px-3 py-[11px] rounded-[0px_0px_6px_6px] max-md:mb-2.5">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/0088fdfbc5f845fe86a1c89db6aed806/b6528c3268d972c18c92a4a56636f99355c5de2d?placeholderIfAbsent=true"
                    alt="Damask Metals Co. logo"
                    className="aspect-[2.98] object-contain w-full"
                  />
                </div>
              </div>
              <div className="flex flex-col items-stretch text-[rgba(30,57,94,1)] mt-[17px] px-9 max-md:max-w-full max-md:px-5">
                <h3 className="text-xl font-extrabold leading-loose tracking-[-0.6px]">
                  {t('industries.damask_metals')}
                </h3>
                <p className="text-sm font-normal leading-[21px] tracking-[-0.42px] mt-[29px] max-md:max-w-full">
                  {t('industries.damask_metals_description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

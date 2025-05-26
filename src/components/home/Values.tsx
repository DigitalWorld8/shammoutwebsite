import React from "react";
import { useTranslation } from 'react-i18next';
import Container from "../layout/Container";

export const Values: React.FC = ({ data, type }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const icons = [
    "https://cdn.builder.io/api/v1/image/assets/0088fdfbc5f845fe86a1c89db6aed806/62d3aef49360dcfc2a2cd4b050ca57bd8eabf8e4?placeholderIfAbsent=true",
    "https://cdn.builder.io/api/v1/image/assets/0088fdfbc5f845fe86a1c89db6aed806/499352a6f0b8b5b65eddfe919627c2468eaa4769?placeholderIfAbsent=true",
    "https://cdn.builder.io/api/v1/image/assets/0088fdfbc5f845fe86a1c89db6aed806/8875369cd4760ebbdd3f341e82b436b0bfa17b80?placeholderIfAbsent=true",
  ];

  const titleIndex = data.findIndex((v) => v.key === "title");
  const titleItem = data[titleIndex];

  return (
    <section
      id={type}
      className="bg-[rgba(30,57,94,1)] self-stretch flex w-full flex-col items-center text-white justify-center mt-[83px] max-md:mt-10  max-md:px-5 px-20 py-[71px] max-md:max-w-full"
    >
      <Container>
        <div className="flex w-full flex-col items-stretch max-md:max-w-full max-sm:items-center max-sm:text-center">
          <h2 className="text-[32px] font-extrabold leading-[1.1] tracking-[-0.96px]">
            {titleItem?.title}
          </h2>

          <div className="flex gap-5 flex-wrap justify-between mt-[62px] max-md:max-w-full max-md:mt-10 max-sm:justify-center">
            {data?.filter((v) => v.key !== 'title')?.map((item, index) => (
              <React.Fragment key={item.key}>
                <div className="flex flex-col max-w-[30%] min-w-[250px] max-sm:items-center max-sm:text-center">
                  <img
                    src={item.logo}
                    alt={`${item.title} icon`}
                    className="aspect-[1] object-contain w-[92px]"
                  />
                  <h3 className="text-xl font-extrabold leading-loose tracking-[-0.6px] mt-[17px]">
                    {item.title}
                  </h3>
                  <p className="text-sm font-normal leading-[21px] tracking-[-0.42px] self-stretch mt-[21px] max-sm:self-center">
                    {item.description}
                  </p>
                </div>

                {index < data.length - 2 && (
                  <div
                    className={`border-[rgba(255,255,255,0.5)] border-solid w-px shrink-0 h-[200px] mt-7 ${isRTL ? "border-l" : "border-r"} max-sm:hidden`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

      </Container>
    </section>
  );
};

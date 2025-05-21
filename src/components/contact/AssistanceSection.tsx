import React from "react";
import { useTranslation } from "react-i18next";
import Container from "../layout/Container";

const AssistanceSection: React.FC = ({ data, type }) => {
  const { t } = useTranslation();
  const title = data[0]?.title
  const email = data[0]?.email
  const phone = data[0]?.phone
  const logo = data[0]?.logo
  return (
    <Container>


      <section id={type} className="flex flex-col relative min-h-[290px] w-full text-white justify-center mt-[82px] px-20 py-[75px] rounded-[23px] max-md:mt-10 max-md:px-5">
        <img
          src={logo}
          alt={t("assistanceSection.backgroundAlt")}
          className="absolute h-full w-full object-cover inset-0 rounded-[23px]"
        />
        <div className="relative w-[472px] max-w-full">
          <h2 className="text-[32px] font-extrabold leading-[35px] tracking-[-0.96px] max-md:max-w-full">
            {title || t("assistanceSection.title")}
          </h2>
          <div className="flex w-[394px] max-w-full items-stretch gap-2 text-[10px] font-semibold leading-none mt-8">
            <a
              href="mailto:info@shammoutgroup.com"
              className="self-stretch min-h-[41px] flex items-center px-[22px] py-3.5 rounded-[6.376px] bg-white/20 hover:bg-white/30 transition-colors max-md:px-5"
            >
              {email || "info@shammoutgroup.com"}
            </a>
            <a
              href="tel:+96311926"
              className="bg-[rgba(204,31,65,1)] border flex min-h-[41px] items-center gap-1.5 justify-center px-[22px] py-[13px] rounded-md border-[rgba(204,31,65,1)] border-solid hover:bg-[rgba(184,28,59,1)] transition-colors max-md:px-5"
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/0088fdfbc5f845fe86a1c89db6aed806/1a6ba54892ad6337a8fb3bb46815a360cd68559e?placeholderIfAbsent=true"
                alt={t("assistanceSection.phoneAlt")}
                className="aspect-[0.93] object-contain w-3.5 self-stretch shrink-0 my-auto"
              />
              <span 
            style={{direction:"ltr"}}
              
              className="self-stretch my-auto">{phone || "+963 11 9260"}</span>
            </a>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default AssistanceSection;

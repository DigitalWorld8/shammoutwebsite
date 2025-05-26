import React from "react";
import ContactCard from "../ui/ContactCard";
import { useTranslation } from "react-i18next";

interface ReachUsSectionProps {
  data: {
    contactInfo: {
      phone?: string;
      email?: string;
      website?: string;
      addresses: string[];
    };
  }[];
}

const ReachUsSection: React.FC<ReachUsSectionProps> = ({ data, description, title, type }) => {
  const { t } = useTranslation();
  console.log('data', data);

  const logos = [
    "https://cdn.builder.io/api/v1/image/assets/0088fdfbc5f845fe86a1c89db6aed806/5489f83dc83fc9765d1f8e4ce9167011d3243da7?placeholderIfAbsent=true",
    "https://cdn.builder.io/api/v1/image/assets/0088fdfbc5f845fe86a1c89db6aed806/498284438849a440a9f88b9c10d6ab700d1dfd02?placeholderIfAbsent=true",
    "https://cdn.builder.io/api/v1/image/assets/0088fdfbc5f845fe86a1c89db6aed806/b6528c3268d972c18c92a4a56636f99355c5de2d?placeholderIfAbsent=true",
    "https://cdn.builder.io/api/v1/image/assets/0088fdfbc5f845fe86a1c89db6aed806/0fc0970508b076e1da35873be926ad22ff86254a?placeholderIfAbsent=true",
    "https://cdn.builder.io/api/v1/image/assets/0088fdfbc5f845fe86a1c89db6aed806/cec43b1219d94d1a735907f770c5f8260b0d417c?placeholderIfAbsent=true",
    "https://cdn.builder.io/api/v1/image/assets/0088fdfbc5f845fe86a1c89db6aed806/0d5f445c4d8d2e41dbb3ae0564b56fac32ea93e1?placeholderIfAbsent=true",
  ];

  return (
    <section id={type} className="mt-[71px] max-md:mt-10">
      <div className="flex items-stretch gap-1 ml-[11px] max-md:ml-2.5">
        <div className="bg-[rgba(204,31,65,1)] flex w-[79px] shrink-0 h-[3px] rounded-[20px]" />
        <div className="bg-[rgba(204,31,65,1)] flex w-[22px] shrink-0 h-[3px] rounded-[20px]" />
      </div>

      <h2 className="text-[rgba(30,57,94,1)] text-[32px] font-extrabold leading-[1.1] tracking-[-0.96px] ml-[11px] mt-[23px] max-md:ml-2.5">
        {title || t("reachUs.title")}
      </h2>

      <p className="text-[rgba(30,57,94,1)] text-base font-normal leading-7 tracking-[-0.48px] ml-3.5 mt-8 max-md:max-w-full">
        {description || t("reachUs.description")}
      </p>

      <div className="mt-[71px] max-md:mt-10">
        <div className="gap-5 grid grid-cols-3 max-md:grid-cols-1">
          {data.map((item, index) => (
            <div key={index} className="w-full">
              <ContactCard
                logo={item.logo || logos[index]}
                contactInfo={{
                  phone: item.phone,
                  addresses: item.addresses,
                  website: item.website,
                  email: item.email,
                  btnInfo: item.btnInfo
                }}
                type={type}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default ReachUsSection;

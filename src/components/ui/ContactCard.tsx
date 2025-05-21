import AddressIcon from "@/icons/AddressIcon";
import MessageIcon from "@/icons/MessageIcon";
import React from "react";

interface ContactInfo {
  phone?: string;
  email?: string;
  addresses: string[];
  website?: string;
}

interface ContactCardProps {
  logo: string;
  contactInfo: ContactInfo;
}

const ContactCard: React.FC<ContactCardProps> = ({ logo, contactInfo }) => {
  return (
    <div className="bg-white shadow-[0px_10px_31px_rgba(215,228,249,0.25)] border flex w-full flex-col text-sm text-[rgba(30,57,94,1)] font-normal tracking-[-0.43px] leading-loose mx-auto p-[30px] rounded-[17px] border-[rgba(17,17,17,0.1)] border-solid h-full">
      <img
        src={logo}
        alt="Company Logo"
        className="object-contain max-w-full h-[50px]"
      />

      {contactInfo.phone && (
        <div className="flex items-stretch gap-[7px] mt-[12px]">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/0088fdfbc5f845fe86a1c89db6aed806/969682b1c5884bffda18ae450c3e18e55de1163f?placeholderIfAbsent=true"
            alt="Phone"
            className="aspect-[0.93] object-contain w-3.5 shrink-0 mt-1"
          />
          <a
            href={`tel:${contactInfo.phone}`}
            className="hover:text-[rgba(204,31,65,1)] transition-colors"
            style={{direction:"ltr"}}
          >
            {contactInfo.phone}
          </a>
        </div>
      )}

      {contactInfo.email && (
        <div className="flex items-center  gap-[7px] mt-[12px]">
          <MessageIcon />
          <a
            href={`mailto:${contactInfo.email}`}
            className="hover:text-[rgba(204,31,65,1)] transition-colors"
          >
            {contactInfo.email}
          </a>
        </div>
      )}

      {contactInfo?.addresses?.map((address, index) => (
        <div
          key={index}
          className={`flex gap-[7px] mt-[12px] ${index === 0 ? "mt-3" : "mt-5"} ml-${index === 0 ? "0" : "8"}`}
        >
          <AddressIcon />
          {address}
        </div>
      ))}

      {contactInfo.website && (
        <div className="flex items-stretch gap-[9px]   ">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/0088fdfbc5f845fe86a1c89db6aed806/8b20239210904ec93de7e5b9dbb999b49e8b935a?placeholderIfAbsent=true"
            alt="Website"
            className="aspect-[1] object-contain w-3.5 shrink-0 mt-[7px]"
          />
          <a
            href={`https://${contactInfo.website.trim()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[rgba(204,31,65,1)] transition-colors"
          >
            {contactInfo.website}
          </a>
        </div>
      )}
    </div>
  );
};

export default ContactCard;
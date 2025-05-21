import { useTranslation } from "react-i18next";

interface IndustryCardProps {
  logoSrc: string;
  imageSrc: string;
  title: string;
  tagline: string;
  description: string;
}
const IndustryCard: React.FC<IndustryCardProps> = ({
  logoSrc,
  imageSrc,
  title,
  tagline,
  description,
}) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  return (
    <div className="bg-[rgba(250,248,248,1)] w-full h-[600px] pb-10 rounded-[17px]"
    // dir={lang === "ar" ? "ltr" : "ltr"}

    >
      <div className="flex flex-col relative min-h-[340px] w-full pb-[274px] px-20 rounded-[17px_17px_0px_0px] max-md:pb-[100px] max-md:px-5">
        <img
          src={imageSrc}
          alt={title}
          className="absolute h-full w-full object-cover inset-0 rounded-[17px_17px_0px_0px]"
        />
        {logoSrc && (
          <div className="relative bg-white mb-[-55px] w-[155px] max-w-full pt-5 pb-2.5 px-[9px] rounded-[0px_0px_6px_6px] max-md:mb-2.5">
            <img
              src={logoSrc}
              alt={`${title} logo`}
              className="aspect-[3.8] object-contain w-full"
            />
          </div>
        )}
      </div>
      <div
        style={{
          textAlign: lang === "ar" ? "end" : "start"

        }}
        className="text-enf flex flex-col items-stretch text-[rgba(30,57,94,1)] mt-[17px] px-9 max-md:px-5">
        <h3 className="text-xl font-extrabold leading-loose tracking-[-0.6px]">
          {title}
        </h3>
        <p className="text-sm font-normal leading-[21px] tracking-[-0.42px] mt-[29px]">
          <span className="font-semibold">{tagline}</span>
          <br />
          {description}
        </p>
      </div>
    </div >
  );
};
export default IndustryCard;

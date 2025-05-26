import React from "react";
import NewsletterFormWithCaptcha, { } from "../ui/NewsletterForm";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux/useAppSelector";

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pageContent, language, staticComp, pos } = useAppSelector(state => state.pages);
  const footer = staticComp?.filter((c) => c.language === language)?.find((c) => c.type === 'footer')

  let footerLabels: Record<string, string> = {};
  let footerSections: any[] = [];
  let footerLogo: string[] = [];
  if (footer?.content) {
    try {
      const parsed = JSON.parse(footer.content);
      footerLabels = parsed?.footerContent || {};
      footerSections = parsed?.sections || [];
      footerLogo = parsed?.logo || [];
    } catch (error) {
      console.error('Failed to parse footer content', error);
    }
  }



  const phones = footerLabels['footer.phone']
  const address = footerLabels['footer.address']
  const subscribe = footerLabels['footer.newsletterDescription']
  const callUs = footerLabels['footer.callUs']
  const copyright = footerLabels['footer.copyright']
  const about = footerSections.find((s) => s.type === 'about') || {};
  const businesses = footerSections.find((s) => s.type === 'businesses') || {};
  const contact = footerSections.find((s) => s.type === 'contact') || {};[]






  return (
    <footer
      id="contact"
      className="bg-[rgba(30,57,94,1)] self-stretch flex w-full flex-col items-center justify-center mt-[94px] px-[70px] py-[68px] rounded-[28px_28px_0px_0px] max-md:max-w-full max-md:mt-10 max-md:px-5"
    >
      <div className="w-full max-w-[1103px] ml-[22px] max-md:max-w-full">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-[33%] max-md:w-full max-md:ml-0">
            <div className="w-full max-md:mt-10">
              <img
                src={footerLogo} alt={t("footer.logoAlt")}
                className="aspect-[3.08] object-contain w-[203px] max-w-full"
              />
              <p className="text-white text-[13px] font-normal leading-[21px] tracking-[-0.39px] mt-9 max-md:mr-[3px]">
                {subscribe || t("footer.newsletterDescription")}
              </p>
              <NewsletterFormWithCaptcha />
              <div className=" flex items-center gap-[21px] mt-10 max-md:mr-[5px]">
                <div className="self-stretch my-auto">
                  <div
                    style={{ direction: "ltr" }}

                    className="text-white text-[13px] font-bold leading-none">
                    {phones}
                  </div>
                  <div className="text-[rgba(175,175,175,1)] text-[9px] font-normal leading-none mt-[7px]">
                    {address || t("footer.address")}
                  </div>
                </div>
                <a
                  href="tel:+96311213593"
                  className="text-center border-[color:var(--white,#FFF)] self-stretch gap-[7px] text-[9px] text-white font-bold leading-loose w-[101px] my-auto  py-[9px] rounded-[5.696px] border-[1.424px] border-solid hover:bg-white hover:bg-opacity-10 transition-colors max-md:pl-5"
                >
                  {callUs || t("footer.callUs")}
                </a>

              </div>
            </div>
          </div>
          <div className="w-[67%] ml-5 max-md:w-full max-md:ml-0">
            <div className="w-full mt-[5px] max-md:max-w-full max-md:mt-10">
              <div className="w-[532px] max-w-full">
                <div className="gap-5 flex  ">
                  <div className="w-[30%]  max-md:ml-0">
                    <div className="flex flex-col items-stretch text-xs max-md:mt-10">
                      <h3 className="text-white font-bold leading-none uppercase cursor-pointer" onClick={() => {
                        navigate(`/${pos}/${language}/`)
                      }}>
                        {about?.titleKey}
                      </h3>
                      <nav className="text-[rgba(175,175,175,1)] font-normal leading-[26px] mt-1.5">
                        {about?.linkKeys?.map((link, index) => (
                          <Link
                            key={index}
                            to={`/${pos}/${language}/`}
                            className="block hover:text-white transition-colors"
                          >
                            {link}
                          </Link>
                        ))}
                      </nav>
                    </div>
                  </div>
                  <div className="w-2/5 ml-5  max-md:ml-0">
                    <div className="flex grow flex-col items-stretch text-xs max-md:mt-10">
                      <h3 className="text-white font-bold leading-none uppercase cursor-pointer" onClick={() => {
                        navigate(`/${pos}/${language}/businesses`)
                      }}>
                        {businesses?.titleKey || t("footer.ourBusinesses")}
                      </h3>
                      <nav className="text-[rgba(175,175,175,1)] font-normal leading-[26px] mt-1.5">
                        {businesses?.linkKeys
                          ?.map((link, index) => (
                            <Link
                              key={index}
                              to={`/${pos}/${language}/businesses`}
                              className="block hover:text-white transition-colors"
                            >
                              {link}
                            </Link>
                          ))}
                      </nav>
                    </div>
                  </div>
                  <div className="w-[30%] ml-5  max-md:ml-0">
                    <div className="flex flex-col items-stretch text-xs max-md:mt-10">
                      <h3 className="text-white font-bold leading-none uppercase cursor-pointer" onClick={() => {
                        navigate(`/${pos}/${language}/contact`)
                      }}>
                        {contact?.titleKey || t("footer.contactUs")}
                      </h3>
                      <nav className="text-[rgba(175,175,175,1)] font-normal leading-[26px] mt-1.5">
                        {contact?.linkKeys?.map((link, index) => (
                          <Link
                            key={index}
                            to={`/${pos}/${language}/partner`}
                            className="block hover:text-white transition-colors"
                          >
                            {link}
                          </Link>
                        ))}
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border w-[650px] shrink-0 max-w-full h-px mt-[26px] border-white border-solid max-md:mr-1" />
              <div className="flex w-full items-stretch gap-[40px_100px] text-[10px] text-white font-normal leading-[17px] flex-wrap mt-[18px] max-md:max-w-full">
                {/* <div className="flex items-stretch gap-5">
                  {footerLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="hover:text-gray-300 transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div> */}
                <div className="grow shrink w-[286px]">
                  {copyright}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

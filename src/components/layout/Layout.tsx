import { useIsMobile } from "@/hooks/use-mobile";
import { ReactNode, useEffect } from "react";
import Header from "./Header";
import { PartnerBanner } from "../home/PartnerBanner";
import { Footer } from "./Footer";
import { Scroller } from "../ui/Scroller";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getPageBySybUrlService, getPageContentService } from "@/redux/services/pagesService";
import { useAppDispatch } from "@/redux/store";
import { useAppSelector } from "@/redux/useAppSelector";
import { LoadingScreen } from "../ui/LoadingScreen";


interface LayoutProps {
  children: ReactNode;
}



const Layout = ({ children }: LayoutProps) => {
  const { pageContent, isLoading } = useAppSelector(state => state.pages);

  const isMobile = useIsMobile();
  const location = useLocation();
  const { t } = useTranslation();

  const sections = [
    { id: "about", label: t("aboutus"), type: 'About Section' },
    { id: "businesses", label: t('businesses'), type: 'Industries Section' },
    { id: "history", label: t('outhistory'), type: 'Milestones Section' },
    { id: "partner", label: t('partnerus'), type: 'Partner Form' },
  ];

  const isHome = location.pathname === "/sy/english/" || location.pathname === "/sy/arabic/";
  const segments = pageContent?.segments;

  // Filter sections where a matching segment (by component[0].type) exists
  const matchedSections = sections.filter(section =>
    segments?.some(segment => segment?.components?.[0]?.type === section.type)
  );

  return (
    <>

      <div className={`bg-white flex flex-col overflow-hidden   ${!isMobile && 'pt-[20px]'}`}>
        <Header />
        {isLoading ? <LoadingScreen /> : children}
        {/* <Footer /> */}
      </div>
      {!isMobile && isHome && matchedSections.length > 0 && (
        <Scroller sections={matchedSections} />
      )}
    </>
  );
};


export default Layout;

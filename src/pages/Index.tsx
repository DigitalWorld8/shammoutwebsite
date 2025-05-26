import React, { useEffect, useState } from "react";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Values } from "@/components/home/Values";
import { Industries } from "@/components/home/Industries";
import { Milestones } from "@/components/home/Milestones";
import { PartnerBanner } from "@/components/home/PartnerBanner";
import { Footer } from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Scroller } from "@/components/ui/Scroller";
import { useIsMobile } from "@/hooks/use-mobile";
import Layout from "@/components/layout/Layout";
import useScrollToTop from "@/hooks/useScrollToTop";
import Container from "@/components/layout/Container";
import { useAppSelector } from "@/redux/useAppSelector";
import ReachUsSection from "@/components/contact/ReachUsSection";
import AssistanceSection from "@/components/contact/AssistanceSection";
import HeroSection from "@/components/contact/HeroSection";
import { useAppDispatch } from "@/redux/store";
import { getPageContentService, getStaticComponentsService } from "@/redux/services/pagesService";
import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PartnerForm from "@/components/partner/PartnerForm";
import NotFound from "./NotFound";
import NoContent from "@/components/ui/NoContent";
import { SetLang, SetPos } from "@/redux/slices/pagesSlice";

const Index = () => {
  useScrollToTop();
  const params = useParams();

  const paramPath = params['*']; // get the wildcard param string
  let email = '';
  let phone = '';

  if (paramPath) {
    const parts = paramPath.split('/');
    email = parts[3] || '';  // assuming email is at index 3
    phone = parts[4] || '';  // assuming phone is at index 4
  }

  const { pageContent, pos, language } = useAppSelector(state => state.pages);
  const [content, setContetnt] = useState([])
  useEffect(() => {
    setContetnt(pageContent)
  }, [pageContent])
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { i18n } = useTranslation();

  const pathname = location.pathname; // e.g. "/sy/arabic/home"

  const urlSegments = pathname.split('/').filter(Boolean); // ["sy", "arabic", "home"]

  const posUrl = urlSegments[0] || 'sy';
  const languageUrl = urlSegments[1] || 'english'

  const pageUrlName = urlSegments[2] || '/';

  useEffect(() => {
    window.scroll(0, 0)

    // Update store with pos and lang
    dispatch(SetPos(pos));
    dispatch(SetLang(language));
    dispatch(getStaticComponentsService())

    // Fetch page content
    dispatch(
      getPageContentService({
        lang: languageUrl,
        pageUrlName: pageUrlName === '/' ? 'home' : pageUrlName,
        pos: posUrl,
      })
    ).then((action) => {
      if (getPageContentService.fulfilled.match(action)) {
        let data = action.payload;

        setContetnt(data)
      }
    })
  }, [location.pathname]);

  const renderComponent = (component: any, segment: any) => {
    const type = component.type
    let title = segment.name
    let description = segment.description
    const data = JSON.parse(component.content);

    switch (type) {
      case 'Hero Section':
        return <HeroSection data={data} title={('contact')} backgroundImage="https://cdn.builder.io/api/v1/image/assets/0088fdfbc5f845fe86a1c89db6aed806/55086c81d55d09b9d1f3ca0c19e4e6d0595d3251?placeholderIfAbsent=true" type={type} />
      case 'About Section':
        return <About data={data} title={title} description={description} type={type} />;
      case 'Values Section':
        return <Values data={data} type={type} />;
      case 'Industries Section':
        return <Industries data={data} title={title} description={description} type={type} />;
      case 'Milestones Section':
        return <Milestones data={data} title={title} description={description} type={type} />;
      case 'Partner Form':
        return <PartnerBanner data={data} type={type} />;
      case 'Reach Us Section':
      case 'Reach Us Section with cta':
        return <ReachUsSection title={title} description={description} data={data} type={type} />;
      case 'Assistance Section':
        return <AssistanceSection data={data} type={type} />;
      case 'Main Carousel':
        return <Hero data={data} type={type} />;
      default:
        return null;
    }
  };

  const segments = content?.segments
    ?.slice()
    .sort((a, b) => a.position - b.position) || [];



  return (
    <div className="bg-white flex flex-col overflow-hidden items-stretch mt-[83px] max-md:mt-0">
      {segments.length === 0 ? (
        <NoContent messageKey="customPage.noContentMessage" />
      ) : (
        <>
          {segments.map((segment, index) => (
            <div key={index}>
              {segment.components?.map((component: any, compIndex: number) => {
                // Special handling for Values Section
                if (component.type === 'Values Section') {
                  return (
                    <div key={compIndex}>
                      {renderComponent(component, segment)}
                    </div>
                  );
                }

                // Normal wrapped components
                return (
                  <Layout key={`layout-${index}-${compIndex}`}>
                    <Container>
                      <div>
                        {renderComponent(component, segment)}
                      </div>
                    </Container>
                  </Layout>
                );
              })}

              {/* Inject PartnerForm after the first segment if we're on the partner page */}
              {pageUrlName === 'partner' && index === 0 && (
                <Layout>
                  <Container>
                    <PartnerForm phone={phone} email={email} />
                  </Container>
                </Layout>
              )}
            </div>
          ))}


          {/* {pageUrlName === 'partner' &&
            !segments.some(seg =>
              seg?.components?.some((comp: any) => comp.type === 'Partner Form')
            ) && <PartnerForm phone={phone} email={email} />
          } */}
          {/* Add Footer here at the bottom, outside of any Layout */}
          <Footer />
        </>
      )}
    </div>
  );

};

export default Index;
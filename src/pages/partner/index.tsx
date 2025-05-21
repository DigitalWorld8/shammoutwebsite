import AssistanceSection from '@/components/contact/AssistanceSection'
import HeroSection from '@/components/contact/HeroSection'
import Container from '@/components/layout/Container'
import { Footer } from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import Layout from '@/components/layout/Layout'
import PartnerForm from '@/components/partner/PartnerForm'
import useScrollToTop from '@/hooks/useScrollToTop'
import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import partnerwithusImg from "../../assets/images/partner-with-us.png"
import { useAppSelector } from '@/redux/useAppSelector'
import { useAppDispatch } from '@/redux/store'
import { getPageContentService } from '@/redux/services/pagesService'
import { About } from '@/components/home/About'
import { Values } from '@/components/home/Values'
import { Industries } from '@/components/home/Industries'
import { Milestones } from '@/components/home/Milestones'
import { PartnerBanner } from '@/components/home/PartnerBanner'
import ReachUsSection from '@/components/contact/ReachUsSection'
import { Hero } from '@/components/home/Hero'
import { useTranslation } from 'react-i18next'
const PartnerPage = () => {
    useScrollToTop();
    const { phone, email } = useParams();
    const { pageContent } = useAppSelector(state => state.pages);
    const dispatch = useAppDispatch();
    const { i18n } = useTranslation()
    const isEn = i18n.language === 'en'
    let lang = isEn ? 'english' : 'arabic'
    const location = useLocation();
    let pageUrlName = location.pathname.replace(/^\/+/, '');

    useEffect(() => {
        dispatch(getPageContentService({ lang, pageUrlName, pos: 'sy' }));
    }, [lang]);

    const renderComponent = (component: any, segment: any) => {
        const type = component.type;
        let title = segment.name;
        let description = segment.description;
        const data = JSON.parse(component.content);

        switch (type) {
            case 'Hero Section':
                return <HeroSection data={data} title={('contact')} backgroundImage="https://cdn.builder.io/api/v1/image/assets/0088fdfbc5f845fe86a1c89db6aed806/55086c81d55d09b9d1f3ca0c19e4e6d0595d3251?placeholderIfAbsent=true" />;
            case 'About Section':
                return <About data={data} title={title} description={description} />;
            case 'Values Section':
                return <Values data={data} />;
            case 'Industries Section':
                return <Industries data={data} title={title} description={description} />;
            case 'Milestones Section':
                return <Milestones data={data} title={title} description={description} />;
            case 'Partner Form':
                return <PartnerBanner data={data} />;
            case 'Reach Us Section':
                return <ReachUsSection title={title} description={description} data={data} />;
            case 'Assistance Section':
                return <AssistanceSection data={data} />;
            case 'Main Carousel':
                return <Hero data={data} />;
            default:
                return null;
        }
    };

    const segments = pageContent?.segments
        ?.slice() // create a shallow copy to avoid mutating original
        .sort((a, b) => a.position - b.position) // sort by `position` key
        .map((segment, index) => (
            <div key={index}>
                {segment.components?.map((component: any, compIndex: number) => (
                    <div key={compIndex}>
                        {renderComponent(component, segment)}
                    </div>
                ))}
            </div>
        ));

    return (
        <div className="bg-white flex flex-col overflow-hidden items-stretch mt-[83px] max-md:mt-10">
            <Layout>
                <Container>
                    {segments?.[0]}
                    {pageUrlName === 'partner' &&
                        <PartnerForm phone={phone} email={email} />
                    }

                    {segments?.slice(1)}
                </Container>
            </Layout>
        </div>
    );
};

export default PartnerPage;

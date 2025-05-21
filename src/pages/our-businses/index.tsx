import IndustryCard from '@/components/home/IndustryCard';
import Layout from '@/components/layout/Layout'
import { SectionHeader } from '@/components/ui/SectionHeader';
import useScrollToTop from '@/hooks/useScrollToTop';
import React from 'react'

import Container from '@/components/layout/Container';
import { industries } from './our-businses-data';
const OurBusinesses: React.FC = () => {
    useScrollToTop();


    return (
        <Layout>
            <Container>
                <section
                    id="businesses"
                    className="flex w-full max-w-[1178px] flex-col mt-[83px] max-md:mt-10 max-md:max-w-full "
                >



                    <SectionHeader
                        title="Industries We Lead"
                        description="With over seven decades of responsible business practices, we lead diverse sectors, from automotive and aviation to real estate, energy, metals, and food industries, driving innovation, sustainability, and economic progress."
                    />
                </section>

                <section
                    id="businesses"
                    className="grid w-full max-w-[1178px] gap-6  
             grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                >

                    {industries.map((industry, index) => (
                        <IndustryCard
                            key={index}
                            title={industry.title}
                            tagline={industry.tagline}
                            description={industry.description}
                            imageSrc={industry.imageSrc}
                            logoSrc={industry.logoSrc}
                        />
                    ))}
                </section>
            </Container>
        </Layout >
    )
}

export default OurBusinesses
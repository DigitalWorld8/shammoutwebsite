import React from 'react'
import { useIsMobile } from '@/hooks/use-mobile'
import { MainNavigation } from '../navigation/MainNavigation'
import { MobileBottomNav } from '../navigation/MobileBottomNav'
import { useAppSelector } from '@/redux/useAppSelector'

const Header: React.FC = () => {
    const isMobile = useIsMobile();


    const scrollToSection = (id: string) => (e: React.MouseEvent) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementPosition - navbarHeight - 20,
                behavior: 'smooth'
            });
        }
    };

    return (
        <header className="flex w-full max-w-[1184px] flex-col items-stretch max-md:max-w-full mb-2">
            <MainNavigation isMobile={isMobile} />
            {isMobile && <MobileBottomNav />}
        </header>
    )
}

export default Header

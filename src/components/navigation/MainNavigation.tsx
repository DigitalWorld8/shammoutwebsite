import React from "react";
import { Link } from "react-router-dom";
import { DesktopNavigation } from "./DesktopNavigation";
import { useAppSelector } from "@/redux/useAppSelector";


interface MainNavigationProps {
    isMobile: boolean;
}

export const MainNavigation: React.FC<MainNavigationProps> = ({
    isMobile,
}) => {
    const { pos, language, staticComp } = useAppSelector(state => state.pages)
    const pathname = location.pathname; // e.g. "/sy/arabic/home"

    const urlSegments = pathname.split('/').filter(Boolean); // ["sy", "arabic", "home"]

    const languageUrl = urlSegments[1] || 'english'
    const header = staticComp?.filter((c) => c.language === languageUrl)?.find((c) => c.type === 'header')
    let headerLabels: Record<string, string> = {};
    if (header?.content) {
        try {
            headerLabels = JSON.parse(header.content);

        } catch (error) {
            console.error('Failed to parse header content', error);
        }
    }


    return (
        <>
            {!isMobile && (
                <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md w-full flex items-center gap-5 text-[rgba(30,57,94,1)] font-semibold flex-wrap justify-between py-4 px-4 shadow-sm">
                    <div className="max-w-[1184px] w-full mx-auto flex justify-between items-center">
                        <Link to={`/${pos}/${language}/`}>
                            <img
                                src={headerLabels?.logo}
                                alt="Shammout Group Logo"
                                className="aspect-[3.1] object-contain w-[120px] md:w-[167px]"
                            />
                        </Link>

                        <DesktopNavigation header={header} headerLabels={headerLabels} />
                    </div>
                </nav>
            )}
        </>
    );


};

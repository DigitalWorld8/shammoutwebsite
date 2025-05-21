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
    const { pos, language } = useAppSelector(state => state.pages)

    return (
        <>
            {!isMobile && (
                <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md w-full flex items-center gap-5 text-[rgba(30,57,94,1)] font-semibold flex-wrap justify-between py-4 px-4 shadow-sm">
                    <div className="max-w-[1184px] w-full mx-auto flex justify-between items-center">
                        <Link to={`/${pos}/${language}/`}>
                            <img
                                src="https://cdn.builder.io/api/v1/image/assets/0088fdfbc5f845fe86a1c89db6aed806/ef55696ff67ea3de1f900af9552cd47587ba243e"
                                alt="Shammout Group Logo"
                                className="aspect-[3.1] object-contain w-[120px] md:w-[167px]"
                            />
                        </Link>

                        <DesktopNavigation />
                    </div>
                </nav>
            )}
        </>
    );


};

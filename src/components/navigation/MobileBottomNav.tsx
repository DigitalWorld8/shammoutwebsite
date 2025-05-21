import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Building2, Clock, Users2, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useScrollToSection } from "@/hooks/use-scroll-to-section";
import { useAppSelector } from "@/redux/useAppSelector";

interface MobileBottomNavProps { }

export const MobileBottomNav: React.FC<MobileBottomNavProps> = () => {
  const scrollToSection = useScrollToSection();
  const { t } = useTranslation();
  const location = useLocation();
  const { pageContent, language, staticComp } = useAppSelector(state => state.pages);
  const header = staticComp?.filter((c) => c.language === language)?.find((c) => c.type === 'header')

  let headerLabels: Record<string, string> = {};
  if (header?.content) {
    try {
      headerLabels = JSON.parse(header.content);
    } catch (error) {
      console.error('Failed to parse header content', error);
    }
  }
  // const navLinks = [
  //   { to: '/', label: t('home'), id: "home", icon: Home },
  //   { to: '/businesses', label: t('businesses'), id: "businesses", icon: Users2 },
  //   { to: '/partner', label: t('partnerus'), id: "partner", icon: Mail },
  //   { to: '/contact', label: t('contact'), id: "contact", icon: Building2 },
  // ];
  const navLinks = [
    { to: '/', label: headerLabels.home || t('home'), id: "home", icon: Home },
    // { to: '/about', label: headerLabels.about || t('aboutus') },
    { to: '/businesses', label: headerLabels.businesses || t('businesses'), id: "businesses", icon: Users2 },
    { to: '/partner', label: headerLabels.partner || t('partnerus'), id: "partner", icon: Mail },
    { to: '/contact', label: headerLabels.contact || t('contact'), id: "about", icon: Building2 },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-gray-200">
      <div className="flex justify-around items-center py-2">
        {navLinks.map(({ id, to, label, icon: Icon }) => {
          const isActive = location.pathname === to;

          return (
            <Link
              key={id}
              to={to}
              className={`flex flex-col items-center p-2 text-xs font-medium transition-all duration-200
                ${isActive
                  ? "text-[rgba(204,31,65,1)] font-semibold scale-105"
                  : "text-[rgba(30,57,94,1)] hover:text-[rgba(204,31,65,1)]"}
              `}
            >
              <div
                className={`h-10 w-10 flex items-center justify-center rounded-full transition-all duration-300
                  ${isActive ? "bg-[rgba(204,31,65,0.1)]" : ""}
                `}
              >
                {Icon &&

                  <Icon className="h-6 w-6 mb-0.5" />
                }
              </div>
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

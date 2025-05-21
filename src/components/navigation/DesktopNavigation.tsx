import React from "react";
import LanguageDropdown from "../layout/LanguageDropdown";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home, Building2, Users2, Mail } from "lucide-react";
import PhoneIcon from "@/icons/UserIcon";
import { useAppSelector } from "@/redux/useAppSelector";

interface DesktopNavigationProps { }

export const DesktopNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { pageContent, language, pos, staticComp } = useAppSelector(state => state.pages);
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

  // Build navLinks using the parsed header content
  const navLinks = [
    { to: '/', label: headerLabels.home || t('home'), id: "home", icon: Home },
    { to: '/about', label: headerLabels.about || t('aboutus') },
    { to: '/businesses', label: headerLabels.businesses || t('businesses'), id: "businesses", icon: Users2 },
    { to: '/partner', label: headerLabels.partner || t('partnerus'), id: "partner", icon: Mail },
    { to: '/contact', label: headerLabels.contact || t('contact'), id: "about", icon: Building2 },
  ];

  // const navLinks = [
  //   { to: '/', label: t('home'), id: "home", icon: Home },
  //   { to: '/about', label: t('aboutus') },
  //   { to: '/businesses', label: t('businesses'), id: "businesses", icon: Users2 },
  //   { to: '/partner', label: t('partnerus'), id: "partner", icon: Mail },
  //   { to: '/contact', label: t('contact'), id: "about", icon: Building2 },
  // ];

  return (
    <div className="hidden md:flex items-center justify-between flex-1">
      <div className="flex items-center justify-center gap-8 mx-auto">
        {navLinks
          .filter(link => link.id)
          .map(({ id, label, to }) => {
            const isActive = location.pathname === to;

            return (
              <div
                key={id}
                onClick={() => navigate(`/${pos}/${language}${to}`)
                }
                className={`cursor-pointer
                  whitespace-nowrap // Prevent text wrapping
                  text-sm md:text-base // Consistent font size
                  transition-colors 
                  hover:text-[rgba(204,31,65,1)] 
                  ${isActive
                    ? "text-[rgba(204,31,65,1)] font-semibold"
                    : "text-gray-700"
                  }
                  px-2 py-1 // Add some padding
                `}
              >
                {label}
              </div>
            );
          })}
      </div>

      <div className="flex items-center gap-4">
        <PhoneIcon />
        <LanguageDropdown />
      </div>
    </div>
  );
};
import React from "react";
import LanguageDropdown from "../layout/LanguageDropdown";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home, Building2, Users2, Mail, Info } from "lucide-react";
import PhoneIcon from "@/icons/UserIcon";
import { useAppSelector } from "@/redux/useAppSelector";

interface DesktopNavigationProps { }

export const DesktopNavigation: React.FC = ({ header, headerLabels }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { pageContent, language, pos } = useAppSelector(state => state.pages);





  // Build navLinks using the parsed header content
  const navLinks = [
    { to: '/', label: headerLabels.home, id: "home", icon: Home },
    { to: '/about', label: headerLabels.about, id: "about", icon: Info },
    { to: '/businesses', label: headerLabels.businesses, id: "businesses", icon: Users2 },
    { to: '/partner', label: headerLabels.partner, id: "partner", icon: Mail },
    { to: '/contact', label: headerLabels.contact, id: "about", icon: Building2 },
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
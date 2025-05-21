import React from "react";
import { Bell, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useScrollToSection } from "@/hooks/use-scroll-to-section";

interface MobileNavigationProps { }

export const MobileNavigation: React.FC<MobileNavigationProps> = () => {
  const scrollToSection = useScrollToSection();

  return (
    <div className="flex items-center gap-4">
      <Bell className="h-6 w-6 text-[rgba(30,57,94,1)]" />
      <Sheet>
        <SheetTrigger asChild>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Menu className="h-6 w-6" />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[85vw] sm:w-[35vw] pt-12">
          <nav className="flex flex-col gap-4">
            {[
              { href: "#about", text: "About us" },
              { href: "#businesses", text: "Our Businesses" },
              { href: "#history", text: "Our History" },
              { href: "#partner", text: "Partner With Us" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={scrollToSection(link.href.substring(1))}
                className="text-lg px-4 py-3 hover:bg-gray-100 rounded-xl transition-colors flex items-center"
              >
                {link.text}
              </a>
            ))}
            <div className="mt-4 flex items-center gap-2">
              <button className="bg-[rgba(204,31,65,1)] text-white px-4 py-3 rounded-xl w-full">
                Language
              </button>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

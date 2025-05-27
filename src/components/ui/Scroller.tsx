import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./scroll-area";
import { Separator } from "./separator";
import { useAppSelector } from "@/redux/useAppSelector";

interface ScrollerProps {
    sections: {
        id: string;
        label: string;
    }[];
}

export const Scroller: React.FC<ScrollerProps> = ({ sections }) => {
    const { language } = useAppSelector((state) => state.pages);
    const isEn = language === "english";

    const [activeSection, setActiveSection] = useState<string | null>(null);

    // Dragging state
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartY, setDragStartY] = useState<number | null>(null);
    const [dragCurrentTop, setDragCurrentTop] = useState<number | null>(null);

    const scrollAreaRef = useRef<HTMLDivElement>(null);

    // Scroll page to section
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const navbarHeight = document.querySelector("nav")?.offsetHeight || 0;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;

            window.scrollTo({
                top: elementPosition - navbarHeight - 20,
                behavior: "smooth",
            });
        }
    };

    // IntersectionObserver to update active section on scroll
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-100px 0px -60% 0px",
            threshold: 0,
        };

        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, observerOptions);

        sections.forEach((section) => {
            const element = document.getElementById(section.id);
            if (element) observer.observe(element);
        });

        return () => {
            observer.disconnect();
        };
    }, [sections]);

    // Drag handlers for vertical indicator
    const handleDragStart = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
        setDragStartY(e.clientY);
    };

    const handleDragMove = (e: MouseEvent) => {
        if (!isDragging || dragStartY === null || !scrollAreaRef.current) return;
        e.preventDefault();

        const deltaY = e.clientY - dragStartY;
        const sectionHeight = 48; // height per section button including spacing
        const maxTop = (sections.length - 1) * sectionHeight;

        // Calculate new top based on drag start + delta, clamp within bounds
        let newTop = (sections.findIndex((s) => s.id === activeSection) * sectionHeight) + deltaY;
        if (newTop < 0) newTop = 0;
        if (newTop > maxTop) newTop = maxTop;

        setDragCurrentTop(newTop);
    };

    const handleDragEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);

        if (dragCurrentTop !== null) {
            const sectionHeight = 48;
            const sectionIndex = Math.round(dragCurrentTop / sectionHeight);
            const section = sections[sectionIndex];
            if (section) {
                scrollToSection(section.id);
            }
        }

        setDragCurrentTop(null);
        setDragStartY(null);
    };

    // Add/remove global listeners during dragging
    useEffect(() => {
        if (isDragging) {
            window.addEventListener("mousemove", handleDragMove);
            window.addEventListener("mouseup", handleDragEnd);
        } else {
            window.removeEventListener("mousemove", handleDragMove);
            window.removeEventListener("mouseup", handleDragEnd);
        }

        return () => {
            window.removeEventListener("mousemove", handleDragMove);
            window.removeEventListener("mouseup", handleDragEnd);
        };
    }, [isDragging, dragStartY, dragCurrentTop]);
    const sectionTopMap: Record<string, number> = {
        about: 0,
        businesses: 48,
        partner: 135,
        history: 92, // ← hardcoded special position
    };
    // Determine vertical bar top position
    const sectionHeight = 48;
    const topPosition =
        isDragging && dragCurrentTop !== null
            ? dragCurrentTop
            : activeSection && sectionTopMap[activeSection] !== undefined
                ? sectionTopMap[activeSection]
                : 0;


    return (
        <div className={`fixed ${isEn ? "right" : "left"}-6 top-1/2 transform -translate-y-1/2 z-40 mx-4`}>
            <div className="bg-[#F3F3F3]/80 backdrop-blur-sm rounded-2xl p-4 shadow-md">
                <ScrollArea ref={scrollAreaRef} className="h-[200px] w-[140px] relative">
                    <div className="flex flex-col items-start space-y-0 relative">
                        {/* Background indicator line */}
                        <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-gray-200 rounded-full"></div>

                        {/* Draggable active section indicator */}
                        <div
                            onMouseDown={handleDragStart}
                            className={cn(
                                "absolute right-0 w-1.5 bg-primary rounded-full z-10 cursor-grab",
                                isDragging && "cursor-grabbing"
                            )}
                            style={{
                                height: "42px",
                                top: topPosition,
                                transition: isDragging ? "none" : "top 0.3s ease",
                            }}
                        />

                        {/* Section buttons */}
                        <div className="w-full space-y-0">
                            {sections.map((section, index) => (
                                <React.Fragment key={section.id}>
                                    <button
                                        onClick={() => scrollToSection(section.id)}
                                        className={cn(
                                            `flex items-center justify-${isEn ?"start":"end"} px-4 py-3 w-full relative transition-colors `,
                                            "text-sm font-medium hover:text-primary",
                                            activeSection === section.id
                                                ? "text-[rgba(30,57,94,1)]"
                                                : "text-[rgba(30,57,94,0.6)]"
                                        )}
                                    >
                                        {section.label}
                                    </button>
                                    {index < sections.length - 1 && <Separator className="bg-gray-300 h-[1px] w-full" />}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
};

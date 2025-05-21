
import { useCallback } from 'react';

export const useScrollToSection = () => {
    return useCallback((id: string) => (e: React.MouseEvent) => {
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
    }, []);
};

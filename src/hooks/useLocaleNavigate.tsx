import { useAppSelector } from '@/redux/useAppSelector';
import { useNavigate } from 'react-router-dom';

const useLocaleNavigate = () => {
  const navigate = useNavigate();
  const { pos, language } = useAppSelector((state) => state.pages);

  return (to: string, options?: { replace?: boolean; state?: any }) => {
    // Ensure leading slash and no double slashes
    const cleanedTo = to.startsWith('/') ? to.slice(1) : to;
    const fullPath = `/${pos}/${language}/${cleanedTo}`;

    navigate(fullPath, options);
  };
};

export default useLocaleNavigate;

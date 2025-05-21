import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertTriangle } from 'lucide-react';
import { Footer } from '../layout/Footer';
import Header from '../layout/Header';
import { Link, useNavigate } from 'react-router-dom';  // <-- React Router navigation hook
import { useAppSelector } from '@/redux/useAppSelector';

const NoContent: React.FC<{ messageKey?: string }> = ({ messageKey = 'noContent.message' }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pos, language } = useAppSelector(state => state.pages)

  return (
    <>
      <Header />
      <main className="h-[40.2vh] flex items-center justify-center px-4 py-16">
        <section className="w-full bg-[#f9f9fb] max-w-3xl border border-gray-300 bg-white rounded-xl flex flex-col items-center gap-6 px-6 py-10 text-center">
          <div className="w-16 h-16 bg-yellow-200 text-yellow-700 flex items-center justify-center rounded-full">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">{t('noContent.title')}</h1>
          <p className="text-lg text-gray-600 max-w-md">{t('noContent.message')}</p>
          <Link to={`/${pos}/${language}/`}>
            <button
              className="bg-[rgba(204,31,65,1)] text-white px-4 py-2 rounded-md"
              aria-label={t('noContent.goHome', 'Go to Home Page')}
            >
              {t('noContent.goHome')}
            </button>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default NoContent;

import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '@/redux/store'
import { SetLang, SetPos } from '@/redux/slices/pagesSlice'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector } from '@/redux/useAppSelector'

const LanguageDropdown = () => {
  const { pageContent, pos, language } = useAppSelector(state => state.pages);

  const { i18n, t, } = useTranslation()
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState(false)


  const toggleDropdown = () => setIsOpen(!isOpen)
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname;
  const urlSegments = pathname.split('/').filter(Boolean);
  const posUrl = urlSegments[0] || 'sy';
  const languageUrl = urlSegments[1] || 'english'
  const isEn = languageUrl === 'english'


  const pageUrlName = urlSegments[2] || '';

  const changeLanguage = (lng: string) => {
    let language = lng === "en" ? "english" : "arabic"
    i18n.changeLanguage(lng)
    dispatch(SetLang(language))
    navigate(`/${pos}/${language}/${pageUrlName}`);
    setIsOpen(false)
  }

  useEffect(() => {
    // Sync i18n language
    // Update store with pos and lang
    dispatch(SetPos(posUrl));
    dispatch(SetLang(languageUrl));

    // Fetch page content

  }, [languageUrl, posUrl]);

  return (
    <div className="relative">
      <div
        onClick={toggleDropdown}
        className="bg-white border flex items-center gap-[13px] px-3 py-[5px] rounded-[9px] border-[rgba(30,57,94,1)] border-solid cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <span>{isEn ? 'English' : 'العربية'}</span>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/0088fdfbc5f845fe86a1c89db6aed806/d636051e158ac143c4242c3776b0fe0da20682c7?placeholderIfAbsent=true"
          alt="Language dropdown"
          className="aspect-[1.86] object-contain w-[13px] shrink-0 mt-1.5"
        />
      </div>

      {isOpen && (
        <div className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded-md shadow-md z-50 w-full">
          <div
            onClick={() => changeLanguage('en')}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            English
          </div>
          <div
            onClick={() => changeLanguage('ar')}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            العربية
          </div>
        </div>
      )}
    </div>
  )
}

export default LanguageDropdown
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate, useParams, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ContactPage from "./pages/contact";
import PartnerPage from "./pages/partner";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Provider, useDispatch, useSelector } from "react-redux";
import { AppDispatch, persistor, RootState, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { LoadingScreen } from "./components/ui/LoadingScreen";
import { getSubPathService } from "./redux/services/pagesService";
import OurBusinesses from "./pages/our-businses";
import { useAppSelector } from "./redux/useAppSelector";
import { SetLang } from "./redux/slices/pagesSlice";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language === "en" ? "english" : "arabic"
  const navigate = useNavigate();

  const { pos, language } = useAppSelector(state => state.pages)
  const { isLoading } = useSelector((state: RootState) => state.pages);
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  const pathname = location.pathname; // e.g. "/sy/arabic/home"
  const urlSegments = pathname.split('/').filter(Boolean); // ["sy", "arabic", "home"]

  const posUrl = urlSegments[0] || 'sy';
  const languageUrl = urlSegments[1] || 'english'

  useEffect(() => {
    // Set HTML lang and dir attributes
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'arabic' ? 'rtl' : 'ltr';
  }, [language]);

  useEffect(() => {
    // Sync URL language with Redux state
    if (languageUrl !== language) {

      dispatch(SetLang(languageUrl)); // <-- replace with your actual action

    }

    i18n.changeLanguage(languageUrl === "english" ? 'en' : 'ar')
  }, [languageUrl, language, dispatch]);

  const hasRedirectedRef = useRef(false); // persist between renders

  useEffect(() => {
    if (location.pathname === "/" && !hasRedirectedRef.current) {
      hasRedirectedRef.current = true; // prevent future redirects
      navigate("/sy/english/", { replace: true });
    }
  }, [location, navigate]);



  return (
    <Routes>
      <Route path={`${pos}/${language}/`} element={<Index />} />
      {/* <Route path={`${pos}/${language}/`} element={<Index />} /> */}
      {/* <Route path="/contact" element={<ContactPage />} />
      <Route path="/partner" element={<PartnerPage />} />
      <Route path="/businesses" element={<OurBusinesses />} /> */}
      <Route path="*" element={<Index />} />
      {/* <Route path="/partner/:email/:phone" element={<PartnerPage />} /> */}
    </Routes>
  );
};

const AppContent = () => {


  return (
    <BrowserRouter >
      <AppRoutes />
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AppContent />
          </TooltipProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

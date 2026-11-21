import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { SiteDataProvider } from './context/SiteDataContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { SpecialtyServicePage } from './pages/SpecialtyServicePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { GalleryPage } from './pages/GalleryPage';
import { EstimatePage } from './pages/EstimatePage';
import { ContactPage } from './pages/ContactPage';
import {
  DisclaimerPage,
  DynamicCmsPage,
  FaqPage,
  PrivacyPolicyPage,
  TermsConditionsPage,
} from './pages/FaqAndLegalPages';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [mapsQuotaExceeded, setMapsQuotaExceeded] = useState(false);

  useEffect(() => {
    const handler = () => setMapsQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handler);
    return () => window.removeEventListener('gmp-quota-exceeded', handler);
  }, []);

  return (
    <ErrorBoundary>
      <SiteDataProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-[#FAFAF8] text-[#0B0B0C]">
            {mapsQuotaExceeded && (
              <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
                <span>
                  Google Maps Platform quota reached. If you are the app owner, visit{' '}
                  <a
                    href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-semibold text-amber-950 hover:text-amber-800"
                  >
                    maps developer site
                  </a>{' '}
                  for instructions to update your account.
                </span>
              </div>
            )}

            <Header />

            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage quotaExceeded={mapsQuotaExceeded} />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route
                  path="/residential-construction"
                  element={<SpecialtyServicePage pageKey="residential" />}
                />
                <Route
                  path="/commercial-construction"
                  element={<SpecialtyServicePage pageKey="commercial" />}
                />
                <Route
                  path="/architecture-design"
                  element={<SpecialtyServicePage pageKey="architecture" />}
                />
                <Route
                  path="/interior-design"
                  element={<SpecialtyServicePage pageKey="interior" />}
                />
                <Route
                  path="/exterior-design"
                  element={<SpecialtyServicePage pageKey="exterior" />}
                />
                <Route
                  path="/kitchen-remodeling"
                  element={<SpecialtyServicePage pageKey="kitchen" />}
                />
                <Route
                  path="/bathroom-remodeling"
                  element={<SpecialtyServicePage pageKey="bathroom" />}
                />
                <Route
                  path="/roofing-exterior"
                  element={<SpecialtyServicePage pageKey="roofingExterior" />}
                />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/projects/:slug" element={<ProjectDetailPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/estimate" element={<EstimatePage />} />
                <Route
                  path="/contact"
                  element={<ContactPage quotaExceeded={mapsQuotaExceeded} />}
                />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms-conditions" element={<TermsConditionsPage />} />
                <Route path="/disclaimer" element={<DisclaimerPage />} />
                <Route path="/pages/:slug" element={<DynamicCmsPage />} />
                <Route path="/admin" element={<AdminDashboardPage />} />
                <Route path="*" element={<HomePage quotaExceeded={mapsQuotaExceeded} />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </BrowserRouter>
      </SiteDataProvider>
    </ErrorBoundary>
  );
}

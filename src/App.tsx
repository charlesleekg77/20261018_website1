import { AnimatePresence, motion } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';

import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';
import GrainOverlay from './components/GrainOverlay';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import ContactPage from './pages/ContactPage';
import LandingPage from './pages/LandingPage';
import ManifestoPage from './pages/ManifestoPage';
import NotFoundPage from './pages/NotFoundPage';
import ServicesPage from './pages/ServicesPage';
import WorksPage from './pages/WorksPage';

export default function App() {
  const location = useLocation();

  return (
    <div className="relative flex min-h-screen flex-col bg-charcoal">
      <a
        href="#main"
        className="label-type sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border focus:border-acid focus:bg-ink focus:px-4 focus:py-3 focus:text-acid"
      >
        Skip to content
      </a>

      <Navbar />
      <GrainOverlay />
      <CustomCursor />
      <ScrollToTop />

      <main id="main" className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <Routes location={location}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/manifesto" element={<ManifestoPage />} />
              <Route path="/works" element={<WorksPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

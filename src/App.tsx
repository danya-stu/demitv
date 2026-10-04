import { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Cta } from './components/Cta';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';

const Screenshots = lazy(() => import('./components/Screenshots').then(m => ({ default: m.Screenshots })));
const SelectionBox = lazy(() => import('./components/SelectionBox').then(m => ({ default: m.SelectionBox })));
const ClickRipple = lazy(() => import('./components/ClickRipple').then(m => ({ default: m.ClickRipple })));
const LegalModal = lazy(() => import('./components/LegalModal').then(m => ({ default: m.LegalModal })));
const ContactsModal = lazy(() => import('./components/ContactsModal').then(m => ({ default: m.ContactsModal })));


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLocked, setIsLocked] = useState(true);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [isContactsOpen, setIsContactsOpen] = useState(false);

  useEffect(() => {
    // Симуляция загрузки для стильного прелоадера
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLocked) {
      // Когда разблокируем, плавно скроллим к Features после рендера DOM
      setTimeout(() => {
        const el = document.getElementById('features');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, [isLocked]);

  useEffect(() => {
    // Защита от "дурака" (Отключение F12, Inspect Element и правой кнопки мыши)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F12') e.preventDefault();
      if (e.ctrlKey && e.shiftKey && e.key === 'I') e.preventDefault();
      if (e.ctrlKey && e.shiftKey && e.key === 'J') e.preventDefault();
      if (e.ctrlKey && e.key === 'U') e.preventDefault();
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[100] bg-[#09090B] flex items-center justify-center pointer-events-none"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.5, 1, 0.5],
                boxShadow: ['0 0 0 rgba(0,91,255,0)', '0 0 50px rgba(0,91,255,0.5)', '0 0 0 rgba(0,91,255,0)']
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-24 h-24 rounded-3xl"
            >
              <motion.img 
                layoutId="hero-logo"
                src="/logo.png" 
                alt="Loading Dёmi TV" 
                className="w-full h-full object-cover rounded-3xl" 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`bg-[#09090B] text-white ${isLocked ? 'h-screen overflow-hidden' : 'min-h-screen'}`}>
        <Navbar />
        <Suspense fallback={null}>
          <ClickRipple />
          <SelectionBox />
        </Suspense>
        <Hero isLocked={isLocked} onUnlock={() => setIsLocked(false)} isLoading={isLoading} />
        <Features />
        <Suspense fallback={null}>
          <Screenshots />
        </Suspense>
        <Cta />
        <Footer 
          onOpenLegal={() => setIsLegalOpen(true)} 
          onOpenContacts={() => setIsContactsOpen(true)} 
        />
        <Suspense fallback={null}>
          {isLegalOpen && <LegalModal isOpen={isLegalOpen} onClose={() => setIsLegalOpen(false)} />}
          {isContactsOpen && <ContactsModal isOpen={isContactsOpen} onClose={() => setIsContactsOpen(false)} />}
        </Suspense>
      </div>
    </>
  );
}

export default App;

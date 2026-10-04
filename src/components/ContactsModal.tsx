import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Send, Bug } from 'lucide-react';
import { createPortal } from 'react-dom';

interface ContactsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactsModal: React.FC<ContactsModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-12">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
            onClick={onClose}
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-[#111116]/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rustore/20 flex items-center justify-center border border-rustore/30">
                  <Bug className="w-5 h-5 text-rustore-light" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-white">
                  Связаться с нами
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors group"
              >
                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 space-y-6 text-gray-300">
              <p className="text-gray-400 leading-relaxed">
                Нашли ошибку, есть предложение или хотите задать вопрос? Выберите удобный способ связи с разработчиком Dёmi TV.
              </p>

              <div className="space-y-4">
                <a 
                  href="https://t.me/DemiTVSupport" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 w-full p-4 rounded-2xl bg-[#0088cc]/10 hover:bg-[#0088cc]/20 border border-[#0088cc]/30 hover:border-[#0088cc]/50 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-[#0088cc]/20 flex items-center justify-center shrink-0">
                    <Send className="w-5 h-5 text-[#0088cc] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-bold text-white group-hover:text-[#0088cc] transition-colors">Написать в Telegram</h3>
                    <p className="text-sm text-gray-400">Самый быстрый способ связи</p>
                  </div>
                </a>

                <a 
                  href="mailto:danildemintv@gmail.com?subject=Отзыв о приложении Dёmi TV" 
                  className="flex items-center gap-4 w-full p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all group"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-gray-300 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-bold text-white transition-colors">Написать на Email</h3>
                    <p className="text-sm text-gray-400">danildemintv@gmail.com</p>
                  </div>
                </a>
              </div>
            </div>
            
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

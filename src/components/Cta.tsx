import React, { useState } from 'react';
import { Download, X } from 'lucide-react';
import QRCode from 'react-qr-code';
import { motion, AnimatePresence } from 'framer-motion';

export const Cta: React.FC = () => {
  const [isQrFullscreen, setIsQrFullscreen] = useState(false);

  return (
    <>
      <section className="py-24 relative z-10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-rustore/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-rustore/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gray-900/60 border border-gray-800 backdrop-blur-2xl rounded-[3rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-12"
        >
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-black mb-6 text-white tracking-tight">
              Готовы перейти на <span className="text-rustore-light">новый уровень?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-xl">
              Скачайте Dёmi TV бесплатно и наслаждайтесь любимыми телеканалами в премиальном качестве без лишних сложностей.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <a 
                href="https://www.rustore.ru/catalog/app/com.ultratv.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-rustore hover:bg-rustore-light text-white rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,91,255,0.4)] w-full sm:w-auto"
              >
                <Download className="w-6 h-6" />
                Скачать в RuStore
              </a>
            </div>
          </div>

          <div className="hidden lg:flex flex-col items-center justify-center bg-black/40 p-6 rounded-3xl border border-white/5">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-3 opacity-70">
              Нажмите для увеличения
            </span>
            <div 
              onClick={() => setIsQrFullscreen(true)}
              className="w-36 h-36 bg-white rounded-xl flex items-center justify-center p-3 relative group overflow-hidden cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all hover:shadow-[0_0_40px_rgba(0,91,255,0.3)] mb-4"
            >
               <QRCode 
                 value="https://www.rustore.ru/catalog/app/com.ultratv.app" 
                 size={120} 
                 className="transition-transform duration-500 group-hover:scale-105" 
               />
            </div>
            <span className="text-sm text-gray-400 font-medium text-center">
              Наведите камеру<br/>для скачивания
            </span>
          </div>
        </motion.div>
      </div>
    </section>

    <AnimatePresence>
      {isQrFullscreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsQrFullscreen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-6 cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white p-6 md:p-10 rounded-3xl flex flex-col items-center shadow-2xl"
          >
            <button 
              onClick={() => setIsQrFullscreen(false)}
              className="absolute -top-4 -right-4 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center hover:bg-rustore transition-colors border-2 border-white shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>
            <QRCode 
              value="https://www.rustore.ru/catalog/app/com.ultratv.app" 
              size={320} 
            />
            <p className="mt-6 text-gray-900 font-bold text-xl text-center">
              Отсканируйте код<br/><span className="text-gray-500 text-base font-medium">чтобы скачать Dёmi TV</span>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

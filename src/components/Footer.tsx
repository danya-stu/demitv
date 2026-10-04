import React from 'react';

interface FooterProps {
  onOpenLegal: () => void;
  onOpenContacts: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal, onOpenContacts }) => {
  return (
    <footer className="bg-[#050505] border-t border-gray-900 py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-3">
          <img 
            src="/logo.png" 
            alt="Dёmi TV Logo" 
            className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-rustore/20 grayscale hover:grayscale-0 transition-all opacity-50 hover:opacity-100 cursor-pointer"
          />
          <span className="text-xl font-bold text-white tracking-tight">Dёmi</span>
        </div>

        <div className="flex items-center gap-3 text-sm font-medium">
          <button 
            onClick={onOpenLegal} 
            className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all text-gray-300 hover:text-white"
          >
            Правовые документы
          </button>
          <button 
            onClick={onOpenContacts} 
            className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all text-gray-300 hover:text-white"
          >
            Контакты
          </button>
        </div>

        <div className="text-sm text-gray-500">
          © 2026 Dёmi TV. Все права защищены.
        </div>
      </div>
    </footer>
  );
};

import React, { useRef, useState } from 'react';
import { Zap, MonitorPlay, Smartphone, Tv } from 'lucide-react';
import { motion } from 'framer-motion';

const GlowCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div 
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-[2rem] bg-gray-900/40 border border-gray-800/80 backdrop-blur-xl transition-all group hover:-translate-y-1 ${className}`}
    >
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 hidden md:block"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0,91,255,0.08), transparent 40%)`,
        }}
      />
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 rounded-[2rem] hidden md:block"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(0,91,255,0.5), transparent 40%)`,
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '1px',
        }}
      />
      <div className="relative z-10 p-8 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

const features = [
  {
    icon: <Zap className="w-8 h-8 text-rustore-light" />,
    title: 'Молниеносно',
    description: 'Мгновенное переключение каналов и быстрая загрузка программы передач. Никаких задержек — только плавность.',
    className: 'md:col-span-2 lg:col-span-2'
  },
  {
    icon: <MonitorPlay className="w-8 h-8 text-rustore-light" />,
    title: 'Современный дизайн',
    description: 'Тёмная тема, стекло и плавные анимации.',
    className: 'md:col-span-1 lg:col-span-1'
  },
  {
    icon: <Tv className="w-8 h-8 text-rustore-light" />,
    title: 'Поддержка Android TV',
    description: 'Полная совместимость с телевизорами и ТВ-приставками. Смотрите на большом экране без лишних проводов.',
    className: 'md:col-span-1 lg:col-span-1'
  },
  {
    icon: <Smartphone className="w-8 h-8 text-rustore-light" />,
    title: 'Умная Адаптивность',
    description: 'Идеально работает на смартфонах, планшетах любого размера, а также на телевизорах. Интерфейс сам подстраивается под экран вашего устройства.',
    className: 'md:col-span-2 lg:col-span-2'
  }
];

export const Features: React.FC = () => {
  return (
    <section className="py-24 bg-[#09090B] relative z-10" id="features">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-md">Почему выбирают нас?</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Мы создали приложение, которым хочется пользоваться каждый день. Без компромиссов.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={feat.className}
            >
              <GlowCard>
                <div className="w-16 h-16 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center mb-6 group-hover:bg-rustore/10 group-hover:border-rustore/30 transition-all duration-300 shadow-lg">
                  {feat.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-white">{feat.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base flex-grow">{feat.description}</p>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCards, EffectCoverflow } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Tv } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-coverflow';

export const Screenshots: React.FC = () => {
  const [platform, setPlatform] = useState<'mobile' | 'tv'>('mobile');
  const [activeIndex, setActiveIndex] = useState(0);

  const screenshots = [
    '/screenshots/1.jpg',
    '/screenshots/2.jpg',
    '/screenshots/3.jpg',
    '/screenshots/4.jpg',
    '/screenshots/5.jpg'
  ];

  const screenshotsTv = [
    '/screenshots/tv1.jpg',
    '/screenshots/tv2.jpg',
    '/screenshots/tv3.jpg',
    '/screenshots/tv4.jpg',
    '/screenshots/tv5.jpg'
  ];

  const featuresList = [
    'Умный поиск каналов',
    'Программа передач (EPG)',
    'Удобный встроенный плеер',
    'Фильтрация и категории',
    'Выбор качества видео'
  ];

  return (
    <section className="py-24 overflow-hidden relative" id="showcase">
      <div className="absolute inset-0 bg-rustore/5 skew-y-3 origin-top-left -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1 w-full"
        >
          {/* Toggle Switcher */}
          <div className="flex bg-gray-900/50 p-1.5 rounded-2xl border border-white/10 w-fit mb-8 relative">
             {/* Animated active background */}
             <motion.div 
               layoutId="platform-indicator"
               className="absolute inset-y-1.5 w-[140px] bg-rustore rounded-xl z-0"
               initial={false}
               animate={{ x: platform === 'mobile' ? 0 : 140 }}
               transition={{ type: "spring", stiffness: 300, damping: 30 }}
             />
             
             <button 
               onClick={() => { setPlatform('mobile'); setActiveIndex(0); }}
               className={`relative z-10 flex items-center justify-center gap-2 w-[140px] py-2.5 rounded-xl font-bold transition-colors ${platform === 'mobile' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
             >
               <Smartphone className="w-5 h-5" />
               Смартфон
             </button>
             <button 
               onClick={() => { setPlatform('tv'); setActiveIndex(0); }}
               className={`relative z-10 flex items-center justify-center gap-2 w-[140px] py-2.5 rounded-xl font-bold transition-colors ${platform === 'tv' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
             >
               <Tv className="w-5 h-5" />
               Телевизор
             </button>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <AnimatePresence mode="wait">
              <motion.span
                key={platform}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="block"
              >
                {platform === 'mobile' ? 'Продуман до мелочей' : 'Идеально для больших экранов'}
              </motion.span>
            </AnimatePresence>
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-lg">
            Удобный каталог телеканалов, вкладки для быстрого доступа и интуитивно понятный плеер. Мы убрали всё лишнее, оставив только самое важное.
          </p>
          <ul className="space-y-4 mt-8">
            {featuresList.map((item, i) => {
              const isActive = activeIndex % featuresList.length === i;
              return (
                <li key={i} className="flex items-center gap-4 transition-all duration-300">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-rustore/20 text-rustore scale-110 shadow-[0_0_15px_rgba(0,91,255,0.4)]' : 'bg-white/5 text-gray-500'}`}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className={`font-medium transition-all duration-300 ${isActive ? 'text-white text-lg' : 'text-gray-500'}`}>{item}</span>
                </li>
              );
            })}
          </ul>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative flex-1 w-full flex justify-center items-center"
        >
          {/* Ambient Glow behind the device */}
          <div className="absolute inset-0 bg-rustore/30 blur-[80px] rounded-full mix-blend-screen animate-pulse pointer-events-none" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={platform}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className={`relative z-10 w-full ${platform === 'mobile' ? 'max-w-[300px] md:max-w-[350px]' : 'max-w-full md:max-w-[600px]'}`}
            >
              {platform === 'mobile' ? (
                <Swiper
                  effect={'cards'}
                  grabCursor={true}
                  modules={[EffectCards, Autoplay]}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                  className="w-full aspect-[9/19] rounded-[2.5rem]"
                >
                  {screenshots.map((src, index) => (
                    <SwiperSlide key={index} className="rounded-[2.5rem] bg-[#11192E] border-8 border-black overflow-hidden relative shadow-2xl flex items-center justify-center transform-gpu will-change-transform">
                      <img src={src} alt={`Скриншот ${index + 1}`} className="w-full h-full object-cover" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <Swiper
                  effect={'coverflow'}
                  grabCursor={true}
                  centeredSlides={true}
                  slidesPerView={1}
                  coverflowEffect={{
                    rotate: 10,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                  }}
                  modules={[EffectCoverflow, Autoplay]}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                  className="w-full aspect-video rounded-3xl shadow-2xl"
                >
                  {screenshotsTv.map((src, index) => (
                    <SwiperSlide key={index} className="rounded-2xl bg-gray-900 border-[6px] md:border-8 border-black overflow-hidden relative flex items-center justify-center transform-gpu will-change-transform">
                       {/* TV Placeholder content behind the image if it doesn't load */}
                       <div className="absolute inset-0 bg-gray-800 flex flex-col items-center justify-center text-gray-500 z-[-1]">
                          <Tv className="w-12 h-12 mb-3 opacity-50"/>
                          <span className="font-bold tracking-wide">TV Скриншот {index + 1}</span>
                          <span className="text-xs opacity-60 mt-1">/screenshots/tv{index + 1}.jpg</span>
                       </div>
                       <img 
                          src={src} 
                          alt={`TV Скриншот ${index + 1}`} 
                          className="w-full h-full object-cover relative z-10" 
                          onError={(e) => { e.currentTarget.style.opacity = '0'; }} 
                       />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

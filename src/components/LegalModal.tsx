import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, ShieldAlert, Copyright, ScrollText } from 'lucide-react';
import { createPortal } from 'react-dom';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TABS = [
  { id: 'privacy', title: 'Политика конфиденциальности', icon: FileText },
  { id: 'disclaimer', title: 'Отказ от ответственности', icon: ShieldAlert },
  { id: 'dmca', title: 'Для правообладателей (DMCA)', icon: Copyright },
  { id: 'eula', title: 'Лицензионное соглашение', icon: ScrollText },
];

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('privacy');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setActiveTab('privacy'); // Reset to first tab on open
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const renderContent = () => {
    switch (activeTab) {
      case 'privacy':
        return (
          <div className="space-y-6">
            <p className="text-lg text-gray-200">
              Редакция от 01.08.2026 г. | Версия 1.0
            </p>
            <p>
              Настоящая Политика конфиденциальности описывает, как приложение Dёmi собирает, использует и защищает информацию.
            </p>
            
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-rustore-light">1. СБОР И ИСПОЛЬЗОВАНИЕ ДАННЫХ</h3>
              <p>
                Приложение Dёmi собирает минимально возможное количество данных, абсолютно необходимых исключительно для технической работоспособности приложения. Мы НЕ собираем, НЕ храним и НЕ передаем третьим лицам никакие персональные данные пользователей (такие как имена, адреса, email, номера телефонов, геолокация и т.д.).
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-bold text-rustore-light">2. ИСПОЛЬЗОВАНИЕ МИКРОФОНА</h3>
              <p>
                Доступ к микрофону запрашивается исключительно для локальной функции голосового поиска каналов. Аудиопоток захватывается только во время физического удержания кнопки пользователем и обрабатывается системными сервисами Android для перевода речи в текст. Приложение не осуществляет фоновую прослушку и не сохраняет аудиозаписи.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-bold text-rustore-light">3. ИСПОЛЬЗОВАНИЕ СЕТИ ИНТЕРНЕТ</h3>
              <p>
                Приложению требуется доступ к сети Интернет для загрузки списков каналов (в формате M3U/M3U8), загрузки расписания телепередач (EPG XMLTV) и потокового воспроизведения мультимедийных данных.
              </p>
            </section>
            
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-rustore-light">4. ИСПОЛЬЗОВАНИЕ ПАМЯТИ</h3>
              <p>
                Доступ к локальному хранилищу используется исключительно для кэширования телепрограммы (EPG) и сохранения локальных M3U-плейлистов, загруженных самим пользователем.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-bold text-rustore-light">5. СТОРОННИЕ СЕРВИСЫ</h3>
              <p>
                Приложение может использовать встроенные сервисы аналитики ОС Android для сбора обезличенных отчетов о сбоях, которые помогают улучшить стабильность приложения. Приложение не содержит сторонних трекеров слежения или скрытых аналитических модулей.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-bold text-rustore-light">6. ИЗМЕНЕНИЯ В ПОЛИТИКЕ</h3>
              <p>
                Разработчик оставляет за собой право вносить изменения в настоящую Политику. В случае существенных изменений пользователи будут проинформированы через интерфейс приложения.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-bold text-rustore-light">7. ВОЗРАСТНЫЕ ОГРАНИЧЕНИЯ (ПОЛИТИКА В ОТНОШЕНИИ ДЕТЕЙ)</h3>
              <p>
                Приложение не предназначено для использования детьми младше 18 лет без присмотра взрослых, так как функционал плеера позволяет пользователям загружать немодерируемые сторонние списки воспроизведения (плейлисты), которые могут содержать контент для взрослых. Приложение по умолчанию не содержит никакого взрослого или неприемлемого контента.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-bold text-rustore-light">8. РЕКЛАМНЫЕ СЕТИ И РЕКЛАМНЫЙ ИДЕНТИФИКАТОР (AAID)</h3>
              <p>
                Приложение интегрировано с официальными рекламными сетями (включая Yandex Mobile Ads SDK). Рекламные сервисы могут собирать и использовать обезличенный рекламный идентификатор устройства (Google Advertising ID / AAID) исключительно для подбора и показа релевантных рекламных объявлений. Приложение не передает никакие персональные данные рекламным сетям.
              </p>
            </section>
          </div>
        );
      case 'disclaimer':
        return (
          <div className="space-y-6">
            <p className="text-lg text-gray-200">
              Редакция от 01.08.2026 г. | Версия 1.0
            </p>
            <p>
              ВНИМАНИЕ: Пожалуйста, внимательно прочитайте данный отказ от ответственности перед использованием приложения Dёmi.
            </p>
            
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-rustore-light">1. СТАТУС ПРИЛОЖЕНИЯ</h3>
              <p>
                Приложение Dёmi является ИСКЛЮЧИТЕЛЬНО программным медиаплеером (инструментом) для воспроизведения потокового видео и аудио. Само приложение НЕ СОДЕРЖИТ, НЕ ХРАНИТ, НЕ ТРАНСЛИРУЕТ и НЕ РАСПРОСТРАНЯЕТ какой-либо медиаконтент, видео, фильмы, телеканалы или радиостанции.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-bold text-rustore-light">2. ОТВЕТСТВЕННОСТЬ ЗА КОНТЕНТ</h3>
              <p>
                Разработчик приложения не несет никакой ответственности за контент, который пользователи воспроизводят с помощью данного приложения. Все плейлисты (файлы форматов .m3u, .m3u8), ссылки на видеопотоки и EPG (расписание передач) добавляются пользователями самостоятельно или подгружаются из открытых общедоступных источников в сети Интернет.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-bold text-rustore-light">3. НАРУШЕНИЕ АВТОРСКИХ ПРАВ И ТОВАРНЫЕ ЗНАКИ</h3>
              <p>
                Разработчик приложения не имеет отношения к серверам, на которых размещаются видеопотоки. Все логотипы телеканалов, бренды, названия передач и товарные знаки, подгружаемые через плейлисты или EPG, принадлежат их законным правообладателям. Приложение Dёmi не заявляет о правах на указанные знаки и использует их исключительно в информационных целях.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-bold text-rustore-light">4. ИСПОЛЬЗОВАНИЕ ПОЛЬЗОВАТЕЛЕМ И AUP</h3>
              <p>
                Пользователь несет полную личную и юридическую ответственность за легальность использования любых ссылок и плейлистов в приложении в соответствии с законодательством своей страны. Категорически запрещается использовать приложение для распространения вредоносного ПО или совершения киберпреступлений.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-bold text-rustore-light">5. ОГРАНИЧЕНИЕ ФИНАНСОВОЙ ОТВЕТСТВЕННОСТИ</h3>
              <p>
                Приложение предоставляется "как есть" (as is). Максимальная совокупная финансовая ответственность Разработчика перед Пользователем или третьими лицами по любым искам, убыткам или претензиям ограничена суммой в 0 (ноль) рублей.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-bold text-rustore-light">6. ОБЯЗАТЕЛЬНЫЙ ДОСУДЕБНЫЙ ПОРЯДОК</h3>
              <p>
                Все споры и претензии подлежат обязательному досудебному урегулированию. Перед обращением в судебные инстанции или платформы дистрибуции Заявитель обязан направить письменную претензию на почту demitvpravo@gmail.com и выждать 30 рабочих дней для ответа.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-bold text-rustore-light">7. ПРАВО НА ПРЕКРАЩЕНИЕ И ИЗМЕНЕНИЕ</h3>
              <p>
                Разработчик оставляет за собой право в любой момент, без предварительного уведомления и выплаты компенсаций, изменить функционал приложения, ограничить доступ к плееру или полностью прекратить его поддержку.
              </p>
            </section>
          </div>
        );
      case 'dmca':
        return (
          <div className="space-y-6">
            <p className="text-lg text-gray-200">
              Редакция от 01.08.2026 г. | Версия 1.0
            </p>
            <p>
              Приложение Dёmi является исключительно техническим инструментом (плеером) для воспроизведения потоковых ссылок. Мы с глубоким уважением относимся к авторским и смежным правам.
            </p>
            
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-rustore-light">1. СТАТУС ПРИЛОЖЕНИЯ</h3>
              <p>
                Разработчик приложения не контролирует, не загружает, не хранит и не транслирует медиаконтент. Приложение лишь предоставляет удобный интерфейс для воспроизведения общедоступных ссылок (IPTV плейлистов) в интернете. 
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-bold text-rustore-light">2. ПРОЦЕДУРА БЛОКИРОВКИ (УДАЛЕНИЯ) КОНТЕНТА И ДОСУДЕБНЫЙ ПОРЯДОК</h3>
              <p>
                Если вы являетесь законным правообладателем аудио- или видеоматериалов, и вы обнаружили, что в приложении воспроизводится ваш контент без разрешения, мы готовы оперативно заблокировать доступ к указанным ссылкам/каналам внутри нашего приложения.
              </p>
              <p>
                Пожалуйста, соблюдайте обязательный досудебный порядок и свяжитесь напрямую с разработчиком по электронной почте:
              </p>
              <div className="bg-white/5 p-4 rounded-xl border border-rustore/30">
                <p className="font-mono text-rustore-light">demitvpravo@gmail.com</p>
              </div>
              <p className="text-sm text-gray-400">
                ВНИМАНИЕ: Указанный адрес является единственным официальным каналом связи по юридическим вопросам и защите авторских прав. Жалобы, претензии и уведомления (DMCA Takedown Notices), отправленные на общие адреса технической поддержки пользователей, не рассматриваются и не имеют юридической силы для начала отсчета срока реагирования.
              </p>
              <p>
                В вашем письме укажите:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-400">
                <li>Название контента (канала, радиостанции).</li>
                <li>Ссылку на источник, который нарушает права.</li>
                <li>Документальное подтверждение ваших прав на данный контент.</li>
              </ul>
              <p>
                Мы гарантируем рассмотрение вашей заявки в течение 30 дней и техническое ограничение доступа к указанному контенту для пользователей приложения Dёmi.
              </p>
            </section>
          </div>
        );
      case 'eula':
        return (
          <div className="space-y-6">
            <p className="text-lg text-gray-200">
              Редакция от 01.08.2026 г. | Версия 1.0
            </p>
            <p>
              Настоящее соглашение является юридически обязательным договором между вами (Пользователем) и Разработчиком приложения Dёmi. Устанавливая и используя приложение, вы безоговорочно соглашаетесь со следующими условиями:
            </p>
            
            <section className="space-y-3">
              <h3 className="text-xl font-bold text-rustore-light">1. ПРЕДОСТАВЛЕНИЕ ЛИЦЕНЗИИ</h3>
              <p>
                Разработчик предоставляет вам ограниченную, неисключительную, непередаваемую лицензию на использование приложения исключительно в личных, некоммерческих целях.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-bold text-rustore-light">2. ЗАПРЕТ НА РЕВЕРС-ИНЖИНИРИНГ</h3>
              <p>
                Пользователю категорически запрещается декомпилировать, дизассемблировать, проводить реверс-инжиниринг, извлекать исходный код, модифицировать или создавать производные продукты на основе данного приложения. Любая попытка взлома или копирования дизайна будет преследоваться по закону о защите интеллектуальной собственности.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-bold text-rustore-light">3. ОГРАЖДЕНИЕ ОТ ОТВЕТСТВЕННОСТИ (INDEMNIFICATION) И ЛИМИТ ОТВЕТСТВЕННОСТИ</h3>
              <p>
                Пользователь соглашается защищать, освобождать от ответственности и возмещать Разработчику любые убытки, штрафы, судебные издержки и расходы на адвокатов, возникшие в результате любых исков или претензий третьих лиц (включая правообладателей), связанных с нарушением Пользователем настоящего соглашения или использованием приложения для доступа к пиратскому контенту. Финансовая ответственность Разработчика ограничена 0 (нулем) рублей.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-bold text-rustore-light">4. ДЕЛИМОСТЬ СОГЛАШЕНИЯ (SEVERABILITY)</h3>
              <p>
                Если какое-либо положение настоящего Соглашения, Политики конфиденциальности или Отказа от ответственности будет признано судом компетентной юрисдикции недействительным или не имеющим законной силы, такое положение будет исключено, а остальные положения останутся в полной юридической силе и продолжат свое действие без изменений.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-bold text-rustore-light">5. ДОСУДЕБНЫЙ ПОРЯДОК И ИЗМЕНЕНИЯ</h3>
              <p>
                Все споры подлежат досудебному урегулированию через почту demitvpravo@gmail.com с выжиданием 30 дней. Разработчик вправе прекратить или изменить сервис в любой момент без уведомления.
              </p>
            </section>

            <section className="space-y-3">
              <h3 className="text-xl font-bold text-rustore-light">6. ИСПОЛЬЗУЕМЫЕ СТОРОННИЕ БИБЛИОТЕКИ (OPEN SOURCE LICENSES)</h3>
              <p>
                Приложение Dёmi использует программные компоненты с открытым исходным кодом, распространяемые по лицензиям Apache License 2.0 и MIT:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-400">
                <li>AndroidX & Material Components (Apache 2.0)</li>
                <li>ExoPlayer / Media3 (Apache 2.0)</li>
                <li>OkHttp (Apache 2.0)</li>
                <li>Gson (Apache 2.0)</li>
                <li>Kotlin Coroutines (Apache 2.0)</li>
              </ul>
              <p className="text-sm text-gray-400">
                Все права на данные компоненты принадлежат их законным правообладателям.
              </p>
            </section>
          </div>
        );
      default:
        return null;
    }
  };

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
            initial={{ y: '100%', opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: '100%', opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-5xl h-[90vh] bg-[#111116]/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row overflow-hidden"
          >
            {/* Sidebar for navigation */}
            <div className="md:w-72 bg-white/5 border-b md:border-b-0 md:border-r border-white/10 p-4 md:p-6 flex flex-col gap-2 overflow-x-auto md:overflow-y-auto">
              <div className="flex items-center justify-between md:mb-6 shrink-0 hidden md:flex">
                <h2 className="text-xl font-bold tracking-tight text-white">
                  Документы
                </h2>
              </div>
              
              <div className="flex md:flex-col gap-2 shrink-0 custom-scrollbar pb-2 md:pb-0">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap md:whitespace-normal text-left shrink-0 md:shrink border ${
                        isActive 
                          ? 'bg-rustore/20 border-rustore/50 text-white shadow-[0_0_20px_rgba(0,91,255,0.2)]' 
                          : 'bg-transparent border-transparent text-gray-400 hover:bg-white/5 hover:text-gray-200'
                      }`}
                    >
                      <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-rustore-light' : ''}`} />
                      <span className="text-sm font-medium leading-tight">{tab.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col relative overflow-hidden">
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-black/20 backdrop-blur-md border border-white/10 hover:bg-white/10 text-gray-400 hover:text-white transition-colors group"
                >
                  <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 md:p-8 text-gray-300 custom-scrollbar relative">
                {/* Header title for current tab (mobile mostly) */}
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-6 pr-12">
                  {TABS.find(t => t.id === activeTab)?.title}
                </h2>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {renderContent()}
                  </motion.div>
                </AnimatePresence>
                
                <div className="h-12" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#111116] to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

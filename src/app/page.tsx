"use client";

import { useState } from "react";
import { CalendarHeart, Star, MapPin, ShieldCheck, Sparkles, MessageCircle, Phone, Menu, X } from "lucide-react";

const InstagramIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

function BeforeAfterSlider({ num }: { num: number }) {
  const [position, setPosition] = useState(50);
  return (
    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden group border border-[var(--color-epil-primary)] bg-[var(--color-epil-primary)]/30">
      {/* Fallback Background Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-[var(--color-epil-accent-dark)] text-center p-4 z-0">
        <span className="font-heading text-xl md:text-2xl mb-2">Слайдер {num}</span>
        <span className="text-xs opacity-70 leading-relaxed">Збережіть фото в папці public як:<br/><strong className="text-[var(--color-epil-text)]">before-{num}.jpg</strong><br/><strong className="text-[var(--color-epil-text)]">after-{num}.jpg</strong></span>
      </div>

      {/* After Image */}
      <img src={`/after-${num}.jpg`} alt="Після" className="absolute inset-0 w-full h-full object-cover z-10" onError={(e) => { e.currentTarget.style.display = 'none' }} draggable={false} />
      
      {/* Before Image with dynamic clip-path */}
      <img 
        src={`/before-${num}.jpg`} 
        alt="До" 
        className="absolute inset-0 w-full h-full object-cover z-20 pointer-events-none" 
        style={{ clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)` }}
        onError={(e) => { e.currentTarget.style.display = 'none' }}
        draggable={false}
      />

      {/* Slider Line & Handle */}
      <div 
        className="absolute top-0 bottom-0 w-[2px] bg-white pointer-events-none z-30 shadow-[0_0_10px_rgba(0,0,0,0.3)]"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-[var(--color-epil-accent-dark)]">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80"><path d="m15 18-6-6 6-6"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 rotate-180"><path d="m15 18-6-6 6-6"/></svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/40 text-white text-[10px] uppercase tracking-widest px-3 py-1.5 rounded backdrop-blur-md pointer-events-none z-30">До</div>
      <div className="absolute top-4 right-4 bg-black/40 text-white text-[10px] uppercase tracking-widest px-3 py-1.5 rounded backdrop-blur-md pointer-events-none z-30">Після</div>

      {/* Invisible Range Input spanning the whole image */}
      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-40 touch-pan-y"
      />
    </div>
  );
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{role: 'ai'|'user', text: string}[]>([
    {role: 'ai', text: 'Вітаю! Я віртуальний асистент студії Savanna. Оберіть запитання зі списку нижче 👇'}
  ]);

  const botQuestions = [
    { q: 'Які ціни?', a: 'Обличчя — 750 грн/год, Тіло — 700 грн/год. Міні-сеанс до 30 хв — 500 грн.' },
    { q: 'Як підготуватися?', a: 'Відростіть волосся до 3-5 мм. За день до процедури зробіть легкий скраб та зволожте шкіру.' },
    { q: 'Чи це боляче?', a: 'Терпимо. Можна використовувати крем для місцевої анестезії.' },
    { q: 'Скільки триває курс?', a: 'Для повного видалення назавжди потрібен курс від 1.5 до 2 років регулярних процедур.' },
    { q: 'Як часто ходити?', a: 'Спочатку раз на 3-4 тижні, потім інтервали збільшуються до кількох місяців.' },
    { q: 'Чи є протипоказання?', a: 'Так: вагітність, кардіостимулятор, онкологія, запалення на шкірі, епілепсія.' },
    { q: 'Коли випаде волосся?', a: 'Воно не випадає потім! Я видаляю кожну волосину одразу під час процедури.' },
    { q: 'Чи можна голитися між сеансами?', a: 'Ні, вищипувати чи голитися заборонено, можна лише підстригати ножицями.' },
    { q: 'Чи залишаються шрами?', a: 'Ні! При правильній роботі шкіра стає ідеально гладкою без жодних слідів.' },
    { q: 'Яка різниця з лазером?', a: 'Лазер лише присипляє волосся на час, а електроепіляція видаляє його НАЗАВЖДИ (навіть сиве).' }
  ];

  const zoneDetails: Record<string, { desc: string; img: string }> = {
    'Обличчя': { desc: 'Обличчя (вусики, підборіддя, брови) — найчастіший запит. Електроепіляція єдиний метод, який назавжди видаляє гормональне та світле пушкове волосся без ризику його стимуляції (парадоксального гіпертрихозу), на відміну від лазера.', img: '/about.jpg' },
    'Пахви': { desc: 'Найпопулярніша зона для старту. Шкіра тут відновлюється дуже швидко. Позбудьтеся щоденного гоління, подразнень від дезодоранту та запаху поту назавжди.', img: '/about.jpg' },
    'Живіт': { desc: 'Видалення "доріжки" на животі або пушкового волосся. Робота виконується надзвичайно делікатно, не залишаючи жодних слідів на ніжній шкірі.', img: '/about.jpg' },
    'Бікіні': { desc: 'Абсолютна гігієна та впевненість. Забудьте про страшний біль від шугарингу та жахливе вростання. Електроепіляція класичного або глибокого бікіні подарує ідеальну гладкість на все життя.', img: '/about.jpg' },
    'Ноги': { desc: 'Масштабна зона, яка потребує терпіння, але результат того вартий — ви назавжди забудете про колючки на другий день після гоління та червоні цятки від врослого волосся.', img: '/about.jpg' }
  };

  return (
    <main className="flex flex-col min-h-screen relative">
      {/* Header */}
      <header className="w-full bg-white/70 backdrop-blur-md sticky top-0 z-50 border-b border-[var(--color-epil-primary)]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#home" className="font-heading text-2xl md:text-3xl tracking-widest uppercase text-[var(--color-epil-text)] font-semibold hover:opacity-80 transition-opacity cursor-pointer">
            Savanna
          </a>
          <nav className="hidden md:flex gap-6 lg:gap-8 text-[11px] lg:text-sm tracking-widest text-[var(--color-epil-text)] opacity-80 uppercase font-medium">
            <a href="#home" className="hover:text-[var(--color-epil-accent-dark)] transition-colors">Головна</a>
            <a href="#about" className="hover:text-[var(--color-epil-accent-dark)] transition-colors">Про процедуру</a>
            <a href="/method" className="text-[var(--color-epil-accent-dark)] font-bold hover:opacity-80 transition-opacity flex items-center gap-1">Про метод</a>
            <a href="#pricing" className="hover:text-[var(--color-epil-accent-dark)] transition-colors">Прайс</a>
            <a href="#portfolio" className="hover:text-[var(--color-epil-accent-dark)] transition-colors">Відгуки та результати</a>
          </nav>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="hidden md:block bg-[var(--color-epil-accent)] hover:bg-[var(--color-epil-accent-dark)] text-white px-6 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all shadow-sm"
          >
            Записатися
          </button>
          <button 
            className="md:hidden text-[var(--color-epil-text)] hover:text-[var(--color-epil-accent-dark)] transition-colors p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-[var(--color-epil-bg)]/95 backdrop-blur-md border-b border-[var(--color-epil-primary)] shadow-2xl z-40 flex flex-col items-center py-10 gap-8">
            <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="text-xl tracking-widest text-[var(--color-epil-text)] uppercase font-medium">Головна</a>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-xl tracking-widest text-[var(--color-epil-text)] uppercase font-medium">Про процедуру</a>
            <a href="/method" className="text-xl tracking-widest text-[var(--color-epil-accent-dark)] uppercase font-bold flex items-center gap-2"><Sparkles size={20}/> Про метод</a>
            <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="text-xl tracking-widest text-[var(--color-epil-text)] uppercase font-medium">Прайс</a>
            <a href="#portfolio" onClick={() => setIsMobileMenuOpen(false)} className="text-xl tracking-widest text-[var(--color-epil-text)] uppercase font-medium text-center">Відгуки<br/>та результати</a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-32 px-6 flex flex-col md:flex-row items-center justify-center min-h-[90vh] relative overflow-hidden">

        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center mt-10 md:mt-0">
          <div className="flex flex-col items-center mb-10">
            <span className="flex items-center gap-2 text-[var(--color-epil-accent-dark)] uppercase tracking-[0.2em] text-xs md:text-sm font-semibold bg-white/60 px-5 py-2 rounded-full backdrop-blur-md shadow-sm mb-3">
              <MapPin size={16} />
              Epil Room Poltava
            </span>
            <span className="text-[var(--color-epil-text)] opacity-70 uppercase tracking-[0.3em] text-[10px] md:text-xs font-medium">
              Студія електроепіляції
            </span>
          </div>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-[var(--color-epil-text)] leading-[1.1] mb-8">
            Гладка шкіра <br className="hidden md:block" /> назавжди
          </h1>
          <p className="text-[var(--color-epil-text)] opacity-80 mb-10 max-w-xl text-base md:text-lg font-light leading-relaxed">
            Привіт, я Тома — ваш майстер з досвідом 5+ років 🥇. Допоможу безпечно та комфортно позбутися будь-якого небажаного волосся назавжди.
          </p>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[var(--color-epil-accent)] hover:bg-[var(--color-epil-accent-dark)] text-white px-8 py-4 rounded-full text-base md:text-lg font-medium tracking-wide transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 mb-6 flex items-center gap-3"
          >
            <CalendarHeart size={22} />
            Отримати консультацію
          </button>

          {/* Social Proof (Trust Badge) */}
          <div className="flex items-center justify-center gap-3 text-sm text-[var(--color-epil-text)] opacity-90 bg-white/40 px-5 py-2.5 rounded-full backdrop-blur-sm shadow-sm flex-wrap">
            <div className="flex text-yellow-500">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
            </div>
            <span className="font-medium">5.0 на Google Maps</span>
            <span className="opacity-40 hidden sm:inline">|</span>
            <span className="hidden sm:inline">Понад 500 щасливих клієнтів</span>
          </div>
        </div>
      </section>

      {/* About Procedure Section (Editorial Style) */}
      <section id="about" className="py-24 md:py-32 px-6 bg-white/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-8">
            <h2 className="font-heading text-4xl md:text-6xl text-[var(--color-epil-text)] leading-tight">
              Чому саме <br/> електроепіляція?
            </h2>
            <div className="w-20 h-1 bg-[var(--color-epil-accent)] rounded-full"></div>
            <p className="text-lg text-[var(--color-epil-text)] opacity-80 leading-relaxed font-light">
              На відміну від лазера, електроепіляція впливає безпосередньо на корінь кожної волосини мікрострумом. Це <strong className="font-semibold text-[var(--color-epil-accent-dark)]">єдиний метод у світі</strong>, який гарантує 100% видалення волосся назавжди, незалежно від його кольору чи типу вашої шкіри.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              <div className="bg-[var(--color-epil-primary)]/50 p-6 rounded-3xl border border-[var(--color-epil-primary)] hover:border-[var(--color-epil-accent)] transition-colors">
                <ShieldCheck className="text-[var(--color-epil-accent-dark)] mb-4" size={32} />
                <h3 className="font-heading text-2xl mb-2 text-[var(--color-epil-text)]">Абсолютна Стерильність</h3>
                <p className="text-sm opacity-70">Багаторівнева дезінфекція (сухожар) за медичними стандартами. Використовую лише індивідуальні стерильні зонди. Безпека — понад усе.</p>
              </div>
              <div className="bg-[var(--color-epil-primary)]/50 p-6 rounded-3xl border border-[var(--color-epil-primary)] hover:border-[var(--color-epil-accent)] transition-colors">
                <Sparkles className="text-[var(--color-epil-accent-dark)] mb-4" size={32} />
                <h3 className="font-heading text-2xl mb-2 text-[var(--color-epil-text)]">Без Кірочок та Болю</h3>
                <p className="text-sm opacity-70">Працюю м'яко, швидко та виключно на результат. Шкіра відновлюється швидко, залишаючись ідеально гладкою назавжди.</p>
              </div>
            </div>
          </div>
          
          {/* Image */}
          <div className="flex-1 relative">
            <div className="aspect-[4/5] bg-[var(--color-epil-primary)] rounded-[2rem] overflow-hidden relative shadow-xl">
              <img src="/about.jpg" alt="Естетика Savanna" className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-out" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[var(--color-epil-accent)]/20 rounded-full blur-2xl -z-10"></div>
          </div>
        </div>
      </section>

      {/* Zones Section */}
      <section id="zones" className="py-24 px-6 bg-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl text-[var(--color-epil-text)] mb-4">Зони Епіляції</h2>
            <div className="w-16 h-1 bg-[var(--color-epil-accent)] rounded-full mx-auto mb-6"></div>
            <p className="text-[var(--color-epil-text)] opacity-70 font-light max-w-2xl mx-auto">
              Видалення волосся назавжди можливе на будь-якій ділянці тіла. Від найделікатніших зон до великих площ.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {[
              'Обличчя', 'Пахви', 'Живіт', 'Бікіні', 'Ноги'
            ].map((zone, i) => (
              <div 
                key={i} 
                onClick={() => setActiveZone(zone)}
                className="group cursor-pointer aspect-[4/3] sm:aspect-square bg-white/60 backdrop-blur-sm rounded-2xl border border-[var(--color-epil-primary)]/60 flex items-center justify-center p-6 text-center transition-all duration-700 hover:bg-white/80 hover:border-[var(--color-epil-accent)] hover:shadow-xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-epil-accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <h3 className="font-heading text-lg sm:text-xl md:text-2xl text-[var(--color-epil-text)] tracking-[0.15em] uppercase relative z-10 group-hover:scale-110 transition-transform duration-700">
                  {zone}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 md:py-32 px-6 bg-white/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl text-[var(--color-epil-text)] mb-4">Прайс-лист</h2>
            <div className="w-16 h-1 bg-[var(--color-epil-accent)] rounded-full mx-auto mb-6"></div>
            <p className="text-[var(--color-epil-text)] opacity-70 font-light max-w-2xl mx-auto">
              Прозоре ціноутворення. Оплата здійснюється за час роботи майстра.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Hourly Rate */}
            <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 shadow-sm border border-[var(--color-epil-primary)] hover:border-[var(--color-epil-accent)] transition-colors group">
              <h3 className="font-heading text-2xl text-[var(--color-epil-text)] mb-6 flex items-center gap-3">
                <CalendarHeart className="text-[var(--color-epil-accent)] group-hover:scale-110 transition-transform" size={24} />
                За годину роботи
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-[var(--color-epil-primary)] pb-4">
                  <span className="text-[var(--color-epil-text)] font-medium tracking-wide">Обличчя</span>
                  <span className="text-[var(--color-epil-accent-dark)] font-semibold text-lg">750 ₴</span>
                </div>
                <div className="flex justify-between items-center border-b border-[var(--color-epil-primary)] pb-4">
                  <span className="text-[var(--color-epil-text)] font-medium tracking-wide">Тіло</span>
                  <span className="text-[var(--color-epil-accent-dark)] font-semibold text-lg">700 ₴</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="text-[var(--color-epil-text)] font-medium tracking-wide">Пушкове волосся</span>
                  <span className="text-[var(--color-epil-accent-dark)] font-semibold text-lg">750 ₴</span>
                </div>
              </div>
            </div>

            {/* Fixed Rate */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-md border border-[var(--color-epil-accent)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-[var(--color-epil-accent)] text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-widest shadow-sm">
                Популярно
              </div>
              <h3 className="font-heading text-2xl text-[var(--color-epil-text)] mb-6 flex items-center gap-3">
                <Sparkles className="text-[var(--color-epil-accent)] group-hover:scale-110 transition-transform" size={24} />
                Фіксована оплата
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-[var(--color-epil-primary)] pb-4">
                  <div className="flex flex-col">
                    <span className="text-[var(--color-epil-text)] font-medium tracking-wide">Сеанс до 30 хв</span>
                    <span className="text-xs opacity-60 mt-1">Вартість вказана з урахуванням голки</span>
                  </div>
                  <span className="text-[var(--color-epil-accent-dark)] font-semibold text-xl">500 ₴</span>
                </div>
              </div>
            </div>
          </div>
            
          {/* Notice */}
          <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 text-center border border-[var(--color-epil-primary)]/50 mt-8">
            <p className="text-sm text-[var(--color-epil-text)] opacity-80 leading-relaxed max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2">
              <ShieldCheck className="text-[var(--color-epil-accent-dark)]" size={20} />
              <span>
                Одноразова голка (зонд) оплачується окремо — <strong className="font-semibold text-[var(--color-epil-accent-dark)]">100 ₴</strong>
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Real Reviews Carousel Section */}
      <section id="portfolio" className="py-24 px-6 bg-transparent overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl text-[var(--color-epil-text)] mb-4">Відгуки клієнтів</h2>
            <div className="w-16 h-1 bg-[var(--color-epil-accent)] rounded-full mx-auto mb-6"></div>
            <p className="text-[var(--color-epil-text)] opacity-70 font-light max-w-2xl mx-auto">
              Найкращий доказ мого професіоналізму — це ваші слова подяки та ідеально гладка шкіра.
            </p>
          </div>
          
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 -mx-6 px-6 scroll-smooth custom-scrollbar">
            {[
              { text: "Все настільки швидко і легко пройшло, ні почервоніння, ні болю (як було з пахвами), ні кірочок! Дякую вам, ви фея!", name: "Інна", zone: "Обличчя" },
              { text: "Доброго вечора! Дякую, все просто чудово. Припухлості майже немає. Біль зовсім трішки. Шкіра навіть не червона. Буду планувати до вас наступного разу!", name: "Таня", zone: "Пахви" },
              { text: "Дякую за вашу легку руку! Дуже боялася робити бікіні, але це виявилося абсолютно терпимо. Шкіра ідеальна.", name: "Олена", zone: "Бікіні" },
              { text: "Після трьох сеансів волосся майже не залишилося. Я в захваті від результату і від вашої стерильності. Дякую!", name: "Катерина", zone: "Ноги" },
              { text: "Це найкраще рішення в моєму житті. Ніякого вростання волосся, як після шугарингу. Шкіра гладка і ніжна.", name: "Анна", zone: "Пахви" },
            ].map((review, i) => (
              <div key={i} className="min-w-[85vw] sm:min-w-[400px] snap-center bg-white/70 backdrop-blur-md p-8 rounded-[2rem] border border-[var(--color-epil-primary)] shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between">
                <div>
                  <Star className="text-[var(--color-epil-accent-dark)] mb-4" size={24} />
                  <p className="text-sm md:text-base italic opacity-80 mb-6 leading-relaxed">"{review.text}"</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-epil-primary)] flex items-center justify-center text-[var(--color-epil-accent-dark)] font-heading text-xl">
                    {review.name[0]}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-[var(--color-epil-text)]">{review.name}</span>
                    <span className="text-xs opacity-50 uppercase tracking-widest">{review.zone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-white/40 backdrop-blur-md">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl text-[var(--color-epil-text)] mb-4">Часті Запитання</h2>
            <div className="w-16 h-1 bg-[var(--color-epil-accent)] rounded-full mx-auto mb-6"></div>
          </div>
          
          <div className="space-y-4">
            {[
              { q: "Чи це боляче?", a: "Електроепіляція — це чутливий процес, але завдяки сучасному обладнанню та правильній техніці він є абсолютно терпимим. За необхідності можна використовувати місцеву анестезію у вигляді крему." },
              { q: "Яка довжина волосся потрібна?", a: "Оптимальна довжина волосся для процедури — від 3 до 5 мм. Цього достатньо, щоб майстер міг захопити волосину пінцетом після обробки фолікула золотим зондом." },
              { q: "Скільки сеансів потрібно?", a: "Для повного видалення волосся НАЗАВЖДИ потрібен курс тривалістю від 1.5 до 2 років регулярних процедур. Це пов'язано з тим, що волосся росте циклами, і ми можемо впливати лише на те волосся, яке зараз знаходиться в активній фазі росту." },
              { q: "Чи залишаються кірочки чи сліди?", a: "При правильній роботі кірочок практично немає, лише легке почервоніння, яке сходить за кілька годин. Я гарантую безпеку та правильний підбір параметрів апарату." }
            ].map((faq, i) => (
              <div key={i} className="border border-[var(--color-epil-primary)] rounded-2xl overflow-hidden bg-white/80 shadow-sm">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full text-left px-6 py-5 font-medium text-[var(--color-epil-text)] flex justify-between items-center hover:bg-[var(--color-epil-primary)]/20 transition-colors"
                >
                  {faq.q}
                  <span className="text-[var(--color-epil-accent-dark)] text-xl">{activeFaq === i ? '−' : '+'}</span>
                </button>
                {activeFaq === i && (
                  <div className="px-6 pb-5 pt-2 text-sm opacity-80 leading-relaxed border-t border-[var(--color-epil-primary)]/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center bg-white/70 backdrop-blur-md p-8 rounded-3xl border border-[var(--color-epil-primary)] shadow-sm">
            <h4 className="font-heading text-2xl mb-2">Маєте більш серйозне запитання?</h4>
            <p className="text-sm opacity-70 mb-6">Кожен випадок унікальний. Я з радістю проконсультую вас індивідуально.</p>
            <button onClick={() => setIsModalOpen(true)} className="bg-[var(--color-epil-text)] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-black transition-colors">
              Зв'язатися з майстром
            </button>
          </div>
        </div>
      </section>

      {/* Before / After Gallery */}
      <section className="py-24 px-6 bg-white/20 backdrop-blur-sm">
         <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
               <h2 className="font-heading text-4xl md:text-5xl text-[var(--color-epil-text)] mb-4">До та Після</h2>
               <div className="w-16 h-1 bg-[var(--color-epil-accent)] rounded-full mx-auto mb-6"></div>
               <p className="text-[var(--color-epil-text)] opacity-70 font-light max-w-2xl mx-auto">
                  Тягніть повзунок вліво та вправо, щоб побачити магію електроепіляції.
               </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
               {[1, 2].map((num) => (
                 <BeforeAfterSlider key={num} num={num} />
               ))}
            </div>
         </div>
      </section>

      {/* Instagram Aesthetic Moodboard */}
      <section id="insta" className="py-24 px-6 bg-transparent text-center relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-pink-100/30 to-transparent rounded-full blur-3xl -z-10"></div>
         <div className="max-w-6xl mx-auto">
            <h2 className="font-heading text-4xl md:text-5xl text-[var(--color-epil-text)] mb-4">Життя студії в Instagram</h2>
            <div className="w-16 h-1 bg-[var(--color-epil-accent)] rounded-full mx-auto mb-12"></div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-12 px-2 md:px-0">
               {[1, 2, 3, 4].map((num) => (
                  <a key={num} href="https://www.instagram.com/epil.room.poltava?igsh=ZHdhMXZ3bGk3eTZ4" target="_blank" rel="noreferrer" className="aspect-square bg-white/40 backdrop-blur-sm rounded-[1.5rem] overflow-hidden relative group block shadow-sm border border-[var(--color-epil-primary)]/50">
                     <div className="absolute inset-0 flex flex-col items-center justify-center text-[var(--color-epil-accent-dark)] p-4 z-0">
                        <InstagramIcon className="opacity-30 mb-2" size={24} />
                        <span className="text-[10px] md:text-xs opacity-50">Збережіть фото як<br/>insta-{num}.jpg</span>
                     </div>
                     <img src={`/insta-${num}.jpg`} alt="Естетика студії" className="absolute inset-0 w-full h-full object-cover z-10 group-hover:scale-110 transition-transform duration-700" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                     <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-epil-text)]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col justify-end p-5">
                        <div className="flex items-center gap-2 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                           <InstagramIcon size={18} />
                           <span className="text-sm font-medium tracking-wide">Дивитись</span>
                        </div>
                     </div>
                  </a>
               ))}
            </div>

            <a href="https://www.instagram.com/epil.room.poltava?igsh=ZHdhMXZ3bGk3eTZ4" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-md text-[var(--color-epil-text)] px-8 py-4 rounded-full text-sm font-medium tracking-wide border border-pink-100 shadow-sm transition-all group hover:scale-105">
               <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-pink-600 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
               </div>
               Підписатися на @epil.room.poltava
            </a>
         </div>
      </section>

      {/* Contacts & Map Section */}
      <section className="py-24 px-6 bg-white/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 w-full aspect-video md:aspect-square bg-white/40 backdrop-blur-md rounded-[2rem] overflow-hidden shadow-sm border border-[var(--color-epil-primary)] relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2586.6669966114175!2d34.520448111956194!3d49.58434775586616!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d825f448c90b6b%3A0xc622db66a1a8c9e5!2z0LLRg9C70LjRhtGPINCh0L7QsdC-0YDQvdC-0YHRgtGWLCA2Niwg0J_QvtC70YLQsNCy0LAsINCf0L7Qu9GC0LDQstGB0YzQutCwINC-0LHQu9Cw0YHRgtGMLCAzNjAwMA!5e0!3m2!1suk!2sua!4v1713890000000!5m2!1suk!2sua" 
              width="100%" 
              height="100%" 
              style={{border:0}} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            ></iframe>
          </div>
          <div className="flex-1 space-y-8">
            <h2 className="font-heading text-4xl md:text-5xl text-[var(--color-epil-text)]">Чекаю на вас</h2>
            <div className="w-16 h-1 bg-[var(--color-epil-accent)] rounded-full"></div>
            
            <div className="space-y-6 pt-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/60 border border-[var(--color-epil-primary)] flex items-center justify-center flex-shrink-0 text-[var(--color-epil-accent-dark)]">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-[var(--color-epil-text)] mb-1">Адреса студії</h4>
                  <p className="text-[var(--color-epil-text)] opacity-70">вул. Соборності, 66<br/>м. Полтава</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white/60 border border-[var(--color-epil-primary)] flex items-center justify-center flex-shrink-0 text-[var(--color-epil-accent-dark)]">
                  <CalendarHeart size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-[var(--color-epil-text)] mb-1">Графік роботи</h4>
                  <p className="text-[var(--color-epil-text)] opacity-70">За попереднім записом.<br/>Підберемо найзручніший для вас час.</p>
                </div>
              </div>
            </div>
            
            <div className="pt-6">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-[var(--color-epil-accent)] hover:bg-[var(--color-epil-accent-dark)] text-white px-8 py-4 rounded-full text-base font-medium tracking-wide transition-all shadow-md w-full sm:w-auto"
              >
                Зв'язатися зі мною
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-transparent py-10 border-t border-[var(--color-epil-primary)] text-center relative z-10">
        <p className="text-sm text-[var(--color-epil-text)] opacity-50 font-medium">
          © {new Date().getFullYear()} Savanna Epil Room Poltava. Всі права захищено.
        </p>
      </footer>

      {/* Floating Action Button (Mobile Only) */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[90%] pointer-events-none">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full pointer-events-auto bg-[var(--color-epil-text)]/90 backdrop-blur-md text-white py-4 rounded-full text-base font-medium tracking-wide shadow-2xl flex justify-center items-center gap-2"
        >
          <CalendarHeart size={20} />
          Записатися на прийом
        </button>
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-[var(--color-epil-text)]/40 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="relative bg-white/90 backdrop-blur-xl w-full max-w-md rounded-[2rem] p-8 shadow-2xl border border-white/50">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-[var(--color-epil-text)] opacity-50 hover:opacity-100 transition-opacity"
            >
              ✕
            </button>
            <h3 className="font-heading text-3xl mb-2 text-center text-[var(--color-epil-text)]">Зв'яжіться з нами</h3>
            <p className="text-center text-sm opacity-70 mb-8 font-light">Оберіть найзручніший спосіб для запису або консультації</p>
            
            <div className="flex flex-col gap-3">
              <a href="https://www.instagram.com/epil.room.poltava?igsh=ZHdhMXZ3bGk3eTZ4" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-colors border border-pink-100 group">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-pink-600 shadow-sm group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </div>
                <span className="font-medium text-[var(--color-epil-text)]">Instagram Direct</span>
              </a>
              
              <a href="https://t.me/toma0787" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-100 group">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-500 shadow-sm group-hover:scale-110 transition-transform">
                  <MessageCircle size={20} />
                </div>
                <span className="font-medium text-[var(--color-epil-text)]">Telegram</span>
              </a>

              <a href="viber://chat?number=%2B380959072684" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-2xl bg-purple-50 hover:bg-purple-100 transition-colors border border-purple-100 group">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-purple-600 shadow-sm group-hover:scale-110 transition-transform">
                  <MessageCircle size={20} />
                </div>
                <span className="font-medium text-[var(--color-epil-text)]">Viber</span>
              </a>

              <a href="tel:+380959072684" className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200 group">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-700 shadow-sm group-hover:scale-110 transition-transform">
                  <Phone size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-[var(--color-epil-text)]">Зателефонувати</span>
                  <span className="text-xs opacity-60">095 907 26 84</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Zone Details Modal */}
      {activeZone && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[var(--color-epil-text)]/40 backdrop-blur-sm" onClick={() => setActiveZone(null)}></div>
          <div className="relative bg-white/90 backdrop-blur-xl w-full max-w-lg rounded-[2rem] overflow-hidden shadow-2xl border border-white/50">
            <button onClick={() => setActiveZone(null)} className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-[var(--color-epil-text)] hover:bg-white transition-colors">✕</button>
            <div className="h-48 bg-[var(--color-epil-primary)] relative">
              <img src={zoneDetails[activeZone]?.img || "/about.jpg"} alt={activeZone} className="w-full h-full object-cover opacity-80 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
            </div>
            <div className="p-8 -mt-10 relative z-10">
              <h3 className="font-heading text-4xl mb-2 text-[var(--color-epil-text)]">{activeZone}</h3>
              <p className="text-sm opacity-70 mb-6 border-b border-[var(--color-epil-primary)] pb-6">{zoneDetails[activeZone]?.desc || `Електроепіляція зони "${activeZone}" — це гарантія ідеально гладкої шкіри назавжди. Безпечно, стерильно, без подразнень.`}</p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3"><ShieldCheck size={18} className="text-[var(--color-epil-accent-dark)]" /><span className="text-sm">Мінімальний дискомфорт</span></div>
                <div className="flex items-center gap-3"><Sparkles size={18} className="text-[var(--color-epil-accent-dark)]" /><span className="text-sm">Перші результати вже після 1 процедури</span></div>
              </div>
              <button onClick={() => { setActiveZone(null); setIsModalOpen(true); }} className="w-full bg-[var(--color-epil-text)] text-white py-4 rounded-full text-sm font-medium hover:bg-black transition-colors">
                Записатися на зону "{activeZone}"
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Assistant Chat Widget */}
      <div className="fixed bottom-6 right-6 z-[70] flex flex-col items-end pointer-events-none">
        {isChatOpen && (
          <div className="w-[300px] sm:w-[350px] bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-[var(--color-epil-primary)] overflow-hidden mb-4 pointer-events-auto flex flex-col transform transition-all duration-300 origin-bottom-right">
            <div className="bg-[var(--color-epil-text)] text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-[var(--color-epil-accent)]" />
                <span className="font-medium">AI-Асистент Savanna</span>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="opacity-70 hover:opacity-100">✕</button>
            </div>
            
            <div className="h-[300px] overflow-y-auto p-4 flex flex-col gap-3 bg-transparent">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'ai' ? 'bg-white/80 backdrop-blur-sm border border-[var(--color-epil-primary)] self-start rounded-tl-sm shadow-sm' : 'bg-[var(--color-epil-accent-dark)] text-white self-end rounded-tr-sm shadow-sm'}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            
            <div className="p-3 bg-white/80 backdrop-blur-sm border-t border-[var(--color-epil-primary)] flex flex-col">
              <span className="text-[10px] text-[var(--color-epil-text)] opacity-60 mb-2 font-medium uppercase tracking-wider block">Оберіть запитання:</span>
              <div className="flex flex-col gap-2 max-h-[160px] overflow-y-auto pr-1 custom-scrollbar">
                {botQuestions.map((item, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setChatMessages([...chatMessages, {role: 'user', text: item.q}, {role: 'ai', text: item.a}])} 
                    className="text-xs text-left bg-white/50 px-3 py-2.5 rounded-xl hover:bg-[var(--color-epil-accent)] hover:text-white transition-colors"
                  >
                    {item.q}
                  </button>
                ))}
                <button onClick={() => { setIsChatOpen(false); setIsModalOpen(true); }} className="text-xs text-center bg-[var(--color-epil-text)] text-white px-3 py-3 rounded-xl hover:bg-black transition-colors font-medium mt-1">Записатися до майстра</button>
              </div>
            </div>
          </div>
        )}
        
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-14 h-14 bg-[var(--color-epil-text)] hover:bg-black text-white rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 pointer-events-auto relative group"
        >
          <MessageCircle size={24} />
          {!isChatOpen && <span className="absolute top-0 right-0 w-3 h-3 bg-[var(--color-epil-accent)] rounded-full border-2 border-[var(--color-epil-bg)] animate-pulse"></span>}
        </button>
      </div>
    </main>
  );
}

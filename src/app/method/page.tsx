"use client";

import { CheckCircle2, XCircle, ArrowLeft, ShieldCheck, Microscope, History, Award } from "lucide-react";
import Link from "next/link";

export default function MethodPage() {
  return (
    <main className="flex flex-col min-h-screen bg-transparent">
      {/* Header */}
      <header className="w-full bg-white/70 backdrop-blur-md sticky top-0 z-50 border-b border-[var(--color-epil-primary)]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[var(--color-epil-text)] hover:text-[var(--color-epil-accent-dark)] transition-colors font-medium text-xs md:text-sm uppercase tracking-widest">
            <ArrowLeft size={16} />
            На головну
          </Link>
          <span className="font-heading text-xl md:text-2xl tracking-widest uppercase text-[var(--color-epil-text)] font-semibold">
            Savanna
          </span>
          <div className="w-24 hidden md:block"></div> {/* Spacer */}
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 md:py-32 px-6 overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-[var(--color-epil-accent)]/10 rounded-full blur-3xl -z-10"></div>
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[var(--color-epil-accent-dark)] font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-6 block">Науковий підхід</span>
          <h1 className="font-heading text-5xl md:text-7xl text-[var(--color-epil-text)] mb-8 leading-tight">
            Електроепіляція:<br />Медицина, а не магія.
          </h1>
          <div className="w-24 h-1 bg-[var(--color-epil-accent)] rounded-full mx-auto mb-10"></div>
          <p className="text-lg md:text-xl text-[var(--color-epil-text)] opacity-80 leading-relaxed max-w-3xl mx-auto">
            Це не тимчасове рішення і не маркетинговий хід. Це єдиний у світі метод, який гарантує <strong className="font-semibold text-[var(--color-epil-accent-dark)]">100% видалення волосся назавжди</strong>, незалежно від кольору волосся чи типу шкіри.
          </p>
        </div>
      </section>

      {/* FDA Section */}
      <section className="py-16 px-6 bg-[var(--color-epil-primary)]/30 border-y border-[var(--color-epil-primary)]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg border border-[var(--color-epil-primary)] mb-8 text-[var(--color-epil-accent-dark)]">
              <ShieldCheck size={40} />
            </div>
            <h2 className="font-heading text-4xl md:text-5xl mb-6 text-[var(--color-epil-text)]">Визнання FDA</h2>
            <p className="text-[var(--color-epil-text)] opacity-80 leading-relaxed mb-6 text-lg">
              Управління з продовольства і медикаментів США (FDA) — найсуворіша медична інстанція у світі. 
            </p>
            <p className="text-[var(--color-epil-text)] opacity-80 leading-relaxed text-lg">
              FDA офіційно дозволяє використовувати термін <strong className="font-bold text-[var(--color-epil-accent-dark)]">"Permanent Hair Removal" (Видалення назавжди)</strong> виключно щодо електроепіляції. Для лазерної та фотоепіляції дозволений лише термін "Permanent Hair Reduction" (Довгострокове зменшення росту).
            </p>
          </div>
          <div className="flex-1 w-full bg-white p-8 md:p-12 rounded-[2rem] border border-[var(--color-epil-primary)] shadow-xl relative overflow-hidden group hover:border-[var(--color-epil-accent)] transition-colors">
            <div className="absolute top-0 right-0 bg-[var(--color-epil-accent)] text-white text-[10px] md:text-xs font-bold px-6 py-2 rounded-bl-2xl uppercase tracking-widest shadow-sm">
              Медичний факт
            </div>
            <Microscope className="text-[var(--color-epil-primary)] absolute -bottom-10 -right-10 w-64 h-64 opacity-20 -z-10 group-hover:scale-110 transition-transform duration-700" />
            
            <h3 className="font-heading text-3xl mb-6 mt-4 text-[var(--color-epil-text)]">Чому так?</h3>
            <div className="space-y-6 relative z-10">
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                <strong className="text-[var(--color-epil-accent-dark)] font-medium block mb-1">Лазер та фото:</strong>
                Руйнує лише пігмент (меланін) і "присипляє" фолікул. З часом, під дією гормонів або стресу, фолікул може "прокинутися" і волосся виросте знову.
              </p>
              <div className="w-full h-[1px] bg-[var(--color-epil-primary)]"></div>
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                <strong className="text-[var(--color-epil-text)] font-semibold block mb-1">Електроепіляція:</strong>
                Фізично руйнує росткову зону волосини (ствобурові клітини) за допомогою мікророзряду. Зі зруйнованої зони волосся не виросте ніколи, навіть при гормональних збоях.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-24 px-6 bg-[var(--color-epil-bg)]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6 text-[var(--color-epil-accent-dark)]">
            <History size={40} />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl text-center mb-16 text-[var(--color-epil-text)]">Історія методу: 1875 рік</h2>
          
          <div className="relative border-l-2 border-[var(--color-epil-accent)]/50 ml-4 md:ml-8 pl-8 md:pl-12 py-4 space-y-16">
            <div className="relative group">
              <div className="absolute -left-[45px] md:-left-[61px] top-1 w-6 h-6 bg-white border-4 border-[var(--color-epil-accent-dark)] rounded-full group-hover:scale-125 transition-transform shadow-sm"></div>
              <h3 className="font-heading text-3xl mb-4 text-[var(--color-epil-text)]">Винахід доктора Мішеля</h3>
              <p className="opacity-80 leading-relaxed text-base md:text-lg">У 1875 році американський офтальмолог Чарльз Мішель (Charles E. Michel) шукав спосіб безпечно і назавжди видаляти врослі вії (трихіаз) у своїх пацієнтів, які викликали сильне запалення очей. Виривання пінцетом не допомагало, оскільки війка росла знову. Тоді він вперше застосував тонкий дротик і постійний гальванічний струм для руйнування фолікула назавжди.</p>
            </div>
            
            <div className="relative group">
              <div className="absolute -left-[45px] md:-left-[61px] top-1 w-6 h-6 bg-white border-4 border-[var(--color-epil-accent-dark)] rounded-full group-hover:scale-125 transition-transform shadow-sm"></div>
              <h3 className="font-heading text-3xl mb-4 text-[var(--color-epil-text)]">Еволюція в косметологію</h3>
              <p className="opacity-80 leading-relaxed text-base md:text-lg">Метод виявився настільки ефективним і безпечним, що його швидко перейняли дерматологи для видалення зайвого волосся на обличчі (яке неможливо було видалити нічим іншим), а згодом він став золотим стандартом у світовій косметології.</p>
            </div>
            
            <div className="relative group">
              <div className="absolute -left-[45px] md:-left-[61px] top-1 w-6 h-6 bg-[var(--color-epil-accent-dark)] border-4 border-[var(--color-epil-bg)] outline outline-1 outline-[var(--color-epil-accent-dark)] rounded-full group-hover:scale-125 transition-transform shadow-md"></div>
              <h3 className="font-heading text-3xl mb-4 text-[var(--color-epil-text)]">Сучасність</h3>
              <p className="opacity-80 leading-relaxed text-base md:text-lg">Сьогодні використовуються високотехнологічні комп'ютеризовані апарати, які подають імпульс за тисячні долі секунди (флеш-термоліз). Разом з найтоншими одноразовими золотими або сталевими зондами (завтовшки з волосину) це робить процедуру максимально комфортною та абсолютно безпечною для шкіри.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 px-6 bg-[var(--color-epil-primary)]/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl text-[var(--color-epil-text)] mb-4">Жорсткі факти: Порівняння</h2>
            <div className="w-16 h-1 bg-[var(--color-epil-accent)] rounded-full mx-auto"></div>
          </div>
          
          <div className="overflow-x-auto pb-8 custom-scrollbar">
            <table className="w-full min-w-[900px] bg-white rounded-3xl overflow-hidden shadow-xl border border-[var(--color-epil-primary)] text-left">
              <thead>
                <tr className="bg-[var(--color-epil-primary)]/40">
                  <th className="p-8 font-heading text-2xl text-[var(--color-epil-text)] w-1/4">Критерій</th>
                  <th className="p-8 font-heading text-3xl text-[var(--color-epil-accent-dark)] w-1/4 border-l-4 border-white bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.05)] relative z-10">Електроепіляція</th>
                  <th className="p-8 font-heading text-2xl text-[var(--color-epil-text)] opacity-70 w-1/4 border-l border-[var(--color-epil-primary)]">Лазерна епіляція</th>
                  <th className="p-8 font-heading text-2xl text-[var(--color-epil-text)] opacity-70 w-1/4 border-l border-[var(--color-epil-primary)]">Віск / Шугаринг</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-epil-primary)]/60">
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-6 font-medium text-[var(--color-epil-text)] text-lg">Кінцевий результат</td>
                  <td className="p-6 bg-white border-l-4 border-[var(--color-epil-primary)]/50 relative z-10 shadow-[0_0_20px_rgba(0,0,0,0.02)]"><div className="flex items-center gap-3 text-green-700 font-semibold text-lg"><CheckCircle2 size={24}/> Назавжди (100%)</div></td>
                  <td className="p-6 opacity-80 border-l border-[var(--color-epil-primary)] text-base"><div className="flex items-center gap-2"><CheckCircle2 size={18} className="text-yellow-600"/> Тимчасове призупинення</div></td>
                  <td className="p-6 opacity-80 border-l border-[var(--color-epil-primary)] text-base"><div className="flex items-center gap-2"><XCircle size={18} className="text-red-500"/> Ріст через 2-3 тижні</div></td>
                </tr>
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-6 font-medium text-[var(--color-epil-text)] text-lg">Колір волосся</td>
                  <td className="p-6 bg-white border-l-4 border-[var(--color-epil-primary)]/50 relative z-10 shadow-[0_0_20px_rgba(0,0,0,0.02)]"><div className="flex items-center gap-3 text-green-700 font-semibold text-lg"><CheckCircle2 size={24}/> Будь-яке (світле, сиве, пушок)</div></td>
                  <td className="p-6 opacity-80 border-l border-[var(--color-epil-primary)] text-base"><div className="flex items-center gap-2"><XCircle size={18} className="text-red-500"/> Тільки темне на світлій шкірі</div></td>
                  <td className="p-6 opacity-80 border-l border-[var(--color-epil-primary)] text-base"><div className="flex items-center gap-2"><CheckCircle2 size={18} className="text-green-700"/> Будь-яке</div></td>
                </tr>
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-6 font-medium text-[var(--color-epil-text)] text-lg">Ризик врослого волосся</td>
                  <td className="p-6 bg-white border-l-4 border-[var(--color-epil-primary)]/50 relative z-10 shadow-[0_0_20px_rgba(0,0,0,0.02)]"><div className="flex items-center gap-3 text-green-700 font-semibold text-lg"><CheckCircle2 size={24}/> Відсутній (лікує вростання)</div></td>
                  <td className="p-6 opacity-80 border-l border-[var(--color-epil-primary)] text-base"><div className="flex items-center gap-2"><CheckCircle2 size={18} className="text-green-700"/> Низький</div></td>
                  <td className="p-6 opacity-80 border-l border-[var(--color-epil-primary)] text-base"><div className="flex items-center gap-2"><XCircle size={18} className="text-red-500"/> Дуже високий ризик</div></td>
                </tr>
                <tr className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-6 font-medium text-[var(--color-epil-text)] text-lg">Офіційний статус (FDA)</td>
                  <td className="p-6 bg-white border-l-4 border-[var(--color-epil-primary)]/50 relative z-10 shadow-[0_0_20px_rgba(0,0,0,0.02)]"><div className="flex items-center gap-3 text-green-700 font-bold text-lg"><Award size={24}/> Permanent Hair Removal</div></td>
                  <td className="p-6 opacity-80 border-l border-[var(--color-epil-primary)] text-base">Permanent Hair Reduction</td>
                  <td className="p-6 opacity-80 border-l border-[var(--color-epil-primary)] text-base">Temporary Epilation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 text-center bg-white border-t border-[var(--color-epil-primary)]">
        <h2 className="font-heading text-4xl md:text-5xl mb-6 text-[var(--color-epil-text)]">Готові позбутися волосся назавжди?</h2>
        <p className="opacity-70 mb-10 max-w-xl mx-auto text-lg">Медицина на вашому боці. Запишіться на першу процедуру та переконайтеся в ефективності особисто.</p>
        <Link href="/" className="inline-block bg-[var(--color-epil-text)] text-white px-12 py-5 rounded-full text-sm font-medium tracking-widest uppercase shadow-2xl hover:bg-black transition-all hover:scale-105">
          Повернутися на Головну та Записатися
        </Link>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[var(--color-epil-bg)] py-10 border-t border-[var(--color-epil-primary)] text-center">
        <p className="text-sm text-[var(--color-epil-text)] opacity-50 font-medium">
          © {new Date().getFullYear()} Savanna Epil Room Poltava. Всі права захищено.
        </p>
      </footer>
    </main>
  );
}

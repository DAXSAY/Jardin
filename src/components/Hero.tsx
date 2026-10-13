import React from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { ArrowUpRight, Shield, HeartHandshake, Trees, CalendarCheck, Sparkles, Sun, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  currentLang: Language;
  onEnrollClick: () => void;
  onTourClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ currentLang, onEnrollClick, onTourClick }) => {
  const t = translations[currentLang];
  const isRTL = currentLang === 'he';

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 bg-gradient-to-b from-amber-50/60 via-amber-100/30 to-amber-50/20">
      {/* Subtle organic background blobs */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-40">
        <div className="absolute top-0 right-10 w-80 h-80 bg-emerald-200/50 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-200/50 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Column 1: Editorial Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Kicker badge */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-900 bg-emerald-100/80 border border-emerald-300/60 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.15] text-balance">
              {t.hero.title}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl">
              {t.hero.subtitle}
            </p>

            {/* Key feature pills */}
            <div className="pt-2 flex flex-wrap gap-y-2 gap-x-4 text-xs sm:text-sm font-medium text-stone-700">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{isRTL ? 'פיקוח משרד החינוך' : 'Supervisado Min. Educación'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{isRTL ? 'מרחב מוגן ממ״ד תקני' : 'Refugio MAMAD Oficial'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>{isRTL ? 'אוכל כשר מבושל במקום' : 'Menú Kosher Casero Fresco'}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                onClick={onEnrollClick}
                className="px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-emerald-800 rounded-xl hover:bg-emerald-900 transition-all shadow-md shadow-emerald-900/10 flex items-center gap-2 active:scale-98"
              >
                <span>{t.hero.ctaEnroll}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={onTourClick}
                className="px-5 py-3.5 text-sm sm:text-base font-semibold text-stone-800 bg-white border border-stone-300 rounded-xl hover:bg-stone-50 transition-colors shadow-xs flex items-center gap-2"
              >
                <CalendarCheck className="w-4 h-4 text-emerald-700" />
                <span>{t.hero.ctaTour}</span>
              </button>
            </div>
          </div>

          {/* Column 2: Visual Showcase Showcase Card (Resilient Art & Environment Composition) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl p-4 sm:p-5 bg-gradient-to-br from-amber-100/80 via-white to-emerald-50/70 border border-stone-200/80 shadow-lg">
              {/* Feature Preview Card */}
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-stone-900 shadow-inner flex flex-col justify-end p-6 text-white group">
                {/* Fallback stylized kindergarten landscape graphic */}
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/90 via-stone-800/80 to-amber-950/60 z-0" />
                
                {/* Decorative natural motifs */}
                <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-emerald-500/20 blur-2xl pointer-events-none" />
                <div className="absolute top-6 left-6 flex items-center gap-2 z-10">
                  <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-amber-300" />
                    <span>{isRTL ? 'חינוך יער ואדמה' : 'Pedagogía en Naturaleza'}</span>
                  </span>
                </div>

                {/* Content inside showcase image */}
                <div className="relative z-10 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-amber-200">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isRTL ? 'גן אקולוגי עשיר בחוויות' : 'Instalaciones al Aire Libre · Israel'}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold leading-tight">
                    {isRTL ? 'חוקרים, זורעים ויוצרים בכיף' : 'Exploración, Huerto y Cocina de Barro'}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-200 line-clamp-2">
                    {isRTL
                      ? 'ערוגות ירק אורגניות, מטבח בוץ טבעי ומשחקי שיווי משקל בכיפת הטיפוס.'
                      : 'Canteros orgánicos vivos, estación sensorial de agua y barro, y domo geodésico bajo sombra.'}
                  </p>
                </div>
              </div>

              {/* Floating Quick Trust Snippets */}
              <div className="mt-4 grid grid-cols-2 gap-3 text-left">
                <div className="bg-white/90 backdrop-blur-xs p-3 rounded-xl border border-stone-200/70">
                  <div className="text-xs font-semibold text-stone-500">{isRTL ? 'קבוצות גיל' : 'Salitas'}</div>
                  <div className="text-sm font-bold text-stone-900">{isRTL ? 'תינוקייה · פעוטות · בוגרים' : 'Bebés · Párvulos · Mayores'}</div>
                </div>
                <div className="bg-white/90 backdrop-blur-xs p-3 rounded-xl border border-stone-200/70">
                  <div className="text-xs font-semibold text-stone-500">{isRTL ? 'ימי שישי' : 'Viernes'}</div>
                  <div className="text-sm font-bold text-stone-900">{isRTL ? 'קבלת שבת חגיגית' : 'Kabbalat Shabbat'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Proof / KPI Strip below Hero */}
        <div className="mt-14 pt-8 border-t border-stone-200/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-stone-800">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-800 tracking-tight tabular-nums">
              {t.hero.statKidsRatio}
            </div>
            <div className="text-xs font-medium text-stone-600 leading-snug">
              {t.hero.statKidsRatioDesc}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-800 tracking-tight tabular-nums">
              {t.hero.statNature}
            </div>
            <div className="text-xs font-medium text-stone-600 leading-snug">
              {t.hero.statNatureDesc}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-800 tracking-tight">
              {t.hero.statSafety}
            </div>
            <div className="text-xs font-medium text-stone-600 leading-snug">
              {t.hero.statSafetyDesc}
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-800 tracking-tight">
              {isRTL ? '100% טרי וכשר' : '100% Kosher'}
            </div>
            <div className="text-xs font-medium text-stone-600 leading-snug">
              {isRTL ? 'בישול ביתי בריא יומיומי' : 'Cocina mediterránea supervisada'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

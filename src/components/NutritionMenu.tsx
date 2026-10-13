import React from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { Utensils, Apple, ShieldCheck, HeartPulse, Check } from 'lucide-react';

interface NutritionMenuProps {
  currentLang: Language;
}

export const NutritionMenu: React.FC<NutritionMenuProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const isRTL = currentLang === 'he';

  return (
    <section id="nutrition" className="py-16 md:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-3 mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            {t.menu.kicker}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight">
            {t.menu.title}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            {t.menu.subtitle}
          </p>
        </div>

        {/* 4 Daily Meal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.menu.items.map((item, idx) => (
            <div
              key={idx}
              className="bg-amber-50/40 border border-stone-200 rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-500 hover:shadow-xs transition-all"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                  <Utensils className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-stone-900 mb-2">
                  {item.time}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {item.food}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-stone-200/60 flex items-center gap-1.5 text-xs text-emerald-800 font-medium">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isRTL ? 'טרי ומבושל במקום' : 'Elaborado en el día'}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Allergen & Dietary Safety Guarantee */}
        <div className="mt-12 bg-stone-50 rounded-2xl p-6 sm:p-8 border border-stone-200 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">
                {isRTL ? 'נקי מבוטנים ואגוזים' : '100% Libre de Frutos Secos'}
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                {isRTL
                  ? 'נוהל בטיחות אלרגנים קפדני. אין הכנסת דברי מאכל מהבית למעט מקרים מיוחדים.'
                  : 'Protocolo estricto para proteger a niños con alergias anafilácticas.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">
                {isRTL ? 'תפריט צליאק ורגישויות' : 'Opciones para Celíacos'}
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                {isRTL
                  ? 'התאמה מלאה לילדים עם צליאק, רגישות ללקטוז או תזונה צמחונית לפי דרישת ההורים.'
                  : 'Menú individualizado sin gluten, sin lactosa o vegetariano supervisado.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
              <Apple className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-stone-900">
                {isRTL ? 'תוצרת מקומית וטבעית' : 'Huerto y Productores Locales'}
              </h4>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                {isRTL
                  ? 'ירקות מגינת הילדים משולבים בסלטים, ללא סוכר מעובד ועם שמנים איכותיים בלבד.'
                  : 'Cero azúcares refinados, aceite de oliva virgen y verduras frescas del huerto.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

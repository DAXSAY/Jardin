import React from 'react';
import { Language, Classroom } from '../types';
import { translations } from '../i18n/translations';
import { mockClassrooms } from '../data/mockData';
import { Sprout, Hammer, Compass, Heart, ShieldCheck, Users, Sparkles } from 'lucide-react';

interface AboutPhilosophyProps {
  currentLang: Language;
  onSelectClassroom?: (classroomId: string) => void;
}

export const AboutPhilosophy: React.FC<AboutPhilosophyProps> = ({
  currentLang,
  onSelectClassroom,
}) => {
  const t = translations[currentLang];
  const isRTL = currentLang === 'he';

  const icons = [Sprout, Hammer, Compass, Heart];

  return (
    <section id="about" className="py-16 md:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            {t.about.kicker}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight">
            {t.about.title}
          </h2>
          <p className="text-stone-700 leading-relaxed text-base sm:text-lg">
            {t.about.p1}
          </p>
          <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
            {t.about.p2}
          </p>
        </div>

        {/* 4 Pillars Bento Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.about.pillars.map((pillar, idx) => {
            const Icon = icons[idx] || Sparkles;
            return (
              <div
                key={idx}
                className="bg-amber-50/50 hover:bg-amber-50 border border-stone-200/80 rounded-2xl p-6 transition-all hover:shadow-md hover:border-emerald-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-stone-200/60 text-xs font-medium text-emerald-800 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span>{isRTL ? 'חלק משגרת היום' : 'Actividad Diaria'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Safe Haven MAMAD & Ministry of Education Trust Banner */}
        <div className="mt-12 bg-emerald-900 text-emerald-50 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-800 text-emerald-200 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {isRTL
                  ? 'ביטחון מירבי: מרחב מוגן (ממ״ד) ואישור משרד החינוך'
                  : 'Seguridad Integral: Refugio MAMAD y Supervisión Estatal'}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-200 max-w-2xl leading-relaxed">
                {isRTL
                  ? 'הגן ממוגן על פי התקנים המחמירים ביותר של פיקוד העורף. צוות הגן עובר הדרכות ביטחון שוטפות וקורסי עזרה ראשונה של מגן דוד אדום (מד״א).'
                  : 'Instalaciones certificadas por el Comando del Frente Doméstico de Israel (Pikud HaOref) y el Ministerio de Educación. Todo el personal cuenta con certificación de primeros auxilios MDA.'}
              </p>
            </div>
          </div>
          <div className="text-xs font-semibold bg-emerald-800/80 border border-emerald-700 px-4 py-2 rounded-xl text-emerald-100 whitespace-nowrap">
            {isRTL ? 'רישיון משרד החינוך מס׳ 58921' : 'Licencia Oficial #58921'}
          </div>
        </div>

        {/* Classrooms Section */}
        <div className="mt-20">
          <div className="max-w-2xl mb-8">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              {t.classrooms.kicker}
            </div>
            <h3 className="text-2xl font-extrabold text-stone-900">
              {t.classrooms.title}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockClassrooms.map((cls) => {
              const spotsLeft = cls.maxCapacity - cls.currentEnrolled;
              return (
                <div
                  key={cls.id}
                  className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-emerald-600 transition-colors"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-stone-700 bg-stone-100 px-3 py-1 rounded-full">
                        {cls.ageRange[currentLang]}
                      </span>
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                        Ratio {cls.ratio}
                      </span>
                    </div>

                    <h4 className="text-xl font-bold text-stone-900">
                      {cls.name[currentLang]}
                    </h4>

                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {cls.description[currentLang]}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-100 space-y-3">
                    <div className="flex items-center justify-between text-xs text-stone-600">
                      <span>{t.classrooms.enrolled}:</span>
                      <span className="font-bold tabular-nums text-stone-900">
                        {cls.currentEnrolled} / {cls.maxCapacity}
                      </span>
                    </div>

                    {/* Capacity progress bar */}
                    <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-emerald-600 h-2 rounded-full transition-all"
                        style={{
                          width: `${(cls.currentEnrolled / cls.maxCapacity) * 100}%`,
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className={spotsLeft > 0 ? 'text-amber-700 font-semibold' : 'text-red-600 font-semibold'}>
                        {spotsLeft > 0
                          ? `${spotsLeft} ${t.classrooms.availableSpots}`
                          : t.classrooms.full}
                      </span>
                      {onSelectClassroom && (
                        <button
                          onClick={() => onSelectClassroom(cls.id)}
                          className="text-emerald-800 hover:text-emerald-950 underline font-semibold text-xs"
                        >
                          {isRTL ? 'רישום לקבוצה זו ←' : 'Postular aquí →'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { mockScheduleRoutine } from '../data/mockData';
import { Clock, Calendar, Sun, Moon, Utensils, Users, BookOpen, Flower2, Sparkles, AlertCircle } from 'lucide-react';

interface SchedulesSectionProps {
  currentLang: Language;
}

export const SchedulesSection: React.FC<SchedulesSectionProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const isRTL = currentLang === 'he';
  const [activeTab, setActiveTab] = useState<'routine' | 'calendar'>('routine');

  const holidayList = [
    {
      name: isRTL ? 'ראש השנה ויום כיפור' : 'Rosh Hashaná & Yom Kipur',
      month: isRTL ? 'תשרי (ספטמבר/אוקטובר)' : 'Tishrei (Septiembre/Octubre)',
      note: isRTL ? 'חופשה על פי לוח משרד החינוך' : 'Receso festivo según Min. Educación',
    },
    {
      name: isRTL ? 'סוכות וחול המועד' : 'Sucot & Jol HaMoed',
      month: isRTL ? 'תשרי (אוקטובר)' : 'Tishrei (Octubre)',
      note: isRTL ? 'הקמת סוכה אקולוגית בחצר הגן' : 'Construcción de Sucá ecológica en el huerto',
    },
    {
      name: isRTL ? 'חנוכה' : 'Janucá',
      month: isRTL ? 'כסלו (דצמבר)' : 'Kislev (Diciembre)',
      note: isRTL ? 'סדנאות שמן זית, לביבות ואור' : 'Talleres de aceite de oliva y candelabros',
    },
    {
      name: isRTL ? 'ט״ו בשבט (חג האילנות)' : 'Tu BiShvat (Fiesta de los Árboles)',
      month: isRTL ? 'שבט (ינואר/פברואר)' : 'Shevat (Enero/Febrero)',
      note: isRTL ? 'יום נטיעות וזריעה מיוחד בחצר' : 'Jornada central de siembra en la huerta',
    },
    {
      name: isRTL ? 'פורים' : 'Purim',
      month: isRTL ? 'אדר (מרץ)' : 'Adar (Marzo)',
      note: isRTL ? 'קרנבל תחפושות טבעי ומשלוח מנות' : 'Carnaval de disfraces y regalos comestibles',
    },
    {
      name: isRTL ? 'פסח' : 'Pésaj',
      month: isRTL ? 'ניסן (אפריל)' : 'Nisan (Abril)',
      note: isRTL ? 'חופשת אביב וקייטנה מורשית' : 'Vacaciones de primavera y campamento',
    },
    {
      name: isRTL ? 'יום העצמאות' : "Yom Ha'atzmaut",
      month: isRTL ? 'אייר (מאי)' : 'Iyar (Mayo)',
      note: isRTL ? 'חגיגת כחול-לבן, דגלים ושירים' : 'Festejo con banderas de Israel y pícnic',
    },
    {
      name: isRTL ? 'שבועות' : 'Shavuot',
      month: isRTL ? 'סיוון (יוני)' : 'Sivan (Junio)',
      note: isRTL ? 'טקס ביכורים מתוצרת גינת הירק' : 'Ceremonia de primicias con cosecha propia',
    },
  ];

  return (
    <section id="schedules" className="py-16 md:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            {t.schedules.kicker}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight">
            {t.schedules.title}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            {t.schedules.subtitle}
          </p>
        </div>

        {/* Weekly Shifts Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Sunday to Thursday */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase mb-2">
                <Sun className="w-4 h-4 text-amber-500" />
                <span>{t.schedules.daysSunThu}</span>
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-1">
                {t.schedules.regularShift}
              </h3>
              <p className="text-xs text-stone-600 mb-4">
                {t.schedules.extendedShift}
              </p>
            </div>
            <div className="text-xs text-stone-500 border-t border-stone-100 pt-3">
              {isRTL
                ? 'כולל ארוחת בוקר, צהריים חמה, מנוחה וארוחת מנחה.'
                : 'Incluye desayuno, almuerzo caliente, siesta y merienda.'}
            </div>
          </div>

          {/* Friday */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase mb-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{t.schedules.daysFri}</span>
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-1">
                {t.schedules.fridayShift}
              </h3>
              <p className="text-xs text-stone-600 mb-4">
                {isRTL
                  ? 'אפיית חלות שבת אישיות וקבלת שבת מוזיקלית'
                  : 'Horneado de Jalá y ceremonia de Shabat infantil'}
              </p>
            </div>
            <div className="text-xs text-stone-500 border-t border-stone-100 pt-3">
              {isRTL
                ? 'ארוחת בוקר חגיגית ואיסוף מוקדם לפני כניסת השבת.'
                : 'Desayuno festivo y recogida temprana de los niños.'}
            </div>
          </div>

          {/* Saturday (Shabbat) */}
          <div className="bg-stone-100/80 rounded-2xl p-6 border border-stone-200/90 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-stone-600 text-xs font-bold uppercase mb-2">
                <Moon className="w-4 h-4 text-stone-400" />
                <span>{t.schedules.daysSat}</span>
              </div>
              <h3 className="text-lg font-bold text-stone-700 mb-1">
                {isRTL ? 'שבת שלום - סגור' : 'Shabbat Shalom'}
              </h3>
              <p className="text-xs text-stone-500 mb-4">
                {t.schedules.saturdayClosed}
              </p>
            </div>
            <div className="text-xs text-stone-500 border-t border-stone-200/60 pt-3">
              {isRTL ? 'יום מנוחה ומשפחה' : 'Día de descanso y familia en Israel'}
            </div>
          </div>
        </div>

        {/* Tab switch between Routine and Holidays Calendar */}
        <div className="flex items-center gap-2 mb-8 bg-stone-200/80 p-1 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('routine')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              activeTab === 'routine'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {t.schedules.routineTitle}
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              activeTab === 'calendar'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {t.schedules.calendarTitle}
          </button>
        </div>

        {/* Tab 1: Daily Routine Timeline */}
        {activeTab === 'routine' && (
          <div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100">
            {mockScheduleRoutine.map((item, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-amber-50/30 transition-colors"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 tabular-nums">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-800 tracking-wide uppercase tabular-nums">
                      {item.time}
                    </div>
                    <h4 className="text-base font-bold text-stone-900 mt-0.5">
                      {item.title[currentLang]}
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
                      {item.description[currentLang]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Jewish & Israeli Holidays Calendar */}
        {activeTab === 'calendar' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {holidayList.map((holiday, hIdx) => (
              <div
                key={hIdx}
                className="bg-white rounded-xl p-5 border border-stone-200 hover:border-emerald-500 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                    {holiday.month}
                  </div>
                  <h4 className="text-base font-bold text-stone-900 mb-2">
                    {holiday.name}
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {holiday.note}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-500">
                  {isRTL ? 'חגיגה פדגוגית בגן' : 'Celebración en el jardín'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Language, Teacher } from '../types';
import { translations } from '../i18n/translations';
import { GraduationCap, Mail, Phone, ShieldCheck, Heart, Sparkles } from 'lucide-react';

interface TeachersSectionProps {
  currentLang: Language;
  teachers: Teacher[];
}

export const TeachersSection: React.FC<TeachersSectionProps> = ({ currentLang, teachers }) => {
  const t = translations[currentLang];
  const isRTL = currentLang === 'he';
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  return (
    <section id="teachers" className="py-16 md:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl space-y-3 mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            {t.teachers.kicker}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight">
            {t.teachers.title}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            {t.teachers.subtitle}
          </p>
        </div>

        {/* Teachers Cards Grid: Consistent 4-column layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-amber-50/30 rounded-3xl border border-stone-200/90 overflow-hidden shadow-xs hover:border-emerald-500 hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              {/* Photo Area with 4:3 Aspect Ratio and Professional Fallback */}
              <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
                <img
                  src={teacher.photoUrl}
                  alt={teacher.name[currentLang]}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback to stylized SVG avatar if network fails
                    const target = e.target as HTMLElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const fallback = parent.querySelector('.photo-fallback');
                      if (fallback) fallback.classList.remove('hidden');
                    }
                  }}
                />
                
                {/* Fallback container if image fails to load */}
                <div className="photo-fallback hidden absolute inset-0 bg-gradient-to-tr from-emerald-800 to-stone-800 flex items-center justify-center text-white">
                  <div className="text-2xl font-bold tracking-wider">{teacher.initials}</div>
                </div>

                {/* Years Experience Badge Overlay */}
                <div className="absolute top-3 right-3 bg-stone-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full tabular-nums shadow-xs">
                  {teacher.experienceYears} {isRTL ? 'שנות ניסיון' : 'Años de exp.'}
                </div>
              </div>

              {/* Information Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div>
                    <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                      {teacher.name[currentLang]}
                    </h3>
                    <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                      {teacher.role[currentLang]}
                    </p>
                  </div>

                  {/* Certification Tag */}
                  <div className="bg-white/90 p-2.5 rounded-xl border border-stone-200/80 text-xs text-stone-700 flex items-start gap-2 shadow-2xs">
                    <GraduationCap className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span className="leading-snug line-clamp-2">
                      {teacher.certification[currentLang]}
                    </span>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-4">
                    {teacher.bio[currentLang]}
                  </p>
                </div>

                {/* Skills Chips */}
                <div className="pt-3 border-t border-stone-200/60 space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {teacher.skills.slice(0, 3).map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] font-medium text-stone-600 bg-white px-2 py-0.5 rounded-md border border-stone-200/70"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                    <span className="text-stone-400 font-mono text-[11px]">{teacher.email}</span>
                    <button
                      onClick={() => setSelectedTeacher(teacher)}
                      className="text-emerald-800 hover:text-emerald-950 font-semibold underline text-xs cursor-pointer"
                    >
                      {isRTL ? 'פרופיל מלא ←' : 'Ver perfil →'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Supervision & Quality Trust Bar */}
        <div className="mt-12 p-6 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-stone-700">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>
              {isRTL
                ? 'כל אנשי הצוות עוברים מבדק רקע משטרתי שנתי והסמכת החייאה ועזרה ראשונה של מד״א בתוקף.'
                : 'Todo el personal docente cuenta con verificación de antecedentes y certificación anual en RCP pediátrico de Magen David Adom.'}
            </span>
          </div>
          <div className="font-semibold text-emerald-800 shrink-0">
            {isRTL ? 'פיקוח רציף ומקצועי' : 'Supervisión Oficial Misrad HaChinuch'}
          </div>
        </div>
      </div>

      {/* Expanded Teacher Bio Modal */}
      {selectedTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-stone-200">
            <button
              onClick={() => setSelectedTeacher(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors"
            >
              ✕
            </button>

            <div className="flex items-center gap-4 border-b border-stone-200 pb-4">
              <img
                src={selectedTeacher.photoUrl}
                alt={selectedTeacher.name[currentLang]}
                className="w-16 h-16 rounded-2xl object-cover object-top border-2 border-emerald-600 shadow-xs"
              />
              <div>
                <h3 className="text-xl font-bold text-stone-900">
                  {selectedTeacher.name[currentLang]}
                </h3>
                <p className="text-xs font-semibold text-emerald-700">
                  {selectedTeacher.role[currentLang]}
                </p>
                <p className="text-xs text-stone-500 mt-0.5">
                  {selectedTeacher.experienceYears} {isRTL ? 'שנות ניסיון בהוראה' : 'Años de experiencia'}
                </p>
              </div>
            </div>

            <div className="py-4 space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
              <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200 text-xs">
                <span className="font-bold text-amber-900 block mb-1">
                  {isRTL ? 'הסמכות ותארים אקדמיים:' : 'Titulación y Certificación:'}
                </span>
                <span>{selectedTeacher.certification[currentLang]}</span>
              </div>

              <div>
                <span className="font-bold text-stone-900 block mb-1">
                  {isRTL ? 'פילוסופיה חינוכית וגישה לגיל הרך:' : 'Biografía y Enfoque Educativo:'}
                </span>
                <p className="text-stone-600">{selectedTeacher.bio[currentLang]}</p>
              </div>

              <div>
                <span className="font-bold text-stone-900 block mb-1">
                  {isRTL ? 'תחומי מומחיות מרכזיים:' : 'Áreas de Especialidad:'}
                </span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedTeacher.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setSelectedTeacher(null)}
                className="px-5 py-2.5 bg-emerald-800 text-white font-semibold rounded-xl text-xs hover:bg-emerald-900"
              >
                {isRTL ? 'סגירה' : 'Cerrar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

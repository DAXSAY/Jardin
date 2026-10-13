/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Language,
  Registration,
  ClassroomId,
  Teacher,
  AttendanceRecord,
  DevelopmentNote,
  SectionId,
} from './types';
import {
  initialRegistrations,
  mockTeachers,
  initialAttendanceRecords,
  initialDevelopmentNotes,
} from './data/mockData';
import { translations } from './i18n/translations';
import { Sidebar } from './components/Sidebar';
import { Hero } from './components/Hero';
import { AboutPhilosophy } from './components/AboutPhilosophy';
import { SpacesGallery } from './components/SpacesGallery';
import { VideoGallerySection } from './components/VideoGallerySection';
import { TeachersSection } from './components/TeachersSection';
import { SchedulesSection } from './components/SchedulesSection';
import { NutritionMenu } from './components/NutritionMenu';
import { EnrollmentForm } from './components/EnrollmentForm';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { AdminPortal } from './components/AdminPortal';
import {
  Menu,
  PhoneCall,
  Calendar,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Film,
  CheckCircle2,
  X,
  Check,
} from 'lucide-react';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('es');
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [preselectedClassroomId, setPreselectedClassroomId] = useState<ClassroomId>('paotot');
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);
  const [tourSubmitted, setTourSubmitted] = useState(false);

  // Registrations state with localStorage persistence
  const [registrations, setRegistrations] = useState<Registration[]>(() => {
    try {
      const saved = localStorage.getItem('gan_alon_registrations');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialRegistrations;
  });

  // Teachers state with localStorage persistence
  const [teachers, setTeachers] = useState<Teacher[]>(() => {
    try {
      const saved = localStorage.getItem('gan_alon_teachers');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return mockTeachers;
  });

  // Attendance state with localStorage persistence
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(() => {
    try {
      const saved = localStorage.getItem('gan_alon_attendance');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialAttendanceRecords;
  });

  // Development notes state with localStorage persistence
  const [developmentNotes, setDevelopmentNotes] = useState<DevelopmentNote[]>(() => {
    try {
      const saved = localStorage.getItem('gan_alon_development_notes');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialDevelopmentNotes;
  });

  // Persistence hooks
  useEffect(() => {
    try {
      localStorage.setItem('gan_alon_registrations', JSON.stringify(registrations));
    } catch (e) {}
  }, [registrations]);

  useEffect(() => {
    try {
      localStorage.setItem('gan_alon_teachers', JSON.stringify(teachers));
    } catch (e) {}
  }, [teachers]);

  useEffect(() => {
    try {
      localStorage.setItem('gan_alon_attendance', JSON.stringify(attendanceRecords));
    } catch (e) {}
  }, [attendanceRecords]);

  useEffect(() => {
    try {
      localStorage.setItem('gan_alon_development_notes', JSON.stringify(developmentNotes));
    } catch (e) {}
  }, [developmentNotes]);

  // Handle RTL/LTR document direction switch
  useEffect(() => {
    document.documentElement.dir = currentLang === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
  };

  const handleNewRegistration = (newReg: Registration) => {
    setRegistrations((prev) => [newReg, ...prev]);
  };

  const handleUpdateRegistration = (updated: Registration) => {
    setRegistrations((prev) =>
      prev.map((r) => (r.id === updated.id ? updated : r))
    );
  };

  const handleDeleteRegistration = (id: string) => {
    setRegistrations((prev) => prev.filter((r) => r.id !== id));
  };

  const handleAddManualRegistration = (manualReg: Registration) => {
    setRegistrations((prev) => [manualReg, ...prev]);
  };

  const handleUpdateTeacher = (updated: Teacher) => {
    setTeachers((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  const handleAddTeacher = (newTeacher: Teacher) => {
    setTeachers((prev) => [...prev, newTeacher]);
  };

  const handleDeleteTeacher = (id: string) => {
    setTeachers((prev) => prev.filter((t) => t.id !== id));
  };

  const handleUpdateAttendance = (records: AttendanceRecord[]) => {
    setAttendanceRecords(records);
  };

  const handleAddDevelopmentNote = (note: DevelopmentNote) => {
    setDevelopmentNotes((prev) => [note, ...prev]);
  };

  const isRTL = currentLang === 'he';
  const t = translations[currentLang];

  // If in Admin Section, render the full ERP
  if (activeSection === 'admin') {
    return (
      <div className="font-sans text-stone-900" dir={isRTL ? 'rtl' : 'ltr'}>
        <AdminPortal
          currentLang={currentLang}
          registrations={registrations}
          teachers={teachers}
          attendanceRecords={attendanceRecords}
          developmentNotes={developmentNotes}
          onUpdateRegistration={handleUpdateRegistration}
          onDeleteRegistration={handleDeleteRegistration}
          onAddManualRegistration={handleAddManualRegistration}
          onUpdateTeacher={handleUpdateTeacher}
          onAddTeacher={handleAddTeacher}
          onDeleteTeacher={handleDeleteTeacher}
          onUpdateAttendance={handleUpdateAttendance}
          onAddDevelopmentNote={handleAddDevelopmentNote}
          onCloseAdmin={() => setActiveSection('home')}
        />
      </div>
    );
  }

  // Section Title Mapper for top bar
  const sectionTitleMap: Record<SectionId, { es: string; he: string; en: string }> = {
    home: { es: 'Inicio & Presentación', he: 'דף הבית והיכרות', en: 'Home & Overview' },
    philosophy: { es: 'Pedagogía & Grupos por Edad', he: 'תפיסה חינוכית וקבוצות גיל', en: 'Pedagogy & Classrooms' },
    spaces: { es: 'Espacios y Zonas de Naturaleza', he: 'מרחבי החצר והטבע', en: 'Kindergarten Spaces' },
    multimedia: { es: 'Videos y Galería Fotográfica', he: 'סרטוני וידאו וגלריית תמונות', en: 'Videos & Photo Gallery' },
    teachers: { es: 'Equipo de Educadoras', he: 'צוות הגננות והסייעות', en: 'Pedagogical Staff' },
    schedules: { es: 'Horarios, Rutina y Calendario', he: 'שעות פעילות, שגרה וחגים', en: 'Schedules & Calendar' },
    nutrition: { es: 'Nutrición y Menú Mediterráneo', he: 'תזונה בריאה ותפריט כשר', en: 'Healthy Nutrition' },
    enrollment: { es: 'Formulario de Matrícula Online', he: 'טופס רישום מקוון', en: 'Online Enrollment' },
    faq: { es: 'Preguntas Frecuentes', he: 'שאלות ותשובות', en: 'FAQ' },
    admin: { es: 'Panel Administrativo (ERP)', he: 'מערכת ניהול (ERP)', en: 'Admin Portal' },
  };

  return (
    <div
      className="min-h-screen bg-stone-50 text-stone-900 flex"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* 1. MENÚ LATERAL (SIDEBAR NAVIGATION) */}
      <Sidebar
        currentLang={currentLang}
        activeSection={activeSection}
        onSelectSection={(sec) => setActiveSection(sec)}
        onLanguageChange={handleLanguageChange}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* 2. MAIN CONTENT AREA (OFFSET BY SIDEBAR WIDTH ON DESKTOP) */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all ${
          isRTL ? 'lg:mr-72' : 'lg:ml-72'
        }`}
      >
        {/* Top Navbar Header */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger to open sidebar */}
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-100 cursor-pointer"
              aria-label="Abrir menú lateral"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-emerald-800 hidden sm:inline">
                  Gan Alon
                </span>
                <span className="text-xs text-stone-400 hidden sm:inline">/</span>
                <h1 className="text-sm sm:text-base font-bold text-stone-900 truncate">
                  {sectionTitleMap[activeSection][currentLang]}
                </h1>
              </div>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setActiveSection('multimedia')}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
                activeSection === 'multimedia'
                  ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
              }`}
            >
              <Film className="w-3.5 h-3.5 text-emerald-700" />
              <span>{isRTL ? 'סרטונים ותמונות' : 'Ver Videos'}</span>
            </button>

            <button
              onClick={() => setIsTourModalOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-emerald-700" />
              <span>{isRTL ? 'תיאום ביקור' : 'Agendar Visita'}</span>
            </button>

            <button
              onClick={() => setActiveSection('enrollment')}
              className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
            >
              <span>{t.nav.enrollment}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* Section View Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {/* VISTA 1: INICIO */}
          {activeSection === 'home' && (
            <div className="space-y-12">
              <Hero
                currentLang={currentLang}
                onEnrollClick={() => setActiveSection('enrollment')}
                onTourClick={() => setIsTourModalOpen(true)}
              />

              {/* Quick Navigation Cards into other views */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <div
                  onClick={() => setActiveSection('multimedia')}
                  className="bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                      <Film className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-stone-900">
                      {isRTL ? 'סרטונים וגלריית תמונות' : 'Videos y Galería del Jardín'}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {isRTL
                        ? 'צפו בסרטוני וידאו של הילדים בגינת הירק, במטבח הבוץ ובקבלת שבת.'
                        : 'Reproduce videos interactivos de las mañanas al aire libre y explora fotos en alta resolución.'}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-stone-100 text-xs font-bold text-emerald-800 flex items-center justify-between">
                    <span>{isRTL ? 'צפייה בסרטונים ←' : 'Ver videos y fotos →'}</span>
                  </div>
                </div>

                <div
                  onClick={() => setActiveSection('philosophy')}
                  className="bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-stone-900">
                      {isRTL ? 'פדגוגיה וקבוצות גיל' : 'Pedagogía & Salitas'}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {isRTL
                        ? 'חינוך יער ואדמה בהשראת רג׳יו אמיליה עם פיקוח וממ״ד תקני של פיקוד העורף.'
                        : 'Enfoque Reggio Emilia, huerto vivo, ratios reducidos y refugio seguro MAMAD oficial.'}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-stone-100 text-xs font-bold text-emerald-800 flex items-center justify-between">
                    <span>{isRTL ? 'הכירו את הקבוצות ←' : 'Ver salas y cupos →'}</span>
                  </div>
                </div>

                <div
                  onClick={() => setActiveSection('teachers')}
                  className="bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-stone-900">
                      {isRTL ? 'צוות הגננות המוסמכות' : 'Equipo de Educadoras'}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {isRTL
                        ? 'גננות מוסמכות בעלות רישיון משרד החינוך והסמכת עזרה ראשונה מד״א.'
                        : 'Educadoras tituladas ante el Ministerio de Educación de Israel con formación en primeros auxilios MDA.'}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-stone-100 text-xs font-bold text-emerald-800 flex items-center justify-between">
                    <span>{isRTL ? 'פרופילי הגננות ←' : 'Conocer al equipo →'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VISTA 2: FILOSOFÍA Y SALAS */}
          {activeSection === 'philosophy' && (
            <AboutPhilosophy
              currentLang={currentLang}
              onSelectClassroom={(classId) => {
                setPreselectedClassroomId(classId as ClassroomId);
                setActiveSection('enrollment');
              }}
            />
          )}

          {/* VISTA 3: ESPACIOS AL AIRE LIBRE */}
          {activeSection === 'spaces' && (
            <SpacesGallery currentLang={currentLang} />
          )}

          {/* VISTA 4: MULTIMEDIA (VIDEOS E IMÁGENES) */}
          {activeSection === 'multimedia' && (
            <VideoGallerySection currentLang={currentLang} />
          )}

          {/* VISTA 5: DOCENTES */}
          {activeSection === 'teachers' && (
            <TeachersSection currentLang={currentLang} teachers={teachers} />
          )}

          {/* VISTA 6: HORARIOS */}
          {activeSection === 'schedules' && (
            <SchedulesSection currentLang={currentLang} />
          )}

          {/* VISTA 7: NUTRICIÓN */}
          {activeSection === 'nutrition' && (
            <NutritionMenu currentLang={currentLang} />
          )}

          {/* VISTA 8: MATRÍCULA ONLINE */}
          {activeSection === 'enrollment' && (
            <EnrollmentForm
              currentLang={currentLang}
              onNewRegistration={handleNewRegistration}
              preselectedClassroomId={preselectedClassroomId}
            />
          )}

          {/* VISTA 9: PREGUNTAS FRECUENTES */}
          {activeSection === 'faq' && (
            <FAQSection currentLang={currentLang} />
          )}
        </main>

        {/* Footer */}
        <Footer
          currentLang={currentLang}
          onOpenAdmin={() => setActiveSection('admin')}
        />
      </div>

      {/* Campus Tour Visit Modal */}
      {isTourModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-stone-200">
            <button
              onClick={() => {
                setIsTourModalOpen(false);
                setTourSubmitted(false);
              }}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!tourSubmitted ? (
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-stone-900">
                  {isRTL ? 'תיאום ביקור היכרות בגן אלון' : 'Agendar Visita Guiada a Gan Alon'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {isRTL
                    ? 'נשמח לארח אתכם ואת הילד/ה לסיור חווייתי בחצר, בגינת הירק ובמרחבי הפעילות בימי שישי או בשעות אחר הצהריים.'
                    : 'Será un placer recibirte a ti y a tu hijo/a para recorrer el patio, la huerta y los espacios en los horarios de visita.'}
                </p>

                <div className="space-y-3 pt-2 text-xs">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      {isRTL ? 'שם ההורה' : 'Nombre del padre/madre'}
                    </label>
                    <input
                      type="text"
                      placeholder={isRTL ? 'שם מלא' : 'Tu nombre'}
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      {isRTL ? 'טלפון ווטסאפ' : 'Teléfono WhatsApp'}
                    </label>
                    <input
                      type="tel"
                      placeholder="054-0000000"
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      {isRTL ? 'יום מועדף' : 'Día preferido para la visita'}
                    </label>
                    <select className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white">
                      <option>{isRTL ? 'יום שישי בבוקר (09:00 - 11:00)' : 'Viernes en la mañana (09:00 - 11:00)'}</option>
                      <option>{isRTL ? 'ימי א׳-ה׳ אחה״צ (16:30 - 17:30)' : 'Tardes de Dom - Jue (16:30 - 17:30)'}</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setTourSubmitted(true)}
                    className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs transition-colors shadow-xs cursor-pointer"
                  >
                    {isRTL ? 'שליחת בקשה לתיאום' : 'Solicitar fecha de visita'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-3 py-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-stone-900">
                  {isRTL ? 'בקשת הביקור נשלחה בהצלחה!' : '¡Solicitud de visita enviada!'}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {isRTL
                    ? 'מזכירות הגן תיצור עמכם קשר בהקדם לאישור השעה והתאריך.'
                    : 'La secretaría de Gan Alon te contactará para confirmar el día y horario.'}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setIsTourModalOpen(false);
                      setTourSubmitted(false);
                    }}
                    className="px-6 py-2 bg-emerald-800 text-white text-xs font-semibold rounded-xl hover:bg-emerald-900 cursor-pointer"
                  >
                    {isRTL ? 'סגירה' : 'Aceptar'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

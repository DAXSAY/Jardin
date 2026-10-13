import React from 'react';
import { Language, SectionId } from '../types';
import { translations } from '../i18n/translations';
import {
  Sprout,
  Home,
  Compass,
  Trees,
  Film,
  GraduationCap,
  Clock,
  Utensils,
  FileCheck2,
  HelpCircle,
  Shield,
  Phone,
  X,
  ArrowUpRight,
} from 'lucide-react';

interface SidebarProps {
  currentLang: Language;
  activeSection: SectionId;
  onSelectSection: (section: SectionId) => void;
  onLanguageChange: (lang: Language) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentLang,
  activeSection,
  onSelectSection,
  onLanguageChange,
  isOpenMobile,
  onCloseMobile,
}) => {
  const t = translations[currentLang];
  const isRTL = currentLang === 'he';

  const menuItems = [
    {
      id: 'home' as SectionId,
      label: isRTL ? 'דף הבית והיכרות' : 'Inicio & Bienvenida',
      icon: Home,
    },
    {
      id: 'philosophy' as SectionId,
      label: isRTL ? 'פדגוגיה וקבוצות גיל' : 'Pedagogía & Salas',
      icon: Compass,
    },
    {
      id: 'spaces' as SectionId,
      label: isRTL ? 'מרחבי החצר והטבע' : 'Espacios del Jardín',
      icon: Trees,
    },
    {
      id: 'multimedia' as SectionId,
      label: isRTL ? 'סרטונים ותמונות' : 'Videos & Galería',
      icon: Film,
      badge: isRTL ? 'וידאו' : 'Videos',
    },
    {
      id: 'teachers' as SectionId,
      label: isRTL ? 'צוות הגננות והסייעות' : 'Equipo Docente',
      icon: GraduationCap,
    },
    {
      id: 'schedules' as SectionId,
      label: isRTL ? 'שעות פעילות ושגרה' : 'Horarios & Rutina',
      icon: Clock,
    },
    {
      id: 'nutrition' as SectionId,
      label: isRTL ? 'תזונה ים-תיכונית' : 'Alimentación Kosher',
      icon: Utensils,
    },
    {
      id: 'enrollment' as SectionId,
      label: isRTL ? 'טופס רישום מקוון' : 'Matrícula Online',
      icon: FileCheck2,
      highlight: true,
    },
    {
      id: 'faq' as SectionId,
      label: isRTL ? 'שאלות ותשובות' : 'Preguntas Frecuentes',
      icon: HelpCircle,
    },
    {
      id: 'admin' as SectionId,
      label: isRTL ? 'ניהול בית ספר (ERP)' : 'Panel de Gestión (ERP)',
      icon: Shield,
    },
  ];

  const handleItemClick = (id: SectionId) => {
    onSelectSection(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 z-50 w-72 bg-stone-900 text-stone-200 border-r border-stone-800 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          isRTL ? 'right-0 border-l border-r-0' : 'left-0 border-r border-l-0'
        } ${
          isOpenMobile
            ? 'translate-x-0'
            : isRTL
            ? 'translate-x-full lg:translate-x-0'
            : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top: Brand Header & Language Switcher */}
        <div className="p-5 border-b border-stone-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-xs">
                <Sprout className="w-6 h-6 text-emerald-200" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white tracking-tight leading-tight">
                  {t.nav.brand}
                </h2>
                <p className="text-[11px] text-stone-400 leading-none">
                  {isRTL ? 'גן ילדים וחינוך בטבע' : 'Kindergarten Israel'}
                </p>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Language Selector */}
          <div className="flex items-center bg-stone-800/90 p-1 rounded-xl text-xs font-bold justify-between">
            <button
              onClick={() => onLanguageChange('es')}
              className={`flex-1 py-1 rounded-lg transition-all cursor-pointer ${
                currentLang === 'es' ? 'bg-emerald-700 text-white shadow-2xs' : 'text-stone-400 hover:text-white'
              }`}
            >
              ES
            </button>
            <button
              onClick={() => onLanguageChange('he')}
              className={`flex-1 py-1 rounded-lg transition-all cursor-pointer ${
                currentLang === 'he' ? 'bg-emerald-700 text-white shadow-2xs' : 'text-stone-400 hover:text-white'
              }`}
            >
              עב
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`flex-1 py-1 rounded-lg transition-all cursor-pointer ${
                currentLang === 'en' ? 'bg-emerald-700 text-white shadow-2xs' : 'text-stone-400 hover:text-white'
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Middle: Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-xs font-bold'
                    : item.highlight
                    ? 'text-emerald-300 hover:bg-stone-800 hover:text-white'
                    : 'text-stone-300 hover:bg-stone-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-emerald-200' : item.highlight ? 'text-emerald-400' : 'text-stone-400'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom: Fast Action & Direct School Hotline */}
        <div className="p-4 border-t border-stone-800 space-y-3 bg-stone-950/40">
          <button
            onClick={() => handleItemClick('enrollment')}
            className="w-full py-2.5 px-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
          >
            <span>{isRTL ? 'הרשמה מהירה לגן' : 'Matrícula 2026/27'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          <div className="text-[11px] text-stone-400 flex items-center justify-between px-1">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-emerald-500" />
              <span>09-876-5432</span>
            </span>
            <span className="text-emerald-400 font-semibold">Sharon, IL</span>
          </div>
        </div>
      </aside>
    </>
  );
};

import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { Sprout, ShieldCheck, PhoneCall, Globe, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  isAdminOpen: boolean;
  onToggleAdmin: () => void;
  onNavigateToEnroll: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  isAdminOpen,
  onToggleAdmin,
  onNavigateToEnroll,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[currentLang];
  const isRTL = currentLang === 'he';

  const navLinks = [
    { href: '#about', label: t.nav.about },
    { href: '#spaces', label: t.nav.spaces },
    { href: '#teachers', label: t.nav.teachers },
    { href: '#schedules', label: t.nav.schedules },
    { href: '#nutrition', label: t.nav.menu },
  ];

  return (
    <header className="sticky top-0 z-40 bg-amber-50/90 backdrop-blur-md border-b border-stone-200/70 transition-colors">
      {/* Top micro announcement bar */}
      <div className="bg-emerald-800 text-emerald-50 text-xs py-1.5 px-4 text-center font-medium">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="truncate">
            {isRTL ? '🇮🇱 גן אלון - רישום לשנת תשפ״ו 2026/2027 בעיצומו' : '🇮🇱 Gan Alon · Matrículas Abiertas Ciclo 2026/2027 · Israel'}
          </span>
          <div className="hidden sm:flex items-center gap-3 text-emerald-200 text-xs shrink-0">
            <span>{t.hero.locationBadge}</span>
            <span aria-hidden="true">·</span>
            <a href="tel:+97298765432" className="hover:text-white transition-colors flex items-center gap-1">
              <PhoneCall className="w-3 h-3" />
              <span>09-876-5432</span>
            </a>
          </div>
        </div>
      </div>

      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-stone-900 group whitespace-nowrap shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-xs group-hover:bg-emerald-800 transition-colors">
            <Sprout className="w-6 h-6 text-emerald-100" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-stone-900 leading-none">
              {t.nav.brand}
            </span>
            <span className="text-xs text-stone-600 font-normal leading-tight mt-0.5">
              {isRTL ? 'חינוך בטבע ומשחק' : 'Kindergarten & Nature'}
            </span>
          </div>
        </a>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-emerald-800 transition-colors py-1 whitespace-nowrap shrink-0 border-b-2 border-transparent hover:border-emerald-600"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action + Language Switcher + Admin Button */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language selector toggle */}
          <div className="flex items-center bg-stone-200/70 p-0.5 rounded-lg text-xs font-semibold">
            <button
              onClick={() => onLanguageChange('es')}
              className={`px-2 py-1 rounded-md transition-all ${
                currentLang === 'es'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Español"
            >
              ES
            </button>
            <button
              onClick={() => onLanguageChange('he')}
              className={`px-2 py-1 rounded-md transition-all ${
                currentLang === 'he'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="עברית"
            >
              עב
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-1 rounded-md transition-all ${
                currentLang === 'en'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="English"
            >
              EN
            </button>
          </div>

          {/* Admin ERP Toggle Button */}
          <button
            onClick={onToggleAdmin}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border ${
              isAdminOpen
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span className="whitespace-nowrap">{isAdminOpen ? (isRTL ? 'אתר רגיל' : 'Ver Web') : (isRTL ? 'ניהול ERP' : 'Gestión ERP')}</span>
          </button>

          {/* Primary CTA */}
          <button
            onClick={onNavigateToEnroll}
            className="px-4 py-2 text-xs md:text-sm font-semibold text-white bg-emerald-800 rounded-lg hover:bg-emerald-900 transition-colors shadow-xs whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <span>{t.nav.enrollment}</span>
            <ArrowUpRight className="w-4 h-4 opacity-80" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-200/60"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-amber-50 border-b border-stone-200 px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-stone-800 hover:bg-amber-100/70 rounded-lg"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
            <button
              onClick={() => {
                onToggleAdmin();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg bg-stone-100 text-stone-800 border border-stone-200"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>{isAdminOpen ? 'Volver al Sitio' : t.nav.admin}</span>
            </button>
            <div className="flex items-center justify-between text-xs text-stone-600 px-1 pt-1">
              <span>Idioma / שפה:</span>
              <div className="flex gap-1">
                {(['es', 'he', 'en'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      onLanguageChange(lang);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-2.5 py-1 rounded text-xs font-bold ${
                      currentLang === lang ? 'bg-emerald-700 text-white' : 'bg-stone-200 text-stone-700'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

import React from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { Sprout, Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';

interface FooterProps {
  currentLang: Language;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onOpenAdmin }) => {
  const t = translations[currentLang];
  const isRTL = currentLang === 'he';

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center">
                <Sprout className="w-6 h-6 text-emerald-200" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white block">
                  {t.nav.brand}
                </span>
                <span className="text-xs text-stone-400">
                  {t.nav.brandSubtitle}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 max-w-md leading-relaxed">
              {isRTL
                ? 'מרכז חינוכי לגיל הרך מבוסס טבע בישראל. פיתוח רגשי, גינת ירק אורגנית, משחק חופשי מונחה וקבלת שבת באהבה.'
                : 'Jardín de infantes con enfoque en naturaleza, huerta orgánica y pedagogía activa en Israel. Supervisado por el Ministerio de Educación.'}
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>{isRTL ? 'רישיון משרד החינוך · מרחב מוגן תקני' : 'Min. Educación Israel · Refugio MAMAD Homologado'}</span>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {isRTL ? 'כתובת וקשר' : 'Contacto & Ubicación'}
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{t.footer.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href="tel:+97298765432" className="hover:text-white transition-colors font-mono">
                  {t.footer.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href={`mailto:${t.footer.email}`} className="hover:text-white transition-colors">
                  {t.footer.email}
                </a>
              </li>
              <li className="text-amber-300 font-semibold pt-1">
                {t.footer.emergencyPhone}
              </li>
            </ul>
          </div>

          {/* Quick links & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {isRTL ? 'שעות פעילות' : 'Horarios de Atención'}
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              {t.footer.hours}
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="text-xs text-stone-400 hover:text-emerald-400 underline transition-colors block text-left"
              >
                {t.admin.title}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>{t.footer.copyright}</div>
          <div className="flex gap-4">
            <a href="#about" className="hover:text-stone-300 transition-colors">
              {t.nav.about}
            </a>
            <a href="#schedules" className="hover:text-stone-300 transition-colors">
              {t.nav.schedules}
            </a>
            <a href="#enrollment" className="hover:text-stone-300 transition-colors">
              {t.nav.enrollment}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

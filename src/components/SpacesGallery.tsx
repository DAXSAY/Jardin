import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { Sprout, Utensils, Mountain, Music, Palette, Flag, Info, X, Check } from 'lucide-react';

interface SpacesGalleryProps {
  currentLang: Language;
}

export const SpacesGallery: React.FC<SpacesGalleryProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const isRTL = currentLang === 'he';
  const [selectedSpaceIndex, setSelectedSpaceIndex] = useState<number | null>(null);

  const spaceIcons = [Sprout, Utensils, Mountain, Music, Palette, Flag];

  const spaceThemes = [
    {
      gradient: 'from-emerald-800 to-stone-900',
      badgeBg: 'bg-emerald-100 text-emerald-900',
      skills: isRTL ? ['אחריות וטיפוח', 'בוטניקה מוחשית', 'סבלנות והמתנה'] : ['Responsabilidad y cuidado', 'Botánica práctica', 'Paciencia y ciclos vivos'],
      details: isRTL
        ? 'ערוגות עץ אקולוגיות מוגבהות שתוכננו בגובה הילדים. הילדים זורעים עגבניות שרי, פטרוזיליה, נענע וחסה, משקים יום יום ולומדים מאין מגיע האוכל.'
        : 'Canteros elevados adaptados a la estatura de los niños. Siembran tomates cherry, albahaca, menta y lechuga, regando a diario y aprendiendo el origen vivo de los alimentos.',
    },
    {
      gradient: 'from-amber-900 to-stone-900',
      badgeBg: 'bg-amber-100 text-amber-900',
      skills: isRTL ? ['חקר מדעי וחושי', 'דמיון ויצירתיות', 'מוטוריקה עדינה'] : ['Exploración sensorial y táctil', 'Juego simbólico', 'Motricidad fina'],
      details: isRTL
        ? 'מטבח בוץ מעץ אורן טבעי עם כלי נירוסטה אמיתיים, קערות, מטרפות ומים. הילדים רוקחים ״מרקים״ ו״עוגות״ מבוץ, חול ואצטרובלים תוך שחרור רגשי מלא.'
        : 'Estación de cocina de barro en madera natural con ollas de acero, batidores, agua y arena. Los niños experimentan texturas, densidades y crean recetas imaginarias con total libertad.',
    },
    {
      gradient: 'from-sky-900 to-stone-900',
      badgeBg: 'bg-sky-100 text-sky-900',
      skills: isRTL ? ['שיווי משקל וקואורדינציה', 'ביטחון גופני', 'הערכת סיכונים מבוקרת'] : ['Equilibrio y fuerza', 'Confianza física', 'Riesgo controlado'],
      details: isRTL
        ? 'מתקן כיפה גיאודזית לטיפוס המוצב בתוך משטח חול עמוק ונקי, תחת רשת הצללה כחולה שמסננת 95% מקרני השמש. הילדים בוחנים את כוחם הגופני בסביבה מוגנת.'
        : 'Estructura geodésica instalada sobre arenero amortiguante, protegida por toldo de sombra azul de alta densidad. Estimula la propiocepción y la autoconfianza motora.',
    },
    {
      gradient: 'from-violet-900 to-stone-900',
      badgeBg: 'bg-violet-100 text-violet-900',
      skills: isRTL ? ['קצב ותפיסה שמיעתית', 'סיבה ותוצאה', 'שמחת יצירה'] : ['Ritmo y acústica', 'Causa y efecto', 'Coordinación ojo-mano'],
      details: isRTL
        ? 'קיר צלילים חווייתי על גבי גדר החצר הכולל סירים, מכסים ותופים ממוחזרים בגבהים שונים, יחד עם צי בימבות וטרקטורונים לרכיבה חופשית בחול.'
        : 'Muro sensorial de percusión con utensilios acústicos fijados a la cerca, complementado con vehículos de juguete para carreras y juegos de arrastre en la arena.',
    },
    {
      gradient: 'from-rose-900 to-stone-900',
      badgeBg: 'bg-rose-100 text-rose-900',
      skills: isRTL ? ['אסתטיקה וקומפוזיציה', 'חיבור לחומרי גלם', 'ריכוז עמוק'] : ['Composición plástica', 'Apreciación natural', 'Focalización y calma'],
      details: isRTL
        ? 'שולחן יצירה מעץ שבו הילדים יוצרים יצירות קולאז׳ מרהיבות מעלי שלכת, פרחי בר, זרדים ואבנים שנאספו במהלך הטיול בחצר.'
        : 'Taller donde los niños elaboran murales y collages utilizando hojas de diferentes texturas, pétalos prensados, ramas y semillas recogidas durante su exploración matutina.',
    },
    {
      gradient: 'from-blue-900 to-stone-900',
      badgeBg: 'bg-blue-100 text-blue-900',
      skills: isRTL ? ['זהות ושייכות', 'שמחה קהילתית', 'אהבת הארץ'] : ['Pertenencia comunitaria', 'Identidad cultural', 'Alegría compartida'],
      details: isRTL
        ? 'ימי שיא וחגיגות שמחות עם דגלי ישראל, שירים ישראליים, ריקודים וטקסים המחברים את הילדים למסורת, ללוח העברי ולתרבות המקומית באהבה גדולה.'
        : 'Festejos alegres con banderas de Israel, danzas, canciones folclóricas y celebraciones de las festividades judías que refuerzan la calidez comunitaria y el orgullo familiar.',
    },
  ];

  return (
    <section id="spaces" className="py-16 md:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              {t.spaces.kicker}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight">
              {t.spaces.title}
            </h2>
            <p className="text-sm sm:text-base text-stone-600">
              {t.spaces.subtitle}
            </p>
          </div>
          <div className="text-xs text-stone-500 font-medium">
            {isRTL ? 'לחצו על כל מרחב לצפייה בפרטים והמטרות הפדגוגיות' : 'Haz clic en cada espacio para conocer los objetivos pedagógicos'}
          </div>
        </div>

        {/* Grid of 6 Experience Zones */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.spaces.gallery.map((item, index) => {
            const Icon = spaceIcons[index] || Sprout;
            const theme = spaceThemes[index];

            return (
              <div
                key={index}
                onClick={() => setSelectedSpaceIndex(index)}
                className="group cursor-pointer bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md hover:border-emerald-500 transition-all flex flex-col justify-between"
              >
                {/* Visual Area Box */}
                <div className={`relative h-48 bg-gradient-to-tr ${theme.gradient} p-5 flex flex-col justify-between text-white overflow-hidden`}>
                  {/* Subtle decorative circles */}
                  <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
                  
                  <div className="relative z-10 flex items-center justify-between">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${theme.badgeBg}`}>
                      {item.tag}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-200 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-emerald-800 font-medium">
                    <span className="flex items-center gap-1">
                      <Info className="w-3.5 h-3.5" />
                      <span>{isRTL ? 'פירוט פדגוגי' : 'Ver enfoque pedagógico'}</span>
                    </span>
                    <span className="text-stone-400 group-hover:text-emerald-700 transition-colors">
                      {isRTL ? '←' : '→'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Lightbox for Space Details */}
      {selectedSpaceIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedSpaceIndex(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-stone-100 text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${spaceThemes[selectedSpaceIndex].badgeBg}`}>
                {t.spaces.gallery[selectedSpaceIndex].tag}
              </span>

              <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900">
                {t.spaces.gallery[selectedSpaceIndex].title}
              </h3>

              <p className="text-sm text-stone-700 leading-relaxed">
                {spaceThemes[selectedSpaceIndex].details}
              </p>

              <div className="pt-4 border-t border-stone-200">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                  {isRTL ? 'מיומנויות נרכשות במרחב:' : 'Habilidades estimuladas:'}
                </div>
                <div className="space-y-1.5">
                  {spaceThemes[selectedSpaceIndex].skills.map((skill, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-xs sm:text-sm text-stone-800">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setSelectedSpaceIndex(null)}
                  className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-xl text-sm transition-colors"
                >
                  {isRTL ? 'סגירה' : 'Entendido'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

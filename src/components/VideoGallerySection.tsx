import React, { useState, useRef } from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { mockVideos, mockPhotoGallery, PhotoGalleryItem } from '../data/mockData';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Film,
  Image as ImageIcon,
  Check,
  X,
  Sparkles,
  Eye,
  Camera,
  Layers,
} from 'lucide-react';

interface VideoGallerySectionProps {
  currentLang: Language;
}

export const VideoGallerySection: React.FC<VideoGallerySectionProps> = ({ currentLang }) => {
  const isRTL = currentLang === 'he';

  // Video player state
  const [selectedVideo, setSelectedVideo] = useState(mockVideos[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Photo gallery filter & lightbox state
  const [photoFilter, setPhotoFilter] = useState<string>('all');
  const [activeLightboxPhoto, setActiveLightboxPhoto] = useState<PhotoGalleryItem | null>(null);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleToggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSelectVideo = (vid: typeof mockVideos[0]) => {
    setSelectedVideo(vid);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.load();
    }
  };

  const filteredPhotos = photoFilter === 'all'
    ? mockPhotoGallery
    : mockPhotoGallery.filter((p) => {
        if (photoFilter === 'nature') return p.category.es.includes('Naturaleza') || p.badge.includes('Huerto') || p.badge.includes('Exploración');
        if (photoFilter === 'sensory') return p.category.es.includes('Sensorial') || p.badge.includes('Botz') || p.category.es.includes('Táctil');
        if (photoFilter === 'motor') return p.category.es.includes('Psicomotricidad') || p.badge.includes('Ruedas') || p.badge.includes('Arenero');
        if (photoFilter === 'celebration') return p.badge.includes('Yom') || p.category.es.includes('Identidad') || p.category.es.includes('Creatividad');
        return true;
      });

  return (
    <div className="space-y-12 pb-16">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-2">
          <Film className="w-4 h-4 text-emerald-700" />
          <span>{isRTL ? 'סרטונים ותיעוד מצולם' : 'Experiencias Multimedia'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight">
          {isRTL ? 'חיי היום-יום בגן אלון: וידאו וגלריית תמונות' : 'Un Día en Gan Alon: Videos y Galería Fotográfica'}
        </h2>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          {isRTL
            ? 'צפו בסרטוני וידאו חיים של פעילות הילדים בערוגות הירק, במטבח הבוץ ובקבלת שבת, לצד תיעוד מקיף של 12 מרחבי הפעילות בחצר.'
            : 'Explora videos auténticos de nuestras mañanas en el huerto, la cocina de barro y la celebración de Shabat, además de una galería completa de nuestras 12 zonas de juego al aire libre.'}
        </p>
      </div>

      {/* ================= SECCIÓN 1: REPRODUCTOR DE VIDEO INTERACTIVO ================= */}
      <div className="bg-stone-900 rounded-3xl overflow-hidden shadow-xl border border-stone-800 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Main Video Screen */}
          <div className="lg:col-span-8 relative bg-black flex items-center justify-center min-h-[320px] sm:min-h-[440px]">
            <video
              ref={videoRef}
              src={selectedVideo.videoUrl}
              poster={selectedVideo.thumbnail}
              className="w-full h-full object-cover max-h-[500px]"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              playsInline
            />

            {/* Video Overlay Controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none flex flex-col justify-between p-4 sm:p-6">
              {/* Top Video Tag */}
              <div className="flex items-center justify-between">
                <span className="bg-emerald-700/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                  {selectedVideo.category[currentLang]}
                </span>
                <span className="bg-black/60 backdrop-blur-md text-stone-200 text-xs font-mono px-2.5 py-1 rounded-full tabular-nums">
                  {selectedVideo.duration}
                </span>
              </div>

              {/* Bottom Video Meta & Controls Bar */}
              <div className="pointer-events-auto space-y-3">
                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white drop-shadow-sm">
                    {selectedVideo.title[currentLang]}
                  </h3>
                  <p className="text-xs text-stone-300 max-w-xl line-clamp-2">
                    {selectedVideo.description[currentLang]}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <button
                    onClick={handlePlayPause}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-colors shadow-md cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                    <span>{isPlaying ? (isRTL ? 'השהה' : 'Pausar') : (isRTL ? 'נגן וידאו' : 'Reproducir')}</span>
                  </button>

                  <button
                    onClick={handleToggleMute}
                    className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-xl transition-colors cursor-pointer"
                    title={isMuted ? 'Activar sonido' : 'Silenciar'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-red-300" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Central Play/Pause Big Hit Area */}
            {!isPlaying && (
              <button
                onClick={handlePlayPause}
                className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-emerald-600/90 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-2xl cursor-pointer"
                aria-label="Reproducir video"
              >
                <Play className="w-8 h-8 fill-white ml-1" />
              </button>
            )}
          </div>

          {/* Playlist Sidebar */}
          <div className="lg:col-span-4 p-5 sm:p-6 bg-stone-900/95 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-stone-800">
            <div>
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>{isRTL ? 'רשימת סרטונים לצפייה' : 'Lista de Reproducción'}</span>
              </div>

              <div className="space-y-2.5">
                {mockVideos.map((vid) => {
                  const isCurrent = vid.id === selectedVideo.id;
                  return (
                    <div
                      key={vid.id}
                      onClick={() => handleSelectVideo(vid)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex gap-3 items-center ${
                        isCurrent
                          ? 'bg-emerald-950/70 border-emerald-600 shadow-xs'
                          : 'bg-stone-800/60 border-stone-700/60 hover:bg-stone-800'
                      }`}
                    >
                      <div className="relative w-18 h-13 rounded-lg overflow-hidden bg-stone-800 shrink-0">
                        <img src={vid.thumbnail} alt={vid.title[currentLang]} className="w-full h-full object-cover" />
                        <div className="absolute bottom-1 right-1 bg-black/80 text-[10px] font-mono px-1 rounded text-stone-200">
                          {vid.duration}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold text-emerald-400 block uppercase">
                          {vid.category[currentLang]}
                        </span>
                        <h4 className="text-xs font-bold text-white truncate">
                          {vid.title[currentLang]}
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-800 text-[11px] text-stone-400">
              {isRTL
                ? 'צולם בשטח גן אלון, ישראל. כל הצילומים באישור ההורים ובפיקוח הצוות.'
                : 'Filmado en las instalaciones de Gan Alon, Israel. Fotografías con autorización parental.'}
            </div>
          </div>
        </div>
      </div>

      {/* ================= SECCIÓN 2: GALERÍA FOTOGRÁFICA INTERACTIVA (12 FOTOS REALES) ================= */}
      <div className="space-y-6 pt-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 mb-1">
              <Camera className="w-4 h-4 text-emerald-700" />
              <span>{isRTL ? 'גלריית תמונות מהחצר' : 'Galería de Momentos y Espacios'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
              {isRTL ? '12 מרחבי פעילות ומשחק בטבע' : 'Nuestras 12 Actividades y Espacios en Imágenes'}
            </h3>
          </div>

          {/* Category filter buttons */}
          <div className="flex flex-wrap gap-1.5 bg-stone-200/80 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setPhotoFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                photoFilter === 'all' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {isRTL ? 'הכל (12)' : 'Todas (12)'}
            </button>
            <button
              onClick={() => setPhotoFilter('nature')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                photoFilter === 'nature' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {isRTL ? 'גינה ובוטניקה' : 'Huerto'}
            </button>
            <button
              onClick={() => setPhotoFilter('sensory')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                photoFilter === 'sensory' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {isRTL ? 'מטבח בוץ' : 'Mitbach Botz'}
            </button>
            <button
              onClick={() => setPhotoFilter('motor')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                photoFilter === 'motor' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {isRTL ? 'כיפה וחול' : 'Domo & Arena'}
            </button>
            <button
              onClick={() => setPhotoFilter('celebration')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                photoFilter === 'celebration' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {isRTL ? 'חגיגות ויצירה' : 'Celebraciones'}
            </button>
          </div>
        </div>

        {/* 12 Photo Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActiveLightboxPhoto(photo)}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md hover:border-emerald-500 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
                <img
                  src={photo.imageUrl}
                  alt={photo.title[currentLang]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2.5 left-2.5 bg-stone-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2 py-0.5 rounded-md">
                  {photo.badge}
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2 bg-white/90 rounded-full text-stone-900 shadow-md">
                    <Eye className="w-4 h-4" />
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-1.5">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                  {photo.category[currentLang]}
                </span>
                <h4 className="text-xs font-bold text-stone-900 line-clamp-1 group-hover:text-emerald-800 transition-colors">
                  {photo.title[currentLang]}
                </h4>
                <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
                  {photo.description[currentLang]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveLightboxPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-16/10 w-full bg-black">
              <img
                src={activeLightboxPhoto.imageUrl}
                alt={activeLightboxPhoto.title[currentLang]}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-emerald-800 text-white text-xs font-bold px-3 py-1 rounded-full">
                {activeLightboxPhoto.badge}
              </div>
            </div>

            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span className="font-bold text-emerald-800 uppercase tracking-wider">
                  {activeLightboxPhoto.category[currentLang]}
                </span>
                <span>Gan Alon · Israel</span>
              </div>
              <h3 className="text-xl font-bold text-stone-900">
                {activeLightboxPhoto.title[currentLang]}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {activeLightboxPhoto.description[currentLang]}
              </p>

              <div className="pt-3 border-t border-stone-100 flex justify-end">
                <button
                  onClick={() => setActiveLightboxPhoto(null)}
                  className="px-5 py-2 bg-emerald-800 text-white font-bold rounded-xl text-xs hover:bg-emerald-900 cursor-pointer"
                >
                  {isRTL ? 'סגירה' : 'Cerrar Foto'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

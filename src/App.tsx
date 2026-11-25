import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Pause, Volume2 } from 'lucide-react';
import type { AppPhase, CandleState, Language } from './types';
import {
  getDisplayName,
  getTypewriterLines,
  parseCelebrationParams,
} from './utils/celebration';
import { AmbientBackground } from './components/AmbientBackground';
import { ConfettiCanvas, type ConfettiCanvasHandle } from './components/ConfettiCanvas';
import { IntroCurtain } from './components/IntroCurtain';
import { TypewriterWishes } from './components/TypewriterWishes';
import { InteractiveCake } from './components/InteractiveCake';
import { SmartImage } from './components/SmartImage';

const BIRTHDAY_SONG_SRC =
  '/assets/aistudio/mahmoud-el-esseily-kol-sana-wadi-degla-mhmod-alaasyly-kl-sn_QBgoS9r4_af270a0a.mp3';

export default function App() {
  const params = useMemo(
    () =>
      parseCelebrationParams(
        typeof window !== 'undefined' ? window.location.search : ''
      ),
    []
  );

  const [phase, setPhase] = useState<AppPhase>(
    params.autostart ? 'celebrating' : 'intro'
  );
  const [lang, setLang] = useState<Language>(params.initialLang);
  const [isPlaying, setIsPlaying] = useState(false);
  const [candleState, setCandleState] = useState<CandleState>('lit');
  const [balloonSweepKey, setBalloonSweepKey] = useState<number>(
    params.autostart ? 1 : 0
  );

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const confettiRef = useRef<ConfettiCanvasHandle | null>(null);

  const celebrantName = getDisplayName(params, lang);
  const isAr = lang === 'ar';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title =
      lang === 'ar'
        ? `عيد ميلاد سعيد ${celebrantName}`
        : `Happy Birthday ${celebrantName}`;
  }, [lang, celebrantName]);

  const toggleLanguage = useCallback(() => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  }, []);

  const attemptAudioPlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.85;
    const playPromise = audio.play();
    if (playPromise && typeof playPromise.then === 'function') {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, []);

  const handleToggleAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      attemptAudioPlay();
    }
  }, [attemptAudioPlay, isPlaying]);

  const handleStartCelebration = useCallback(() => {
    setPhase('celebrating');
    setBalloonSweepKey((k) => k + 1);
    attemptAudioPlay();
    window.setTimeout(() => {
      confettiRef.current?.burst(0.5, 0.35);
    }, 180);
  }, [attemptAudioPlay]);

  const handleToggleCandles = useCallback(() => {
    setCandleState((prev) => {
      const next = prev === 'lit' ? 'blown' : 'lit';
      if (next === 'blown') {
        confettiRef.current?.burst(0.5, 0.42);
        window.setTimeout(() => confettiRef.current?.burst(0.35, 0.35), 140);
        window.setTimeout(() => confettiRef.current?.burst(0.65, 0.35), 240);
      }
      return next;
    });
  }, []);

  const typewriterPhrases = useMemo(
    () => getTypewriterLines(celebrantName, lang),
    [celebrantName, lang]
  );

  return (
    <div
      data-state={phase}
      className="relative min-h-screen overflow-x-clip text-[#F5F7FA]"
    >
      {/* Looping birthday song */}
      <audio
        ref={audioRef}
        src={BIRTHDAY_SONG_SRC}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <AmbientBackground />
      <ConfettiCanvas ref={confettiRef} active={phase === 'celebrating'} />

      {/* Festive rising balloon border sweep upon entering celebration */}
      {phase === 'celebrating' && balloonSweepKey > 0 ? (
        <div
          key={balloonSweepKey}
          aria-hidden="true"
          onAnimationEnd={() => setBalloonSweepKey(0)}
          className="animate-balloon-sweep pointer-events-none fixed inset-x-0 bottom-0 z-[5] flex justify-center"
        >
          <SmartImage
            src="/assets/aistudio/Balloon-Border_d0f3fffe.png"
            alt=""
            fallbackVariant="balloons"
            className="w-full max-w-[1440px] object-contain opacity-80"
          />
        </div>
      ) : null}

      {phase === 'intro' ? (
        <IntroCurtain
          celebrantName={celebrantName}
          lang={lang}
          onStart={handleStartCelebration}
          onToggleLanguage={toggleLanguage}
        />
      ) : (
        <div className="relative z-10 flex min-h-screen flex-col">
          {/* Subtle floating audio toggle without a header */}
          <button
            type="button"
            onClick={handleToggleAudio}
            aria-pressed={isPlaying}
            aria-label={
              isPlaying
                ? isAr
                  ? 'إيقاف الأغنية'
                  : 'Pause song'
                : isAr
                  ? 'تشغيل الأغنية'
                  : 'Play song'
            }
            className="fixed bottom-5 end-5 z-30 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#F5C451]/35 bg-[#0B1224]/92 text-[#F5C451] shadow-[0_8px_24px_rgba(0,0,0,0.45)] transition-colors duration-200 hover:border-[#F5C451] hover:bg-[#14203C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5C451] cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Volume2 className="h-5 w-5" aria-hidden="true" />
            )}
          </button>

          <main className="flex flex-1 flex-col justify-center">
            {/* Hero Celebration Stage */}
            <section
              id="celebration"
              className="mx-auto flex w-full max-w-5xl flex-col items-center px-5 pt-8 pb-4 text-center sm:px-8 sm:pt-10 lg:pt-12"
            >
              {/* Refined bunting banner accent */}
              <div className="mb-4 w-full max-w-[270px] sm:max-w-sm">
                <SmartImage
                  src="/assets/aistudio/banner_9ef5473d.png"
                  alt={isAr ? 'زينة عيد ميلاد سعيد' : 'Happy Birthday festive banner'}
                  fallbackVariant="banner"
                  fallbackLabel={isAr ? 'عيد ميلاد سعيد' : 'Happy Birthday'}
                  className="mx-auto h-auto w-full max-h-24 sm:max-h-28 object-contain opacity-95"
                />
              </div>

              {/* Clean unboxed editorial kicker */}
              <p className="text-sm font-semibold text-[#F5C451]">
                {isAr
                  ? 'يوم مميز · عام جديد من السعادة والنجاح'
                  : 'A Special Day · A New Year of Joy and Success'}
              </p>

              {/* Main Focal Title */}
              <h1 className="mt-3 max-w-4xl text-balance">
                <span className="font-display-calligraphy block text-[clamp(2.4rem,5.2vw,4rem)] leading-[1.2] font-bold text-[#FFFDF7]">
                  {isAr ? 'عيد ميلاد سعيد' : 'Happy Birthday'}
                </span>
                <span className="mt-1.5 block text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.15] font-extrabold tracking-tight text-[#F5C451]">
                  {celebrantName}
                </span>
              </h1>

              {/* Live Cycling Typewriter Wishes */}
              <div className="mt-4 w-full max-w-2xl">
                <TypewriterWishes phrases={typewriterPhrases} />
              </div>
            </section>

            {/* Centered Glowing Birthday Cake */}
            <InteractiveCake
              celebrantName={celebrantName}
              lang={lang}
              candleState={candleState}
              onToggleCandles={handleToggleCandles}
            />
          </main>

          {/* Quiet Footer */}
          <footer className="relative z-10 mt-6 border-t border-white/8 py-8">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 text-center sm:flex-row sm:px-8 sm:text-start">
              <p className="text-sm font-semibold text-[#E2E8F0]">
                {isAr
                  ? `كل عام وأنت بخير يا ${celebrantName}`
                  : `Happy Birthday, ${celebrantName}`}
              </p>
              <p className="text-xs text-[#94A3B8]">
                {isAr
                  ? 'صُمم خصيصاً للاحتفال بهذه المناسبة السعيدة'
                  : 'Designed with care for a joyful birthday celebration'}
              </p>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}

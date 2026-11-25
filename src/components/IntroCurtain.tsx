import { Globe, Play } from 'lucide-react';
import type { Language } from '../types';

interface IntroCurtainProps {
  celebrantName: string;
  lang: Language;
  onStart: () => void;
  onToggleLanguage: () => void;
}

export function IntroCurtain({
  celebrantName,
  lang,
  onStart,
  onToggleLanguage,
}: IntroCurtainProps) {
  const isAr = lang === 'ar';

  return (
    <main className="relative z-10 flex min-h-screen flex-col items-center justify-between px-5 py-8 sm:px-8">
      {/* Top quiet utility row */}
      <div className="flex w-full max-w-5xl items-center justify-between">
        <span className="text-sm font-semibold text-[#F5C451]/90 whitespace-nowrap shrink-0">
          {isAr ? 'دعوة احتفال خاصة' : 'Special Celebration'}
        </span>
        <button
          type="button"
          onClick={onToggleLanguage}
          aria-label={isAr ? 'Switch language to English' : 'تغيير اللغة إلى العربية'}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-white/12 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-[#E2E8F0] transition-colors duration-200 hover:border-[#F5C451]/40 hover:bg-white/[0.08] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5C451] whitespace-nowrap shrink-0"
        >
          <Globe className="h-4 w-4 text-[#F5C451]" aria-hidden="true" />
          <span>{isAr ? 'English' : 'العربية'}</span>
        </button>
      </div>

      {/* Central focal invitation */}
      <section className="my-auto flex w-full max-w-2xl flex-col items-center text-center py-8 sm:py-10">
        <div
          className="relative mb-5 flex h-36 w-44 sm:h-40 sm:w-48 items-center justify-center"
          style={{
            background:
              'radial-gradient(circle at 50% 42%, rgba(245, 196, 81, 0.22) 0%, rgba(245, 196, 81, 0.05) 45%, transparent 72%)',
          }}
        >
          <svg
            viewBox="0 0 220 190"
            className="h-full w-full overflow-visible"
            role="img"
            aria-label={
              isAr
                ? 'تورتة عيد ميلاد عليها رقم 47 وشموع مشتعلة'
                : 'Birthday cake with number 47 and glowing candles'
            }
          >
            <defs>
              <linearGradient id="cakeGoldPlate" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#9E701D" />
                <stop offset="50%" stopColor="#F5C451" />
                <stop offset="100%" stopColor="#9E701D" />
              </linearGradient>
              <linearGradient id="cakeTierBottom" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7A3E24" />
                <stop offset="100%" stopColor="#4A2213" />
              </linearGradient>
              <linearGradient id="cakeTierTop" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#944E2D" />
                <stop offset="100%" stopColor="#5D2B17" />
              </linearGradient>
              <linearGradient id="cakeIcing" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFF7DE" />
                <stop offset="100%" stopColor="#F3CF86" />
              </linearGradient>
              <linearGradient id="flameOuter" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFF099" />
                <stop offset="55%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#EA580C" />
              </linearGradient>
              <radialGradient id="flameHalo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFE885" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="goldNumber47" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFF4C2" />
                <stop offset="55%" stopColor="#F5C451" />
                <stop offset="100%" stopColor="#C98A1B" />
              </linearGradient>
            </defs>

            {/* Cake Plate */}
            <ellipse cx="110" cy="170" rx="82" ry="10" fill="url(#cakeGoldPlate)" />
            <ellipse cx="110" cy="168" rx="74" ry="6.5" fill="#1C2742" opacity="0.55" />

            {/* Bottom Cake Tier */}
            <rect x="40" y="114" width="140" height="54" rx="12" fill="url(#cakeTierBottom)" />
            {/* Bottom Tier Icing Drips */}
            <path
              d="M40 124 C40 116 46 114 54 114 L166 114 C174 114 180 116 180 124 L180 129 C174 134 168 124 160 129 C152 135 146 123 138 129 C130 136 123 124 115 128 C108 133 102 123 94 129 C86 135 78 124 70 129 C62 134 55 123 48 128 C44 131 40 129 40 124 Z"
              fill="url(#cakeIcing)"
            />

            {/* Top Cake Tier */}
            <rect x="62" y="72" width="96" height="44" rx="10" fill="url(#cakeTierTop)" />
            {/* Top Tier Icing Drips */}
            <path
              d="M62 81 C62 74 68 72 75 72 L145 72 C152 72 158 74 158 81 L158 85 C152 90 146 81 139 86 C132 92 125 81 118 86 C111 91 104 80 97 86 C90 91 83 81 76 86 C70 90 65 85 62 81 Z"
              fill="url(#cakeIcing)"
            />

            {/* Golden decorative pearls on bottom rim */}
            <circle cx="56" cy="162" r="2.6" fill="#F5C451" />
            <circle cx="74" cy="164" r="2.6" fill="#F5C451" />
            <circle cx="146" cy="164" r="2.6" fill="#F5C451" />
            <circle cx="164" cy="162" r="2.6" fill="#F5C451" />

            {/* Prominent Golden "47" Plaque on the Cake */}
            <rect
              x="81"
              y="129"
              width="58"
              height="31"
              rx="9"
              fill="#0B1326"
              stroke="#F5C451"
              strokeWidth="1.6"
            />
            <text
              x="110"
              y="152"
              textAnchor="middle"
              direction="ltr"
              unicodeBidi="bidi-override"
              fill="url(#goldNumber47)"
              fontSize="23"
              fontWeight="800"
              fontFamily="Cairo, sans-serif"
            >
              47
            </text>

            {/* Four Candles with Animated Flickering Flames */}
            {/* Candle 1 */}
            <g>
              <rect x="76" y="42" width="9" height="32" rx="3" fill="#F5C451" />
              <path d="M76 50 L85 46 M76 59 L85 55 M76 68 L85 64" stroke="#9E6B14" strokeWidth="1.6" />
              <line x1="80.5" y1="42" x2="80.5" y2="37" stroke="#CBD5E1" strokeWidth="1.4" />
              <g className="animate-flame-dance" style={{ animationDelay: '0s', animationDuration: '1.25s' }}>
                <circle cx="80.5" cy="28" r="13" fill="url(#flameHalo)" />
                <path
                  d="M80.5 16 C85.5 23 86.5 31 80.5 37 C74.5 31 75.5 23 80.5 16 Z"
                  fill="url(#flameOuter)"
                />
                <path
                  d="M80.5 23 C83 27 83.2 32 80.5 35.5 C77.8 32 78 27 80.5 23 Z"
                  fill="#FFFBEB"
                />
              </g>
            </g>

            {/* Candle 2 */}
            <g>
              <rect x="96" y="36" width="9" height="38" rx="3" fill="#38BDF8" />
              <path d="M96 45 L105 41 M96 54 L105 50 M96 63 L105 59" stroke="#0369A1" strokeWidth="1.6" />
              <line x1="100.5" y1="36" x2="100.5" y2="31" stroke="#CBD5E1" strokeWidth="1.4" />
              <g className="animate-flame-dance" style={{ animationDelay: '0.28s', animationDuration: '1.4s' }}>
                <circle cx="100.5" cy="22" r="14" fill="url(#flameHalo)" />
                <path
                  d="M100.5 9 C105.8 16.5 106.8 25 100.5 31 C94.2 25 95.2 16.5 100.5 9 Z"
                  fill="url(#flameOuter)"
                />
                <path
                  d="M100.5 17 C103 21 103.2 26 100.5 29.5 C97.8 26 98 21 100.5 17 Z"
                  fill="#FFFBEB"
                />
              </g>
            </g>

            {/* Candle 3 */}
            <g>
              <rect x="115" y="36" width="9" height="38" rx="3" fill="#FB7185" />
              <path d="M115 45 L124 41 M115 54 L124 50 M115 63 L124 59" stroke="#BE123C" strokeWidth="1.6" />
              <line x1="119.5" y1="36" x2="119.5" y2="31" stroke="#CBD5E1" strokeWidth="1.4" />
              <g className="animate-flame-dance" style={{ animationDelay: '0.52s', animationDuration: '1.18s' }}>
                <circle cx="119.5" cy="22" r="14" fill="url(#flameHalo)" />
                <path
                  d="M119.5 9 C124.8 16.5 125.8 25 119.5 31 C113.2 25 114.2 16.5 119.5 9 Z"
                  fill="url(#flameOuter)"
                />
                <path
                  d="M119.5 17 C122 21 122.2 26 119.5 29.5 C116.8 26 117 21 119.5 17 Z"
                  fill="#FFFBEB"
                />
              </g>
            </g>

            {/* Candle 4 */}
            <g>
              <rect x="135" y="42" width="9" height="32" rx="3" fill="#34D399" />
              <path d="M135 50 L144 46 M135 59 L144 55 M135 68 L144 64" stroke="#047857" strokeWidth="1.6" />
              <line x1="139.5" y1="42" x2="139.5" y2="37" stroke="#CBD5E1" strokeWidth="1.4" />
              <g className="animate-flame-dance" style={{ animationDelay: '0.16s', animationDuration: '1.32s' }}>
                <circle cx="139.5" cy="28" r="13" fill="url(#flameHalo)" />
                <path
                  d="M139.5 16 C144.5 23 145.5 31 139.5 37 C133.5 31 134.5 23 139.5 16 Z"
                  fill="url(#flameOuter)"
                />
                <path
                  d="M139.5 23 C142 27 142.2 32 139.5 35.5 C136.8 32 137 27 139.5 23 Z"
                  fill="#FFFBEB"
                />
              </g>
            </g>
          </svg>
        </div>

        <p className="mb-3 text-sm font-semibold tracking-wide text-[#CBD5E1]">
          {isAr ? 'لحظة سعيدة تستحق الاحتفال' : 'A special day worth celebrating'}
        </p>

        <h1 className="font-display-calligraphy text-balance text-[clamp(2.6rem,6vw,4.5rem)] leading-[1.2] font-bold text-[#FFFDF7]">
          {isAr ? 'عيد ميلاد سعيد' : 'Happy Birthday'}
        </h1>

        <p className="mt-3 text-balance text-[clamp(1.75rem,4.2vw,3rem)] font-extrabold tracking-tight text-[#F5C451]">
          {celebrantName}
        </p>

        <div className="mt-10">
          <button
            type="button"
            onClick={onStart}
            className="group inline-flex min-h-[54px] items-center justify-center gap-3 rounded-xl bg-[#F5C451] px-8 py-3.5 text-base font-bold text-[#060A14] shadow-[0_12px_36px_rgba(245,196,81,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#FAD26B] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5C451] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Play
              className="h-5 w-5 fill-current transition-transform duration-200 group-hover:scale-110"
              aria-hidden="true"
            />
            <span>{isAr ? 'ابدأ الاحتفال' : 'Start Celebration'}</span>
          </button>
        </div>
      </section>

      {/* Bottom quiet spacer line */}
      <footer className="text-xs text-[#94A3B8]/80">
        {isAr ? 'صنع بواسطة محمد عادل' : 'Made by Mohamed Adel'}
      </footer>
    </main>
  );
}

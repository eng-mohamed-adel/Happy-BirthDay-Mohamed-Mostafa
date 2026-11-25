import type { CandleState, Language } from '../types';
import { SmartImage } from './SmartImage';

interface InteractiveCakeProps {
  celebrantName: string;
  lang: Language;
  candleState: CandleState;
  onToggleCandles: () => void;
}

const CANDLE_POSITIONS = [
  { id: 1, left: '36.2%', top: '7.5%', delay: '0s' },
  { id: 2, left: '43.4%', top: '6.0%', delay: '0.25s' },
  { id: 3, left: '51.4%', top: '6.4%', delay: '0.5s' },
  { id: 4, left: '58.0%', top: '7.6%', delay: '0.15s' },
];

export function InteractiveCake({
  celebrantName,
  lang,
  candleState,
  onToggleCandles,
}: InteractiveCakeProps) {
  const isAr = lang === 'ar';
  const isLit = candleState === 'lit';

  return (
    <section
      id="cake"
      aria-label={isAr ? `تورتة عيد ميلاد ${celebrantName}` : `Birthday cake for ${celebrantName}`}
      data-candles={candleState}
      className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-5 pb-12 sm:px-8 sm:pb-16"
    >
      <div className="relative flex items-center justify-center">
        {/* Warm ambient golden light emitted when candles are lit */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/3 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 sm:h-96 sm:w-96"
          style={{
            opacity: isLit ? 0.92 : 0.16,
            background:
              'radial-gradient(circle at center, rgba(245, 196, 81, 0.34) 0%, rgba(251, 146, 60, 0.12) 40%, transparent 72%)',
          }}
        />

        <button
          type="button"
          onClick={onToggleCandles}
          aria-label={
            isLit
              ? isAr
                ? 'إطفاء شموع التورتة'
                : 'Blow out cake candles'
              : isAr
                ? 'إشعال شموع التورتة'
                : 'Relight cake candles'
          }
          className="relative mx-auto aspect-square w-[240px] sm:w-[300px] md:w-[320px] rounded-3xl transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5C451] cursor-pointer"
        >
          <SmartImage
            src="/assets/aistudio/cake_85f1209a.svg"
            alt={
              isAr
                ? `تورتة عيد ميلاد ${celebrantName}`
                : `Birthday cake for ${celebrantName}`
            }
            fallbackVariant="cake"
            fallbackLabel={isAr ? 'تورتة عيد الميلاد' : 'Birthday Cake'}
            className={`h-full w-full object-contain transition-opacity duration-500 ${
              isLit ? 'opacity-100' : 'opacity-80'
            }`}
          />

          {/* Positioned candle glows (lit) or gentle rising smoke (blown) */}
          {CANDLE_POSITIONS.map((candle) => (
            <div
              key={candle.id}
              aria-hidden="true"
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: candle.left, top: candle.top }}
            >
              {isLit ? (
                <span
                  className="animate-candle-flicker block h-9 w-9 rounded-full"
                  style={{
                    animationDelay: candle.delay,
                    background:
                      'radial-gradient(circle, rgba(255, 241, 168, 0.92) 0%, rgba(245, 180, 50, 0.45) 45%, transparent 72%)',
                  }}
                />
              ) : (
                <span
                  className="animate-smoke-rise block h-6 w-6 rounded-full"
                  style={{
                    animationDelay: candle.delay,
                    background:
                      'radial-gradient(circle, rgba(203, 213, 225, 0.55) 0%, transparent 72%)',
                  }}
                />
              )}
            </div>
          ))}
        </button>
      </div>
    </section>
  );
}

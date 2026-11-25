import { memo } from 'react';

interface StarParticle {
  id: number;
  left: string;
  size: number;
  duration: string;
  delay: string;
  opacity: number;
}

const STAR_PARTICLES: StarParticle[] = [
  { id: 1, left: '6%', size: 4, duration: '15s', delay: '0s', opacity: 0.65 },
  { id: 2, left: '14%', size: 6, duration: '19s', delay: '-4s', opacity: 0.5 },
  { id: 3, left: '23%', size: 3, duration: '14s', delay: '-8s', opacity: 0.7 },
  { id: 4, left: '34%', size: 5, duration: '21s', delay: '-2s', opacity: 0.45 },
  { id: 5, left: '46%', size: 4, duration: '16s', delay: '-11s', opacity: 0.6 },
  { id: 6, left: '57%', size: 6, duration: '22s', delay: '-6s', opacity: 0.4 },
  { id: 7, left: '68%', size: 3, duration: '13s', delay: '-9s', opacity: 0.7 },
  { id: 8, left: '79%', size: 5, duration: '18s', delay: '-3s', opacity: 0.55 },
  { id: 9, left: '88%', size: 4, duration: '17s', delay: '-13s', opacity: 0.6 },
  { id: 10, left: '94%', size: 5, duration: '20s', delay: '-7s', opacity: 0.45 },
];

export const AmbientBackground = memo(function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-celebration-canvas"
    >
      {/* Subtle architectural hairlines */}
      <div className="absolute inset-0 bg-subtle-grid opacity-70" />

      {/* Warm champagne & royal indigo ambient light pools (pure radial gradients, zero blur filter cost) */}
      <div
        className="absolute -top-36 start-1/2 h-[34rem] w-[52rem] -translate-x-1/2"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(245, 196, 81, 0.16) 0%, rgba(245, 196, 81, 0.05) 38%, transparent 70%)',
        }}
      />
      <div
        className="absolute -bottom-32 -end-24 h-[30rem] w-[30rem]"
        style={{
          background:
            'radial-gradient(circle at center, rgba(37, 99, 235, 0.18) 0%, rgba(37, 99, 235, 0.05) 42%, transparent 70%)',
        }}
      />

      {/* Gentle drifting star particles */}
      {STAR_PARTICLES.map((star) => (
        <span
          key={star.id}
          className="animate-star-drift absolute -top-6 rounded-full bg-[#F5C451] will-change-transform"
          style={{
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: star.duration,
            animationDelay: star.delay,
            opacity: star.opacity,
          }}
        />
      ))}

      {/* Vignette edge framing */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, transparent 55%, rgba(4, 7, 15, 0.62) 100%)',
        }}
      />
    </div>
  );
});

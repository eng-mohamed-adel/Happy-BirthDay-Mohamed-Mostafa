import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

export interface ConfettiCanvasHandle {
  burst: (originXRatio?: number, originYRatio?: number) => void;
}

interface ConfettiCanvasProps {
  active: boolean;
}

interface PaperParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  angle: number;
  spin: number;
  tilt: number;
  tiltSpeed: number;
  color: string;
  alpha: number;
  isBurst: boolean;
}

const CELEBRATION_COLORS = [
  '#F5C451', // champagne gold
  '#FFE6A3', // soft warm ivory gold
  '#38BDF8', // sky sapphire
  '#34D399', // emerald accent
  '#FB7185', // festive coral rose
  '#E2E8F0', // crisp silver
];

export const ConfettiCanvas = forwardRef<ConfettiCanvasHandle, ConfettiCanvasProps>(
  function ConfettiCanvas({ active }, ref) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const particlesRef = useRef<PaperParticle[]>([]);
    const sizeRef = useRef({ width: 0, height: 0 });
    const reducedMotionRef = useRef(false);

    useImperativeHandle(ref, () => ({
      burst(originXRatio = 0.5, originYRatio = 0.42) {
        if (reducedMotionRef.current) return;
        const { width, height } = sizeRef.current;
        if (!width || !height) return;

        const cx = width * originXRatio;
        const cy = height * originYRatio;
        const count = width < 640 ? 32 : 52;

        for (let i = 0; i < count; i++) {
          const theta = Math.random() * Math.PI * 2;
          const speed = 2.8 + Math.random() * 7.2;
          particlesRef.current.push({
            x: cx,
            y: cy,
            vx: Math.cos(theta) * speed,
            vy: Math.sin(theta) * speed - 3.6,
            w: 6 + Math.random() * 5,
            h: 4 + Math.random() * 4,
            angle: Math.random() * Math.PI * 2,
            spin: (Math.random() - 0.5) * 0.22,
            tilt: Math.random() * Math.PI,
            tiltSpeed: 0.08 + Math.random() * 0.12,
            color:
              CELEBRATION_COLORS[
                Math.floor(Math.random() * CELEBRATION_COLORS.length)
              ],
            alpha: 1,
            isBurst: true,
          });
        }

        // Keep total particle pool bounded for smooth performance
        if (particlesRef.current.length > 120) {
          particlesRef.current = particlesRef.current.slice(-120);
        }
      },
    }));

    useEffect(() => {
      if (!active) return;

      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      reducedMotionRef.current = mediaQuery.matches;
      const handleMotionChange = (e: MediaQueryListEvent) => {
        reducedMotionRef.current = e.matches;
      };
      mediaQuery.addEventListener?.('change', handleMotionChange);

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
        const width = window.innerWidth;
        const height = window.innerHeight;
        sizeRef.current = { width, height };
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };

      resize();
      window.addEventListener('resize', resize);

      // Seed ambient falling confetti particles
      const ambientCount = window.innerWidth < 640 ? 22 : 38;
      const createAmbient = (randomY: boolean): PaperParticle => ({
        x: Math.random() * sizeRef.current.width,
        y: randomY ? Math.random() * sizeRef.current.height : -20 - Math.random() * 60,
        vx: (Math.random() - 0.5) * 0.85,
        vy: 1.0 + Math.random() * 1.4,
        w: 6 + Math.random() * 4,
        h: 4 + Math.random() * 3,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.08,
        tilt: Math.random() * Math.PI,
        tiltSpeed: 0.05 + Math.random() * 0.08,
        color:
          CELEBRATION_COLORS[
            Math.floor(Math.random() * CELEBRATION_COLORS.length)
          ],
        alpha: 0.72 + Math.random() * 0.25,
        isBurst: false,
      });

      particlesRef.current = Array.from({ length: ambientCount }, () =>
        createAmbient(true)
      );

      let frameId = 0;
      let lastTime = performance.now();

      const draw = (now: number) => {
        frameId = window.requestAnimationFrame(draw);

        const elapsed = now - lastTime;
        if (elapsed < 32) return;
        const dt = Math.min(elapsed / 16.666, 2.5);
        lastTime = now;

        const { width, height } = sizeRef.current;
        ctx.clearRect(0, 0, width, height);

        if (!reducedMotionRef.current) {
          const nextParticles: PaperParticle[] = [];

          for (let i = 0; i < particlesRef.current.length; i++) {
            const p = particlesRef.current[i];

            if (p.isBurst) {
              p.vy += 0.14 * dt;
              p.vx *= Math.pow(0.985, dt);
              p.alpha -= 0.011 * dt;
            } else {
              p.vx += Math.sin(p.tilt) * 0.025 * dt;
              p.vx = Math.max(-1.4, Math.min(1.4, p.vx));
            }

            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.angle += p.spin * dt;
            p.tilt += p.tiltSpeed * dt;

            if (!p.isBurst && p.y > height + 24) {
              nextParticles.push(createAmbient(false));
              continue;
            }

            if (p.isBurst && (p.alpha <= 0.02 || p.y > height + 40)) {
              continue;
            }

            const scaleY = Math.cos(p.tilt);
            ctx.save();
            ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle);
            ctx.scale(1, Math.abs(scaleY) < 0.2 ? 0.2 : scaleY);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();

            nextParticles.push(p);
          }

          particlesRef.current = nextParticles;
        }
      };

      frameId = window.requestAnimationFrame(draw);

      return () => {
        window.cancelAnimationFrame(frameId);
        window.removeEventListener('resize', resize);
        mediaQuery.removeEventListener?.('change', handleMotionChange);
      };
    }, [active]);

    if (!active) return null;

    return (
      <canvas
        ref={canvasRef}
        data-testid="confetti-canvas"
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-20 h-full w-full"
      />
    );
  }
);

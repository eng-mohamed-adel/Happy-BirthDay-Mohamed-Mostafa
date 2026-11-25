import { useEffect, useState } from 'react';

interface TypewriterWishesProps {
  phrases: string[];
}

export function TypewriterWishes({ phrases }: TypewriterWishesProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Reset cleanly whenever language or celebrant name changes
  const phrasesKey = phrases.join('|');
  useEffect(() => {
    setPhraseIndex(0);
    setCharIndex(0);
    setIsDeleting(false);
  }, [phrasesKey]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const currentPhrase = phrases[phraseIndex % phrases.length] || '';

    if (prefersReduced) {
      setCharIndex(currentPhrase.length);
      const timer = window.setTimeout(() => {
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }, 4000);
      return () => window.clearTimeout(timer);
    }

    let timeoutMs = isDeleting ? 28 : 56;

    if (!isDeleting && charIndex >= currentPhrase.length) {
      timeoutMs = 2400;
    } else if (isDeleting && charIndex <= 0) {
      timeoutMs = 380;
    }

    const timer = window.setTimeout(() => {
      if (!isDeleting && charIndex < currentPhrase.length) {
        setCharIndex((c) => c + 1);
      } else if (!isDeleting && charIndex >= currentPhrase.length) {
        setIsDeleting(true);
      } else if (isDeleting && charIndex > 0) {
        setCharIndex((c) => c - 1);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }, timeoutMs);

    return () => window.clearTimeout(timer);
  }, [charIndex, isDeleting, phraseIndex, phrases]);

  const activeText = (phrases[phraseIndex % phrases.length] || '').slice(
    0,
    charIndex
  );

  return (
    <div
      aria-live="polite"
      className="min-h-[3.5rem] sm:min-h-[4rem] flex items-center justify-center"
    >
      <p className="text-balance text-lg font-semibold leading-relaxed text-[#E2E8F0] sm:text-xl md:text-2xl">
        <span>{activeText}</span>
        <span
          aria-hidden="true"
          className="animate-cursor-blink ms-1 inline-block h-[1.1em] w-[2px] align-middle bg-[#F5C451]"
        />
      </p>
    </div>
  );
}

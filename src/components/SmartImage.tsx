import { useState, type ImgHTMLAttributes } from 'react';
import { Cake, Sparkles } from 'lucide-react';

interface SmartImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackVariant?: 'cake' | 'banner' | 'balloons' | 'generic';
  fallbackLabel?: string;
}

export function SmartImage({
  src,
  alt,
  className = '',
  fallbackVariant = 'generic',
  fallbackLabel,
  ...rest
}: SmartImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        role="img"
        aria-label={alt || fallbackLabel || 'Celebration illustration'}
        className={`flex flex-col items-center justify-center gap-2 rounded-2xl border border-[#F5C451]/20 bg-gradient-to-br from-[#10192E] via-[#0B1224] to-[#17213A] p-6 text-[#F5C451] ${className}`}
      >
        {fallbackVariant === 'cake' ? (
          <Cake className="h-12 w-12 opacity-85" aria-hidden="true" />
        ) : (
          <Sparkles className="h-8 w-8 opacity-85" aria-hidden="true" />
        )}
        {fallbackLabel ? (
          <span className="text-sm font-semibold text-[#F5F7FA]/85">{fallbackLabel}</span>
        ) : null}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      {...rest}
    />
  );
}

import {useState} from 'react';
import {ShieldCheck} from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export function ResilientImage({src, alt, className = '', fallbackLabel}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#e8f5e9] to-[#d2ddd2] text-[#1b6b3a] p-6 text-center ${className}`}
      >
        <ShieldCheck className="w-8 h-8 text-[#1b6b3a]" aria-hidden="true" />
        <span className="text-sm font-semibold text-[#141e17]">{fallbackLabel || alt}</span>
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
    />
  );
}

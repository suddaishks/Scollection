import React, { useState } from 'react';
import { BRAND_LOGO_IMG } from '../data/images';

/**
 * -------------------------------------------------------------
 * 🌟 SUDDAIS COLLECTION - LOGO COMPONENT
 * -------------------------------------------------------------
 * HOW TO EDIT OR CHANGE YOUR LOGO VIA GITHUB:
 * Option 1: Simply upload your logo image file named "logo.png" into the
 *           "public/assets/logo.png" or "public/logo.png" folder.
 * Option 2: Change the src path below or paste your image URL directly!
 * -------------------------------------------------------------
 */

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md'
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-2xl'
  };

  const defaultSizeClass = className.includes('w-') ? '' : sizeClasses[size];
  const imageSrc = BRAND_LOGO_IMG || '/assets/logo.png';

  return (
    <div
      className={`relative rounded-xl overflow-hidden shadow-xs border border-[#d4af37]/40 bg-white flex items-center justify-center shrink-0 ${defaultSizeClass} ${className}`}
      title="Suddais Collection Logo"
    >
      {!imageError ? (
        <img
          src={imageSrc}
          alt="Suddais Collection Logo"
          className="w-full h-full object-cover rounded-xl"
          onError={() => setImageError(true)}
        />
      ) : (
        /* Royal Golden Fallback Monogram if image is missing */
        <div className="w-full h-full bg-gradient-to-br from-[#d4af37] via-[#b8860b] to-[#8b6508] text-white flex items-center justify-center font-serif font-black tracking-tighter">
          <span>SC</span>
        </div>
      )}
    </div>
  );
};

import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: 'light' | 'dark' | 'color';
}

export const Logo: React.FC<LogoProps> = ({ className = "", showText = true, variant = 'color' }) => {
  const primaryColor = variant === 'light' ? '#FFFFFF' : variant === 'dark' ? '#000000' : '#0B3D2E';
  const accentColor = variant === 'color' ? '#D4A017' : primaryColor;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width="48"
        height="48"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* The Symbol: "The Nexus of Growth" */}
        <path
          d="M50 5L85 25V75L50 95L15 75V25L50 5Z"
          stroke={primaryColor}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        {/* Growth Leaf / Apex */}
        <path
          d="M50 15L70 35H30L50 15Z"
          fill={accentColor}
        />
        {/* Interconnected Nodes (Simplified) */}
        <circle cx="50" cy="55" r="6" fill={primaryColor} />
        <circle cx="30" cy="45" r="4" fill={primaryColor} opacity="0.6" />
        <circle cx="70" cy="45" r="4" fill={primaryColor} opacity="0.6" />
        <circle cx="30" cy="65" r="4" fill={primaryColor} opacity="0.6" />
        <circle cx="70" cy="65" r="4" fill={primaryColor} opacity="0.6" />
        
        {/* Connection Lines */}
        <line x1="50" y1="55" x2="30" y2="45" stroke={primaryColor} strokeWidth="1" opacity="0.4" />
        <line x1="50" y1="55" x2="70" y2="45" stroke={primaryColor} strokeWidth="1" opacity="0.4" />
        <line x1="50" y1="55" x2="30" y2="65" stroke={primaryColor} strokeWidth="1" opacity="0.4" />
        <line x1="50" y1="55" x2="70" y2="65" stroke={primaryColor} strokeWidth="1" opacity="0.4" />

        {/* Subtle Africa Notch at the Base */}
        <path
          d="M45 95L50 90L55 95"
          stroke={primaryColor}
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
      
      {showText && (
        <div className="flex flex-col leading-none">
          <span 
            className="text-xl font-bold tracking-tighter uppercase"
            style={{ color: primaryColor, fontFamily: 'Inter, sans-serif' }}
          >
            KULIMA
          </span>
          <span 
            className="text-sm font-medium tracking-[0.3em] uppercase opacity-60"
            style={{ color: primaryColor }}
          >
            AFRICA
          </span>
        </div>
      )}
    </div>
  );
};

export const LogoIcon: React.FC<{ className?: string, variant?: 'light' | 'dark' | 'color' }> = ({ className, variant }) => (
  <Logo className={className} showText={false} variant={variant} />
);

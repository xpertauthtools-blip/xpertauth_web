interface FlagProps {
  className?: string;
}

export function FlagES({ className = "w-5 h-4" }: FlagProps) {
  return (
    <svg viewBox="0 0 20 14" className={className} aria-hidden="true">
      <rect width="20" height="14" rx="1.5" fill="#C60B1E" />
      <rect y="3.5" width="20" height="7" fill="#FFC400" />
    </svg>
  );
}

export function FlagCA({ className = "w-5 h-4" }: FlagProps) {
  return (
    <svg viewBox="0 0 20 14" className={className} aria-hidden="true">
      <rect width="20" height="14" rx="1.5" fill="#FCDD09" />
      <rect y="1.56" width="20" height="1.56" fill="#DA121A" />
      <rect y="4.67" width="20" height="1.56" fill="#DA121A" />
      <rect y="7.78" width="20" height="1.56" fill="#DA121A" />
      <rect y="10.89" width="20" height="1.56" fill="#DA121A" />
      <polygon points="0,0 0,14 8,7" fill="#003DA5" />
      <polygon
        points="4,4.34 4.47,5.78 5.97,5.78 4.75,6.67 5.21,8.11 4,7.22 2.79,8.11 3.25,6.67 2.03,5.78 3.53,5.78"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function FlagEN({ className = "w-5 h-4" }: FlagProps) {
  return (
    <svg viewBox="0 0 20 14" className={className} aria-hidden="true">
      <rect width="20" height="14" rx="1.5" fill="#012169" />
      <path d="M0,0 L20,14 M20,0 L0,14" stroke="#FFF" strokeWidth="2.4" />
      <path d="M0,0 L20,14 M20,0 L0,14" stroke="#C8102E" strokeWidth="0.8" />
      <path d="M10,0 V14 M0,7 H20" stroke="#FFF" strokeWidth="4" />
      <path d="M10,0 V14 M0,7 H20" stroke="#C8102E" strokeWidth="2.4" />
    </svg>
  );
}

export function FlagFR({ className = "w-5 h-4" }: FlagProps) {
  return (
    <svg viewBox="0 0 20 14" className={className} aria-hidden="true">
      <rect width="20" height="14" rx="1.5" fill="#FFF" />
      <rect width="6.67" height="14" fill="#002395" />
      <rect x="13.33" width="6.67" height="14" fill="#ED2939" />
    </svg>
  );
}

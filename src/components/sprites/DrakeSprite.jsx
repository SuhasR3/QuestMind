const SPRITE_VARIANTS = {
  fog_drake: { className: 'drake-sprite--fog', label: 'Fog Drake' },
  the_static: { className: 'drake-sprite--vortex', label: 'The Static' },
  the_weight: { className: 'drake-sprite--static', label: 'The Weight' },
  mirror_twin: { className: 'drake-sprite--mirror', label: 'Mirror Twin' },
};

export default function DrakeSprite({ scale, opacity, defeated, questId }) {
  const variant = SPRITE_VARIANTS[questId];

  if (variant) {
    return (
      <div
        className={`drake-sprite ${variant.className} ${defeated ? 'drake-sprite--defeated' : ''}`}
        style={{
          transform: `scale(${scale})`,
          opacity,
          transition: 'transform 0.8s ease, opacity 0.8s ease',
        }}
        role="img"
        aria-label={variant.label}
      />
    );
  }

  return (
    <svg
      className={`drake-sprite ${defeated ? 'drake-sprite--defeated' : ''}`}
      viewBox="0 0 220 170"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: `scale(${scale})`,
        opacity,
        transition: 'transform 0.8s ease, opacity 0.8s ease',
      }}
      role="img"
      aria-label="Fog Drake"
    >
      <defs>
        <radialGradient id="drakeFog" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3d2d5e" stopOpacity="0.5" />
          <stop offset="70%" stopColor="#2a1d45" stopOpacity="0.2" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd85a" stopOpacity="1" />
          <stop offset="50%" stopColor="#e8a317" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#c07810" stopOpacity="0" />
        </radialGradient>
        <filter id="drakeBlur">
          <feGaussianBlur stdDeviation="2" />
        </filter>
        <filter id="fogBlur">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      <ellipse cx="110" cy="85" rx="100" ry="70" fill="url(#drakeFog)" filter="url(#fogBlur)" />

      <path
        d="M 30 90 Q 60 60 100 70 Q 140 55 180 75"
        fill="none"
        stroke="#3d2d5e"
        strokeWidth="8"
        strokeLinecap="round"
        opacity="0.2"
        filter="url(#drakeBlur)"
      />
      <path
        d="M 50 110 Q 90 95 130 100 Q 170 90 200 105"
        fill="none"
        stroke="#2d1f4e"
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.15"
        filter="url(#drakeBlur)"
      />

      <ellipse cx="110" cy="85" rx="72" ry="48" fill="#2a1d45" opacity="0.75" />
      <ellipse cx="115" cy="82" rx="58" ry="38" fill="#322555" opacity="0.5" />

      <path
        d="M 70 60 Q 55 45 45 55 Q 55 50 70 65"
        fill="#3d2d5e"
        opacity="0.8"
      />

      <ellipse cx="55" cy="62" rx="30" ry="22" fill="#362860" />
      <ellipse cx="55" cy="62" rx="26" ry="18" fill="#3d2d5e" />

      <ellipse cx="32" cy="68" rx="14" ry="9" fill="#3d2d5e" />
      <path
        d="M 20 68 Q 30 62 40 65"
        fill="none"
        stroke="#4d3d6e"
        strokeWidth="1.5"
      />

      <path d="M 42 48 L 32 28 L 46 44" fill="#4d3d6e" stroke="#5d4d7e" strokeWidth="1" />
      <path d="M 62 44 L 58 22 L 68 40" fill="#4d3d6e" stroke="#5d4d7e" strokeWidth="1" />

      <ellipse cx="44" cy="58" rx="5" ry="4" fill="url(#eyeGlow)" />
      <ellipse cx="62" cy="56" rx="5" ry="4" fill="url(#eyeGlow)" />
      <ellipse cx="44" cy="58" rx="2.5" ry="2.2" fill="#ffd85a" />
      <ellipse cx="62" cy="56" rx="2.5" ry="2.2" fill="#ffd85a" />
      <ellipse cx="44" cy="58" rx="1" ry="2" fill="#1a0f2e" />
      <ellipse cx="62" cy="56" rx="1" ry="2" fill="#1a0f2e" />

      <path
        d="M 22 72 Q 35 78 48 72"
        fill="none"
        stroke="#5d4d7e"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="M 130 50 Q 165 22 190 45 Q 170 40 140 58"
        fill="#2a1d45"
        opacity="0.55"
        stroke="#362860"
        strokeWidth="0.5"
      />
      <path
        d="M 128 55 Q 155 30 175 48 Q 158 44 135 60"
        fill="#322555"
        opacity="0.35"
      />

      <path
        d="M 125 100 Q 160 115 185 98 Q 160 105 130 95"
        fill="#2a1d45"
        opacity="0.4"
      />

      <path
        d="M 170 85 Q 190 78 200 82 Q 208 88 202 95 Q 195 90 185 88"
        fill="#2a1d45"
        opacity="0.5"
        stroke="#322555"
        strokeWidth="1"
      />

      <path d="M 80 95 Q 110 105 140 95" fill="none" stroke="#4d3d6e" strokeWidth="0.8" opacity="0.3" />
      <path d="M 85 100 Q 110 108 135 100" fill="none" stroke="#4d3d6e" strokeWidth="0.6" opacity="0.2" />
    </svg>
  );
}

export default function PlayerSprite({ actionEffect }) {
  const effectClass = actionEffect ? `player-sprite--${
    actionEffect === 'a' ? 'approach' : actionEffect === 'b' ? 'observe' : 'ground'
  }` : '';

  return (
    <svg
      className={`player-sprite ${effectClass}`}
      viewBox="0 0 100 150"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Player character"
    >
      <defs>
        <radialGradient id="playerAura" cx="50%" cy="50%" r="50%">
          <stop
            offset="0%"
            stopColor={
              actionEffect === 'a' ? '#e8a317'
              : actionEffect === 'b' ? '#17a5c8'
              : actionEffect === 'c' ? '#2db87a'
              : '#6b5bb5'
            }
            stopOpacity="0.3"
          />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cloakGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a3f5f" />
          <stop offset="100%" stopColor="#162240" />
        </linearGradient>
        <radialGradient id="orbGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7ba4e8" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#5580c0" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#3d6099" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Aura */}
      <ellipse cx="50" cy="85" rx="42" ry="55" fill="url(#playerAura)" />

      {/* Staff */}
      <line x1="72" y1="28" x2="72" y2="128" stroke="#7a6844" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="72" y1="28" x2="72" y2="128" stroke="#9a8864" strokeWidth="1.5" strokeLinecap="round" />

      {/* Staff orb */}
      <circle cx="72" cy="23" r="7" fill="url(#orbGlow)" />
      <circle cx="72" cy="23" r="3.5" fill="#a0c4f0" opacity="0.8" />

      {/* Cloak body */}
      <path
        d="M 50 55 L 26 130 Q 50 138 74 130 L 50 55 Z"
        fill="url(#cloakGrad)"
        stroke="#1a2d48"
        strokeWidth="1"
      />

      {/* Cloak inner fold */}
      <path d="M 50 65 L 38 125 Q 50 130 50 125 Z" fill="#1e3352" opacity="0.6" />

      {/* Hood */}
      <path
        d="M 34 58 Q 42 28 50 26 Q 58 28 66 58 Q 50 62 34 58 Z"
        fill="#1e3352"
        stroke="#162845"
        strokeWidth="1"
      />

      {/* Face shadow */}
      <ellipse cx="50" cy="50" rx="10" ry="8" fill="#0f1a2b" />

      {/* Eyes */}
      <circle cx="45" cy="48" r="1.8" fill="#c8d8f0" />
      <circle cx="55" cy="48" r="1.8" fill="#c8d8f0" />
      <circle cx="45" cy="48" r="0.8" fill="#e8f0ff" />
      <circle cx="55" cy="48" r="0.8" fill="#e8f0ff" />

      {/* Shoulder detail */}
      <path d="M 34 58 Q 40 56 50 58" fill="none" stroke="#2a4060" strokeWidth="1.5" />
      <path d="M 66 58 Q 60 56 50 58" fill="none" stroke="#2a4060" strokeWidth="1.5" />
    </svg>
  );
}

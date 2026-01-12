export default function HeroFusionBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Background gradient */}
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0f2a1f" />
          <stop offset="35%" stopColor="#07100c" />
          <stop offset="100%" stopColor="#040605" />
        </linearGradient>

        {/* Flow gradient */}
        <linearGradient id="flow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22ff8c" stopOpacity="0.25" />
          <stop offset="50%" stopColor="#22ff8c" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#22ff8c" stopOpacity="0.9" />
        </linearGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      {/* Background */}
      <rect width="1600" height="900" fill="url(#bg)" />

      {/* ===== FLOW LINES (LEFT → CENTER → RIGHT) ===== */}
      {[ -120, -60, 0, 60, 120 ].map((o, i) => (
        <path
          key={i}
          d={`
            M100 ${450 + o}
            C400 ${450 + o - 40},
              600 ${450 + o + 40},
              800 450
            C1000 ${450 + o + 40},
              1180 ${450 + o - 20},
              1400 ${450 + o}
          `}
          stroke="url(#flow)"
          strokeWidth="2"
          fill="none"
        />
      ))}

      {/* ===== LEFT DATA SOURCE ICONS ===== */}
      {[
        [220, 330], [260, 390], [300, 450], [260, 510], [220, 570]
      ].map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="10"
          stroke="#22ff8c"
          strokeWidth="1.5"
          fill="rgba(34,255,140,0.15)"
        />
      ))}

      {/* ===== CENTRAL PROCESSING SYSTEM ===== */}
      <g transform="translate(800 450)">
        <circle
          r="85"
          stroke="#22ff8c"
          strokeWidth="2"
          fill="rgba(34,255,140,0.08)"
          filter="url(#glow)"
        />
        <circle
          r="55"
          stroke="#22ff8c"
          strokeWidth="1"
          fill="none"
          opacity="0.6"
        />

        {/* Server icon */}
        <rect x="-24" y="-18" width="48" height="36" rx="4" fill="#22ff8c" />
        <rect x="-18" y="-12" width="36" height="24" rx="3" fill="#0b0f0e" />
        <circle cx="-10" cy="0" r="2" fill="#22ff8c" />
        <circle cx="0" cy="0" r="2" fill="#22ff8c" />
        <circle cx="10" cy="0" r="2" fill="#22ff8c" />
      </g>

      {/* ===== RIGHT FLOW TERMINATION DOTS (TO LOGIN) ===== */}
      {[
        [1180, 360], [1220, 420], [1220, 480], [1180, 540]
      ].map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="6"
          fill="#22ff8c"
          opacity="0.9"
        />
      ))}
    </svg>
  );
}

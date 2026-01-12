export default function HeroSystemDiagram() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ===== WAVES (LEFT → CENTER → RIGHT) ===== */}
      {[
        -120, -60, 0, 60, 120
      ].map((offset, i) => (
        <path
          key={i}
          d={`
            M0 ${450 + offset}
            C400 ${420 + offset},
              600 ${480 + offset},
              800 450
            C1000 ${420 + offset},
              1200 ${480 + offset},
              1600 ${450 + offset}
          `}
          stroke="rgba(34,255,140,0.45)"
          strokeWidth="2"
          fill="none"
        />
      ))}

      {/* ===== DOTS ON WAVES ===== */}
      {[
        [300, 330], [500, 380], [700, 420],
        [900, 420], [1100, 380], [1300, 330]
      ].map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="5"
          fill="#22ff8c"
          opacity="0.9"
        />
      ))}

      {/* ===== CENTRAL FUSION NODE ===== */}
      <g transform="translate(800 450)">
        <circle
          r="70"
          stroke="#22ff8c"
          strokeWidth="2"
          fill="rgba(34,255,140,0.05)"
          filter="url(#softGlow)"
        />
        <circle r="6" fill="#22ff8c" />
        <rect
          x="-20"
          y="-14"
          width="40"
          height="28"
          rx="4"
          fill="#22ff8c"
        />
        <rect
          x="-14"
          y="-10"
          width="28"
          height="20"
          rx="3"
          fill="#0b0f0e"
        />
      </g>
    </svg>
  );
}

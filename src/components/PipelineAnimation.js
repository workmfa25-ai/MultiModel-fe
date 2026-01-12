// export default function PipelineAnimation() {
//   return (
//     <svg
//       className="w-full h-full"
//       viewBox="0 0 600 400"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <defs>
//         {/* Glow */}
//         <filter id="strongGlow">
//           <feGaussianBlur stdDeviation="4" result="blur" />
//           <feMerge>
//             <feMergeNode in="blur" />
//             <feMergeNode in="SourceGraphic" />
//           </feMerge>
//         </filter>

//         {/* Animated gradient */}
//         <linearGradient id="flowGradient" gradientUnits="userSpaceOnUse">
//           <stop offset="0%" stopColor="rgba(34,197,94,0)" />
//           <stop offset="50%" stopColor="rgba(34,255,140,0.95)" />
//           <stop offset="100%" stopColor="rgba(34,197,94,0)" />
//         </linearGradient>
//       </defs>

//       {/* Base paths (subtle background) */}
//       {[
//         'M20 90 C200 90, 300 160, 580 160',
//         'M20 150 C220 150, 330 220, 580 220',
//         'M20 210 C200 210, 300 260, 580 260',
//         'M20 270 C220 270, 330 310, 580 310',
//       ].map((d, i) => (
//         <path
//           key={`base-${i}`}
//           d={d}
//           stroke="rgba(34,197,94,0.25)"
//           strokeWidth="2.5"
//           fill="none"
//         />
//       ))}

//       {/* Animated flow */}
//       {[
//         'M20 90 C200 90, 300 160, 580 160',
//         'M20 150 C220 150, 330 220, 580 220',
//         'M20 210 C200 210, 300 260, 580 260',
//       ].map((d, i) => (
//         <path
//           key={`anim-${i}`}
//           d={d}
//           stroke="url(#flowGradient)"
//           strokeWidth="4"
//           fill="none"
//           filter="url(#strongGlow)"
//           strokeDasharray="10 260"
//           className={`pipeline-flow pipeline-delay-${i}`}
//         />
//       ))}

//       {/* Rotating fusion wheels */}
//       {[160, 220, 280].map((y, i) => (
//         <g
//           key={`wheel-${i}`}
//           className={`fusion-wheel fusion-delay-${i}`}
//           transform={`translate(420 ${y})`}
//         >
//           <circle
//             cx="0"
//             cy="0"
//             r="16"
//             stroke="rgba(34,255,140,0.7)"
//             strokeWidth="2"
//             fill="none"
//           />
//           <circle
//             cx="0"
//             cy="0"
//             r="6"
//             fill="rgba(34,255,140,0.9)"
//           />
//         </g>
//       ))}
//     </svg>
//   );
// }

export default function PipelineAnimation() {
  const lines = [
    { y: 110, curve: -30 },
    { y: 160, curve: -15 },
    { y: 210, curve: 15 },
    { y: 260, curve: 30 },
  ];

  // staggered wheels per line (as you requested earlier)
  const wheelLayout = [
    [220, 540], // line 1
    [380],      // line 2
    [220, 540], // line 3
    [380],      // line 4
  ];

  // diagonal slope factor (controls slant)
  const slope = 0.08; // increase → more slant

  const wavePath = (line) => `
    M40 ${line.y}
    C160 ${line.y + line.curve + 160 * slope},
      280 ${line.y - line.curve + 280 * slope},
      400 ${line.y + 400 * slope}
    S560 ${line.y + line.curve + 560 * slope},
      660 ${line.y + 660 * slope}
  `;

  // y-position of wheel ON the slanted wave
  const yAtX = (line, x) => line.y + x * slope;

  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 700 400"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient id="packetGradient">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#22ff8c" />
        </linearGradient>
      </defs>

      {/* === DIAGONAL WAVY LINES === */}
      {lines.map((line, i) => (
        <path
          key={`line-${i}`}
          d={wavePath(line)}
          stroke="rgba(34,197,94,0.45)"
          strokeWidth="2.5"
          fill="none"
        />
      ))}

      {/* === DATA PACKETS (ON DIAGONAL WAVES) === */}
      {lines.map((line, lineIdx) =>
        Array.from({ length: 5 }).map((_, pktIdx) => (
          <rect
            key={`packet-${lineIdx}-${pktIdx}`}
            width="7"
            height="7"
            rx="2"
            fill="url(#packetGradient)"
            filter="url(#glow)"
            opacity="0.95"
          >
            <animateMotion
              dur={`${6 + lineIdx}s`}
              begin={`${pktIdx * 1.2}s`}
              repeatCount="indefinite"
              path={wavePath(line)}
            />
          </rect>
        ))
      )}

      {/* === STAGGERED TRANSFORMATION WHEELS (ON SLOPE) === */}
      {lines.map((line, lineIdx) =>
        wheelLayout[lineIdx].map((x, idx) => (
          <g
            key={`wheel-${lineIdx}-${idx}`}
            transform={`translate(${x} ${yAtX(line, x)})`}
          >
            {/* outer ring */}
            <circle
              r="14"
              stroke="#22ff8c"
              strokeWidth="2"
              fill="none"
              opacity="0.9"
            />

            {/* core */}
            <circle r="4" fill="#22ff8c" />

            {/* orbiting processors */}
            {[0, 120, 240].map((angle, j) => (
              <circle
                key={j}
                cx="10"
                cy="0"
                r="2"
                fill="#22ff8c"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from={`${angle} 0 0`}
                  to={`${360 + angle} 0 0`}
                  dur={`${4 + j + idx}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
          </g>
        ))
      )}
    </svg>
  );
}

export default function FlowOverlay() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Flow lines */}
      <path
        d="M50 100 C200 100, 300 200, 450 200"
        stroke="rgba(34,197,94,0.25)"
        strokeWidth="2"
      />
      <path
        d="M50 180 C220 180, 320 260, 460 260"
        stroke="rgba(34,197,94,0.18)"
        strokeWidth="1.5"
      />
      <path
        d="M50 260 C240 260, 330 330, 470 320"
        stroke="rgba(34,197,94,0.22)"
        strokeWidth="2"
      />
      <path
        d="M50 340 C220 340, 310 400, 460 380"
        stroke="rgba(34,197,94,0.15)"
        strokeWidth="1.5"
      />

      {/* Nodes */}
      {[120, 200, 280].map((y, i) => (
        <circle
          key={i}
          cx="50"
          cy={y}
          r="4"
          fill="rgba(34,197,94,0.6)"
        />
      ))}
    </svg>
  );
}

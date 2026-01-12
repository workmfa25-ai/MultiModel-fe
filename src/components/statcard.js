export default function StatCard({ title, value }) {
  return (
    <div
      className="
        bg-panel
        border border-border
        rounded-lg
        p-4
        transition-all duration-200
        hover:-translate-y-1
        hover:shadow-[0_0_20px_rgba(34,197,94,0.35)]
        hover:border-accent
      "
    >
      {/* Brighter heading */}
      <div className="text-xs font-medium text-gray-300 mb-1">
        {title}
      </div>

      {/* Value stays dominant */}
      <div className="text-2xl font-semibold text-accent">
        {value}
      </div>
    </div>
  );
}

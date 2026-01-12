export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#0f1513] border-r border-border p-5">
      <h2 className="text-accent font-semibold mb-8">
        Multimodal Pipeline
      </h2>

      <nav className="space-y-4 text-sm">
        {['Dashboard', 'Search', 'Assets', 'Pipelines', 'Settings'].map(
          (item) => (
            <div
              key={item}
              className="cursor-pointer hover:text-accent transition"
            >
              {item}
            </div>
          )
        )}
      </nav>
    </aside>
  );
}

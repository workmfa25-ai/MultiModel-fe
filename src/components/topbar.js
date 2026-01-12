export default function Topbar() {
  return (
    <header className="h-14 border-b border-border flex items-center justify-between px-6">
      <div className="text-lg font-semibold text-gray-300">
        Unified Multimodal Intelligence
      </div>

      <div className="flex items-center gap-2 text-accent text-sm">
        <span className="h-2 w-2 bg-accent rounded-full" />
        Online
      </div>
    </header>
  );
}

import { Volume2, Clock, Cpu } from "lucide-react";
import AudioResults from "../pages/SearchResults/AudioResults";

export default function AudioAnalysisCard({ data }) {
  const transcript =
    "A loud mechanical rattling sound is heard, followed by intermittent bursts resembling industrial tools or machinery. No clear speech is detected.";

  /* ---------- UNIQUE EVENTS ---------- */
  const uniqueMap = {};
  data?.yamnet?.window_detections.forEach((w) => {
    w.predictions.forEach((p) => {
      if (!uniqueMap[p.label]) {
        uniqueMap[p.label] = {
          label: p.label,
          max: p.confidence,
          count: 1,
        };
      } else {
        uniqueMap[p.label].count += 1;
        uniqueMap[p.label].max = Math.max(uniqueMap[p.label].max, p.confidence);
      }
    });
  });

  console.log(data, "api res");

  const uniqueEvents = Object.values(uniqueMap).sort((a, b) => b.max - a.max);

  return (
    <div className="group bg-panel border border-border rounded-lg p-5 h-[520px]">
      <h3 className="text-accent mb-4">Processed Audio Overview</h3>

      <div className="grid grid-cols-2 gap-6 h-[460px]">
        {/* ================= LEFT ================= */}
        <div
          className="border border-border rounded-lg p-4 bg-[#0f1714]
                        overflow-y-hidden group-hover:overflow-y-auto pr-2"
        >
          <h4 className="text-sm text-accent mb-2">Transcript</h4>
          <AudioResults />
          <p className="text-sm text-gray-300 leading-relaxed">{transcript}</p>

          <div className="mt-3 text-xs text-gray-500">
            (Auto-generated · Placeholder)
          </div>

          {/* All Detected Events (NO TOOLTIP) */}
          <div className="mt-6">
            <h4 className="text-sm text-accent mb-2">
              All Detected Acoustic Events
            </h4>

            <div className="flex flex-wrap gap-2">
              {uniqueEvents.map((e) => (
                <div
                  key={e.label}
                  className="px-3 py-1 rounded-full text-xs
                             bg-[#16231e] border border-border text-gray-300
                             hover:border-accent transition"
                >
                  {e.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="overflow-y-hidden group-hover:overflow-y-auto pr-2">
          {/* File Info (TOOLTIPS ONLY HERE) */}
          <div className="grid grid-cols-3 gap-4 mb-5 text-sm text-gray-300">
            <InfoWithTooltip
              icon={<Volume2 size={16} />}
              label={data.file}
              tooltip="Uploaded audio filename"
            />
            <InfoWithTooltip
              icon={<Clock size={16} />}
              label={`${data?.audio?.duration}s`}
              tooltip="Total audio duration"
            />
            <InfoWithTooltip
              icon={<Cpu size={16} />}
              label={`${data?.audio?.sample_rate} Hz`}
              tooltip="Audio sample rate"
            />
          </div>

          {/* Summary (NO TOOLTIP) */}
          <div className="space-y-3">
            <h4 className="text-sm text-accent">Summary (Aggregated)</h4>

            {data?.yamnet?.summary.map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-xs text-gray-300 mb-1">
                  <span>{s.label}</span>
                  <span>{Math.round(s.confidence * 100)}%</span>
                </div>

                <div className="w-full h-2 bg-[#1f2a25] rounded">
                  <div
                    className="h-2 bg-accent rounded"
                    style={{
                      width: `${Math.min(s.confidence * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-xs text-gray-500">
            Engine: {data.engine} • Windows: {data.windows}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- TOOLTIP ONLY FOR TOP INFO ---------- */
function InfoWithTooltip({ icon, label, tooltip }) {
  return (
    <div className="group relative flex items-center gap-2 truncate cursor-default">
      {icon}
      <span className="truncate">{label}</span>

      <div
        className="absolute bottom-full left-0 mb-1 hidden group-hover:block
                   bg-black text-white text-xs px-2 py-1 rounded shadow z-20"
      >
        {tooltip}
      </div>
    </div>
  );
}

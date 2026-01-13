import React from "react";
import res from "../res.json";
import "../../src/index.css";


const panelStyle = {
  boxShadow: "0 0 0 1px rgb(34 197 94 / 1)",
};
const DocAnalysisCard = () => {
  const { geo_tags, statistics, entity_summary } = res;

  return (
    <div className="grid grid-cols-2 gap-6 p-6 bg-[#0b0f0e] text-gray-200 h-[50vh] overflow-y-scroll no-scrollbar">
      {/* LEFT PANEL */}
      <div className="p-4 rounded-lg bg-black/40" style={panelStyle}>
        <h3 className="text-green-500 mb-4">Geo & Statistics</h3>

        <section className="mb-6">
          <h4 className="text-sm text-green-400 mb-2">Locations (Top 3)</h4>
          <div className="space-y-2 text-sm">
            {geo_tags?.locations?.slice(0, 3).map((loc, i) => (
              <div
                key={i}
                className="p-2 rounded bg-black/30"
                style={panelStyle}
              >
                <div className="font-medium">{loc.location}</div>
                <div className="text-xs text-gray-400">{loc.display_name}</div>
                <div className="text-xs">
                  Lat: {loc.latitude}, Lng: {loc.longitude}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h4 className="text-sm text-green-400 mb-2">Statistics</h4>
          <div className="text-sm space-y-1">
            <div>Total Entities: {statistics?.total_entities}</div>
            <div>Unique Entities: {statistics?.unique_entities}</div>

            <div className="mt-2">
              <div className="text-xs text-gray-400 mb-1">
                Entity Types (Top 3)
              </div>
              <div className="flex flex-wrap gap-1">
                {statistics?.entity_types?.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-xs bg-black/30"
                    style={panelStyle}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* RIGHT PANEL */}
      <div className="p-4 rounded-lg bg-black/40" style={panelStyle}>
        <h3 className="text-green-500 mb-4">Entity Summary (Top 3 Each)</h3>

        <div className="space-y-4 text-sm">
          {Object.entries(entity_summary || {}).map(([key, value]) => (
            <div
              key={key}
              className="p-3 rounded bg-black/30"
              style={panelStyle}
            >
              <div className="font-semibold text-green-400 mb-2">{key}</div>

              {Array.isArray(value) ? (
                <ul className="list-disc list-inside space-y-1">
                  {value.slice(0, 3).map((v, i) => (
                    <li key={i}>{v.text}</li>
                  ))}
                </ul>
              ) : (
                <div>
                  <div>Total: {value.total_count}</div>
                  <div>Unique: {value.unique_count}</div>

                  <div className="mt-1 text-xs text-gray-400">
                    Top Entities (3)
                  </div>
                  <ul className="list-disc list-inside">
                    {value.top_entities?.slice(0, 3).map((e, i) => (
                      <li key={i}>
                        {e.text} ({e.count})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocAnalysisCard;

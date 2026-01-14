import React from "react";
import "../../src/index.css";

const panelStyle = {
  boxShadow: "0 0 0 1px #302F2E",
};

const DocAnalysisCard = ({ docAnalysis }) => {
  const locations = docAnalysis?.locations || [];
  const entities = docAnalysis?.entities || {};

  const totalEntities = Object.values(entities).flat().length;
  const uniqueEntities = new Set(Object.values(entities).flat()).size;

  return (
    <div className="bg-[#0f1714] p-6 rounded-lg">
      <h3 className="text-green-500 mb-4">Document Analysis</h3>
      <div className="grid grid-cols-2 gap-6 text-gray-200 h-[50vh] ">
        {/* LEFT PANEL */}
        <div
          className="p-4 rounded-lg bg-[#0f1714] overflow-y-scroll no-scrollbar"
          style={panelStyle}
        >
          <h3 className="text-green-500 mb-4">Geo & Statistics</h3>
          <section className="mb-6">
            <h4 className="text-sm text-green-400 mb-2">File Name</h4>

            <div className="space-y-2 text-sm">
              <div className="p-2 rounded bg-[#0f1714]" style={panelStyle}>
                {docAnalysis?.file_info?.filename}
              </div>
            </div>
          </section>
          {/* LOCATIONS */}
          <section className="mb-6">
            <h4 className="text-sm text-green-400 mb-2">Locations (Top 3)</h4>

            <div className="space-y-2 text-sm">
              {locations.length === 0 ? (
                <div className="text-gray-400 text-xs">No locations found</div>
              ) : (
                locations.slice(0, 3).map((loc, i) => (
                  <div
                    key={i}
                    className="p-2 rounded bg-[#0f1714]"
                    style={panelStyle}
                  >
                    {loc}
                  </div>
                ))
              )}
            </div>
          </section>

          {/* STATISTICS */}
          <section>
            <h4 className="text-sm text-green-400 mb-2">Statistics</h4>

            <div className="text-sm space-y-1">
              <div>Total Entities: {totalEntities}</div>
              <div>Unique Entities: {uniqueEntities}</div>

              <div className="mt-2">
                <div className="text-xs text-gray-400 mb-1">
                  Entity Types (Top 3)
                </div>

                <div className="flex flex-wrap gap-1">
                  {Object.keys(entities)
                    .slice(0, 3)
                    .map((type) => (
                      <span
                        key={type}
                        className="px-2 py-0.5 rounded text-xs bg-[#0f1714]"
                        style={panelStyle}
                      >
                        {type}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT PANEL */}
        <div
          className="p-4 rounded-lg bg-[#0f1714] overflow-y-scroll no-scrollbar"
          style={panelStyle}
        >
          <h3 className="text-green-500 mb-4">Entity Summary (Top 3 Each)</h3>

          <div className="space-y-4 text-sm">
            {Object.keys(entities).length === 0 ? (
              <div className="text-gray-400 text-xs">No entities detected</div>
            ) : (
              Object.entries(entities).map(([type, values]) => (
                <div
                  key={type}
                  className="p-3 rounded bg-[#0f1714]"
                  style={panelStyle}
                >
                  <div className="font-semibold text-green-400 mb-2">
                    {type}
                  </div>

                  <ul className="list-disc list-inside space-y-1">
                    {values.slice(0, 3).map((val, i) => (
                      <li key={i}>{val}</li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocAnalysisCard;

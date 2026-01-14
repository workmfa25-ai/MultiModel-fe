import React, { useState } from "react";
import "../../src/index.css";

const panelStyle = {
   boxShadow: "0 0 0 1px #302F2E",
};

const ImageAnalysisCard = ({ imageAnalysis }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  if (!imageAnalysis || imageAnalysis.status !== "success") return null;

  const {
    metadata,
    bounding_boxes = [],
    detected_objects = [],
    extracted_places = [],
    map_analysis,
    total_boxes_detected,
    total_objects_detected,
    total_places_extracted,
  } = imageAnalysis;

  const props = metadata?.properties || {};
  const analysis = metadata?.analysis || {};

  return (
    <div className="bg-[#0f1714] p-6 rounded-lg">
      <h3 className="text-green-500 mb-4">Image Analysis</h3>
      <div className="grid grid-cols-2 gap-6  text-gray-200 h-[50vh] ">
        {/* LEFT PANEL */}
        <div
          className="p-4 rounded-lg bg-[#0f1714] overflow-y-scroll no-scrollbar"
          style={panelStyle}
        >
          {/* IMAGE */}

          <section className="mb-6">
            <div
              className="p-2 rounded bg-[#0f1714] cursor-pointer"
              style={panelStyle}
              onClick={() => setIsFullscreen(true)}
            >
              <img
                src={`http://127.0.0.1:8000${imageAnalysis.img_url}`}
                alt="Uploaded"
                className="w-full rounded"
              />
            </div>

            {isFullscreen && (
              <div
                className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
                onClick={() => setIsFullscreen(false)}
              >
                <img
                  src={`http://127.0.0.1:8000${imageAnalysis.img_url}`}
                  alt="Fullscreen"
                  className="max-w-[95vw] max-h-[95vh] rounded"
                />
              </div>
            )}
          </section>

          {/* SUMMARY */}
          <section className="mb-6">
            <h4 className="text-sm text-green-400 mb-2">Summary</h4>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="p-2 rounded bg-[#0f1714]" style={panelStyle}>
                Boxes: {total_boxes_detected}
              </div>
              <div className="p-2 rounded bg-[#0f1714]" style={panelStyle}>
                Objects: {total_objects_detected}
              </div>
              <div className="p-2 rounded bg-[#0f1714]" style={panelStyle}>
                Places: {total_places_extracted}
              </div>
              <div className="p-2 rounded bg-[#0f1714]" style={panelStyle}>
                Is Map: {map_analysis?.contains_map ? "Yes" : "No"}
              </div>
            </div>
          </section>

          {/* TEXT REGIONS */}
          <section className="mb-6">
            <h4 className="text-sm text-green-400 mb-2">
              Detected Text (Top 3)
            </h4>

            <div className="space-y-2 text-sm">
              {bounding_boxes.length === 0 ? (
                <div className="text-gray-400 text-xs">No text regions</div>
              ) : (
                bounding_boxes.slice(0, 3).map((b) => (
                  <div
                    key={b.box_id}
                    className="p-2 rounded bg-[#0f1714]"
                    style={panelStyle}
                  >
                    <div className="text-xs text-green-400 mb-1">
                      #{b.box_id} ({b.confidence})
                    </div>
                    {b.text}
                  </div>
                ))
              )}
            </div>
          </section>

          {/* OBJECTS */}
          <section>
            <h4 className="text-sm text-green-400 mb-2">Objects (Top 3)</h4>

            <div className="space-y-2 text-sm">
              {detected_objects.length === 0 ? (
                <div className="text-gray-400 text-xs">No objects detected</div>
              ) : (
                detected_objects.slice(0, 3).map((o) => (
                  <div
                    key={o.object_id}
                    className="p-2 rounded bg-[#0f1714]"
                    style={panelStyle}
                  >
                    {o.class} ({o.confidence})
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* RIGHT PANEL */}
        <div
          className="p-4 rounded-lg bg-[#0f1714] overflow-y-scroll no-scrollbar"
          style={panelStyle}
        >
          <h3 className="text-green-500 mb-4">Metadata</h3>

          {/* FILE INFO */}
          <section className="mb-6">
            <h4 className="text-sm text-green-400 mb-2">File</h4>

            <div className="space-y-2 text-sm">
              <div className="p-2 rounded bg-[#0f1714]" style={panelStyle}>
                {props.filename}
              </div>
              <div className="p-2 rounded bg-[#0f1714]" style={panelStyle}>
                {props.format} · {props.mode}
              </div>
              <div className="p-2 rounded bg-[#0f1714]" style={panelStyle}>
                {props.dimensions?.width} × {props.dimensions?.height}
              </div>
              <div className="p-2 rounded bg-[#0f1714]" style={panelStyle}>
                {props.file_size_kb} KB
              </div>
            </div>
          </section>

          {/* IMAGE METRICS */}
          <section className="mb-6">
            <h4 className="text-sm text-green-400 mb-2">Metrics</h4>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="p-2 rounded bg-[#0f1714]" style={panelStyle}>
                Brightness: {analysis.brightness}
              </div>
              <div className="p-2 rounded bg-[#0f1714]" style={panelStyle}>
                Contrast: {analysis.contrast}
              </div>
              <div className="p-2 rounded bg-[#0f1714]" style={panelStyle}>
                Grayscale: {analysis.is_grayscale ? "Yes" : "No"}
              </div>
              <div className="p-2 rounded bg-[#0f1714]" style={panelStyle}>
                Has Text: {analysis.has_text ? "Yes" : "No"}
              </div>
            </div>
          </section>

          {/* COLORS */}
          <section>
            <h4 className="text-sm text-green-400 mb-2">
              Dominant Colors (Top 3)
            </h4>

            <div className="space-y-2 text-sm">
              {(analysis.dominant_colors || []).slice(0, 3).map((c, i) => (
                <div
                  key={i}
                  className="p-2 rounded bg-[#0f1714] flex items-center gap-2"
                  style={panelStyle}
                >
                  <span
                    className="w-3 h-3 rounded"
                    style={{ background: c.color }}
                  />
                  {c.color} — {c.percentage}%
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ImageAnalysisCard;

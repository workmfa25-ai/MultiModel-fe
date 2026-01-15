import React from "react";

const VideoAnalysisPanel = ({ videoAnalysis }) => {
  const panelStyle = {
    boxShadow: "0 0 0 1px rgba(34,197,94,0.2)",
  };


  console.log(videoAnalysis);
  

  return (
    <div className="bg-[#0f1714] p-6 rounded-lg">
      <h3 className="text-green-500 mb-4">Video Analysis</h3>

      <div className="grid grid-cols-2 gap-6 text-gray-200 h-[50vh]">
        {/* LEFT PANEL */}
        <div
          className="p-4 rounded-lg bg-[#0f1714] overflow-y-scroll no-scrollbar"
          style={panelStyle}
        >
          <h3 className="text-green-500 mb-4">Video Info</h3>

          {/* File Name */}
          <section className="mb-6">
            <h4 className="text-sm text-green-400 mb-2">Original Filename</h4>

            <div
              className="p-2 rounded text-sm bg-[#0f1714]"
              style={panelStyle}
            >
              {videoAnalysis?.original_filename || "N/A"}
            </div>
          </section>

          {/* Processing Info */}
          <section>
            <h4 className="text-sm text-green-400 mb-2">Processing Details</h4>

            <div className="text-sm space-y-1">
              <div>Video ID: {videoAnalysis?.video_id}</div>
              <div>
                Processing Time: {videoAnalysis?.result?.processing_time_sec}s
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT PANEL */}
        <div
          className="p-4 rounded-lg bg-[#0f1714] overflow-y-scroll no-scrollbar"
          style={panelStyle}
        >
          <h3 className="text-green-500 mb-4">Playback & Results</h3>

          {/* Video Player */}
          <section className="mb-6">
            <h4 className="text-sm text-green-400 mb-2">Video Preview</h4>

            <div
              className="rounded overflow-hidden bg-black"
              style={panelStyle}
            >
              <video
                controls
                className="w-full h-64 object-contain"
                src={`http://127.0.0.1:8000${videoAnalysis?.stored_path}`}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </section>

          {/* Result Files */}
          <section>
            <h4 className="text-sm text-green-400 mb-2">Analysis Results</h4>

            <div className="space-y-2 text-sm">
              {videoAnalysis?.result?.result?.length > 0 ? (
                videoAnalysis.result.result.map((file, index) => {
                  // Extract just the file name
                  const fileName = file.split(/[\\/]/).pop();

                  // Construct a backend URL to serve the file
                  const fileUrl = `http://127.0.0.1:8000/reports/${fileName}`;

                  return (
                    <a
                      key={index}
                      href={fileUrl} // Link to backend-served file
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-2 rounded bg-[#0f1714] hover:bg-green-900/20 transition"
                      style={panelStyle}
                    >
                      📄 {fileName}
                    </a>
                  );
                })
              ) : (
                <div className="text-gray-400 text-xs">
                  No result files available
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default VideoAnalysisPanel;

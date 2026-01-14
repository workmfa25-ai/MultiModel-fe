import React from "react";

const AudioResults = ({ data }) => {
  return (
    <section className="mb-6">
      <h3 className="text-green-500 mb-3">Audio</h3>

      <div className="space-y-3">
        <div className="p-3 rounded-lg border border-green-500/20 bg-black/40">
          <p className="text-green-500 mb-2">{data.file}</p>
          <audio controls className="w-full">
            <source
              src={`http://127.0.0.1:8000${data.audio_url}`}
              type="audio/mpeg"
            />
          </audio>
        </div>
      </div>
    </section>
  );
};

export default AudioResults;

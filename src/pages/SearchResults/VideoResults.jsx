import React from "react";

const VideoResults = () => {
  const dummy = [
    {
      id: 1,
      title: "Aircraft Landing",
      match: "landing gear",
      timestamp: "02:14",
      url: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
  ];

  return (
    <section className="mb-6">
      <h3 className="text-green-500 mb-3">Videos</h3>

      <div className="grid grid-cols-3 gap-4">
        {dummy?.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border border-green-500/20 bg-black/40 p-2"
          >
            <video
              src={item.url}
              controls
              className="h-32 w-full rounded mb-2"
            />
            <p className="text-sm text-green-500">{item.title}</p>
            <p className="text-xs text-green-500/60">
              Match @ {item.timestamp}: “{item.match}”
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VideoResults;

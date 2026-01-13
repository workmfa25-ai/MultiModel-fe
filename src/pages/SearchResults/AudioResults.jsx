import React from "react";

const AudioResults = () => {
  const dummy = [
    {
      id: 1,
      title: "Engine Sound Test",
      match: "abnormal vibration",
      url: "media/autocannon-20mm-143113.mp3",
      // url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      duration: "03:42",
    },
  ];
  return (
    <section className="mb-6">
      <h3 className="text-green-500 mb-3">Audio</h3>

      <div className="space-y-3">
        {dummy?.map((item) => (
          <div
            key={item.id}
            className="p-3 rounded-lg border border-green-500/20 bg-black/40"
          >
            <p className="text-green-500 mb-2">{item.title}</p>
            <audio controls className="w-full">
              <source src={item.url} type="audio/mpeg" />
            </audio>
            <p className="text-xs text-green-500/60 mt-1">
              Match: “{item.match}”
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AudioResults;

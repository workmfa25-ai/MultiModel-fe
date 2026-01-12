import React from "react";

const ImageResults = () => {
  const dummy = [
    {
      id: 1,
      title: "Aircraft Cockpit",
      match: "control panel",
      url: "https://images.unsplash.com/photo-1544551763-ced9fdbf1d06",
    },
    {
      id: 2,
      title: "Jet Wing",
      match: "wing structure",
      url: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92",
    },
  ];
  return (
    <section className="mb-6">
      <h3 className="text-green-500 mb-3">Images</h3>

      <div className="grid grid-cols-4 gap-4">
        {dummy?.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border border-green-500/20 bg-black/40 p-2"
          >
            <img
              src={item.url}
              alt={item.title}
              className="h-32 w-full object-cover rounded mb-2"
            />
            <p className="text-sm text-green-500">{item.title}</p>
            <p className="text-xs text-green-500/60">Match: “{item.match}”</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImageResults;

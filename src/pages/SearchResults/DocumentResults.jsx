import React from "react";

const DocumentResults = () => {
  const dummy = [
    {
      id: 1,
      title: "Sample Aircraft Manual (PDF)",
      match: "engine temperature",
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },
  ];
  return (
    <section className="mb-6">
      <h3 className="text-green-500 mb-3">Documents</h3>

      <div className="space-y-2">
        {dummy?.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="block p-3 rounded-lg border border-green-500/20 bg-black/40 hover:border-green-500"
          >
            <p className="text-green-500 font-medium">{item.title}</p>
            <p className="text-sm text-green-500/60">Match: “{item.match}”</p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default DocumentResults;

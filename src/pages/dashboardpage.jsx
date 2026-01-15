import { useState } from "react";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import AnalyticsGrid from "../components/analyticsgrid";
import UploadPanel from "../components/uploadpanel";
import AudioAnalysisCard from "../components/AudioAnalysisCard";
import SearchBar from "./search";
import AudioResults from "./SearchResults/AudioResults";
import ImageResults from "./SearchResults/ImageResults";
import DocumentResults from "./SearchResults/DocumentResults";
import VideoResults from "./SearchResults/VideoResults";
import "../../src/index.css";
import DocAnalysisCard from "../components/DocAnalysisCard";
import ImageAnalysisPanel from "../components/ImageAnalysisPanel";
import VideoResultPanel from "../components/VideoResultPanel";

export default function DashboardPage() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [imageAnalysis, setImageAnalysis] = useState(null);
  const [docAnalysis, setDocAnalysis] = useState(null);
  const [videoAnalysis, setVideoAnalysis] = useState(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const normalizedQuery = query.toLowerCase();
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="px-6">
          <SearchBar
            query={query}
            setQuery={setQuery}
            setResults={setResults}
            setLoading={setLoading}
          />
        </div>

        <main className="p-6 grid grid-cols-3 gap-6 overflow-y-scroll no-scrollbar ">
          {/* Left side analytics */}
          <AnalyticsGrid />

          {/* Right side upload */}
          <UploadPanel
            onSuccess={setAnalysisResult}
            setDocAnalysis={setDocAnalysis}
            setImageAnalysis={setImageAnalysis}
            setVideoAnalysis={setVideoAnalysis}
          />

          {/* New analysis card (fills empty space) */}
          {analysisResult && (
            <div className="col-span-3  ">
              <AudioAnalysisCard data={analysisResult} />
            </div>
          )}
          {docAnalysis && (
            <div className="col-span-3  ">
              <DocAnalysisCard docAnalysis={docAnalysis} />
            </div>
          )}
          {imageAnalysis && (
            <div className="col-span-3  ">
              <ImageAnalysisPanel imageAnalysis={imageAnalysis} />
            </div>
          )}
          {videoAnalysis && (
            <div className="col-span-3  ">
              <VideoResultPanel videoAnalysis={videoAnalysis} />
            </div>
          )}

          {loading && <div>Searching…</div>}
          {results.map((doc) => (
            <div key={doc.id}>
              <h4>{doc.file_info?.filename}</h4>
              <div dangerouslySetInnerHTML={{ __html: doc.text_snippet }} />
            </div>
          ))}
        </main>
        {/* <ImageAnalysisPanel /> */}

        <div className="px-6 overflow-y-scroll no-scrollbar ">
          {normalizedQuery.includes("ca" || "can" || "cannon") && (
            <AudioResults />
          )}
          {normalizedQuery.includes("i") && <ImageResults />}
          {normalizedQuery.includes("d") && <DocumentResults />}
          {normalizedQuery.includes("v") && <VideoResults />}
        </div>
      </div>
    </div>
  );
}

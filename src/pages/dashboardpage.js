// import Sidebar from '../components/sidebar';
// import Topbar from '../components/topbar';
// import AnalyticsGrid from '../components/analyticsgrid';
// import UploadPanel from '../components/uploadpanel';

// export default function DashboardPage() {
//   return (
//     <div className="flex h-screen overflow-hidden">
//       <Sidebar />

//       <div className="flex-1 flex flex-col">
//         <Topbar />

//         <main className="p-6 grid grid-cols-3 gap-6">
//           <AnalyticsGrid />
//           <UploadPanel />
//         </main>
//       </div>
//     </div>
//   );
// }

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

export default function DashboardPage() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [query, setQuery] = useState("");
  const normalizedQuery = query.toLowerCase();
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="px-6">
          <SearchBar query={query} setQuery={setQuery} />
        </div>

        <main className="p-6 grid grid-cols-3 gap-6">
          {/* Left side analytics */}
          <AnalyticsGrid />

          {/* Right side upload */}
          <UploadPanel onSuccess={setAnalysisResult} />

          {/* New analysis card (fills empty space) */}
          {analysisResult && (
            <div className="col-span-3">
              <AudioAnalysisCard data={analysisResult} />
            </div>
          )}
        </main>
        <div className="px-6 overflow-y-scroll no-scrollbar ">
          {normalizedQuery.includes("a") && <AudioResults />}
          {normalizedQuery.includes("i") && <ImageResults />}
          {normalizedQuery.includes("d") && <DocumentResults />}
          {normalizedQuery.includes("v") && <VideoResults />}
        </div>
      </div>
    </div>
  );
}

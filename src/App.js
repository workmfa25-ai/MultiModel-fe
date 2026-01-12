import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LoginPage from "./pages/loginpage";
import DashboardPage from "./pages/dashboardpage";
// import LoginPageNew from "./pages/login";

function App() {
  return (
    <div
      className="
        relative min-h-screen overflow-hidden
        bg-gradient-to-br
        from-[#0b0d0c]
        via-[#171c1a]
        to-[#050606]
      "
    >
      {/* ===== Primary soft grey ambient light ===== */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(ellipse_at_30%_20%,rgba(170,180,175,0.26),transparent_55%)]
        "
      />

      {/* ===== Secondary diagonal shadow sweep ===== */}
      <div
        className="
          pointer-events-none absolute inset-0
          bg-[linear-gradient(135deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.45)_75%)]
        "
      />

      {/* ===== App Content ===== */}
      <div className="relative z-10">
        <Toaster position="top-right" />

        <Routes>
          <Route path="/" element={<LoginPage />} />
          {/* <Route path="/" element={<LoginPageNew />} /> */}
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

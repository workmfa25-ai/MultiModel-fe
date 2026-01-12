import { useNavigate } from 'react-router-dom';
import FlowOverlay from '../components/FlowOverlay';
import PipelineAnimation from '../components/PipelineAnimation';

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-[#070b0a] relative overflow-hidden">

      {/* ===== BACKGROUND GRADIENTS ===== */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1512] via-[#050807] to-black opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_rgba(34,197,94,0.12),transparent_45%)]" />

      {/* ===== LEFT: BRANDING ===== */}
      <div className="relative z-10 w-1/3 flex flex-col justify-center px-20 text-gray-200 overflow-hidden">
        <div className="absolute inset-0">
          <FlowOverlay />
        </div>

        <div className="relative z-10 -translate-y-8">
          <h1 className="text-5xl font-semibold text-accent mb-6">
            Unified<br />Multimodal Search
          </h1>

          <p className="text-gray-400 max-w-md leading-relaxed">
            Documents, imagery, audio, video, telemetry, and sensor data
            converging into a single operational intelligence layer.
          </p>
        </div>

        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none" />
      </div>

      {/* ===== MIDDLE: PIPELINE ANIMATION ===== */}
      <div className="relative z-10 w-1/3 flex items-center justify-center opacity-90">
        <div className="w-full h-[420px]">
          <PipelineAnimation />
        </div>
      </div>

      {/* ===== RIGHT: LOGIN ===== */}
      <div className="relative z-10 w-1/3 flex items-center justify-center">
        <div className="w-[380px] p-8 rounded-xl bg-panel border border-border shadow-2xl backdrop-blur-md">

          <h2 className="text-xl font-semibold text-accent mb-6">
            Secure Login
          </h2>

          <input
            className="w-full mb-3 p-3 rounded bg-black border border-border focus:outline-none focus:border-accent"
            placeholder="Username"
          />

          <input
            type="password"
            className="w-full mb-5 p-3 rounded bg-black border border-border focus:outline-none focus:border-accent"
            placeholder="Password"
          />

          <button
            onClick={() => navigate('/dashboard')}
            className="w-full py-3 rounded bg-accent text-black font-medium hover:brightness-110 transition"
          >
            Login
          </button>

          <div className="mt-4 text-xs text-gray-500 text-center">
            Authorized access only
          </div>
          <div className="mt-4 text-xs text-gray-500 text-center">
            Forgot Password?
          </div>
        </div>
      </div>
    </div>
  );
}


// import HeroFusionBackground from '../components/HeroFusionBackground';
// import { useNavigate } from 'react-router-dom';

// export default function LoginPage() {
//   const navigate = useNavigate();

//   return (
//     <div className="relative min-h-screen bg-[#070b0a] overflow-hidden">

//       {/* ===== FULL-SCREEN HERO BACKGROUND ===== */}
//       <HeroFusionBackground />

//       {/* ===== LEFT BRANDING (FLOATING OVER HERO) ===== */}
//       <div className="absolute left-24 top-1/2 -translate-y-1/2 z-10">
//         <h1 className="text-5xl font-semibold text-accent mb-6 leading-tight">
//           Unified<br />Multimodal Search
//         </h1>

//         <p className="text-gray-400 max-w-md leading-relaxed">
//           Documents, imagery, audio, video, telemetry, and sensor data
//           converging into a single operational intelligence layer.
//         </p>
//       </div>

//       {/* ===== RIGHT LOGIN (FLOATING OVER HERO) ===== */}
//       <div className="absolute right-24 top-1/2 -translate-y-1/2 z-10">
//         <div className="w-[380px] p-8 rounded-xl bg-panel border border-border backdrop-blur-md shadow-2xl">

//           <h2 className="text-accent mb-6 text-lg font-medium">
//             Secure Login
//           </h2>

//           <input
//             className="w-full mb-3 p-3 bg-black rounded border border-border focus:outline-none focus:border-accent"
//             placeholder="Username"
//           />

//           <input
//             type="password"
//             className="w-full mb-5 p-3 bg-black rounded border border-border focus:outline-none focus:border-accent"
//             placeholder="Password"
//           />

//           <button
//             onClick={() => navigate('/dashboard')}
//             className="w-full py-3 bg-accent text-black rounded font-medium hover:brightness-110 transition"
//           >
//             Login
//           </button>

//           <div className="mt-4 text-xs text-gray-500 text-center">
//             Authorized access only
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }

import { Routes, Route } from "react-router-dom";
import App from "./App";
import ThreatDetectionPage from "./pages/ThreatDetectionPage";
import PhishingMailPage from "./pages/PhishingMailPage";
import InstagramLoginPage from "./pages/InstagramLoginPage";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/threat-detection" element={<ThreatDetectionPage />} />
      <Route path="/phishing" element={<PhishingMailPage />} />
      <Route path="/phishing/instagram" element={<InstagramLoginPage />} />
    </Routes>
  );
}

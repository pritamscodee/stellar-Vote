import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";
import ErrorBoundary from "./ErrorBoundary";
import MistralChat from "./components/MistralChat";
import FeedbackView from "./FeedbackView";
import OnboardingModal from "./OnboardingModal";
import { capturePageView } from "./services/analytics";
import { initAnalytics } from "./services/analytics";

function PageTracker() {
  const location = useLocation();
  useEffect(() => {
    capturePageView();
  }, [location]);
  return null;
}

function App() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <BrowserRouter>
      <PageTracker />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={
          <ErrorBoundary>
            <Dashboard />
          </ErrorBoundary>
        } />
        <Route path="/admin/feedback" element={<FeedbackView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <OnboardingModal />
      <MistralChat />
    </BrowserRouter>
  );
}

export default App;

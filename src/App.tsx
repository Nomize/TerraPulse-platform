import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import AIInsights from "./pages/AIInsights";
import ImpactTracker from "./pages/ImpactTracker";
import DataInsights from "./pages/DataInsights";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            
            {/* Protected routes with navbar and footer */}
            <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <main className="flex-1"><Profile /></main>
                  <Footer />
                </div>
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <main className="flex-1"><Dashboard /></main>
                  <Footer />
                </div>
              </ProtectedRoute>
            } />
            <Route path="/ai-insights" element={
              <ProtectedRoute>
                <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <main className="flex-1"><AIInsights /></main>
                  <Footer />
                </div>
              </ProtectedRoute>
            } />
            <Route path="/impact-tracker" element={
              <ProtectedRoute>
                <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <main className="flex-1"><ImpactTracker /></main>
                  <Footer />
                </div>
              </ProtectedRoute>
            } />
            <Route path="/data-insights" element={
              <ProtectedRoute>
                <div className="min-h-screen flex flex-col">
                  <Navbar />
                  <main className="flex-1"><DataInsights /></main>
                  <Footer />
                </div>
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

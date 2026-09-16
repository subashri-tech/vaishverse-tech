import React, { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AuthView } from "./components/AuthView";
import { Navbar } from "./components/Navbar";
import { Dashboard } from "./components/Dashboard";
import { Sparkles } from "lucide-react";

function MainApp() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [currentTab, setCurrentTab] = useState<"opportunities" | "saved" | "tracker">("opportunities");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-3 text-slate-400">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-400 p-0.5 animate-spin">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-emerald-400" />
          </div>
        </div>
        <p className="text-xs font-semibold text-slate-300">Initializing KRYPTO Opportunity Engine...</p>
      </div>
    );
  }

  // REQUIREMENT 3: Professional Authentication Experience when user first opens app
  if (!isAuthenticated || !user) {
    return <AuthView />;
  }

  // Authenticated State -> Render Personalized Dashboard & Navbar with Working Logout
  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] flex flex-col selection:bg-indigo-600 selection:text-white">
      {/* Background glow effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-gradient-to-b from-indigo-500/8 via-purple-500/5 to-transparent blur-3xl opacity-50" />
      </div>

      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenProfile={() => setIsProfileOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="flex-1 relative z-10">
        <Dashboard
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          isProfileOpen={isProfileOpen}
          setIsProfileOpen={setIsProfileOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </main>

      <footer className="relative z-10 border-t border-[#1a1a1a] bg-[#080808] py-6 text-center text-xs text-[#888888]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-indigo-600 rounded flex items-center justify-center font-bold text-white text-[10px]">K</div>
            <span className="font-extrabold text-white font-['Space_Grotesk'] tracking-wider">KRYPTO</span>
            <span className="text-[#555]">•</span>
            <span className="text-[#888]">AI-Powered Student Opportunity Discovery</span>
          </div>
          <p className="text-[#888]">
            Connected for <span className="text-indigo-400 font-medium">{user.university || "Global Universities"}</span> • Timeline: <span className="text-[#aaa] font-medium">{user.gradYear || "Flexible"}</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}


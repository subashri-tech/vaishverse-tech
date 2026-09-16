import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { 
  Sparkles, 
  Bookmark, 
  User, 
  LogOut, 
  Search, 
  SlidersHorizontal, 
  Compass, 
  CheckCircle2, 
  ExternalLink,
  ChevronDown,
  GraduationCap,
  Building2,
  Calendar,
  Layers
} from "lucide-react";

interface NavbarProps {
  currentTab: "opportunities" | "saved" | "tracker";
  setCurrentTab: (tab: "opportunities" | "saved" | "tracker") => void;
  onOpenProfile: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  onOpenProfile,
  searchQuery,
  setSearchQuery,
}) => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoutClick = () => {
    setDropdownOpen(false);
    logout();
  };

  return (
    <>
      <header id="krypto-navbar" className="sticky top-0 z-40 w-full border-b border-[#1a1a1a] bg-[#080808]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* Brand Logo */}
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setCurrentTab("opportunities")}
                className="flex items-center gap-2.5 text-left group focus:outline-none"
                id="brand-logo-btn"
              >
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/25 group-hover:bg-indigo-500 transition-all duration-300">
                  <span className="text-sm font-extrabold tracking-tight">K</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg tracking-tight text-white uppercase font-['Space_Grotesk']">
                      KRYPTO
                    </span>
                    <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 rounded">
                      AI ENGINE
                    </span>
                  </div>
                </div>
              </button>

              {/* Navigation Tabs */}
              <nav className="hidden md:flex items-center gap-1.5">
                <button
                  id="nav-opportunities-tab"
                  onClick={() => setCurrentTab("opportunities")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
                    currentTab === "opportunities"
                      ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/30"
                      : "text-[#888888] hover:text-white hover:bg-[#111111]"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${currentTab === "opportunities" ? "bg-indigo-500" : "bg-[#333333]"}`}></span>
                  <Compass className="w-3.5 h-3.5" />
                  <span>Discover Opportunities</span>
                </button>

                <button
                  id="nav-saved-tab"
                  onClick={() => setCurrentTab("saved")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
                    currentTab === "saved"
                      ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/30"
                      : "text-[#888888] hover:text-white hover:bg-[#111111]"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${currentTab === "saved" ? "bg-indigo-500" : "bg-[#333333]"}`}></span>
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Saved Opportunities</span>
                  {user?.savedOpportunityIds && user.savedOpportunityIds.length > 0 && (
                    <span className="ml-0.5 px-1.5 py-0.2 text-[10px] font-bold bg-indigo-500/20 text-indigo-300 rounded-full">
                      {user.savedOpportunityIds.length}
                    </span>
                  )}
                </button>

                <button
                  id="nav-tracker-tab"
                  onClick={() => setCurrentTab("tracker")}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
                    currentTab === "tracker"
                      ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/30"
                      : "text-[#888888] hover:text-white hover:bg-[#111111]"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${currentTab === "tracker" ? "bg-indigo-500" : "bg-[#333333]"}`}></span>
                  <Layers className="w-3.5 h-3.5" />
                  <span>Application Pipeline</span>
                </button>
              </nav>
            </div>

            {/* Center Search Input (Desktop) */}
            <div className="hidden lg:flex flex-1 max-w-md mx-2">
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666666]" />
                <input
                  id="global-search-input"
                  type="text"
                  placeholder="Search hackathons, scholarships, internships, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-1.5 bg-[#050505] border border-[#222222] rounded-xl text-xs text-[#e0e0e0] placeholder-[#555555] focus:outline-none focus:border-indigo-500 transition-all font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#888888] hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Right Profile & Account Menu */}
            <div className="flex items-center gap-3">
              <button
                id="edit-profile-quick-btn"
                onClick={onOpenProfile}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-semibold bg-[#111111] hover:bg-[#161616] border border-[#222222] text-[#cccccc] rounded-xl transition-colors"
                title="Edit Academic Profile (University, Grad Year, Skills)"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
                <span>Profile & AI Criteria</span>
              </button>

              {/* User Menu Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  id="user-account-dropdown-btn"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2.5 p-1 sm:px-2.5 sm:py-1.5 rounded-xl bg-[#0c0c0c] hover:bg-[#161616] border border-[#222222] transition-all focus:outline-none focus:border-indigo-500/50"
                  aria-expanded={dropdownOpen}
                >
                  <img
                    src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&auto=format&fit=crop&q=80"}
                    alt={user?.name || "Student"}
                    className="w-7 h-7 rounded-lg object-cover border border-[#2a2a2a] bg-[#111111]"
                  />
                  <div className="hidden sm:block text-left">
                    <div className="text-xs font-semibold text-white flex items-center gap-1 leading-tight">
                      <span>{user?.name || "Student"}</span>
                    </div>
                    <div className="text-[10px] text-[#777777] truncate max-w-[130px] leading-tight">
                      {user?.university || "Add Institution"}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[#666666] ml-0.5" />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div 
                    id="user-profile-dropdown-menu"
                    className="absolute right-0 mt-2 w-72 bg-[#0c0c0c] border border-[#1a1a1a] rounded-2xl shadow-2xl shadow-black py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  >
                    {/* Header in menu */}
                    <div className="px-4 py-3 border-b border-[#1a1a1a]">
                      <p className="text-[10px] uppercase tracking-widest text-[#666666] font-bold">Signed in as</p>
                      <p className="text-sm font-semibold text-white mt-0.5 truncate">{user?.name}</p>
                      <p className="text-xs text-[#888888] truncate">{user?.email}</p>
                      
                      {/* Institution & Grad timeline preview */}
                      <div className="mt-2.5 pt-2 border-t border-[#1a1a1a] space-y-1 text-xs">
                        <div className="flex items-center gap-1.5 text-[#cccccc]">
                          <Building2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                          <span className="truncate">{user?.university || "Institution not set"}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#888888]">
                          <Calendar className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                          <span>Timeline: {user?.gradYear || "Custom"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <button
                        id="menu-edit-profile-btn"
                        onClick={() => {
                          setDropdownOpen(false);
                          onOpenProfile();
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs text-[#cccccc] hover:bg-[#141414] hover:text-white flex items-center gap-2.5 transition-colors"
                      >
                        <GraduationCap className="w-4 h-4 text-indigo-400" />
                        <div>
                          <p className="font-semibold text-white">Edit Academic Profile</p>
                          <p className="text-[11px] text-[#777777]">Update university, grad year, skills & GPA</p>
                        </div>
                      </button>

                      <button
                        id="menu-saved-opps-btn"
                        onClick={() => {
                          setDropdownOpen(false);
                          setCurrentTab("saved");
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs text-[#cccccc] hover:bg-[#141414] hover:text-white flex items-center gap-2.5 transition-colors"
                      >
                        <Bookmark className="w-4 h-4 text-indigo-400" />
                        <div className="flex-1 flex items-center justify-between">
                          <p className="font-semibold text-white">Saved Opportunities</p>
                          <span className="text-[10px] text-[#888888] bg-[#1a1a1a] px-2 py-0.5 rounded-full font-bold">
                            {user?.savedOpportunityIds?.length || 0}
                          </span>
                        </div>
                      </button>

                      <button
                        id="menu-pipeline-btn"
                        onClick={() => {
                          setDropdownOpen(false);
                          setCurrentTab("tracker");
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs text-[#cccccc] hover:bg-[#141414] hover:text-white flex items-center gap-2.5 transition-colors"
                      >
                        <Layers className="w-4 h-4 text-purple-400" />
                        <div>
                          <p className="font-semibold text-white">Application Pipeline</p>
                          <p className="text-[11px] text-[#777777]">Track In-Progress & Submitted</p>
                        </div>
                      </button>
                    </div>

                    {/* LOGOUT ACTION */}
                    <div className="pt-1 mt-1 border-t border-[#1a1a1a]">
                      <button
                        id="logout-btn"
                        onClick={() => setShowLogoutConfirm(true)}
                        className="w-full text-left px-4 py-2.5 text-xs font-semibold text-rose-400 hover:bg-rose-950/20 hover:text-rose-300 flex items-center gap-2.5 transition-colors group"
                      >
                        <LogOut className="w-4 h-4 text-rose-400 group-hover:-translate-x-0.5 transition-transform" />
                        <span>Sign Out / Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Mobile Search & Subnav */}
          <div className="md:hidden pb-3 pt-1 border-t border-[#1a1a1a] flex flex-col gap-2">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666666]" />
              <input
                type="text"
                placeholder="Search opportunities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 bg-[#050505] border border-[#222222] rounded-lg text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="flex items-center justify-between text-xs pt-1">
              <button
                onClick={() => setCurrentTab("opportunities")}
                className={`px-3 py-1 rounded-lg ${currentTab === "opportunities" ? "bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/30" : "text-[#888888]"}`}
              >
                Discover
              </button>
              <button
                onClick={() => setCurrentTab("saved")}
                className={`px-3 py-1 rounded-lg ${currentTab === "saved" ? "bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/30" : "text-[#888888]"}`}
              >
                Saved ({user?.savedOpportunityIds?.length || 0})
              </button>
              <button
                onClick={() => setCurrentTab("tracker")}
                className={`px-3 py-1 rounded-lg ${currentTab === "tracker" ? "bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/30" : "text-[#888888]"}`}
              >
                Pipeline
              </button>
              <button
                onClick={onOpenProfile}
                className="px-3 py-1 rounded-lg text-[#888888] hover:text-white"
              >
                Profile
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
          <div 
            id="logout-confirmation-modal"
            className="bg-[#0c0c0c] border border-[#1a1a1a] rounded-2xl max-w-md w-full p-6 shadow-2xl text-center animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 mx-auto flex items-center justify-center mb-4">
              <LogOut className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Log out of KRYPTO?</h3>
            <p className="text-xs text-[#888888] mt-2 leading-relaxed">
              Are you sure you want to end your active session? You will be redirected to the sign-in screen and will need to log in to access your dashboard.
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                id="cancel-logout-btn"
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 text-xs font-semibold text-[#888888] hover:text-white bg-[#111111] border border-[#222222] hover:bg-[#161616] rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                id="confirm-logout-btn"
                onClick={handleLogoutClick}
                className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-colors shadow-lg shadow-rose-600/30"
              >
                Yes, Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

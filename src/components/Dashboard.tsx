import React, { useState, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { Opportunity, OpportunityCategory, ApplicationStatus } from "../types";
import { INITIAL_OPPORTUNITIES } from "../data/opportunities";
import { OpportunityCard } from "./OpportunityCard";
import { EligibilityCheckerModal } from "./EligibilityCheckerModal";
import { ProfileModal } from "./ProfileModal";
import { SavedOpportunitiesView } from "./SavedOpportunitiesView";
import { ApplicationTrackerView } from "./ApplicationTrackerView";
import { calculateLocalMatch } from "../utils/aiMatching";
import { 
  Sparkles, 
  Search, 
  Filter, 
  Building2, 
  Calendar, 
  GraduationCap, 
  Award, 
  Clock, 
  SlidersHorizontal, 
  Bookmark, 
  Layers, 
  ArrowUpDown, 
  CheckCircle2, 
  RefreshCw,
  TrendingUp,
  Globe
} from "lucide-react";

interface DashboardProps {
  currentTab: "opportunities" | "saved" | "tracker";
  setCurrentTab: (tab: "opportunities" | "saved" | "tracker") => void;
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  currentTab,
  setCurrentTab,
  isProfileOpen,
  setIsProfileOpen,
  searchQuery,
  setSearchQuery,
}) => {
  const { user, toggleSaveOpportunity, updateApplicationStatus } = useAuth();

  // Opportunity state
  const [opportunities] = useState<Opportunity[]>(INITIAL_OPPORTUNITIES);
  
  // Selected opportunity for deep eligibility modal
  const [selectedOppForEligibility, setSelectedOppForEligibility] = useState<Opportunity | null>(null);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<OpportunityCategory>("All");
  const [selectedMode, setSelectedMode] = useState<string>("All");
  const [minMatchScore, setMinMatchScore] = useState<number>(0);
  const [sortBy, setSortBy] = useState<"match" | "deadline" | "prize">("match");

  const categories: OpportunityCategory[] = [
    "All",
    "Scholarship",
    "Hackathon",
    "Fellowship",
    "Internship",
    "Grant",
    "Coding Contest",
    "Web3 & Bounty",
  ];

  // Filter and sort opportunities
  const filteredAndSortedOpportunities = useMemo(() => {
    if (!user) return [];

    return opportunities
      .filter((opp) => {
        // Category filter
        if (selectedCategory !== "All" && opp.category !== selectedCategory) {
          return false;
        }

        // Mode filter
        if (selectedMode !== "All" && opp.mode !== selectedMode) {
          return false;
        }

        // Match Score filter
        const match = calculateLocalMatch(user, opp);
        if (match.matchScore < minMatchScore) {
          return false;
        }

        // Keyword Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = opp.title.toLowerCase().includes(q);
          const matchOrg = opp.organization.toLowerCase().includes(q);
          const matchTags = (opp.tags || []).some((t) => t.toLowerCase().includes(q));
          const matchDesc = opp.description.toLowerCase().includes(q);
          if (!matchTitle && !matchOrg && !matchTags && !matchDesc) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "match") {
          const scoreA = calculateLocalMatch(user, a).matchScore;
          const scoreB = calculateLocalMatch(user, b).matchScore;
          return scoreB - scoreA;
        }
        if (sortBy === "deadline") {
          return new Date(a.deadlineDate).getTime() - new Date(b.deadlineDate).getTime();
        }
        // prize / default
        return b.featured ? 1 : -1;
      });
  }, [opportunities, user, selectedCategory, selectedMode, minMatchScore, searchQuery, sortBy]);

  if (!user) return null;

  // Stats calculation
  const totalSaved = user.savedOpportunityIds.length;
  const highMatches = opportunities.filter((o) => calculateLocalMatch(user, o).matchScore >= 80).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Dynamic Profile Welcome Banner */}
      <div 
        id="student-hero-banner"
        className="relative overflow-hidden rounded-3xl bg-[#0c0c0c] border border-[#1a1a1a] p-6 sm:p-8 shadow-2xl shadow-black"
      >
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-8 w-60 h-60 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personalized AI Matching Engine Active</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Welcome back, {user.name}!
            </h1>

            {/* User Academic Details Highlight - Showing typed University & typed Grad Year */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-3 text-xs sm:text-sm text-[#cccccc]">
              <div className="flex items-center gap-1.5 bg-[#080808] px-3 py-1.5 rounded-xl border border-[#222222] font-semibold">
                <Building2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="text-white">{user.university || "Institution"}</span>
              </div>

              <div className="flex items-center gap-1.5 bg-[#080808] px-3 py-1.5 rounded-xl border border-[#222222] font-semibold">
                <Calendar className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="text-purple-300">Timeline: {user.gradYear || "Custom"}</span>
              </div>

              <div className="flex items-center gap-1.5 bg-[#080808] px-3 py-1.5 rounded-xl border border-[#222222]">
                <GraduationCap className="w-4 h-4 text-[#888888] shrink-0" />
                <span>{user.major} ({user.degreeLevel})</span>
              </div>
            </div>
          </div>

          {/* Quick Action Button to Edit Profile */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              id="hero-edit-profile-btn"
              onClick={() => setIsProfileOpen(true)}
              className="w-full sm:w-auto px-4 py-2.5 bg-[#111111] hover:bg-[#161616] text-white border border-[#222222] rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
              <span>Edit University, Grad Year & Skills</span>
            </button>
          </div>
        </div>

        {/* Quick KPI Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mt-6 pt-6 border-t border-[#1a1a1a]">
          <div className="p-4 rounded-xl bg-[#080808] border border-[#1a1a1a]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#888888] font-medium">Top AI Matches</span>
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <p className="text-xl font-extrabold text-white mt-1">{highMatches} Opportunities</p>
            <span className="text-[10px] text-indigo-400 font-semibold">&gt;80% profile match</span>
          </div>

          <div className="p-4 rounded-xl bg-[#080808] border border-[#1a1a1a]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#888888] font-medium">Saved / Tracked</span>
              <Bookmark className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <p className="text-xl font-extrabold text-white mt-1">{totalSaved} Opportunities</p>
            <span className="text-[10px] text-purple-300 font-semibold">Active in pipeline</span>
          </div>

          <div className="p-4 rounded-xl bg-[#080808] border border-[#1a1a1a]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#888888] font-medium">Upcoming Deadlines</span>
              <Clock className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <p className="text-xl font-extrabold text-white mt-1">4 Next 30 Days</p>
            <span className="text-[10px] text-amber-400 font-semibold">Apply before cutoff</span>
          </div>

          <div className="p-4 rounded-xl bg-[#080808] border border-[#1a1a1a]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#888888] font-medium">Available Funding</span>
              <Award className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <p className="text-xl font-extrabold text-white mt-1">$1.8M+ Total</p>
            <span className="text-[10px] text-indigo-300 font-semibold">Prizes, grants & stipends</span>
          </div>
        </div>
      </div>

      {/* Main View Router */}
      {currentTab === "opportunities" && (
        <div className="space-y-6">
          
          {/* Controls Bar: Category Filter Pills, Mode, Match Score, Sort */}
          <div className="space-y-4 bg-[#0c0c0c] border border-[#1a1a1a] rounded-2xl p-4 sm:p-5 shadow-lg">
            
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  id={`filter-category-${cat.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                      : "bg-[#080808] text-[#888888] hover:text-white hover:bg-[#111111] border border-[#1a1a1a]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Secondary Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#1a1a1a] text-xs">
              
              {/* Left filter selections */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Mode Filter */}
                <div className="flex items-center gap-1.5 bg-[#080808] px-3 py-1.5 rounded-xl border border-[#222222]">
                  <Globe className="w-3.5 h-3.5 text-[#666666]" />
                  <span className="text-[#888888] font-medium">Format:</span>
                  <select
                    id="filter-mode-select"
                    value={selectedMode}
                    onChange={(e) => setSelectedMode(e.target.value)}
                    className="bg-transparent text-[#e0e0e0] font-semibold focus:outline-none cursor-pointer"
                  >
                    <option value="All" className="bg-[#0c0c0c]">All Formats</option>
                    <option value="Remote" className="bg-[#0c0c0c]">Remote Only</option>
                    <option value="Hybrid" className="bg-[#0c0c0c]">Hybrid</option>
                    <option value="In-Person" className="bg-[#0c0c0c]">In-Person</option>
                  </select>
                </div>

                {/* Match Score Filter */}
                <div className="flex items-center gap-1.5 bg-[#080808] px-3 py-1.5 rounded-xl border border-[#222222]">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-[#888888] font-medium">Match Threshold:</span>
                  <select
                    id="filter-match-threshold-select"
                    value={minMatchScore}
                    onChange={(e) => setMinMatchScore(Number(e.target.value))}
                    className="bg-transparent text-indigo-400 font-semibold focus:outline-none cursor-pointer"
                  >
                    <option value={0} className="bg-[#0c0c0c]">All Matches</option>
                    <option value={70} className="bg-[#0c0c0c]">&gt;70% Fit</option>
                    <option value={80} className="bg-[#0c0c0c]">&gt;80% Strong Fit</option>
                    <option value={90} className="bg-[#0c0c0c]">&gt;90% Top Fit</option>
                  </select>
                </div>
              </div>

              {/* Right Sort Selector */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-[#080808] px-3 py-1.5 rounded-xl border border-[#222222]">
                  <ArrowUpDown className="w-3.5 h-3.5 text-[#666666]" />
                  <span className="text-[#888888] font-medium">Sort By:</span>
                  <select
                    id="sort-by-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as "match" | "deadline" | "prize")}
                    className="bg-transparent text-[#e0e0e0] font-semibold focus:outline-none cursor-pointer"
                  >
                    <option value="match" className="bg-[#0c0c0c]">Highest AI Match %</option>
                    <option value="deadline" className="bg-[#0c0c0c]">Nearest Deadline</option>
                    <option value="prize" className="bg-[#0c0c0c]">Featured / Value</option>
                  </select>
                </div>

                {/* Reset Filters button if active */}
                {(selectedCategory !== "All" || selectedMode !== "All" || minMatchScore > 0 || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedCategory("All");
                      setSelectedMode("All");
                      setMinMatchScore(0);
                      setSearchQuery("");
                    }}
                    className="px-2.5 py-1.5 text-[11px] text-[#888888] hover:text-rose-400 bg-[#080808] border border-[#222222] rounded-xl transition-colors"
                  >
                    Reset
                  </button>
                )}
              </div>

            </div>
          </div>

          {/* Results Count Header */}
          <div className="flex items-center justify-between text-xs text-[#888888] px-1">
            <span>
              Showing <strong className="text-white">{filteredAndSortedOpportunities.length}</strong> matching student opportunities
            </span>
            <span>
              Matched for <strong className="text-indigo-400">{user.university || "your institution"}</strong> ({user.gradYear || "Flexible"})
            </span>
          </div>

          {/* Opportunities Cards Grid */}
          {filteredAndSortedOpportunities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredAndSortedOpportunities.map((opp) => (
                <OpportunityCard
                  key={opp.id}
                  opportunity={opp}
                  user={user}
                  isSaved={user.savedOpportunityIds.includes(opp.id)}
                  applicationStatus={user.applicationStatuses[opp.id] || "saved"}
                  onToggleSave={toggleSaveOpportunity}
                  onOpenEligibilityModal={(targetOpp) => setSelectedOppForEligibility(targetOpp)}
                  onUpdateStatus={updateApplicationStatus}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-[#0c0c0c] border border-[#1a1a1a] rounded-3xl space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#111111] text-[#666666] mx-auto flex items-center justify-center">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">No Opportunities Found</h3>
              <p className="text-xs text-[#888888] max-w-sm mx-auto">
                No opportunities match your current filter criteria. Try resetting the category, format, or search keywords.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedMode("All");
                  setMinMatchScore(0);
                  setSearchQuery("");
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}

        </div>
      )}

      {/* Saved Opportunities View */}
      {currentTab === "saved" && (
        <SavedOpportunitiesView
          opportunities={opportunities}
          user={user}
          onToggleSave={toggleSaveOpportunity}
          onOpenEligibilityModal={(targetOpp) => setSelectedOppForEligibility(targetOpp)}
          onUpdateStatus={updateApplicationStatus}
          onOpenProfile={() => setIsProfileOpen(true)}
          onExploreMore={() => setCurrentTab("opportunities")}
        />
      )}

      {/* Application Tracker Kanban View */}
      {currentTab === "tracker" && (
        <ApplicationTrackerView
          opportunities={opportunities}
          user={user}
          onToggleSave={toggleSaveOpportunity}
          onOpenEligibilityModal={(targetOpp) => setSelectedOppForEligibility(targetOpp)}
          onUpdateStatus={updateApplicationStatus}
          onExploreMore={() => setCurrentTab("opportunities")}
        />
      )}

      {/* Deep AI Eligibility Checker Modal */}
      <EligibilityCheckerModal
        opportunity={selectedOppForEligibility}
        user={user}
        isOpen={!!selectedOppForEligibility}
        onClose={() => setSelectedOppForEligibility(null)}
      />

      {/* Academic Profile Settings Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

    </div>
  );
};

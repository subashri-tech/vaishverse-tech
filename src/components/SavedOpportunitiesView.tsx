import React, { useState } from "react";
import { Opportunity, UserProfile, ApplicationStatus } from "../types";
import { OpportunityCard } from "./OpportunityCard";
import { 
  Bookmark, 
  Layers, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Search, 
  ExternalLink, 
  Building2, 
  Award,
  ArrowRight,
  Filter
} from "lucide-react";

interface SavedOpportunitiesViewProps {
  opportunities: Opportunity[];
  user: UserProfile;
  onToggleSave: (id: string) => void;
  onOpenEligibilityModal: (opp: Opportunity) => void;
  onUpdateStatus: (id: string, status: ApplicationStatus) => void;
  onOpenProfile: () => void;
  onExploreMore: () => void;
}

export const SavedOpportunitiesView: React.FC<SavedOpportunitiesViewProps> = ({
  opportunities,
  user,
  onToggleSave,
  onOpenEligibilityModal,
  onUpdateStatus,
  onOpenProfile,
  onExploreMore,
}) => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchFilter, setSearchFilter] = useState<string>("");

  const savedOpps = opportunities.filter((opp) =>
    user.savedOpportunityIds.includes(opp.id)
  );

  const filteredOpps = savedOpps.filter((opp) => {
    const status = user.applicationStatuses[opp.id] || "saved";
    if (statusFilter !== "all" && status !== statusFilter) return false;
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      const matchTitle = opp.title.toLowerCase().includes(q);
      const matchOrg = opp.organization.toLowerCase().includes(q);
      const matchCategory = opp.category.toLowerCase().includes(q);
      if (!matchTitle && !matchOrg && !matchCategory) return false;
    }
    return true;
  });

  // Pipeline Counts
  const counts = {
    all: savedOpps.length,
    saved: savedOpps.filter((o) => (user.applicationStatuses[o.id] || "saved") === "saved").length,
    inProgress: savedOpps.filter((o) => user.applicationStatuses[o.id] === "in-progress").length,
    applied: savedOpps.filter((o) => user.applicationStatuses[o.id] === "applied").length,
    shortlisted: savedOpps.filter((o) => user.applicationStatuses[o.id] === "shortlisted").length,
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-[#0c0c0c] border border-[#1a1a1a] shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-2">
              <Bookmark className="w-3.5 h-3.5" />
              <span>Personal Student Tracker</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white font-['Space_Grotesk']">
              Saved Opportunities & Application Pipeline
            </h1>
            <p className="text-xs sm:text-sm text-[#888888] mt-1">
              Tracking your active scholarship, hackathon, and fellowship submissions for{" "}
              <strong className="text-white">{user.university || "your institution"}</strong> (Graduating:{" "}
              <strong className="text-purple-300">{user.gradYear || "Custom"}</strong>).
            </p>
          </div>

          <button
            onClick={onExploreMore}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-colors self-start md:self-auto shrink-0"
          >
            <span>Discover More Opportunities</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Pipeline Stage Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mt-6 pt-6 border-t border-[#1a1a1a]">
          <button
            onClick={() => setStatusFilter("all")}
            className={`p-3 rounded-xl border text-left transition-all ${
              statusFilter === "all"
                ? "bg-[#161616] border-[#333333] text-white shadow-md"
                : "bg-[#080808] border-[#1a1a1a] text-[#888888] hover:text-white"
            }`}
          >
            <span className="text-[11px] block font-medium">All Tracked</span>
            <span className="text-lg font-bold text-white mt-0.5">{counts.all}</span>
          </button>

          <button
            onClick={() => setStatusFilter("saved")}
            className={`p-3 rounded-xl border text-left transition-all ${
              statusFilter === "saved"
                ? "bg-[#161616] border-[#333333] text-white shadow-md"
                : "bg-[#080808] border-[#1a1a1a] text-[#888888] hover:text-white"
            }`}
          >
            <span className="text-[11px] block font-medium text-[#cccccc]">Bookmarked</span>
            <span className="text-lg font-bold text-indigo-400 mt-0.5">{counts.saved}</span>
          </button>

          <button
            onClick={() => setStatusFilter("in-progress")}
            className={`p-3 rounded-xl border text-left transition-all ${
              statusFilter === "in-progress"
                ? "bg-[#161616] border-[#333333] text-white shadow-md"
                : "bg-[#080808] border-[#1a1a1a] text-[#888888] hover:text-white"
            }`}
          >
            <span className="text-[11px] block font-medium text-amber-300">Drafting / In-Progress</span>
            <span className="text-lg font-bold text-amber-400 mt-0.5">{counts.inProgress}</span>
          </button>

          <button
            onClick={() => setStatusFilter("applied")}
            className={`p-3 rounded-xl border text-left transition-all ${
              statusFilter === "applied"
                ? "bg-[#161616] border-[#333333] text-white shadow-md"
                : "bg-[#080808] border-[#1a1a1a] text-[#888888] hover:text-white"
            }`}
          >
            <span className="text-[11px] block font-medium text-indigo-300">Submitted / Applied</span>
            <span className="text-lg font-bold text-indigo-400 mt-0.5">{counts.applied}</span>
          </button>

          <button
            onClick={() => setStatusFilter("shortlisted")}
            className={`p-3 rounded-xl border text-left transition-all ${
              statusFilter === "shortlisted"
                ? "bg-[#161616] border-[#333333] text-white shadow-md"
                : "bg-[#080808] border-[#1a1a1a] text-[#888888] hover:text-white"
            }`}
          >
            <span className="text-[11px] block font-medium text-purple-300">Shortlisted / Finalist</span>
            <span className="text-lg font-bold text-purple-400 mt-0.5">{counts.shortlisted}</span>
          </button>
        </div>
      </div>

      {/* Search within saved */}
      {savedOpps.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666666]" />
            <input
              type="text"
              placeholder="Search saved opportunities..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#0c0c0c] border border-[#1a1a1a] rounded-xl text-xs text-white placeholder-[#666666] focus:outline-none focus:border-indigo-500"
            />
          </div>
          <p className="text-xs text-[#888888]">
            Showing {filteredOpps.length} of {savedOpps.length} saved opportunities
          </p>
        </div>
      )}

      {/* Grid of Saved Opportunities */}
      {filteredOpps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredOpps.map((opp) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              user={user}
              isSaved={true}
              applicationStatus={user.applicationStatuses[opp.id] || "saved"}
              onToggleSave={onToggleSave}
              onOpenEligibilityModal={onOpenEligibilityModal}
              onUpdateStatus={onUpdateStatus}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-[#0c0c0c] border border-[#1a1a1a] rounded-3xl space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#111111] text-[#666666] mx-auto flex items-center justify-center">
            <Bookmark className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">
            {savedOpps.length === 0
              ? "No Opportunities Saved Yet"
              : "No Opportunities Match Current Filter"}
          </h3>
          <p className="text-xs sm:text-sm text-[#888888] max-w-md mx-auto">
            {savedOpps.length === 0
              ? "Explore the KRYPTO catalog and bookmark top scholarships, hackathons, and fellowships to monitor your application progress."
              : "Try clearing your search query or selecting 'All Tracked' stage."}
          </p>
          <button
            onClick={onExploreMore}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-colors"
          >
            Explore Catalog
          </button>
        </div>
      )}
    </div>
  );
};

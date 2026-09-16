import React, { useState } from "react";
import { Opportunity, UserProfile, ApplicationStatus } from "../types";
import { 
  Layers, 
  Bookmark, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Sparkles, 
  ArrowRight,
  Building2,
  Calendar
} from "lucide-react";

interface ApplicationTrackerViewProps {
  opportunities: Opportunity[];
  user: UserProfile;
  onToggleSave: (id: string) => void;
  onOpenEligibilityModal: (opp: Opportunity) => void;
  onUpdateStatus: (id: string, status: ApplicationStatus) => void;
  onExploreMore: () => void;
}

const COLUMNS: { id: ApplicationStatus; title: string; color: string; badge: string }[] = [
  { id: "saved", title: "Bookmarked / Considering", color: "border-indigo-500/30 text-indigo-300", badge: "bg-indigo-500/20 text-indigo-400" },
  { id: "in-progress", title: "In Progress (Drafting)", color: "border-amber-500/30 text-amber-300", badge: "bg-amber-500/20 text-amber-400" },
  { id: "applied", title: "Submitted / Applied", color: "border-purple-500/30 text-purple-300", badge: "bg-purple-500/20 text-purple-400" },
  { id: "shortlisted", title: "Shortlisted / Finalist", color: "border-indigo-500/30 text-indigo-300", badge: "bg-indigo-500/20 text-indigo-300" },
];

export const ApplicationTrackerView: React.FC<ApplicationTrackerViewProps> = ({
  opportunities,
  user,
  onOpenEligibilityModal,
  onUpdateStatus,
  onExploreMore,
}) => {
  const savedOpps = opportunities.filter((o) => user.savedOpportunityIds.includes(o.id));

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-[#0c0c0c] border border-[#1a1a1a] shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Visual Application Kanban</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white font-['Space_Grotesk']">Application Pipeline</h1>
            <p className="text-xs sm:text-sm text-[#888888] mt-1">
              Track deadlines, essay submissions, and interviews for {user.name} ({user.university || "University"}).
            </p>
          </div>
          <button
            onClick={onExploreMore}
            className="px-4 py-2 bg-[#161616] hover:bg-[#202020] text-white border border-[#2a2a2a] font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <span>+ Find Opportunities to Add</span>
          </button>
        </div>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {COLUMNS.map((col) => {
          const items = savedOpps.filter(
            (o) => (user.applicationStatuses[o.id] || "saved") === col.id
          );

          return (
            <div
              key={col.id}
              className="bg-[#0c0c0c] border border-[#1a1a1a] rounded-2xl p-4 flex flex-col min-h-[450px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#1a1a1a]">
                <span className="text-xs font-bold text-[#e0e0e0]">{col.title}</span>
                <span className={`px-2 py-0.5 text-[11px] font-extrabold rounded-full ${col.badge}`}>
                  {items.length}
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar">
                {items.map((opp) => (
                  <div
                    key={opp.id}
                    className="p-3.5 rounded-xl bg-[#080808] border border-[#1a1a1a] hover:border-[#2a2a2a] shadow-md transition-all space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#111111] border border-[#222222] text-indigo-400">
                        {opp.category}
                      </span>
                      <span className="text-[10px] text-[#888888] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-rose-400" />
                        <span>{opp.deadline}</span>
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-white leading-snug line-clamp-2">
                      {opp.title}
                    </h4>

                    <div className="flex items-center justify-between text-[11px] text-[#888888] pt-1 border-t border-[#141414]">
                      <span className="font-semibold text-[#cccccc] truncate max-w-[120px]">
                        {opp.organization}
                      </span>
                      <span className="font-bold text-amber-300">
                        {opp.prizeOrStipend.split("+")[0]}
                      </span>
                    </div>

                    {/* Move Stage Selector */}
                    <div className="pt-1 flex items-center justify-between gap-1.5">
                      <select
                        value={col.id}
                        onChange={(e) => onUpdateStatus(opp.id, e.target.value as ApplicationStatus)}
                        className="w-full bg-[#111111] border border-[#222222] rounded-lg text-[10px] font-medium text-[#cccccc] py-1 px-2 focus:outline-none focus:border-indigo-500"
                      >
                        <option value="saved">Move: Bookmarked</option>
                        <option value="in-progress">Move: In Progress</option>
                        <option value="applied">Move: Applied</option>
                        <option value="shortlisted">Move: Shortlisted</option>
                      </select>

                      <button
                        onClick={() => onOpenEligibilityModal(opp)}
                        className="p-1 text-[#888888] hover:text-indigo-400 shrink-0"
                        title="View details & AI check"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {items.length === 0 && (
                  <div className="p-6 text-center text-[#666666] text-xs border border-dashed border-[#1a1a1a] rounded-xl">
                    No opportunities in this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

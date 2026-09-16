import React from "react";
import { Opportunity, UserProfile, ApplicationStatus } from "../types";
import { calculateLocalMatch } from "../utils/aiMatching";
import { 
  Sparkles, 
  Bookmark, 
  ExternalLink, 
  Calendar, 
  MapPin, 
  Award, 
  CheckCircle2, 
  Layers,
  Clock,
  Building,
  ArrowUpRight
} from "lucide-react";

interface OpportunityCardProps {
  opportunity: Opportunity;
  user: UserProfile;
  isSaved: boolean;
  applicationStatus?: ApplicationStatus;
  onToggleSave: (oppId: string) => void;
  onOpenEligibilityModal: (opp: Opportunity) => void;
  onUpdateStatus: (oppId: string, status: ApplicationStatus) => void;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  opportunity,
  user,
  isSaved,
  applicationStatus = "saved",
  onToggleSave,
  onOpenEligibilityModal,
  onUpdateStatus,
}) => {
  const matchResult = calculateLocalMatch(user, opportunity);
  const score = matchResult.matchScore;

  // Compute category color badge
  const getCategoryStyles = (category: Opportunity["category"]) => {
    switch (category) {
      case "Hackathon":
        return "bg-purple-500/15 text-purple-300 border-purple-500/30";
      case "Scholarship":
        return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
      case "Fellowship":
        return "bg-cyan-500/15 text-cyan-300 border-cyan-500/30";
      case "Internship":
        return "bg-blue-500/15 text-blue-300 border-blue-500/30";
      case "Grant":
        return "bg-amber-500/15 text-amber-300 border-amber-500/30";
      case "Web3 & Bounty":
        return "bg-indigo-500/15 text-indigo-300 border-indigo-500/30";
      default:
        return "bg-slate-700/30 text-slate-300 border-slate-700/50";
    }
  };

  const getMatchScoreBadge = (val: number) => {
    if (val >= 85) {
      return {
        bg: "bg-emerald-500/15 border-emerald-500/30 text-emerald-400",
        label: "Top Match",
        glow: "shadow-emerald-500/10",
      };
    }
    if (val >= 70) {
      return {
        bg: "bg-cyan-500/15 border-cyan-500/30 text-cyan-300",
        label: "Good Fit",
        glow: "shadow-cyan-500/10",
      };
    }
    return {
      bg: "bg-amber-500/15 border-amber-500/30 text-amber-300",
      label: "Reach Fit",
      glow: "shadow-amber-500/10",
    };
  };

  const matchBadge = getMatchScoreBadge(score);

  return (
    <div 
      id={`opportunity-card-${opportunity.id}`}
      className="bg-[#0c0c0c] border border-[#1a1a1a] hover:border-[#2a2a2a] rounded-2xl p-5 shadow-lg shadow-black/70 hover:shadow-xl transition-all flex flex-col justify-between group relative"
    >
      {/* Top Meta Bar */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          {/* Organization & Category */}
          <div className="flex items-center gap-2.5">
            <img
              src={opportunity.logo}
              alt={opportunity.organization}
              className="w-10 h-10 rounded-xl object-cover border border-[#222222] bg-[#111111] shrink-0"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white">{opportunity.organization}</span>
                {opportunity.verifiedSource && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" title="Verified Official Student Source" />
                )}
              </div>
              <span className={`inline-block mt-0.5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest rounded border ${getCategoryStyles(opportunity.category)}`}>
                {opportunity.category}
              </span>
            </div>
          </div>

          {/* AI Match Score Badge & Save Button */}
          <div className="flex items-center gap-2">
            <div 
              className={`px-2.5 py-1 rounded-xl border text-xs font-extrabold flex items-center gap-1.5 shadow-sm ${matchBadge.bg} ${matchBadge.glow}`}
              title={`AI match score based on ${user.university || "your college"}, ${user.major}, and skills`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{score}% Match</span>
            </div>

            <button
              id={`save-btn-${opportunity.id}`}
              type="button"
              onClick={() => onToggleSave(opportunity.id)}
              className={`p-2 rounded-xl border transition-colors ${
                isSaved
                  ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-300 shadow-sm"
                  : "bg-[#111111] border-[#222222] text-[#888888] hover:text-white hover:bg-[#161616]"
              }`}
              title={isSaved ? "Saved in your list" : "Save opportunity"}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? "fill-indigo-400 text-indigo-400" : ""}`} />
            </button>
          </div>
        </div>

        {/* Opportunity Title */}
        <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-indigo-400 transition-colors leading-snug mb-2 font-['Space_Grotesk']">
          {opportunity.title}
        </h3>

        {/* Short Description */}
        <p className="text-xs text-[#888888] line-clamp-2 leading-relaxed mb-3">
          {opportunity.description}
        </p>

        {/* Highlight Meta: Prize/Stipend, Mode, Deadline */}
        <div className="space-y-1.5 pt-2 pb-3 border-y border-[#1a1a1a] text-xs">
          <div className="flex items-center justify-between text-[#cccccc]">
            <span className="text-[#777777] text-[11px] flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-indigo-400" />
              <span>Award / Stipend:</span>
            </span>
            <span className="font-bold text-indigo-300 truncate max-w-[200px] text-right">
              {opportunity.prizeOrStipend}
            </span>
          </div>

          <div className="flex items-center justify-between text-[#cccccc]">
            <span className="text-[#777777] text-[11px] flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-purple-400" />
              <span>Format & Location:</span>
            </span>
            <span className="font-medium text-[#dddddd] truncate max-w-[180px] text-right">
              {opportunity.mode} • {opportunity.location}
            </span>
          </div>

          <div className="flex items-center justify-between text-[#cccccc]">
            <span className="text-[#777777] text-[11px] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-rose-400" />
              <span>Application Deadline:</span>
            </span>
            <span className="font-semibold text-rose-300">
              {opportunity.deadline}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-3">
          {opportunity.tags.slice(0, 4).map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] px-2 py-0.5 rounded bg-[#111111] border border-[#1f1f1f] text-[#888888] font-medium"
            >
              {tag}
            </span>
          ))}
          {opportunity.tags.length > 4 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded text-[#666666] self-center">
              +{opportunity.tags.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Card Actions & Official Link */}
      <div className="pt-4 mt-2 flex flex-col gap-2">
        {/* If Saved, Application Pipeline Status Selector */}
        {isSaved && (
          <div className="flex items-center justify-between px-2.5 py-1.5 bg-[#080808] border border-[#1a1a1a] rounded-xl text-xs">
            <span className="text-[11px] text-[#777777] font-medium flex items-center gap-1">
              <Layers className="w-3 h-3 text-purple-400" />
              <span>Status:</span>
            </span>
            <select
              value={applicationStatus}
              onChange={(e) => onUpdateStatus(opportunity.id, e.target.value as ApplicationStatus)}
              className="bg-[#111111] border border-[#222222] rounded-lg text-xs font-semibold text-indigo-400 py-0.5 px-2 focus:outline-none"
            >
              <option value="saved">Bookmarked</option>
              <option value="in-progress">In Progress</option>
              <option value="applied">Applied / Submitted</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        )}

        <div className="flex items-center gap-2">
          {/* Deep AI Eligibility Check Button */}
          <button
            id={`check-eligibility-btn-${opportunity.id}`}
            type="button"
            onClick={() => onOpenEligibilityModal(opportunity)}
            className="flex-1 py-2 px-3 bg-[#111111] hover:bg-[#161616] hover:border-indigo-500/40 border border-[#222222] text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 group"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 group-hover:rotate-12 transition-transform" />
            <span>AI Eligibility Breakdown</span>
          </button>

          {/* Official Portal External Link */}
          <a
            id={`official-link-btn-${opportunity.id}`}
            href={opportunity.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors shadow-md shadow-indigo-600/25 flex items-center justify-center"
            title={`Open official application link for ${opportunity.title}`}
          >
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

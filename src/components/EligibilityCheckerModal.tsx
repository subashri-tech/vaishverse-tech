import React, { useState, useEffect } from "react";
import { Opportunity, UserProfile, AIMatchResult } from "../types";
import { fetchAIMatchAnalysis, calculateLocalMatch } from "../utils/aiMatching";
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpRight, 
  Building2, 
  Calendar, 
  GraduationCap, 
  Award, 
  Send, 
  Bot, 
  Check, 
  Clock, 
  FileText,
  Lightbulb
} from "lucide-react";

interface EligibilityCheckerModalProps {
  opportunity: Opportunity | null;
  user: UserProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const EligibilityCheckerModal: React.FC<EligibilityCheckerModalProps> = ({
  opportunity,
  user,
  isOpen,
  onClose,
}) => {
  const [matchResult, setMatchResult] = useState<AIMatchResult | null>(null);
  const [loading, setLoading] = useState(true);
  
  // AI Advisor Chat states
  const [advisorMessage, setAdvisorMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<{ sender: "user" | "ai"; text: string }[]>([]);
  const [isAskingAdvisor, setIsAskingAdvisor] = useState(false);

  useEffect(() => {
    if (opportunity && isOpen) {
      setLoading(true);
      // Pre-populate with local heuristics immediately
      const initial = calculateLocalMatch(user, opportunity);
      setMatchResult(initial);

      // Async fetch deep AI analysis
      fetchAIMatchAnalysis(user, opportunity)
        .then((res) => {
          setMatchResult(res);
        })
        .finally(() => {
          setLoading(false);
        });

      // Reset chat
      setChatHistory([
        {
          sender: "ai",
          text: `Hello ${user.name.split(" ")[0]}! I've analyzed your academic profile from ${user.university || "your institution"} for the ${opportunity.title}. What questions do you have regarding your application, essays, or eligibility?`
        }
      ]);
    }
  }, [opportunity, user, isOpen]);

  if (!isOpen || !opportunity) return null;

  const handleSendAdvisorQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!advisorMessage.trim() || isAskingAdvisor) return;

    const userText = advisorMessage.trim();
    setAdvisorMessage("");
    setChatHistory((prev) => [...prev, { sender: "user", text: userText }]);
    setIsAskingAdvisor(true);

    try {
      const res = await fetch("/api/ai/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          studentProfile: user,
          opportunity,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setChatHistory((prev) => [
          ...prev,
          { sender: "ai", text: data.reply || "Focus on articulating your technical depth and alignment with the program goals." },
        ]);
      } else {
        setChatHistory((prev) => [
          ...prev,
          { sender: "ai", text: `For ${opportunity.title}, ensure your essays demonstrate tangible results from your past projects and mention your expected graduation in ${user.gradYear || "your cohort"}.` },
        ]);
      }
    } catch {
      setChatHistory((prev) => [
        ...prev,
        { sender: "ai", text: `Make sure your GitHub and portfolio clearly link to your applications before the ${opportunity.deadline} deadline.` },
      ]);
    } finally {
      setIsAskingAdvisor(false);
    }
  };

  const score = matchResult?.matchScore || 85;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto">
      <div 
        id="eligibility-checker-modal"
        className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-3xl max-w-3xl w-full shadow-2xl shadow-black overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#1a1a1a] flex items-center justify-between bg-[#050505]">
          <div className="flex items-center gap-3">
            <img
              src={opportunity.logo}
              alt={opportunity.organization}
              className="w-10 h-10 rounded-xl object-cover border border-[#222222] bg-[#111111] shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white truncate max-w-[400px]">
                  {opportunity.title}
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 rounded-md">
                  {opportunity.category}
                </span>
              </div>
              <p className="text-xs text-[#888888]">
                Organized by <strong className="text-[#dddddd]">{opportunity.organization}</strong> • Deadline: {opportunity.deadline}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#888888] hover:text-white hover:bg-[#161616] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
          
          {/* Top Score Banner */}
          <div className="p-5 rounded-2xl bg-[#0c0c0c] border border-[#1a1a1a] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/15 border-2 border-indigo-500/40 flex flex-col items-center justify-center text-indigo-400 shadow-lg shadow-indigo-500/10 shrink-0">
                <span className="text-xl font-extrabold leading-none">{score}%</span>
                <span className="text-[10px] font-bold tracking-wider uppercase mt-0.5">MATCH</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">
                    {matchResult?.verdict || "Strong Candidate"}
                  </span>
                  {loading && (
                    <span className="text-[10px] text-indigo-400 animate-pulse font-medium">
                      (Refining AI analysis...)
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#aaaaaa] mt-1 leading-relaxed">
                  {matchResult?.analysis || `Evaluated against your institution (${user.university}), graduation timeline (${user.gradYear}), and technical skills.`}
                </p>
              </div>
            </div>

            {/* Direct Official Link */}
            <a
              id="modal-official-apply-btn"
              href={opportunity.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-1.5 shrink-0 transition-colors"
            >
              <span>Visit Official Application</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Student Profile Factors in Evaluation */}
          <div className="p-4 rounded-2xl bg-[#080808] border border-[#1a1a1a]">
            <h4 className="text-xs font-bold text-[#aaaaaa] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Matched Against Your Active Profile</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-[#0c0c0c] border border-[#1a1a1a]">
                <span className="text-[10px] text-[#777777] block">Institution:</span>
                <span className="font-bold text-white truncate block">{user.university || "Manual Entry"}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0c0c0c] border border-[#1a1a1a]">
                <span className="text-[10px] text-[#777777] block">Academic Timeline:</span>
                <span className="font-bold text-purple-300 truncate block">{user.gradYear || "Flexible"}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0c0c0c] border border-[#1a1a1a]">
                <span className="text-[10px] text-[#777777] block">Major & GPA:</span>
                <span className="font-bold text-white truncate block">{user.major} ({user.gpa})</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0c0c0c] border border-[#1a1a1a]">
                <span className="text-[10px] text-[#777777] block">Primary Skills:</span>
                <span className="font-bold text-indigo-300 truncate block">{(user.skills || []).slice(0, 2).join(", ") || "General"}</span>
              </div>
            </div>
          </div>

          {/* Criteria Breakdown List */}
          <div>
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              <span>Detailed Eligibility & Criteria Audit</span>
            </h3>

            <div className="space-y-2.5">
              {(matchResult?.eligibilityChecks || []).map((chk, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border flex items-start gap-3 transition-colors ${
                    chk.met
                      ? "bg-[#080808] border-indigo-500/20"
                      : "bg-[#080808] border-amber-500/20"
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {chk.met ? (
                      <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{chk.criterion}</span>
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          chk.met
                            ? "bg-indigo-500/10 text-indigo-400"
                            : "bg-amber-500/10 text-amber-300"
                        }`}
                      >
                        {chk.met ? "Requirement Met" : "Recommendation"}
                      </span>
                    </div>
                    <p className="text-xs text-[#888888] mt-1">{chk.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Strengths & Application Tips */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Strengths */}
            <div className="p-4 rounded-2xl bg-[#080808] border border-indigo-500/20">
              <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>Key Candidate Strengths</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-[#cccccc]">
                {(matchResult?.keyStrengths || []).map((str, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-indigo-400 font-bold">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actionable Tips */}
            <div className="p-4 rounded-2xl bg-[#080808] border border-purple-500/20">
              <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Application Preparation Tips</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-[#cccccc]">
                {(matchResult?.actionableTips || []).map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Interactive AI Opportunity Advisor Chat */}
          <div className="p-4 rounded-2xl bg-[#080808] border border-[#1a1a1a]">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2.5 flex items-center gap-2">
              <Bot className="w-4 h-4 text-indigo-400" />
              <span>Ask KRYPTO AI Advisor About This Opportunity</span>
            </h4>

            {/* Chat Thread */}
            <div className="space-y-2.5 mb-3 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
              {chatHistory.map((chat, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2.5 ${chat.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {chat.sender === "ai" && (
                    <div className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 text-[10px] font-bold">
                      AI
                    </div>
                  )}
                  <div
                    className={`px-3 py-2 rounded-xl text-xs max-w-[85%] leading-relaxed ${
                      chat.sender === "user"
                        ? "bg-indigo-600 text-white font-medium"
                        : "bg-[#0c0c0c] text-[#dddddd] border border-[#1f1f1f]"
                    }`}
                  >
                    {chat.text}
                  </div>
                </div>
              ))}
              {isAskingAdvisor && (
                <div className="flex gap-2 text-xs text-indigo-400 items-center animate-pulse">
                  <Bot className="w-4 h-4" />
                  <span>KRYPTO AI is thinking...</span>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendAdvisorQuery} className="flex gap-2">
              <input
                id="advisor-query-input"
                type="text"
                placeholder="Ask about essays, eligibility nuances, or interview prep..."
                value={advisorMessage}
                onChange={(e) => setAdvisorMessage(e.target.value)}
                className="flex-1 px-3.5 py-2 bg-[#111111] border border-[#222222] rounded-xl text-xs text-white placeholder-[#666666] focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                disabled={isAskingAdvisor || !advisorMessage.trim()}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Ask</span>
              </button>
            </form>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-[#1a1a1a] flex items-center justify-between bg-[#050505]">
          <div className="text-xs text-[#888888] flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-rose-400" />
            <span>Deadline: <strong className="text-[#dddddd]">{opportunity.deadline}</strong></span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#888888] hover:text-white bg-[#111111] border border-[#222222] rounded-xl transition-colors"
            >
              Close
            </button>
            <a
              href={opportunity.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-1.5 transition-colors"
            >
              <span>Official Apply Portal</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

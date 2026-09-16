import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { SUGGESTED_UNIVERSITIES, SUGGESTED_SKILLS, POPULAR_INTERESTS, POPULAR_MAJORS } from "../data/universities";
import { 
  X, 
  Building2, 
  Calendar, 
  GraduationCap, 
  Award, 
  Sparkles, 
  Check, 
  Plus, 
  BookOpen, 
  MapPin, 
  User, 
  Layers,
  Save,
  HelpCircle
} from "lucide-react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, updateProfile } = useAuth();
  
  // State variables for profile editing
  const [name, setName] = useState("");
  const [university, setUniversity] = useState("");
  const [showUniSuggestions, setShowUniSuggestions] = useState(false);
  const uniWrapperRef = useRef<HTMLDivElement>(null);

  const [gradYear, setGradYear] = useState("");
  const [major, setMajor] = useState("");
  const [degreeLevel, setDegreeLevel] = useState("Undergraduate");
  const [gpa, setGpa] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [customSkillInput, setCustomSkillInput] = useState("");
  const [savedToast, setSavedToast] = useState(false);

  // Sync state with current user when opened
  useEffect(() => {
    if (user && isOpen) {
      setName(user.name || "");
      setUniversity(user.university || "");
      setGradYear(user.gradYear || "");
      setMajor(user.major || "");
      setDegreeLevel(user.degreeLevel || "Undergraduate");
      setGpa(user.gpa || "");
      setLocation(user.location || "");
      setBio(user.bio || "");
      setSkills(user.skills || []);
      setInterests(user.interests || []);
      setSavedToast(false);
    }
  }, [user, isOpen]);

  // Handle outside click for university suggestions popover
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (uniWrapperRef.current && !uniWrapperRef.current.contains(e.target as Node)) {
        setShowUniSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  if (!isOpen || !user) return null;

  // Filter university suggestions
  const filteredUnis = SUGGESTED_UNIVERSITIES.filter((u) =>
    u.toLowerCase().includes(university.toLowerCase())
  ).slice(0, 6);

  const handleAddSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
    }
    setCustomSkillInput("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleToggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: name.trim() || user.name,
      university: university.trim(), // Saves any manually typed university name
      gradYear: gradYear.trim(),     // Saves any manually typed graduation year / academic timeline
      major: major.trim(),
      degreeLevel,
      gpa: gpa.trim(),
      location: location.trim(),
      bio: bio.trim(),
      skills,
      interests,
    });
    setSavedToast(true);
    setTimeout(() => {
      setSavedToast(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto">
      <div 
        id="profile-settings-modal"
        className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-3xl max-w-2xl w-full shadow-2xl shadow-black overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#1a1a1a] flex items-center justify-between bg-[#050505]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white font-['Space_Grotesk']">Student Academic Profile</h2>
              <p className="text-xs text-[#888888]">Used by KRYPTO AI to match scholarships, hackathons & fellowships</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#888888] hover:text-white hover:bg-[#161616] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-5 flex-1 custom-scrollbar">
          
          {savedToast && (
            <div className="p-3 bg-indigo-500/20 border border-indigo-500/40 rounded-xl text-indigo-300 text-xs font-semibold flex items-center gap-2">
              <Check className="w-4 h-4 text-indigo-400" />
              <span>Academic profile updated successfully! AI matching criteria refreshed.</span>
            </div>
          )}

          {/* Name & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#cccccc] mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#666666]" />
                <span>Full Name</span>
              </label>
              <input
                id="profile-name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Rivera"
                className="w-full px-3.5 py-2.5 bg-[#080808] border border-[#222222] rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#cccccc] mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#666666]" />
                <span>Location / City / Country</span>
              </label>
              <input
                id="profile-location-input"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="San Francisco, CA or London, UK"
                className="w-full px-3.5 py-2.5 bg-[#080808] border border-[#222222] rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* REQUIREMENT 1: COLLEGE / UNIVERSITY NAME MANUAL TEXT INPUT */}
          <div ref={uniWrapperRef} className="relative">
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-white flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-indigo-400" />
                <span>College / University Name (Manual Text Input)</span>
              </label>
              <span className="text-[11px] text-indigo-400/90 font-medium">Freeform Text Entry</span>
            </div>

            <div className="relative">
              <input
                id="profile-university-input"
                type="text"
                required
                value={university}
                onChange={(e) => {
                  setUniversity(e.target.value);
                  setShowUniSuggestions(true);
                }}
                onFocus={() => setShowUniSuggestions(true)}
                placeholder="Type your complete College or University Name..."
                className="w-full px-4 py-2.5 bg-[#080808] border border-[#2a2a2a] rounded-xl text-sm text-white placeholder-[#666666] focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all font-medium"
              />
            </div>

            {/* Optional Autocomplete Suggestions Popover */}
            {showUniSuggestions && university.trim().length > 1 && filteredUnis.length > 0 && (
              <div 
                id="profile-uni-suggestions-list"
                className="absolute left-0 right-0 mt-1 bg-[#0c0c0c] border border-[#2a2a2a] rounded-xl shadow-2xl z-50 overflow-hidden py-1 max-h-52 overflow-y-auto"
              >
                <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-[#888888] border-b border-[#1a1a1a] flex items-center justify-between">
                  <span>Optional Suggestions</span>
                  <span className="text-[#666666]">Never forced — enter any institution</span>
                </div>
                {filteredUnis.map((uni, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setUniversity(uni);
                      setShowUniSuggestions(false);
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs text-[#dddddd] hover:bg-[#161616] hover:text-indigo-300 transition-colors flex items-center justify-between"
                  >
                    <span className="truncate font-medium">{uni}</span>
                    <span className="text-[10px] text-[#666666] shrink-0 ml-2">Click to insert</span>
                  </button>
                ))}
              </div>
            )}
            
            <p className="text-[11px] text-[#888888] mt-1.5">
              Type your exact institution name. Autocomplete suggestions are purely optional suggestions and never restrict your input.
            </p>
          </div>

          {/* REQUIREMENT 2: EDUCATION / GRADUATION YEAR MANUAL INPUT (NO RESTRICTIVE PREDEFINED DROPDOWN) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-white flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  <span>Expected Graduation / Academic Year</span>
                </label>
              </div>

              <input
                id="profile-gradyear-input"
                type="text"
                required
                value={gradYear}
                onChange={(e) => setGradYear(e.target.value)}
                placeholder="e.g. 2026, Dec 2027, Class of 2029, Fall 2028, 2031 (PhD)"
                className="w-full px-4 py-2.5 bg-[#080808] border border-[#2a2a2a] rounded-xl text-sm text-white placeholder-[#666666] focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-medium"
              />

              <p className="text-[11px] text-[#888888] mt-1.5">
                Supports all student timelines and non-standard schedules without fixed year restrictions.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#cccccc] mb-1.5">
                Degree Level
              </label>
              <select
                id="profile-degree-level-select"
                value={degreeLevel}
                onChange={(e) => setDegreeLevel(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#080808] border border-[#222222] rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Undergraduate">Undergraduate (B.S. / B.A. / B.Tech)</option>
                <option value="Masters">Masters (M.S. / M.Tech / MBA)</option>
                <option value="PhD">Doctorate (PhD / Post-Doctoral)</option>
                <option value="High School">High School Senior / Pre-College</option>
                <option value="Self-Taught / Other">Bootcamp / Independent Scholar</option>
              </select>
            </div>
          </div>

          {/* Major & GPA */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-[#cccccc] mb-1.5">
                Major / Field of Study
              </label>
              <input
                id="profile-major-input"
                type="text"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                placeholder="e.g. Computer Science, AI, Bioengineering, Applied Math"
                className="w-full px-3.5 py-2.5 bg-[#080808] border border-[#222222] rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#cccccc] mb-1.5">
                GPA / Metric Score
              </label>
              <input
                id="profile-gpa-input"
                type="text"
                value={gpa}
                onChange={(e) => setGpa(e.target.value)}
                placeholder="3.85 or 9.4/10"
                className="w-full px-3.5 py-2.5 bg-[#080808] border border-[#222222] rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Skills Badges & Custom Skill Addition */}
          <div>
            <label className="block text-xs font-semibold text-[#cccccc] mb-1.5 flex items-center justify-between">
              <span>Technical Skills & Tools</span>
              <span className="text-[11px] text-[#888888]">Used for Opportunity Tag Matching</span>
            </label>
            
            {/* Active Skills Chips */}
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              {skills.map((s, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-medium"
                >
                  <span>{s}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(s)}
                    className="hover:text-rose-400 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {skills.length === 0 && (
                <span className="text-xs text-[#666666] italic">No skills added yet.</span>
              )}
            </div>

            {/* Add Custom Skill Input */}
            <div className="flex gap-2">
              <input
                id="profile-custom-skill-input"
                type="text"
                placeholder="Add custom skill (e.g. Rust, PyTorch, Solidity, Figma)..."
                value={customSkillInput}
                onChange={(e) => setCustomSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddSkill(customSkillInput);
                  }
                }}
                className="flex-1 px-3.5 py-2 bg-[#080808] border border-[#222222] rounded-xl text-xs text-white placeholder-[#666666] focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => handleAddSkill(customSkillInput)}
                className="px-3.5 py-2 bg-[#161616] hover:bg-[#202020] text-white text-xs font-bold rounded-xl flex items-center gap-1 transition-colors border border-[#2a2a2a]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>

            {/* Quick Suggestions Chips */}
            <div className="flex flex-wrap gap-1 mt-2">
              <span className="text-[10px] text-[#666666] mr-1 self-center">Popular:</span>
              {SUGGESTED_SKILLS.slice(0, 8).map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAddSkill(s)}
                  className={`text-[11px] px-2 py-0.5 rounded-md transition-colors ${
                    skills.includes(s)
                      ? "bg-indigo-500/20 text-indigo-400 font-semibold"
                      : "bg-[#111111] border border-[#1f1f1f] text-[#888888] hover:text-white hover:bg-[#161616]"
                  }`}
                >
                  +{s}
                </button>
              ))}
            </div>
          </div>

          {/* Interests & Targets */}
          <div>
            <label className="block text-xs font-semibold text-[#cccccc] mb-1.5">
              Opportunity Focus & Interests
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {POPULAR_INTERESTS.map((interest, idx) => {
                const isSelected = interests.includes(interest);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleToggleInterest(interest)}
                    className={`p-2 rounded-xl text-xs text-left transition-all border ${
                      isSelected
                        ? "bg-purple-500/15 border-purple-500/40 text-purple-300 font-semibold"
                        : "bg-[#080808] border-[#1a1a1a] text-[#888888] hover:text-white hover:border-[#2a2a2a]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="truncate">{interest}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-purple-400 shrink-0 ml-1" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Short Bio */}
          <div>
            <label className="block text-xs font-semibold text-[#cccccc] mb-1.5">
              Short Candidate Statement / Bio
            </label>
            <textarea
              id="profile-bio-input"
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about your background, career goals, or specific fellowship targets..."
              className="w-full px-3.5 py-2 bg-[#080808] border border-[#222222] rounded-xl text-xs text-white placeholder-[#666666] focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Save Action Buttons */}
          <div className="pt-3 border-t border-[#1a1a1a] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-semibold text-[#888888] hover:text-white bg-[#111111] border border-[#222222] rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              id="save-profile-btn"
              type="submit"
              className="px-6 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save & Update AI Matches</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

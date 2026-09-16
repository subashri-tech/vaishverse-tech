import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { SUGGESTED_UNIVERSITIES, POPULAR_MAJORS } from "../data/universities";
import { 
  Sparkles, 
  ShieldCheck, 
  GraduationCap, 
  Building2, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  Award, 
  Lock, 
  Mail, 
  User, 
  Zap, 
  BookOpen,
  HelpCircle
} from "lucide-react";

export const AuthView: React.FC = () => {
  const { login, signup, quickLoginDemo } = useAuth();
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sign In form fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Sign Up form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Requirement 1: College/University manual text input + optional suggestions
  const [university, setUniversity] = useState("");
  const [showUniSuggestions, setShowUniSuggestions] = useState(false);
  const uniWrapperRef = useRef<HTMLDivElement>(null);

  // Requirement 2: Education / Graduation Year manual text input (no fixed restricted options)
  const [gradYear, setGradYear] = useState("");
  
  const [major, setMajor] = useState("Computer Science");
  const [degreeLevel, setDegreeLevel] = useState("Undergraduate");
  const [gpa, setGpa] = useState("3.80");

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

  // Filtered suggestions (purely optional)
  const filteredUnis = SUGGESTED_UNIVERSITIES.filter((u) =>
    u.toLowerCase().includes(university.toLowerCase())
  ).slice(0, 5);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!loginEmail || !loginEmail.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    setIsSubmitting(true);
    try {
      await login(loginEmail, loginPassword);
    } catch {
      setErrorMsg("Failed to sign in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    if (!name.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }
    if (!email || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (!university.trim()) {
      setErrorMsg("Please enter your College or University name.");
      return;
    }
    if (!gradYear.trim()) {
      setErrorMsg("Please enter your expected graduation or academic year.");
      return;
    }

    setIsSubmitting(true);
    try {
      await signup({
        name,
        email,
        university: university.trim(),
        gradYear: gradYear.trim(),
        major,
        degreeLevel,
        gpa,
      }, password);
    } catch {
      setErrorMsg("Failed to create account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] flex flex-col justify-between selection:bg-indigo-600 selection:text-white">
      {/* Background radial glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl opacity-60" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-3xl rounded-full" />
      </div>

      {/* Top Simple Header */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/25">
            <span className="text-base font-extrabold tracking-tight">K</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white font-['Space_Grotesk'] uppercase">
                KRYPTO
              </span>
              <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 rounded">
                AI ENGINE
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-[#777] hidden sm:inline">Need quick access?</span>
          <button
            id="quick-demo-login-top-btn"
            onClick={() => quickLoginDemo("undergrad")}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#111111] hover:bg-[#161616] border border-[#222222] rounded-xl transition-all shadow-sm flex items-center gap-1.5 group"
          >
            <Zap className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
            <span>Instant Demo Access</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-8 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center w-full">
          
          {/* Left Column: Hero & Platform Highlights */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Intelligent Student Opportunity & Fellowship Discovery</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Unlock Your Highest Value <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-200">Scholarships & Fellowships</span>
            </h1>

            <p className="text-base sm:text-lg text-[#aaaaaa] leading-relaxed">
              KRYPTO continuously indexes world-class hackathons, grants, undergraduate & graduate fellowships, and elite internships — evaluating your exact eligibility in real time.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-4 rounded-xl bg-[#0c0c0c] border border-[#1a1a1a] flex items-start gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Any College or University</h4>
                  <p className="text-[11px] text-[#777777] mt-0.5">Type and save your exact institution worldwide without restrictions.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0c0c0c] border border-[#1a1a1a] flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Flexible Academic Timelines</h4>
                  <p className="text-[11px] text-[#777777] mt-0.5">Enter your exact graduation year, whether 2026, 2030, or custom tracks.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0c0c0c] border border-[#1a1a1a] flex items-start gap-3">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Instant AI Match Score</h4>
                  <p className="text-[11px] text-[#777777] mt-0.5">Automated criteria checks with actionable application advice.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#0c0c0c] border border-[#1a1a1a] flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">100% Verified Official Sources</h4>
                  <p className="text-[11px] text-[#777777] mt-0.5">Direct portals for Google, MIT, OpenAI, CERN, and Jane Street.</p>
                </div>
              </div>
            </div>

            {/* Quick Demo Selector */}
            <div className="pt-3 border-t border-[#1a1a1a] flex flex-wrap items-center gap-2.5">
              <span className="text-xs text-[#777777] font-medium">Quick Demo Profiles:</span>
              <button
                id="quick-demo-alex-btn"
                onClick={() => quickLoginDemo("undergrad")}
                className="px-3 py-1.5 text-xs font-semibold bg-[#111111] hover:bg-[#161616] border border-[#222222] text-indigo-300 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>Alex (UC Berkeley • Spring 2026)</span>
              </button>
              <button
                id="quick-demo-elena-btn"
                onClick={() => quickLoginDemo("grad")}
                className="px-3 py-1.5 text-xs font-semibold bg-[#111111] hover:bg-[#161616] border border-[#222222] text-purple-300 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <span>Elena (MIT • Masters 2028)</span>
              </button>
            </div>
          </div>

          {/* Right Column: Authentication Card (Sign In / Sign Up) */}
          <div className="lg:col-span-6 max-w-lg mx-auto w-full">
            <div 
              id="auth-card-container"
              className="bg-[#0c0c0c] border border-[#1a1a1a] rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black relative"
            >
              {/* Tab Switcher */}
              <div className="flex rounded-2xl bg-[#050505] p-1.5 border border-[#1a1a1a] mb-6">
                <button
                  id="tab-login-btn"
                  type="button"
                  onClick={() => {
                    setAuthMode("login");
                    setErrorMsg("");
                  }}
                  className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                    authMode === "login"
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                      : "text-[#888888] hover:text-white"
                  }`}
                >
                  Sign In to KRYPTO
                </button>
                <button
                  id="tab-signup-btn"
                  type="button"
                  onClick={() => {
                    setAuthMode("signup");
                    setErrorMsg("");
                  }}
                  className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
                    authMode === "signup"
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                      : "text-[#888888] hover:text-white"
                  }`}
                >
                  Create Student Account
                </button>
              </div>

              {errorMsg && (
                <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* LOGIN FORM */}
              {authMode === "login" ? (
                <form onSubmit={handleLoginSubmit} className="space-y-4" id="login-form">
                  <div>
                    <label className="block text-xs font-semibold text-[#cccccc] mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555555]" />
                      <input
                        id="login-email-input"
                        type="email"
                        required
                        placeholder="e.g. alex.rivera@berkeley.edu"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-[#050505] border border-[#222222] rounded-xl text-xs text-white placeholder-[#555555] focus:outline-none focus:border-indigo-500 transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold text-[#cccccc]">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setLoginEmail("alex.rivera@berkeley.edu");
                          setLoginPassword("demo12345");
                        }}
                        className="text-[11px] text-indigo-400 hover:underline font-medium"
                      >
                        Auto-fill Demo Credentials
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555555]" />
                      <input
                        id="login-password-input"
                        type="password"
                        placeholder="••••••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-[#050505] border border-[#222222] rounded-xl text-xs text-white placeholder-[#555555] focus:outline-none focus:border-indigo-500 transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#777777] pt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded bg-[#050505] border-[#222222] text-indigo-600 focus:ring-0" />
                      <span>Remember my session</span>
                    </label>
                    <span className="text-[#555555]">Secure AES-256 Storage</span>
                  </div>

                  <button
                    id="submit-login-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                  >
                    <span>{isSubmitting ? "Signing In..." : "Access My KRYPTO Dashboard"}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  <div className="pt-3 text-center">
                    <p className="text-xs text-[#777777]">
                      New to KRYPTO?{" "}
                      <button
                        type="button"
                        onClick={() => setAuthMode("signup")}
                        className="text-indigo-400 font-bold hover:underline"
                      >
                        Create an account
                      </button>
                    </p>
                  </div>
                </form>
              ) : (
                /* SIGN UP FORM */
                <form onSubmit={handleSignupSubmit} className="space-y-3.5" id="signup-form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#cccccc] mb-1">
                        Full Name
                      </label>
                      <input
                        id="signup-name-input"
                        type="text"
                        required
                        placeholder="Alex Rivera"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2 bg-[#050505] border border-[#222222] rounded-xl text-xs text-white placeholder-[#555555] focus:outline-none focus:border-indigo-500 transition-all font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#cccccc] mb-1">
                        Email Address
                      </label>
                      <input
                        id="signup-email-input"
                        type="email"
                        required
                        placeholder="alex@university.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3.5 py-2 bg-[#050505] border border-[#222222] rounded-xl text-xs text-white placeholder-[#555555] focus:outline-none focus:border-indigo-500 transition-all font-medium"
                      />
                    </div>
                  </div>

                  {/* REQUIREMENT 1: College / University Name Manual Text Input + Optional Suggestions */}
                  <div ref={uniWrapperRef} className="relative">
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-[#cccccc] flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                        <span>College or University Name</span>
                      </label>
                      <span className="text-[10px] text-[#777777]">Manual text input</span>
                    </div>
                    
                    <input
                      id="signup-university-input"
                      type="text"
                      required
                      placeholder="Type your exact college or university name..."
                      value={university}
                      onChange={(e) => {
                        setUniversity(e.target.value);
                        setShowUniSuggestions(true);
                      }}
                      onFocus={() => setShowUniSuggestions(true)}
                      className="w-full px-3.5 py-2 bg-[#050505] border border-[#222222] rounded-xl text-xs text-white placeholder-[#555555] focus:outline-none focus:border-indigo-500 transition-all font-medium"
                    />

                    {/* Optional Suggestion Dropdown - Never forces selection */}
                    {showUniSuggestions && university.trim().length > 1 && filteredUnis.length > 0 && (
                      <div className="absolute left-0 right-0 mt-1 bg-[#0c0c0c] border border-[#222222] rounded-xl shadow-2xl z-50 overflow-hidden py-1 max-h-48 overflow-y-auto custom-scrollbar">
                        <div className="px-3 py-1 text-[10px] uppercase font-bold text-[#666666] border-b border-[#1a1a1a]">
                          Optional Suggestions (or keep your typed text)
                        </div>
                        {filteredUnis.map((uni, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setUniversity(uni);
                              setShowUniSuggestions(false);
                            }}
                            className="w-full text-left px-3 py-2 text-xs text-[#cccccc] hover:bg-[#161616] hover:text-indigo-400 transition-colors flex items-center justify-between"
                          >
                            <span className="truncate">{uni}</span>
                            <span className="text-[10px] text-[#666666] ml-2 shrink-0">Click to fill</span>
                          </button>
                        ))}
                      </div>
                    )}
                    <p className="text-[10px] text-[#777777] mt-1">
                      You can manually type any institution name globally. Suggestions are strictly optional.
                    </p>
                  </div>

                  {/* REQUIREMENT 2: Education / Graduation Year Manual Text Input (No fixed dropdown) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-semibold text-[#cccccc] flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-purple-400" />
                          <span>Graduation / Academic Year</span>
                        </label>
                      </div>
                      <input
                        id="signup-gradyear-input"
                        type="text"
                        required
                        placeholder="e.g. 2026, Dec 2027, Class of 2029, Fall 2028"
                        value={gradYear}
                        onChange={(e) => setGradYear(e.target.value)}
                        className="w-full px-3.5 py-2 bg-[#050505] border border-[#222222] rounded-xl text-xs text-white placeholder-[#555555] focus:outline-none focus:border-indigo-500 transition-all font-medium"
                      />
                      <p className="text-[10px] text-[#777777] mt-1">
                        Enter any year or schedule; not restricted to predefined options.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#cccccc] mb-1">
                        Degree / Academic Level
                      </label>
                      <select
                        id="signup-degree-level"
                        value={degreeLevel}
                        onChange={(e) => setDegreeLevel(e.target.value)}
                        className="w-full px-3.5 py-2 bg-[#050505] border border-[#222222] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 transition-all font-medium"
                      >
                        <option value="Undergraduate">Undergraduate (B.S. / B.A. / B.Tech)</option>
                        <option value="Masters">Masters (M.S. / M.Tech / MBA)</option>
                        <option value="PhD">Doctorate (PhD / Post-Doc)</option>
                        <option value="High School">High School Senior</option>
                        <option value="Self-Taught / Other">Bootcamp / Independent Scholar</option>
                      </select>
                    </div>
                  </div>

                  {/* Major & GPA */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-[#cccccc] mb-1">
                        Major / Field of Study
                      </label>
                      <input
                        id="signup-major-input"
                        type="text"
                        placeholder="Computer Science, AI, BioTech, etc."
                        value={major}
                        onChange={(e) => setMajor(e.target.value)}
                        className="w-full px-3.5 py-2 bg-[#050505] border border-[#222222] rounded-xl text-xs text-white placeholder-[#555555] focus:outline-none focus:border-indigo-500 transition-all font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#cccccc] mb-1">
                        GPA / Score
                      </label>
                      <input
                        id="signup-gpa-input"
                        type="text"
                        placeholder="3.85 or 9.2/10"
                        value={gpa}
                        onChange={(e) => setGpa(e.target.value)}
                        className="w-full px-3.5 py-2 bg-[#050505] border border-[#222222] rounded-xl text-xs text-white placeholder-[#555555] focus:outline-none focus:border-indigo-500 transition-all font-medium"
                      />
                    </div>
                  </div>

                  <button
                    id="submit-signup-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-3 py-3 px-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                  >
                    <span>{isSubmitting ? "Creating Account..." : "Create Account & Open Dashboard"}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  <div className="pt-2 text-center">
                    <p className="text-xs text-[#777777]">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setAuthMode("login")}
                        className="text-indigo-400 font-bold hover:underline"
                      >
                        Sign in here
                      </button>
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </main>

      {/* Footer info */}
      <footer className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 text-center border-t border-[#1a1a1a] text-xs text-[#777777]">
        <p>KRYPTO Student Opportunity Discovery & AI Eligibility Engine • Verified Global Higher Education Network</p>
      </footer>
    </div>
  );
};

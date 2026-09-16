import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, ApplicationStatus } from "../types";

export const DEFAULT_DEMO_USER: UserProfile = {
  id: "user-demo-1",
  email: "alex.rivera@berkeley.edu",
  name: "Alex Rivera",
  university: "University of California, Berkeley",
  gradYear: "Spring 2026",
  major: "Computer Science & Artificial Intelligence",
  degreeLevel: "Undergraduate",
  gpa: "3.85",
  location: "Berkeley, California, USA",
  skills: ["Python", "TypeScript", "React", "PyTorch", "Solidity", "Tailwind CSS"],
  interests: ["Hackathons & Competitions", "Tech & Open Source Fellowships", "Full-Tuition Scholarships"],
  bio: "Undergraduate builder passionate about autonomous agents, distributed systems, and decentralized public goods.",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&auto=format&fit=crop&q=80",
  savedOpportunityIds: ["opp-1", "opp-2", "opp-5"],
  applicationStatuses: {
    "opp-1": "in-progress",
    "opp-2": "applied",
    "opp-5": "saved",
  },
  createdAt: "2026-01-10T10:00:00.000Z",
};

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  signup: (userData: Partial<UserProfile>, password?: string) => Promise<boolean>;
  quickLoginDemo: (userType?: "undergrad" | "grad") => void;
  logout: () => void;
  updateProfile: (updatedData: Partial<UserProfile>) => void;
  toggleSaveOpportunity: (oppId: string) => void;
  updateApplicationStatus: (oppId: string, status: ApplicationStatus) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "krypto_session_user_v2";
const USERS_DB_KEY = "krypto_registered_users_v2";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from localStorage on mount
  useEffect(() => {
    try {
      const savedSession = localStorage.getItem(STORAGE_KEY);
      if (savedSession) {
        const parsed = JSON.parse(savedSession);
        if (parsed && parsed.id) {
          setUser(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to parse saved session", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save session when user changes
  const saveSession = (profile: UserProfile | null) => {
    setUser(profile);
    if (profile) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      // Also update in registered users cache
      try {
        const rawUsers = localStorage.getItem(USERS_DB_KEY);
        const users: Record<string, UserProfile> = rawUsers ? JSON.parse(rawUsers) : {};
        users[profile.email.toLowerCase()] = profile;
        localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
      } catch (err) {
        console.error("Error updating user db", err);
      }
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const login = async (email: string): Promise<boolean> => {
    const cleanEmail = email.trim().toLowerCase();
    
    // Check if user exists in local storage DB
    try {
      const rawUsers = localStorage.getItem(USERS_DB_KEY);
      const users: Record<string, UserProfile> = rawUsers ? JSON.parse(rawUsers) : {};
      
      if (users[cleanEmail]) {
        saveSession(users[cleanEmail]);
        return true;
      }
    } catch {
      // Fallback
    }

    // If logging in with demo email or new email, instantiate profile
    if (cleanEmail === DEFAULT_DEMO_USER.email.toLowerCase()) {
      saveSession(DEFAULT_DEMO_USER);
      return true;
    }

    // Create realistic profile for returning/signing-in user
    const namePart = cleanEmail.split("@")[0].replace(/[._]/g, " ");
    const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);

    const newUser: UserProfile = {
      id: "user-" + Date.now(),
      email: cleanEmail,
      name: formattedName || "Student Scholar",
      university: "Stanford University",
      gradYear: "2027",
      major: "Computer Science",
      degreeLevel: "Undergraduate",
      gpa: "3.80",
      location: "San Francisco, CA",
      skills: ["Python", "TypeScript", "React", "Machine Learning"],
      interests: ["Hackathons & Competitions", "Paid Industry Internships"],
      bio: "Tech enthusiast actively seeking fellowships and high-impact student opportunities.",
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${cleanEmail}`,
      savedOpportunityIds: ["opp-1", "opp-3"],
      applicationStatuses: { "opp-1": "saved" },
      createdAt: new Date().toISOString(),
    };

    saveSession(newUser);
    return true;
  };

  const signup = async (userData: Partial<UserProfile>): Promise<boolean> => {
    const cleanEmail = (userData.email || `student_${Date.now()}@university.edu`).trim().toLowerCase();
    
    const newUser: UserProfile = {
      id: "user-" + Date.now(),
      email: cleanEmail,
      name: userData.name || "Krypto Scholar",
      university: userData.university || "Stanford University",
      gradYear: userData.gradYear || "2027",
      major: userData.major || "Computer Science",
      degreeLevel: userData.degreeLevel || "Undergraduate",
      gpa: userData.gpa || "3.75",
      location: userData.location || "Global",
      skills: userData.skills && userData.skills.length > 0 ? userData.skills : ["Python", "TypeScript", "AI/ML"],
      interests: userData.interests && userData.interests.length > 0 ? userData.interests : ["Hackathons & Competitions", "Full-Tuition Scholarships"],
      bio: userData.bio || "Student explorer building projects and applying for cutting-edge opportunities.",
      avatar: userData.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${cleanEmail}`,
      savedOpportunityIds: ["opp-1", "opp-2"],
      applicationStatuses: { "opp-1": "saved" },
      createdAt: new Date().toISOString(),
    };

    saveSession(newUser);
    return true;
  };

  const quickLoginDemo = (userType: "undergrad" | "grad" = "undergrad") => {
    if (userType === "undergrad") {
      saveSession(DEFAULT_DEMO_USER);
    } else {
      const gradUser: UserProfile = {
        id: "user-demo-grad-2",
        email: "elena.vance@mit.edu",
        name: "Elena Vance",
        university: "Massachusetts Institute of Technology (MIT)",
        gradYear: "Fall 2028 (Masters)",
        major: "Computational Biology & Machine Learning",
        degreeLevel: "Masters",
        gpa: "3.92",
        location: "Cambridge, MA, USA",
        skills: ["PyTorch", "Python", "Bioinformatics", "Data Science", "C++", "R"],
        interests: ["Summer Research Programs", "Startup Grants & Pre-Seed", "Tech & Open Source Fellowships"],
        bio: "Graduate researcher working on generative biology algorithms and scientific computing.",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=128&auto=format&fit=crop&q=80",
        savedOpportunityIds: ["opp-5", "opp-7", "opp-8"],
        applicationStatuses: {
          "opp-5": "in-progress",
          "opp-7": "applied",
        },
        createdAt: "2026-02-15T12:00:00.000Z",
      };
      saveSession(gradUser);
    }
  };

  // Securely end active user session & redirect back to Login view
  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateProfile = (updatedData: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updatedData };
    saveSession(updated);
  };

  const toggleSaveOpportunity = (oppId: string) => {
    if (!user) return;
    const isSaved = user.savedOpportunityIds.includes(oppId);
    const newSaved = isSaved
      ? user.savedOpportunityIds.filter(id => id !== oppId)
      : [...user.savedOpportunityIds, oppId];
    
    const newStatuses = { ...user.applicationStatuses };
    if (!isSaved && !newStatuses[oppId]) {
      newStatuses[oppId] = "saved";
    }

    updateProfile({
      savedOpportunityIds: newSaved,
      applicationStatuses: newStatuses,
    });
  };

  const updateApplicationStatus = (oppId: string, status: ApplicationStatus) => {
    if (!user) return;
    const newStatuses = { ...user.applicationStatuses, [oppId]: status };
    let newSaved = [...user.savedOpportunityIds];
    if (!newSaved.includes(oppId)) {
      newSaved.push(oppId);
    }
    updateProfile({
      savedOpportunityIds: newSaved,
      applicationStatuses: newStatuses,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        quickLoginDemo,
        logout,
        updateProfile,
        toggleSaveOpportunity,
        updateApplicationStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

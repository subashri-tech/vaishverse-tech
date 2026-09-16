export type OpportunityCategory = 
  | 'All'
  | 'Hackathon'
  | 'Scholarship'
  | 'Internship'
  | 'Fellowship'
  | 'Grant'
  | 'Coding Contest'
  | 'Web3 & Bounty';

export type ApplicationStatus = 'saved' | 'in-progress' | 'applied' | 'shortlisted' | 'completed';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  university: string; // Freeform manual input with optional autocomplete
  gradYear: string;   // Freeform manual graduation year or academic timeline
  major: string;
  degreeLevel: string;
  gpa: string;
  location: string;
  skills: string[];
  interests: string[];
  bio: string;
  avatar: string;
  savedOpportunityIds: string[];
  applicationStatuses: Record<string, ApplicationStatus>;
  notes?: Record<string, string>;
  createdAt: string;
}

export interface EligibilityCriteria {
  minGpa?: number;
  targetMajors?: string[];
  gradYears?: string[];
  countries?: string[];
  educationLevels?: string[];
  customRules?: string[];
}

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  logo: string;
  category: Exclude<OpportunityCategory, 'All'>;
  mode: 'Remote' | 'In-Person' | 'Hybrid';
  location: string;
  deadline: string;
  deadlineDate: string; // ISO or YYYY-MM-DD for sorting
  prizeOrStipend: string;
  featured: boolean;
  tags: string[];
  description: string;
  eligibilityCriteria: EligibilityCriteria;
  officialUrl: string;
  benefits: string[];
  applicationSteps: string[];
  selectionRate?: string;
  sponsorName?: string;
  verifiedSource: boolean;
}

export interface AIMatchResult {
  matchScore: number;
  verdict: 'Exceptional Match' | 'Strong Candidate' | 'Good Alignment' | 'Challenging / Reach';
  analysis: string;
  keyStrengths: string[];
  actionableTips: string[];
  eligibilityChecks: {
    criterion: string;
    met: boolean;
    details: string;
  }[];
  source?: string;
}

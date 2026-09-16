import { Opportunity, UserProfile, AIMatchResult } from "../types";

export function calculateLocalMatch(profile: UserProfile, opp: Opportunity): AIMatchResult {
  let score = 50; // baseline
  const checks: AIMatchResult["eligibilityChecks"] = [];
  const strengths: string[] = [];
  const tips: string[] = [];

  // 1. Major Alignment
  const targetMajors = opp.eligibilityCriteria.targetMajors || [];
  const userMajor = (profile.major || "").toLowerCase();
  const majorMatches = targetMajors.some(m => 
    m.toLowerCase().includes("all") || 
    m.toLowerCase().includes("any") ||
    userMajor.includes(m.toLowerCase()) || 
    m.toLowerCase().includes(userMajor)
  );

  if (majorMatches || targetMajors.length === 0) {
    score += 15;
    checks.push({
      criterion: "Academic Major Alignment",
      met: true,
      details: `Your major in ${profile.major || "STEM"} aligns with target disciplines (${targetMajors.slice(0, 3).join(", ") || "All Fields"}).`
    });
    strengths.push(`Major (${profile.major}) directly matches program qualifications`);
  } else {
    score += 5;
    checks.push({
      criterion: "Academic Major Alignment",
      met: false,
      details: `Targeting: ${targetMajors.join(", ")}. Related technical coursework can satisfy this requirement.`
    });
    tips.push("Highlight interdisciplinary projects connecting your major to the program focus.");
  }

  // 2. Skills & Tags Intersection
  const oppTags = (opp.tags || []).map(t => t.toLowerCase());
  const userSkills = (profile.skills || []).map(s => s.toLowerCase());
  const matchingSkills = userSkills.filter(s => 
    oppTags.some(t => t.includes(s) || s.includes(t))
  );

  if (matchingSkills.length >= 2) {
    score += 20;
    checks.push({
      criterion: "Technical Skills & Competencies",
      met: true,
      details: `Strong match on ${matchingSkills.length} key competencies (${matchingSkills.slice(0, 3).join(", ")}).`
    });
    strengths.push(`Proven skills in ${matchingSkills.slice(0, 3).join(", ")} meet opportunity requirements`);
  } else if (matchingSkills.length === 1) {
    score += 12;
    checks.push({
      criterion: "Technical Skills & Competencies",
      met: true,
      details: `Core match on ${matchingSkills[0]}. Demonstrating related work will strengthen your candidacy.`
    });
    strengths.push(`Relevant skills in ${matchingSkills[0]}`);
  } else {
    score += 6;
    checks.push({
      criterion: "Technical Skills & Competencies",
      met: false,
      details: `Program emphasizes ${opp.tags.slice(0, 3).join(", ")}. Experience in adjacent tools is valuable.`
    });
    tips.push(`Include references to projects demonstrating familiarity with ${opp.tags[0] || "core tools"}.`);
  }

  // 3. Institution & Academic Standing
  if (profile.university && profile.university.trim().length > 0) {
    score += 8;
    checks.push({
      criterion: "Institution & Enrollment Status",
      met: true,
      details: `Currently enrolled/affiliated at ${profile.university}. Program accepts candidates globally.`
    });
    strengths.push(`Enrolled at ${profile.university}`);
  } else {
    checks.push({
      criterion: "Institution & Enrollment Status",
      met: true,
      details: "Open enrollment recognized across collegiate and independent learners."
    });
  }

  // 4. Graduation Year / Academic Timeline
  if (profile.gradYear && profile.gradYear.trim().length > 0) {
    score += 7;
    checks.push({
      criterion: "Academic Timeline & Grad Schedule",
      met: true,
      details: `Expected completion / graduation timeline: "${profile.gradYear}". Compatible with cohort duration.`
    });
  } else {
    checks.push({
      criterion: "Academic Timeline & Grad Schedule",
      met: true,
      details: "Flexible academic timeline supported."
    });
  }

  // 5. GPA / Academic Standing
  const minGpa = opp.eligibilityCriteria.minGpa;
  const userGpaNum = parseFloat(profile.gpa);
  if (minGpa && !isNaN(userGpaNum)) {
    if (userGpaNum >= minGpa) {
      score += 10;
      checks.push({
        criterion: `Minimum GPA (${minGpa.toFixed(1)}+)`,
        met: true,
        details: `Your current GPA (${profile.gpa}) exceeds the ${minGpa.toFixed(1)} threshold.`
      });
      strengths.push(`Exemplary academic record with GPA ${profile.gpa}`);
    } else {
      score -= 5;
      checks.push({
        criterion: `Minimum GPA (${minGpa.toFixed(1)}+)`,
        met: false,
        details: `Reported GPA is ${profile.gpa} vs ${minGpa.toFixed(1)} benchmark. Strong portfolios often offset GPA in holistic reviews.`
      });
      tips.push("Emphasize practical project deliverables and technical achievements to balance GPA evaluation.");
    }
  } else {
    checks.push({
      criterion: "Holistic Academic Review",
      met: true,
      details: "No rigid GPA cutoff; evaluated based on portfolio, essays, and impact."
    });
  }

  // Cap score between 48 and 98
  score = Math.min(98, Math.max(48, score));

  let verdict: AIMatchResult["verdict"] = "Good Alignment";
  if (score >= 88) verdict = "Exceptional Match";
  else if (score >= 75) verdict = "Strong Candidate";
  else if (score >= 60) verdict = "Good Alignment";
  else verdict = "Challenging / Reach";

  if (strengths.length === 0) {
    strengths.push("Broad interdisciplinary background allows for versatile contribution");
    strengths.push("Eager academic timeline ready for immediate program onboarding");
  }

  if (tips.length === 0) {
    tips.push("Craft a focused personal statement reflecting why this specific opportunity accelerates your career goals.");
    tips.push("Submit your application at least 48 hours before the deadline to ensure smooth review.");
  }

  const analysis = `Based on your profile from ${profile.university || "your university"} with a focus on ${profile.major || "your studies"} (Graduating: ${profile.gradYear || "flexible schedule"}), you hold an estimated ${score}% match with ${opp.organization}'s requirements.`;

  return {
    matchScore: score,
    verdict,
    analysis,
    keyStrengths: strengths.slice(0, 3),
    actionableTips: tips.slice(0, 2),
    eligibilityChecks: checks,
    source: "local_heuristic"
  };
}

export async function fetchAIMatchAnalysis(profile: UserProfile, opp: Opportunity): Promise<AIMatchResult> {
  try {
    const res = await fetch("/api/ai/match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentProfile: profile, opportunity: opp }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.matchScore) {
        return {
          matchScore: data.matchScore,
          verdict: data.verdict || "Strong Candidate",
          analysis: data.analysis || "",
          keyStrengths: data.keyStrengths || [],
          actionableTips: data.actionableTips || [],
          eligibilityChecks: data.eligibilityChecks || calculateLocalMatch(profile, opp).eligibilityChecks,
          source: data.source || "gemini_ai"
        };
      }
    }
  } catch {
    // Network or server offline - fallback to local heuristic engine
  }
  return calculateLocalMatch(profile, opp);
}

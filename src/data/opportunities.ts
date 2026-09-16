import { Opportunity } from "../types";

export const INITIAL_OPPORTUNITIES: Opportunity[] = [
  {
    id: "opp-1",
    title: "Google Generation Scholarship 2026",
    organization: "Google",
    logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=128&auto=format&fit=crop&q=80",
    category: "Scholarship",
    mode: "Remote",
    location: "Global / Regional Hubs",
    deadline: "Dec 15, 2026",
    deadlineDate: "2026-12-15",
    prizeOrStipend: "$10,000 USD Award + Google Retreat",
    featured: true,
    tags: ["Computer Science", "Diversity in Tech", "Undergrad & Grad", "Leadership", "Mentorship"],
    description: "Designed to help students pursuing computer science degrees excel in technology and become active leaders. Recipients receive financial support and an invitation to the virtual Google Scholars Retreat.",
    eligibilityCriteria: {
      minGpa: 3.2,
      targetMajors: ["Computer Science", "Computer Engineering", "Data Science", "Software Engineering"],
      countries: ["Global", "North America", "APAC", "EMEA"],
      educationLevels: ["Undergraduate", "Masters"],
      customRules: [
        "Enrolled as a full-time student in an accredited university or college",
        "Demonstrated passion for increasing involvement of underrepresented groups in tech",
        "Open to all academic graduation years"
      ]
    },
    officialUrl: "https://buildyourfuture.withgoogle.com/scholarships/generation-google-scholarship",
    benefits: [
      "$10,000 USD direct tuition grant",
      "Exclusive Google Mentorship & Technical Mock Interviews",
      "Access to Google Global Scholars Alumni Network"
    ],
    applicationSteps: [
      "Submit General Information and College/University background",
      "Upload Resume/CV highlighting leadership & coding projects",
      "Answer two 300-word essay questions on technical impact",
      "Provide academic transcripts"
    ],
    selectionRate: "Top 4% of applicants",
    sponsorName: "Google Student Programs",
    verifiedSource: true
  },
  {
    id: "opp-2",
    title: "MIT HackMIT 2026 Hackathon",
    organization: "MIT Tech Club",
    logo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=128&auto=format&fit=crop&q=80",
    category: "Hackathon",
    mode: "Hybrid",
    location: "Cambridge, MA & Virtual",
    deadline: "Oct 24, 2026",
    deadlineDate: "2026-10-24",
    prizeOrStipend: "$65,000 in Prizes + VC Seed Access",
    featured: true,
    tags: ["AI/ML", "Web3", "Hardware", "Full-Stack", "Hardware & Cloud"],
    description: "MIT's flagship undergraduate hackathon gathering 1,000+ top collegiate hackers worldwide to build disruptive software and hardware prototypes over 36 hours.",
    eligibilityCriteria: {
      targetMajors: ["All Majors Welcome", "Computer Science", "Engineering", "Design", "Physics"],
      educationLevels: ["Undergraduate", "Masters", "High School"],
      customRules: [
        "Teams of 1 to 4 students",
        "Travel reimbursements provided for selected in-person teams",
        "Any university or college worldwide eligible"
      ]
    },
    officialUrl: "https://hackmit.org",
    benefits: [
      "$65,000+ total prize pool across sponsor tracks",
      "Free hardware lab access (VR headsets, GPUs, microcontrollers)",
      "Direct sponsorship booths & interview fast-tracks from OpenAI, Jane Street & Figma"
    ],
    applicationSteps: [
      "Submit student GitHub/Portfolio and University details",
      "Short project proposal / Hacker track interest",
      "Confirm travel or virtual participation preference"
    ],
    selectionRate: "18% acceptance",
    sponsorName: "MIT Student Committee",
    verifiedSource: true
  },
  {
    id: "opp-3",
    title: "Kleiner Perkins Fellows Program (KP Fellows)",
    organization: "Kleiner Perkins",
    logo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=128&auto=format&fit=crop&q=80",
    category: "Fellowship",
    mode: "In-Person",
    location: "San Francisco Bay Area, CA",
    deadline: "Nov 10, 2026",
    deadlineDate: "2026-11-10",
    prizeOrStipend: "$55/hr - $75/hr + Housing Stipend + Mentorship",
    featured: true,
    tags: ["Engineering", "Product", "Design", "Silicon Valley", "Startup"],
    description: "Pairs top engineering, design, and product students with leading high-growth portfolio companies in Silicon Valley for a summer fellowship paired with exclusive VC mentorship and CEO dinners.",
    eligibilityCriteria: {
      targetMajors: ["Computer Science", "Software Engineering", "HCI / Product Design"],
      educationLevels: ["Undergraduate", "Masters", "Bootcamp / Self-Taught"],
      customRules: [
        "Available for 12-week summer cohort",
        "Open to all students with strong portfolio & technical problem solving"
      ]
    },
    officialUrl: "https://fellows.kleinerperkins.com",
    benefits: [
      "Paid summer internship at top tier portfolio company (e.g. Figma, Stripe, Glean)",
      "Private fireside chats with legendary founders & partners",
      "Lifetime KP Fellows alumni community and angel network"
    ],
    applicationSteps: [
      "Submit Technical Portfolio, GitHub, and Resume",
      "Code challenge / System design assessment",
      "Final portfolio company matching interview"
    ],
    selectionRate: "Top 2% globally",
    sponsorName: "Kleiner Perkins VC",
    verifiedSource: true
  },
  {
    id: "opp-4",
    title: "Palantir Women in Technology Fellowship",
    organization: "Palantir Technologies",
    logo: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=128&auto=format&fit=crop&q=80",
    category: "Scholarship",
    mode: "Hybrid",
    location: "Global / North America & Europe",
    deadline: "Nov 30, 2026",
    deadlineDate: "2026-11-30",
    prizeOrStipend: "$7,000 Grant + Summer Internship Offer",
    featured: false,
    tags: ["Software Engineering", "Women in STEM", "Data Systems", "Security"],
    description: "Celebrates and supports women beginning careers in technology. Grant recipients participate in a multi-day virtual workshop with Palantir engineers and receive an expedited interview path.",
    eligibilityCriteria: {
      minGpa: 3.0,
      targetMajors: ["Computer Science", "Software Engineering", "Electrical Engineering", "Math"],
      educationLevels: ["Undergraduate", "Masters"],
      customRules: [
        "Identify as a woman or non-binary individual pursuing STEM degree",
        "Enrolled in university or college program"
      ]
    },
    officialUrl: "https://www.palantir.com/careers/students/scholarships/wit-global/",
    benefits: [
      "$7,000 educational scholarship",
      "All-expenses-paid multi-day Palantir engineering summit",
      "Direct fast-track for Software Engineer Internships"
    ],
    applicationSteps: [
      "Submit academic info, university name, and graduation timeline",
      "Resume and code sample / GitHub",
      "Short essay on technical problem solving and impact"
    ],
    selectionRate: "Top 5%",
    sponsorName: "Palantir University Relations",
    verifiedSource: true
  },
  {
    id: "opp-5",
    title: "OpenAI Superalignment Student Research Grant",
    organization: "OpenAI",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&auto=format&fit=crop&q=80",
    category: "Grant",
    mode: "Remote",
    location: "Global",
    deadline: "Jan 15, 2027",
    deadlineDate: "2027-01-15",
    prizeOrStipend: "$50,000 - $100,000 Research Grant + Compute Credits",
    featured: true,
    tags: ["AI Safety", "Deep Learning", "LLMs", "Interpretability", "Compute Grants"],
    description: "Funding for passionate undergraduate, masters, and PhD students conducting novel research into superhuman AI alignment, model interpretability, and scalable oversight.",
    eligibilityCriteria: {
      targetMajors: ["Computer Science", "Artificial Intelligence", "Mathematics", "Statistics", "Physics"],
      educationLevels: ["Undergraduate", "Masters", "PhD", "Independent Researcher"],
      customRules: [
        "Proposal must focus on AI alignment, safety, or mechanistic interpretability",
        "Open to students from any accredited higher-ed institution worldwide"
      ]
    },
    officialUrl: "https://openai.com/research/superalignment-grants",
    benefits: [
      "$50,000+ unrestricted research stipend",
      "$25,000 OpenAI API & compute cluster credits",
      "Direct technical mentorship from OpenAI alignment researchers"
    ],
    applicationSteps: [
      "2-page Research Proposal outlining hypothesis and methodology",
      "Academic track record and CV",
      "Sample code repository or pre-print papers (if applicable)"
    ],
    selectionRate: "8% of research proposals",
    sponsorName: "OpenAI Research Fund",
    verifiedSource: true
  },
  {
    id: "opp-6",
    title: "Ethereum Foundation Next Billion Fellowship",
    organization: "Ethereum Foundation",
    logo: "https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?w=128&auto=format&fit=crop&q=80",
    category: "Web3 & Bounty",
    mode: "Remote",
    location: "Global",
    deadline: "Feb 28, 2027",
    deadlineDate: "2027-02-28",
    prizeOrStipend: "$30,000 Stipend + Travel to Devcon",
    featured: false,
    tags: ["Ethereum", "Public Goods", "Cryptography", "Decentralized Tech", "Global Impact"],
    description: "Empowers visionary builders and researchers using decentralized web technologies to solve critical socioeconomic challenges in emerging markets and global communities.",
    eligibilityCriteria: {
      targetMajors: ["Any Field", "Computer Science", "Economics", "Cryptography", "Public Policy"],
      educationLevels: ["Undergraduate", "Masters", "PhD", "Self-Taught"],
      customRules: [
        "Open-source commitment for all project deliverables",
        "Clear impact on the next billion users"
      ]
    },
    officialUrl: "https://fellowship.ethereum.foundation",
    benefits: [
      "$30,000 USD non-dilutive fellowship grant",
      "Full travel sponsorship to Ethereum Devcon",
      "Dedicated technical advisory from core protocol developers"
    ],
    applicationSteps: [
      "Project vision paper and technical architecture diagram",
      "Applicant bio, university/background details, and GitHub repo",
      "30-minute peer review panel interview"
    ],
    selectionRate: "Top 3%",
    sponsorName: "Ethereum Ecosystem Support Program",
    verifiedSource: true
  },
  {
    id: "opp-7",
    title: "CERN Summer Student Programme 2027",
    organization: "CERN (European Organization for Nuclear Research)",
    logo: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=128&auto=format&fit=crop&q=80",
    category: "Internship",
    mode: "In-Person",
    location: "Geneva, Switzerland",
    deadline: "Jan 31, 2027",
    deadlineDate: "2027-01-31",
    prizeOrStipend: "90 CHF/day (~$3,000/mo) + Travel Allowance",
    featured: true,
    tags: ["High Energy Physics", "Scientific Computing", "Distributed Systems", "Data Science"],
    description: "Spend 8 to 13 weeks in Geneva participating in day-to-day work with multinational research teams at the world's premier particle physics laboratory.",
    eligibilityCriteria: {
      minGpa: 3.3,
      targetMajors: ["Physics", "Computer Science", "Mathematics", "Engineering"],
      educationLevels: ["Undergraduate", "Masters"],
      customRules: [
        "Have completed at least 3 years of university-level studies by summer",
        "Good knowledge of English; French is an asset"
      ]
    },
    officialUrl: "https://careers.cern/summer-student-programme",
    benefits: [
      "Monthly subsistence allowance of ~2,700 CHF",
      "Comprehensive physics and scientific computing lecture series",
      "Hands-on research on the Large Hadron Collider (LHC) computing grid"
    ],
    applicationSteps: [
      "Academic CV and University verification transcript",
      "Two academic recommendation letters",
      "Statement of scientific interests"
    ],
    selectionRate: "Top 7% internationally",
    sponsorName: "CERN Human Resources",
    verifiedSource: true
  },
  {
    id: "opp-8",
    title: "Microsoft Research Undergraduate Fellowship",
    organization: "Microsoft Research",
    logo: "https://images.unsplash.com/photo-1618042164219-62c820f10723?w=128&auto=format&fit=crop&q=80",
    category: "Fellowship",
    mode: "Hybrid",
    location: "Redmond, WA & Cambridge, UK",
    deadline: "Dec 01, 2026",
    deadlineDate: "2026-12-01",
    prizeOrStipend: "$15,000 Academic Stipend + Paid Summer Research",
    featured: false,
    tags: ["Systems", "Human-Computer Interaction", "Machine Learning", "Quantum Computing"],
    description: "Supports promising students passionate about computer science research. Includes funding for tuition and living expenses, plus a paid 12-week research internship with Microsoft Research scientists.",
    eligibilityCriteria: {
      minGpa: 3.5,
      targetMajors: ["Computer Science", "Data Science", "Computer Engineering", "Mathematics"],
      educationLevels: ["Undergraduate", "Masters"],
      customRules: [
        "Demonstrated research interest or previous project experience",
        "Enrolled at any accredited college or university"
      ]
    },
    officialUrl: "https://www.microsoft.com/en-us/research/academic-programs/fellowships/",
    benefits: [
      "$15,000 educational award applied to academic expenses",
      "12-week paid research internship at Microsoft Research",
      "Co-authorship opportunities in top-tier conferences (NeurIPS, SIGMOD, CHI)"
    ],
    applicationSteps: [
      "Curriculum Vitae with list of publications/projects",
      "1-page research interest statement",
      "Department head or advisor endorsement letter"
    ],
    selectionRate: "4% acceptance",
    sponsorName: "Microsoft Research",
    verifiedSource: true
  },
  {
    id: "opp-9",
    title: "ETHGlobal San Francisco Hackathon",
    organization: "ETHGlobal",
    logo: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=128&auto=format&fit=crop&q=80",
    category: "Hackathon",
    mode: "In-Person",
    location: "San Francisco, CA",
    deadline: "Nov 05, 2026",
    deadlineDate: "2026-11-05",
    prizeOrStipend: "$500,000+ in Total Bounties & Pool Prizes",
    featured: true,
    tags: ["Solidity", "Zero Knowledge", "DeFi", "Smart Contracts", "AI x Crypto"],
    description: "The world's largest gathering of Web3 developers, researchers, and creators. Build next-generation decentralized applications, zero-knowledge proofs, and autonomous agents.",
    eligibilityCriteria: {
      targetMajors: ["All Majors", "Computer Science", "Cryptography", "Design"],
      educationLevels: ["Undergraduate", "Masters", "PhD", "Self-Taught"],
      customRules: [
        "Open to beginners and advanced blockchain builders",
        "Must build prototype during the 36-hour hackathon window"
      ]
    },
    officialUrl: "https://ethglobal.com/events/sanfrancisco2026",
    benefits: [
      "Access to $500,000+ sponsor bounty pool (Uniswap, Polygon, Base, Arbitrum)",
      "Free hacker housing and travel scholarships for eligible collegiate hackers",
      "Investor pitching session for top 10 finalists"
    ],
    applicationSteps: [
      "ETHGlobal hacker profile registration",
      "Portfolio/GitHub link submission",
      "Staker/Proof of intent confirmation"
    ],
    selectionRate: "Open collegiate hacker track",
    sponsorName: "ETHGlobal Ecosystem",
    verifiedSource: true
  },
  {
    id: "opp-10",
    title: "Kaggle AI Grand Prize Competition",
    organization: "Kaggle & Google DeepMind",
    logo: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=128&auto=format&fit=crop&q=80",
    category: "Coding Contest",
    mode: "Remote",
    location: "Global",
    deadline: "Dec 31, 2026",
    deadlineDate: "2026-12-31",
    prizeOrStipend: "$100,000 Cash Prize Pool + TPU Pod Access",
    featured: false,
    tags: ["Machine Learning", "PyTorch", "NLP", "LLM Fine-Tuning", "Data Science"],
    description: "Compete with global machine learning practitioners to build state-of-the-art multimodal reasoning models. Benchmark your code on live test datasets and climb the Kaggle leaderboard.",
    eligibilityCriteria: {
      targetMajors: ["Any Major", "Data Science", "Computer Science", "Math"],
      educationLevels: ["Undergraduate", "Masters", "PhD", "Enthusiasts"],
      customRules: [
        "Open to solo competitors and teams up to 5 members",
        "Submissions must be reproducible using open notebooks"
      ]
    },
    officialUrl: "https://www.kaggle.com/competitions",
    benefits: [
      "$100,000 in cash prizes for top 10 leaderboard teams",
      "Google Cloud TPU v5e credits for compute training",
      "Kaggle Grandmaster points and recruiting spotlight"
    ],
    applicationSteps: [
      "Join competition on Kaggle with verified phone/email",
      "Submit baseline notebook with model weights",
      "Submit final inference pipeline before leaderboard freeze"
    ],
    selectionRate: "Open global ranking",
    sponsorName: "Google DeepMind",
    verifiedSource: true
  },
  {
    id: "opp-11",
    title: "Jane Street Graduate & Undergraduate Tech Fellowship",
    organization: "Jane Street",
    logo: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=128&auto=format&fit=crop&q=80",
    category: "Fellowship",
    mode: "In-Person",
    location: "New York, NY & London, UK",
    deadline: "Nov 15, 2026",
    deadlineDate: "2026-11-15",
    prizeOrStipend: "$10,000 Fellowship Award + All-Expenses NYC Summit",
    featured: true,
    tags: ["OCaml", "Quantitative Trading", "Functional Programming", "Algorithms", "Low Latency"],
    description: "An intensive multi-day program introducing top STEM students to functional programming in OCaml, market microstructure, and high-performance algorithmic engineering.",
    eligibilityCriteria: {
      minGpa: 3.6,
      targetMajors: ["Computer Science", "Mathematics", "Physics", "Electrical Engineering"],
      educationLevels: ["Undergraduate", "Masters"],
      customRules: [
        "Strong foundation in algorithmic reasoning, discrete math, or systems programming",
        "Enrolled in university or college program"
      ]
    },
    officialUrl: "https://www.janestreet.com/join-jane-street/programs-and-events/",
    benefits: [
      "$10,000 educational stipend",
      "Roundtrip flights, luxury NYC hotel, and catered dining",
      "Direct interview path for $125/hr Quantitative Developer Internships"
    ],
    applicationSteps: [
      "Online application with university, major, and graduation details",
      "Math and algorithmic logic assessment",
      "Technical video interview"
    ],
    selectionRate: "Top 1.5% globally",
    sponsorName: "Jane Street Capital",
    verifiedSource: true
  },
  {
    id: "opp-12",
    title: "NASA International Space Apps Challenge",
    organization: "NASA",
    logo: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=128&auto=format&fit=crop&q=80",
    category: "Hackathon",
    mode: "Hybrid",
    location: "Global / Local Chapters & Online",
    deadline: "Oct 18, 2026",
    deadlineDate: "2026-10-18",
    prizeOrStipend: "Global Winner Trophy + NASA Kennedy Space Center Launch Pass",
    featured: false,
    tags: ["Earth Science", "Aerospace", "Open Data", "Climate", "Satellite Imagery"],
    description: "The largest global space and science hackathon. Solve real-world challenges on Earth and in space using NASA's open-source satellite data, Earth observation platforms, and AI tools.",
    eligibilityCriteria: {
      targetMajors: ["All Fields", "Aerospace", "Computer Science", "Environmental Science", "Design"],
      educationLevels: ["Undergraduate", "Masters", "High School", "Anyone"],
      customRules: [
        "Teams of 2 to 6 participants",
        "Projects must utilize at least one NASA Open Data API"
      ]
    },
    officialUrl: "https://www.spaceappschallenge.org",
    benefits: [
      "Global Winner recognition from NASA leadership",
      "Invitation to attend a rocket launch at NASA Kennedy Space Center",
      "Feature in NASA Earth Science publication"
    ],
    applicationSteps: [
      "Register on Space Apps Challenge portal",
      "Choose a challenge category (Earth, Sun, Deep Space, Planetary)",
      "Submit project demo video, code repository, and slides"
    ],
    selectionRate: "Open entry; top 10 global awards",
    sponsorName: "NASA Earth Science Division",
    verifiedSource: true
  }
];

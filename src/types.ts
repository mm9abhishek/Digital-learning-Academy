export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  avatar: string;
  title: string;
  collegeOrCompany: string;
  city: string;
  xp: number;
  streakDays: number;
  completedLessonIds: string[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  businessName: string;
  businessType: string;
  businessLocation: string;
  currency: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  durationHours: number;
  totalLessons: number;
  totalAssignments: number;
  coverImage: string;
  tags: string[];
}

export interface KeyTakeaway {
  title: string;
  description: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  order: number;
  title: string;
  shortDescription: string;
  estimatedMinutes: number;
  category: 'Strategy' | 'Audience' | 'Copywriting' | 'Budgeting' | 'Simulation' | 'Portfolio';
  contentMarkdown: string;
  keyTakeaways: KeyTakeaway[];
  assignmentId?: string;
}

export interface RubricCriterion {
  id: string;
  name: string;
  weight: number; // e.g. 25 for 25%
  description: string;
  maxScore: number;
}

export interface Assignment {
  id: string;
  lessonId: string;
  title: string;
  subtitle: string;
  clientBrief: string;
  targetObjective: string;
  taskInstructions: string[];
  rubricCriteria: RubricCriterion[];
  starterTemplate: string;
  sampleHighQualityAnswer?: string;
  suggestedWordCount?: string;
}

export interface RubricScoreItem {
  criterionId: string;
  criterionName: string;
  score: number;
  maxScore: number;
  feedback: string;
}

export interface AiFeedback {
  id: string;
  submissionId: string;
  overallScore: number; // 0-100
  grade: 'A+' | 'A' | 'B' | 'C' | 'Needs Revision';
  isAiGenerated: boolean;
  modelUsed: string;
  evalTimestamp: string;
  summaryFeedback: string;
  rubricBreakdown: RubricScoreItem[];
  strengths: string[];
  issues: string[];
  recommendedImprovements: string[];
  exampleRevision: string;
  nextPracticeTask: string;
}

export interface Submission {
  id: string;
  assignmentId: string;
  userId: string;
  submittedContent: string;
  version: number;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'submitted' | 'evaluated';
  feedback?: AiFeedback;
}

export type SimulatorPlatform = 'Meta Ads' | 'Google Search';
export type CampaignObjective = 'Footfall & Store Visits' | 'Table Reservations (Leads)' | 'Brand Awareness' | 'Weekend Special Sales';

export interface SimulatorScenarioPreset {
  id: string;
  name: string;
  tag: string;
  description: string;
  problemSummary: string;
  rootCause: string;
  howToFix: string;
  baseModifier: {
    ctrMultiplier: number;
    cpcMultiplier: number;
    cvrMultiplier: number;
  };
}

export interface SimulatorRunInput {
  campaignName: string;
  platform: SimulatorPlatform;
  objective: CampaignObjective;
  location: string;
  radiusKm: number;
  targetAudience: string;
  adCopyHeadline: string;
  adCopyBody: string;
  ctaText: string;
  dailyBudgetINR: number;
  durationDays: number;
  avgOrderValueINR: number;
  presetScenarioId?: string;
}

export interface SimulatorRunResult {
  id: string;
  userId: string;
  input: SimulatorRunInput;
  totalBudgetINR: number;
  impressions: number;
  clicks: number;
  ctrPercent: number;
  cpcINR: number;
  conversions: number; // e.g. Bookings or Orders
  conversionRatePercent: number;
  cplINR: number; // Cost per Lead / Booking
  estimatedRevenueINR: number;
  roas: number; // Return on Ad Spend
  netProfitINR: number;
  frequency: number;
  formulaExplanations: {
    ctr: string;
    cpc: string;
    conversions: string;
    cpl: string;
    roas: string;
  };
  diagnosticNotes: string[];
  optimizationTips: string[];
  createdAt: string;
  isSavedToPortfolio: boolean;
}

export interface PortfolioProject {
  id: string;
  userId: string;
  title: string;
  businessName: string;
  brief: string;
  submissionId?: string;
  submissionSnippet?: string;
  aiScore?: number;
  aiStrengthsSummary?: string[];
  simulatorRunId?: string;
  simulatedRoas?: number;
  simulatedConversions?: number;
  simulatedSpendINR?: number;
  skillsDemonstrated: string[];
  keyArtifacts: {
    type: 'Ad Copy' | 'Audience Strategy' | 'Budget Plan' | 'Campaign Simulation';
    title: string;
    summary: string;
  }[];
  shareToken: string;
  createdAt: string;
}

export interface PlatformStats {
  totalStudents: number;
  activeCampaigns: number;
  submissionsEvaluated: number;
  avgScore: number;
  topPerformingSkills: string[];
}

export interface SupabaseColumnMeta {
  name: string;
  type: string;
  isPrimary?: boolean;
  isNullable?: boolean;
}

export interface SupabaseTableMeta {
  tableName: string;
  displayName: string;
  description: string;
  rowCount: number;
  columns: SupabaseColumnMeta[];
}

export interface SqlQueryResult {
  query: string;
  columns: string[];
  rows: any[];
  rowCount: number;
  executionTimeMs: number;
  error?: string;
}

export interface SupabaseConnectionStatus {
  isConfigured: boolean;
  isConnected: boolean;
  supabaseUrl: string | null;
  hasAnonKey: boolean;
  hasServiceRoleKey: boolean;
  message: string;
  error?: string;
  tablesStatus?: Record<string, { exists: boolean; rowCount: number }>;
}

// --- SEO Planning & Traffic Estimator Types ---
export interface KeywordPlanItem {
  id: string;
  keyword: string;
  monthlySearchVolume: number;
  competition: 'Low' | 'Medium' | 'High';
  avgCpcINR: number;
  difficulty: number; // 0-100
  intent: 'Transactional' | 'Commercial' | 'Informational' | 'Local';
  suggestedFormat: string;
  isInPlan?: boolean;
}

export interface ExpectedTrafficForecast {
  targetRankPosition: number;
  totalMonthlySearches: number;
  expectedCtrPercent: number;
  expectedMonthlyImpressions: number;
  expectedMonthlyClicks: number;
  expectedConversions: number;
  conversionRatePercent: number;
  estimatedOrganicValueINR: number;
}

export interface ContentIdeaItem {
  id: string;
  title: string;
  targetKeyword: string;
  searchIntent: string;
  format: 'SEO Guide' | 'Instagram Reel / Short' | 'Local Food PR' | 'Comparison & Listicle' | 'GMB Update';
  targetPersona: string;
  estimatedMonthlyTraffic: number;
  outline: string[];
  ctaRecommendation: string;
}

// --- Dummy Google Ads Practice Types ---
export interface GoogleAdPracticeCampaign {
  id: string;
  campaignName: string;
  targetLocation: string;
  dailyBudgetINR: number;
  bidStrategy: 'Maximize Clicks' | 'Target CPA' | 'Manual CPC';
  targetKeywords: { keyword: string; matchType: 'Broad' | 'Phrase' | 'Exact' }[];
  negativeKeywords: string[];
  headlines: string[];
  descriptions: string[];
  finalUrl: string;
  displayPath1: string;
  displayPath2: string;
}

export interface GoogleAdAuditResult {
  adEffectivenessScore: number; // 0-100
  adStrength: 'Poor' | 'Average' | 'Good' | 'Excellent';
  qualityScore: number; // 1-10
  expectedCtrScore: number; // 1-10
  adRelevanceScore: number; // 1-10
  landingPageScore: number; // 1-10
  projectedMetrics: {
    dailyImpressions: number;
    dailyClicks: number;
    avgCpcINR: number;
    dailyCostINR: number;
    dailyConversions: number;
    roas: number;
  };
  suggestions: {
    category: string;
    tip: string;
    impact: 'High' | 'Medium' | 'Low';
  }[];
  optimizedVariant: {
    headlines: string[];
    descriptions: string[];
    recommendedKeywords: string[];
    recommendedNegativeKeywords: string[];
  };
}

// --- Dummy Google Search Console (GSC) Types ---
export interface GscQueryItem {
  id: string;
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  trend: 'up' | 'down' | 'stable';
}

export interface GscPageItem {
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface GscOptimizationInput {
  pageUrl: string;
  targetKeyword: string;
  secondaryKeywords: string[];
  pageTitle: string;
  metaDescription: string;
  h1Heading: string;
  contentSnippet: string;
}

export interface GscAuditResult {
  seoPlacementScore: number; // 0-100
  titleOptimization: { score: number; feedback: string };
  metaOptimization: { score: number; feedback: string };
  headingOptimization: { score: number; feedback: string };
  currentProjectedRank: number;
  potentialRank: number;
  expectedTrafficLiftPercent: number;
  suggestions: string[];
  aiOptimizedTitle: string;
  aiOptimizedMeta: string;
  aiOptimizedH1: string;
}


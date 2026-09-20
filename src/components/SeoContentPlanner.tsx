import React, { useState, useEffect } from 'react';
import {
  Search,
  Sparkles,
  TrendingUp,
  Sliders,
  Compass,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  Copy,
  Check,
  BarChart3,
  Globe,
  Share2,
  Target,
  FileText,
  Video,
  Plus,
  Trash2,
  HelpCircle,
  IndianRupee,
  Layers,
} from 'lucide-react';
import { KeywordPlanItem, ExpectedTrafficForecast, ContentIdeaItem } from '../types';

export const SeoContentPlanner: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'keywords' | 'forecast' | 'ideation'>('keywords');
  const [searchTopic, setSearchTopic] = useState('artisan coffee and cafes in hazratganj lucknow');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Keywords State
  const [keywords, setKeywords] = useState<KeywordPlanItem[]>([
    {
      id: 'kw_1',
      keyword: 'best cafe in hazratganj lucknow',
      monthlySearchVolume: 8400,
      competition: 'Medium',
      avgCpcINR: 28,
      difficulty: 42,
      intent: 'Commercial',
      suggestedFormat: 'Local Guide & Comparison Article',
      isInPlan: true,
    },
    {
      id: 'kw_2',
      keyword: 'artisan coffee lucknow roastery',
      monthlySearchVolume: 3200,
      competition: 'Low',
      avgCpcINR: 22,
      difficulty: 28,
      intent: 'Transactional',
      suggestedFormat: 'Menu & Brewing Process Landing Page',
      isInPlan: true,
    },
    {
      id: 'kw_3',
      keyword: 'cafes with wifi for working in lucknow',
      monthlySearchVolume: 5100,
      competition: 'Low',
      avgCpcINR: 18,
      difficulty: 31,
      intent: 'Informational',
      suggestedFormat: 'Coworking / Remote Work Lifestyle Blog',
      isInPlan: true,
    },
    {
      id: 'kw_4',
      keyword: 'hazratganj evening hangout spots for couples',
      monthlySearchVolume: 9600,
      competition: 'Medium',
      avgCpcINR: 34,
      difficulty: 49,
      intent: 'Local',
      suggestedFormat: 'Instagram Reel + GMB Visual Post',
      isInPlan: false,
    },
    {
      id: 'kw_5',
      keyword: 'specialty cold brew and dessert in gomti nagar',
      monthlySearchVolume: 2800,
      competition: 'Low',
      avgCpcINR: 24,
      difficulty: 22,
      intent: 'Transactional',
      suggestedFormat: 'Product Highlight & WhatsApp Reservation',
      isInPlan: false,
    },
    {
      id: 'kw_6',
      keyword: 'the nawabi bean cafe lucknow menu and prices',
      monthlySearchVolume: 1900,
      competition: 'Low',
      avgCpcINR: 12,
      difficulty: 14,
      intent: 'Transactional',
      suggestedFormat: 'Structured Schema Menu Page',
      isInPlan: true,
    },
  ]);

  // Content Ideas State
  const [contentIdeas, setContentIdeas] = useState<ContentIdeaItem[]>([
    {
      id: 'ci_1',
      title: '7 Hidden Cafes in Hazratganj Where Lucknow Freelancers Actually Get Work Done',
      targetKeyword: 'cafes with wifi for working in lucknow',
      searchIntent: 'Commercial Investigation',
      format: 'SEO Guide',
      targetPersona: 'Remote Tech & Creative Professionals in Lucknow',
      estimatedMonthlyTraffic: 1450,
      outline: [
        'The Rise of Work-from-Café Culture in Tier-2 India',
        'Acoustic Ambiance & Power Outlet Availability at The Nawabi Bean',
        'The 4-Hour Productivity Combo: Cardamom Cold Brew & Shahi Cookie',
      ],
      ctaRecommendation: 'Reserve a quiet workstation table with power outlet via WhatsApp',
    },
    {
      id: 'ci_2',
      title: 'How Chikmagalur Single-Origin Meets Awadhi Khansama Spices (Behind the Roast)',
      targetKeyword: 'artisan coffee lucknow roastery',
      searchIntent: 'Informational & Brand Trust',
      format: 'Instagram Reel / Short',
      targetPersona: 'Gen-Z and Millennial Specialty Coffee Enthusiasts',
      estimatedMonthlyTraffic: 3800,
      outline: [
        'Macro shot of green beans roasting at 205°C',
        'Infusing delicate green cardamom without overpowering Arabica notes',
        'Pour-over brewing ritual in brass Awadhi kettles',
      ],
      ctaRecommendation: 'Claim 15% tasting discount for first-time pour-over orders',
    },
    {
      id: 'ci_3',
      title: 'Hazratganj Weekend Date Night Guide: Acoustic Music & Dessert Pairings',
      targetKeyword: 'hazratganj evening hangout spots for couples',
      searchIntent: 'Local Discovery',
      format: 'Local Food PR',
      targetPersona: 'Young Couples & Evening Leisure Seekers',
      estimatedMonthlyTraffic: 2200,
      outline: [
        'Strolling through Hazratganj Victorian corridors at sunset',
        'Live unplugged ghazal & acoustic covers schedule at The Nawabi Bean',
        'Pairing Saffron Latte with warm pistachio baklava',
      ],
      ctaRecommendation: 'Book Saturday priority couch seating before 6 PM',
    },
  ]);

  // Traffic Estimator Parameters
  const [targetRank, setTargetRank] = useState<number>(2); // Rank 1 to 10
  const [conversionRate, setConversionRate] = useState<number>(4.5); // % of visitors who book/inquire
  const [avgCustomerSpendINR, setAvgCustomerSpendINR] = useState<number>(450);

  // Suggested Presets
  const presets = [
    'Artisan Coffee & Roastery Lucknow',
    'Best Work from Cafe Hazratganj',
    'Romantic Evening Hangouts Lucknow',
    'Specialty Cold Brew & Dessert Menu',
  ];

  // CTR curves by Google organic rank position
  const rankCtrMap: Record<number, number> = {
    1: 31.7,
    2: 15.8,
    3: 9.8,
    4: 6.8,
    5: 5.2,
    6: 4.1,
    7: 3.3,
    8: 2.6,
    9: 2.1,
    10: 1.8,
  };

  // Compute total planned keywords volume
  const plannedKeywords = keywords.filter((k) => k.isInPlan);
  const totalPlannedSearches = plannedKeywords.reduce((acc, k) => acc + k.monthlySearchVolume, 0);
  const effectiveCtr = rankCtrMap[targetRank] || 10;
  const expectedMonthlyClicks = Math.round((totalPlannedSearches * effectiveCtr) / 100);
  const expectedConversions = Math.round((expectedMonthlyClicks * conversionRate) / 100);
  const estimatedOrganicMediaValueINR = Math.round(
    plannedKeywords.reduce((acc, k) => acc + (k.monthlySearchVolume * (effectiveCtr / 100) * k.avgCpcINR), 0)
  );
  const projectedRevenueINR = expectedConversions * avgCustomerSpendINR;

  const handleGeneratePlan = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/seo/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: searchTopic,
          businessName: 'The Nawabi Bean Café & Artisanal Roastery',
          city: 'Lucknow',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.keywords && data.keywords.length > 0) {
          setKeywords(
            data.keywords.map((k: any, idx: number) => ({
              ...k,
              isInPlan: idx < 4,
            }))
          );
        }
        if (data.contentIdeas && data.contentIdeas.length > 0) {
          setContentIdeas(data.contentIdeas);
        }
      }
    } catch (e) {
      console.error('Failed to generate SEO plan:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleKeywordInPlan = (id: string) => {
    setKeywords((prev) =>
      prev.map((k) => (k.id === id ? { ...k, isInPlan: !k.isInPlan } : k))
    );
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header Banner */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] uppercase font-bold bg-amber-100 text-amber-900 border border-amber-300">
                SEO &amp; Content Engine
              </span>
              <span className="text-xs text-slate-500 font-medium">Case Study: The Nawabi Bean Café • Lucknow</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 font-display">
              SEO Planning, Content Ideations &amp; Expected Traffic Estimator
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
              Discover high-intent local search queries, forecast your organic Google traffic potential, and generate viral content marketing briefs engineered to convert local Lucknow diners.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-center">
              <span className="text-[10px] uppercase font-bold text-amber-800 block">Total Planned Search Pool</span>
              <p className="text-lg font-bold text-amber-900 mt-0.5">{totalPlannedSearches.toLocaleString()}/mo</p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
              <span className="text-[10px] uppercase font-bold text-emerald-800 block">Estimated Organic Value</span>
              <p className="text-lg font-bold text-emerald-900 mt-0.5">₹{estimatedOrganicMediaValueINR.toLocaleString()}/mo</p>
            </div>
          </div>
        </div>

        {/* Search Input Bar & Quick Presets */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="input-seo-search-topic"
                type="text"
                value={searchTopic}
                onChange={(e) => setSearchTopic(e.target.value)}
                placeholder="Enter topic, product or local query (e.g., best cafes in hazratganj lucknow)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500 bg-slate-50/50"
              />
            </div>
            <button
              id="btn-run-seo-plan"
              onClick={handleGeneratePlan}
              disabled={isLoading}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-xs transition-colors shrink-0 disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'AI Brainstorming...' : 'Generate Keyword & Content Plan'}</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[11px] font-semibold text-slate-500">Quick Inspiration Presets:</span>
            {presets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setSearchTopic(p)}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex border-b border-slate-200 space-x-4">
        <button
          id="subtab-keywords"
          onClick={() => setActiveSubTab('keywords')}
          className={`flex items-center space-x-2 py-3 px-2 border-b-2 text-xs sm:text-sm font-bold transition-all ${
            activeSubTab === 'keywords'
              ? 'border-amber-500 text-amber-900'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>1. Keyword Research &amp; Planner ({keywords.length})</span>
        </button>

        <button
          id="subtab-forecast"
          onClick={() => setActiveSubTab('forecast')}
          className={`flex items-center space-x-2 py-3 px-2 border-b-2 text-xs sm:text-sm font-bold transition-all ${
            activeSubTab === 'forecast'
              ? 'border-amber-500 text-amber-900'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>2. Expected Traffic Forecasting Calculator</span>
        </button>

        <button
          id="subtab-ideation"
          onClick={() => setActiveSubTab('ideation')}
          className={`flex items-center space-x-2 py-3 px-2 border-b-2 text-xs sm:text-sm font-bold transition-all ${
            activeSubTab === 'ideation'
              ? 'border-amber-500 text-amber-900'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Lightbulb className="w-4 h-4" />
          <span>3. Content Marketing Ideations &amp; Briefs ({contentIdeas.length})</span>
        </button>
      </div>

      {/* TAB 1: KEYWORD RESEARCH & PLANNER */}
      {activeSubTab === 'keywords' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start justify-between gap-3 text-xs text-slate-700">
            <div className="flex items-start space-x-2.5">
              <Compass className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-slate-900">How to use this Keyword Plan:</p>
                <p className="text-slate-600 mt-0.5">
                  Check the box next to queries you wish to target in your content and SEO roadmap. These will feed automatically into your <strong>Expected Traffic Forecast</strong> and <strong>Google Ads / GSC Practice Tools</strong>.
                </p>
              </div>
            </div>
            <span className="font-bold text-amber-900 whitespace-nowrap">
              {plannedKeywords.length} of {keywords.length} In Campaign Plan
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3.5 px-4 w-12 text-center">Plan</th>
                    <th className="py-3.5 px-4">Keyword Query</th>
                    <th className="py-3.5 px-4">Search Volume</th>
                    <th className="py-3.5 px-4">Competition</th>
                    <th className="py-3.5 px-4">Avg CPC</th>
                    <th className="py-3.5 px-4">Keyword Difficulty</th>
                    <th className="py-3.5 px-4">Intent</th>
                    <th className="py-3.5 px-4">Recommended Format</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {keywords.map((kw) => (
                    <tr
                      key={kw.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        kw.isInPlan ? 'bg-amber-50/30' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={kw.isInPlan}
                          onChange={() => toggleKeywordInPlan(kw.id)}
                          className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-slate-300 cursor-pointer"
                        />
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        <span>{kw.keyword}</span>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800">
                        {kw.monthlySearchVolume.toLocaleString()}/mo
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            kw.competition === 'Low'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : kw.competition === 'Medium'
                              ? 'bg-amber-100 text-amber-800 border border-amber-200'
                              : 'bg-rose-100 text-rose-800 border border-rose-200'
                          }`}
                        >
                          {kw.competition}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-800">
                        ₹{kw.avgCpcINR}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-16 h-2 rounded-full bg-slate-200 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                kw.difficulty < 30
                                  ? 'bg-emerald-500'
                                  : kw.difficulty < 50
                                  ? 'bg-amber-500'
                                  : 'bg-rose-500'
                              }`}
                              style={{ width: `${kw.difficulty}%` }}
                            />
                          </div>
                          <span className="text-[11px] font-bold text-slate-700">{kw.difficulty}/100</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                          {kw.intent}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium">
                        {kw.suggestedFormat}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EXPECTED TRAFFIC FORECASTING CALCULATOR */}
      {activeSubTab === 'forecast' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Controls Card */}
            <div className="lg:col-span-1 p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-600" />
                  Forecast Parameters
                </h3>
                <p className="text-xs text-slate-500">
                  Adjust simulated Google Search ranking and conversion friction to see expected traffic and revenue numbers.
                </p>
              </div>

              {/* Slider: Target Rank Position */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800">Target Organic Rank Position</span>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-xs">
                    Position #{targetRank} ({effectiveCtr}% CTR)
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={targetRank}
                  onChange={(e) => setTargetRank(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>#1 (31.7% CTR)</span>
                  <span>#5 (5.2% CTR)</span>
                  <span>#10 (1.8% CTR)</span>
                </div>
              </div>

              {/* Slider: Visitor to Booking Conversion Rate */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800">Conversion Rate (Traffic ➔ Table Booking)</span>
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-bold text-xs">
                    {conversionRate}%
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  step="0.5"
                  value={conversionRate}
                  onChange={(e) => setConversionRate(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>1% (Weak CTA)</span>
                  <span>5% (WhatsApp Button)</span>
                  <span>15% (Special Offer)</span>
                </div>
              </div>

              {/* Input: Average Bill Value */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 block">
                  Avg Guest Check / Order Value (INR)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-xs">₹</span>
                  <input
                    type="number"
                    value={avgCustomerSpendINR}
                    onChange={(e) => setAvgCustomerSpendINR(Number(e.target.value) || 0)}
                    className="w-full pl-7 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-900 bg-slate-50"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                <span className="font-bold text-slate-800 block">Current Keyword Bucket:</span>
                <p className="text-slate-600">
                  Calculated from <strong>{plannedKeywords.length} selected keywords</strong> in your plan totaling <strong>{totalPlannedSearches.toLocaleString()} monthly searches</strong>.
                </p>
              </div>
            </div>

            {/* Visual Forecast Results */}
            <div className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {/* Metric 1 */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Expected Monthly Clicks</span>
                  <p className="text-2xl font-bold text-slate-900">{expectedMonthlyClicks.toLocaleString()}</p>
                  <span className="text-[11px] text-emerald-700 font-semibold block">
                    At Rank #{targetRank} ({effectiveCtr}% CTR)
                  </span>
                </div>

                {/* Metric 2 */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Expected Table Bookings</span>
                  <p className="text-2xl font-bold text-amber-600">{expectedConversions.toLocaleString()}</p>
                  <span className="text-[11px] text-slate-500 font-medium block">
                    ~{Math.round(expectedConversions / 30)} reservations/day
                  </span>
                </div>

                {/* Metric 3 */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Free Organic Media Value</span>
                  <p className="text-2xl font-bold text-emerald-700">₹{estimatedOrganicMediaValueINR.toLocaleString()}</p>
                  <span className="text-[11px] text-slate-500 font-medium block">
                    Equivalent Google PPC cost
                  </span>
                </div>

                {/* Metric 4 */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Projected Guest Revenue</span>
                  <p className="text-2xl font-bold text-slate-900">₹{projectedRevenueINR.toLocaleString()}</p>
                  <span className="text-[11px] text-slate-500 font-medium block">
                    At ₹{avgCustomerSpendINR} avg check
                  </span>
                </div>

                {/* Metric 5 */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Monthly Impressions</span>
                  <p className="text-2xl font-bold text-slate-900">{totalPlannedSearches.toLocaleString()}</p>
                  <span className="text-[11px] text-slate-500 font-medium block">
                    High local brand visibility
                  </span>
                </div>

                {/* Metric 6 */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Conversion Efficiency</span>
                  <p className="text-2xl font-bold text-blue-700">{conversionRate}%</p>
                  <span className="text-[11px] text-blue-600 font-medium block">
                    WhatsApp instant CTA
                  </span>
                </div>
              </div>

              {/* Strategic Insights Card */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 font-display">
                    AI Strategic Traffic Insights &amp; Projection Analysis
                  </h4>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Moving from <strong>Position #5 to Position #2</strong> on Google for local queries like <em>&quot;best cafe in hazratganj lucknow&quot;</em> increases your click volume by <strong>+203%</strong> without spending a single Rupee in ad budget. For a café with 18 tables, capturing <strong>{expectedConversions} bookings a month</strong> effectively books out your Friday and Saturday peak dinner slots.
                </p>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-800 block">Recommended Execution Priorities:</span>
                  <ul className="text-xs text-slate-600 space-y-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Implement LocalBusiness Schema Markup on your menu and location pages.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Pin a direct WhatsApp booking link to convert mobile searchers immediately.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Publish the 3 content marketing angles below to capture long-tail search intent.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CONTENT MARKETING IDEATIONS & BRIEFS */}
      {activeSubTab === 'ideation' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                AI-Generated Content Marketing Angles
              </h3>
              <p className="text-xs text-slate-500">
                Actionable content frameworks designed to capture high-intent Lucknow coffee drinkers and turn them into paying regulars.
              </p>
            </div>
            <button
              onClick={handleGeneratePlan}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Regenerate Ideas</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contentIdeas.map((idea) => (
              <div
                key={idea.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 hover:border-amber-400 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                      {idea.format}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      ~{idea.estimatedMonthlyTraffic.toLocaleString()} potential views/mo
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug font-display">
                    {idea.title}
                  </h4>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center space-x-1.5 text-slate-500">
                      <Target className="w-3.5 h-3.5 text-amber-600" />
                      <span>Target Keyword:</span>
                      <strong className="text-slate-800">{idea.targetKeyword}</strong>
                    </div>

                    <div className="flex items-center space-x-1.5 text-slate-500">
                      <Layers className="w-3.5 h-3.5 text-blue-600" />
                      <span>Audience Persona:</span>
                      <span className="text-slate-700">{idea.targetPersona}</span>
                    </div>
                  </div>

                  {/* Outline */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">
                      3-Part Structure &amp; Hook:
                    </span>
                    <ol className="text-xs text-slate-700 space-y-1 list-decimal list-inside">
                      {idea.outline.map((step, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Recommended CTA */}
                  <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs space-y-1">
                    <span className="text-[10px] uppercase font-bold text-emerald-800 block">
                      Recommended Conversion CTA:
                    </span>
                    <p className="text-emerald-900 font-semibold">{idea.ctaRecommendation}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Search Intent: {idea.searchIntent}</span>
                  <button
                    onClick={() =>
                      copyToClipboard(
                        `${idea.title}\nFormat: ${idea.format}\nTarget: ${idea.targetKeyword}\nCTA: ${idea.ctaRecommendation}`,
                        idea.id
                      )
                    }
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-1 transition-colors"
                  >
                    {copiedId === idea.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Brief</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

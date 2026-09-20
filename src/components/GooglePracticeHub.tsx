import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  TrendingUp,
  Target,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Layers,
  Zap,
  HelpCircle,
  Plus,
  Trash2,
  Copy,
  Check,
  Search,
  Globe,
  BarChart2,
  ShieldCheck,
  RefreshCw,
  Info,
  Smartphone,
  Monitor,
} from 'lucide-react';
import {
  GoogleAdPracticeCampaign,
  GoogleAdAuditResult,
  GscQueryItem,
  GscPageItem,
  GscAuditResult,
} from '../types';

export const GooglePracticeHub: React.FC = () => {
  const [activeConsole, setActiveConsole] = useState<'ads' | 'gsc'>('ads');
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('mobile');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // --- GOOGLE ADS PRACTICE STATE ---
  const [adCampaign, setAdCampaign] = useState<GoogleAdPracticeCampaign>({
    id: 'ad_camp_lucknow',
    campaignName: 'Lucknow Heritage Cafe - Weekend Table Bookings',
    targetLocation: 'Lucknow, Uttar Pradesh (15 km radius around Hazratganj)',
    dailyBudgetINR: 600,
    bidStrategy: 'Maximize Clicks',
    targetKeywords: [
      { keyword: 'best cafe in hazratganj', matchType: 'Phrase' },
      { keyword: 'artisan coffee lucknow', matchType: 'Phrase' },
      { keyword: 'the nawabi bean cafe', matchType: 'Exact' },
      { keyword: 'cafes with wifi in lucknow', matchType: 'Broad' },
    ],
    negativeKeywords: ['free coffee', 'vending machine', 'jobs in cafe', 'cheap coffee powder'],
    headlines: [
      '#1 Artisanal Café in Lucknow',
      'The Nawabi Bean • Hazratganj',
      'Reserve Table on WhatsApp',
    ],
    descriptions: [
      'Single-origin Chikmagalur Arabica brewed with cardamom in Hazratganj. 18 cozy tables.',
      'Enjoy live acoustic sets & complimentary saffron biscotti. Tap to book your table instantly.',
    ],
    finalUrl: 'https://the-nawabi-bean.in/lucknow-cafe',
    displayPath1: 'lucknow',
    displayPath2: 'hazratganj',
  });

  const [newKeyword, setNewKeyword] = useState('');
  const [newMatchType, setNewMatchType] = useState<'Broad' | 'Phrase' | 'Exact'>('Phrase');
  const [newNegative, setNewNegative] = useState('');

  const [adAudit, setAdAudit] = useState<GoogleAdAuditResult | null>(null);
  const [isAuditingAds, setIsAuditingAds] = useState(false);

  // --- GOOGLE SEARCH CONSOLE PRACTICE STATE ---
  const [gscSummary, setGscSummary] = useState({
    totalClicks: 2842,
    totalImpressions: 41200,
    averageCtr: 6.9,
    averagePosition: 4.8,
  });

  const [gscQueries, setGscQueries] = useState<GscQueryItem[]>([
    { id: 'gsc_q1', query: 'best cafe in hazratganj lucknow', clicks: 840, impressions: 9200, ctr: 9.13, position: 2.8, trend: 'up' },
    { id: 'gsc_q2', query: 'artisan coffee lucknow', clicks: 512, impressions: 6400, ctr: 8.0, position: 3.4, trend: 'up' },
    { id: 'gsc_q3', query: 'the nawabi bean cafe menu', clicks: 420, impressions: 3100, ctr: 13.55, position: 1.2, trend: 'stable' },
    { id: 'gsc_q4', query: 'cafes with wifi in lucknow', clicks: 390, impressions: 8500, ctr: 4.59, position: 6.8, trend: 'down' },
    { id: 'gsc_q5', query: 'best cold brew lucknow', clicks: 280, impressions: 4200, ctr: 6.67, position: 4.1, trend: 'up' },
    { id: 'gsc_q6', query: 'romantic cafes hazratganj evening', clicks: 240, impressions: 5900, ctr: 4.07, position: 7.9, trend: 'stable' },
  ]);

  // On-page placement optimizer state
  const [seoPlacement, setSeoPlacement] = useState({
    pageUrl: 'https://the-nawabi-bean.in/menu',
    targetKeyword: 'best cafe in hazratganj lucknow',
    secondaryKeywords: 'artisan coffee lucknow, cafes with wifi, hazratganj hangout',
    pageTitle: 'The Nawabi Bean Café | Authentic Artisanal Coffee & Bakery in Hazratganj Lucknow',
    metaDescription: 'Step into Lucknow’s premier artisanal coffee roastery in Hazratganj. Savor single-origin brews, fresh bakery items, and cozy seating. Reserve tables on WhatsApp.',
    h1Heading: 'Experience Artisanal Coffee & Awadhi Heritage in Hazratganj',
    contentSnippet: 'Located in the historic arcade of Hazratganj, The Nawabi Bean merges traditional Awadhi hospitality with third-wave specialty coffee. We source single-origin Chikmagalur beans and offer fast Wi-Fi for remote creators.',
  });

  const [gscAudit, setGscAudit] = useState<GscAuditResult | null>(null);
  const [isAuditingGsc, setIsAuditingGsc] = useState(false);

  // Run initial audits on mount
  useEffect(() => {
    handleRunAdsAudit();
    handleRunGscAudit();
  }, []);

  const handleRunAdsAudit = async () => {
    setIsAuditingAds(true);
    try {
      const res = await fetch('/api/google-ads/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adCampaign),
      });
      if (res.ok) {
        const data = await res.json();
        setAdAudit(data);
      }
    } catch (e) {
      console.error('Google Ads audit error:', e);
    } finally {
      setIsAuditingAds(false);
    }
  };

  const handleRunGscAudit = async () => {
    setIsAuditingGsc(true);
    try {
      const res = await fetch('/api/gsc/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageUrl: seoPlacement.pageUrl,
          targetKeyword: seoPlacement.targetKeyword,
          secondaryKeywords: seoPlacement.secondaryKeywords.split(',').map((s) => s.trim()),
          pageTitle: seoPlacement.pageTitle,
          metaDescription: seoPlacement.metaDescription,
          h1Heading: seoPlacement.h1Heading,
          contentSnippet: seoPlacement.contentSnippet,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setGscAudit(data);
      }
    } catch (e) {
      console.error('GSC audit error:', e);
    } finally {
      setIsAuditingGsc(false);
    }
  };

  const handleAddKeyword = () => {
    if (!newKeyword.trim()) return;
    setAdCampaign((prev) => ({
      ...prev,
      targetKeywords: [
        ...prev.targetKeywords,
        { keyword: newKeyword.trim(), matchType: newMatchType },
      ],
    }));
    setNewKeyword('');
  };

  const handleRemoveKeyword = (index: number) => {
    setAdCampaign((prev) => ({
      ...prev,
      targetKeywords: prev.targetKeywords.filter((_, idx) => idx !== index),
    }));
  };

  const handleAddNegative = () => {
    if (!newNegative.trim()) return;
    setAdCampaign((prev) => ({
      ...prev,
      negativeKeywords: [...prev.negativeKeywords, newNegative.trim()],
    }));
    setNewNegative('');
  };

  const handleRemoveNegative = (index: number) => {
    setAdCampaign((prev) => ({
      ...prev,
      negativeKeywords: prev.negativeKeywords.filter((_, idx) => idx !== index),
    }));
  };

  const handleApplyAdOptimizations = () => {
    if (!adAudit?.optimizedVariant) return;
    setAdCampaign((prev) => ({
      ...prev,
      headlines: adAudit.optimizedVariant.headlines,
      descriptions: adAudit.optimizedVariant.descriptions,
      negativeKeywords: [
        ...prev.negativeKeywords,
        ...adAudit.optimizedVariant.recommendedNegativeKeywords.filter(
          (k) => !prev.negativeKeywords.includes(k)
        ),
      ],
    }));
    setTimeout(() => {
      handleRunAdsAudit();
    }, 200);
  };

  const handleApplyGscOptimizations = () => {
    if (!gscAudit) return;
    setSeoPlacement((prev) => ({
      ...prev,
      pageTitle: gscAudit.aiOptimizedTitle || prev.pageTitle,
      metaDescription: gscAudit.aiOptimizedMeta || prev.metaDescription,
      h1Heading: gscAudit.aiOptimizedH1 || prev.h1Heading,
    }));
    setTimeout(() => {
      handleRunGscAudit();
    }, 200);
  };

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Info & Account Context */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] uppercase font-bold bg-amber-100 text-amber-900 border border-amber-300">
                Live Practice Sandbox
              </span>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Connected Practice Client: The Nawabi Bean Café (Lucknow)</span>
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 font-display">
              Google Ads &amp; Google Search Console Live Practice Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
              Test authentic Google Search Ads setups and SEO keyword placements with real-time AI scoring, Quality Score diagnostics, and actionable revenue recommendations.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 shrink-0">
            <button
              id="tab-toggle-google-ads"
              onClick={() => setActiveConsole('ads')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeConsole === 'ads'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Target className="w-4 h-4 text-amber-600" />
              <span>Google Ads (PPC) Practice</span>
            </button>

            <button
              id="tab-toggle-google-gsc"
              onClick={() => setActiveConsole('gsc')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                activeConsole === 'gsc'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Search className="w-4 h-4 text-blue-600" />
              <span>Google Search Console (GSC)</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. GOOGLE ADS LIVE PRACTICE CONSOLE */}
      {/* ========================================================= */}
      {activeConsole === 'ads' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 Columns: Campaign & Ad Builder */}
            <div className="lg:col-span-7 space-y-5">
              {/* Campaign Settings Card */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-amber-600" />
                    1. Campaign Target &amp; Bidding Setup
                  </h3>
                  <span className="text-[11px] font-semibold text-slate-500">Live Practice Mode</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Campaign Name</label>
                    <input
                      type="text"
                      value={adCampaign.campaignName}
                      onChange={(e) => setAdCampaign({ ...adCampaign, campaignName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-medium"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Target Location</label>
                    <input
                      type="text"
                      value={adCampaign.targetLocation}
                      onChange={(e) => setAdCampaign({ ...adCampaign, targetLocation: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-medium"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Daily Budget (INR)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">₹</span>
                      <input
                        type="number"
                        value={adCampaign.dailyBudgetINR}
                        onChange={(e) => setAdCampaign({ ...adCampaign, dailyBudgetINR: Number(e.target.value) })}
                        className="w-full pl-7 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Bid Strategy</label>
                    <select
                      value={adCampaign.bidStrategy}
                      onChange={(e) => setAdCampaign({ ...adCampaign, bidStrategy: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-medium"
                    >
                      <option value="Maximize Clicks">Maximize Clicks</option>
                      <option value="Target CPA">Target CPA (Cost per Lead)</option>
                      <option value="Manual CPC">Manual CPC</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Keywords & Match Types Card */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
                    <Target className="w-4 h-4 text-amber-600" />
                    2. Keywords &amp; Negative Keywords Setup
                  </h3>
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {adCampaign.targetKeywords.length} Active Keywords
                  </span>
                </div>

                {/* Add Keyword input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    placeholder="Add target keyword (e.g. artisan coffee lucknow)..."
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 text-slate-900"
                  />
                  <select
                    value={newMatchType}
                    onChange={(e) => setNewMatchType(e.target.value as any)}
                    className="px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 text-slate-900 font-medium"
                  >
                    <option value="Phrase">Phrase &quot;kw&quot;</option>
                    <option value="Exact">Exact [kw]</option>
                    <option value="Broad">Broad kw</option>
                  </select>
                  <button
                    onClick={handleAddKeyword}
                    className="px-3.5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center gap-1 shrink-0 hover:bg-slate-800"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>

                {/* Keyword Chips */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {adCampaign.targetKeywords.map((kw, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800"
                    >
                      <span className="text-[10px] font-bold uppercase text-amber-800 bg-amber-100 px-1 rounded">
                        {kw.matchType}
                      </span>
                      <span>
                        {kw.matchType === 'Phrase'
                          ? `"${kw.keyword}"`
                          : kw.matchType === 'Exact'
                          ? `[${kw.keyword}]`
                          : kw.keyword}
                      </span>
                      <button
                        onClick={() => handleRemoveKeyword(idx)}
                        className="text-slate-400 hover:text-rose-600 transition-colors pl-1"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                {/* Negative Keywords */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">Negative Keywords (Spend Protection):</span>
                    <span className="text-slate-500 text-[11px]">{adCampaign.negativeKeywords.length} active</span>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newNegative}
                      onChange={(e) => setNewNegative(e.target.value)}
                      placeholder="Add negative keyword (e.g. -free, -wholesale)..."
                      className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50 text-slate-900"
                    />
                    <button
                      onClick={handleAddNegative}
                      className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 text-xs font-bold hover:bg-rose-100"
                    >
                      Add -Negative
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {adCampaign.negativeKeywords.map((neg, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-1"
                      >
                        <span>-{neg}</span>
                        <button
                          onClick={() => handleRemoveNegative(idx)}
                          className="hover:text-rose-950 font-bold"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Responsive Search Ad (RSA) Live Builder */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-600" />
                    3. Responsive Search Ad (RSA) Copy Builder
                  </h3>
                  <span className="text-[11px] font-semibold text-slate-500">Google Ads Spec: Max 30c / 90c</span>
                </div>

                {/* Headlines */}
                <div className="space-y-2 text-xs">
                  <label className="font-bold text-slate-800 block">Headlines (Up to 30 characters each):</label>
                  {adCampaign.headlines.map((hl, idx) => (
                    <div key={idx} className="relative">
                      <input
                        type="text"
                        maxLength={30}
                        value={hl}
                        onChange={(e) => {
                          const updated = [...adCampaign.headlines];
                          updated[idx] = e.target.value;
                          setAdCampaign({ ...adCampaign, headlines: updated });
                        }}
                        placeholder={`Headline ${idx + 1}...`}
                        className="w-full pl-3 pr-14 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-medium"
                      />
                      <span
                        className={`absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold ${
                          hl.length > 27 ? 'text-amber-600' : 'text-slate-400'
                        }`}
                      >
                        {hl.length}/30
                      </span>
                    </div>
                  ))}
                </div>

                {/* Descriptions */}
                <div className="space-y-2 text-xs">
                  <label className="font-bold text-slate-800 block">Descriptions (Up to 90 characters each):</label>
                  {adCampaign.descriptions.map((desc, idx) => (
                    <div key={idx} className="relative">
                      <textarea
                        rows={2}
                        maxLength={90}
                        value={desc}
                        onChange={(e) => {
                          const updated = [...adCampaign.descriptions];
                          updated[idx] = e.target.value;
                          setAdCampaign({ ...adCampaign, descriptions: updated });
                        }}
                        placeholder={`Description ${idx + 1}...`}
                        className="w-full pl-3 pr-14 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-medium resize-none"
                      />
                      <span
                        className={`absolute right-3 bottom-2.5 text-[11px] font-bold ${
                          desc.length > 82 ? 'text-amber-600' : 'text-slate-400'
                        }`}
                      >
                        {desc.length}/90
                      </span>
                    </div>
                  ))}
                </div>

                {/* Display Path */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Display Path 1</label>
                    <input
                      type="text"
                      value={adCampaign.displayPath1}
                      onChange={(e) => setAdCampaign({ ...adCampaign, displayPath1: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Display Path 2</label>
                    <input
                      type="text"
                      value={adCampaign.displayPath2}
                      onChange={(e) => setAdCampaign({ ...adCampaign, displayPath2: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
                    />
                  </div>
                </div>

                {/* Action Run Audit Button */}
                <div className="pt-2">
                  <button
                    id="btn-run-ads-audit"
                    onClick={handleRunAdsAudit}
                    disabled={isAuditingAds}
                    className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm flex items-center justify-center space-x-2 shadow-sm transition-colors disabled:opacity-50"
                  >
                    <Sparkles className={`w-4 h-4 ${isAuditingAds ? 'animate-spin' : ''}`} />
                    <span>{isAuditingAds ? 'AI Auditing Ad Setup...' : 'Run AI Ad Effectiveness Audit & Quality Score'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Live Google Search Preview & AI Scoring */}
            <div className="lg:col-span-5 space-y-5">
              {/* Google Search Ad Live Preview Card */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-blue-600" />
                    Live Google Search Ad Preview
                  </span>
                  <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg">
                    <button
                      onClick={() => setPreviewDevice('mobile')}
                      className={`p-1 rounded ${previewDevice === 'mobile' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500'}`}
                      title="Mobile View"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setPreviewDevice('desktop')}
                      className={`p-1 rounded ${previewDevice === 'desktop' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500'}`}
                      title="Desktop View"
                    >
                      <Monitor className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Simulated Google SERP Container */}
                <div
                  className={`p-4 rounded-xl border border-slate-200 bg-white space-y-2 ${
                    previewDevice === 'mobile' ? 'max-w-sm mx-auto' : ''
                  }`}
                >
                  <div className="flex items-center space-x-1.5 text-xs text-slate-700">
                    <span className="font-bold text-slate-900 text-[11px]">Sponsored</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-600 truncate text-[11px]">
                      https://the-nawabi-bean.in/{adCampaign.displayPath1}/{adCampaign.displayPath2}
                    </span>
                  </div>

                  {/* Headlines */}
                  <h4 className="text-base text-blue-800 hover:underline cursor-pointer font-medium leading-snug">
                    {adCampaign.headlines.filter(Boolean).join(' | ')}
                  </h4>

                  {/* Descriptions */}
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {adCampaign.descriptions.filter(Boolean).join(' ')}
                  </p>

                  {/* Sitelink Extensions */}
                  <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px]">
                    <div className="p-2 rounded bg-slate-50 border border-slate-100 text-blue-700 font-semibold cursor-pointer">
                      ☕ View Artisan Coffee Menu
                    </div>
                    <div className="p-2 rounded bg-slate-50 border border-slate-100 text-blue-700 font-semibold cursor-pointer">
                      💬 Book on WhatsApp Instant
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Audit & Effectiveness Scoring Results */}
              {adAudit && (
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 font-display">
                        AI Ad Effectiveness &amp; Quality Diagnostics
                      </h4>
                      <p className="text-xs text-slate-500">Live AI Evaluation against Lucknow Hospitality Benchmarks</p>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        adAudit.adStrength === 'Excellent'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : adAudit.adStrength === 'Good'
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : 'bg-amber-100 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {adAudit.adStrength} Ad Strength
                    </span>
                  </div>

                  {/* Primary Scores Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Effectiveness</span>
                      <p className="text-xl font-bold text-amber-600 mt-0.5">{adAudit.adEffectivenessScore}/100</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Quality Score</span>
                      <p className="text-xl font-bold text-emerald-700 mt-0.5">{adAudit.qualityScore}/10</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Expected CTR</span>
                      <p className="text-xl font-bold text-slate-800 mt-0.5">{adAudit.expectedCtrScore}/10</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Ad Relevance</span>
                      <p className="text-xl font-bold text-slate-800 mt-0.5">{adAudit.adRelevanceScore}/10</p>
                    </div>
                  </div>

                  {/* Projected Performance Numbers */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-slate-800 block">
                      Projected Performance Numbers (Daily at ₹{adCampaign.dailyBudgetINR} Budget):
                    </span>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 block">Daily Clicks</span>
                        <strong className="text-slate-900 text-sm">{adAudit.projectedMetrics.dailyClicks}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">Avg CPC</span>
                        <strong className="text-slate-900 text-sm">₹{adAudit.projectedMetrics.avgCpcINR}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">Est. Bookings</span>
                        <strong className="text-emerald-700 text-sm">{adAudit.projectedMetrics.dailyConversions}/day</strong>
                      </div>
                    </div>
                  </div>

                  {/* Suggestions List */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-800 block">
                      Actionable Improvement Suggestions:
                    </span>
                    <div className="space-y-1.5">
                      {adAudit.suggestions.map((s, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs flex items-start space-x-2"
                        >
                          <span
                            className={`px-1.5 py-0.5 rounded text-[9px] font-bold shrink-0 mt-0.5 ${
                              s.impact === 'High'
                                ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                : 'bg-amber-100 text-amber-800 border border-amber-200'
                            }`}
                          >
                            {s.impact} Impact
                          </span>
                          <div className="min-w-0">
                            <span className="font-bold text-slate-800">{s.category}: </span>
                            <span className="text-slate-600">{s.tip}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* One Click Apply AI Optimized Variant */}
                  {adAudit.optimizedVariant && (
                    <div className="pt-2">
                      <button
                        onClick={handleApplyAdOptimizations}
                        className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        <span>One-Click Apply AI-Optimized Headlines &amp; Match Types</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. GOOGLE SEARCH CONSOLE (GSC) LIVE PRACTICE CONSOLE */}
      {/* ========================================================= */}
      {activeConsole === 'gsc' && (
        <div className="space-y-6">
          {/* Top Performance Stats Bar */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-display">
                    Google Search Console Performance: the-nawabi-bean.in
                  </h3>
                  <p className="text-[11px] text-slate-500">Live Organic Search Telemetry • Last 28 Days</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200">
                Web Search Results
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-blue-700">Total Clicks</span>
                <p className="text-2xl font-bold text-blue-900 mt-0.5">{gscSummary.totalClicks.toLocaleString()}</p>
                <span className="text-[10px] text-emerald-700 font-semibold">▲ +14.2% vs prev month</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-indigo-700">Total Impressions</span>
                <p className="text-2xl font-bold text-indigo-900 mt-0.5">{gscSummary.totalImpressions.toLocaleString()}</p>
                <span className="text-[10px] text-emerald-700 font-semibold">▲ +8.6% vs prev month</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-emerald-700">Average CTR</span>
                <p className="text-2xl font-bold text-emerald-900 mt-0.5">{gscSummary.averageCtr}%</p>
                <span className="text-[10px] text-slate-500 font-medium">Local Intent Benchmark: 4-6%</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-amber-700">Average Position</span>
                <p className="text-2xl font-bold text-amber-900 mt-0.5">#{gscSummary.averagePosition}</p>
                <span className="text-[10px] text-emerald-700 font-semibold">▲ Improved from #6.4</span>
              </div>
            </div>
          </div>

          {/* GSC Search Queries Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Top Ranking Queries from Lucknow Searchers
              </h4>
              <span className="text-xs text-slate-500">Showing 6 high-volume search phrases</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-700 uppercase font-semibold">
                  <tr>
                    <th className="py-3 px-4">Top Queries</th>
                    <th className="py-3 px-4">Clicks</th>
                    <th className="py-3 px-4">Impressions</th>
                    <th className="py-3 px-4">CTR</th>
                    <th className="py-3 px-4">Position</th>
                    <th className="py-3 px-4">Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {gscQueries.map((q) => (
                    <tr key={q.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">{q.query}</td>
                      <td className="py-3 px-4 font-bold text-blue-900">{q.clicks.toLocaleString()}</td>
                      <td className="py-3 px-4 text-slate-700">{q.impressions.toLocaleString()}</td>
                      <td className="py-3 px-4 font-semibold text-emerald-800">{q.ctr}%</td>
                      <td className="py-3 px-4 font-bold text-slate-800">#{q.position}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            q.trend === 'up'
                              ? 'text-emerald-700 bg-emerald-50'
                              : q.trend === 'down'
                              ? 'text-rose-700 bg-rose-50'
                              : 'text-slate-600 bg-slate-100'
                          }`}
                        >
                          {q.trend === 'up' ? '▲ Ranking Up' : q.trend === 'down' ? '▼ Slipping' : '— Stable'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Interactive On-Page Keyword Placement Optimizer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 Columns: Placement Editor */}
            <div className="lg:col-span-7 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-600" />
                    On-Page Keyword Placement &amp; SERP Snippet Practice
                  </h3>
                  <p className="text-xs text-slate-500">
                    Test positioning target keywords across Title, Meta, H1, and Content to see predicted Google rank shift.
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">Target Primary Keyword:</label>
                  <input
                    type="text"
                    value={seoPlacement.targetKeyword}
                    onChange={(e) => setSeoPlacement({ ...seoPlacement, targetKeyword: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-bold"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-bold text-slate-800">Page &lt;title&gt; Tag:</label>
                    <span
                      className={`text-[11px] font-bold ${
                        seoPlacement.pageTitle.length >= 45 && seoPlacement.pageTitle.length <= 65
                          ? 'text-emerald-700'
                          : 'text-amber-600'
                      }`}
                    >
                      {seoPlacement.pageTitle.length} chars (Target: 50-60)
                    </span>
                  </div>
                  <input
                    type="text"
                    value={seoPlacement.pageTitle}
                    onChange={(e) => setSeoPlacement({ ...seoPlacement, pageTitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-bold text-slate-800">Meta &lt;description&gt; Tag:</label>
                    <span
                      className={`text-[11px] font-bold ${
                        seoPlacement.metaDescription.length >= 135 && seoPlacement.metaDescription.length <= 165
                          ? 'text-emerald-700'
                          : 'text-amber-600'
                      }`}
                    >
                      {seoPlacement.metaDescription.length} chars (Target: 140-160)
                    </span>
                  </div>
                  <textarea
                    rows={2}
                    value={seoPlacement.metaDescription}
                    onChange={(e) => setSeoPlacement({ ...seoPlacement, metaDescription: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-medium resize-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">Main &lt;h1&gt; Heading:</label>
                  <input
                    type="text"
                    value={seoPlacement.h1Heading}
                    onChange={(e) => setSeoPlacement({ ...seoPlacement, h1Heading: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-800 block mb-1">Body Content Excerpt:</label>
                  <textarea
                    rows={3}
                    value={seoPlacement.contentSnippet}
                    onChange={(e) => setSeoPlacement({ ...seoPlacement, contentSnippet: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-medium resize-none text-xs"
                  />
                </div>

                <button
                  id="btn-run-gsc-audit"
                  onClick={handleRunGscAudit}
                  disabled={isAuditingGsc}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-sm transition-colors disabled:opacity-50"
                >
                  <Sparkles className={`w-4 h-4 ${isAuditingGsc ? 'animate-spin' : ''}`} />
                  <span>{isAuditingGsc ? 'Analyzing SEO Placements...' : 'Analyze SEO Placement & Ranking Potential'}</span>
                </button>
              </div>
            </div>

            {/* Right 5 Columns: GSC Diagnostic Audit & Traffic Lift */}
            <div className="lg:col-span-5 space-y-4">
              {gscAudit && (
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 font-display">
                        SEO Placement Score &amp; Ranking Impact
                      </h4>
                      <p className="text-xs text-slate-500">Expected Google SERP Visibility Lift</p>
                    </div>
                    <span className="text-2xl font-bold text-blue-700">
                      {gscAudit.seoPlacementScore}/100
                    </span>
                  </div>

                  {/* Rank shift comparison */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-200 flex items-center justify-between">
                    <div className="text-center">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Current Rank</span>
                      <strong className="text-lg font-bold text-slate-700">#{gscAudit.currentProjectedRank}</strong>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                        +{gscAudit.expectedTrafficLiftPercent}% Traffic Lift
                      </span>
                      <ArrowRight className="w-5 h-5 text-emerald-600 mt-1" />
                    </div>

                    <div className="text-center">
                      <span className="text-[10px] uppercase font-bold text-emerald-800 block">Potential Rank</span>
                      <strong className="text-xl font-bold text-emerald-700">#{gscAudit.potentialRank}</strong>
                    </div>
                  </div>

                  {/* Criteria diagnostics */}
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                      <div className="flex justify-between items-center font-bold">
                        <span className="text-slate-800">Title Tag Optimization</span>
                        <span className="text-blue-700">{gscAudit.titleOptimization.score}/100</span>
                      </div>
                      <p className="text-slate-600 text-[11px]">{gscAudit.titleOptimization.feedback}</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                      <div className="flex justify-between items-center font-bold">
                        <span className="text-slate-800">Meta Description Optimization</span>
                        <span className="text-blue-700">{gscAudit.metaOptimization.score}/100</span>
                      </div>
                      <p className="text-slate-600 text-[11px]">{gscAudit.metaOptimization.feedback}</p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-0.5">
                      <div className="flex justify-between items-center font-bold">
                        <span className="text-slate-800">H1 Heading Relevancy</span>
                        <span className="text-blue-700">{gscAudit.headingOptimization.score}/100</span>
                      </div>
                      <p className="text-slate-600 text-[11px]">{gscAudit.headingOptimization.feedback}</p>
                    </div>
                  </div>

                  {/* Actionable Suggestions */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-xs font-bold text-slate-800 block">Actionable AI Suggestions:</span>
                    {gscAudit.suggestions.map((s, idx) => (
                      <p key={idx} className="text-xs text-slate-600 flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </p>
                    ))}
                  </div>

                  {/* One-Click Apply AI Optimized Copy */}
                  <div className="pt-2">
                    <button
                      onClick={handleApplyGscOptimizations}
                      className="w-full py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>One-Click Apply AI-Optimized Title, Meta &amp; H1</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

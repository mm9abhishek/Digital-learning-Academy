import React, { useState } from 'react';
import {
  Sliders,
  Sparkles,
  Info,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Play,
  RotateCcw,
  FolderHeart,
  IndianRupee,
  Target,
  Layers,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';
import {
  SimulatorPlatform,
  CampaignObjective,
  SimulatorScenarioPreset,
  SimulatorRunInput,
  SimulatorRunResult,
} from '../types';

interface CampaignSimulatorProps {
  scenarios: SimulatorScenarioPreset[];
  runs: SimulatorRunResult[];
  onRunSimulation: (input: SimulatorRunInput) => Promise<SimulatorRunResult | null>;
  onSaveRunToPortfolio: (run: SimulatorRunResult) => void;
}

export const CampaignSimulator: React.FC<CampaignSimulatorProps> = ({
  scenarios,
  runs,
  onRunSimulation,
  onSaveRunToPortfolio,
}) => {
  const latestRun = runs.length > 0 ? runs[0] : null;

  // Form State
  const [campaignName, setCampaignName] = useState('Nawabi Bean Acoustic Saturday Push');
  const [platform, setPlatform] = useState<SimulatorPlatform>('Meta Ads');
  const [objective, setObjective] = useState<CampaignObjective>('Table Reservations (Leads)');
  const [location, setLocation] = useState('Hazratganj + Gomti Nagar, Lucknow (UP)');
  const [radiusKm, setRadiusKm] = useState(6);
  const [targetAudience, setTargetAudience] = useState('Ages 21-36 | Specialty Coffee, Acoustic Music, Artisanal Bakes');
  const [adCopyHeadline, setAdCopyHeadline] = useState("Hazratganj's Coziest Acoustic Saturdays ☕");
  const [adCopyBody, setAdCopyBody] = useState('Chikmagalur Arabica infused with green cardamom, warm pistachio cruffins, and unplugged acoustic sets. Reserve your corner table on WhatsApp.');
  const [ctaText, setCtaText] = useState('Book on WhatsApp');
  const [dailyBudgetINR, setDailyBudgetINR] = useState(1400);
  const [durationDays, setDurationDays] = useState(7);
  const [avgOrderValueINR, setAvgOrderValueINR] = useState(650);
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('scn_balanced_winner');

  const [activeRunResult, setActiveRunResult] = useState<SimulatorRunResult | null>(latestRun);
  const [isSimulating, setIsSimulating] = useState(false);
  const [showFormulaModal, setShowFormulaModal] = useState(false);

  // Apply a scenario preset
  const handleSelectPreset = (presetId: string) => {
    setSelectedScenarioId(presetId);
    const preset = scenarios.find((s) => s.id === presetId);
    if (!preset) return;

    if (presetId === 'scn_weak_creative') {
      setAdCopyHeadline('Coffee Shop in Hazratganj Open Now');
      setAdCopyBody('We sell coffee and tea. Visit us today for good prices and seating.');
      setCtaText('Learn More');
    } else if (presetId === 'scn_expensive_audience') {
      setRadiusKm(2);
      setTargetAudience('Ages 28-32 | Top 1% Income, Luxury Coffee Machines, Golf Club Members only');
      setDailyBudgetINR(2500);
    } else if (presetId === 'scn_poor_landing_friction') {
      setCtaText('Fill 8-Field Registration Form');
      setAdCopyHeadline("Hazratganj's Coziest Acoustic Saturdays ☕");
    } else if (presetId === 'scn_audience_fatigue') {
      setDurationDays(18);
      setRadiusKm(3);
    } else {
      // Balanced
      setAdCopyHeadline("Hazratganj's Coziest Acoustic Saturdays ☕");
      setAdCopyBody('Chikmagalur Arabica infused with green cardamom, warm pistachio cruffins, and unplugged acoustic sets. Reserve your corner table on WhatsApp.');
      setCtaText('Book on WhatsApp');
      setRadiusKm(6);
      setDurationDays(7);
      setDailyBudgetINR(1400);
    }
  };

  const handleSimulate = async () => {
    setIsSimulating(true);
    try {
      const input: SimulatorRunInput = {
        campaignName,
        platform,
        objective,
        location,
        radiusKm,
        targetAudience,
        adCopyHeadline,
        adCopyBody,
        ctaText,
        dailyBudgetINR,
        durationDays,
        avgOrderValueINR,
        presetScenarioId: selectedScenarioId || undefined,
      };

      const result = await onRunSimulation(input);
      if (result) {
        setActiveRunResult(result);
      }
    } finally {
      setIsSimulating(false);
    }
  };

  // Funnel chart data
  const funnelData = activeRunResult
    ? [
        { name: 'Impressions', value: activeRunResult.impressions, fill: '#3b82f6' },
        { name: 'Ad Clicks', value: activeRunResult.clicks, fill: '#d97706' },
        { name: 'Reservations', value: activeRunResult.conversions, fill: '#059669' },
      ]
    : [];

  const financialData = activeRunResult
    ? [
        { name: 'Total Spend (₹)', amount: activeRunResult.totalBudgetINR, fill: '#e11d48' },
        { name: 'Gross Revenue (₹)', amount: activeRunResult.estimatedRevenueINR, fill: '#059669' },
        { name: 'Net Profit (₹)', amount: Math.max(0, activeRunResult.netProfitINR), fill: '#2563eb' },
      ]
    : [];

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Educational Banner Notice */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start justify-between gap-3 shadow-xs">
        <div className="flex items-start space-x-2.5">
          <Info className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-amber-900">
              Deterministic Educational Sandbox (Safe Simulation)
            </p>
            <p className="text-[11px] text-slate-600">
              This sandbox models Meta Ads and Google Search ad auctions using validated Tier-2 Indian hospitality benchmarks (Hazratganj / Lucknow). All telemetry and financial metrics are <strong>educational and fictional</strong>.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowFormulaModal(true)}
          className="px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 text-xs font-bold whitespace-nowrap transition-colors flex items-center gap-1 shadow-xs"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Formula Guide</span>
        </button>
      </div>

      {/* Preset Scenario Selector */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5 font-display">
            <Layers className="w-3.5 h-3.5 text-amber-600" />
            Diagnostic Challenge Presets
          </label>
          <span className="text-[11px] text-slate-500">Select a real-world scenario to test your troubleshooting skills</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {scenarios.map((preset) => {
            const isSelected = selectedScenarioId === preset.id;
            return (
              <button
                key={preset.id}
                id={`preset-${preset.id}`}
                onClick={() => handleSelectPreset(preset.id)}
                className={`p-3.5 rounded-2xl text-left border transition-all duration-200 ${
                  isSelected
                    ? 'bg-amber-50 border-amber-400 text-slate-900 shadow-sm ring-1 ring-amber-400/40'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                    {preset.tag}
                  </span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />}
                </div>
                <p className="text-xs font-bold text-slate-900 mt-2 leading-snug font-display">{preset.name}</p>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">{preset.problemSummary}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Simulator Inputs & Output Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Form: Inputs (5 Cols) */}
        <div className="lg:col-span-5 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 font-display">
              <Sliders className="w-4 h-4 text-amber-600" />
              Campaign Configuration
            </h3>
            <span className="text-xs text-amber-800 font-mono font-bold px-2 py-0.5 rounded bg-amber-50 border border-amber-200">
              INR (₹)
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {/* Platform & Objective */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-600 font-bold block mb-1">Ad Platform</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as SimulatorPlatform)}
                  className="w-full p-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Meta Ads">Meta Ads (Feed & Stories)</option>
                  <option value="Google Search">Google Search (High Intent)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-600 font-bold block mb-1">Campaign Objective</label>
                <select
                  value={objective}
                  onChange={(e) => setObjective(e.target.value as CampaignObjective)}
                  className="w-full p-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 font-medium focus:bg-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Table Reservations (Leads)">Table Reservations (Leads)</option>
                  <option value="Footfall & Store Visits">Footfall & Store Visits</option>
                  <option value="Weekend Special Sales">Weekend Special Sales</option>
                  <option value="Brand Awareness">Brand Awareness</option>
                </select>
              </div>
            </div>

            {/* Location & Radius */}
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <label className="text-slate-600 font-bold block mb-1">Location Targeting</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-slate-600 font-bold block mb-1">Radius (km)</label>
                <input
                  type="number"
                  min={1}
                  max={25}
                  value={radiusKm}
                  onChange={(e) => setRadiusKm(Number(e.target.value))}
                  className="w-full p-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Target Audience */}
            <div>
              <label className="text-slate-600 font-bold block mb-1">Audience Demographics & Interests</label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Ad Copy Headline */}
            <div>
              <label className="text-slate-600 font-bold block mb-1">Ad Headline (Hook)</label>
              <input
                type="text"
                value={adCopyHeadline}
                onChange={(e) => setAdCopyHeadline(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Ad Primary Body */}
            <div>
              <label className="text-slate-600 font-bold block mb-1">Ad Primary Text</label>
              <textarea
                rows={2}
                value={adCopyBody}
                onChange={(e) => setAdCopyBody(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 font-mono text-[11px] focus:bg-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* CTA Button Text */}
            <div>
              <label className="text-slate-600 font-bold block mb-1">Call-To-Action (CTA)</label>
              <input
                type="text"
                value={ctaText}
                onChange={(e) => setCtaText(e.target.value)}
                className="w-full p-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 focus:bg-white focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Budget & Duration */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              <div>
                <label className="text-slate-600 font-bold block mb-1">Daily Budget</label>
                <div className="relative">
                  <span className="absolute left-2.5 top-2 text-slate-500 font-bold">₹</span>
                  <input
                    type="number"
                    min={200}
                    step={100}
                    value={dailyBudgetINR}
                    onChange={(e) => setDailyBudgetINR(Number(e.target.value))}
                    className="w-full p-2 pl-6 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 font-bold focus:bg-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-600 font-bold block mb-1">Duration</label>
                <div className="relative">
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={durationDays}
                    onChange={(e) => setDurationDays(Number(e.target.value))}
                    className="w-full p-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 font-bold focus:bg-white focus:outline-none focus:border-amber-500"
                  />
                  <span className="absolute right-2.5 top-2 text-slate-500 text-[10px]">days</span>
                </div>
              </div>

              <div>
                <label className="text-slate-600 font-bold block mb-1">Avg Ticket (AOV)</label>
                <div className="relative">
                  <span className="absolute left-2.5 top-2 text-slate-500 font-bold">₹</span>
                  <input
                    type="number"
                    min={150}
                    step={50}
                    value={avgOrderValueINR}
                    onChange={(e) => setAvgOrderValueINR(Number(e.target.value))}
                    className="w-full p-2 pl-6 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 font-bold focus:bg-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            {/* Total Spend preview */}
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center text-xs">
              <span className="text-slate-600 font-medium">Total Campaign Budget:</span>
              <span className="font-bold text-amber-800 text-sm">₹{(dailyBudgetINR * durationDays).toLocaleString()}</span>
            </div>

            {/* Simulate Button */}
            <button
              id="btn-run-simulation"
              onClick={handleSimulate}
              disabled={isSimulating}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-sm transition-all cursor-pointer"
            >
              {isSimulating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-white" />
                  <span>Computing Auction Physics...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Run Live Campaign Simulation</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Output: Simulated Telemetry & Recharts (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {activeRunResult ? (
            <div className="space-y-4">
              {/* Top 4 KPI Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <p className="text-[10px] uppercase font-bold text-slate-500">Simulated CTR</p>
                  <p className="text-xl font-bold text-amber-800 mt-1 font-display">{activeRunResult.ctrPercent}%</p>
                  <p className="text-[10px] text-slate-500 mt-1">Benchmark: 2.2 - 2.8%</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <p className="text-[10px] uppercase font-bold text-slate-500">Cost Per Click</p>
                  <p className="text-xl font-bold text-slate-900 mt-1 font-display">₹{activeRunResult.cpcINR}</p>
                  <p className="text-[10px] text-slate-500 mt-1">Lucknow local bid</p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <p className="text-[10px] uppercase font-bold text-slate-500">Bookings / CPL</p>
                  <p className="text-xl font-bold text-emerald-700 mt-1 font-display">{activeRunResult.conversions}</p>
                  <p className="text-[10px] text-slate-500 mt-1">₹{activeRunResult.cplINR} per Lead</p>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-teal-50 border border-emerald-200 shadow-sm">
                  <p className="text-[10px] uppercase font-bold text-emerald-800">Simulated ROAS</p>
                  <p className="text-xl font-bold text-emerald-800 mt-1 font-display">{activeRunResult.roas}x</p>
                  <p className="text-[10px] text-emerald-700 mt-1 font-mono">₹{activeRunResult.estimatedRevenueINR.toLocaleString()} Rev</p>
                </div>
              </div>

              {/* Recharts Analytics Panel */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5 font-display">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    Marketing Funnel & Unit Economics
                  </h4>
                  <span className="text-[11px] text-slate-500 font-medium">Fictional Demo Model</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {/* Funnel chart */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-[11px] font-bold text-slate-700 mb-2 text-center">
                      Funnel Drop-off (Log Scale View)
                    </p>
                    <div className="h-44 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={funnelData} layout="vertical">
                          <XAxis type="number" hide />
                          <YAxis dataKey="name" type="category" width={85} tick={{ fill: '#475569', fontSize: 11 }} />
                          <Tooltip
                            contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: 8, fontSize: 11, color: '#0f172a' }}
                            formatter={(value: any) => [Number(value).toLocaleString(), 'Count']}
                          />
                          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                            {funnelData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Financial Comparison */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <p className="text-[11px] font-bold text-slate-700 mb-2 text-center">
                      Budget Spend vs Gross Revenue
                    </p>
                    <div className="h-44 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={financialData}>
                          <XAxis dataKey="name" tick={{ fill: '#475569', fontSize: 10 }} />
                          <YAxis tick={{ fill: '#475569', fontSize: 10 }} />
                          <Tooltip
                            contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: 8, fontSize: 11, color: '#0f172a' }}
                            formatter={(value: any) => [`₹${Number(value).toLocaleString()}`, 'Amount']}
                          />
                          <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                            {financialData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>

              {/* Diagnostic Notes & Root Cause Analysis */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Performance Diagnostics &amp; Optimization Tips
                </h4>

                <div className="space-y-2 text-xs">
                  {activeRunResult.diagnosticNotes.map((note, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed">
                      {note}
                    </div>
                  ))}

                  {activeRunResult.optimizationTips.map((tip, idx) => (
                    <div key={`tip-${idx}`} className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 leading-relaxed flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span><strong>Optimization Action:</strong> {tip}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">
                    Frequency Index: {activeRunResult.frequency}x
                  </span>

                  <button
                    id="btn-save-simulation-to-portfolio"
                    onClick={() => onSaveRunToPortfolio(activeRunResult)}
                    className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-300 text-xs font-bold flex items-center space-x-1.5 transition-colors shadow-xs"
                  >
                    <FolderHeart className="w-3.5 h-3.5 text-blue-600" />
                    <span>Save Run to Portfolio</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-2xl bg-white border border-slate-200 text-center space-y-3 shadow-xs">
              <Sliders className="w-12 h-12 text-slate-400 mx-auto" />
              <h4 className="text-sm font-bold text-slate-900">No Simulation Run Yet</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Configure your Lucknow café campaign on the left or select a preset challenge, then click &quot;Run Live Campaign Simulation&quot;.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Formula Modal */}
      {showFormulaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-6 text-slate-900 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 font-display">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              Digital Marketing Metric Formulas &amp; Benchmarks
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 font-mono">
                <span className="text-amber-800 font-bold">CTR (%):</span> (Clicks / Impressions) × 100
                <p className="text-[11px] text-slate-600 font-sans mt-0.5">Measures creative stopping power. Benchmark: 2.0% – 3.0%.</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 font-mono">
                <span className="text-amber-800 font-bold">CPC (₹):</span> Total Spend / Clicks
                <p className="text-[11px] text-slate-600 font-sans mt-0.5">Measures audience competition. Benchmark in Lucknow: ₹6.00 – ₹10.00.</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 font-mono">
                <span className="text-amber-800 font-bold">CPL (₹):</span> Total Spend / Table Reservations
                <p className="text-[11px] text-slate-600 font-sans mt-0.5">Acquisition cost per lead. Benchmark: ₹120 – ₹200.</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 font-mono">
                <span className="text-amber-800 font-bold">ROAS (x):</span> Gross Direct Revenue / Total Spend
                <p className="text-[11px] text-slate-600 font-sans mt-0.5">Return on investment multiplier. Benchmark: 3.0x – 5.0x.</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowFormulaModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-white"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

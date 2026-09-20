import {
  SimulatorRunInput,
  SimulatorRunResult,
  SimulatorScenarioPreset,
} from '../src/types.js';
import { db } from './db.js';

export function runCampaignSimulation(
  userId: string,
  input: SimulatorRunInput
): SimulatorRunResult {
  const totalBudgetINR = input.dailyBudgetINR * input.durationDays;

  // Find preset modifier if specified
  let preset: SimulatorScenarioPreset | undefined;
  if (input.presetScenarioId) {
    preset = db.simulatorScenarios.find((s) => s.id === input.presetScenarioId);
  }

  const ctrMultiplier = preset?.baseModifier.ctrMultiplier ?? 1.0;
  const cpcMultiplier = preset?.baseModifier.cpcMultiplier ?? 1.0;
  const cvrMultiplier = preset?.baseModifier.cvrMultiplier ?? 1.0;

  // Platform baseline
  const isGoogle = input.platform === 'Google Search';

  // Base benchmarks in Tier-2 Indian Hospitality (Lucknow)
  // Meta: higher impressions, lower CPC (~₹7-9), modest CTR (~2.2-2.8%)
  // Google Search: high intent, higher CPC (~₹14-18), higher CTR (~4.5-6.5%), higher conversion rate (~6-8%)
  let baseCpcINR = isGoogle ? 14.5 : 7.8;
  let baseCtrPercent = isGoogle ? 5.2 : 2.6;
  let baseConversionRatePercent = isGoogle ? 6.5 : 4.8;

  // Quality of copy & hook heuristic
  const copyQualityScore = evaluateInputCreativeQuality(input);
  const copyMultiplier = copyQualityScore / 100; // e.g. 0.85 to 1.15

  // Apply modifiers
  const finalCtrPercent = Number(
    Math.max(0.4, Math.min(9.5, baseCtrPercent * ctrMultiplier * copyMultiplier)).toFixed(2)
  );

  const finalCpcINR = Number(
    Math.max(2.5, Math.min(38.0, baseCpcINR * cpcMultiplier * (1 / (copyMultiplier * 0.9 + 0.1)))).toFixed(2)
  );

  // Impressions and Clicks calculation
  // Total Spend / CPC = Total Clicks
  const clicks = Math.max(12, Math.round(totalBudgetINR / finalCpcINR));
  // Clicks / CTR% * 100 = Impressions
  const impressions = Math.max(clicks * 10, Math.round((clicks / (finalCtrPercent / 100))));

  // Conversion rate (Reservations / Bookings)
  const finalCvrPercent = Number(
    Math.max(0.5, Math.min(12.0, baseConversionRatePercent * cvrMultiplier)).toFixed(2)
  );

  const conversions = Math.max(1, Math.round(clicks * (finalCvrPercent / 100)));

  // Cost Per Lead / Reservation (CPL)
  const cplINR = Number((totalBudgetINR / conversions).toFixed(2));

  // Revenue and ROAS
  const avgOrderValue = Math.max(100, input.avgOrderValueINR || 550);
  const estimatedRevenueINR = Math.round(conversions * avgOrderValue);
  const roas = Number((estimatedRevenueINR / totalBudgetINR).toFixed(2));
  const netProfitINR = Math.round(estimatedRevenueINR - totalBudgetINR);

  // Audience frequency indicator
  // In a localized city like Lucknow (radius 3-8km), longer duration with high daily budget increases frequency
  const estimatedAudiencePool = Math.max(15000, Math.round(input.radiusKm * input.radiusKm * 3140));
  const frequency = Number(
    Math.min(6.5, Math.max(1.1, (impressions / estimatedAudiencePool) * 1.6)).toFixed(1)
  );

  // Formulas explanation
  const formulaExplanations = {
    ctr: `CTR (Click-Through Rate) = (Clicks ${clicks.toLocaleString()} ÷ Impressions ${impressions.toLocaleString()}) × 100 = ${finalCtrPercent}% [Benchmark: 2.0% - 3.0%]`,
    cpc: `CPC (Cost Per Click) = Total Spend ₹${totalBudgetINR.toLocaleString()} ÷ Clicks ${clicks.toLocaleString()} = ₹${finalCpcINR} [Benchmark: ₹6.00 - ₹10.00]`,
    conversions: `Conversions (Table Bookings) = Clicks ${clicks.toLocaleString()} × Conversion Rate ${finalCvrPercent}% = ${conversions} Bookings`,
    cpl: `CPL (Cost Per Booking) = Total Spend ₹${totalBudgetINR.toLocaleString()} ÷ ${conversions} Bookings = ₹${cplINR} per Reservation [Benchmark: ₹120 - ₹200]`,
    roas: `ROAS (Return on Ad Spend) = Estimated Revenue ₹${estimatedRevenueINR.toLocaleString()} ÷ Spend ₹${totalBudgetINR.toLocaleString()} = ${roas}x [Benchmark: 3.0x - 5.0x]`,
  };

  // Diagnostic notes based on presets and numbers
  const diagnosticNotes: string[] = [];
  const optimizationTips: string[] = [];

  if (preset) {
    diagnosticNotes.push(`Scenario: ${preset.name} - ${preset.problemSummary}`);
    diagnosticNotes.push(`Root Cause Analysis: ${preset.rootCause}`);
    optimizationTips.push(preset.howToFix);
  } else {
    diagnosticNotes.push(`Custom Simulation Run: Objective is "${input.objective}" targeting ${input.location} (${input.radiusKm} km radius).`);
  }

  if (finalCtrPercent < 1.5) {
    diagnosticNotes.push(`⚠️ Low CTR Warning (${finalCtrPercent}%): The ad headline or visual creative is not stopping the scroll in Hazratganj feeds.`);
    optimizationTips.push('Revise headline to lead with the cultural hook ("Awadhi Cardamom Cold Brew") and test high-contrast Reel video.');
  } else {
    diagnosticNotes.push(`✅ Strong CTR (${finalCtrPercent}%): The local targeting and creative hook resonate effectively with Hazratganj coffee enthusiasts.`);
  }

  if (finalCpcINR > 12) {
    diagnosticNotes.push(`⚠️ Elevated CPC (₹${finalCpcINR}): Stacking too many restrictive niche interests is driving up auction bids.`);
    optimizationTips.push('Broaden target radius to 6–8km and consolidate interest tags into 2 broader clusters.');
  }

  if (cplINR > 220) {
    diagnosticNotes.push(`⚠️ High Cost Per Lead (₹${cplINR}): Friction exists at the reservation stage.`);
    optimizationTips.push('Direct ad clicks directly to WhatsApp Business chat with pre-written booking template.');
  } else {
    diagnosticNotes.push(`✅ Healthy CPL (₹${cplINR}): Well within sustainable F&B customer acquisition unit economics.`);
  }

  if (roas >= 3.0) {
    optimizationTips.push(`🚀 Winning Campaign (${roas}x ROAS): Consider scaling daily budget by 20% on Thursday/Friday mornings to capture weekend demand.`);
  }

  const result: SimulatorRunResult = {
    id: `sim_run_${Date.now()}`,
    userId,
    input,
    totalBudgetINR,
    impressions,
    clicks,
    ctrPercent: finalCtrPercent,
    cpcINR: finalCpcINR,
    conversions,
    conversionRatePercent: finalCvrPercent,
    cplINR,
    estimatedRevenueINR,
    roas,
    netProfitINR,
    frequency,
    formulaExplanations,
    diagnosticNotes,
    optimizationTips,
    createdAt: new Date().toISOString(),
    isSavedToPortfolio: false,
  };

  // Save in db
  db.simulatorRuns.unshift(result);
  return result;
}

function evaluateInputCreativeQuality(input: SimulatorRunInput): number {
  let score = 90;
  const combined = `${input.adCopyHeadline} ${input.adCopyBody} ${input.ctaText}`.toLowerCase();

  // Positive signals
  if (combined.includes('lucknow') || combined.includes('hazratganj') || combined.includes('awadh')) score += 5;
  if (combined.includes('coffee') || combined.includes('brew') || combined.includes('croissant') || combined.includes('acoustic')) score += 5;
  if (combined.includes('whatsapp') || combined.includes('reserve') || combined.includes('book')) score += 5;
  if (combined.includes('free') || combined.includes('offer') || combined.includes('₹') || combined.includes('complimentary')) score += 4;

  // Penalize generic / empty
  if (input.adCopyHeadline.length < 10) score -= 15;
  if (input.adCopyBody.length < 30) score -= 10;
  if (!input.ctaText) score -= 10;

  return Math.max(60, Math.min(125, score));
}

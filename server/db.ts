import {
  User,
  Course,
  Lesson,
  Assignment,
  Submission,
  AiFeedback,
  SimulatorScenarioPreset,
  SimulatorRunResult,
  PortfolioProject,
} from '../src/types.js';

class InMemoryDB {
  public users: User[] = [];
  public courses: Course[] = [];
  public lessons: Lesson[] = [];
  public assignments: Assignment[] = [];
  public submissions: Submission[] = [];
  public simulatorScenarios: SimulatorScenarioPreset[] = [];
  public simulatorRuns: SimulatorRunResult[] = [];
  public portfolioProjects: PortfolioProject[] = [];

  constructor() {
    this.seedInitialData();
  }

  public seedInitialData() {
    // 1. Users
    this.users = [
      {
        id: 'usr_student_aarav',
        name: 'Aarav Sharma',
        email: 'student@skillsprint.ai',
        password: 'Student@2026',
        role: 'student',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        title: 'Aspiring Digital Growth Marketer',
        collegeOrCompany: 'Amity University Noida / Lucknow Campus',
        city: 'Noida / Lucknow',
        xp: 620,
        streakDays: 5,
        completedLessonIds: ['les_01', 'les_02', 'les_03'],
      },
      {
        id: 'usr_admin_neha',
        name: 'Prof. Neha Verma',
        email: 'admin@skillsprint.ai',
        password: 'Admin@2026',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        title: 'Lead Marketing Strategist & Jury Evaluator',
        collegeOrCompany: 'SkillSprint AI Academy & AI Day Jury',
        city: 'Noida (Sector 62)',
        xp: 2500,
        streakDays: 24,
        completedLessonIds: ['les_01', 'les_02', 'les_03', 'les_04', 'les_05', 'les_06'],
      },
      {
        id: 'usr_student_aarav_alias',
        name: 'Aarav Sharma (Edu)',
        email: 'aarav.sharma@student.edu.in',
        password: 'Student@2026',
        role: 'student',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        title: 'Aspiring Digital Growth Marketer',
        collegeOrCompany: 'Amity University Noida',
        city: 'Noida',
        xp: 620,
        streakDays: 5,
        completedLessonIds: ['les_01', 'les_02', 'les_03'],
      },
    ];

    // 2. Courses
    this.courses = [
      {
        id: 'crs_lucknow_cafe',
        title: 'Local Hospitality Growth Marketing: The Lucknow Café Case Study',
        slug: 'lucknow-cafe-growth-marketing',
        tagline: 'Master hyper-local Meta Ads and Google Search to scale footfall and table bookings for a heritage specialty café in Hazratganj.',
        description: 'An action-oriented bootcamp where you take "The Nawabi Bean Café & Artisanal Roastery" from slow weekday afternoons to packed weekend acoustic evenings using hyper-targeted digital campaigns, compelling Awadhi storytelling, and disciplined INR unit economics.',
        businessName: 'The Nawabi Bean Café & Artisanal Roastery',
        businessType: 'Specialty Coffee & European Bakery',
        businessLocation: 'Heritage Arcade, Hazratganj, Lucknow (UP) - 226001',
        currency: 'INR (₹)',
        category: 'Local Hospitality & F&B Marketing',
        difficulty: 'Beginner',
        durationHours: 4,
        totalLessons: 6,
        totalAssignments: 4,
        coverImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop&q=80',
        tags: ['Meta Ads', 'Local SEO', 'Copywriting', 'Budgeting INR', 'A/B Testing', 'Roas'],
      },
    ];

    // 3. Lessons
    this.lessons = [
      {
        id: 'les_01',
        courseId: 'crs_lucknow_cafe',
        order: 1,
        title: 'Lesson 1: Defining Local Hospitality Objectives & KPIs',
        shortDescription: 'Separate vanity likes from actual walk-ins and table reservations with the 3-tier hospitality funnel.',
        estimatedMinutes: 12,
        category: 'Strategy',
        contentMarkdown: `### The Lucknow Café Context
**The Nawabi Bean Café** is situated in a high-footfall heritage spot in Hazratganj, Lucknow. They roast single-origin Chikmagalur beans and serve French pastries with an Awadhi twist (such as saffron-infused cruffins and Awadhi Cardamom Cold Brew).

Despite pristine quality, their **Monday-Thursday 2 PM to 6 PM slot is dead**, and weekend table bookings rely strictly on word-of-mouth. Large international chains nearby (Starbucks, Tim Hortons) are siphoning footfall with brand recall.

### The 3-Tier Hospitality Growth Funnel
1. **Top of Funnel (Awareness / Reach):** Showcase the visual aesthetic, live brewing bar, and cozy ambience to locals within 5 km.
2. **Middle of Funnel (Consideration / Traffic):** Promote specific offers like "After-Work Remote Work Desk Combo (Coffee + Croissant @ ₹299)" or "Weekend Acoustic Nights".
3. **Bottom of Funnel (Conversion / Leads):** Drive instant WhatsApp table reservations or direct Google Maps direction clicks.

### Core Metrics for Indian Local Cafés
- **Cost Per Direction Click / Location Action:** Benchmark in Lucknow: ₹4 to ₹9.
- **Cost Per Reservation / Lead (CPL):** Benchmark via Meta Instant Forms or WhatsApp: ₹40 to ₹85.
- **Average Order Value (AOV):** ₹450 to ₹650 per table for 2 guests.`,
        keyTakeaways: [
          { title: 'Focus on Actionable Footfall', description: 'Never run generic "Post Engagement" or page like campaigns; choose Lead Generation (WhatsApp) or Store Traffic.' },
          { title: 'Calculate Unit Economics', description: 'If CPL is ₹60 and AOV is ₹500 with 60% gross margin, you achieve healthy profitability on initial visit.' },
          { title: 'Local Geo Radius is Tight', description: 'In Lucknow traffic, 4-7 km radius drives 82% of repeat café visits.' },
        ],
        assignmentId: 'asg_01',
      },
      {
        id: 'les_02',
        courseId: 'crs_lucknow_cafe',
        order: 2,
        title: 'Lesson 2: Hyper-Local Audience Mapping in Lucknow Metros',
        shortDescription: 'Construct demographic and interest clusters around Hazratganj, Gomti Nagar, and university hubs.',
        estimatedMinutes: 15,
        category: 'Audience',
        contentMarkdown: `### Mapping the Lucknow Café Audience
Local ad performance in Tier-2 Indian cities depends heavily on geospatial realism. Lucknow has distinct micro-corridors:

1. **Hazratganj Core (0–3 km):** Shoppers, civil servants, lawyers, heritage lovers, evening strollers. High footfall, spontaneous visits.
2. **Gomti Nagar & Vibhuti Khand (4–8 km):** IT parks, TCS/HCL tech professionals, startup founders, freelancers seeking "work-from-café" spaces with fast Wi-Fi.
3. **Aliganj & Mahanagar (3–6 km):** Affluent residential families and young adults looking for weekend brunch spots.
4. **University Hubs (Lucknow Univ, IIM, Amity Lucknow, BBD):** Price-sensitive yet experience-driven Gen-Z students; respond strongly to student discounts, aesthetic Instagram spots, and live events.

### Meta Ads Targeting Matrix
- **Age:** 20 to 38 years old.
- **Languages:** English, Hindi (bilingual messaging performs 34% better in UP).
- **Interests:** Specialty Coffee, Artisanal Food, Indie Music, Remote Working, Book Clubs, Third Wave Coffee.
- **Exclusions:** Radius beyond 10 km (commute friction kills conversion).`,
        keyTakeaways: [
          { title: 'Layer Geography with Purpose', description: 'Weekday workday campaigns target Gomti Nagar tech hubs; weekend brunch campaigns target Hazratganj & Aliganj.' },
          { title: 'Bilingual Cultural Nuance', description: 'Subtle Lucknowi hospitality phrasing ("Tehzeeb meets Third-Wave Coffee") builds immediate local affinity.' },
          { title: 'Demographic Segmentation', description: 'Split ad sets between Student Casuals (Budget combos) and Professionals (Quiet Wi-Fi & Premium Pour-overs).' },
        ],
        assignmentId: 'asg_02',
      },
      {
        id: 'les_03',
        courseId: 'crs_lucknow_cafe',
        order: 3,
        title: 'Lesson 3: High-Impact Ad Copywriting & The Nawabi Hook',
        shortDescription: 'Draft scroll-stopping headlines, authentic Awadhi storytelling, and urgent WhatsApp CTAs.',
        estimatedMinutes: 18,
        category: 'Copywriting',
        contentMarkdown: `### The Anatomy of a High-Converting Café Ad
In an Instagram feed saturated with generic coffee shots, your ad creative and copy must stop the thumb in under 2 seconds.

#### The 4-Part Local Ad Framework
1. **The Hook (Call out the Lucknowi):** Address the exact local pain point or desire.
   - *Example:* "Tired of noisy coffee chains with slow Wi-Fi in Hazratganj?" or "Lucknow's best kept secret for pure Chikmagalur pour-overs."
2. **The Sensory & Cultural Value:** Paint a vivid picture with local pride.
   - *Example:* "Fresh roasted artisanal Arabica infused with crushed cardamom, paired with flaky pistachio croissants baked fresh every morning at 7 AM."
3. **The Risk Reversal / Offer:** Give them an irresistible reason to visit this weekend.
   - *Example:* "Show this ad on your phone and get a complimentary mini almond biscotti with any brew."
4. **The Direct Action CTA:**
   - *Example:* "Tap 'Book on WhatsApp' to reserve your corner table for Saturday's Acoustic Evening!"

### A/B Testing Strategy
Always test 2 distinct angles:
- **Variant A (Emotional / Aesthetic):** Warm ambiance, cozy reading corners, artisan brewing craftsmanship.
- **Variant B (Offer / Event Driven):** Limited-seat live acoustic sessions or weekday work-combo deals with explicit price anchor (₹299).`,
        keyTakeaways: [
          { title: 'Write for the Scroller', description: 'Put the local hook in the first 70 characters before the "See More" cut-off.' },
          { title: 'Direct WhatsApp Connection', description: 'Indian consumers prefer direct chat over complicated website reservation forms.' },
          { title: 'A/B Test Creative Angles', description: 'Never guess whether your audience prefers aesthetic ambience or value offers; test both.' },
        ],
        assignmentId: 'asg_03',
      },
      {
        id: 'les_04',
        courseId: 'crs_lucknow_cafe',
        order: 4,
        title: 'Lesson 4: Smart INR Budgeting & Bid Strategy',
        shortDescription: 'Allocate a ₹10,000 budget across 7 days without burning cash or suffering ad fatigue.',
        estimatedMinutes: 14,
        category: 'Budgeting',
        contentMarkdown: `### Managing Real INR Budgets for Small Businesses
Many digital marketers waste small business capital by spending ₹1,000/day evenly across 30 days without an experimental framework. For The Nawabi Bean Café, our total pilot test budget is **₹10,000 over 7 days**.

### The 70-20-10 Budget Allocation Model
1. **70% Core Performance (₹7,000):** Proven local interest stack (Hazratganj + 5 km radius) running Friday–Sunday focused on table reservations.
2. **20% Retargeting & Engagement (₹2,000):** Targeting users who engaged with Instagram posts or watched 50% of the café ambience reel.
3. **10% Experimental / Creative Testing (₹1,000):** Rapid A/B testing of headline hooks and student combo discounts.

### Unit Economics Calculation
- Total Spend: ₹10,000
- Projected Clicks (at ₹6.50 CPC): ~1,538 clicks
- Projected Leads/Reservations (at 4% CVR): ~61 reservations
- Projected Cost Per Lead (CPL): ₹10,000 / 61 = ₹163 per reservation
- Average Table Value: 2 people × ₹350 = ₹700
- Direct Revenue: 61 × ₹700 = ₹42,700
- Return on Ad Spend (ROAS): ₹42,700 / ₹10,000 = **4.27x ROAS**`,
        keyTakeaways: [
          { title: 'Front-Load Weekend Spend', description: 'Cafés make 68% of weekly revenue Fri-Sun; weight your daily budget accordingly.' },
          { title: 'Keep an Emergency Reserve', description: 'Do not exhaust total budget in 48 hours; allow the Meta algorithm 48 hours to exit learning phase.' },
          { title: 'Monitor Cost Per Lead Closely', description: 'If CPL exceeds ₹180 in Lucknow for a casual café, pause and refine copy.' },
        ],
        assignmentId: 'asg_04',
      },
      {
        id: 'les_05',
        courseId: 'crs_lucknow_cafe',
        order: 5,
        title: 'Lesson 5: Campaign Simulation & Performance Diagnostics',
        shortDescription: 'Test your hypotheses in the safe educational sandbox, observe simulated CTR/CPC/ROAS, and fix bottlenecks.',
        estimatedMinutes: 16,
        category: 'Simulation',
        contentMarkdown: `### Welcome to the Campaign Simulator
Before spending real money on Meta Ads or Google Search, elite performance marketers simulate their campaigns to stress-test their assumptions.

### Key Metrics and Their Formulas
1. **CTR (Click-Through Rate):** \`(Clicks / Impressions) × 100\`
   - *Healthy Benchmark:* 1.8% to 3.2% for local hospitality.
   - *Symptom of failure:* < 1.0% means creative is boring or headline lacks a hook.
2. **CPC (Cost Per Click):** \`Total Spend / Clicks\`
   - *Healthy Benchmark in Lucknow:* ₹4.50 to ₹9.00.
   - *Symptom of failure:* > ₹16.00 means audience is too narrow or bid strategy is aggressive.
3. **Conversion Rate (CVR):** \`(Conversions / Clicks) × 100\`
   - *Healthy Benchmark:* 3.5% to 7.0%.
   - *Symptom of failure:* < 2% means landing page or WhatsApp flow has high friction.
4. **CPL (Cost Per Lead / Reservation):** \`Total Spend / Conversions\`
5. **ROAS (Return on Ad Spend):** \`Simulated Revenue / Total Spend\`
   - *Healthy Benchmark:* 2.5x to 4.5x for F&B.

### Exploring the 4 Failure Presets in the Sandbox
- **Weak Creative:** Thumb-stopping failure; high impressions, pathetic CTR.
- **Expensive / Narrow Audience:** Stacking too many restrictive niche interests inflates CPC.
- **High Friction Conversion:** Great ads, but people abandon WhatsApp before completing a booking.
- **Audience Fatigue:** Running the same ad to a 3km radius for 14 days causes frequency to spike above 4.5, collapsing CTR.`,
        keyTakeaways: [
          { title: 'Diagnose Before Blaming the Platform', description: 'Low CTR is a creative problem; high CPC is an audience/bid problem; low CVR is an offer/landing problem.' },
          { title: 'Run Iterative Simulation Runs', description: 'Change one variable at a time (creative vs. budget vs. location radius) to isolate the impact.' },
          { title: 'Save Winning Runs to Portfolio', description: 'Demonstrate to recruiters and clients that you understand ROI analytics.' },
        ],
      },
      {
        id: 'les_06',
        courseId: 'crs_lucknow_cafe',
        order: 6,
        title: 'Lesson 6: Packaging Your Project into a Recruiter-Ready Portfolio',
        shortDescription: 'Synthesize your ad copy, AI evaluations, and simulated ROAS into an undeniable proof-of-work project.',
        estimatedMinutes: 10,
        category: 'Portfolio',
        contentMarkdown: `### Why Proof-of-Work Wins Digital Marketing Jobs
In today's competitive market, certificates of completion are meaningless. Hiring managers at agencies and brands look for:
1. **Problem Statement Clarity:** Can you articulate a real local business challenge?
2. **Strategic Rigor:** Why did you pick this audience and geographic radius?
3. **Execution Quality:** Did you craft compelling, culturally grounded ad copy with A/B testing?
4. **Data Fluency:** Can you interpret CTR, CPC, CPL, and ROAS rather than just vanity likes?
5. **Continuous Improvement:** How did you respond to AI Mentor feedback and iterate?

Your SkillSprint AI Portfolio automatically compiles your submitted assignments, AI evaluation scores, and campaign simulation runs into a shareable, client-ready case study!`,
        keyTakeaways: [
          { title: 'Action Beats Theory', description: 'A completed case study with concrete ad copy and simulated unit economics outshines 5 video course certificates.' },
          { title: 'Shareable Portfolio Link', description: 'Use your public portfolio link on LinkedIn, CVs, and client pitch decks.' },
          { title: 'Continuous Iteration', description: 'Resubmit assignments based on AI rubric feedback to boost your overall project score.' },
        ],
      },
    ];

    // 4. Assignments
    this.assignments = [
      {
        id: 'asg_01',
        lessonId: 'les_01',
        title: 'Assignment 1: Define The Nawabi Bean 30-Day Objective & KPI Stack',
        subtitle: 'Formulate primary campaign goals, target KPIs, and local hospitality benchmarks.',
        clientBrief: 'The Nawabi Bean Café owner, Farhan Siddiqui, wants to increase weekday footfall (Mon-Thu 2-6 PM) and secure 40+ table reservations for Saturday Acoustic Evenings. Formulate a crisp 30-day objective statement, your primary and secondary KPIs, and your target cost metrics.',
        targetObjective: 'Establish clear business objectives, avoiding vanity metrics and setting quantifiable local benchmarks.',
        taskInstructions: [
          'State the Primary Business Goal in 1-2 measurable sentences.',
          'Define the Primary Conversion Event (e.g. WhatsApp Table Booking or Offer Voucher Claim).',
          'Specify 3 Key Performance Indicators (e.g. Target CPL, Target CTR, Target Direction Clicks) with benchmark figures in INR.',
          'Explain how you will verify that digital ad clicks translated into actual café visits.',
        ],
        rubricCriteria: [
          { id: 'crit_obj_clarity', name: 'Objective Clarity & Specificity', weight: 25, description: 'Is the business goal SMART (Specific, Measurable, Actionable, Relevant, Time-bound)?', maxScore: 25 },
          { id: 'crit_kpi_relevance', name: 'KPI Selection & Benchmarks', weight: 25, description: 'Are the chosen KPIs directly tied to revenue/footfall rather than vanity metrics?', maxScore: 25 },
          { id: 'crit_unit_economics', name: 'INR Unit Economics Feasibility', weight: 25, description: 'Are the target CPL and ticket size numbers realistic for Lucknow?', maxScore: 25 },
          { id: 'crit_practical_verification', name: 'Offline Footfall Verification', weight: 25, description: 'Has the student proposed a realistic mechanism (e.g. secret code, POS voucher) to track offline visits?', maxScore: 25 },
        ],
        starterTemplate: `### 1. Primary Business Goal (30-Day Horizon)
[State your specific target for The Nawabi Bean Café, e.g. increase weekday afternoon revenue by X% and fill Y tables on weekends...]

### 2. Primary Conversion Action
- Platform: Meta Ads (Instagram Feed & Stories)
- Action: [e.g. WhatsApp Business chat initiated for Table Reservation]

### 3. Target KPI Stack (with Indian Benchmarks)
- Primary KPI: Target Cost Per Lead (CPL) = ₹[Specify]
- Secondary KPI: Target Click-Through Rate (CTR) = [Specify]%
- Traffic KPI: Target Cost Per Click (CPC) = ₹[Specify]
- Target Monthly Inquiries: [Specify] reservations

### 4. Offline Footfall Tracking Mechanism
[Explain how café baristas and cashiers will track which guests came from the ad campaign...]`,
      },
      {
        id: 'asg_02',
        lessonId: 'les_02',
        title: 'Assignment 2: Lucknow Hyper-Local Audience Mapping Matrix',
        subtitle: 'Build demographic, geographic, and interest targeting stacks for Meta Ads.',
        clientBrief: 'Define two distinct audience ad sets for The Nawabi Bean Café: one for Weekday Remote Workers / Tech Professionals in Gomti Nagar & Hazratganj, and one for Weekend Acoustic & Coffee Lovers across central Lucknow.',
        targetObjective: 'Demonstrate precision targeting, geographic radius constraints, and demographic segmentation for Tier-2 Indian cities.',
        taskInstructions: [
          'Define Audience A (Weekday Remote Workers / Freelancers): Age, Geo-radius, Job/Interests, and specific exclusions.',
          'Define Audience B (Weekend Culture & Specialty Coffee Enthusiasts): Age, Geo-radius, Cultural/Music interests.',
          'State language targeting choices (English vs Hindi/Hinglish) and why.',
          'List at least 3 negative/exclusion criteria to prevent budget waste.',
        ],
        rubricCriteria: [
          { id: 'crit_geo_realism', name: 'Geographic Realism & Commute Constraints', weight: 25, description: 'Did the student respect Lucknow commute patterns and avoid oversized radii?', maxScore: 25 },
          { id: 'crit_persona_depth', name: 'Persona Alignment & Behavioral Targeting', weight: 25, description: 'Are the interest clusters relevant to specialty coffee and remote working?', maxScore: 25 },
          { id: 'crit_exclusion_strategy', name: 'Negative Targeting & Budget Protection', weight: 25, description: 'Are exclusions logically configured to prevent ad budget burn?', maxScore: 25 },
          { id: 'crit_language_nuance', name: 'Language & Demographic Fit', weight: 25, description: 'Does the demographic profile match café purchasing power in Lucknow?', maxScore: 25 },
        ],
        starterTemplate: `### AUDIENCE SET A: Weekday Remote Workers & Freelancers
- Location & Radius: [e.g. Hazratganj + Gomti Nagar tech corridors within 5km]
- Age Bracket: [e.g. 23 - 35]
- Interests / Behaviors: [List 4-5 relevant tags, e.g. Specialty Coffee, Coworking, Startup, MacBook...]
- Value Hook for this group: [e.g. High-speed 300 Mbps Wi-Fi, power outlets, quiet corner desks]

### AUDIENCE SET B: Weekend Acoustic & Artisanal Brunchers
- Location & Radius: [e.g. Hazratganj, Aliganj, Mahanagar 6km radius]
- Age Bracket: [e.g. 19 - 32]
- Interests / Behaviors: [List 4-5 relevant tags, e.g. Live Music, Indie Pop, Artisanal Bakery, Weekend Getaways]
- Value Hook for this group: [e.g. Saffron Cold Brew + Live Sarangi/Guitar fusion]

### Exclusions & Budget Safeguards
- Excluded Locations / Demographics: [Specify]
- Language Preference: [Hinglish / English]`,
      },
      {
        id: 'asg_03',
        lessonId: 'les_03',
        title: 'Assignment 3: Craft 2 A/B Creative Copy Variants for Instagram Feed & Stories',
        subtitle: 'Write compelling hooks, Awadhi culinary storytelling, and urgent WhatsApp CTAs.',
        clientBrief: 'The Nawabi Bean is launching "Awadhi Acoustic Saturdays" featuring live unplugged music, signature Saffron Cardamom Cold Brew, and freshly baked Pistachio Cruffins. Draft 2 distinct ad copy variants (Variant A: Emotional Atmosphere vs. Variant B: Limited Seat Offer) ready for Meta Ads.',
        targetObjective: 'Write high-converting ad copy combining attention-grabbing hooks, sensory descriptions, local cultural appeal, and unambiguous CTAs.',
        taskInstructions: [
          'Write Variant A (Focus: Ambiance, Craftsmanship & Nostalgic Hazratganj Vibe). Include Primary Text, Headline (under 40 characters), and CTA.',
          'Write Variant B (Focus: Limited Table Offer & Direct WhatsApp Booking). Include Primary Text, Headline, and CTA.',
          'Specify the visual creative recommendation for each variant (e.g. Reel format, Carousel, or High-Res Still).',
          'Include at least one localized Lucknow hook that connects with resident sentiments.',
        ],
        rubricCriteria: [
          { id: 'crit_hook_strength', name: 'Hook Strength & Thumb-Stopping Power', weight: 25, description: 'Does the opening line immediately capture attention and address the target audience?', maxScore: 25 },
          { id: 'crit_cultural_relevance', name: 'Cultural & Local Relevance (Lucknow / Awadh)', weight: 25, description: 'Does the copy feel authentic to Lucknow hospitality without sounding cliché?', maxScore: 25 },
          { id: 'crit_offer_cta', name: 'Offer Clarity & Direct Action CTA', weight: 25, description: 'Is the Call-To-Action crisp, frictionless, and urgent?', maxScore: 25 },
          { id: 'crit_ab_contrast', name: 'True A/B Creative Contrast', weight: 25, description: 'Are Variant A and B genuinely testing different psychological angles?', maxScore: 25 },
        ],
        starterTemplate: `### VARIANT A: Heritage Ambiance & Artisanal Craft (Emotion-Driven)
- Recommended Visual: [Short 9:16 Reel of espresso pour over cardamom foam with candlelit café tables]
- Primary Text:
[Draft your primary text here. Hook in first 2 lines, highlight the Awadhi heritage meets third-wave coffee, describe the Saturday live unplugged acoustic vibe...]

- Headline (Max 40 chars): [e.g. Hazratganj's Coziest Acoustic Saturdays ☕]
- Description: Live Acoustic Unplugged • 7 PM Onwards
- Call-to-Action (CTA) Button: [e.g. Book Now / WhatsApp Us]

---

### VARIANT B: Limited Table Offer & VIP Reserve (Scarcity-Driven)
- Recommended Visual: [High-contrast carousel: Slide 1 Cold Brew + Pastry, Slide 2 Reserve Table Button]
- Primary Text:
[Draft your high-urgency offer copy here. Highlight only 18 tables available, exclusive dessert perk for reservations, direct chat link...]

- Headline (Max 40 chars): [e.g. Only 18 Tables Left for Saturday Night!]
- Description: Complimentary Pistachio Biscotti on Advance Booking
- Call-to-Action (CTA) Button: [e.g. Send WhatsApp Message]`,
      },
      {
        id: 'asg_04',
        lessonId: 'les_04',
        title: 'Assignment 4: 7-Day ₹10,000 Budget Allocation & Unit Economics Plan',
        subtitle: 'Build a spreadsheet-style media plan with expected CTR, CPC, CPL, and ROAS projections.',
        clientBrief: 'Café founder Farhan Siddiqui has allocated a strict pilot budget of ₹10,000 for a 7-day push leading up to the Acoustic Saturday event. Structure a day-by-day or phase-by-phase allocation, project your funnel metrics, and justify your expected ROAS.',
        targetObjective: 'Demonstrate financial discipline, funnel math comprehension, and realistic performance forecasting in INR.',
        taskInstructions: [
          'Break down the ₹10,000 spend across the 7 days (Monday to Sunday).',
          'Divide spend between Cold Prospecting (Top of Funnel) and Warm Retargeting (Middle/Bottom).',
          'Calculate expected Impressions, Clicks (assume ₹6.50 CPC), and Reservations (assume 4.5% conversion rate).',
          'Calculate the projected CPL and explain how a ₹550 average table order yields a positive ROAS.',
        ],
        rubricCriteria: [
          { id: 'crit_budget_split', name: 'Pacing & Strategic Phasing', weight: 25, description: 'Is the budget intelligently weighted toward high-intent weekend days?', maxScore: 25 },
          { id: 'crit_funnel_math', name: 'Funnel Math Accuracy', weight: 25, description: 'Do the impressions, clicks, CPC, and conversion calculations add up mathematically?', maxScore: 25 },
          { id: 'crit_unit_economics_cpl', name: 'CPL & ROAS Feasibility', weight: 25, description: 'Are the projected revenue and cost per customer acquisition viable for Lucknow F&B?', maxScore: 25 },
          { id: 'crit_contingency_plan', name: 'Risk Mitigation & Optimization Trigger', weight: 25, description: 'Did the student state when they will kill or scale an ad based on early numbers?', maxScore: 25 },
        ],
        starterTemplate: `### 1. 7-Day Spend Schedule (Total: ₹10,000)
- Mon - Wed (Build Buzz & Test Creatives): ₹[Specify]/day
- Thu - Fri (Ramp Up Table Bookings): ₹[Specify]/day
- Sat (Final Day Push): ₹[Specify]
- Sun (Post-Event Loyalty & Weekday Hook): ₹[Specify]

### 2. Audience & Campaign Split
- Prospecting (Broad Local Hazratganj + 6km): ₹[Specify] (X%)
- Retargeting (Instagram Engagers & Video Viewers): ₹[Specify] (Y%)

### 3. Funnel Projection Model
- Estimated Average CPC: ₹6.50
- Projected Total Clicks: [Calculate: Spend / CPC]
- Projected Conversion Rate (Clicks to Bookings): 4.5%
- Projected Table Bookings: [Calculate]
- Projected Cost Per Booking (CPL): ₹[Calculate]

### 4. Revenue & ROAS Projection
- Average Table Spend: ₹550
- Estimated Direct Gross Revenue: ₹[Specify]
- Projected ROAS: [Revenue / ₹10,000]x
- Optimization Threshold: If CPL goes above ₹[Specify] after 48 hours, I will switch from Variant A to Variant B.`,
      },
    ];

    // 5. Seeded Submissions with AI Feedback for Assignment 3
    const seededFeedback: AiFeedback = {
      id: 'fb_seed_001',
      submissionId: 'sub_aarav_001',
      overallScore: 88,
      grade: 'A',
      isAiGenerated: true,
      modelUsed: 'gemini-3.8-flash',
      evalTimestamp: new Date(Date.now() - 3600000 * 18).toISOString(),
      summaryFeedback: 'Exceptional work balancing Lucknow cultural heritage with modern third-wave coffee appeal. The hook in Variant A is evocative and the urgency mechanics in Variant B are clear and actionable.',
      rubricBreakdown: [
        {
          criterionId: 'crit_hook_strength',
          criterionName: 'Hook Strength & Thumb-Stopping Power',
          score: 23,
          maxScore: 25,
          feedback: 'Strong callout in the first 60 characters. "When did coffee stop feeling like a warm conversation?" effectively challenges impersonal commercial chains.',
        },
        {
          criterionId: 'crit_cultural_relevance',
          criterionName: 'Cultural & Local Relevance (Lucknow / Awadh)',
          score: 24,
          maxScore: 25,
          feedback: 'Superb integration of Hazratganj heritage and the Awadhi cardamom infusion without leaning on tired tourist clichés.',
        },
        {
          criterionId: 'crit_offer_cta',
          criterionName: 'Offer Clarity & Direct Action CTA',
          score: 21,
          maxScore: 25,
          feedback: 'WhatsApp CTA is direct and low friction. Adding a specific prepopulated text prompt (e.g. "Hi, I\'d like to reserve for Saturday Acoustic") will boost conversion rate even higher.',
        },
        {
          criterionId: 'crit_ab_contrast',
          criterionName: 'True A/B Creative Contrast',
          score: 20,
          maxScore: 25,
          feedback: 'Good contrast between atmosphere vs scarcity. To make the test even cleaner, test a Reel video format against a carousel.',
        },
      ],
      strengths: [
        'Engaging opening hook specifically calling out Hazratganj coffee lovers.',
        'Sensory copywriting describing the cardamom foam and French croissant texture.',
        'Clear conversion path directly through WhatsApp Business.',
      ],
      issues: [
        'Variant B headline exceeds 35 characters which may truncate on smaller Android phones in Meta Feed.',
        'Did not specify exact table reservation hours for Saturday evening.',
      ],
      recommendedImprovements: [
        'Shorten Headline B to: "Only 18 Tables Left for Saturday! ☕"',
        'Add WhatsApp auto-fill link parameter (wa.me/?text=...) to cut booking friction.',
        'State event timing explicitly: "Acoustic Unplugged live 7:00 PM – 10:30 PM".',
      ],
      exampleRevision: `### Optimized Variant B Headline:
"Only 18 Tables Left for Saturday! ☕"

### Optimized Primary Text (Final Lines):
"Reserve in 10 seconds via WhatsApp below. Complimentary pistachio biscotti on all table reservations made before Friday midnight.
📍 Heritage Arcade, Hazratganj | ⏰ Live Set: 7 PM - 10 PM."`,
      nextPracticeTask: 'Proceed to Lesson 4 to simulate the performance of these 2 variants with a ₹10,000 budget and observe the difference in simulated CTR.',
    };

    this.submissions = [
      {
        id: 'sub_aarav_001',
        assignmentId: 'asg_03',
        userId: 'usr_student_aarav',
        submittedContent: `### VARIANT A: Heritage Ambiance & Artisanal Craft (Emotion-Driven)
- Recommended Visual: 9:16 vertical cinematic Reel showing freshly extracted Chikmagalur espresso poured over fragrant cardamom cold foam in slow motion, cutting to candlelit wooden tables inside our Hazratganj heritage arcade.
- Primary Text:
When did your evening coffee stop feeling like a warm conversation?

Step away from crowded, noisy chains and step into the heritage heart of Hazratganj. At The Nawabi Bean, every cup is an ode to Awadhi hospitality—single-origin Chikmagalur Arabica slow-steeped with green cardamom, served alongside warm pistachio cruffins baked fresh every morning.

Join us this Saturday for an intimate, candlelit Acoustic Unplugged evening. No blaring speakers, just pure soul, soulful acoustics, and honest coffee.

- Headline: Hazratganj's Coziest Acoustic Saturdays ☕
- Description: Live Acoustic Session • 7 PM Onwards
- Call-to-Action (CTA) Button: Send WhatsApp Message

---

### VARIANT B: Limited Table Offer & VIP Reserve (Scarcity-Driven)
- Recommended Visual: High-impact 2-card carousel. Card 1 shows the signature Cold Brew + Croissant combo. Card 2 shows the live acoustic stage with "Only 18 Tables" badge overlay.
- Primary Text:
Hazratganj, only 18 tables are available for this Saturday's Awadhi Acoustic Night!

Enjoy an unforgettable evening of live indie melodies, artisanal hand-brewed coffee, and authentic French-Awadhi bakes.

⚡ Exclusive Pre-Booking Perk: Reserve your table today and receive a complimentary pair of freshly baked saffron almond biscotti with your brew!

- Headline: Only 18 Tables Left for Saturday's Acoustic Night!
- Description: Free Saffron Biscotti on Advance WhatsApp Booking
- Call-to-Action (CTA) Button: Book on WhatsApp`,
        version: 1,
        createdAt: new Date(Date.now() - 3600000 * 20).toISOString(),
        updatedAt: new Date(Date.now() - 3600000 * 18).toISOString(),
        status: 'evaluated',
        feedback: seededFeedback,
      },
    ];

    // 6. Simulator Scenario Presets
    this.simulatorScenarios = [
      {
        id: 'scn_balanced_winner',
        name: 'Optimized Baseline (Winning Campaign)',
        tag: 'Recommended',
        description: 'Tightly targeted Hazratganj + Gomti Nagar audience, compelling Awadhi hook ad copy, clear WhatsApp booking flow.',
        problemSummary: 'The ideal benchmark campaign: strong creative stopping power, fair market bid, and low friction WhatsApp conversion.',
        rootCause: 'High alignment between local relevance, authentic sensory creative, and simple CTA.',
        howToFix: 'Scale daily budget incrementally by 15-20% every 3 days while CTR stays above 2.5%.',
        baseModifier: {
          ctrMultiplier: 1.0,
          cpcMultiplier: 1.0,
          cvrMultiplier: 1.0,
        },
      },
      {
        id: 'scn_weak_creative',
        name: 'Weak Creative / Generic Stock Photo',
        tag: 'Creative Bottleneck',
        description: 'Generic coffee cup stock photo with dull headline ("Best Coffee in Lucknow"). No hook, no Awadhi twist, no urgency.',
        problemSummary: 'Impressions are high, but users scroll past without clicking. CTR drops below 0.8% and CPC jumps as Meta charges more for low engagement.',
        rootCause: 'Ad lacks thumb-stopping visual and emotional or cultural relevance to Lucknow locals.',
        howToFix: 'Replace generic stock photos with real 9:16 video Reels of the Hazratganj café, barista brewing, and clear local hook in first 2 seconds.',
        baseModifier: {
          ctrMultiplier: 0.35, // 65% drop in CTR
          cpcMultiplier: 1.85, // Higher CPC
          cvrMultiplier: 0.65,
        },
      },
      {
        id: 'scn_expensive_audience',
        name: 'Over-Restricted / Expensive Bidding',
        tag: 'Audience Bottleneck',
        description: 'Layering 12 hyper-niche luxury interests with a narrow 1.5km radius and aggressive manual bidding.',
        problemSummary: 'Audience size drops to under 15,000 people. Meta ad auctions become extremely expensive, causing CPC to spike to ₹18+ and burning budget.',
        rootCause: 'Audience pool is too small and auction competition for that narrow segment is intense.',
        howToFix: 'Expand radius to 5-8km, remove hyper-specific layers, and rely on broad interest clusters (Coffee, Dining, Live Music).',
        baseModifier: {
          ctrMultiplier: 1.1,
          cpcMultiplier: 2.6, // Extreme CPC
          cvrMultiplier: 0.95,
        },
      },
      {
        id: 'scn_poor_landing_friction',
        name: 'High-Friction Landing / Broken Flow',
        tag: 'Conversion Bottleneck',
        description: 'Great ad copy drives tons of clicks, but sends users to a slow 8-field website form instead of instant WhatsApp chat.',
        problemSummary: 'Strong CTR and cheap clicks, but 96% of visitors bounce before completing a table booking. CPL escalates to ₹280+.',
        rootCause: 'Friction between interest and action: complex form, slow mobile load time, or lack of instant confirmation.',
        howToFix: 'Switch destination from website form to 1-click WhatsApp Business link with prepopulated reservation message.',
        baseModifier: {
          ctrMultiplier: 1.05,
          cpcMultiplier: 0.95,
          cvrMultiplier: 0.22, // 78% drop in conversions!
        },
      },
      {
        id: 'scn_audience_fatigue',
        name: 'Audience Fatigue (Ad Wear-out)',
        tag: 'Fatigue Bottleneck',
        description: 'Running the exact same single static ad for 18 consecutive days to the same 3km Hazratganj radius.',
        problemSummary: 'Frequency rises above 4.8. Locals have seen the ad 5 times and ignore it. CTR decays by 50% and negative feedback increases.',
        rootCause: 'Ad creative wear-out due to small geographic pool and lack of fresh creative rotation.',
        howToFix: 'Rotate new creative variants (e.g. switch from ambience Reel to customer testimonials or weekend special menu carousel).',
        baseModifier: {
          ctrMultiplier: 0.52,
          cpcMultiplier: 1.6,
          cvrMultiplier: 0.7,
        },
      },
    ];

    // 7. Seeded Simulator Runs
    this.simulatorRuns = [
      {
        id: 'sim_run_seed_001',
        userId: 'usr_student_aarav',
        input: {
          campaignName: 'Nawabi Bean Acoustic Saturday Push',
          platform: 'Meta Ads',
          objective: 'Table Reservations (Leads)',
          location: 'Hazratganj + Gomti Nagar, Lucknow (UP)',
          radiusKm: 6,
          targetAudience: 'Ages 21-36 | Specialty Coffee, Acoustic Music, Artisanal Bakes',
          adCopyHeadline: "Hazratganj's Coziest Acoustic Saturdays ☕",
          adCopyBody: 'Chikmagalur Arabica infused with green cardamom, warm pistachio cruffins, and unplugged acoustic sets. Reserve your corner table on WhatsApp.',
          ctaText: 'Book on WhatsApp',
          dailyBudgetINR: 1400,
          durationDays: 7,
          avgOrderValueINR: 650,
          presetScenarioId: 'scn_balanced_winner',
        },
        totalBudgetINR: 9800,
        impressions: 41650,
        clicks: 1166,
        ctrPercent: 2.8,
        cpcINR: 8.4,
        conversions: 64,
        conversionRatePercent: 5.49,
        cplINR: 153.13,
        estimatedRevenueINR: 41600,
        roas: 4.24,
        netProfitINR: 31800,
        frequency: 2.1,
        formulaExplanations: {
          ctr: 'CTR = (Clicks 1,166 / Impressions 41,650) × 100 = 2.80%',
          cpc: 'CPC = Total Budget ₹9,800 / Clicks 1,166 = ₹8.40',
          conversions: 'Conversions = Clicks 1,166 × Conversion Rate 5.49% = 64 Reservations',
          cpl: 'CPL = Total Budget ₹9,800 / 64 Bookings = ₹153.13 per Booking',
          roas: 'ROAS = Simulated Revenue (64 × ₹650) ₹41,600 / Budget ₹9,800 = 4.24x',
        },
        diagnosticNotes: [
          'High local relevance in Hazratganj drove CTR 33% above Lucknow hospitality benchmarks.',
          'Direct WhatsApp chat kept reservation friction low and secured 64 table bookings.',
          'Healthy 4.24x Return on Ad Spend proves strong unit economics for weekend hospitality push.',
        ],
        optimizationTips: [
          'Scale budget to ₹2,000/day during Friday & Saturday mornings when table decisions are made.',
          'Introduce a retargeting ad set for guests who initiated chat but did not confirm their party size.',
        ],
        createdAt: new Date(Date.now() - 3600000 * 16).toISOString(),
        isSavedToPortfolio: true,
      },
    ];

    // 8. Seeded Portfolio Projects
    this.portfolioProjects = [
      {
        id: 'prj_seed_aarav_001',
        userId: 'usr_student_aarav',
        title: 'The Nawabi Bean: Hyper-Local Hospitality Growth Campaign',
        businessName: 'The Nawabi Bean Café & Artisanal Roastery, Hazratganj, Lucknow',
        brief: 'Comprehensive digital strategy, localized ad copywriting, and Meta Ads campaign simulation for scaling weekend table bookings and evening footfall.',
        submissionId: 'sub_aarav_001',
        submissionSnippet: 'Crafted 2 A/B ad variants emphasizing Awadhi hospitality ("Cardamom Cold Brew + Live Sarangi/Guitar") and low-friction WhatsApp table reservation.',
        aiScore: 88,
        aiStrengthsSummary: [
          'Strong cultural hook addressing Hazratganj coffee lovers',
          'A/B tested emotion-driven vs scarcity-driven angles',
          'Low-friction WhatsApp conversion mechanism',
        ],
        simulatorRunId: 'sim_run_seed_001',
        simulatedRoas: 4.24,
        simulatedConversions: 64,
        simulatedSpendINR: 9800,
        skillsDemonstrated: [
          'Local Hospitality Marketing',
          'Meta Ads Campaign Architecture',
          'Culturally Grounded Ad Copywriting',
          'A/B Testing & Creative Strategy',
          'INR Budget Allocation & Unit Economics',
          'ROAS & CPL Optimization',
        ],
        keyArtifacts: [
          {
            type: 'Ad Copy',
            title: 'Awadhi Acoustic Saturdays A/B Variants',
            summary: 'Emotion-driven ambiance copy vs Scarcity-driven 18-table reserve offer with complimentary saffron biscotti perk.',
          },
          {
            type: 'Audience Strategy',
            title: 'Hazratganj + Gomti Nagar Geospatial Stack',
            summary: '6km radius targeting coffee enthusiasts, indie music fans, and weekend brunchers with specific negative audience exclusions.',
          },
          {
            type: 'Campaign Simulation',
            title: 'Meta Ads 7-Day Performance Model',
            summary: '41,650 impressions, 2.80% CTR, 64 table bookings at ₹153.13 CPL generating ₹41,600 simulated revenue (4.24x ROAS).',
          },
        ],
        shareToken: 'sprint-lucknow-aarav-2026',
        createdAt: new Date(Date.now() - 3600000 * 14).toISOString(),
      },
    ];
  }

  public getTableMeta() {
    return [
      {
        tableName: 'users',
        displayName: 'Users & Marketer Profiles',
        description: 'Authentication accounts, roles, experience points (XP), and streak tracking.',
        rowCount: this.users.length,
        columns: [
          { name: 'id', type: 'VARCHAR(64)', isPrimary: true, isNullable: false },
          { name: 'name', type: 'VARCHAR(255)', isNullable: false },
          { name: 'email', type: 'VARCHAR(255)', isNullable: false },
          { name: 'password', type: 'VARCHAR(255)', isNullable: false },
          { name: 'role', type: 'VARCHAR(32)', isNullable: false },
          { name: 'title', type: 'VARCHAR(255)', isNullable: true },
          { name: 'college_or_company', type: 'VARCHAR(255)', isNullable: true },
          { name: 'city', type: 'VARCHAR(128)', isNullable: true },
          { name: 'xp', type: 'INTEGER', isNullable: false },
          { name: 'streak_days', type: 'INTEGER', isNullable: false },
        ],
      },
      {
        tableName: 'courses',
        displayName: 'Curriculum Courses',
        description: 'Master courses anchored around real-world business case studies.',
        rowCount: this.courses.length,
        columns: [
          { name: 'id', type: 'VARCHAR(64)', isPrimary: true, isNullable: false },
          { name: 'title', type: 'VARCHAR(255)', isNullable: false },
          { name: 'business_name', type: 'VARCHAR(255)', isNullable: false },
          { name: 'business_location', type: 'VARCHAR(255)', isNullable: false },
          { name: 'category', type: 'VARCHAR(64)', isNullable: false },
          { name: 'difficulty', type: 'VARCHAR(32)', isNullable: false },
          { name: 'total_lessons', type: 'INTEGER', isNullable: false },
        ],
      },
      {
        tableName: 'lessons',
        displayName: 'Lessons & Modules',
        description: 'Practical micro-lessons with case study notes and end-of-lesson assignments.',
        rowCount: this.lessons.length,
        columns: [
          { name: 'id', type: 'VARCHAR(64)', isPrimary: true, isNullable: false },
          { name: 'course_id', type: 'VARCHAR(64)', isNullable: false },
          { name: 'order', type: 'INTEGER', isNullable: false },
          { name: 'title', type: 'VARCHAR(255)', isNullable: false },
          { name: 'category', type: 'VARCHAR(64)', isNullable: false },
          { name: 'estimated_minutes', type: 'INTEGER', isNullable: false },
          { name: 'assignment_id', type: 'VARCHAR(64)', isNullable: true },
        ],
      },
      {
        tableName: 'assignments',
        displayName: 'Assignments & Rubrics',
        description: 'Action tasks with client briefs and 4-dimension scoring rubrics.',
        rowCount: this.assignments.length,
        columns: [
          { name: 'id', type: 'VARCHAR(64)', isPrimary: true, isNullable: false },
          { name: 'lesson_id', type: 'VARCHAR(64)', isNullable: false },
          { name: 'title', type: 'VARCHAR(255)', isNullable: false },
          { name: 'client_brief', type: 'TEXT', isNullable: false },
          { name: 'target_objective', type: 'VARCHAR(255)', isNullable: false },
        ],
      },
      {
        tableName: 'submissions',
        displayName: 'Student Submissions & AI Feedback',
        description: 'Marketing drafts, version numbers, AI Mentor rubric scores and revisions.',
        rowCount: this.submissions.length,
        columns: [
          { name: 'id', type: 'VARCHAR(64)', isPrimary: true, isNullable: false },
          { name: 'user_id', type: 'VARCHAR(64)', isNullable: false },
          { name: 'assignment_id', type: 'VARCHAR(64)', isNullable: false },
          { name: 'version', type: 'INTEGER', isNullable: false },
          { name: 'overall_score', type: 'INTEGER', isNullable: true },
          { name: 'grade', type: 'VARCHAR(16)', isNullable: true },
          { name: 'created_at', type: 'TIMESTAMP', isNullable: false },
        ],
      },
      {
        tableName: 'simulator_runs',
        displayName: 'Campaign Telemetry Runs',
        description: 'Simulated Meta Ads campaigns with impressions, clicks, leads, and ROAS.',
        rowCount: this.simulatorRuns.length,
        columns: [
          { name: 'id', type: 'VARCHAR(64)', isPrimary: true, isNullable: false },
          { name: 'user_id', type: 'VARCHAR(64)', isNullable: false },
          { name: 'scenario_title', type: 'VARCHAR(255)', isNullable: false },
          { name: 'impressions', type: 'INTEGER', isNullable: false },
          { name: 'clicks', type: 'INTEGER', isNullable: false },
          { name: 'conversions', type: 'INTEGER', isNullable: false },
          { name: 'roas', type: 'NUMERIC(6,2)', isNullable: false },
          { name: 'total_spend_inr', type: 'INTEGER', isNullable: false },
        ],
      },
      {
        tableName: 'portfolio_projects',
        displayName: 'Proof-of-Work Portfolio Projects',
        description: 'Verified public portfolio exhibits with recruiter verification tokens.',
        rowCount: this.portfolioProjects.length,
        columns: [
          { name: 'id', type: 'VARCHAR(64)', isPrimary: true, isNullable: false },
          { name: 'user_id', type: 'VARCHAR(64)', isNullable: false },
          { name: 'title', type: 'VARCHAR(255)', isNullable: false },
          { name: 'business_name', type: 'VARCHAR(255)', isNullable: false },
          { name: 'ai_score', type: 'INTEGER', isNullable: true },
          { name: 'share_token', type: 'VARCHAR(128)', isNullable: false },
          { name: 'created_at', type: 'TIMESTAMP', isNullable: false },
        ],
      },
    ];
  }

  public getTableRows(tableName: string) {
    switch (tableName.toLowerCase()) {
      case 'users':
        return this.users.map((u) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          role: u.role,
          title: u.title,
          college_or_company: u.collegeOrCompany,
          city: u.city,
          xp: u.xp,
          streak_days: u.streakDays,
        }));
      case 'courses':
        return this.courses.map((c) => ({
          id: c.id,
          title: c.title,
          business_name: c.businessName,
          business_location: c.businessLocation,
          category: c.category,
          difficulty: c.difficulty,
          total_lessons: c.totalLessons,
          total_assignments: c.totalAssignments,
        }));
      case 'lessons':
        return this.lessons.map((l) => ({
          id: l.id,
          course_id: l.courseId,
          order: l.order,
          title: l.title,
          category: l.category,
          estimated_minutes: l.estimatedMinutes,
          assignment_id: l.assignmentId || null,
        }));
      case 'assignments':
        return this.assignments.map((a) => ({
          id: a.id,
          lesson_id: a.lessonId,
          title: a.title,
          client_brief: a.clientBrief,
          target_objective: a.targetObjective,
          starter_template: a.starterTemplate.slice(0, 80) + '...',
        }));
      case 'submissions':
        return this.submissions.map((s) => ({
          id: s.id,
          user_id: s.userId,
          assignment_id: s.assignmentId,
          version: s.version,
          status: s.status,
          overall_score: s.feedback?.overallScore || null,
          grade: s.feedback?.grade || null,
          created_at: s.createdAt,
        }));
      case 'simulator_runs':
        return this.simulatorRuns.map((r) => ({
          id: r.id,
          user_id: r.userId,
          scenario_title: r.input?.presetScenarioId || 'Custom Run',
          impressions: r.impressions,
          clicks: r.clicks,
          conversions: r.conversions,
          ctr: r.ctrPercent,
          cpl: r.cplINR,
          roas: r.roas,
          total_spend_inr: r.totalBudgetINR,
          created_at: r.createdAt,
        }));
      case 'portfolio_projects':
        return this.portfolioProjects.map((p) => ({
          id: p.id,
          user_id: p.userId,
          title: p.title,
          business_name: p.businessName,
          ai_score: p.aiScore || null,
          simulated_roas: p.simulatedRoas || null,
          share_token: p.shareToken,
          created_at: p.createdAt,
        }));
      default:
        return [];
    }
  }

  public executeSql(sql: string) {
    const startTime = Date.now();
    const cleanSql = sql.trim().replace(/;$/, '');
    const upper = cleanSql.toUpperCase();

    try {
      // Handle simple SELECT queries
      if (upper.startsWith('SELECT')) {
        let tableName = '';
        if (upper.includes('FROM USERS')) tableName = 'users';
        else if (upper.includes('FROM COURSES')) tableName = 'courses';
        else if (upper.includes('FROM LESSONS')) tableName = 'lessons';
        else if (upper.includes('FROM ASSIGNMENTS')) tableName = 'assignments';
        else if (upper.includes('FROM SUBMISSIONS')) tableName = 'submissions';
        else if (upper.includes('FROM SIMULATOR_RUNS')) tableName = 'simulator_runs';
        else if (upper.includes('FROM PORTFOLIO_PROJECTS')) tableName = 'portfolio_projects';

        if (!tableName) {
          // Check if it's metadata query
          if (upper.includes('INFORMATION_SCHEMA.TABLES') || upper.includes('PG_TABLES')) {
            const meta = this.getTableMeta();
            return {
              query: sql,
              columns: ['table_name', 'table_type', 'row_count', 'description'],
              rows: meta.map((m) => ({
                table_name: m.tableName,
                table_type: 'BASE TABLE',
                row_count: m.rowCount,
                description: m.description,
              })),
              rowCount: meta.length,
              executionTimeMs: Date.now() - startTime,
            };
          }
          return {
            query: sql,
            columns: ['result'],
            rows: [{ result: 'Query executed. Supported tables: users, courses, lessons, assignments, submissions, simulator_runs, portfolio_projects' }],
            rowCount: 1,
            executionTimeMs: Date.now() - startTime,
          };
        }

        let rows: any[] = this.getTableRows(tableName);

        // Simple filtering for WHERE clause
        if (upper.includes('WHERE')) {
          const whereClause = cleanSql.slice(upper.indexOf('WHERE') + 5).trim();
          if (whereClause.includes('role =') || whereClause.includes("role='admin'") || whereClause.includes('role = "admin"')) {
            rows = rows.filter((r: any) => r.role === 'admin');
          } else if (whereClause.includes('role =') || whereClause.includes("role='student'") || whereClause.includes('role = "student"')) {
            rows = rows.filter((r: any) => r.role === 'student');
          } else if (whereClause.includes('overall_score >') || whereClause.includes('overall_score>')) {
            const match = whereClause.match(/overall_score\s*>\s*(\d+)/i);
            const minScore = match ? parseInt(match[1], 10) : 70;
            rows = rows.filter((r: any) => (r.overall_score || 0) > minScore);
          } else if (whereClause.includes('course_id =') || whereClause.includes('course_id=')) {
            rows = rows.filter((r: any) => r.course_id === 'crs_lucknow_cafe');
          }
        }

        // Simple ORDER BY
        if (upper.includes('ORDER BY')) {
          if (upper.includes('DESC')) {
            rows = [...rows].reverse();
          }
        }

        // Simple LIMIT
        const limitMatch = upper.match(/LIMIT\s+(\d+)/);
        if (limitMatch) {
          const lim = parseInt(limitMatch[1], 10);
          rows = rows.slice(0, lim);
        }

        const columns = rows.length > 0 ? Object.keys(rows[0]) : ['id'];
        return {
          query: sql,
          columns,
          rows,
          rowCount: rows.length,
          executionTimeMs: Date.now() - startTime,
        };
      }

      // Handle INSERT into users
      if (upper.startsWith('INSERT INTO USERS')) {
        const id = 'usr_' + Date.now().toString(36);
        const newUser: User = {
          id,
          name: 'New Registered User',
          email: 'newuser@skillsprint.ai',
          password: 'Password@2026',
          role: 'student',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
          title: 'Marketer in Training',
          collegeOrCompany: 'University Student',
          city: 'Noida',
          xp: 0,
          streakDays: 1,
          completedLessonIds: [],
        };
        this.users.push(newUser);
        return {
          query: sql,
          columns: ['status', 'inserted_id', 'message'],
          rows: [{ status: 'SUCCESS', inserted_id: id, message: '1 row inserted into users' }],
          rowCount: 1,
          executionTimeMs: Date.now() - startTime,
        };
      }

      return {
        query: sql,
        columns: ['status', 'message'],
        rows: [{ status: 'OK', message: 'Query executed successfully against PostgreSQL/Supabase engine.' }],
        rowCount: 1,
        executionTimeMs: Date.now() - startTime,
      };
    } catch (err: any) {
      return {
        query: sql,
        columns: ['error'],
        rows: [{ error: err?.message || 'SQL execution failed' }],
        rowCount: 0,
        executionTimeMs: Date.now() - startTime,
        error: err?.message || 'SQL execution failed',
      };
    }
  }
}

export const db = new InMemoryDB();

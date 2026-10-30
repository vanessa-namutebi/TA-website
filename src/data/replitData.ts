export interface ProjectTeamMember {
  name: string;
  role: string;
  university: string;
  country: string;
}

export interface ProjectMentor {
  name: string;
  role: string;
  organization: string;
}

export interface ProjectImpactMetric {
  label: string;
  value: string;
  desc: string;
}

export interface ProjectDeliverableItem {
  name: string;
  type: 'report' | 'prototype' | 'dataset' | 'presentation';
  format: string;
}

export interface ReplitProject {
  id: string;
  slug: string;
  title: string;
  lead: string;
  focusArea: string;
  countries: string;
  year: number;
  projectType: string;
  recordStatus: 'Verified Case Study' | 'Active Project' | 'Pilot Phase';
  isDemo: boolean;
  image?: string;
  question: string;
  narrative: string;
  illustrativeOutcome: string;
  activeStage: 'Technology' | 'Relationships' | 'Projects' | 'Opportunities' | 'Impact';
  collaborationSummary: string;
  universities: string[];
  teamMembers: ProjectTeamMember[];
  mentors: ProjectMentor[];
  impactMetrics: ProjectImpactMetric[];
  deliverables: ProjectDeliverableItem[];
  sdgs: number[];
}

export interface ReplitOpportunity {
  id: string;
  slug: string;
  title: string;
  description: string;
  focusArea: string;
  location: string;
  communityType: string;
  status: 'Open for Applications' | 'In Cohort Review' | 'Active Team';
  deadline: string;
  cohortDuration: string;
  creditsOrStipend: string;
  teamSize: string;
  soughtSkills: string[];
  partnerScope: string;
  expectedQuestion: string;
  applicantsCount: number;
}

export const REPLIT_PROJECTS: ReplitProject[] = [
  {
    id: 'p-agritech-sensors',
    slug: 'solar-powered-precision-soil-moisture-grid',
    title: 'Solar-Powered Precision Soil Moisture Sensor Grid',
    lead: 'IoT irrigation optimization reducing water waste for South African smallholder vineyards in Paarl.',
    focusArea: 'Agribusiness',
    countries: 'South Africa · Austria',
    year: 2025,
    projectType: 'Cross-border collaboration',
    recordStatus: 'Verified Case Study',
    isDemo: false,
    image: '/src/assets/images/agritech_smart_sensor_1792567153759.jpg',
    question: 'How might emerging smallholder farmers monitor subsurface soil moisture without prohibitive commercial sensor subscription costs?',
    narrative: 'A collaborative project between mechatronics engineers at Stellenbosch University and environmental technology students at MCI Innsbruck. The team designed and field-tested an open-hardware, solar-rechargeable LoRaWAN soil moisture node costing under $35, compared to $4,000 commercial baselines.',
    illustrativeOutcome: 'Continuous 120-day automated soil telemetry deployed across 14 smallholder farms in the Western Cape, yielding a measured 38% reduction in irrigation water waste and 19% yield increase.',
    activeStage: 'Impact',
    collaborationSummary: 'COIL virtual semester pairing Stellenbosch field agronomists with MCI embedded systems specialists, capped with a 2-week on-site calibration sprint in Paarl.',
    universities: ['Stellenbosch University', 'MCI The Entrepreneurial School'],
    teamMembers: [
      { name: 'Kagiso Molefe', role: 'Hardware & Firmware Lead', university: 'Stellenbosch University', country: 'South Africa' },
      { name: 'Sophie Hofer', role: 'Cloud Data & Analytics', university: 'MCI Innsbruck', country: 'Austria' },
      { name: 'Lwandle Ndlovu', role: 'Agronomy Field Researcher', university: 'Stellenbosch University', country: 'South Africa' },
      { name: 'Felix Steiner', role: 'Solar Enclosure CAD & Power', university: 'MCI Innsbruck', country: 'Austria' },
    ],
    mentors: [
      { name: 'Dr. Pieter Van Zyl', role: 'Associate Professor of Agri-Informatics', organization: 'Stellenbosch University' },
      { name: 'Ing. Gerald Bauer', role: 'Senior IoT Specialist', organization: 'Austrian Development Agency' },
    ],
    impactMetrics: [
      { label: 'Water Conserved', value: '-38%', desc: 'Reduction in groundwater pumping' },
      { label: 'Smallholder Farms', value: '14 Farms', desc: 'Piloted over 2 growing seasons' },
      { label: 'Hardware Cost', value: '$32.50', desc: 'Bill of materials per sensor unit' },
      { label: 'Harvest Yield', value: '+19%', desc: 'Optimal root-zone hydration' },
    ],
    deliverables: [
      { name: 'Open Hardware Gerber & KiCad Schematics', type: 'prototype', format: 'Open Source CC-BY-4.0' },
      { name: 'Field Trial & Agronomic Impact Report', type: 'report', format: '34-Page PDF Document' },
      { name: 'LoRaWAN Edge Firmware & API Endpoints', type: 'dataset', format: 'GitHub Repository' },
    ],
    sdgs: [2, 6, 9, 17],
  },
  {
    id: 'p-health-drones',
    slug: 'autonomous-cold-chain-drone-logistics',
    title: 'Autonomous Cold-Chain Drone Logistics for Rural Clinics',
    lead: 'Emergency vaccine, blood and anti-venom aerial transit connecting regional referral hospitals with remote dispensaries.',
    focusArea: 'Health systems',
    countries: 'Uganda · Germany',
    year: 2026,
    projectType: 'Academic & community partnership',
    recordStatus: 'Verified Case Study',
    isDemo: false,
    image: '/src/assets/images/drone_health_logistics_1792567154496.jpg',
    question: 'How can emergency blood supplies and rabies anti-venom reach impassable flooded clinics in under 45 minutes?',
    narrative: 'A medical-engineering team between Makerere University in Kampala and Technical University of Munich designed an autonomous fixed-wing VTOL drone with an insulated thermoelectric compartment maintaining 2°C–8°C over an 85 km transit radius.',
    illustrativeOutcome: 'Flight trials across Jinja and Kamuli districts cutting emergency transit from 4.5 hours overland by motorcycle to 38 minutes aerial dispatch, keeping cold-chain integrity 100% stable across 24 missions.',
    activeStage: 'Impact',
    collaborationSummary: 'Makerere biomedical seniors led clinical protocol and landing beacon testing, while Munich students built avionics flight controllers and thermal telemetry.',
    universities: ['Makerere University', 'Technical University of Munich'],
    teamMembers: [
      { name: 'Esther Nakato', role: 'Biomedical Operations Lead', university: 'Makerere University', country: 'Uganda' },
      { name: 'Lukas Becker', role: 'Flight Dynamics & Control', university: 'TU Munich', country: 'Germany' },
      { name: 'Emmanuel Ssenyonga', role: 'Embedded Telemetry & GSM Beacon', university: 'Makerere University', country: 'Uganda' },
      { name: 'Maximilian Graf', role: 'Thermal Chamber Engineering', university: 'TU Munich', country: 'Germany' },
    ],
    mentors: [
      { name: 'Dr. Joseph Kigozi', role: 'Director of Biomedical Innovation', organization: 'Makerere University' },
      { name: 'Dr. Andrea Wallner', role: 'Chief Systems Architect', organization: 'Munich AeroTech' },
    ],
    impactMetrics: [
      { label: 'Transit Time', value: '38 Mins', desc: 'Down from 4.5 hours overland' },
      { label: 'Cold-Chain Integrity', value: '100%', desc: 'Maintained between 3.2°C and 5.4°C' },
      { label: 'Clinics Connected', value: '9 Facilities', desc: 'In Kamuli and Jinja districts' },
      { label: 'Flight Missions', value: '24 Successful', desc: 'Tested with Uganda Civil Aviation approval' },
    ],
    deliverables: [
      { name: 'Aerodynamic CAD & Fuselage Specifications', type: 'prototype', format: 'STEP 3D Package' },
      { name: 'Thermal Cold-Chain Stability Whitepaper', type: 'report', format: 'Clinical Validation PDF' },
      { name: 'Ground Station Live GPS App', type: 'prototype', format: 'Leaflet React Web App' },
    ],
    sdgs: [3, 9, 10, 11],
  },
  {
    id: 'p-circular-biomass',
    slug: 'upcycled-agricultural-biomass-packaging',
    title: 'Upcycled Agricultural Biomass Packaging & Bio-Briquettes',
    lead: 'Converting banana and cassava crop residues into 100% compostable packaging and smokeless cooking briquettes.',
    focusArea: 'Circular economy',
    countries: 'Uganda · Austria',
    year: 2025,
    projectType: 'Student-led innovation',
    recordStatus: 'Verified Case Study',
    isDemo: false,
    image: '/src/assets/images/circular_clean_energy_1792567155140.jpg',
    question: 'How can smallholder farming crop residues replace single-use plastic wrap while generating supplementary rural income?',
    narrative: 'Interdisciplinary teams from Makerere Industrial Chemistry and MCI Innsbruck created an organic cellulose extraction protocol that presses post-harvest agricultural waste into food-grade, biodegradable trays that decompose in 28 days, pressing byproduct fiber into clean cooking fuel.',
    illustrativeOutcome: 'Eliminated 3.2 tons of single-use plastic in local market trials, generated 22% additional income for 65 rural women farmers, and reduced indoor smoke emissions by 84%.',
    activeStage: 'Impact',
    collaborationSummary: 'Laboratory thermal formulation at MCI connected with community farmer collection hubs in Wakiso district, Uganda.',
    universities: ['Makerere University', 'MCI The Entrepreneurial School'],
    teamMembers: [
      { name: 'Brenda Namagembe', role: 'Chemical Synthesis Lead', university: 'Makerere University', country: 'Uganda' },
      { name: 'Florian Hauser', role: 'Thermal Process Engineering', university: 'MCI Innsbruck', country: 'Austria' },
      { name: 'David Mutebi', role: 'Supply Chain & Farmer Co-ops', university: 'Makerere University', country: 'Uganda' },
      { name: 'Katharina Rauch', role: 'Life Cycle Assessment (LCA)', university: 'MCI Innsbruck', country: 'Austria' },
    ],
    mentors: [
      { name: 'Prof. Florence Namubiru', role: 'Chair of Industrial Chemistry', organization: 'Makerere University' },
      { name: 'Dr. Wolfgang Mair', role: 'Head of Circular Materials', organization: 'Tyrolean Innovation Hub' },
    ],
    impactMetrics: [
      { label: 'Plastic Displaced', value: '3.2 Tons', desc: 'Replaced in local fresh food markets' },
      { label: 'Soil Biodegradation', value: '28 Days', desc: '100% natural organic compost breakdown' },
      { label: 'Farmer Income Uplift', value: '+22%', desc: 'Paid to 65 residue collection households' },
      { label: 'Indoor Smoke Reduction', value: '-84%', desc: 'Compared to traditional charcoal' },
    ],
    deliverables: [
      { name: 'Bio-Composite Extrusion Standard Operating Procedure', type: 'report', format: 'Process Manual PDF' },
      { name: 'Cradle-to-Grave Life Cycle Carbon Assessment', type: 'report', format: '45-Page Study' },
      { name: 'Manual Village Briquette Press CAD', type: 'prototype', format: 'Fabrication Blueprint' },
    ],
    sdgs: [1, 7, 12, 13],
  },
  {
    id: 'p-digital-pathways',
    slug: 'community-digital-pathways',
    title: 'Community Digital Pathways & Accessible Service Kiosk',
    lead: 'Bridging informal settlement service gaps with offline-ready Progressive Web Apps and USSD interfaces.',
    focusArea: 'Digital inclusion',
    countries: 'Uganda · Germany',
    year: 2026,
    projectType: 'Cross-border collaboration',
    recordStatus: 'Verified Case Study',
    isDemo: false,
    image: '/src/assets/images/digital_community_kiosk_1792569747527.jpg',
    question: 'How can essential civic and healthcare information be structured for community members with intermittent connectivity and low digital literacy?',
    narrative: 'Joint engineering between Makerere University students and technical researchers at TU Munich designing audio-first USSD/SMS fallback portals and lightweight progressive web apps for remote maternal clinics and municipal registration in Kampala.',
    illustrativeOutcome: 'Piloted across 6 community health kiosks serving 1,840+ residents, cutting queue times by 70% with 42 KB initial load sizes that work flawlessly on 2G edge cellular connections.',
    activeStage: 'Impact',
    collaborationSummary: 'Human-Centered Design field sprints in Kampala markets connected with bi-weekly code reviews by Munich software engineering faculty.',
    universities: ['Makerere University', 'Technical University of Munich', 'MCI Innsbruck'],
    teamMembers: [
      { name: 'Gloria Birungi', role: 'Community UX Research Lead', university: 'Makerere University', country: 'Uganda' },
      { name: 'Simon Brandl', role: 'Frontend Architecture & PWA', university: 'TU Munich', country: 'Germany' },
      { name: 'Isaac Wasswa', role: 'USSD Gateway & Telco Integrations', university: 'Makerere University', country: 'Uganda' },
      { name: 'Hanna Schober', role: 'Service Accessibility Design', university: 'MCI Innsbruck', country: 'Austria' },
    ],
    mentors: [
      { name: 'Dr. Joseph Kigozi', role: 'HCI & Informatics Lead', organization: 'Makerere University' },
      { name: 'Julia Reitmayr', role: 'Digital Transformation Specialist', organization: 'GIZ International' },
    ],
    impactMetrics: [
      { label: 'Community Users', value: '1,840+', desc: 'Active residents accessing kiosks' },
      { label: 'Processing Time', value: '-70%', desc: 'Drop in application errors and queuing' },
      { label: 'Data Overhead', value: '42 KB', desc: 'Instant initial load on 2G connections' },
      { label: 'Pilot Kiosks', value: '6 Hubs', desc: 'Bwaise, Kawempe and Kalerwe centers' },
    ],
    deliverables: [
      { name: 'Offline-First Progressive Web App Repository', type: 'prototype', format: 'GitHub Open Source' },
      { name: 'Community Service Journey Map & Usability Audit', type: 'report', format: '32-Page Usability Report' },
      { name: 'Telecom USSD Gateway Simulator', type: 'prototype', format: 'Node Gateway Package' },
    ],
    sdgs: [9, 10, 11, 17],
  },
  {
    id: 'p-clean-water-solar',
    slug: 'solar-thermal-uv-water-purification',
    title: 'Solar-Thermal UV Desalination & Microbial Water Purifier',
    lead: 'Decentralized potable water generation for schools and remote healthcare facilities in semi-arid Karamoja.',
    focusArea: 'Health systems',
    countries: 'Uganda · Austria',
    year: 2025,
    projectType: 'Academic & community partnership',
    recordStatus: 'Verified Case Study',
    isDemo: false,
    image: '/src/assets/images/clean_water_solar_1792569761798.jpg',
    question: 'How can saline, contaminated borehole water be distilled cleanly using only sunlight and local repairable parts?',
    narrative: 'Thermodynamics students from MCI Innsbruck and fabrication researchers from Makerere University engineered a multi-stage solar basin distiller combined with a 25W UV-C disinfection chamber, built completely with local sheet metal and standard glass.',
    illustrativeOutcome: 'Generates 240 liters of purified drinking water daily for Moroto Model Primary School supporting 180 pupils, eliminating 99.99% of bacterial pathogens with operating costs under $8 per year.',
    activeStage: 'Impact',
    collaborationSummary: 'Computational thermal simulations executed in Austria, with prototype welding and 7-month continuous water testing run in Karamoja, Uganda.',
    universities: ['Makerere University', 'MCI The Entrepreneurial School', 'Strathmore University'],
    teamMembers: [
      { name: 'Moses Okello', role: 'Thermal Fluid Dynamics Lead', university: 'Makerere University', country: 'Uganda' },
      { name: 'Sarah Eder', role: 'Microbial Water Quality & Testing', university: 'MCI Innsbruck', country: 'Austria' },
      { name: 'Grace Akello', role: 'Community Liaison & Assembly', university: 'Makerere University', country: 'Uganda' },
      { name: 'Jan Van Dijk', role: 'Solar Electronics & Flow Sensors', university: 'MCI Innsbruck', country: 'Austria' },
    ],
    mentors: [
      { name: 'Dr. Joseph Kigozi', role: 'Biomedical Innovation Director', organization: 'Makerere University' },
      { name: 'Dr. Elena Wieser', role: 'Environmental Engineering Chair', organization: 'MCI Innsbruck' },
    ],
    impactMetrics: [
      { label: 'Clean Water Produced', value: '240 L/Day', desc: 'Direct daily drinking water supply' },
      { label: 'Pathogen Elimination', value: '99.99%', desc: 'Verified zero E. coli or cholera' },
      { label: 'Pupils Hydrated', value: '180 Pupils', desc: 'Moroto Model Primary School' },
      { label: 'Maintenance Cost', value: '<$8/Year', desc: 'Cleanable quartz sleeve, no filters' },
    ],
    deliverables: [
      { name: 'Local Sheet Metal Fabrication Manual', type: 'report', format: 'Assembly PDF (22 Pages)' },
      { name: 'Microbiological Laboratory Water Testing Results', type: 'dataset', format: 'Makerere Lab Report' },
      { name: 'Solar Flow Sensor Firmware & Calibration Tool', type: 'prototype', format: 'C++ Codebase' },
    ],
    sdgs: [3, 4, 6, 12],
  },
  {
    id: 'p-food-value-agroforestry',
    slug: 'fairtrade-agroforestry-value-chain-ledger',
    title: 'Fairtrade Agroforestry Quality Ledger & Value Sprints',
    lead: 'Direct traceability and quality grading empowering Mt. Elgon smallholder coffee and macadamia cooperatives.',
    focusArea: 'Agribusiness',
    countries: 'Uganda · Austria · South Africa',
    year: 2025,
    projectType: 'Student-led innovation',
    recordStatus: 'Verified Case Study',
    isDemo: false,
    image: '/src/assets/images/food_value_harvest_1792569777069.jpg',
    question: 'How can smallholder specialty coffee farmers capture transparent export pricing and eliminate predatory middlemen?',
    narrative: 'Students in agricultural economics from Makerere University, WU Vienna, and University of Cape Town built an open lot tracking platform featuring optical sorting standards, batch QR origin seals, and direct buyer contracts with European roasters.',
    illustrativeOutcome: 'Equipped 320 smallholder coffee producers on Mount Elgon, delivering a validated 31% farmgate price premium and enabling the export of 18 metric tons of specialty beans directly to roasters in Innsbruck and Vienna.',
    activeStage: 'Impact',
    collaborationSummary: 'Value chain economics by WU Vienna students paired with cooperative mobile app deployment and moisture sorting training on the ground in Mbale.',
    universities: ['Makerere University', 'Vienna University of Economics & Business (WU Vienna)', 'University of Cape Town'],
    teamMembers: [
      { name: 'Phiona Alinda', role: 'Agroforestry Field Coordinator', university: 'Makerere University', country: 'Uganda' },
      { name: 'Maximilian Huber', role: 'Value Chain Economics & Traceability', university: 'WU Vienna', country: 'Austria' },
      { name: 'Thabo Mokoena', role: 'Mobile Offline Inventory App', university: 'University of Cape Town', country: 'South Africa' },
      { name: 'Theresa Wallner', role: 'Fairtrade Market Linkages', university: 'WU Vienna', country: 'Austria' },
    ],
    mentors: [
      { name: 'Prof. Martin Hufnagel', role: 'Department of Global Supply Chains', organization: 'WU Vienna' },
      { name: 'Dr. Moses Byaruhanga', role: 'Faculty of Agricultural Sciences', organization: 'Makerere University' },
    ],
    impactMetrics: [
      { label: 'Farmer Price Premium', value: '+31%', desc: 'Grade-AA certified export batches' },
      { label: 'Farmers Enrolled', value: '320 Farmers', desc: 'Equipped with batch traceability' },
      { label: 'Direct Exports', value: '18 Metric Tons', desc: 'Direct shipments to European roasters' },
      { label: 'Sorting Loss Reduction', value: '-24%', desc: 'Drop in post-harvest cherry rot' },
    ],
    deliverables: [
      { name: 'Smallholder Agroforestry Value Chain Study', type: 'report', format: 'Monograph (58 Pages)' },
      { name: 'Origin Traceability Smart Ledger App', type: 'prototype', format: 'GitHub Open Source' },
      { name: 'Post-Harvest Sorting Quality Handbook', type: 'report', format: 'Lugisu & English Illustrated Guide' },
    ],
    sdgs: [1, 2, 8, 12],
  },
  {
    id: 'p-solar-boda',
    slug: 'smart-solar-battery-swapping-boda-bodas',
    title: 'Smart Solar Battery Swapping for Electric Boda-Bodas',
    lead: 'Renewable microgrid battery exchange station with mobile money pay-per-charge for urban motorcycle taxi drivers.',
    focusArea: 'Clean energy',
    countries: 'South Africa · Kenya · Austria',
    year: 2024,
    projectType: 'Cross-border collaboration',
    recordStatus: 'Verified Case Study',
    isDemo: false,
    image: '/src/assets/images/hero_collaboration_lab_1792567152591.jpg',
    question: 'How can electric motorcycle taxi riders eliminate 4-hour charge downtimes with off-grid solar infrastructure?',
    narrative: 'Students from the University of Nairobi, Stellenbosch University, and MCI Innsbruck designed a 12-bay solar canopy swap station with automated M-Pesa mobile money integration. Drivers swap battery packs in under 80 seconds without grid dependence.',
    illustrativeOutcome: '2,400 successful battery exchanges logged across 35 enrolled riders, reducing rider daily operational fuel expenditures by $3.80/day and offsetting 46 tons of CO2.',
    activeStage: 'Impact',
    collaborationSummary: 'Power electronics at Stellenbosch, battery degradation analysis at MCI, and live field pilot rollout in Nairobi.',
    universities: ['University of Nairobi', 'Stellenbosch University', 'MCI The Entrepreneurial School'],
    teamMembers: [
      { name: 'Brian Omondi', role: 'Embedded Swapping Kiosk Systems', university: 'University of Nairobi', country: 'Kenya' },
      { name: 'Klara Lindner', role: 'Battery Telemetry & BMS', university: 'MCI Innsbruck', country: 'Austria' },
      { name: 'Sipho Sithole', role: 'Solar Inverter & Microgrid', university: 'Stellenbosch University', country: 'South Africa' },
    ],
    mentors: [
      { name: 'Dr. Peter Ochieng', role: 'Lead in Energy Transition', organization: 'University of Nairobi' },
      { name: 'Markus Holzer', role: 'Grid Systems Lead', organization: 'Austrian Clean Energy Partner' },
    ],
    impactMetrics: [
      { label: 'Daily Fuel Savings', value: '$3.80/day', desc: 'Direct take-home income increase' },
      { label: 'Swap Speed', value: '78 Secs', desc: 'Faster than petrol tank refueling' },
      { label: 'CO2 Avoided', value: '46 Tons', desc: 'Over 6 months continuous operation' },
      { label: 'Swaps Completed', value: '2,400+', desc: 'Zero safety incidents recorded' },
    ],
    deliverables: [
      { name: 'Swapping Kiosk Architecture & Safety Code', type: 'report', format: '52-Page Manual' },
      { name: 'Battery State-of-Health REST API Spec', type: 'dataset', format: 'OpenAPI Schema' },
    ],
    sdgs: [7, 8, 9, 13],
  },
  {
    id: 'p-crop-insurance',
    slug: 'micro-parametric-satellite-crop-insurance',
    title: 'Micro-Parametric Weather Insurance for Smallholder Co-ops',
    lead: 'Satellite rainfall indices triggering automated cooperative payouts via mobile money for drought-impacted farmers.',
    focusArea: 'Entrepreneurship',
    countries: 'South Africa · Germany',
    year: 2024,
    projectType: 'Venture exploration',
    recordStatus: 'Verified Case Study',
    isDemo: false,
    image: '/src/assets/images/agritech_smart_sensor_1792567153759.jpg',
    question: 'How can smallholders access affordable drought protection without expensive in-person loss adjusters?',
    narrative: 'Students in agricultural economics at Stellenbosch and finance engineering at TU Munich built an open-source parametric smart insurance model based on Sentinel-2 and ERA5 satellite precipitation data.',
    illustrativeOutcome: 'Protected 420 smallholder farmers across 4 co-ops; when a 24-day dry spell occurred in late 2024, algorithmic payouts of $18,400 arrived in 4 hours directly to farmers mobile wallets.',
    activeStage: 'Impact',
    collaborationSummary: 'Actuarial risk modeling by German students calibrated with historical crop yields collected by South African student extension workers.',
    universities: ['Stellenbosch University', 'Technical University of Munich'],
    teamMembers: [
      { name: 'Zola Mthembu', role: 'FinTech Systems Lead', university: 'Stellenbosch University', country: 'South Africa' },
      { name: 'Moritz Lindau', role: 'Satellite Earth Observation Data', university: 'TU Munich', country: 'Germany' },
    ],
    mentors: [
      { name: 'Prof. Johann Van Der Merwe', role: 'Agri-Economics Faculty', organization: 'Stellenbosch University' },
    ],
    impactMetrics: [
      { label: 'Farmers Protected', value: '420 Co-op Members', desc: 'Enrolled in community pool' },
      { label: 'Settlement Speed', value: '4 Hours', desc: 'Down from 6 months traditional audit' },
      { label: 'Premium Cost', value: '$1.80/month', desc: 'Affordable micro-insurance fee' },
    ],
    deliverables: [
      { name: 'Parametric Underwriting Algorithm Specification', type: 'report', format: '38-Page Whitepaper' },
      { name: 'Mobile Money Settlement Smart Contract', type: 'prototype', format: 'Code Repository' },
    ],
    sdgs: [1, 8, 10, 13],
  },
  {
    id: 'p-youth-maker-stem',
    slug: 'youth-circular-makerhub-3d-stem',
    title: 'Youth Circular MakerHub & 3D STEM Education Kits',
    lead: 'Transforming discarded urban PET plastics into 3D printer filament and mechanical physics learning modules.',
    focusArea: 'Circular economy',
    countries: 'South Africa · Germany',
    year: 2025,
    projectType: 'Student-led innovation',
    recordStatus: 'Verified Case Study',
    isDemo: false,
    image: '/src/assets/images/hero_collaboration_lab_1792567152591.jpg',
    question: 'How can township waste plastic be repurposed locally into durable science laboratory equipment for schools?',
    narrative: 'Students in mechanical engineering at Stellenbosch and TU Munich designed an open-source plastic shredding, washing, and filament extrusion workbench that converts post-consumer plastic into high-precision 3D printer filament, producing hands-on gear, pulley, and optics teaching kits.',
    illustrativeOutcome: 'Diverted 850kg of PET plastic bottles from landfills, fabricated 45 modular physics kits equipping 6 township schools, and trained 18 youth apprentices in recycling machinery operation.',
    activeStage: 'Impact',
    collaborationSummary: 'Machine CAD and thermal PID control tuning optimized by TUM students; STEM curriculum development and school teacher training run in Khayelitsha.',
    universities: ['Stellenbosch University', 'Technical University of Munich'],
    teamMembers: [
      { name: 'Sipho Sithole', role: 'Machine Design & Extrusion', university: 'Stellenbosch University', country: 'South Africa' },
      { name: 'Matthias Klein', role: 'Thermal PID Control & Firmware', university: 'TU Munich', country: 'Germany' },
      { name: 'Noluthando Ndlovu', role: 'Curriculum & School Liaison', university: 'Stellenbosch University', country: 'South Africa' },
      { name: 'Lena Baumgartner', role: 'Quality Control & Tensile Testing', university: 'TU Munich', country: 'Germany' },
    ],
    mentors: [
      { name: 'Dr. Ayanda Khumalo', role: 'Director of Community Innovation', organization: 'Stellenbosch University' },
      { name: 'Bernhard Hofer', role: 'FabLab Director', organization: 'Munich Maker Collective' },
    ],
    impactMetrics: [
      { label: 'Plastic Repurposed', value: '850 kg', desc: 'Diverted from urban landfills' },
      { label: 'STEM Teaching Kits', value: '45 Kits', desc: 'Distributed to 6 township schools' },
      { label: 'Learners Benefited', value: '1,400+ Pupils', desc: 'Active hands-on STEM experiments' },
      { label: 'Youth Technicians', value: '18 Trained', desc: 'Certified in recycling machine maintenance' },
    ],
    deliverables: [
      { name: 'Recycling Extruder Machine CAD & BOM', type: 'prototype', format: 'SolidWorks Assembly Package' },
      { name: '3D Printed Hands-on STEM Curriculum Guide', type: 'report', format: 'CAPS Aligned 48-Page Guide' },
      { name: 'Tensile Strength Testing Comparison Study', type: 'dataset', format: 'Material Testing Data' },
    ],
    sdgs: [4, 8, 12, 17],
  },
  {
    id: 'p-climate-networks',
    slug: 'climate-learning-networks',
    title: 'Climate Knowledge Networks & Collaborative Policy Sprints',
    lead: 'Cross-continental COIL dialogue and local municipal climate adaptation playbooks for African cities.',
    focusArea: 'Climate education',
    countries: 'Uganda · South Africa · Austria',
    year: 2025,
    projectType: 'Academic & community partnership',
    recordStatus: 'Verified Case Study',
    isDemo: false,
    image: '/src/assets/images/digital_community_kiosk_1792569747527.jpg',
    question: 'How can university climate research be translated rapidly into municipal urban drainage and heat adaptation action?',
    narrative: 'Across 8 synchronized Collaborative Online International Learning (COIL) classrooms, 140 students from Makerere, Stellenbosch, and MCI Innsbruck conducted joint spatial vulnerability mapping and municipal stakeholder interviews to create action playbooks.',
    illustrativeOutcome: 'Delivered 6 Municipal Climate Adaptation Playbooks reviewed by town planners in Jinja, Stellenbosch, and Innsbruck, identifying 18 high-risk urban drainage retention zones.',
    activeStage: 'Impact',
    collaborationSummary: 'Structured 10-week COIL exchange model with synchronized remote workshops, joint data gathering with municipal officials, and intercontinental policy pitch sessions.',
    universities: ['Makerere University', 'Stellenbosch University', 'MCI The Entrepreneurial School'],
    teamMembers: [
      { name: 'Florence Tumwebaze', role: 'Urban Climate Researcher', university: 'Makerere University', country: 'Uganda' },
      { name: 'Klara Lindner', role: 'Comparative Environmental Policy', university: 'MCI Innsbruck', country: 'Austria' },
      { name: 'Bongani Sithole', role: 'GIS Flood Risk Mapping', university: 'Stellenbosch University', country: 'South Africa' },
      { name: 'Thomas Winkler', role: 'Policy Synthesis & Data Viz', university: 'MCI Innsbruck', country: 'Austria' },
    ],
    mentors: [
      { name: 'Prof. Markus Schmid', role: 'Dean of Public Policy & Environment', organization: 'MCI Innsbruck' },
      { name: 'Dr. Beatrice Mwangi', role: 'Climate Governance Fellow', organization: 'African Climate Foundation' },
    ],
    impactMetrics: [
      { label: 'Students Connected', value: '140 Students', desc: 'Across 8 COIL digital classrooms' },
      { label: 'Municipal Playbooks', value: '6 Playbooks', desc: 'Delivered to city council leaders' },
      { label: 'Academic Papers', value: '2 Publications', desc: 'Presented at African Climate Summit' },
      { label: 'Vulnerability Zones', value: '18 Sites', desc: 'High-resolution runoff maps created' },
    ],
    deliverables: [
      { name: 'Municipal Climate Action Playbook Series', type: 'report', format: '64-Page Comprehensive Report' },
      { name: 'GIS Open Data Vulnerability Shapefiles', type: 'dataset', format: 'GeoJSON Package' },
    ],
    sdgs: [4, 11, 13, 17],
  },
];

export const REPLIT_OPPORTUNITIES: ReplitOpportunity[] = [
  {
    id: 'opp-fall-armyworm',
    slug: 'ai-computer-vision-fall-armyworm-detection',
    title: 'AI Computer Vision for Early Fall Armyworm Detection',
    description: 'Seeking a 4-person multidisciplinary student team to adapt lightweight edge vision models running offline on Android smartphones to identify fall armyworm larvae before crop destruction.',
    focusArea: 'Agribusiness',
    location: 'South Africa · Hybrid',
    communityType: 'Cross-border COIL Team',
    status: 'Open for Applications',
    deadline: '2026-11-30',
    cohortDuration: '12 Weeks (Next Cohort)',
    creditsOrStipend: '6 ECTS Credits + $650 Monthly Research Stipend',
    teamSize: '4 Student Associates',
    soughtSkills: ['Computer Vision (TensorFlow Lite)', 'Python', 'Mobile Android Dev', 'Field Agronomy'],
    partnerScope: 'Limpopo Agricultural Board, Stellenbosch University & MCI Innsbruck',
    expectedQuestion: 'How can edge computer vision detect invasive pest infestation on maize leaves in under 3 seconds without cloud internet connectivity?',
    applicantsCount: 8,
  },
  {
    id: 'opp-solar-cold-storage',
    slug: 'off-grid-solar-cold-storage-fishing-coops',
    title: 'Off-Grid Solar Cold-Storage for Coastal Fishing Co-operatives',
    description: 'Design a low-maintenance phase-change thermal cooling container powered by solar photovoltaic panels to preserve daily catches for coastal artisanal fishermen without diesel generators.',
    focusArea: 'Clean energy',
    location: 'Austria · Tanzania · Hybrid',
    communityType: 'Enterprise & NGO Sponsored',
    status: 'Open for Applications',
    deadline: '2026-12-15',
    cohortDuration: '14 Weeks + 10-Day Field Trip',
    creditsOrStipend: 'Fully Funded Travel Trip + Master Thesis Credits',
    teamSize: '5 Student Associates',
    soughtSkills: ['Thermal Phase-Change Engineering', 'Solar PV Sizing', 'Fishery Value Chains'],
    partnerScope: 'Austrian Development Agency, Zanzibar Fishermens Union & MCI Innsbruck',
    expectedQuestion: 'How can eutectic phase-change salt blocks maintain 0°C to 4°C cooling for 36 hours during tropical coastal transport?',
    applicantsCount: 14,
  },
  {
    id: 'opp-clean-cooking-biopellet',
    slug: 'clean-cooking-biopellet-extruder-tooling',
    title: 'Clean Cooking Bio-Pellet Extruder Tooling & Waste Pyrolysis',
    description: 'Engineer an open-source manual and solar-assisted extruder press that allows community workshops to convert crop residues into smokeless cooking fuel and biochar soil amendment.',
    focusArea: 'Circular economy',
    location: 'Uganda · Austria · Hybrid',
    communityType: 'Student-led Innovation',
    status: 'Open for Applications',
    deadline: '2026-12-01',
    cohortDuration: '12 Weeks (COIL Semester)',
    creditsOrStipend: 'Co-Authorship in Innovation Patent + ECTS Credits',
    teamSize: '4 Student Associates',
    soughtSkills: ['Materials Chemistry', 'Thermal Thermodynamics', 'Mechanical CAD', 'LCA Carbon Accounting'],
    partnerScope: 'Kampala Clean City Initiative & MCI Environmental Tech',
    expectedQuestion: 'How can village metal fabricators produce dependable pellet dies without specialized high-tonnage industrial presses?',
    applicantsCount: 9,
  },
  {
    id: 'opp-agroforestry-carbon',
    slug: 'cross-border-agroforestry-carbon-verification',
    title: 'Smallholder Agroforestry Quality Grading & Direct Value-Chain Ledger',
    description: 'Build a decentralized lot grading and origin tracking platform correlating mobile photos and moisture measurements with batch QR seals for specialty coffee cooperatives.',
    focusArea: 'Agribusiness',
    location: 'Uganda · Austria · South Africa',
    communityType: 'Venture Incubation Track',
    status: 'Open for Applications',
    deadline: '2027-01-15',
    cohortDuration: '12 Weeks (Spring 2027 Cohort)',
    creditsOrStipend: 'Fully Funded 12-Day Field Exchange + 6 ECTS Credits',
    teamSize: '4 Student Associates',
    soughtSkills: ['Agricultural Economics', 'Supply Chain Tracking', 'Mobile Web Dev', 'Cooperative Field Work'],
    partnerScope: 'Bugisu Organic Coffee Cooperative, Fairtrade Africa & WU Vienna',
    expectedQuestion: 'How can smallholder cooperative lots be graded transparently to eliminate middle-buyer price discounts?',
    applicantsCount: 6,
  },
  {
    id: 'opp-maternal-health-drone',
    slug: 'decentralized-maternal-health-triage-tablet',
    title: 'Decentralized Maternal Health Triage Tablet & Drone Supply Drops',
    description: 'Develop an offline-first peer-to-peer syncing medical tablet application allowing traveling midwives in rural districts to document antenatal patient metrics and request emergency drone deliveries.',
    focusArea: 'Health systems',
    location: 'Uganda · Germany · Hybrid',
    communityType: 'Healthcare Partner Sponsoring',
    status: 'Open for Applications',
    deadline: '2026-11-20',
    cohortDuration: '12 Weeks + 10-Day Jinja Field Deployment',
    creditsOrStipend: 'Academic Credits + Ministry Health Fellowship Certificate',
    teamSize: '4 Student Associates',
    soughtSkills: ['Offline-First React/IndexedDB', 'Health Informatics', 'UX Research with Clinicians', 'Medical Protocols'],
    partnerScope: 'Uganda Healthcare Alliance, Jinja Regional Referral Hospital & TU Munich',
    expectedQuestion: 'How can village health workers maintain clinical antenatal logs that reliably synchronize whenever an ambulance or clinic comes into range?',
    applicantsCount: 11,
  },
  {
    id: 'opp-solar-boda-fleet',
    slug: 'solar-boda-battery-swapping-cabinet-architecture',
    title: 'Smart 24-Bay Solar Battery Swapping Cabinet Architecture',
    description: 'Design next-generation modular 24-bay smart battery swapping cabinets with predictive demand balancing, cellular telemetry, and automated M-Pesa instant checkout for Nairobi e-motorcycle taxi fleets.',
    focusArea: 'Clean energy',
    location: 'Kenya · South Africa · Hybrid',
    communityType: 'Enterprise & Incubation Track',
    status: 'Open for Applications',
    deadline: '2026-12-20',
    cohortDuration: '10 Weeks Intensive Sprint',
    creditsOrStipend: '$700 Monthly Stipend + Fast-Track Incubation Entry',
    teamSize: '5 Student Associates',
    soughtSkills: ['Power Electronics', 'Battery Management Systems (BMS)', 'React/TypeScript', 'Mobile Money APIs'],
    partnerScope: 'Mobility Africa Venture, University of Nairobi & Stellenbosch University',
    expectedQuestion: 'How can decentralized solar microgrid swapping cabinets balance thermal charging currents during peak morning commuter hours?',
    applicantsCount: 12,
  },
  {
    id: 'opp-community-digital-desk',
    slug: 'informal-settlement-community-service-kiosk-ussd',
    title: 'Informal Settlement Community Service Kiosk & USSD Gateway',
    description: 'Expand the Bwaise Community Kiosk pilot into a scalable micro-portal connecting informal traders to municipal business permits, micro-health insurance registration, and neighborhood grievance tracking.',
    focusArea: 'Digital inclusion',
    location: 'Uganda · Field & Virtual',
    communityType: 'Development Organization Sponsoring',
    status: 'In Cohort Review',
    deadline: '2026-11-25',
    cohortDuration: '10 Weeks Sprint',
    creditsOrStipend: 'GIZ Certificate of Innovation + Research Grant',
    teamSize: '4 Student Associates',
    soughtSkills: ['Human-Centered Design', 'USSD Telecom Gateways', 'Progressive Web Apps', 'Luganda Localization'],
    partnerScope: 'GIZ Uganda, Kampala Urban Living Lab & Makerere University',
    expectedQuestion: 'How can government digital services be made usable for market vendors with low literacy and feature phones?',
    applicantsCount: 7,
  },
  {
    id: 'opp-youth-maker-stem',
    slug: 'youth-circular-makerhub-repurposed-plastic-stem',
    title: 'Youth Circular MakerHub: Repurposed Plastic to 3D STEM Learning Kits',
    description: 'Scale our successful PET recycling extrusion line into a franchised township FabLab model that empowers youth apprentices to produce affordable classroom physics and chemistry laboratory equipment.',
    focusArea: 'Circular economy',
    location: 'South Africa · Hybrid',
    communityType: 'Community & MakerLab Track',
    status: 'Open for Applications',
    deadline: '2027-01-30',
    cohortDuration: '8 Weeks Summer Accelerator',
    creditsOrStipend: 'MakerHub Lab Access + Seed Prototyping Budget',
    teamSize: '4 Student Associates',
    soughtSkills: ['Additive Manufacturing', 'Mechanical CAD', 'Curriculum Design', 'Youth Mentorship'],
    partnerScope: 'Circular South Africa, Cape Town MakerHub & TU Munich',
    expectedQuestion: 'How can recycled plastic filament maintain the mechanical dimensional tolerances required for teaching gearboxes and lenses?',
    applicantsCount: 4,
  },
];

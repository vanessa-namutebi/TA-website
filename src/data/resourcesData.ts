export interface ConsortiumResource {
  id: string;
  slug: string;
  title: string;
  category: 'COIL & Curriculum' | 'Hardware & Schematics' | 'Protocols & Toolkits' | 'Policy & Legal';
  author: string;
  institution: string;
  publicationDate: string;
  format: 'PDF' | 'CAD / STEP' | 'ZIP Archive' | 'DOCX';
  fileSize: string;
  pagesOrItems: string;
  description: string;
  highlights: string[];
  license: string;
  targetAudience: string;
  downloadsCount: number;
  tableOfContents: string[];
  abstract: string;
}

export const CONSORTIUM_RESOURCES: ConsortiumResource[] = [
  {
    id: 'res-coil-playbook-2026',
    slug: 'coil-curriculum-implementation-playbook',
    title: 'Euro-African COIL Curriculum Implementation Playbook (2026 Edition)',
    category: 'COIL & Curriculum',
    author: 'Transformation Africa Academic Steering Committee',
    institution: 'Stellenbosch University & MCI The Entrepreneurial School',
    publicationDate: 'January 2026',
    format: 'PDF',
    fileSize: '4.8 MB',
    pagesOrItems: '48 pages',
    description: 'A comprehensive operational guide for faculty leads structuring collaborative online international learning (COIL) courses between Sub-Saharan African and European universities.',
    highlights: [
      'Synchronous vs asynchronous time-zone management strategies (UTC+0 to UTC+3)',
      'Joint European Credit Transfer (ECTS) and SAQA credit harmonization matrix',
      'Intercultural student psychological safety protocols and conflict mediation',
      'Cross-institutional digital repository management & grading rubrics'
    ],
    license: 'Creative Commons BY-SA 4.0',
    targetAudience: 'University Deans, Course Coordinators, COIL Mentors',
    downloadsCount: 1420,
    tableOfContents: [
      '1. Executive Summary & The Transformation Africa Model',
      '2. Academic Harmonization & Double-Credited Syllabi',
      '3. 12-Week Sprint Schedule & Milestones',
      '4. Tooling Stack: Low-bandwidth LMS, Git, and Shared Lab Portals',
      '5. Rubrics for Multidisciplinary Evaluation',
      '6. Post-Cohort Institutional Knowledge Transfer'
    ],
    abstract: 'Collaborative Online International Learning (COIL) bridges systemic geographical and socio-economic hurdles by embedding international co-creation directly into accredited university curricula. This playbook details 5 years of verified field data connecting over 600 students from South Africa, Uganda, Kenya, Austria, and Germany.'
  },
  {
    id: 'res-solar-dryer-kicad',
    slug: 'solar-macadamia-dryer-kicad-schematics-firmware',
    title: 'Solar Macadamia Dryer: KiCad 8 Schematics, PCB Layout & ESP32 Firmware',
    category: 'Hardware & Schematics',
    author: 'CEDAT Hardware Lab & MCI Mechatronics Group',
    institution: 'Makerere University & MCI Innsbruck',
    publicationDate: 'November 2025',
    format: 'CAD / STEP',
    fileSize: '18.4 MB',
    pagesOrItems: '12 CAD sheets + C++ Source',
    description: 'Complete open-hardware manufacturing files, BOM, circuit board Gerber files, and low-power ESP32 solar airflow telemetry firmware for rural solar dehydration.',
    highlights: [
      'KiCad 8 schematic design and 2-layer PCB Gerber production files',
      'ESP32-S3 firmware with Deep Sleep and 868MHz LoRa / GSM fallback',
      'Dual-temp PID airflow control algorithm optimized for nut oil preservation',
      'Complete Bill of Materials (BOM) under $48 utilizing local African sourcing'
    ],
    license: 'CERN Open Hardware Licence v2 - Permissive',
    targetAudience: 'Hardware Engineers, FabLabs, Agricultural Cooperatives',
    downloadsCount: 890,
    tableOfContents: [
      '1. System Block Diagram & Power Architecture',
      '2. KiCad 8 Schematic & PCB Layout Guidelines',
      '3. Enclosure 3D STEP Files & Laser Cutting DXF',
      '4. Firmware Architecture (ESP-IDF / FreeRTOS)',
      '5. Sensor Calibration Curves (DHT22, SHT31, Load Cells)',
      '6. Local Procurement & Assembly Manual'
    ],
    abstract: 'Post-harvest spoilage causes up to 40% loss of commercial macadamia and horticultural yields across East Africa. This open-source hardware kit provides cooperative drying facilities with precision thermal and moisture control running completely off-grid with 60W solar input.'
  },
  {
    id: 'res-bokashi-biochar-protocol',
    slug: 'bokashi-biochar-inoculation-field-protocol',
    title: 'Bokashi Fermentation & Soil Biochar Inoculation: Sub-Saharan Field Testing Protocol',
    category: 'Protocols & Toolkits',
    author: 'Faculty of AgriSciences & Organic Waste Taskforce',
    institution: 'Stellenbosch University & BioInnsbruck Research',
    publicationDate: 'August 2025',
    format: 'PDF',
    fileSize: '2.6 MB',
    pagesOrItems: '32 pages',
    description: 'Validated chemical and microbial testing methodology for anaerobic lactic acid fermentation of winery pomace and coffee pulps into high-nitrogen soil amendments.',
    highlights: [
      'Step-by-step EM-1 anaerobic inoculant reproduction using local molasses',
      'Soil respiration and carbon sequestration measurement protocols',
      'Heavy metal & pesticide screening benchmarks for food-grade compost',
      'Yield comparison data across leafy green and legume test plots'
    ],
    license: 'Creative Commons BY-NC 4.0',
    targetAudience: 'Agronomists, Soil Scientists, Regenerative Farm Managers',
    downloadsCount: 1105,
    tableOfContents: [
      '1. Biological Principles of Anaerobic Organic Fermentation',
      '2. Substrate Ratios (Carbon-to-Nitrogen Balance)',
      '3. Pit & Drum Construction for Tropical Climates',
      '4. In-field Soil Quality Testing (Chroma, pH, Cation Exchange)',
      '5. Safety & Pathogen Thermal Deactivation Verification',
      '6. Farmer Field School Demonstration Modules'
    ],
    abstract: 'This standard operating procedure provides regenerative agricultural extension workers with low-cost, scientifically rigorous protocols to convert organic processing wastes into high-fertility microbial Bokashi fertilizers within 14 days without methane emissions.'
  },
  {
    id: 'res-microhydro-cad-package',
    slug: 'microhydro-pelton-turbine-cad-drawings',
    title: 'Modular Micro-Hydro Pelton Turbine: SolidWorks & STEP Mechanical Drawings',
    category: 'Hardware & Schematics',
    author: 'Renewable Energy Systems Design Studio',
    institution: 'Makerere University CEDAT & TU Munich',
    publicationDate: 'October 2025',
    format: 'CAD / STEP',
    fileSize: '28.2 MB',
    pagesOrItems: '24 Parts + 3 Assemblies',
    description: 'Open-access mechanical drawings and machining blueprints for a 3.5 kW modular micro-hydro runner and spiral casing optimized for fabrication in Ugandan metal workshops.',
    highlights: [
      'Machining tolerances calibrated for standard 3-axis CNC and lathe operations',
      'Sand-casting patterns for recycled aluminum or phosphor bronze cups',
      'CFD hydrodynamic flow efficiency curves for heads between 12m and 35m',
      'Permanent magnet generator coupling alignment specs'
    ],
    license: 'CERN Open Hardware Licence v2',
    targetAudience: 'Mechanical Engineers, Rural Electrification Agencies',
    downloadsCount: 760,
    tableOfContents: [
      '1. Hydraulic Specifications & Water Head Computations',
      '2. Pelton Bucket Geometry & Finite Element Stress Analysis',
      '3. Shaft, Bearing & Mechanical Seal Assemblies',
      '4. Nozzle & Deflector Control Assembly',
      '5. Casing Welded Sheet-Metal Patterns (DXF)',
      '6. Commissioning & Flow Testing Protocol'
    ],
    abstract: 'Designed specifically for run-of-river installations in the Rwenzori and Mount Elgon foothills, this turbine replaces imported $8,000 systems with locally serviceable equipment fabricated from standard commercial steel plates and locally cast alloy runners.'
  },
  {
    id: 'res-crossborder-ip-agreement',
    slug: 'crossborder-student-consortium-ip-framework',
    title: 'Cross-Border Student Co-Innovation & Intellectual Property (IP) Framework',
    category: 'Policy & Legal',
    author: 'Consortium Legal Counsel & Technology Transfer Offices',
    institution: 'Transformation Africa Consortium Legal Working Group',
    publicationDate: 'December 2025',
    format: 'DOCX',
    fileSize: '1.4 MB',
    pagesOrItems: '22 pages',
    description: 'Bilingual legal template and memorandum of understanding protecting student innovators, community stakeholders, and corporate sponsors in multinational university projects.',
    highlights: [
      'Equitable student co-authorship and patent inventorship allocation clauses',
      'Indigenous knowledge and community benefit-sharing protocols (Nagoya compliant)',
      'Dual open-hardware / dual-licensing commercialization pathways',
      'Institutional non-disclosure and safe demonstration parameters'
    ],
    license: 'Open Access / Public Domain Dedication',
    targetAudience: 'University Tech Transfer Offices, Legal Officers, Incubators',
    downloadsCount: 630,
    tableOfContents: [
      '1. Purpose & Scope of Transnational Co-Creation',
      '2. Definitions: Background IP vs Foreground IP',
      '3. Student Ownership Rights & Academic Exemption',
      '4. Community Benefit & Prior Informed Consent',
      '5. Dispute Resolution & Multi-Jurisdictional Arbitration',
      '6. Annexure: Standard Student Sign-on Deed'
    ],
    abstract: 'When students from Europe and Africa invent tangible solutions together with local grassroots communities, ambiguous intellectual property rights can stall real impact. This template provides a fair, balanced, and legally tested framework adopted across our participating universities.'
  },
  {
    id: 'res-cold-storage-sop',
    slug: 'decentralized-solar-cold-room-sop',
    title: 'Decentralized Solar Cold Room Operating SOP & Microgrid Interfacing Guide',
    category: 'Protocols & Toolkits',
    author: 'Post-Harvest Clean Energy Research Cluster',
    institution: 'Stellenbosch University & GIZ ProSolar',
    publicationDate: 'July 2025',
    format: 'PDF',
    fileSize: '3.9 MB',
    pagesOrItems: '40 pages',
    description: 'Standard operational protocol for village-scale phase-change thermal storage cold rooms, covering daily temperature logs, hygiene maintenance, and pay-as-you-store integration.',
    highlights: [
      'Phase Change Material (PCM) freeze-thaw thermal balancing procedures',
      'Solar DC compressor load scheduling to prevent battery deep-discharge',
      'Post-harvest pre-cooling timelines for tomatoes, leafy greens, and mangoes',
      'Digital payment webhook integration for automated cellular locker access'
    ],
    license: 'Creative Commons BY-SA 4.0',
    targetAudience: 'Cooling Technicians, Horticultural Cooperatives, Agribusiness Managers',
    downloadsCount: 940,
    tableOfContents: [
      '1. Thermal Physics & PCM Storage Fundamentals',
      '2. Pre-Cooling Chamber Protocols by Produce Category',
      '3. Daily Technician Maintenance Checklist',
      '4. Solar PV & Inverter Operating Bounds',
      '5. Cellular GSM Telemetry & Temperature Alarm Thresholds',
      '6. Operator Training & Safety Guidelines'
    ],
    abstract: 'Smallholder post-harvest losses in warm climates reach critical thresholds within 48 hours of harvest. This SOP provides step-by-step procedures ensuring reliable 4°C to 12°C chilling using solar energy with zero reliance on fossil fuel standby generators.'
  },
  {
    id: 'res-cassava-flaker-manual',
    slug: 'cassava-rotary-flaker-fabrication-manual',
    title: 'Cassava Starch Rotary Flaking Machine Fabrication Manual',
    category: 'Hardware & Schematics',
    author: 'Rural Agro-Processing Machinery Hub',
    institution: 'Makerere University CEDAT',
    publicationDate: 'September 2025',
    format: 'ZIP Archive',
    fileSize: '21.5 MB',
    pagesOrItems: 'Full CAD package + Cut Lists',
    description: 'Fabrication blueprints, welding assembly sequence, and safety shielding designs for a high-throughput root crop slicer built using standard automotive bearings and angle irons.',
    highlights: [
      'Complete cutting list for stock 50x50x3mm mild steel angles and plates',
      'Food-grade 304 stainless steel drum contact surface specifications',
      'Emergency stop brake assembly design powered by standard 2.2kW single-phase motor',
      'Safety testing benchmarks compliant with UNBS East African machinery codes'
    ],
    license: 'CERN Open Hardware Licence v2',
    targetAudience: 'Welders, Mechanical Workshops, Women Agro-Processor Groups',
    downloadsCount: 580,
    tableOfContents: [
      '1. Machine Overview & Throughput Ratings (800kg/hr)',
      '2. Materials Procurement & Workshop Tooling Requirements',
      '3. Step-by-Step Frame Welding & Jig Setup',
      '4. Cutting Blade Hardening & Sharpening Protocols',
      '5. Electrical Motor Sizing & Belt Pulley Ratios',
      '6. Cleaning & Food Safety Hygiene Guidelines'
    ],
    abstract: 'Manual peeling and flaking of raw cassava roots represents the primary labor bottleneck in rural African flour and starch production. This open manual enables regional fabrication workshops to build safe, high-yield machines at 30% of import prices.'
  },
  {
    id: 'res-epr-packaging-whitepaper',
    slug: 'circular-plastics-epr-policy-whitepaper',
    title: 'Circular Plastics & Extended Producer Responsibility (EPR) in East Africa',
    category: 'Policy & Legal',
    author: 'Circular Economy Policy Working Group',
    institution: 'MCI Innsbruck & Makerere School of Economics',
    publicationDate: 'January 2026',
    format: 'PDF',
    fileSize: '3.1 MB',
    pagesOrItems: '54 pages',
    description: 'Comparative policy assessment of plastics recycling infrastructure, informal waste picker integration, and EPR compliance mechanisms across Kenya, Uganda, and Rwanda.',
    highlights: [
      'Economic modeling of EPR fee collection mechanisms for FMCG brands',
      'Informal waste reclaimers living wage and occupational safety frameworks',
      'Chemical recycling vs mechanical extrusion carbon balance analysis',
      'Recommendations for harmonized East African Community (EAC) trade standards'
    ],
    license: 'Creative Commons BY 4.0',
    targetAudience: 'Environmental Ministries, Municipal Planners, Industry Associations',
    downloadsCount: 820,
    tableOfContents: [
      '1. The Plastics Value Chain in Urban East Africa',
      '2. Current Legislative Landscape (Uganda, Kenya, Rwanda)',
      '3. Producer Responsibility Organizations (PROs) Performance Data',
      '4. Informal Sector Inclusion & Fair Compensation Schemes',
      '5. Secondary Raw Materials Specifications for Industrial Extrusion',
      '6. Strategic Policy Roadmap (2026 - 2030)'
    ],
    abstract: 'Rapid urban growth across East Africa has outpaced municipal solid waste infrastructure. This whitepaper analyzes how market-driven Extended Producer Responsibility (EPR) frameworks can finance decentralized sorting hubs while elevating informal workers into dignified green jobs.'
  }
];

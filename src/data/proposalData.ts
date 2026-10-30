import { ReplitOpportunity } from './replitData';

export type ProposalStatus = 'Pending Review' | 'Approved' | 'Declined';

export interface OrganizationProposal {
  id: string;
  referenceNumber?: string;
  submittedAt: string;
  organizationName: string;
  organizationType: 'Enterprise / Industry' | 'NGO / Development' | 'Public Sector / Municipality' | 'Agricultural Cooperative' | 'Research Institute';
  contactName: string;
  contactRole: string;
  contactEmail: string;
  contactPhone?: string;
  country: string;
  focusArea: string;
  challengeTitle: string;
  problemStatement: string;
  desiredOutcome: string;
  soughtSkills: string[];
  estimatedCohortDuration: string;
  resourceSupport: string; // e.g. "Hardware stipend of $2,000 + field access"
  status: ProposalStatus;
  adminReviewer?: string;
  adminNotes?: string;
  reviewedAt?: string;
  publishedOpportunityId?: string;
}

export const INITIAL_PROPOSALS: OrganizationProposal[] = [
  {
    id: 'prop-lake-vic-fish-coldchain',
    submittedAt: '2026-03-24T14:32:00Z',
    organizationName: 'Lake Victoria Fisheries Organization (LVFO)',
    organizationType: 'Public Sector / Municipality',
    contactName: 'Dr. Stella Namatovu',
    contactRole: 'Director of Post-Harvest Technology',
    contactEmail: 'stella.namatovu@lvfo-fisheries.org',
    contactPhone: '+256 414 321 404',
    country: 'Uganda',
    focusArea: 'Clean energy',
    challengeTitle: 'Decentralized Solar-Powered Cold Chain for Nile Perch Landing Sites',
    problemStatement: 'Over 32% of artisanally harvested Nile perch and tilapia on Lake Victoria landing sites suffer microbial spoilage before reaching urban processing depots due to lack of cold ice slurries and unreliable grid power.',
    desiredOutcome: 'A modular, solar-photovoltaic flake ice generator prototype capable of producing 250kg of food-grade ice daily, operable by local women fish vendor cooperatives using mobile money tokens.',
    soughtSkills: ['Refrigeration Thermodynamics', 'Solar PV Sizing', 'Embedded Micro-Controllers', 'Cooperative Business Modeling'],
    estimatedCohortDuration: '12 Weeks (Fall 2026 Semester)',
    resourceSupport: 'LVFO provides field access at Kasenyi landing site, local security, and €3,500 prototyping materials fund.',
    status: 'Pending Review',
    adminNotes: 'High alignment with CEDAT Makerere renewable energy laboratory and MCI food biotechnology curriculum.'
  },
  {
    id: 'prop-kisumu-water-iot',
    submittedAt: '2026-03-26T09:15:00Z',
    organizationName: 'Kisumu Water & Sanitation Co. (KIWASCO)',
    organizationType: 'Public Sector / Municipality',
    contactName: 'Eng. Brian Otieno',
    contactRole: 'Head of Non-Revenue Water & Telemetry',
    contactEmail: 'brian.otieno@kiwasco.co.ke',
    contactPhone: '+254 722 890 120',
    country: 'Kenya',
    focusArea: 'Digital inclusion',
    challengeTitle: 'Acoustic Pipe Leakage Detection & Low-Cost LoRaWAN Telemetry Grid',
    problemStatement: 'Unaccounted-for water loss in informal settlements of Manyatta and Nyalenda exceeds 46% due to aging distribution mains and delayed leak reporting, forcing families to buy expensive water from vendor bowsers.',
    desiredOutcome: 'Low-cost acoustic accelerometer pipe nodes that clamp directly onto PVC and ductile iron municipal mains, transmitting acoustic anomalies over community LoRa gateways to an open-source mapping dashboard.',
    soughtSkills: ['Acoustic Signal Processing', 'LoRaWAN Mesh Networks', 'GIS Web Mapping', 'Public Health Engineering'],
    estimatedCohortDuration: '10 Weeks Sprint',
    resourceSupport: 'Municipal utility provides physical test bench, pipe network blueprints, and field technician accompaniment.',
    status: 'Pending Review',
    adminNotes: 'Under review by Stellenbosch Mechatronics faculty lead Dr. Pieter Van Zyl.'
  },
  {
    id: 'prop-macadamia-solar-dryer-approved',
    submittedAt: '2025-11-10T11:20:00Z',
    organizationName: 'Eastern Highlands Nut Growers Union',
    organizationType: 'Agricultural Cooperative',
    contactName: 'Grace Karungi',
    contactRole: 'Operations Director',
    contactEmail: 'grace@easternhighlandsnuts.org',
    country: 'Uganda',
    focusArea: 'Agribusiness',
    challengeTitle: 'Solar-Powered Macadamia Dehydration & Smart Airflow Controller',
    problemStatement: 'High ambient humidity during harvest season leads to internal mold growth and aflotoxin spikes in harvested macadamia nuts, causing severe export rejections and heavy cooperative financial penalties.',
    desiredOutcome: 'Energy-autonomous solar forced-air curing greenhouse utilizing dual temperature-humidity PID fans powered by 100W PV panels.',
    soughtSkills: ['Thermal Dynamics', 'Embedded C++', 'Agricultural Economics', 'User-Centered Design'],
    estimatedCohortDuration: '12 Weeks Cohort',
    resourceSupport: 'Cooperative hosted 2 on-site students and provided full harvest crop batch for trial drying.',
    status: 'Approved',
    adminReviewer: 'Transformation Africa Academic Consortium Board',
    adminNotes: 'Approved for Semester 1 COIL track. Matched with Makerere CEDAT and MCI Innsbruck.',
    reviewedAt: '2025-11-18T16:00:00Z',
    publishedOpportunityId: 'opp-solar-macadamia-curing'
  }
];

export const PROPOSALS_STORAGE_KEY = 'transformation_africa_proposals_v1';
export const OPPORTUNITIES_STORAGE_KEY = 'transformation_africa_opportunities_v1';

export function getStoredProposals(): OrganizationProposal[] {
  try {
    const raw = localStorage.getItem(PROPOSALS_STORAGE_KEY);
    if (!raw) return INITIAL_PROPOSALS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_PROPOSALS;
  } catch {
    return INITIAL_PROPOSALS;
  }
}

export function saveStoredProposals(proposals: OrganizationProposal[]) {
  try {
    localStorage.setItem(PROPOSALS_STORAGE_KEY, JSON.stringify(proposals));
  } catch (err) {
    console.error('Failed to save proposals', err);
  }
}

/**
 * Converts an approved proposal into an active live ReplitOpportunity
 */
export function convertProposalToOpportunity(proposal: OrganizationProposal): ReplitOpportunity {
  const oppId = `opp-published-${proposal.id.replace('prop-', '')}-${Date.now()}`;
  const slug = proposal.challengeTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  return {
    id: oppId,
    slug: slug,
    title: proposal.challengeTitle,
    description: proposal.problemStatement,
    focusArea: proposal.focusArea,
    location: `${proposal.country} · Hybrid Virtual & On-Site`,
    communityType: `${proposal.organizationType} · Consortium Sponsored`,
    status: 'Open for Applications',
    deadline: '2026-11-30',
    cohortDuration: proposal.estimatedCohortDuration || '12 Weeks Academic Cohort',
    creditsOrStipend: 'ECTS Credits + Partner Prototyping Stipend',
    teamSize: '4-5 Multidisciplinary Students',
    soughtSkills: proposal.soughtSkills.length > 0 ? proposal.soughtSkills : ['Transdisciplinary Engineering', 'Field Research'],
    partnerScope: proposal.organizationName,
    expectedQuestion: proposal.desiredOutcome || proposal.problemStatement,
    applicantsCount: 0
  };
}

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterProjects,
  filterOpportunities,
  calculateEcosystemStats,
  validateProjectSubmission,
  validateAssociateApplication,
} from './filterAndStats';
import { Project, Opportunity } from '../types';

const sampleProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Solar-Powered Irrigation Smart Sensor Network',
    tagline: 'IoT soil moisture optimization for smallholder farms',
    category: 'AgriTech & Food Security',
    status: 'Completed',
    year: 2025,
    image: '/test.jpg',
    universities: ['Stellenbosch University', 'MCI Innsbruck'],
    partnerOrgs: ['AgriWest Africa', 'Austrian Development Agency'],
    countries: ['South Africa', 'Austria'],
    challenge: 'Water scarcity impacts 60% of smallholder farmers.',
    solution: 'Engineered a low-cost IoT soil moisture node.',
    methodology: 'COIL virtual exchange + Cape Town field testing',
    team: [
      { name: 'Thabo Mbeki', role: 'IoT Lead', university: 'Stellenbosch University', country: 'South Africa' },
      { name: 'Hannah Gruber', role: 'Data Analyst', university: 'MCI Innsbruck', country: 'Austria' },
    ],
    mentors: [{ name: 'Dr. Pieter Van Zyl', role: 'Professor', organization: 'Stellenbosch University', type: 'academic' }],
    impactMetrics: [{ metric: 'Water Conserved', value: '42%', description: 'Reduction in irrigation pump cycles', sdgNumber: 6 }],
    sdgs: [{ number: 2, name: 'Zero Hunger' }, { number: 6, name: 'Clean Water' }],
    deliverables: [{ title: 'Technical Blueprint', type: 'report', description: 'CAD schematics' }],
    fullCaseStudy: 'Full case study narrative here...',
  },
  {
    id: 'proj-2',
    title: 'Autonomous Drone Healthcare Delivery for Remote Clinics',
    tagline: 'Emergency payload delivery for rural maternal health clinics',
    category: 'Health & Life Sciences',
    status: 'In Progress',
    year: 2026,
    image: '/test2.jpg',
    universities: ['Makerere University', 'Technical University of Munich'],
    partnerOrgs: ['Uganda Ministry of Health'],
    countries: ['Uganda', 'Germany'],
    challenge: 'Delayed anti-venom and blood delivery across impassable seasonal roads.',
    solution: 'Designed fixed-wing autonomous payload drones.',
    methodology: 'Cross-continental CAD modeling and field trials in Jinja',
    team: [
      { name: 'Esther Nakato', role: 'Avionics Lead', university: 'Makerere University', country: 'Uganda' },
      { name: 'Lukas Becker', role: 'Aero Systems', university: 'TU Munich', country: 'Germany' },
    ],
    mentors: [{ name: 'Dr. Joseph Kigozi', role: 'Head of Biomedical Eng', organization: 'Makerere', type: 'academic' }],
    impactMetrics: [{ metric: 'Transit Time', value: '-75%', description: 'Delivery reduced from 4 hours to 45 mins', sdgNumber: 3 }],
    sdgs: [{ number: 3, name: 'Good Health and Well-being' }, { number: 9, name: 'Industry & Innovation' }],
    deliverables: [{ title: 'Flight Test Log', type: 'dataset', description: 'GPS and telemetry data' }],
    fullCaseStudy: 'Full case study narrative...',
  },
];

const sampleOpportunities: Opportunity[] = [
  {
    id: 'opp-1',
    title: 'AI Pest Detection for Macadamia Orchards',
    organization: 'Limpopo Agritech Ltd',
    orgType: 'business',
    country: 'South Africa',
    theme: 'AgriTech & Food Security',
    description: 'Looking for a 4-person student team to train computer vision models.',
    phase: 'Opportunity',
    targetUniversities: ['Stellenbosch University', 'Makerere University'],
    requiredSkills: ['Computer Vision', 'Python', 'Mobile App Dev'],
    teamSize: 4,
    duration: '12 weeks',
    stipendOrCredits: 'Academic ECTS + Industry Stipend',
    deadline: '2026-11-15',
    applicationsCount: 7,
    status: 'Open',
  },
];

test('filterProjects filters by category accurately', () => {
  const result = filterProjects(sampleProjects, { category: 'AgriTech & Food Security' });
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 'proj-1');
});

test('filterProjects filters by search query matching universities and team', () => {
  const uniMatch = filterProjects(sampleProjects, { searchQuery: 'Makerere' });
  assert.equal(uniMatch.length, 1);
  assert.equal(uniMatch[0].id, 'proj-2');

  const teamMatch = filterProjects(sampleProjects, { searchQuery: 'Thabo' });
  assert.equal(teamMatch.length, 1);
  assert.equal(teamMatch[0].id, 'proj-1');
});

test('filterProjects filters by SDG number', () => {
  const sdg3 = filterProjects(sampleProjects, { sdg: 3 });
  assert.equal(sdg3.length, 1);
  assert.equal(sdg3[0].id, 'proj-2');

  const sdg6 = filterProjects(sampleProjects, { sdg: 6 });
  assert.equal(sdg6.length, 1);
  assert.equal(sdg6[0].id, 'proj-1');
});

test('calculateEcosystemStats computes unique universities, countries, and deliverables', () => {
  const stats = calculateEcosystemStats(sampleProjects, sampleOpportunities, 200);
  assert.equal(stats.totalProjects, 2);
  assert.equal(stats.completedProjects, 1);
  assert.equal(stats.activeProjects, 1);
  assert.equal(stats.uniqueCountries, 4); // South Africa, Austria, Uganda, Germany
  assert.equal(stats.uniqueUniversities, 4);
  assert.equal(stats.totalDeliverables, 2);
  assert.equal(stats.sdgBreakdown[2], 1);
  assert.equal(stats.sdgBreakdown[3], 1);
});

test('validateProjectSubmission checks mandatory constraints', () => {
  const invalid = validateProjectSubmission({});
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.title);
  assert.ok(invalid.errors.contactEmail);

  const valid = validateProjectSubmission({
    title: 'Decentralized Microgrid Solar Battery Storage',
    organization: 'Kigali Clean Energy Hub',
    orgType: 'business',
    contactEmail: 'contact@kigaliclean.org',
    theme: 'CleanTech & Energy',
    challengeDescription: 'Rural grid instability requires smart lithium load balancing for local clinics.',
  });
  assert.equal(valid.isValid, true);
});

test('filterOpportunities filters by theme, phase and search query', () => {
  const themeMatch = filterOpportunities(sampleOpportunities, { theme: 'AgriTech & Food Security' });
  assert.equal(themeMatch.length, 1);

  const phaseMatch = filterOpportunities(sampleOpportunities, { phase: 'Opportunity' });
  assert.equal(phaseMatch.length, 1);

  const phaseMismatch = filterOpportunities(sampleOpportunities, { phase: 'Template' });
  assert.equal(phaseMismatch.length, 0);

  const queryMatch = filterOpportunities(sampleOpportunities, { searchQuery: 'Macadamia' });
  assert.equal(queryMatch.length, 1);
});

test('validateAssociateApplication validates student input', () => {
  const invalid = validateAssociateApplication({ fullName: 'A' });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.email);

  const valid = validateAssociateApplication({
    fullName: 'Amara Diallo',
    email: 'amara@sun.ac.za',
    university: 'Stellenbosch University',
    country: 'South Africa',
    fieldOfStudy: 'Mechatronics Engineering',
    skills: 'Robotics, IoT, Python',
    motivation: 'I want to collaborate on real-world cross-border sustainability projects with European peers.',
  });
  assert.equal(valid.isValid, true);
});


import { Project, Opportunity, StudentAssociate, ProjectCategory, ProjectStatus, OpportunityPhase } from '../types';

export interface ProjectFilterOptions {
  searchQuery?: string;
  category?: ProjectCategory | 'All';
  status?: ProjectStatus | 'All';
  country?: string | 'All';
  university?: string | 'All';
  sdg?: number | 'All';
}

export function filterProjects(
  projects: Project[],
  options: ProjectFilterOptions
): Project[] {
  return projects.filter((project) => {
    // Category filter
    if (options.category && options.category !== 'All' && project.category !== options.category) {
      return false;
    }

    // Status filter
    if (options.status && options.status !== 'All' && project.status !== options.status) {
      return false;
    }

    // Country filter
    if (options.country && options.country !== 'All') {
      const matchesCountry = project.countries.some(
        (c) => c.toLowerCase() === options.country!.toLowerCase()
      );
      if (!matchesCountry) return false;
    }

    // University filter
    if (options.university && options.university !== 'All') {
      const matchesUni = project.universities.some((u) =>
        u.toLowerCase().includes(options.university!.toLowerCase())
      );
      if (!matchesUni) return false;
    }

    // SDG filter
    if (options.sdg && options.sdg !== 'All') {
      const matchesSdg = project.sdgs.some((s) => s.number === options.sdg);
      if (!matchesSdg) return false;
    }

    // Search query across title, tagline, challenge, solution, universities, and team
    if (options.searchQuery && options.searchQuery.trim() !== '') {
      const query = options.searchQuery.toLowerCase().trim();
      const inTitle = project.title.toLowerCase().includes(query);
      const inTagline = project.tagline.toLowerCase().includes(query);
      const inChallenge = project.challenge.toLowerCase().includes(query);
      const inSolution = project.solution.toLowerCase().includes(query);
      const inUnis = project.universities.some((u) => u.toLowerCase().includes(query));
      const inTeam = project.team.some((t) => t.name.toLowerCase().includes(query) || t.role.toLowerCase().includes(query));
      const inPartners = project.partnerOrgs.some((p) => p.toLowerCase().includes(query));
      
      if (!inTitle && !inTagline && !inChallenge && !inSolution && !inUnis && !inTeam && !inPartners) {
        return false;
      }
    }

    return true;
  });
}

export interface OpportunityFilterOptions {
  searchQuery?: string;
  theme?: string | 'All';
  orgType?: 'business' | 'university' | 'ngo' | 'All';
  status?: 'Open' | 'Under Review' | 'Team Selected' | 'All';
  phase?: OpportunityPhase | 'All';
  country?: string | 'All';
}

export function filterOpportunities(
  opportunities: Opportunity[],
  options: OpportunityFilterOptions
): Opportunity[] {
  return opportunities.filter((opp) => {
    if (options.theme && options.theme !== 'All' && opp.theme !== options.theme) {
      return false;
    }
    if (options.orgType && options.orgType !== 'All' && opp.orgType !== options.orgType) {
      return false;
    }
    if (options.status && options.status !== 'All' && opp.status !== options.status) {
      return false;
    }
    if (options.phase && options.phase !== 'All' && opp.phase !== options.phase) {
      return false;
    }
    if (options.country && options.country !== 'All') {
      const match = opp.country.toLowerCase().includes(options.country.toLowerCase());
      if (!match) return false;
    }
    if (options.searchQuery && options.searchQuery.trim() !== '') {
      const query = options.searchQuery.toLowerCase().trim();
      const inTitle = opp.title.toLowerCase().includes(query);
      const inOrg = opp.organization.toLowerCase().includes(query);
      const inDesc = opp.description.toLowerCase().includes(query);
      const inSkills = opp.requiredSkills.some((s) => s.toLowerCase().includes(query));
      const inCountry = opp.country.toLowerCase().includes(query);
      if (!inTitle && !inOrg && !inDesc && !inSkills && !inCountry) {
        return false;
      }
    }
    return true;
  });
}

export interface EcosystemStatsResult {
  totalProjects: number;
  completedProjects: number;
  activeProjects: number;
  totalStudentsEngaged: number;
  uniqueUniversities: number;
  uniqueCountries: number;
  totalDeliverables: number;
  sdgBreakdown: Record<number, number>;
}

export function calculateEcosystemStats(
  projects: Project[],
  opportunities: Opportunity[],
  baseStudentsCount = 200
): EcosystemStatsResult {
  const completedProjects = projects.filter((p) => p.status === 'Completed').length;
  const activeProjects = projects.filter((p) => p.status !== 'Completed').length;

  const universitiesSet = new Set<string>();
  const countriesSet = new Set<string>();
  let totalDeliverables = 0;
  const sdgBreakdown: Record<number, number> = {};

  projects.forEach((p) => {
    p.universities.forEach((u) => universitiesSet.add(u));
    p.countries.forEach((c) => countriesSet.add(c));
    totalDeliverables += p.deliverables.length;
    p.sdgs.forEach((sdg) => {
      sdgBreakdown[sdg.number] = (sdgBreakdown[sdg.number] || 0) + 1;
    });
  });

  return {
    totalProjects: projects.length,
    completedProjects,
    activeProjects,
    totalStudentsEngaged: Math.max(baseStudentsCount, projects.reduce((acc, p) => acc + p.team.length, 0)),
    uniqueUniversities: universitiesSet.size,
    uniqueCountries: countriesSet.size,
    totalDeliverables,
    sdgBreakdown,
  };
}

export interface ProjectProposalForm {
  title: string;
  organization: string;
  orgType: 'business' | 'university' | 'ngo';
  contactEmail: string;
  theme: string;
  targetUniversities: string[];
  challengeDescription: string;
  expectedOutcomes: string;
  skillsNeeded: string[];
}

export function validateProjectSubmission(data: Partial<ProjectProposalForm>): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!data.title || data.title.trim().length < 5) {
    errors.title = 'Title must be at least 5 characters long';
  }
  if (!data.organization || data.organization.trim().length < 2) {
    errors.organization = 'Organization or initiator name is required';
  }
  if (!data.contactEmail || !/^\S+@\S+\.\S+$/.test(data.contactEmail)) {
    errors.contactEmail = 'A valid contact email is required';
  }
  if (!data.theme || data.theme.trim() === '') {
    errors.theme = 'Please select a focus theme';
  }
  if (!data.challengeDescription || data.challengeDescription.trim().length < 20) {
    errors.challengeDescription = 'Challenge description must be at least 20 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export interface AssociateApplicationForm {
  fullName: string;
  email: string;
  university: string;
  country: string;
  fieldOfStudy: string;
  skills: string;
  motivation: string;
}

export function validateAssociateApplication(data: Partial<AssociateApplicationForm>): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 3) {
    errors.fullName = 'Full name must be at least 3 characters';
  }
  if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.email = 'Valid university or personal email is required';
  }
  if (!data.university || data.university.trim() === '') {
    errors.university = 'Please specify your university or institution';
  }
  if (!data.country || data.country.trim() === '') {
    errors.country = 'Country is required';
  }
  if (!data.motivation || data.motivation.trim().length < 20) {
    errors.motivation = 'Please tell us why you want to join Transformation Africa (at least 20 characters)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

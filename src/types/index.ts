export type ProjectCategory = 
  | 'AgriTech & Food Security'
  | 'CleanTech & Energy'
  | 'Health & Life Sciences'
  | 'Circular Economy & Water'
  | 'Digital Economy & FinTech'
  | 'Education & Social Impact';

export type ProjectStatus = 'Completed' | 'In Progress' | 'Pilot Phase' | 'Scaling';

export interface TeamMember {
  name: string;
  role: string;
  university: string;
  country: string;
  isLead?: boolean;
}

export interface Mentor {
  name: string;
  role: string;
  organization: string;
  type: 'academic' | 'industry';
}

export interface ProjectDeliverable {
  title: string;
  type: 'report' | 'prototype' | 'dataset' | 'presentation' | 'video';
  description: string;
  sizeOrLink?: string;
}

export interface VerifiedImpact {
  metric: string;
  value: string;
  description: string;
  sdgNumber: number;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  status: ProjectStatus;
  year: number;
  featured?: boolean;
  image: string;
  universities: string[];
  partnerOrgs: string[];
  countries: string[];
  challenge: string;
  solution: string;
  methodology: string;
  team: TeamMember[];
  mentors: Mentor[];
  impactMetrics: VerifiedImpact[];
  sdgs: { number: number; name: string }[];
  deliverables: ProjectDeliverable[];
  fullCaseStudy: string;
  testimonials?: {
    author: string;
    role: string;
    universityOrOrg: string;
    quote: string;
  }[];
}

export type OpportunityPhase = 'Idea' | 'Template' | 'Assignment' | 'Opportunity' | 'Active Project';

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  orgType: 'business' | 'university' | 'ngo';
  country: string;
  theme: string;
  description: string;
  phase: OpportunityPhase;
  targetUniversities: string[];
  requiredSkills: string[];
  teamSize: number;
  duration: string;
  stipendOrCredits: string;
  deadline: string;
  applicationsCount: number;
  status: 'Open' | 'Under Review' | 'Team Selected';
}

export interface StudentAssociate {
  id: string;
  name: string;
  university: string;
  country: string;
  program: string;
  graduationYear: number;
  skills: string[];
  completedProjects: number;
  activeProjects: number;
  badge: 'Junior Associate' | 'Fellow Associate' | 'Ecosystem Ambassador';
  bio: string;
}

export interface UniversityPartner {
  name: string;
  shortName: string;
  city: string;
  country: string;
  flag: string;
  coilCourses: number;
  projectsCompleted: number;
  facultyLeads: string[];
}

export type PortalTab = 'student' | 'university' | 'business' | 'innovation' | 'governance';

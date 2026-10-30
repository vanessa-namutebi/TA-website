/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ReplitNavbar, NavTab } from './components/ReplitNavbar';
import { ReplitHero } from './components/ReplitHero';
import {
  ReplitCommunityBar,
  ReplitSequence,
  ReplitMetricBanner,
  ReplitHomeProjectsPreview,
  ReplitPillarsSection
} from './components/ReplitHomeBlocks';
import { ReplitPurpose, PurposeSubTab } from './components/ReplitPurpose';
import { ReplitPeople, PeopleSubTab } from './components/ReplitPeople';
import { ReplitProjects, ProjectsSubTab } from './components/ReplitProjects';
import { ReplitPartnership, PartnershipSubTab } from './components/ReplitPartnership';
import { ReplitPortal, PortalTab } from './components/ReplitPortal';
import { ReplitProjectDetail } from './components/ReplitProjectDetail';
import { ReplitFooter } from './components/ReplitFooter';
import { REPLIT_PROJECTS, REPLIT_OPPORTUNITIES, ReplitProject, ReplitOpportunity } from './data/replitData';
import {
  OrganizationProposal,
  getStoredProposals,
  saveStoredProposals,
  convertProposalToOpportunity,
  OPPORTUNITIES_STORAGE_KEY
} from './data/proposalData';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [selectedProject, setSelectedProject] = useState<ReplitProject | null>(null);

  // Active sub-tabs for each pillar
  const [purposeSubTab, setPurposeSubTab] = useState<PurposeSubTab>('background');
  const [peopleSubTab, setPeopleSubTab] = useState<PeopleSubTab>('students');
  const [projectsSubTab, setProjectsSubTab] = useState<ProjectsSubTab>('overview');
  const [partnershipSubTab, setPartnershipSubTab] = useState<PartnershipSubTab>('membership');
  const [portalSubTab, setPortalSubTab] = useState<PortalTab>('intake');

  // Shared dynamic opportunities state (persisted to localStorage)
  const [opportunities, setOpportunities] = useState<ReplitOpportunity[]>(() => {
    try {
      const stored = localStorage.getItem(OPPORTUNITIES_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn('Could not load stored opportunities', e);
    }
    return REPLIT_OPPORTUNITIES;
  });

  // Shared dynamic organization challenge proposals state
  const [proposals, setProposals] = useState<OrganizationProposal[]>(() => getStoredProposals());

  // Save opportunities when changed
  const handleUpdateOpportunities = (updated: ReplitOpportunity[]) => {
    setOpportunities(updated);
    try {
      localStorage.setItem(OPPORTUNITIES_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to store opportunities', e);
    }
  };

  // Add new proposal from organization intake
  const handleAddProposal = (newProposal: OrganizationProposal) => {
    const next = [newProposal, ...proposals];
    setProposals(next);
    saveStoredProposals(next);
  };

  // Admin approves proposal -> converts to Opportunity and adds to live opportunities board
  const handleApproveProposal = (proposalId: string) => {
    const target = proposals.find((p) => p.id === proposalId);
    if (!target) return;

    // Convert to opportunity
    const newOpportunity = convertProposalToOpportunity(target);
    const updatedOpportunities = [newOpportunity, ...opportunities];
    handleUpdateOpportunities(updatedOpportunities);

    // Update proposal status
    const updatedProposals = proposals.map((p) =>
      p.id === proposalId
        ? {
            ...p,
            status: 'Approved' as const,
            adminReviewer: 'Transformation Africa Academic Consortium Board',
            reviewedAt: new Date().toISOString(),
            publishedOpportunityId: newOpportunity.id
          }
        : p
    );
    setProposals(updatedProposals);
    saveStoredProposals(updatedProposals);
  };

  // Admin declines proposal
  const handleDeclineProposal = (proposalId: string, reason?: string) => {
    const updatedProposals = proposals.map((p) =>
      p.id === proposalId
        ? {
            ...p,
            status: 'Declined' as const,
            adminNotes: reason || 'Not aligned with current semester syllabus or focus area.',
            reviewedAt: new Date().toISOString()
          }
        : p
    );
    setProposals(updatedProposals);
    saveStoredProposals(updatedProposals);
  };

  // Sync hash routing with subtab support
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace('#', '').trim();
      const cleanHash = rawHash.startsWith('/') ? rawHash.slice(1) : rawHash;
      const parts = cleanHash.split('/').filter(Boolean);

      // Deep link to project detail
      if (parts[0] === 'projects' && parts[1] && parts[1] !== 'approach' && parts[1] !== 'types' && parts[1] !== 'pipeline' && parts[1] !== 'overview') {
        const slug = parts[1];
        const matched = REPLIT_PROJECTS.find((p) => p.slug === slug);
        if (matched) {
          setSelectedProject(matched);
          setCurrentTab('projects');
          return;
        }
      }

      if (parts[0] === 'purpose' || parts[0] === 'about') {
        setCurrentTab('purpose');
        setSelectedProject(null);
        if (parts[1]) setPurposeSubTab(parts[1] as PurposeSubTab);
      } else if (parts[0] === 'people') {
        setCurrentTab('people');
        setSelectedProject(null);
        if (parts[1]) setPeopleSubTab(parts[1] as PeopleSubTab);
      } else if (parts[0] === 'projects') {
        setCurrentTab('projects');
        setSelectedProject(null);
        if (parts[1]) setProjectsSubTab(parts[1] as ProjectsSubTab);
      } else if (parts[0] === 'opportunities') {
        setCurrentTab('projects');
        setProjectsSubTab('pipeline');
        setSelectedProject(null);
      } else if (parts[0] === 'resources') {
        setCurrentTab('projects');
        setProjectsSubTab('types');
        setSelectedProject(null);
      } else if (parts[0] === 'partnership') {
        setCurrentTab('partnership');
        setSelectedProject(null);
        if (parts[1]) setPartnershipSubTab(parts[1] as PartnershipSubTab);
      } else if (parts[0] === 'portal' || parts[0] === 'contact' || parts[0] === 'login') {
        setCurrentTab('portal');
        setSelectedProject(null);
        if (parts[1]) setPortalSubTab(parts[1] as PortalTab);
      } else if (parts[0] === 'home' || !parts[0]) {
        setCurrentTab('home');
        setSelectedProject(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (tab: NavTab, subTab?: string) => {
    setCurrentTab(tab);
    setSelectedProject(null);

    if (tab === 'purpose' && subTab) {
      setPurposeSubTab(subTab as PurposeSubTab);
    } else if (tab === 'people' && subTab) {
      setPeopleSubTab(subTab as PeopleSubTab);
    } else if (tab === 'projects' && subTab) {
      setProjectsSubTab(subTab as ProjectsSubTab);
    } else if (tab === 'partnership' && subTab) {
      setPartnershipSubTab(subTab as PartnershipSubTab);
    } else if (tab === 'portal' && subTab) {
      setPortalSubTab(subTab as PortalTab);
    }

    window.location.hash = subTab ? `#/${tab}/${subTab}` : `#/${tab}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProject = (project: ReplitProject) => {
    setSelectedProject(project);
    setCurrentTab('projects');
    window.location.hash = `#/projects/${project.slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToProjects = () => {
    setSelectedProject(null);
    setCurrentTab('projects');
    window.location.hash = '#/projects/overview';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pendingProposalsCount = proposals.filter((p) => p.status === 'Pending Review').length;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F0] text-[#102B4E]">
      {/* Top Navigation with requested 5 dropdowns */}
      <ReplitNavbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        pendingProposalsCount={pendingProposalsCount}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {selectedProject ? (
          <ReplitProjectDetail
            project={selectedProject}
            onBack={handleBackToProjects}
          />
        ) : (
          <>
            {currentTab === 'home' && (
              <>
                <ReplitHero
                  onDiscoverMission={() => handleNavigate('purpose', 'mission')}
                  onBrowseRepository={() => handleNavigate('projects', 'overview')}
                />
                <ReplitCommunityBar />
                <ReplitPillarsSection
                  onNavigateToPurpose={() => handleNavigate('purpose', 'background')}
                  onNavigateToPeople={() => handleNavigate('people', 'students')}
                  onNavigateToPartnership={() => handleNavigate('partnership', 'membership')}
                />
                <ReplitSequence />
                <ReplitMetricBanner />
                <ReplitHomeProjectsPreview
                  onBrowseProjects={() => handleNavigate('projects', 'overview')}
                  onExploreOpportunities={() => handleNavigate('projects', 'pipeline')}
                  onSelectProject={handleSelectProject}
                />
              </>
            )}

            {(currentTab === 'purpose' || currentTab === 'about') && (
              <ReplitPurpose
                initialSubTab={purposeSubTab}
                onNavigateToProjects={() => handleNavigate('projects', 'overview')}
                onNavigateToContact={() => handleNavigate('portal', 'intake')}
              />
            )}

            {currentTab === 'people' && (
              <ReplitPeople
                initialSubTab={peopleSubTab}
                onNavigateToProjects={() => handleNavigate('projects', 'overview')}
                onNavigateToContact={() => handleNavigate('portal', 'intake')}
              />
            )}

            {(currentTab === 'projects' || currentTab === 'opportunities' || currentTab === 'resources') && (
              <ReplitProjects
                initialSubTab={projectsSubTab}
                onSelectProject={handleSelectProject}
                opportunities={opportunities}
                onOpportunityUpdated={handleUpdateOpportunities}
                onNavigateToContact={() => handleNavigate('portal', 'intake')}
              />
            )}

            {currentTab === 'partnership' && (
              <ReplitPartnership
                initialSubTab={partnershipSubTab}
                onNavigateToContact={() => handleNavigate('portal', 'office')}
                onNavigateToProjects={() => handleNavigate('projects', 'overview')}
              />
            )}

            {(currentTab === 'portal' || currentTab === 'contact') && (
              <ReplitPortal
                initialTab={portalSubTab}
                proposals={proposals}
                onAddProposal={handleAddProposal}
                onApproveProposal={handleApproveProposal}
                onDeclineProposal={handleDeclineProposal}
                onNavigateToOpportunities={() => handleNavigate('projects', 'pipeline')}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <ReplitFooter onNavigate={(tab) => handleNavigate(tab)} />
    </div>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  ExternalLink,
} from 'lucide-react';

export type NavTab =
  | 'home'
  | 'purpose'
  | 'people'
  | 'projects'
  | 'partnership'
  | 'portal'
  | 'opportunities'
  | 'resources'
  | 'about'
  | 'contact';

interface DropdownItem {
  label: string;
  subTab?: string;
  isExternal?: boolean;
  externalUrl?: string;
  badge?: string;
}

interface DropdownGroup {
  id: 'purpose' | 'people' | 'projects' | 'partnership' | 'portal';
  label: string;
  items: DropdownItem[];
}

interface ReplitNavbarProps {
  currentTab: NavTab;
  onNavigate: (tab: NavTab, subTab?: string) => void;
  pendingProposalsCount?: number;
}

export const ReplitNavbar: React.FC<ReplitNavbarProps> = ({
  currentTab,
  onNavigate,
  pendingProposalsCount = 0
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navContainerRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Handle hover open with small debounce
  const handleMouseEnter = (groupId: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setOpenDropdown(groupId);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 180);
  };

  const handleNav = (tab: NavTab, subTab?: string) => {
    onNavigate(tab, subTab);
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // The 5 requested top-level dropdown items with exact child lists
  const navGroups: DropdownGroup[] = [
    {
      id: 'purpose',
      label: 'Purpose',
      items: [
        { label: 'Background/ Scope', subTab: 'background' },
        { label: 'Mission', subTab: 'mission' },
        { label: 'EcoSystem Approach', subTab: 'ecosystem' },
        { label: 'UN SDGs / Africa Agenda 2063', subTab: 'sdgs' },
        { label: 'Key Competences Model', subTab: 'competences' },
        { label: 'Testimonials', subTab: 'testimonials' },
        { label: 'Core Team', subTab: 'team' },
        { label: 'Contact', subTab: 'contact' }
      ]
    },
    {
      id: 'people',
      label: 'People',
      items: [
        { label: 'Students/ Associates', subTab: 'students' },
        { label: 'Higher Education Systems', subTab: 'universities' },
        { label: 'Industry/ Businesses', subTab: 'industry' },
        { label: 'Start Up/ Impact Hubs', subTab: 'hubs' },
        { label: 'Non Profit Organisations', subTab: 'ngos' },
        { label: 'Learning Outcomes', subTab: 'outcomes' },
        { label: 'Training & Development', subTab: 'training' }
      ]
    },
    {
      id: 'projects',
      label: 'Projects',
      items: [
        { label: 'General Approach', subTab: 'approach' },
        { label: 'Types', subTab: 'types' },
        { label: 'Project pipeline', subTab: 'pipeline' },
        { label: 'Overview', subTab: 'overview' }
      ]
    },
    {
      id: 'partnership',
      label: 'Partnership',
      items: [
        { label: 'Membership', subTab: 'membership' },
        { label: 'Sponsorship', subTab: 'sponsorship' },
        { label: 'Events/ Conferences', subTab: 'events' },
        { label: 'Financial Aspects', subTab: 'financials' },
        { label: 'Contact', subTab: 'contact' }
      ]
    },
    {
      id: 'portal',
      label: 'Personal Login',
      items: [
        {
          label: 'Individual Registration',
          subTab: 'registration'
        },
        {
          label: 'Project Ideas/ Assignment',
          subTab: 'types'
        }
      ]
    }
  ];

  // Helper to determine active state
  const isGroupActive = (groupId: string) => {
    if (groupId === 'purpose' && (currentTab === 'purpose' || currentTab === 'about')) return true;
    if (groupId === 'people' && currentTab === 'people') return true;
    if (groupId === 'projects' && (currentTab === 'projects' || currentTab === 'opportunities' || currentTab === 'resources')) return true;
    if (groupId === 'partnership' && currentTab === 'partnership') return true;
    if (groupId === 'portal' && (currentTab === 'portal' || currentTab === 'contact')) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F8F6F0]/95 backdrop-blur-md border-b border-[#E2EEF5] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between" ref={navContainerRef}>
        
        {/* Brand Logo with authentic globe emblem */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-3 text-left focus:outline-none group shrink-0"
          aria-label="Transformation Africa home"
        >
          <img
            src="/assets/aistudio/Transformation_Africa_logo__1_-removebg-preview_eecea55f.png"
            alt="Transformation Africa Logo"
            className="w-11 h-11 object-contain group-hover:scale-105 transition-transform shrink-0"
          />
          <div className="flex flex-col">
            <span className="font-extrabold text-xl text-[#102B4E] tracking-tight leading-none lowercase">
              transformation
            </span>
            <span className="text-[10px] font-bold text-[#159FE3] uppercase tracking-[0.22em] mt-0.5">
              Africa · Europe
            </span>
          </div>
        </button>

        {/* Desktop Nav with Dropdowns matching user requirements */}
        <nav className="hidden lg:flex items-center gap-2 xl:gap-4 text-sm font-medium">
          {navGroups.map((group) => {
            const isActive = isGroupActive(group.id);
            const isOpen = openDropdown === group.id;

            return (
              <div
                key={group.id}
                className="relative"
                onMouseEnter={() => handleMouseEnter(group.id)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Top Level Item Button */}
                <button
                  onClick={() => {
                    if (openDropdown === group.id) {
                      setOpenDropdown(null);
                    } else {
                      setOpenDropdown(group.id);
                      handleNav(group.id as NavTab);
                    }
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all focus:outline-none ${
                    isActive
                      ? 'text-[#102B4E] font-bold'
                      : 'text-[#415D7E] hover:text-[#102B4E] hover:bg-[#EAF6FC]/60'
                  }`}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                >
                  <span>{group.label}</span>
                  {group.id !== 'portal' && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#159FE3]' : ''
                      }`}
                    />
                  )}
                </button>

                {/* Dropdown Floating Panel */}
                {isOpen && (
                  <div
                    className="absolute top-full left-0 mt-1 w-64 bg-white/98 backdrop-blur-md rounded-2xl shadow-xl border border-[#D0E7F5] py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                  >
                    <div className="px-3 py-1.5 mb-1 border-b border-[#F0F6FA] text-[10px] font-mono font-bold text-[#159FE3] uppercase tracking-wider">
                      <span>{group.label}</span>
                    </div>

                    <div className="py-1">
                      {group.items.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            if (item.isExternal && item.externalUrl) {
                              window.open(item.externalUrl, '_blank', 'noopener,noreferrer');
                              setOpenDropdown(null);
                            } else {
                              handleNav(group.id as NavTab, item.subTab);
                            }
                          }}
                          className="w-full text-left px-3.5 py-2 hover:bg-[#EAF6FC] flex items-center justify-between text-xs text-[#102B4E] hover:text-[#159FE3] font-medium transition-colors group/item"
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <span className="truncate">{item.label}</span>
                          </div>
                          {item.isExternal ? (
                            <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
                          ) : (
                            <ArrowRight className="w-3 h-3 text-[#159FE3] opacity-0 group-hover/item:opacity-100 transition-opacity shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>

                    {group.id !== 'portal' && (
                      <div className="mt-1 pt-1 border-t border-[#F0F6FA] px-3 py-1">
                        <button
                          onClick={() => handleNav(group.id as NavTab)}
                          className="text-[11px] font-bold text-[#159FE3] hover:underline flex items-center gap-1 w-full justify-end"
                        >
                          <span>View all in {group.label}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Primary CTA Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => handleNav('projects', 'overview')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#102B4E] hover:bg-[#0C223E] text-white text-xs font-semibold shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#159FE3]"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#159FE3]" />
          </button>
        </div>

        {/* Mobile menu hamburger */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#102B4E] rounded-lg hover:bg-[#EAF6FC] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer with Accordion Support for each of the 5 dropdown groups */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-6 bg-[#F8F6F0] border-b border-[#E2EEF5] space-y-2 max-h-[85vh] overflow-y-auto">
          {/* Home Link */}
          <button
            onClick={() => handleNav('home')}
            className={`block w-full text-left px-3 py-2 rounded-xl text-sm font-semibold ${
              currentTab === 'home' ? 'bg-[#EAF6FC] text-[#102B4E] font-bold' : 'text-[#415D7E]'
            }`}
          >
            Home
          </button>

          {/* 5 Dropdown Accordion Groups */}
          {navGroups.map((group) => {
            const isExpanded = mobileExpandedGroup === group.id;
            const isActive = isGroupActive(group.id);

            return (
              <div key={group.id} className="border border-[#D0E7F5] rounded-xl bg-white overflow-hidden">
                <button
                  onClick={() => setMobileExpandedGroup(isExpanded ? null : group.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 text-sm font-bold text-left transition-colors ${
                    isActive ? 'text-[#159FE3] bg-[#EAF6FC]/40' : 'text-[#102B4E]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{group.label}</span>
                  </span>
                  {group.id !== 'portal' && (
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        isExpanded ? 'rotate-180 text-[#159FE3]' : ''
                      }`}
                    />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-2 pt-1 pb-3 bg-[#F8F6F0]/60 space-y-1 border-t border-[#E2EEF5]">
                    {group.items.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (item.isExternal && item.externalUrl) {
                            window.open(item.externalUrl, '_blank', 'noopener,noreferrer');
                            setMobileMenuOpen(false);
                          } else {
                            handleNav(group.id as NavTab, item.subTab);
                          }
                        }}
                        className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-[#415D7E] hover:text-[#102B4E] hover:bg-white flex items-center justify-between"
                      >
                        <span className="flex items-center gap-2">
                          <span>{item.label}</span>
                        </span>
                        {item.isExternal && <ExternalLink className="w-3 h-3 text-slate-400" />}
                      </button>
                    ))}
                    {group.id !== 'portal' && (
                      <div className="pt-1.5 px-3">
                        <button
                          onClick={() => handleNav(group.id as NavTab)}
                          className="text-xs font-bold text-[#159FE3] underline"
                        >
                          Open entire {group.label} overview
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

        </div>
      )}
    </header>
  );
};

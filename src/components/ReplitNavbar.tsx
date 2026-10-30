import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  ExternalLink,
  Target,
  Globe2,
  Layers,
  TrendingUp,
  Award,
  Sparkles,
  Users,
  Mail,
  GraduationCap,
  BookOpen,
  Building2,
  Rocket,
  HeartHandshake,
  FolderKanban,
  FileText,
  Landmark,
  Coins,
  Calendar,
  ShieldCheck,
  Lock,
  UserCheck
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
  icon?: React.ReactNode;
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
        { label: 'Background/ Scope', subTab: 'background', icon: <Globe2 className="w-4 h-4 text-[#159FE3]" /> },
        { label: 'Mission', subTab: 'mission', icon: <Target className="w-4 h-4 text-[#159FE3]" /> },
        { label: 'EcoSystem Approach', subTab: 'ecosystem', icon: <Layers className="w-4 h-4 text-[#159FE3]" /> },
        { label: 'UN SDGs / Africa Agenda 2063', subTab: 'sdgs', icon: <TrendingUp className="w-4 h-4 text-[#159FE3]" /> },
        { label: 'Key Competences Model', subTab: 'competences', icon: <Award className="w-4 h-4 text-[#159FE3]" /> },
        { label: 'Testimonials', subTab: 'testimonials', icon: <Sparkles className="w-4 h-4 text-[#159FE3]" /> },
        { label: 'Core Team', subTab: 'team', icon: <Users className="w-4 h-4 text-[#159FE3]" /> },
        { label: 'Contact', subTab: 'contact', icon: <Mail className="w-4 h-4 text-[#159FE3]" /> }
      ]
    },
    {
      id: 'people',
      label: 'People',
      items: [
        { label: 'Students/ Associates', subTab: 'students', icon: <GraduationCap className="w-4 h-4 text-[#159FE3]" /> },
        { label: 'Higher Education Systems', subTab: 'universities', icon: <BookOpen className="w-4 h-4 text-[#159FE3]" /> },
        { label: 'Industry/ Businesses', subTab: 'industry', icon: <Building2 className="w-4 h-4 text-[#159FE3]" /> },
        { label: 'Start Up/ Impact Hubs', subTab: 'hubs', icon: <Rocket className="w-4 h-4 text-[#159FE3]" /> },
        { label: 'Non Profit Organisations', subTab: 'ngos', icon: <HeartHandshake className="w-4 h-4 text-[#159FE3]" /> },
        { label: 'Learning Outcomes', subTab: 'outcomes', icon: <Award className="w-4 h-4 text-[#159FE3]" /> },
        { label: 'Training & Development', subTab: 'training', icon: <Sparkles className="w-4 h-4 text-[#159FE3]" /> }
      ]
    },
    {
      id: 'projects',
      label: 'Projects',
      items: [
        { label: 'General Approach', subTab: 'approach', icon: <Layers className="w-4 h-4 text-[#159FE3]" /> },
        { label: 'Types', subTab: 'types', icon: <BookOpen className="w-4 h-4 text-[#159FE3]" /> },
        { label: 'Project pipeline', subTab: 'pipeline', icon: <Sparkles className="w-4 h-4 text-[#159FE3]" /> },
        { label: 'Overview', subTab: 'overview', icon: <FolderKanban className="w-4 h-4 text-[#159FE3]" /> }
      ]
    },
    {
      id: 'partnership',
      label: 'Partnership',
      items: [
        { label: 'Membership', subTab: 'membership', icon: <Landmark className="w-4 h-4 text-[#159FE3]" /> },
        { label: 'Sponsorship', subTab: 'sponsorship', icon: <Coins className="w-4 h-4 text-[#159FE3]" /> },
        { label: 'Events/ Conferences', subTab: 'events', icon: <Calendar className="w-4 h-4 text-[#159FE3]" /> },
        { label: 'Financial Aspects', subTab: 'financials', icon: <ShieldCheck className="w-4 h-4 text-[#159FE3]" /> },
        { label: 'Contact', subTab: 'contact', icon: <Mail className="w-4 h-4 text-[#159FE3]" /> }
      ]
    },
    {
      id: 'portal',
      label: 'Personal Login',
      items: [
        {
          label: 'Individual Registration',
          subTab: 'registration',
          icon: <UserCheck className="w-4 h-4 text-[#159FE3]" />
        },
        {
          label: 'Project Ideas/ Assignment',
          subTab: 'types',
          icon: <FileText className="w-4 h-4 text-[#159FE3]" />
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
                  {group.id === 'portal' && pendingProposalsCount > 0 && (
                    <span className="w-4 h-4 rounded-full bg-[#FFC94A] text-[#102B4E] text-[9px] font-black flex items-center justify-center font-mono shadow-2xs">
                      {pendingProposalsCount}
                    </span>
                  )}
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#159FE3]' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Floating Panel */}
                {isOpen && (
                  <div
                    className="absolute top-full left-0 mt-1 w-64 bg-white/98 backdrop-blur-md rounded-2xl shadow-xl border border-[#D0E7F5] py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                  >
                    <div className="px-3 py-1.5 mb-1 border-b border-[#F0F6FA] flex items-center justify-between text-[10px] font-mono font-bold text-[#159FE3] uppercase tracking-wider">
                      <span>{group.label}</span>
                      <span>Navigation</span>
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
                            {item.icon && (
                              <span className="shrink-0 text-slate-400 group-hover/item:text-[#159FE3] transition-colors">
                                {item.icon}
                              </span>
                            )}
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

                    {/* Footer link in dropdown */}
                    <div className="mt-1 pt-1 border-t border-[#F0F6FA] px-3 py-1">
                      <button
                        onClick={() => handleNav(group.id as NavTab)}
                        className="text-[11px] font-bold text-[#159FE3] hover:underline flex items-center gap-1 w-full justify-end"
                      >
                        <span>View all in {group.label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Primary CTA Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => handleNav('portal', 'intake')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#159FE3]/30 bg-white hover:bg-[#EAF6FC] text-[#102B4E] text-xs font-semibold shadow-xs transition-all"
          >
            <span>Propose Challenge</span>
          </button>
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
          {pendingProposalsCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#FFC94A] text-[#102B4E] text-[10px] font-bold flex items-center justify-center font-mono">
              {pendingProposalsCount}
            </span>
          )}
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
                    {group.id === 'portal' && pendingProposalsCount > 0 && (
                      <span className="px-1.5 py-0.2 rounded-full bg-[#FFC94A] text-[#102B4E] text-[10px] font-mono">
                        {pendingProposalsCount}
                      </span>
                    )}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isExpanded ? 'rotate-180 text-[#159FE3]' : ''
                    }`}
                  />
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
                          <span className="w-1.5 h-1.5 rounded-full bg-[#159FE3]" />
                          <span>{item.label}</span>
                        </span>
                        {item.isExternal && <ExternalLink className="w-3 h-3 text-slate-400" />}
                      </button>
                    ))}
                    <div className="pt-1.5 px-3">
                      <button
                        onClick={() => handleNav(group.id as NavTab)}
                        className="text-xs font-bold text-[#159FE3] underline"
                      >
                        Open entire {group.label} overview
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Quick CTA in mobile drawer */}
          <div className="pt-3 space-y-2">
            <button
              onClick={() => handleNav('portal', 'intake')}
              className="w-full py-2.5 px-4 rounded-full bg-[#102B4E] text-white text-xs font-semibold flex items-center justify-center gap-2"
            >
              <span>Propose Organisation Challenge</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#159FE3]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

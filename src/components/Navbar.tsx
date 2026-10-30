import React, { useState } from 'react';
import { Menu, X, ArrowUpRight, Globe2 } from 'lucide-react';

interface NavbarProps {
  onOpenAssociateModal: () => void;
  onOpenSubmitProposalModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAssociateModal,
  onOpenSubmitProposalModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element with clean emblem, no descriptor clutter) */}
        <a
          href="#"
          className="flex items-center gap-3 text-slate-900 group whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg p-1"
          aria-label="Transformation Africa Homepage"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-sm shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <Globe2 className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-slate-900 leading-tight">
              Transformation Africa
            </span>
            <span className="text-[11px] font-medium text-slate-500 tracking-normal">
              Platform-as-a-Community
            </span>
          </div>
        </a>

        {/* Zone 2: 4-5 single-line clean text links with subtle hover underlines */}
        <nav
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
          aria-label="Main Navigation"
        >
          <a
            href="#projects"
            className="hover:text-sky-600 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Project Repository
          </a>
          <a
            href="#opportunities"
            className="hover:text-sky-600 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Live Opportunities
          </a>
          <a
            href="#digital-loom"
            className="hover:text-sky-600 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            The Digital Loom
          </a>
          <a
            href="#portals"
            className="hover:text-sky-600 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            5 Connected Portals
          </a>
          <a
            href="#partners"
            className="hover:text-sky-600 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            University Network
          </a>
        </nav>

        {/* Zone 3: 1 Primary Action CTA */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenSubmitProposalModal}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            Propose Challenge
          </button>
          <button
            onClick={onOpenAssociateModal}
            className="px-4 py-2.5 text-xs font-semibold text-white bg-sky-500 hover:bg-sky-600 active:bg-sky-700 shadow-sm shadow-sky-500/25 rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            <span>Join as Associate</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3">
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-700 hover:text-sky-600 hover:bg-slate-50 rounded-md"
          >
            Project Repository
          </a>
          <a
            href="#opportunities"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-700 hover:text-sky-600 hover:bg-slate-50 rounded-md"
          >
            Live Opportunities
          </a>
          <a
            href="#digital-loom"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-700 hover:text-sky-600 hover:bg-slate-50 rounded-md"
          >
            The Digital Loom
          </a>
          <a
            href="#portals"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-700 hover:text-sky-600 hover:bg-slate-50 rounded-md"
          >
            5 Connected Portals
          </a>
          <a
            href="#partners"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm font-medium text-slate-700 hover:text-sky-600 hover:bg-slate-50 rounded-md"
          >
            University Network
          </a>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSubmitProposalModal();
              }}
              className="w-full text-center px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Propose Challenge
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAssociateModal();
              }}
              className="w-full text-center px-4 py-2.5 text-xs font-semibold text-white bg-sky-500 hover:bg-sky-600 rounded-lg shadow-sm"
            >
              Join as Associate
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

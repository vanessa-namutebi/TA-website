import React, { useState, useMemo } from 'react';
import {
  FileText,
  Download,
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  X,
  Layers,
  Cpu,
  ShieldCheck,
  BookOpen,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { CONSORTIUM_RESOURCES, ConsortiumResource } from '../data/resourcesData';

export const ReplitResources: React.FC = () => {
  const [resources, setResources] = useState<ConsortiumResource[]>(CONSORTIUM_RESOURCES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedFormat, setSelectedFormat] = useState<string>('All');
  const [activeModalResource, setActiveModalResource] = useState<ConsortiumResource | null>(null);
  
  // Download simulation state
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  const categories = ['All', 'COIL & Curriculum', 'Hardware & Schematics', 'Protocols & Toolkits', 'Policy & Legal'];

  const filteredResources = useMemo(() => {
    return resources.filter((res) => {
      if (selectedCategory !== 'All' && res.category !== selectedCategory) return false;
      if (selectedFormat !== 'All' && res.format !== selectedFormat) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = res.title.toLowerCase().includes(q);
        const inDesc = res.description.toLowerCase().includes(q);
        const inInst = res.institution.toLowerCase().includes(q);
        const inAuthor = res.author.toLowerCase().includes(q);
        const inHighlights = res.highlights.some(h => h.toLowerCase().includes(q));
        if (!inTitle && !inDesc && !inInst && !inAuthor && !inHighlights) return false;
      }
      return true;
    });
  }, [resources, selectedCategory, selectedFormat, searchQuery]);

  const handleDownload = (res: ConsortiumResource) => {
    setDownloadingId(res.id);
    setTimeout(() => {
      setDownloadingId(null);
      // Increment count
      setResources(prev =>
        prev.map(item => item.id === res.id ? { ...item, downloadsCount: item.downloadsCount + 1 } : item)
      );

      // Trigger a real text/file blob download in browser so the user gets an actual tangible asset!
      const content = `TRANSFORMATION AFRICA CONSORTIUM OPEN-ACCESS RESOURCE
======================================================
Title: ${res.title}
Category: ${res.category}
Institution: ${res.institution}
Lead Author / Working Group: ${res.author}
Publication: ${res.publicationDate}
License: ${res.license}
Specification / Format: ${res.format} (${res.fileSize})

ABSTRACT:
${res.abstract}

KEY HIGHLIGHTS:
${res.highlights.map(h => `- ${h}`).join('\n')}

TABLE OF CONTENTS:
${res.tableOfContents.map((t, i) => `${i + 1}. ${t}`).join('\n')}

Target Audience: ${res.targetAudience}

------------------------------------------------------
Transformation Africa Platform (PaaC)
Stellenbosch University · Makerere University · MCI Innsbruck · TU Munich
Website: https://transformation-africa-platform.org
`;
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${res.slug}-summary.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setDownloadSuccessMessage(`Downloaded "${res.title}" package.`);
      setTimeout(() => setDownloadSuccessMessage(null), 4500);
    }, 700);
  };

  const getFormatBadge = (format: ConsortiumResource['format']) => {
    switch (format) {
      case 'PDF':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-mono">PDF</span>;
      case 'CAD / STEP':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-mono">CAD / STEP</span>;
      case 'ZIP Archive':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-mono">ZIP BUNDLE</span>;
      case 'DOCX':
        return <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-mono">DOCX</span>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'COIL & Curriculum':
        return <BookOpen className="w-4 h-4 text-[#159FE3]" />;
      case 'Hardware & Schematics':
        return <Cpu className="w-4 h-4 text-[#FFC94A]" />;
      case 'Protocols & Toolkits':
        return <Layers className="w-4 h-4 text-[#102B4E]" />;
      case 'Policy & Legal':
        return <ShieldCheck className="w-4 h-4 text-[#159FE3]" />;
      default:
        return <FileText className="w-4 h-4 text-[#102B4E]" />;
    }
  };

  return (
    <div className="py-12 sm:py-16 bg-[#F8F6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Toast alert for download */}
        {downloadSuccessMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#102B4E] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-[#159FE3]/40 animate-in fade-in slide-in-from-bottom-2">
            <CheckCircle2 className="w-5 h-5 text-[#FFC94A] shrink-0" />
            <span className="text-xs font-medium">{downloadSuccessMessage}</span>
          </div>
        )}

        {/* Hero Header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          <div className="md:col-span-8">
            <div className="text-[11px] font-bold text-[#159FE3] tracking-[0.2em] uppercase mb-3 font-mono">
              Consortium Knowledge Commons
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#102B4E] tracking-tight leading-tight mb-4">
              Resources for cross-border co-creation.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Open-hardware schematics, accredited COIL curriculum syllabi, bioethics rubrics, and legal IP frameworks produced by students, researchers, and partners across Africa and Europe.
            </p>
          </div>

          {/* Quick Metrics Badge */}
          <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 justify-end items-start md:items-end">
            <div className="bg-[#EAF6FC] border border-[#D0E7F5] rounded-2xl p-4 w-full max-w-xs shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#159FE3] uppercase tracking-wider mb-1 font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Open-Access Standard</span>
              </div>
              <div className="text-2xl font-black text-[#102B4E]">100% Free</div>
              <p className="text-[11px] text-slate-600 mt-1">
                Licensed under Creative Commons &amp; CERN Open Hardware for global academic and community replication.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#EAF6FC]/60 p-4 rounded-2xl border border-[#D0E7F5] mb-8 space-y-4">
          
          {/* Top row: search & category pills */}
          <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#102B4E]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search resources, schematics, topics, or institutions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 bg-white border border-[#D0E7F5] rounded-xl text-xs sm:text-sm text-[#102B4E] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#159FE3] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Format quick buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 text-xs font-medium">
              <span className="text-[10px] uppercase font-mono text-[#102B4E]/70 font-bold mr-1 shrink-0">
                Format:
              </span>
              {['All', 'PDF', 'CAD / STEP', 'ZIP Archive', 'DOCX'].map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setSelectedFormat(fmt)}
                  className={`px-3 py-1.5 rounded-lg transition-all shrink-0 ${
                    selectedFormat === fmt
                      ? 'bg-[#102B4E] text-white font-semibold'
                      : 'bg-white border border-[#D0E7F5] text-[#102B4E]/80 hover:text-[#102B4E] hover:border-[#159FE3]'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {categories.map((cat) => {
              const count = cat === 'All' 
                ? resources.length 
                : resources.filter(r => r.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl flex items-center gap-2 font-medium transition-all shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-[#102B4E] text-white shadow-sm'
                      : 'bg-white text-[#102B4E]/80 border border-[#D0E7F5] hover:border-[#159FE3]'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    selectedCategory === cat ? 'bg-white/20 text-white' : 'bg-[#EAF6FC] text-[#102B4E]'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-6 font-mono">
          <span>Showing {filteredResources.length} consortium technical resources</span>
          <span>Verified peer-reviewed documentation</span>
        </div>

        {/* Resources Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-16">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#D0E7F5] shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Meta header */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(res.category)}
                    <span className="text-[11px] font-bold text-[#159FE3] uppercase tracking-wider font-mono">
                      {res.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getFormatBadge(res.format)}
                    <span className="text-xs font-mono text-slate-500">
                      {res.fileSize}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3
                  onClick={() => setActiveModalResource(res)}
                  className="text-xl sm:text-2xl font-bold text-[#102B4E] group-hover:text-[#159FE3] transition-colors mb-2 cursor-pointer leading-snug"
                >
                  {res.title}
                </h3>

                {/* Institution & Author */}
                <p className="text-xs font-medium text-slate-600 mb-3">
                  {res.institution} · <span className="text-[#102B4E] font-semibold">{res.author}</span>
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {res.description}
                </p>

                {/* Highlights bullet list */}
                <div className="bg-[#EAF6FC] p-3.5 rounded-2xl border border-[#D0E7F5] mb-5 space-y-1.5">
                  <div className="text-[10px] font-bold text-[#102B4E] uppercase font-mono tracking-wider">
                    Package Inclusions:
                  </div>
                  <ul className="space-y-1">
                    {res.highlights.slice(0, 3).map((h, i) => (
                      <li key={i} className="text-xs text-[#102B4E] flex items-start gap-1.5 leading-snug">
                        <span className="text-[#159FE3] font-bold">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-[#EAF6FC] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
                  <span>{res.pagesOrItems}</span>
                  <span>·</span>
                  <span>{res.downloadsCount} downloads</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveModalResource(res)}
                    className="px-3.5 py-2 rounded-full border border-[#D0E7F5] text-[#102B4E] hover:bg-[#EAF6FC] text-xs font-semibold transition-all"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleDownload(res)}
                    disabled={downloadingId === res.id}
                    className="px-4 py-2 rounded-full bg-[#102B4E] hover:bg-[#0C223E] text-white text-xs font-semibold shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <Download className={`w-3.5 h-3.5 ${downloadingId === res.id ? 'animate-bounce' : ''}`} />
                    <span>{downloadingId === res.id ? 'Packaging...' : 'Download'}</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="bg-[#102B4E] text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#159FE3]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-xl relative z-10">
            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FFC94A] font-bold mb-2">
              Contribute to the Commons
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-white">
              Have courseware or hardware designs to share?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Consortium faculty and partner organizations are encouraged to deposit open-hardware blueprints and course syllabi in our shared repository.
            </p>
          </div>
          <a
            href="#/contact"
            className="px-6 py-3 rounded-full bg-[#FFC94A] hover:bg-[#F5BF3F] text-[#102B4E] text-xs font-bold shrink-0 shadow-sm transition-all flex items-center gap-2 relative z-10"
          >
            <span>Submit Resource via Contact Us</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Resource Details Modal */}
        {activeModalResource && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 bg-[#102B4E]/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          >
            <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D0E7F5] my-8 max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setActiveModalResource(null)}
                className="absolute top-5 right-5 p-2 text-slate-400 hover:text-[#102B4E] rounded-full"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                {getCategoryIcon(activeModalResource.category)}
                <span className="text-[11px] font-bold text-[#159FE3] uppercase tracking-wider font-mono">
                  {activeModalResource.category}
                </span>
                <span className="text-slate-300">•</span>
                {getFormatBadge(activeModalResource.format)}
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102B4E] mb-2 leading-tight">
                {activeModalResource.title}
              </h2>

              <p className="text-xs text-slate-600 mb-5">
                Published {activeModalResource.publicationDate} by <strong>{activeModalResource.author}</strong> ({activeModalResource.institution})
              </p>

              <div className="space-y-5 text-xs text-[#102B4E]">
                {/* Abstract */}
                <div>
                  <h4 className="font-bold text-[11px] uppercase font-mono text-[#102B4E] mb-1.5">
                    Abstract &amp; Problem Focus
                  </h4>
                  <p className="text-slate-600 leading-relaxed bg-[#EAF6FC] p-3.5 rounded-2xl border border-[#D0E7F5]">
                    {activeModalResource.abstract}
                  </p>
                </div>

                {/* Table of contents */}
                <div>
                  <h4 className="font-bold text-[11px] uppercase font-mono text-[#102B4E] mb-1.5">
                    Table of Contents / Package Structure
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-[#EAF6FC] p-3.5 rounded-2xl border border-[#D0E7F5]">
                    {activeModalResource.tableOfContents.map((item, idx) => (
                      <div key={idx} className="text-xs text-[#102B4E] flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#159FE3]/20 text-[#159FE3] text-[10px] font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span>{item.replace(/^\d+\.\s*/, '')}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metadata details strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F8F6F0] p-3.5 rounded-2xl border border-[#D0E7F5] text-[11px] font-mono">
                  <div>
                    <span className="text-slate-500 block">File Size:</span>
                    <span className="font-bold text-[#102B4E]">{activeModalResource.fileSize}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Format:</span>
                    <span className="font-bold text-[#102B4E]">{activeModalResource.format}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Audience:</span>
                    <span className="font-bold text-[#102B4E] truncate block" title={activeModalResource.targetAudience}>
                      {activeModalResource.targetAudience}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">License:</span>
                    <span className="font-bold text-[#102B4E] truncate block" title={activeModalResource.license}>
                      {activeModalResource.license}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom modal action */}
              <div className="pt-6 mt-6 border-t border-[#D0E7F5] flex items-center justify-end gap-3">
                <button
                  onClick={() => setActiveModalResource(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-[#102B4E]"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDownload(activeModalResource)}
                  disabled={downloadingId === activeModalResource.id}
                  className="px-6 py-2.5 rounded-full bg-[#102B4E] hover:bg-[#0C223E] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Resource Package ({activeModalResource.fileSize})</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

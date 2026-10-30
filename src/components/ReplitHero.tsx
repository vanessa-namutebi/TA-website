import React, { useRef } from 'react';
import heroImage from '../assets/images/hero_collaboration_lab_1792567152591.jpg';
interface ReplitHeroProps {
  onDiscoverMission: () => void;
  onBrowseRepository: () => void;
}

export const ReplitHero: React.FC<ReplitHeroProps> = ({
  onDiscoverMission,
  onBrowseRepository,
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="hero-section relative pt-12 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div
            className="hero-copy lg:col-span-6 flex flex-col items-start"
          >
            {/* Display Heading with curved underline */}
            <h1 className="text-4xl sm:text-[3rem] lg:text-[3.25rem] max-w-[620px] font-extrabold text-[#102B4E] leading-[1.02] tracking-tight mb-6">
              Big ideas travel further{' '}
              <span className="relative inline-block text-[#159FE3]">
                together.
                {/* Hand-drawn organic underline brush SVG in golden yellow */}
                <svg
                  className="absolute -bottom-2.5 left-0 w-full h-3.5 text-[#FFC94A] pointer-events-none"
                  viewBox="0 0 240 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 14C50 4 150 2 237 8"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{' '}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#3B5472] font-normal leading-[1.7] mb-7 max-w-[590px]">
              We connect students, universities, enterprise leaders, and community innovators to co-create practical engineering, business, and sustainability solutions across borders.
            </p>

            {/* Nelson Mandela Quote */}
            <blockquote className="mb-7 max-w-[590px] border-l-2 border-[#FFC94A] pl-5 py-1">
              <p className="text-sm sm:text-[15px] text-[#102B4E] font-medium italic leading-[1.65]">
                &ldquo;Education is the most powerful weapon which you can use to change the world.&rdquo;
              </p>
              <footer className="mt-1 text-xs font-bold text-[#159FE3] tracking-wide">
                — Nelson Mandela
              </footer>
            </blockquote>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5">
              <button
                onClick={onDiscoverMission}
                className="px-6 py-3 rounded-full bg-[#102B4E] hover:bg-[#0C223E] text-white text-sm font-semibold shadow-sm transition-all"
              >
                <span>Discover the mission</span>
              </button>

              <button
                onClick={onBrowseRepository}
                className="px-6 py-3 rounded-full bg-white hover:bg-[#EAF6FC] text-[#102B4E] text-sm font-semibold border border-[#159FE3]/30 shadow-xs transition-all"
              >
                <span>Browse Projects Repository</span>
              </button>
            </div>

          </div>

          {/* Right Hero Graphic Illustration (Brand Palette) */}
          <div
            className="hero-visual lg:col-span-6 relative flex justify-center"
          >
            <div className="relative w-full max-w-[540px]">
              <figure className="relative overflow-hidden border border-[#D0E7F5] bg-white">
                <img
                  src={heroImage}
                  alt="Students and researchers collaborating across disciplines"
                  className="w-full aspect-[4/3] object-cover object-center"
                  loading="eager"
                />
                <figcaption className="absolute left-0 bottom-0 bg-[#102B4E] px-4 py-3 text-white max-w-[18rem]">
                  <span className="block text-[10px] font-mono uppercase tracking-[0.16em] text-[#FFC94A] mb-1">
                    Shared practice
                  </span>
                  <span className="text-xs font-semibold leading-snug">
                    Students, universities, and communities solving together
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

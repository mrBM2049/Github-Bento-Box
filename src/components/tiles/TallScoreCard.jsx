import { formatNumber } from "../../utils/formatters";

export function TallScoreCard({ profile, totalStars, impactRating }) {
  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-4 lg:row-span-2 min-h-[460px] rounded-bento bg-indigo text-white flex flex-col justify-between overflow-hidden shadow-md">
      {/* Top Bar */}
      <div className="p-6 pb-4 border-b border-white/10 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2 text-white/80 truncate">
          <span className="w-2 h-2 rounded-full bg-teal" />
          <span className="truncate">github.com/{profile?.login}</span>
        </div>
        <svg className="w-4 h-4 text-white/60 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 5h14a1 1 0 010 2H3a1 1 0 010-2zm0 4h14a1 1 0 010 2H3a1 1 0 010-2zm0 4h14a1 1 0 010 2H3a1 1 0 010-2z" clipRule="evenodd" />
        </svg>
      </div>

      {/* Editorial Headline & Rating */}
      <div className="p-6 flex flex-col gap-4 my-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-prussian self-start border border-white/10 text-xs font-mono">
          <span className="text-teal font-bold">★ {impactRating}</span>
          <span className="text-white/60">• Impact Rating</span>
        </div>

        <h2 className="font-display text-4xl sm:text-5xl uppercase leading-[0.92] tracking-tight text-white mt-1">
          THE OPEN SOURCE DIFFERENCE
        </h2>

        <p className="text-xs font-sans text-white/70 leading-relaxed max-w-xs">
          Comprehensive footprint derived from public repository cadence, community stars, and network reach.
        </p>
      </div>

      {/* Anchored Stats Dock */}
      <div className="bg-prussian p-5 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
        <div>
          <div className="font-mono text-xl sm:text-2xl font-bold text-white">
            {formatNumber(profile?.public_repos)}
          </div>
          <div className="text-[11px] font-sans text-white/60 uppercase tracking-wider mt-0.5">
            Repos
          </div>
        </div>
        <div className="border-x border-white/10">
          <div className="font-mono text-xl sm:text-2xl font-bold text-teal">
            {formatNumber(totalStars)}
          </div>
          <div className="text-[11px] font-sans text-white/60 uppercase tracking-wider mt-0.5">
            Stars
          </div>
        </div>
        <div>
          <div className="font-mono text-xl sm:text-2xl font-bold text-white">
            {formatNumber(profile?.followers)}
          </div>
          <div className="text-[11px] font-sans text-white/60 uppercase tracking-wider mt-0.5">
            Followers
          </div>
        </div>
      </div>
    </div>
  );
}

